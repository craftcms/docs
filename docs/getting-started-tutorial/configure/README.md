# Define a Content Model

Now that we have a working Craft installation, it’s time to explore some of its powerful content modeling features.

In the next few sections, we will:

1. Review Craft’s native content types;
1. Create a space to author blog posts and add custom fields;
1. Define some globally-available data;
1. Add a one-off “About” page;
1. Draft and publish some content;

## Content Types in Craft

Craft provides a number of distinct building blocks, each appropriate for different kinds of content. Let’s take a quick look at a few of them that will be particularly useful in building a blog.

::: tip
We use the term _elements_ to collectively describe the variety of content types Craft comes with. Plugins can provide their own element types, as well!
:::

### Entries

Entries are the most versatile type of element. Every entry belongs to a _section_ (or another entry), which determines how administrators will use them. Entries have titles, authors, post dates, and expiry dates.

Sections come in three flavors: **Channels**, **Singles**, and **Structures**. These section types share many features like field layouts, template mappings, customizable URL patterns, localization, and more.

Channels
: A channel is typically used to syndicate many entries with a similar composition, sorted by one or more of their built-in attributes or custom fields. Channels can have multiple _entry types_ to further distinguish, filter, or sort entries. Each entry type has its own _field layout_.

: **Example**: Articles, events, classifieds, employee profiles.

Singles
: Singles are for one-off pages: there will only ever be one entry per single. URLs of singles can be locked to prevent tampering.

: **Example**: Homepage, a blog landing page, featured case studies, or an “About” page.

Structures
: Structures support the same features as channels, but add the ability to nest entries hierarchically—and to define their order in relation to one another. This tree-like organization makes them a good candidate for complex bundles of information, or for situations where the order of pages is important.

: **Example**: Reference libraries, sequential tutorials, multi-page case studies.

#### Entry Types

Entry types provide rich variations in authoring experience, within a section—or when nested within one another. You can also use entry types to differentiate content in the front-end, by presenting their unique fields with appropriate markup and styles.

### Globals

In situations where you need to manage some information that isn’t associated with a single page (or that might be accessed in many places throughout a site) _globals_ are the answer. Globals are a lot like _singles_, except they do not get their own URLs.

Each global set has its own field layout, and can use any of your custom fields. Globals are always within reach in the control panel, under a main navigation item.

**Example**: Navigation, sidebars, footer or header content, or non-critical “settings” you want controlled by a user (like an analytics ID).

### Categories

Categories are mostly obsolete in Craft (their functionality can be fully replicated with entries, thanks to Craft’s powerful relations engine), but exist in a separate space for semantic reasons. They provide a means of organizing other elements into user-defined, hierarchical taxonomies—while acting as content containers themselves!

**Example**: Corporate structure, species, genres, locations.

### Assets

Assets are Craft’s way of managing uploaded files. They’re stored on _filesystems_, and organized into groups called _volumes_, which can have any number of nested folders. In addition to keeping track of the underlying file, Assets are elements just like entries: each volume defines a field layout, allowing you to attach rich custom field data.

Craft also includes a browser-based image editor, which supports cropping, rotating, flipping, and setting “focal points.” These tools can be used in conjunction with Craft’s sophisticated image transform system to generate and deliver highly-optimized variations on images for your front-end.

## Custom Fields

Your content model is defined by the union of element types’ native properties and whatever _custom fields_ are attached to them via _field layouts_. Craft comes with a number of powerful field types, out-of-the-box:

<div class="grid-container">
  <GridItem label="Assets" src="/images/field-assets.svg" />
  <GridItem label="Categories" src="/images/field-categories.svg" />
  <GridItem label="Checkboxes" src="/images/field-checkboxes.svg" />
  <GridItem label="Color" src="/images/field-color.svg" />
  <GridItem label="Date/Time" src="/images/field-date-time.svg" />
  <GridItem label="Dropdown" src="/images/field-dropdown.svg" />
  <GridItem label="Email" src="/images/field-email.svg" />
  <GridItem label="Entries" src="/images/field-entries.svg" />
  <GridItem label="Lightswitch" src="/images/field-lightswitch.svg" />
  <GridItem label="Matrix" src="/images/field-matrix.svg" />
  <GridItem label="Money" src="/images/field-money.svg" />
  <GridItem label="Multi-select" src="/images/field-multi-select.svg" />
  <GridItem label="Number" src="/images/field-number.svg" />
  <GridItem label="Plain Text" src="/images/field-plain-text.svg" />
  <GridItem label="Radio Buttons" src="/images/field-radio-buttons.svg" />
  <GridItem label="Table" src="/images/field-table.svg" />
  <GridItem label="Tags" src="/images/field-tags.svg" />
  <GridItem label="Time" src="/images/field-date-time.svg" />
  <GridItem label="Link" src="/images/field-url.svg" />
  <GridItem label="Users" src="/images/field-users.svg" />
</div>

The specifics of each field aren’t important just yet—we’ll take a closer look at a few of them in just a moment.

::: tip
There are loads more field types available in the official [Plugin Store](https://plugins.craftcms.com/categories/fields).
:::

## Modeling a Blog Post

As our first exercise in content modeling, let’s consider what comprises a blog post:

- Title/Headline
- Author
- Post Date
- Feature/Summary Image
- Summary/Description
- Categories
- Content/Body

From the element types and fields we’ve learned about so far, we might map these features into Craft concepts, like this:

- Blog posts will be **entries**, which natively support:
    - **Titles**;
    - **Post Dates**;
    - **Authors**;
- Feature images will be uploaded as **assets**;
- Summary text can live in a **Plain Text** field;
- Categories can be handled with Craft’s element type of the same name (we’ll learn about this as we set it up—categories are very similar to entries);
- Post content will be managed as nested, repeatable entries with a **Matrix** field;

This process may seem arcane at first—once you’ve had a chance to see the tools in action, connecting them to your project goals will feel less mechanical and more creative.

Let’s dive in to the **Settings** screen of the control panel!
