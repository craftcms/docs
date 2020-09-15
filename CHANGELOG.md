# Changelog

Theme and significant content changes will be documented in this file.

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
