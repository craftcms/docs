const path = require('path');
const fs = require('fs');
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
        async generated () {
            const manifest = [];

            ctx.pages.forEach(function(p) {
                manifest.push({
                    title: p.title,
                    path: p.path,
                    summary: p.frontmatter.description || p.excerpt || null,
                    keywords: (p.frontmatter.keywords || '').split(' '),
                });
            });

            await fs.writeFile(
                path.resolve(ctx.outDir, 'sitemap.js'),
                JSON.stringify(manifest, null, 4),
                function(err) {
                    if (err) {
                        throw err;
                    }

                    console.log("Wrote sitemap.js!");
                },
            );
        }
    };
};
