# Elements

An _element_ is the most basic unit of content in Craft. Elements provide smart management, routing, and querying interfaces for users and developers. Each [type](#element-types) of element has some unique capabilities, but they’re all built on top of a set of [common features](#common-features).

## Element Types

In the control panel, you’ll encounter the eight _element types_ common to all Craft installations:

- [**Assets**](../reference/element-types/assets.md) store files that are uploaded to a volume.
- [**Categories**](../reference/element-types/categories.md) are taxonomies that resemble folder structures and can be nested.
- [**Entries**](../reference/element-types/entries.md) are records that can have drafts, revisions, and live previews. They can exist as one-offs called _singles_, as _channels_ ordered by one or more attributes, or as hierarchical _structures_.
- [**Global Sets**](../reference/element-types/globals.md) are floating bits of content that aren’t tied to any particular page, but you may want to access anywhere.
- [**Tags**](../reference/element-types/tags.md) are flat taxonomies optimized for quick input and re-use.
- [**Users**](../reference/element-types/users.md) are accounts for human beings with email addresses and permissions, organized into customizable groups.
- [**Addresses**](../reference/element-types/addresses.md) are physical addresses that can be attached to users.

Choosing the appropriate element type for your content model is essential—but don’t be afraid to mix, match, and combine them. Plugins (and custom modules) can provide [custom element types](./extend/element-types.md), giving developers and authors a familiar experience across all their content.

## Common Features

Some features are available to most or all elements:

- Control panel interfaces, including forms, [indexes](#indexes), and [slide-outs](./control-panel.md#slideouts);
- [Custom fields](./fields.md) and field layouts;
- URLs and [routing](./routing.md);
- Localization via [sites](./sites.md);
- Sophisticated [permissions](./user-management.md#permissions);
- [Element queries](../development/element-queries.md) with advanced sorting and filtering capabilities;
- Bi-directional [relationships](./relations.md);
- Automatic indexing for [search](./searching.md);

Other features are specific to a type—like Assets’ tie to files, or Entries’ drafts and revisions system.

## Indexes

You’ll access most elements via their element index. Indexes allow you to browse, sort, and [search](./searching.md) for elements in a paginated, table-like view.

### Sources

Indexes are broken down into **sources**. Sources can be permanent fixtures of an element type (like the **Admin** source for users), dynamically added based on its configuration (like those for user groups), or defined by a set of custom rules.

Each source also controls what columns are visible in the index, and its default sorting.

<BrowserShot url="https://my-craft-project.ddev.site/categories/species" :link="false" caption="Customizing element sources.">
<img src="../images/element-index-customize-sources.png" alt="Customizing element sources">
</BrowserShot>

::: tip
Custom sources are stored in [Project Config](./project-config.md). The interface for conditions that involve specific elements (like an author) may appear differently than the equivalent [filter](#filters-and-columns), because the ID may not be stable between environments.

Instead of an element select field, you’ll see an [autosuggest input](./project-config.md#secrets-and-the-environment).
:::

### Filters and Columns

As a complement to custom sources, any user with access to an element index can temporarily filter results using the condition builder interface:

<BrowserShot url="https://my-craft-project.ddev.site/categories/species" :link="false" caption="Using the condition builder to narrow results.">
<img src="../images/element-index-condition-builder.png" alt="Craft’s condition builder">
</BrowserShot>

Similarly, they can customize what columns appear in the table (and how the results are ordered) with the **View** menu:

<BrowserShot url="https://my-craft-project.ddev.site/categories/species" :link="false">
<img src="../images/element-index-view-options.png" alt="Customizing element index columns and sorting">
</BrowserShot>

If every field layout that would be used by an element in a source defines the same label override for a field, that label will appear in the column’s header. When a consensus cannot be reached, the original field’s label is used. This most commonly applies when a source is limited to a single entry type, asset volume, category group, or other property that also defines field layouts.

### Structures

[Entries](../reference/element-types/entries.md) (using the _Structure_ section type) and [Categories](../reference/element-types/categories.md) support a hierarchical view mode on their indexes. Elements in structures track their relative position among siblings, and can be easily relocated by dragging-and-dropping <Icon kind="move" /> their row in an index. Reordering is still possible, even when the structure is limited to a single level.

::: tip
Use the **View** menu to switch back into structure mode for an index.
:::

### Actions

Each element type supports its own set of _actions_ that can be performed on one or more elements, from an index. These actions are either visible directly in the index toolbar (like _Status_), or collected under the <Icon kind="settings" /> icon in the footer (like _Delete_).

Actions may be hidden or disabled when they don’t apply to the selection or [source](#sources).

### Exporters

Craft can export sets of elements to CSV, JSON, or XML. The **Export…** button in the index footer displays all options, including any [custom exporters](../extend/element-exporter-types.md) registered by modules and plugins.

### Modals + Contexts

A streamlined version of indexes are used when adding elements to a [relational](./relations.md) field via a modal. Depending on the field’s configuration, Craft may hide sources or actions, and disable [slideouts](./control-panel.md#slideouts) (except to create a new element, in-context) and pagination (in favor of scrolling). Internally, Craft refers to these variations as “contexts,” which [plugins](../extend/element-types.md#sources) have an opportunity to modify.

## Properties and Methods

<Todo notes="Move to elements reference." />

All elements share a few characteristics that make them familiar to work with in your templates. Each [element type](#element-types) will supplement these lists with their own properties and methods.

::: warning
This is not an exhaustive list! If you’re curious, consult the <craft4:craft\base\Element> and <craft4:craft\base\ElementTrait> class reference for a complete picture of what data is available inside elements and how it can be used.
:::

### Properties

Properties give you access to values, and do not accept arguments.

Property | Type | Notes
-------- | ---- | -----
`archived` | `bool|null` | Whether the element is soft-deleted, or “trashed.”
`dateCreated` | `DateTime` | Date the element was originally created.
`dateDeleted` | `DateTime|null` | Date the element was soft-deleted or `null` if not.
`dateUpdated` | `DateTime` | Date the element was last updated.
`enabled` | `bool` | Whether the element is enabled (globally).
`id` | `int` | ID of the element.
`level` | `int|null` | Depth of the element in a structure. _Structures only._
`parentId` | `int|null` | ID of the parent element. _Structures only._
`searchScore` | `int` | Score relative to other results when returned from an [element query](element-queries.md) using the [`search` param](searching.md).
`siteId` | `int` | ID of the <craft4:craft\models\Site> the element was loaded in.
`slug` | `string|null` | _Only for elements with slugs._
`title` | `string|null` | _Only for elements with titles._
`trashed` | `bool` | Whether or not the element has been soft-deleted.
`uid` | `string|null` | A UUIDv4 string uniquely identifying this element.
`uri` | `string|null` | Resolved URI or path for the site the element was loaded in. _Only for elements with URLs._

### Methods

Methods also return values, but may accept or require arguments.

::: tip
Any method beginning with `get` can be used like a [property](#properties) by removing the prefix and down-casing the first letter. For example, `{{ entry.getLink() }}` can also be accessed as `{{ entry.link }}`
:::

Method | Notes
------ | -----
`getAncestors(dist)` | Returns up to `dist` parents of the element, or all parents when omitted. _Structures only._
`getChildren()` | Returns immediate children of the element. _Structures only._
`getCpEditUrl()` | Gets a URL to the Craft control panel.
`getDescendants(dist)` | Returns descendants of the element, down to `dist` levels below this one, or all descendants, when omitted. _Structures only._
`getHasDescendants()` | Build an HTML anchor tag with its front-end URL and title. _Elements with URLs only._
`getLink()` | Build an HTML anchor tag with its front-end URL and title. _Elements with URLs only._
`getNext(criteria)` | Load the “next” element relative to this one, given a set of criteria.
`getNextSibling()` | Load the next sibling of this element, within a structure. _Structures only._
`getEnabledForSite(siteId)` | Whether the element is enabled in the provided site, or the site it was loaded in if no ID is provided.
`getParent()` | Returns the element’s parent. _Structures only._
`getPrev(criteria)` | Load the previous element relative to this one, given a set of criteria.
`getPrevSibling()` | Load the previous sibling of this element, within a structure. _Structures only._
`getRef()` | Builds the part of a [reference tag](reference-tags.md) unique to the element.
`getSiblings()` | Load siblings within the element’s structure. _Structures only._
`getSite()` | Returns the <craft4:craft\models\Site> the element was loaded for.
`getStatus()` | 
`getUrl()` | Builds a complete front-end URL based on the element’s URI.
