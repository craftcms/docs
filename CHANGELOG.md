# Changelog

Theme and significant content changes will be documented in this file.

## 2022-02-08
### Added
- Documented `clear-deprecations`, `plugin/list`, `users/activation-url`, and `users/password-reset-url` commands added in Craft 3.7.31.
- Documented `users/list-admins` and `users/set-password` commands added in Craft 3.6.0.

## 2022-02-02
### Removed
- Moved stale + partial Craft 3.x translations to https://github.com/craftcms/docs-translations.

## 2022-01-20
### Added
- Noted default mutex behavior with configuration example for Craft 3.7.30.

## 2022-01-18
### Changed
- Updated wording to reflect Craft CMS 3.7.29’s PHP fatal error logging to `stderr`.
- Updated Craft CMS `resave/*` console command reference for 3.7.29.

## 2021-12-15
### Added
- Added Event Code Generator to the Craft Commerce docs “Events” page.
- Documented new `getHsl()`, `getHue()`, `getL()`, `getLightness()`, `getS()`, and `getSaturation()` methods for Color field values added in Craft 3.7.26.

## 2021-12-08
### Added
- Added “Events” page to the Craft CMS docs Extending Craft section.

## 2021-12-03
### Added
- Documented `parseBooleanEnv` Twig function added in Craft 3.7.24.
- Documented element query `cache()` function.

## 2021-11-26
### Changed
- Updated `plugin/install`, `plugin/uninstall`, `plugin/enable`, and `plugin/disable` console command descriptions for Craft 3.7.23.

## 2021-11-16
### Changed
- Updated Element Type’s “Saving Custom Field Values” section for Craft 3.7.21.

## 2021-10-19
### Added
- Documented new `countable` and `object` Twig tests added in Craft 3.7.17.

## 2021-10-07
### Added
- Documented `autoSetCartShippingMethodOption` setting added in Commerce 3.4.4.
- Documented `clearLineItems` param added to the `cart/update-cart` controller action in Commerce 3.4.4.

## 2021-10-05
### Added
- Documented new `array`, `callable`, `float`, `integer`, `numeric`, `resource`, `scalar`, and `string` Twig tests added in Craft 3.7.15.
- Documented `graphql/create-token`, `graphql/list-schemas`, and `users/impersonate` commands added in Craft 3.7.15.

## 2021-09-28
### Added
- Documented Matrix field’s newly-supported values in Craft 3.7.14.

### Fixed
- Fixed example errors and added missing element type example class in Extending GraphQL.

## 2021-09-27
### Changed
- Added tip about referencing custom field columns by their full column name.

## 2021-09-14
### Added
- Documented `up` command added in Craft 3.7.13.

## 2021-08-31
### Changed
- Updated `{sourceId}` and `{sourceUid}` references to `{canonicalId}` and `{canonicalUid}`. 

## 2021-08-24
### Added
- Documented `utils/prune-provisional-drafts` added in Craft 3.7.9.
- Documented `--dry-run` flag for `utils/prune-revisions` command added in Craft 3.7.9.

## 2021-08-04
### Added
- Added the warning about running `project-config/write` to the Project Config page.

## 2021-07-26
### Added
- Documented Commerce order and line item totals.

### Fixed
- Fixed vertical code highlight alignment.

## 2021-07-21
### Added
- Documented queue driver priority support.

## 2021-07-16
### Added
- Documented `sendContentLengthHeader` config setting added in Craft 3.7.3.

## 2021-07-14
### Added
- Documented `transformSvgs` config setting added in Craft 3.7.1.

## 2021-07-13
### Added
- Documented `|removeClass` Twig filter added in Craft 3.7.0.
- Documented `cp.commerce.discounts.*` and `cp.commerce.sales.*` template hooks added in Commerce 3.4.
- Documented `httpProxy`, `previewTokenDuration`, `revAssetUrls`, and `setGraphqlDatesToSystemTimeZone` config settings added in Craft 3.7.0.
- Documented `useUnbufferedConnections` database config setting added in Craft 3.7.0.
- Documented `date()` Twig function added in Craft 3.7.0.
- Documented `users/create` and `users/delete` commands added in Craft 3.7.0.
- Documented Date field `now` comparison support added in Craft 3.7.0.
- Added _Extending GraphQL_ section detailing Craft’s GraphQL components for custom plugin/module developers.
- Documented custom field empty-string translation key behavior new to Craft 3.7.0.

