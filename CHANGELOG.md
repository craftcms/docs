# Changelog

Theme and significant content changes will be documented in this file.

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
