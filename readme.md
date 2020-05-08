# Craft Docs

This project includes all project documentation and tutorials that (will) live at craftcms.com/docs. It does not include the class reference documentation.

It consists of markdown content in nested `docs/` folders, and VuePress configuration and a highly customized theme in `docs/.vuepress/`. The theme is comprised of single-file Vue components just like the VuePress default, but integrates PostCSS with [Tailwind CSS](https://tailwindcss.com/) in addition to—and eventually to replace—the Stylus used by VuePress.

## Local Development

```
npm install
npm run docs:dev
```

Quit the process and re-run if you’ve made changes to any `.js` config files.

## Storybook

Broken, but on the way.

```
npm run storybook
```