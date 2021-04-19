# Craft Docs

This project includes all project documentation and tutorials at [craftcms.com/docs](https://craftcms.com/docs). It does not include class reference documentation.

It consists of markdown content in nested `docs/` folders, and a highly customized VuePress theme in `docs/.vuepress/`. The theme is comprised of single-file Vue components just like the VuePress default, but integrates PostCSS with [Tailwind CSS](https://tailwindcss.com/) to replace most of the Stylus used by VuePress.

## Overview

The major change in this theme is the concept of documentation “sets”, meant to define a documentation “product” that may have one or several versions. Each can be configured as a “primary set,” meaning it appears as a top-level sidebar item. Navigation and search are unique to each set, sort of like the VuePress equivalent of Craft’s multi-site functionality.

The only content not part of a docset is the homepage at `docs/README.md`.

The pages served from `docs/` are treated like any other VuePress project, and the theme modifies resolvers so any displayed content is assumed to be part of an active set once selected.

- `docs/`
    - `.storybook/` has everything to configure the Storybook project, which depends on `postcss.config.js` and `tailwind.config.js`.
    - `.vuepress/`
        - `public/` for static files to be published with the build.
        - `sets/` for our docset configurations.
        - `theme/` all the JavaScript, Vue, PostCSS and Stylus for the custom VuePress theme.
        - `anchor-prefixes.js`: configuration for abbreviated link shortcuts like `yii2:` and `craft3:`.
        - `config.js` is the root VuePress configuration.
        - `head.js` for customizing global `<head>` contents for published pages.
        - `placeholders.js` for configuring special placeholders to be emphasized in code samples.
    - `*/` docset markdown as you’d see it on its own in each legacy VuePress project.
    - `README.md` the topmost homepage for all docsets.
- `postcss.config.js`
- `tailwind.config.js`

## Local Development

```
npm install
npm run docs:dev
```

Quit the process and re-run if you’ve made changes to any `.js` config files.

## Storybook

You can examine some of the theme’s custom styles and components by running Storybook:

```
npm run storybook
```

## Writing Tips

Most stock VuePress markdown extensions are supported here. See the [Markdown Extensions](https://v1.vuepress.vuejs.org/guide/markdown.html) page to learn more about linking, frontmatter, and highlighting lines in code samples.

- Keep code block line lengths up to 85 characters long to avoid horizontal scrollbars.
- Avoid placing highlighted code blocks `::: details` toggles because the performance is terrible in WebKit. Use our height-limited `<toggle-tip>` component instead.