### Changed
- Revised Date field settings to include new “Show Time Zone” setting added in Craft 3.7.0.
- Updated requirements for Commerce 3.4.0.
- Revised `{% cache %}` tag documentation to reflect that Craft 3.7.0 captures `{% js %}`, `{% script %}` and `{% css %}` code and styles.
- Revised Image Transforms page to demonstrate Craft 3.7.0’s support for overrides in via `asset.setTransform()` in addition to `asset.getUrl()`.
- Updated Discounts page to reflect Users condition options added in Commerce 3.4.0.

### Removed
- Removed `flash` file kind that was retired in Craft 3.7.0.

## 2021-07-09
### Added
- Added the “Control Panel Edit Pages” page to the Extending Craft docs.
- Added the “Form Inputs” section to the “Control Panel Templates” page.

## 2021-06-11
### Changed
- Documented the `failMessageInput()` and `successMessageInput()` Twig functions added in Craft 3.6.6.

## 2021-06-09
### Fixed
- Fixed treeview styling.

## 2021-06-01
### Added
- Documented Commerce `productCount` and `variantCount` GraphQL queries.
- Added a note about MySQL/MariaDB timezone support with link to [Knowledge Base article](https://craftcms.com/knowledge-base/populating-mysql-mariadb-timezone-tables).

## 2021-05-28
### Changed
- Updated VuePress along with a bunch of project dependencies.

## 2021-05-19
### Added
- Documented `nitro db destroy` command.
- Documented `nitro alias` site argument.
- Documented `|merge` filter with its `recursive` argument.

## 2021-05-18
### Added
- Documented Commerce `purchasableShippable` event.

### Changed
- Updated `allowedFileExtensions` config setting to include default `dotm` and `dotx` file extensions.

## 2021-05-11
### Added
- Documented `permissionsPolicyHeader` config setting.
- Document new `--force` flag on the `plugin/uninstall` command.

## 2021-05-10
### Added
- Documented controller action default route format.

## 2021-04-28
### Added
- Documented Commerce `purchasableAvailable` event.

## 2021-04-23
### Changed
- Improved GraphQL introduction and examples.

## 2021-04-20
### Changed
- Updated the tutorial to use Nitro 2.

## 2021-04-06
### Changed
- Updated Nitro 2.x documentation for version 2.0.7.

## 2021-04-01
### Added
- Documented error templates. (Not a prank.)

## 2021-03-25
### Added
- Added Nitro design goals and architectural overview.

## 2021-03-23
### Added
- Documented the new `{% script %}` Twig tag.
- Documented the new `andRelatedTo` element query parameter.

## 2021-03-09
### Added
- Documented Nitro `php` command.
- Documented Craft `|httpdate` Twig filter.

### Changed
- Improved notes for working with Nitro and WSL2.

## 2021-03-08
### Added
- Documented recommended Docker settings for Nitro.

### Fixed
- Fixed a bug that prevented search keyboard shortcut from working on some cases.

## 2021-03-03
### Added
- Documented the `is boolean` Twig test.
- Documented the ability to use `.user.ini` to customize Nitro PHP settings.

## 2021-03-02
### Changed
- Updated default Nitro doc set with the release of Nitro 2.

## 2021-02-25
### Added
- Added a Queue Jobs page to the Extending Craft section.

## 2021-02-22
### Added
- Added animation to indicate sidebar items are being loaded.

## 2021-02-12
### Changed
- `xxl` breakpoint now increases `font-size` instead of `zoom`.

## 2021-02-09
### Fixed
- Prevented a useless link to “newer” docs when the default doc set version is not also the latest.

## 2021-02-03
### Changed
- Listed a few handy MigrationHelper methods in the Migrations docs.

## 2021-02-01
### Added
- Added content to Craft’s URL Fields page.

## 2021-01-27
### Changed
- Updated areas of the Craft 3 docs for the new PHP 7.2.5+ requirement.

## 2021-01-26
### Added
- Documented the new `{% tag %}` Twig tag.

### Changed
- Updated `currency`, `filesize`, `number`, `percentage`, `timestamp`, and `withoutKey` Twig filter descriptions to reflect updated behavior in Craft 3.6.

## 2021-01-22
- Added a warning about outputting empty segments in Assets fields’ dynamic subfolder templates.

## 2021-01-20
### Changed
- Upgraded Storybook to latest version.

### Fixed
- Got Storybook fonts working again.

## 2021-01-15
### Fixed
- Fixed heading anchor shift that could occur with headings not in sidebar navigation. ([#134](https://github.com/craftcms/docs/issues/134))

## 2021-01-14
### Fixed
- Fixed potential main navigation double scrollbars. ([#132](https://github.com/craftcms/docs/issues/132))

## 2021-01-13
### Changed
- Improved description of the customer-user relationship on the Customers page.

## 2021-01-04
### Fixed
- Updated Commerce 3 examples using `cartUpdatedNotice` to `successMessage` instead.

## 2020-12-17
### Changed
- Heavily refactored Commerce 3.x docs to improve organization, flow, and coverage gaps. 🎉

## 2020-12-14
### Added
- Added PHP examples to Field Types pages.

### Changed
- Removed a tip about overriding the `mutex` component config for Windows hosts, as it’s no longer needed in Craft 3.5 and later. ([craftcms/cms#7242](https://github.com/craftcms/cms/issues/7242))

## 2020-12-09
### Added
- Documented Commerce `modifyCartInfo` event.

### Changed
- Improved Searching page with more detailed overview and examples.

## 2020-11-25
### Changed
- Changed typographic widow handling approach to improve HMR and scroll issues.
- Updated VuePress to 1.5.3.

## 2020-11-16
### Added
- Added element form examples to the Categories, Tags, and Users field pages in the Craft 3 docs.

## 2020-11-13
### Changed
- Documented some missing parameters on the Craft 3 Controller Actions page.

## 2020-10-22
### Changed
- Improved the Control Panel Template page in the Craft 3 docs.

## 2020-10-20
### Added
- Documented controller actions.
- Documented new `ul()` and `ol()` Twig functions.
- Added the `verb` style for Badge components.
- Improved Badge component adding `role` and `focusable` attributes and a default label.
- Documented new `project-config/touch` console command.
- Documented `project-config/write` console command.
- Documented `--invert` option for `project-config/diff` console command.

### Removed
- Moved templating example pages to the Knowledge Base.

## 2020-10-13
### Added
- Added Commerce 3 Console Commands page with new `commerce/reset-data` command.
- Documented using `craft\services\ProjectConfig::$writeYamlAutomatically` to disable writing project config YAML files automatically.

## 2020-10-12
### Added
- Documented new `nitro create` command and `--silent` flag for `xon`, `xoff`, and `php iniset` commands.

## 2020-10-02
### Fixed
- Fixed an issue that may have led to incorrect search result headings when a heading match was preceded by the search keyword in body content.
- Updated `SidebarLink` to honor its `maxDepth` setting.

## 2020-10-01
### Added
- Documented the new Time field type added in Craft 3.5.12.
- Added an “edition” style to the Badge component for visually identifying edition-specific headings.
- Added placeholder support for non-tokenized text in SQL code blocks.

## 2020-09-30
### Fixed
- Fixed a bug that prevented second-level docset navigation from resolving properly.

## 2020-09-28
### Added
- Added `sidebarDepth` frontmatter support for setting the nesting level of the right sidebar (default `0`, flat).
- Added `sidebarLevel` frontmatter support for setting the heading level used to generate right sidebar (default `2` for using `h2` headings).

## 2020-09-25
### Added
- Noted Craft 3.5.0+ typecasting in “Updating Plugins for Craft 3”.

## 2020-09-21
### Fixed
- Fixed appearance of documentation version selector in Edge.

## 2020-09-18
### Removed
- Removed example `mutex/` lock folder now that Craft 3.5+ use the database for mutex locking by default—meaning you’d only see that runtime folder overriding the default mutex component.

## 2020-09-17
### Fixed
- Fixed the invisible hamburger navigation that could have secretly been clicked or tapped from wider viewports.

## 2020-09-07
### Changed
- Clarified that the `{% ifchildren %}` and `{% endifchildren %}` tags don’t support special template logic. ([craftcms/cms#6841](https://github.com/craftcms/cms/issues/6841))

## 2020-09-15
### Added
- Documented the `truncate` filter that was added in Craft 3.5.10.

## 2020-09-14
### Changed
- Expanded page heading indexes to include `h4` and `h5`, which previously led to weird-looking results on heading matches at those depths.
- Changed nested search result display to use arrows instead of greater than signs (`>` to `→`).

## 2020-09-11
### Added
- Added simple components for flex columns.
### Changed
- Updated Craft 3’s system requirements to list minimum and recommended specs.

## 2020-09-09
### Added
- Added Japanese translations kindly provided by @dreamseeker ([#69](https://github.com/craftcms/docs/pull/69)).
- Merged updates from Crowdin.

## 2020-09-07
### Added
- Documented Craft and Commerce template hooks.
### Fixed
- Updated references to deprecated `currentUser.customerFieldHandle` and documented the change in the Commerce 3 upgrade notes.

## 2020-09-04
### Changed
- Updated the “Propagating Changes” section of the Project Config page, per chanegs in Craft 3.5.6.

## 2020-09-01
### Added
- Documented Craft 3.5.8 features: “Retry Duration” general setting; `off`, `on`, and `utils/update-usernames` commands; `configure()` Twig function.
### Changed
- Overhauled the Console Commands page to detail each command and its options.
- Adjusted search configuration again to stop applying a relevance threshold to in-body results.

## 2020-08-31
### Changed
- Adjusted search configuration to generally return more results and further promote custom keywords.

## 2020-08-27
### Changed
- Removed references to the `craft.bat` file, which is no longer distributed with the `craftcms/craft` starter project.

## 2020-08-26
### Changed
- Updated the `{% css %}` and `{% js %}` tag documentation with their new ability to include CSS/JS files in Craft 3.5.6.

## 2020-08-24
### Changed
- Retitled + renamed testing setup page to improve search experience and indexing.
### Fixed
- Fixed sidebar active link color in dark mode.

## 2020-08-23
### Changed
- Updated remaining `project.yaml` references throughout the Craft 3 docs.

## 2020-08-22
### Changed
- Improved the Project Config page.

## 2020-08-21
### Added
- Added URL hash support for `updatedContent` frontmatter links.

### Changed
- Updated Project Config page for Craft 3.5.

### Security
- Updated the feed template examples in both Craft 2 and 3 docs, to stop calling `craft.request.url` / `craft.app.request.absoluteUrl` to avoid Host header injection attacks.

## 2020-08-20
### Added
- Added changelog!

### Fixed
- Removed `search` ID from the search box so it doesn’t interfere with content link anchors.
- Limited bright flash loading the docs in dark mode.
- Fixed various dark mode styles.

## 2020-08-19
### Added
- Added support for `prefers-reduced-motion: reduce`.

## 2020-08-18
### Changed
- Changed dark mode to application and override behavior to be more intuitive.

## 2020-08-14
### Changed
- Updated Intro to Craft tutorial with Nitro setup.
### Fixed
- Fixed a bunch of broken links in Japanese content.

## 2020-08-12
### Fixed
- Fixed scrollbar layout bugs.

## 2020-08-11
### Added
- Added Nitro docs!

## 2020-08-03
### Added
- Initial release.
