import _ from "lodash";
import FlexSearch from "flexsearch";

const defaultLang = "en-US";
const defaultIndexSettings = {
  async: true,
  // https://github.com/nextapps-de/flexsearch#tokenizer
  tokenize: "strict",
  // https://github.com/nextapps-de/flexsearch#encoders
  encode: "icase",
  threshold: 0,
  resolution: 9,
  depth: 0,
  stemmer: {
    queries: "query",
    querying: "query",
    entries: "entry",
    entry: "entries"
  },
  doc: {
    id: "key",
    // fields we want to index
    field: {
      title: {
        encode: "advanced"
        tokenize: "full"
      },
      headersStr: {
        encode: "advanced"
        tokenize: "full"
      },
      keywords: {
        encode: "icase"
        tokenize: "forward"
      },
      content: {
        encode: "icase"
        tokenize: "strict"
      }
    },
    // fields to be explicitly stored (without `store` key, entire `$page` object is stored)
    store: [
      "key",
      "title",
      "headers",
      "headersStr",
      "content",
      "contentLowercase",
      "path",
      "lang",
      "docSetHandle",
      "docSetTitle",
      "isPrimary",
      "keywords",
      "version"
    ]
  }
};

let pagesByPath = null;
let indexes = [];
let cyrillicIndexes = [];
let cjkIndexes = [];

export default {
  buildIndex(pages) {
    /**
     * Add a global index for the docs homepage, including a `isPrimary` doc sets
     * in their default language and primary version.
     */
    addIndex(
      indexes,
      "global",
      pages.filter(page => {
        return page.lang === defaultLang && page.isPrimary;
      })
    );

    let docSets = getPageDocSetHandles(pages);

    for (let i = 0; i < docSets.length; i++) {
      const docSet = docSets[i];
      const docSetPages = pages.filter(page => {
        return page.docSetHandle === docSet;
      });

      let versions = getPageVersionHandles(docSetPages);
      let languages = getPageLanguageHandles(docSetPages);

      if (versions.length) {
        for (let j = 0; j < versions.length; j++) {
          // create sets keyed with `setHandle|version|lang`
          const version = versions[j];

          for (let k = 0; k < languages.length; k++) {
            const language = languages[k];
            const setKey = `${docSet}|${version}|${language}`;
            const setPages = pages.filter(page => {
              return (
                page.docSetHandle === docSet &&
                page.lang === language &&
                page.version === version
              );
            });
            const cyrillicSetPages = setPages.filter(p => p.charsets.cyrillic);
            const cjkSetPages = setPages.filter(p => p.charsets.cjk);

            addIndex(indexes, setKey, setPages);

            if (cyrillicSetPages.length) {
              addIndex(cyrillicIndexes, setKey, cyrillicPages, {
                encode: false,
                split: /\s+/,
                tokenize: "forward"
              });
            }

            if (cjkSetPages.length) {
              addIndex(cjkIndexes, setKey, cjkSetPages, {
                encode: false,
                tokenize: function(str) {
                  return str.replace(/[\x00-\x7F]/g, "").split("");
                }
              });
            }
          }
        }
      } else {
        // set keyed with `setHandle|lang`
        for (let j = 0; j < languages.length; j++) {
          const language = languages[j];

          addIndex(
            indexes,
            `${docSet}|${language}`,
            pages.filter(page => {
              return page.docSetHandle === docSet && page.lang === language;
            })
          );
        }
      }
    }

    pagesByPath = _.keyBy(pages, "path");
  },

  async match(queryString, queryTerms, docSet, version, language, limit = 7) {
    const index = resolveSearchIndex(docSet, version, language, indexes);
    const cyrillicIndex = resolveSearchIndex(
      docSet,
      version,
      language,
      cyrillicIndexes
    );
    const cjkIndex = resolveSearchIndex(docSet, version, language, cjkIndexes);

    const searchParams = [
      {
        field: "title",
        query: queryString,
        boost: 3,
        suggest: false,
        bool: "or"
      },
      {
        field: "headersStr",
        query: queryString,
        boost: 2,
        suggest: false,
        bool: "or"
      },
      {
        field: "content",
        query: queryString,
        boost: 0,
        suggest: false,
        bool: "or"
      },
      {
        field: "keywords",
        query: queryString,
        boost: 0,
        suggest: false,
        bool: "or"
      }
    ];

    const searchResult1 = await index.search(searchParams, limit);
    const searchResult2 = cyrillicIndex
      ? await cyrillicIndex.search(searchParams, limit)
      : [];
    const searchResult3 = cjkIndex
      ? await cjkIndex.search(searchParams, limit)
      : [];
    const searchResult = _.uniqBy(
      [...searchResult1, ...searchResult2, ...searchResult3],
      "path"
    );

    const result = searchResult.map(page => ({
      ...page,
      parentPageTitle: getParentPageTitle(page),
      ...getAdditionalInfo(page, queryString, queryTerms)
    }));

    const resultBySet = _.groupBy(result, "docSetTitle");

    return _.values(resultBySet)
      .map(arr =>
        arr.map((x, i) => {
          if (i === 0) return x;
          return { ...x, parentPageTitle: null };
        })
      )
      .flat();
  }
};

