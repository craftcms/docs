module.exports = function(options, ctx) {
  return {
    name: 'og',
    extendPageData(page) {

      const path = (page.regularPath || '/')
        .replace(/\/+$/, '')
        .replace(/\.html$/, '');

      // https://craftcms.com/api/og-image/docs/5.x/editions
      const newFrontmatter = [
        {
          property: 'og:image',
          content: `https://craftcms.com/api/og-image/docs${path}`
        },
      ];

      const frontmatter = [
        ...(page.frontmatter.meta || []),
        ...newFrontmatter,
      ];

      page.frontmatter.meta = frontmatter;
    }
  }
}
