const dictionary = require("../../anchor-prefixes");
const placeholders = Object.keys(dictionary);

const PHP_LABEL_PATTERN = /^[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*$/;

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
  if (!usesCustomPrefix(link)) {
    return link;
  }

  const prefix = getPrefix(link);

  // is one of our custom placeholders being used?
  const inUse = placeholders.indexOf(prefix) > -1;

  if (prefix === "api" || prefix === "config") {
    console.log('broken legacy `' + prefix + '` link: "' + link + '"');
  }

  if (!inUse) {
    return link;
  }

  // get relevant settings from `anchor-prefixes.js`
  const prefixSettings = dictionary[prefix];

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
        // Remove parens and downcase:
        hash = `method-${ref.subject.replace('()', '').toLowerCase()}`;
        // (Underscores are considered significant, here!)
      } else if (ref.isProperty) {
        // Remove variable symbol and downcase:
        hash = `property-${ref.subject.replace('$', '').toLowerCase()}`;
        // (Underscores are considered significant, here!)
      } else if (ref.isEvent) {
        // Remove EVENT_ prefix, replace underscores with dashes,
        hash = `event-${ref.subject.replace('EVENT_', '').replace('_', '-').toLowerCase()}`;
      } else if (ref.isConstant) {
        // Constants are all lumped together in a table and share a static hash:
        hash = 'constants';
      } else {
        // ???
      }
    }

    return url + (hash ? `#${hash}` : '');
  }

  if (ref && prefixSettings.format === "yii") {
    // v1 does not lowercase class name, and it strips `()` from method names
    let isVersion1 = prefixSettings.base.includes("1.1");
    let url = isVersion1
      ? `${prefixSettings.base}${ref.className}`
      : `${prefixSettings.base}${slugifyClassName(ref.className)}`;
    let hash = '';

    if (ref.subject) {
      const sub = isVersion1 ? ref.subject.replace('()', '') : ref.subject;

      hash =
        `${sub}-detail`;
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
  console.warn(`Unrecognized or unhandled anchor!`, link);

  return link;
}

/**
 * Grabs characters prior to `:`, or `null` if it doesn’t begin with a prefix-looking string followed by a colon.
 * @param string link
 */
function getPrefix(link) {
  const match = link.match(/^(\w+):/);

  if (!match) {
    return;
  }

  // Return the first capture group:
  return match[1];
}

/**
 * Returns `true` if the provided string uses one of our custom anchor prefixes.
 * @param {string} link
 */
function usesCustomPrefix(link) {
  const prefix = getPrefix(link);

  return placeholders.includes(prefix);
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
  const ref = removePrefix(link);
  const [className, subject] = ref.split('::');

  // If it’s not a fully-qualified class and subject, it needs to be at least class-like:
  if (!subject && !(className.includes('\\') || className.match(PHP_LABEL_PATTERN))) {
    return;
  }

  const isMethod = subject && subject.endsWith('()')
  const isProperty = subject && subject.startsWith('$');
  const isEvent = subject && subject.startsWith('EVENT_');

  const isConstant = subject && !(isMethod || isProperty || isEvent);

  return {
    className,
    subject,
    isMethod,
    isProperty,
    isEvent,
    isConstant,
  };
}

module.exports = {
  replacePrefixes,
  replacePrefix
};
