---
description: Craft’s powerful content features are driven by custom fields.
related:
  - uri: elements.md
    label: Learn about Elements
sidebarDepth: 2
---

# Custom Fields

On their own, [elements](elements.md) only provide a scaffold for your content—the content itself will be stored in *fields*.

Fields are managed in **Settings** → **Fields**, and can be created on-the-fly from a [field layout](#field-layouts) designer. Field layouts and [conditions](#conditions) determine where and when your fields should appear for content authors.

## Field Types

Choosing a field type determines what the field’s input UI is going to look like, how it stores data, how you’ll use that data in [templates](../development/templates.md), and the ways that you can [query](../development/element-queries.md) against that data.

<See path="../reference/field-types/" />

## Field Settings

<BrowserShot
  url="https://my-project.tld/admin/settings/fields/new"
  :link="false"
  :max-height="500"
  caption="Creating a field in the Craft control panel.">
<img src="../images/fields-new.png" alt="Editing a field in the Craft control panel">
</BrowserShot>

Most field types share a few settings.

Name
:   The user-facing label for the field. This should identify the field reasonably well among other fields, and be descriptive enough for authors. _You can override this in a field layout._

Handle
:   A developer-facing identifier for the field, used to access or query by its value from code. _You can override this in a field layout._

Default Instructions
:   Text displayed to authors in the field layout. Basic Markdown formatting is supported. _You can override this in a field layout._

Translation Method
:   How Craft handles the field’s value for elements that exist in multiple [sites](sites.md). See [Translation Methods](#translation-methods) below for more information.

::: tip
A field’s _name_ and _instructions_ can be overridden when adding it to a [layout](#field-layouts).  When a field supports [multiple instances](#multi-instance-fields) per layout, you can also override its _handle_.
:::

### Handles

Craft will auto-generate a **Handle** as you enter a **Name**, but you can adjust it however you see fit.

::: warning
Some handles are reserved so that custom fields don’t collide with native element attributes.
:::

Handles are used when accessing field data from code:

```twig
<div class="summary">
  {# Display a plain text field: #}
  <p>{{ entry.summaryShort }}</p>
</div>
```

They’re also how you will [query by a field’s value](../development/element-queries.md#querying-with-custom-fields):

```twig
{# Filter by the value of a lightswitch field: #}
{% set featuredPosts = craft.entries()
  .isFeatured(true)
  .all() %}
```

Refer to each field type’s documentation for information about what kinds of data it returns, and how to use it in your templates!

### Translation Methods

If you’re running a multi-site Craft installation, most of your fields will have a “Translation Method” setting (depending on their type).

Fields can have the following translation method:

- **Not translatable** – The field will have the same value across all sites.
- **Translate for each site** – The field can have a different value for each site.
- **Translate for each site group** – The field can have a different value for each site group.
- **Translate for each language** – The field can have a different value for each unique language associated with your sites.
- **Custom…** – The field can have different values based on a custom differentiator.

If you choose “Custom…”, a **Translation Key Format** setting will appear below, where you can define an [object template](object-templates.md) that determines how Craft copies the field’s value to other sites. When an element that uses the field is saved, Craft renders this template for each site the element exists in, and copies the value to any that produce the same key.

For example, if a field’s translation key format were `{site.handle[0:2]}`, then new field values would be copied over to any other sites where the first two characters of the site handle matches the first two characters of the original site’s handle. Looking at this from the opposite direction: any site that produces a _unique_ translation key for a field will have its value isolated from other sites.

If the translation key format returns an empty string (`''`), the field will not appear as translatable, and its value will not be copied to any other sites. A key format of `{section.handle == 'blog' ? site.handle : ''}`, for example, would display its field as translatable per-site from _only_ the `blog` section—otherwise it would not be available for translation in any other context.

::: tip
Keep in mind that fields can be assigned to multiple element types. Accessing invalid properties of the current element (like `section` on an [asset](../reference/element-types/assets.md)) may cause the key to end up blank (and therefore not translated).
:::

## Field Layouts

Everything in Craft that has content associated with it will expose a configurable _field layout_, to which you can add your fields:

- **[Entries](../reference/element-types/entries.md)** use the field layout defined by their entry type in **Settings** → **Entry Types** → [entry type name] → **Field Layout**.
- **[Global sets](../reference/element-types/globals.md)** each get their own field layout, defined in **Settings** → **Globals** → [global set name] → **Field Layout**.
- **[Assets](../reference/element-types/assets.md)** use the field layout defined by their asset volume in **Settings** → **Assets** → [asset volume name] → **Field Layout**.
- **[Categories](../reference/element-types/categories.md)** use the field layout defined by their category group in **Settings** → **Categories** → [category group name] → **Field Layout**.
- **[Tags](../reference/element-types/tags.md)** use the field layout defined by their tag group in **Settings** → **Tags** → [tag group name] → **Field Layout**.
- **[Users](../reference/element-types/users.md)** share a single field layout defined in **Settings** → **Users** → **User Fields**.
- **[Addresses](../reference/element-types/addresses.md)** also share a field layout, which can be found alongside **Users** in **Settings** → **Users** → **Address Fields**.

The field layout editor works the same way regardless of which content type you’re configuring:

![Screenshot of an entry’s field layout editor, with a Content tab containing three fields and a sidebar menu with “Fields” and “UI Elements” items that can be placed in the field layout](../images/field-layout-editor.png)

### Tabs

Every layout starts with a “Content” tab at the top. Add more tabs with the **New Tab** button, or update an existing tab by clicking its gear icon (<icon kind="settings" />) and selecting **Settings**. Drag and drop those tabs into whatever order you prefer—the first tab is selected by default when editing an entry.

::: tip
If the field layout has only one tab (or only one tab is visible due to applied conditions), its fields will be displayed in the editor without the tab itself—so its name will not be visible until more tabs are added.
:::

A tab’s settings include its name and optional conditions that determine when it will be displayed for editors:

![Screenshot of field layout editor with “Content” tab settings open in a slideout: Name, Current User Condition, and Entry Condition](../images/field-layout-tab-settings.png)

- **Name** – the label displayed for the tab when it’s visible in the editor.
- **Current User Condition** – optional rules for determining which users should see the tab in the editor. (When the tab is not displayed, its fields are hidden regardless of their individual conditions.)
- **Element Condition** – optional rules (based on the current element) that determine when the tab and its fields should be displayed in the editor.

### Field Layout Elements

Add however many fields you’d like to each tab, dragging them into your desired order. Most layouts include at least a **Title** field by default—even if it’s marked as _hidden_. Any available fields and UI elements will be available at the right edge of the layout designer, where you can drag them from the sidebar into your field layout. You can move fields back to the sidebar and out of your field layout (unless they’re _mandatory_ fields for the element type), but take care not to remove any fields already being used for important content.

By default, each field will be displayed at the full width (100%) of its tab. You can use the field width control, however, to designate a column size. This can be 25%, 50%, 75% or the default 100% width. Fields can appear side by side as long as the content editor’s browser window is wide enough. On small screens, fields may be shown at full width.

Click the gear icon (<icon kind="settings" />) next to a field to open a slideout with its settings:

![Screenshot of field layout editor with “Summary” field settings open in a slideout: Required, Label, Instructions, Current User Condition, and Entry Condition](../images/field-slideout.png)

The field’s settings let you control how and when it’s displayed:

- **Label** – Override the field’s default label.
- **Handle** – Override the field’s handle.
- **Instructions** – Override the field’s default instructions.
- **Current User Condition** – Set rules for determining which users can see the field and change its value.
- **Element Condition** – Set rules (based on the current element) that determine when the field should be displayed in an editor.
- **Required** – When a field is marked as **Required**, the element only validate when a value is present in the field. This may have different effects on different field types.
- **Use this field’s values for element thumbnails** — For fields that can be used as thumbnails in [chips and cards](elements.md#chips-cards), this option will appear.
- **Include this field in element cards** — Any fields with this enabled will appear whenever the element is rendered as a [card](elements.md#chips-cards). Fields that are also eligible for use as a thumbnail may be displayed twice!

::: tip
Only one field can be used as an element’s thumbnail at a time.
:::

Some field layout elements’ settings are bubbled up to the layout designer, beside the field’s name:

- An _asterisk_ (<icon kind="asterisk" />) means the field is **Required**.
- A _diamond_ means that it has been assigned one or more user or element [condition rules](#conditions).
- A _photo_ icon means the field will be used as the thumbnail in element [chips and cards](elements.md#chips-cards).
- An _eye_ means the field will appear in element cards.
- A _pencil_ icon indicates that the field contains overridden settings.

### Multi-Instance Fields <Badge text="New!" />

Most fields can be added to a single layout multiple times. Craft will automatically assign a new handle to fields that are used more than once in a layout. To customize a field’s handle for a given layout, click the settings <icon kind="gear" /> icon on the field layout element and change the **Handle** setting.

Multi-instance fields behave as though they were entirely different fields, in almost every situation: templates, element queries, condition builders, search, and so on. The field layout will retain a reference to the underlying field, so any settings updated for the base field will be reflected on each instance. For example, a [plain text](../reference/field-types/plain-text.md) field named “Attribution” could be used two (or more) times in a single entry type’s field layout: once for an article “Byline,” then again as “Photo Credit.” In a template, you would use those fields exactly like any other field:

```twig{7,12}
{% set image = entry.image.one() %}

<article>
  {% if image %}
    <figure>
      {{ image.getImg() }}
      <figcaption>{{ entry.photoCredit }}</figcaption>
    </figure>
  {% endif %}

  <h2>{{ entry.title }}</h2>
  <address rel="author">{{ entry.byline }}</address>

  {# ... #}
</article>
```

This example uses the same “Attribution” field as `photoCredit` _and_ `byline`, each storing its own content. You can target one instance of a field with [element queries](../development/element-queries.md), just as you’d expect:

```twig{4}
{% set postsMissingImageAttribution = craft.entries()
  .section('blog')
  .image(':notempty:')
  .photoCredit(':empty:')
  .count() %}
```

Conversely, adding one field to multiple different layouts (using the same handle—either its original handle, or by renaming each of them the same way) allows you to query across all instances. Craft quietly reconciles those field handles and builds the query appropriately:

```twig
{% set products = craft.entries()
  .section('products')
  .manufacturer('ACME%')
  .all() %}
{# -> Products made by ACME Labs and ACME Inc. across multiple product “types” with similar field layouts #}
```

This example assumes you have multiple [entry types](../reference/element-types/entries.md#entry-types) in a “Products” section, each using a centrally-defined, generic “Product Details” field—one instance of which per layout using the name “Manufacturer” and handle `manufacturer`.

### Conditions

Any fields (or [tabs](#tabs)) that have a **Current User Condition** or **Element Condition** configured will display an orange rhombus.

<img src="../images/field-layout-conditional.png" alt="A field layout element with conditions applied">

Conditions determine when (and to whom) a field or tab is displayed and validated. You can create sophisticated editorial processes by exposing parts of the authoring interface only when specific criteria are met.

::: warning
Conditions are not intended as a complete substitute for [permissions](user-management.md#permissions)! It’s still important to configure sensible base permissions for your editors.
:::

### UI Elements

Switch to the **UI Elements** tab at the right edge of the screen (replacing the **Fields** browser) to add special field layout elements.

- **Heading** — Create a label that splits up form inputs, within a tab.
- **Tip** & **Warning** — Display a message with the corresponding urgency. Equivalent, except in visual design.
- **Template** — Render a Twig template from your [`templates/` directory](directory-structure.md#templates). The template will receive the element being edited under an `element` variable.
- **Horizontal Rule** — A thin divider line. Subsequent fields will start in a new row.
- **Line Break** — An invisible element that ensures the next field is rendered in a new row.
- **Markdown** — Renders a multi-line Markdown snippet.

In addition to their own options (accessible via their <Icon kind="ellipses" /> action menu), most field layout UI elements share regular fields’ [condition](#conditions) settings.
