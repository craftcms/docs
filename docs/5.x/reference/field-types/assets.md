---
related:
  - uri: ../element-types/addresses.md
    label: Address Elements
  - uri: ../../system/relations.md
    label: Using Relationships
  - uri: link.md
    label: Link fields
---

# Assets Fields

Assets fields allow you to upload and relate [assets](../element-types/assets.md) to other elements. It is one of Craft’s [relational](../../system/relations.md) custom fields.

<!-- more -->

## Settings

Assets fields have the following settings:

- **Restrict uploads to a single folder?** – Whether file uploads/relations should be constrained to a single folder.

  If enabled, the following setting will be visible:

  - **Asset Location** – A specific volume and folder from which assets can be selected (and into which assets uploaded directly to the field are saved). The path portion of this setting is evaluated as an [object template](../../system/object-templates.md).

  If disabled, the following settings will be visible:

  - **Sources** – Which asset volumes (or other asset index [sources](../../system/elements.md#sources)) the field should be able to relate assets from.
  - **Default Upload Location** – The default volume and path that files are stored in when uploaded directly to the field. This setting is evaluated as an [object template](../../system/object-templates.md).

- **Restrict allowed file types?** Whether the field should only be able to upload/relate files of a certain type(s).
- **Limit** – The maximum number of assets that can be related with the field at once. (Default is no limit.)
- **View Mode** – How the field should appear for authors.
- **“Add” Button Label** – The label that should be used on the field’s selection button.
- **Validate related assets** — Whether or not validation errors on the related assets will be bubbled up.
- **Preview Mode** — How this field’s values are displayed when included on element indexes.

### Multi-Site Settings

On multi-site installs, the following settings will also be available:

- **Translation Method** — How relationships are handled when [propagating changes to other sites](../../system/fields.md#translation-methods).
- **Relate assets from a specific site?** — Whether to only allow relations to assets from a specific site.
  - If _enabled_, a new setting will appear where you can choose which site.
  - If _disabled_, related assets will always be pulled from the current site.

- **Show the site menu** — Whether to display the site menu in asset selection modals. (This setting is hidden when relations are locked to a single site.)

<See path="../../system/fields.md" hash="translation-methods" label="Translation Methods" description="Learn about options for translating field values." />

### Dynamic Subfolder Paths

Subfolder paths defined by the **Upload Location** and **Default Upload Location** settings are [object templates](../../system/object-templates.md). Any properties supported by the source element (the element that has the assets field) can be used here.

::: warning
Be aware that _fields are reusable_, and can be added to [nested](#nested-elements) _and_ non-nested elements’ field layouts—and on different element types! Constructing a subfolder template that works in all contexts (and is readable and reliable) can be challenging—consider maintaining separate fields to avoid this complexity.
:::

#### IDs and UIDs

If you want to include an element’s ID or UID in a dynamic subfolder path, use `{canonicalId}` or `{canonicalUid}` rather than `{id}` or `{uid}`, so the source element’s ID or UID is used rather than the those of a draft or revision.

#### Nested Elements

If an Assets field is used by an [entry type](../element-types/entries.md#entry-types) within a [Matrix field](matrix.md), the source element will be the nested entry, _not_ the element that the entry belongs to. This means that assets attached to different nested entries may end up in different folders!

In these situations, you should use `owner.someElementProperty` instead of just `someElementProperty`; the previous example would become `owner.canonicalId` or `owner.canonicalUid`.

#### Conditional Path Segments

If a rendered subfolder path ends up blank or contains a leading, trailing, or double forward slash (e.g. `/bar/baz`, `foo/`, or `foo//bar`), Craft considers it invalid. When you suspect a value it depends on may not be available, output `:ignore:`. Suppose you want to output the first selected category, or nothing (when one isn’t selected):

```twig
blog/{{ categoriesFieldHandle.one().slug ?? ':ignore:' }}/{canonicalId}
```

This is equivalent to conditionally outputting the slashes as part of a value:

```twig
blog/{{ categoriesFieldHandle.exists() ? "#{categoriesFieldHandle.one().slug}/" : null }}{canonicalId}
```

## The Field

Assets fields list all the currently-related assets, with a button to select new ones.

Choosing **Add an asset** will bring up a modal window where you can find and select additional assets, as well as upload new ones.

::: tip
You can also upload assets by dragging files directly onto the assets field, or into the modal window.
:::

### Inline Asset Editing

Double-click on a related asset to edit it in a [slideout](../../system/control-panel.md#slideouts).

::: tip
You can choose which custom fields should be available for assets in each volume from **Settings** → **Assets** → **[Volume Name]** → **Field Layout**.
:::

## Development

### Querying Elements with Assets Fields

When [querying for elements](../../development/element-queries.md) that have an Assets field, you can filter the results based on the Assets field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `':empty:'` | that don’t have any related assets.
| `':notempty:'` | that have at least one related asset.
| `100` | that are related to the asset with an ID of 100.
| `[100, 200]` | that are related to an asset with an ID of 100 or 200.
| `[':empty:', 100, 200]` | with no related assets, or are related to an asset with an ID of 100 or 200.
| `['and', 100, 200]` | that are related to the assets with IDs of 100 and 200.
| an [Asset](craft5:craft\elements\Asset) object | that are related to the asset.
| an [AssetQuery](craft5:craft\elements\db\AssetQuery) object | that are related to any of the resulting assets.

::: code
```twig
{# Fetch entries with a related asset #}
{% set entries = craft.entries()
  .myFieldHandle(':notempty:')
  .all() %}
```
```php
// Fetch entries with a related asset
$entries = \craft\elements\Entry::find()
    ->myFieldHandle(':notempty:')
    ->all();
```
:::

### Working with Assets Field Data

If you have an element with an Assets field in your template, you can access its related assets using your Assets field’s handle:

::: code
```twig
{% set query = entry.myFieldHandle %}
```
```php
$query = $entry->myFieldHandle;
```
:::

That will give you an [asset query](../element-types/assets.md#querying-assets), prepped to output all the related assets for the given field.

To loop through all the related assets, call [all()](craft5:craft\db\Query::all()) and then loop over the results:

::: code
```twig
{% set relatedAssets = entry.myFieldHandle.all() %}
{% if relatedAssets|length %}
  <ul>
    {% for rel in relatedAssets %}
      <li><a href="{{ rel.url }}">{{ rel.filename }}</a></li>
    {% endfor %}
  </ul>
{% endif %}
```
```php
$relatedAssets = $entry->myFieldHandle->all();

if (count($relatedAssets)) {
    foreach ($relatedAssets as $rel) {
        // do something with $rel->url and $rel->filename
    }
}
```
:::

::: warning
When using `asset.url` or `asset.getUrl()`, the asset’s source volume must have **Assets in this volume have public URLs** enabled and a **Base URL** setting. Otherwise, the result will always be empty.
:::

If you only want the first related asset, call [one()](craft5:craft\db\Query::one()) instead and make sure it returned something:

::: code
```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
  <p><a href="{{ rel.url }}">{{ rel.filename }}</a></p>
{% endif %}
```
```php
$rel = $entry->myFieldHandle->one();
if ($rel) {
    // do something with $rel->url and $rel->filename
}
```
:::

If you need to check for related assets without fetching them, you can call [exists()](craft5:craft\db\Query::exists()):

::: code
```twig
{% if entry.myFieldHandle.exists() %}
  <p>There are related assets!</p>
{% endif %}
```
```php
if ($entry->myFieldHandle->exists()) {
    // do something with related assets
}
```
:::

You can set [parameters](../element-types/assets.md#parameters) on the asset query as well. For example, to ensure that only images are returned, you can set the [kind](../element-types/assets.md#kind) param:

::: code
```twig
{% set relatedAssets = entry.myFieldHandle
  .kind('image')
  .all() %}
```
```php
$relatedAssets = $entry->myFieldHandle
    ->kind('image')
    ->all();
```
:::

::: tip
<Todo notes="Extract this into a snippet." />

In Craft 3, we recommended cloning these query objects using the [`clone` keyword](https://www.php.net/manual/en/language.oop5.cloning.php) or [`clone()`](../twig/functions.md#clone) Twig function before applying params. **This is no longer required in Craft 4**, because a new copy of the query is returned each time you access the field property.
:::

### Saving Assets Fields

If you have an element form, such as an [entry form](kb:entry-form), that needs to contain an Assets field, you will need to submit your field value as a list of asset IDs in the order you want them to be related.

For example, you could create a list of checkboxes for each of the possible relations:

```twig
{# Include a hidden input first so Craft knows to update the existing value
   if no checkboxes are checked. #}
{{ hiddenInput('fields[myFieldHandle]', '') }}

{# Get all of the possible asset options #}
{% set possibleAssets = craft.assets()
  .volume('siteAssets')
  .kind('image')
  .orderBy('filename ASC')
  .withTransforms([{ width: 100, height: 100 }])
  .all() %}

{# Get the currently related asset IDs #}
{% set relatedAssetIds = entry is defined
  ? entry.myFieldHandle.ids()
  : [] %}

<ul>
  {% for possibleAsset in possibleAssets %}
    <li>
      <label>
        {{ input(
          'checkbox',
          'fields[myFieldHandle][]',
          possibleAsset.id,
          { checked: possibleAsset.id in relatedAssetIds }
        ) }}
        {{ tag('img', { src: possibleAsset.url }) }}
        {{ possibleAsset.getImg({ width: 100, height: 100 }) }}
        {{ possibleAsset.filename }}
      </label>
    </li>
  {% endfor %}
</ul>
```

You could then make the checkbox list sortable, so users have control over the order of related assets.

#### Creating New Assets

Assets fields can handle new file uploads as well:

```twig
{{ input('file', 'fields[myFieldHandle][]', options={
  multiple: true,
}) }}
```

::: tip
Don’t forget to set `enctype="multipart/form-data"` on your `<form>` tag so your browser knows to submit the form as a multipart request.
:::

Alternatively, you can submit base64-encoded file data, which the Assets field will decode and treat as an uploaded file. To do that, you have to specify both the data and the filename like this:

```twig
{{ hiddenInput(
  'fields[myFieldHandle][data][]',
  'data:image/jpeg;base64,my-base64-data'
) }}
{{ hiddenInput('fields[myFieldHandle][filename][]', 'myFile.ext') }}
```

However you upload new assets, you may want to maintain any that already exist on the field and append new ones to the set instead of replacing it.

You can do this by passing each of the related asset IDs in the field data array, like we are here with hidden form inputs:

```twig{1-8}
{# Provide each existing asset ID in the array of field data #}
{% for relatedAssetId in entry.myFieldHandle.ids() %}
  {{ input(
    'hidden',
    'fields[myFieldHandle][]',
    relatedAssetId
  ) }}
{% endfor %}

{{ input('file', 'fields[myFieldHandle][]', options={
  multiple: true,
}) }}
```

## See Also

- [Asset Queries](../element-types/assets.md#querying-assets)
- <craft5:craft\elements\Asset>
- [Relations](../../system/relations.md)
