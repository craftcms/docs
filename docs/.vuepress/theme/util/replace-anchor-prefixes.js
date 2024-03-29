const dictionary = require("../../anchor-prefixes");
const placeholders = Object.keys(dictionary);

function replacePrefixes(md, ctx) {
  // expand custom prefix into full URL
  md.normalizeLink = url => {
    return replacePrefix(url, ctx);
  }

  // remove custom prefix from link text
  md.normalizeLinkText = linkText => {
    if (usesCustomPrefix(linkText)) {
      return removePrefix(linkText);
    }

    return linkText;
  }
}

/**
 * Replace any of our special prefixes within links.
 * @param {*} link href value
 * @param {AppContext} ctx Vue AppContext
 */
function replacePrefix(link, ctx) {
  link = decodeURIComponent(link);

  // do we have a protocol or prefix?
  const prefix = getPrefix(link);

  if (!prefix) {
    return link;
  }

  // is one of our custom placeholders being used?
  const inUse = placeholders.filter(placeholder => {
    return placeholder === prefix;
  });

  if (prefix === "api" || prefix === "config") {
    console.log('broken legacy `' + prefix + '` link: "' + link + '"');
  }

  if (!inUse || inUse.length === 0) {
    return link;
  }

  // get relevant settings from `anchor-prefixes.js`
  const prefixSettings = dictionary[inUse[0]];

  if (!prefixSettings.hasOwnProperty("format")) {
    // Nothing we can do without a format:
    return link;
  }

  // Get class name, subject, whether it’s a method, and hash:
  const ref = parseReference(link);

  if (ref && prefixSettings.format === "internal") {
    let url = `${prefixSettings.base}${slugifyClassName(ref.className)}.html`;
    let hash = ref.hash;

    if (ref.subject) {
      hash = "";
      if (ref.isMethod) {
        hash = "method-";
      } else if (!ref.subject.match(/^EVENT_/)) {
        // used to start with `property-`, but more recent yii2-apidoc dropped it
      }

      hash += ref.subject.replace(/_/g, "-").toLowerCase();
    }

    return url + (hash ? `#${hash}` : "");
  }

  if (ref && prefixSettings.format === "yii") {
    // v1 does not lowercase class name, and it strips `()` from method names
    let isVersion1 = prefixSettings.base.includes("1.1");
    let url = isVersion1
      ? `${prefixSettings.base}${ref.className}`
      : `${prefixSettings.base}${slugifyClassName(ref.className)}`;
    let hash = ref.hash;

    if (ref.subject) {
      let parens = isVersion1 ? '' : '()';
      hash =
        (ref.isMethod ? `${ref.subject}${parens}` : `\$${ref.subject}`) + "-detail";
    }

    return url + (hash ? `#${hash}` : "");
  }

  // Link to source code, directly.
  // https://github.com/search?q=repo%3Acraftcms%2Fcms+path%3Asrc%2Fhelpers%2FApp.php+symbol%3AparseEnv&type=code
  if (ref && prefixSettings.format === 'source') {
    if (!ref.subject) {
      // No subject? Jump directly to the file:
      return `${prefixSettings.base}${prefixSettings.repo}/blob/${prefixSettings.branch}/${pathifyClassName(ref.className, prefixSettings.ns, prefixSettings.sourceDir)}`;
    }

    // Ok, use the code navigation/search tool:
    return `${prefixSettings.base}search?q=repo:${prefixSettings.repo}+path:${pathifyClassName(ref.className, prefixSettings.ns, prefixSettings.sourceDir)}+symbol:${ref.subject}`;
  }

  if (prefixSettings.format === "set-local") {
    // Can we get the current version/site in this context?
    console.warn("Unsupported anchor prefix!");

    return link;
  }

  if (prefixSettings.format === "config") {
    m = link.match(/^config[2|3|4|5]:(.+)/);
    let setting = m[1].toLowerCase();

    if (!m) {
      return link;
    }

    return `${prefixSettings.base}${setting}`;
  }

  if (prefixSettings.format === "generic") {
    return link.replace(`${prefix}:`, prefixSettings.base);
  }

  // No hit?
  console.warn("Unrecognized or unhandled anchor prefix!");

  return link;
}

/**
 * Grabs characters prior to `:`, returning undefined if there isn’t a colon.
 * @param string link
 */
function getPrefix(link) {
  const linkParts = link.split(":");
  return linkParts.length === 0 ? undefined : linkParts[0];
}

/**
 * Returns `true` if the provided string uses one of our custom anchor prefixes.
 * @param {string} link
 */
function usesCustomPrefix(link) {
  const prefix = getPrefix(link);

  const inUse = placeholders.filter(placeholder => {
    return placeholder === prefix;
  });

  return inUse.length > 0;
}

/**
 * Kebab-cases presumed class name for use in a URL.
 * @param string className
 */
function slugifyClassName(className) {
  return className.replace(/\\/g, "-").toLowerCase();
}

/**
 * Converts a class namespace to a folder path, in a similar fashion to PSR auto-loaders.
 * @param string className Fully-qualified class name, as it is used in PHP.
 * @param string namespace The part of the namespace located in `sourcePath`
 * @param string sourcePath Where in the repo the autoloading map is anchored.
 */
function pathifyClassName(className, namespace, sourcePath) {
  const localClassName = className.replace(`${namespace}\\`, '');
  const pathLike = localClassName.replace(/\\/g, '/');

  return `${sourcePath}${pathLike}.php`;
}

/**
 * Returns the given string with any valid prefixes removed (`foo:bar` → `bar`).
 * @param string link
 */
function removePrefix(link) {
  return link.replace(`${getPrefix(link)}:`, "");
}

/**
 * Takes link content without prefix and parses for class + method details.
 * @param string link
 * @returns object or null
 */
function parseReference(link) {
  let m = removePrefix(link).match(
    /^\\?([\w\\]+)(?:::\$?(\w+)(\(\))?)?(?:#([\w\-]+))?$/
  );

  if (!m) {
    return;
  }

  return {
    className: m[1],
    subject: m[2],
    isMethod: typeof m[3] !== "undefined",
    hash: m[4]
  };
}

module.exports = {
  replacePrefixes,
  replacePrefix
};
