---
description: Make important content available anywhere.
containsGeneratedContent: yes
related:
  - uri: ../../system/elements.md
    label: Introduction to Elements
---

# Globals

Globals store content that is available globally throughout your templates but is not tied to any one URL.

<!-- more -->

Craft organizes globals into global sets. Each global set has its own [field layout](../../system/fields.md#field-layouts) and can use any of the built-in or plugin-provided custom fields.

To create a global get, go to **Settings** → **Globals**.

If you have at least one Global Set, Craft will add a new “Globals” item to the main control panel navigation. Clicking this will take you to a page that lists all your global sets in a sidebar, as well as all of the fields associated with the selected global set in the main content area.

::: tip
Unlike [entries](entries.md#entries), global sets don’t have the Live Preview feature, since they aren’t associated with any one particular URL.
:::

<Block label="Migrating to Singles">

With the release of Craft 4.4, we began consolidating features of [other element types](../../system/elements.md) into [entries](entries.md).

As part of that process, we introduced a [console command](../cli.md#entrify-global-set) that can automate the conversion of global sets to entries:

```bash
php craft entrify/global-set myGlobalSetHandle
```

You will be given an opportunity to migrate the global set into a new or existing [single](entries.md#singles). The **Title** field (and **Status** controls) for the single’s new entry type will be disabled, to maintain parity with the legacy globals interface.

Read more about this [transition](https://craftcms.com/blog/entrification) on our blog.

</Block>

## Global Sets in Templates

You can access your global sets from any template via their handles.

If you have a global set with the handle `companyInfo` and it has a field with the handle `yearEstablished`, you can access that field anywhere using this code:

```twig
{{ companyInfo.yearEstablished }}
```

For additional global set properties you can use besides your custom fields see <craft5:craft\elements\GlobalSet> for a full reference.

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

More details are available in the [Globals service class documentation](craft5:craft\services\Globals).

## Global Sets with Multiple Sites

If you run multiple sites with Craft, global sets are available in all sites. However, you can set the values in those sets on a per site basis, even leaving some fields blank, if desired.

To do that, edit the global set’s fields, and make sure that their “Translation Method” settings are set to “Translate for each site”.

To toggle between sites while viewing global sets, use the dropdown menu at the top left of the global sets page in the control panel.

![Toggling between sites in Globals](../../images/globals-multisite-nav.png)

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

Once you’ve created a global set query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](../../development/element-queries.md#executing-element-queries) by calling `.all()`. An array of [GlobalSet](craft5:craft\elements\GlobalSet) objects will be returned.

::: tip
See [Element Queries](../../development/element-queries.md) to learn about how element queries work.
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
!!!include(docs/.artifacts/cms/5.x/globals.md)!!!
