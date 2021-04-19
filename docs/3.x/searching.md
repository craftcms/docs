# Searching

Craft CMS includes a system-wide search service used for finding elements via keyword search.\
This powers the search experience throughout the Craft control panel, and you can use it to add search functionality to your site’s front end.

Control panel users can search for elements anywhere this bar is available:

![Search Bar](./images/search-bar.svg)

You can search for elements from your own code, too:

::: code
```twig
{% set results = craft.entries()
    .search('foo')
    .all() %}
```
```graphql
{
	entries(search: "foo") {
		title
    }
}
```
```php
$results = \craft\elements\Entry::find()
    ->search('foo')
    ->all();
```
:::

::: tip
The [`defaultSearchTermOptions`](config3:defaultSearchTermOptions) config setting lets you adjust default search behavior.
:::

## Supported Syntaxes

Craft supports the following syntax wherever you happen to search from:

Searching for… | will find elements…
-|-
`salty` | containing “salty”.
`salty dog` | containing both “salty” and “dog”.
`salty OR dog` | containing either “salty” or “dog” (or both).
`salty -dog` | containing “salty” but not “dog”.
`"salty dog"` | containing the exact phrase “salty dog”.
`*ty` | containing a word that ends with “ty”.
`*alt*` | containing a word that contains “alt”.
`body:salty` | where the `body` field contains “salty”.
`body:salty body:dog` | where the `body` field contains both “salty” and “dog”.
`body:salty OR body:dog` | where the `body` field contains either “salty” or “dog”.
`body:salty -body:dog` | where the `body` field contains “salty” but not “dog”.
`body:"salty dog"` | where the `body` field contains the exact phrase “salty dog”.
`body:*ty` | where the `body` field contains a word that ends with “ty”.
`body:*alt*` | where the `body` field contains a word that contains “alt”.
`body::salty` | where the `body` field is set to “salty” and nothing more.
`body::"salty dog"` | where the `body` field is set to “salty dog” and nothing more.
`body::salty*` | where the `body` field begins with “salty”.
`body::*dog` | where the `body` field ends with “dog”.
`body:*` | where the `body` field contains any value.
`-body:*` | where the `body` field is empty.

## Searching for Specific Element Attributes

Assets, categories, entries, users, and tags each support their own set of additional attributes to search against:

Element | Additional Search Attributes
-|-
Assets | `filename`<br>`extension`<br>`kind`
Categories | `title`<br>`slug`
Entries | `title`<br>`slug`
Users | `username`<br>`firstName`<br>`lastName`<br>`fullName` (firstName + lastName)<br>`email` 
Tags | `title`

::: warning
Searching is a great way to quickly query content broadly across elements, but the most precise way to query field attributes is through that field type’s [query parameter](element-queries.md#executing-element-queries).
:::

## Development

`craft.assets()`, `craft.entries()`, `craft.tags()`, and `craft.users()` support a `search` parameter you can use to filter their elements by a given search query.

::: code
```twig
{# Get the user’s search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch entries that match the search query #}
{% set results = craft.entries()
    .search(searchQuery)
    .all() %}
```
```php
// Get the user’s search query from the 'q' query string param
$searchQuery = Craft::$app->getRequest()->getParam('q');

// Fetch entries that match the search query
$results = \craft\elements\Entry::find()
    ->search($searchQuery)
    ->all();
```
:::

### Ordering Results by Score

You can also set the `orderBy` parameter to `'score'` if you want results ordered by best-match to worst-match:

::: code
```twig
{% set results = craft.entries()
    .search('foo')
    .orderBy('score')
    .all() %}
```
```graphql
{
	entries(search: "foo", orderBy: "score") {
		title
    }
}
```
```php
$results = \craft\elements\Entry::find()
    ->search('foo')
    ->orderBy('score')
    ->all();
```
:::

When you do this, each of the elements returned will have a `searchScore` attribute set, which reveals what their search score was.

::: tip
See our [Search Form](https://craftcms.com/knowledge-base/search-form) article for a complete example of listing dynamic search results.
:::

## Configuring Custom Fields for Search

Each element type makes basic details, called _searchable attributes_, available as search keywords. It’s common to search for entries by title, for example, or for users matching a name or email address. (We just looked at these in the [Searching for Specific Element Attributes](#searching-for-specific-element-attributes) table.)

You can also configure any custom field to make its content available for search by enabling **Use this field’s values as search keywords**:

![Searchable Checkbox](./images/searchable-checkbox.png)

Once enabled, the next time an element is saved that field’s content will be stored as plain-text keywords in Craft’s `searchindex` table and available for search.

::: tip
For relational field types like Assets fields, Matrix fields, etc., the top-level **Use this field’s values as search keywords** setting determines whether any sub-fields or child elements will factor into results for the parent.
:::

## Rebuilding Your Search Indexes

Craft does its best to keep its search indexes as up-to-date as possible, but there are a couple things that might render portions of them inaccurate. If you suspect your search indexes are out of date, you can have Craft rebuild them by bulk-resaving your entries with the [`resave/entries`](console-commands.md#resave) command and including the `--update-search-index` flag:

```bash
php craft resave/entries --update-search-index
```

You can specify which entries should be resaved with the `--section` and `--type` options, among others. Run `resave/entries --help` to see a full list of supported options.
