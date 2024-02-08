const { replacePrefixes } = require("../theme/util/replace-anchor-prefixes");

/**
 * This plugin attempts to provide the "AppContext" instance to anchor replacements.
 */
module.exports = function(options, ctx) {
    return {
        name: 'craft',
        extendMarkdown: function(md) {
            md.use(function(md) {
                return replacePrefixes(md, ctx);
            });
        },
    };
};
