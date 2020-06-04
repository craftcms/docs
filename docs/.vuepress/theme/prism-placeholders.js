// grab our custom list of placeholder strings
const dictionary = require('../placeholders');

const placeholderClass = 'code-placeholder';

// token types to try find/replace (more = slower build)
const searchTypes = [
    'string',
    'other'
];

/**
 * Uses Prism’s `wrap` hook to check each token’s content for placeholder strings.
 *
 * If the wrapped element is an exact match for a placeholder string, a class
 * will be appended with a title attribute when relevant.
 *
 * If the wrapped element contains one or more placeholder strings, each one
 * will be wrapped with the placeholder class and optional title attribute.
 */
Prism.hooks.add('wrap', function(env) {
    if (env.content) {
        if (isDictionaryString(env.content)) {
            env.classes.push(placeholderClass);

            let title = getTitle(env.content);

            if (title) {
                env.attributes['title'] = title;
            }
        } else if (searchTypes.includes(env.type)) {
            let placeholders = findDictionaryStrings(env.content);

            if (placeholders.length > 0) {
                placeholders.forEach((placeholder) => {
                    let replaceRegex = new RegExp(placeholder, 'g');
                    let title = getTitle(placeholder);

                    env.content = env.content.replace(
                        replaceRegex,
                        `<span class="${placeholderClass}" title="${title}">${placeholder}</span>`
                    );
                });
            }
        }
    }
});

/**
 * Is this exact string defined as a placeholder?
 * @param str
 * @returns {boolean}
 */
function isDictionaryString(str) {
    return dictionary.hasOwnProperty(str);
}

/**
 * Does the given string contain one or more placeholders? If so, return
 * relevant keys in an array.
 * @param str
 * @returns {array}
 */
function findDictionaryStrings(str) {
    return Object.keys(dictionary).filter(stringContainsPlaceholder(str));
}

function getTitle(placeholder) {
    return dictionary[placeholder].hasOwnProperty('title') ?
        dictionary[placeholder].title : false;
}

/**
 * Callback filter function: check content string `str` for instance of
 * placeholder `element`.
 *
 * @param str
 * @returns {function(*=): boolean}
 */
function stringContainsPlaceholder(str) {
    return function(element) {
        return str.indexOf(element) !== -1;
    }
}