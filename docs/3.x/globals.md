---
containsGeneratedContent: yes
---

# Globals

Globals store content that is available globally throughout your templates. They’re a convenient way to make non-Entry content easily editable via the control panel.

Craft organizes globals into global sets. Each global set has its own [field layout](fields.md#field-layouts) using any of the existing fields or new fields.

To create a global set, go to **Settings** → **Globals**.

If you have at least one global set, Craft will add a new “Globals” item to the main control panel navigation. Clicking this will take you to a page that lists all your global sets in a sidebar, as well as all of the fields associated with the selected global set in the main content area.

::: tip
Unlike [entries](entries.md#entries), global sets don’t have the Live Preview feature, since they aren’t associated with any one particular URL.
:::

## Global Sets in Templates

You can access your global sets from any template via their handles.

If you have a global set with the handle `companyInfo` and it has a field with the handle `yearEstablished`, you can access that field anywhere using this code:

```twig
{{ companyInfo.yearEstablished }}
```

For additional global set properties you can use besides your custom fields see <craft3:craft\elements\GlobalSet> for a full reference.

### Manually Loading Global Sets

In some special situations, like within email templates, global sets won’t be available by default. Any global set may still be loaded manually. The above example could be loaded with `getSetByHandle()`:

::: code
```twig
{% set companyInfo = craft.app.globals().getSetByHandle('companyInfo') %}
```
```php
$companyInfo = \Craft::$app->getGlobals()->getSetByHandle('companyInfo');
```
:::

More details are available in the [Globals service class documentation](craft3:craft\services\Globals).

## Global Sets with Multiple Sites

If you run multiple sites with Craft, global sets are available in all sites. However, you can set the values in those sets on a per site basis, even leaving some fields blank, if desired.

To do that, edit the global set’s fields, and make sure that their “Translation Method” settings are set to “Translate for each site”.

To toggle between sites while viewing global sets, use the dropdown menu at the top left of the global sets page in the control panel.

![Toggling between sites in Globals](./images/globals-multisite-nav.png)

## Querying Globals

You can fetch global sets in your templates or PHP code using **global set queries**.

::: code
```twig
{# Create a new global set query #}
{% set myGlobalSetQuery = craft.globalSets() %}
```
```php
// Create a new global set query
$myGlobalSetQuery = \craft\elements\GlobalSet::find();
```
:::

Once you’ve created a global set query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](element-queries.md#executing-element-queries) by calling `.all()`. An array of [GlobalSet](craft3:craft\elements\GlobalSet) objects will be returned.

::: tip
See [Element Queries](element-queries.md) to learn about how element queries work.
:::

### Example

We can load a global set from the primary site and display its content by doing the following:

1. Create a global set query with `craft.globalSets()`.
2. Set the [handle](#handle) and [siteId](#siteid) parameters on it.
3. Fetch the global set with `.one()`.
4. Output its content.

```twig
{# Create a global set query with the 'handle' and 'siteId' parameters #}
{% set myGlobalSetQuery = craft.globalSets()
  .handle('footerCopy')
  .siteId(1) %}

{# Fetch the global set #}
{% set globalSet = myGlobalSetQuery.one() %}

{# Display the content #}
<p>{{ globalSet.copyrightInfo }}</p>
```

::: tip
All global sets are already available as global variables to Twig templates. So you only need to fetch them through  `craft.globalSets()` if you need to access their content for a different site than the current site.
:::

### Parameters

Global set queries support the following parameters:

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/cms/3.x/globals.md)!!!