/**
 * Instantiates a new FlexSearch index and adds it to the provided `indexArray` set.
 *
 * @param {Array} indexArray Collection of indexes.
 * @param {string} key Array key for this new index in the collection.
 * @param {Array} pages Pages to be added to this index.
 * @param {Object} additionalSettings Any config settings that should override the defaults.
 */
function addIndex(indexArray, key, pages, additionalSettings = {}) {
  const settings = {
    ...defaultIndexSettings,
    additionalSettings
  };
  const newIndex = new FlexSearch(settings);
  newIndex.add(pages);
  indexArray[key] = newIndex;
}

/**
 * Returns a FlexSearch instance for the current search context.
 *
 * @param {string} docSet
 * @param {string} version
 * @param {string} language
 * @param {Array} indexes
 */
function resolveSearchIndex(docSet, version, language, indexArray) {
  let key = docSet;

  if (version) {
    key += `|${version}`;
  }

  if (language) {
    key += `|${language}`;
  }

  return indexArray[key] || indexArray["global"];
}

/**
 * Returns an array of unique `docSetHandle` values used in the provided pages.
 * @param {*} pages
 */
function getPageDocSetHandles(pages) {
  return pages
    .map(page => {
      return page.docSetHandle;
    })
    .filter((handle, index, self) => {
      return handle && self.indexOf(handle) === index;
    });
}

/**
 * Returns an array of unique `version` values used in the provided pages.
 * @param {*} pages
 */
function getPageVersionHandles(pages) {
  return pages
    .map(page => {
      return page.version;
    })
    .filter((handle, index, self) => {
      return handle && self.indexOf(handle) === index;
    });
}

/**
 * Returns an array of unique `lang` values used in the provided pages.
 * @param {*} pages
 */
function getPageLanguageHandles(pages) {
  return pages
    .map(page => {
      return page.lang;
    })
    .filter((handle, index, self) => {
      return handle && self.indexOf(handle) === index;
    });
}

function getParentPageTitle(page) {
  const pathParts = page.path.split("/");
  let parentPagePath = "/";
  if (pathParts[1]) parentPagePath = `/${pathParts[1]}/`;

  const parentPage = pagesByPath[parentPagePath] || page;
  return parentPage.title;
}

/**
 * Returns contextual details for displaying search result.
 * @param {*} page
 * @param {*} queryString
 * @param {*} queryTerms
 */
function getAdditionalInfo(page, queryString, queryTerms) {
  const query = queryString.toLowerCase();

  /**
   * If it’s an exact title match or the page title starts with the query string,
   * return the result with the full heading and no slug.
   */
  if (
    page.title.toLowerCase() === query ||
    page.title.toLowerCase().startsWith(query)
  ) {
    return {
      headingStr: getFullHeading(page),
      slug: "",
      contentStr: getBeginningContent(page),
      match: "title"
    };
  }

  /**
   * If our special (and pretty much invisible) keywords include the query string,
   * return the result using the page title, no slug, and opening sentence.
   */
  if (page.keywords && page.keywords.includes(query)) {
    return {
      headingStr: getFullHeading(page),
      slug: "",
      contentStr: getBeginningContent(page),
      match: "keywords"
    };
  }

  const match = getMatch(page, query, queryTerms);

  /**
   * If we can’t match the query string to anything specific, list the result
   * with only the page heading.
   */
  if (!match)
    return {
      headingStr: getFullHeading(page),
      slug: "",
      contentStr: null,
      match: "?"
    };

  /**
   * If we have a match that’s in a heading, display that heading and return
   * a link to it without any content snippet.
   */
  if (match.headerIndex != null) {
    // header match
    return {
      headingStr: getFullHeading(page, match.headerIndex),
      slug: "#" + page.headers[match.headerIndex].slug,
      contentStr: null,
      match: "header"
    };
  }

  /**
   * Get the index of the nearest preceding header relative to the content match.
   */
  let headerIndex = _.findLastIndex(
    page.headers || [],
    h => h.charIndex != null && h.charIndex < match.charIndex
  );
  if (headerIndex === -1) headerIndex = null;

  return {
    headingStr: getFullHeading(page, headerIndex),
    slug: headerIndex == null ? "" : "#" + page.headers[headerIndex].slug,
    contentStr: getContentStr(page, match),
    match: "content"
  };
}

/**
 * Return the target heading in the context of its parents. (Like a breadcrumb.)
 * @param {*} page
 * @param {*} headerIndex
 */
function getFullHeading(page, headerIndex) {
  if (headerIndex == null) return page.title;
  const headersPath = [];
  while (headerIndex != null) {
    const header = page.headers[headerIndex];
    headersPath.unshift(header);
    headerIndex = _.findLastIndex(
      page.headers,
      h => h.level === header.level - 1,
      headerIndex - 1
    );
    if (headerIndex === -1) headerIndex = null;
  }
  return headersPath.map(h => h.title).join(" → ");
}

/**
 * Return an object representing the contextual match on the search result,
 * which will either be a header or page content.
 *
 * @param {*} page
 * @param {*} query
 * @param {*} terms
 */
function getMatch(page, query, terms) {
  let match = getHeaderMatch(page, query) || getContentMatch(page, query);

  if (match) {
    return match;
  }

  // look for individual terms
  const matches = terms
    .map(t => {
      return getHeaderMatch(page, t) || getContentMatch(page, t);
    })
    .filter(m => m);
  if (matches.length === 0) return null;

  if (matches.every(m => m.headerIndex != null)) {
    return getHeaderMatch(page, query) || matches[0];
  }

  return (
    getContentMatch(page, query) || matches.find(m => m.headerIndex == null)
  );
}

function getHeaderMatch(page, term) {
  if (!page.headers) return null;
  for (let i = 0; i < page.headers.length; i++) {
    const h = page.headers[i];
    const charIndex = h.title.toLowerCase().indexOf(term);
    if (charIndex === -1) continue;
    return {
      headerIndex: i,
      charIndex,
      termLength: term.length
    };
  }
  return null;
}

function getContentMatch(page, term) {
  if (!page.contentLowercase) return null;
  const charIndex = page.contentLowercase.indexOf(term);
  if (charIndex === -1) return null;

  return { headerIndex: null, charIndex, termLength: term.length };
}

function getContentStr(page, match) {
  const snippetLength = 120;
  const { charIndex, termLength } = match;

  let lineStartIndex = page.content.lastIndexOf("\n", charIndex);
  let lineEndIndex = page.content.indexOf("\n", charIndex);

  if (lineStartIndex === -1) lineStartIndex = 0;
  if (lineEndIndex === -1) lineEndIndex = page.content.length;

  const line = page.content.slice(lineStartIndex, lineEndIndex);

  if (snippetLength >= line.length) return line;

  const lineCharIndex = charIndex - lineStartIndex;

  const additionalCharactersFromStart = (snippetLength - termLength) / 2;
  const snippetStart = Math.max(
    lineCharIndex - additionalCharactersFromStart,
    0
  );
  const snippetEnd = Math.min(snippetStart + snippetLength, line.length);
  let result = line.slice(snippetStart, snippetEnd);
  if (snippetStart > 0) result = "..." + result;
  if (snippetEnd < line.length) result = result + "...";
  return result;
}

function getBeginningContent(page) {
  const lines = page.contentLowercase.split("\n");
  const firstLine = lines.length > 0 ? lines[0] : "";

  if (firstLine.trim() === page.title.toLowerCase()) {
    // first line *is* title; start at second line
    return getContentStr(page, {
      charIndex: firstLine.length + 2,
      termLength: 0
    });
  }

  return getContentStr(page, { charIndex: 0, termLength: 0 });
}
