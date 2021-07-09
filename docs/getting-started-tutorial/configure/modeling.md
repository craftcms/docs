# Content in Craft CMS

The process of deciding what shape your content should take is referred to as “content modeling.” Once you’re familiar with Craft’s building blocks, it can be liberating and even fun to decide how you’ll use them to bring your project to life.

## Get familiar with content modeling in Craft

Let’s take a quick look at the key building blocks and then use them to set up our blog.

<img src="../images/icons/sections-entries.svg" width="48" class="no-zoom relative -mb-6 mt-8">

### Sections & Entries

Sections are often where most of your content may live. A section is a collection of similar types of content, like a blog post, press release, or job listing. Each section is meant to have many Entries that each follow a specific URL pattern and use whatever set of custom input fields you decide it should have.

A job listing section, for example, might have fields for skill requirements, location and salary range. A blog post probably won’t need any of those, but certainly a post body, imagery, and categories or tags.

<img src="../images/icons/structures.svg" width="48" class="no-zoom relative -mb-6 mt-8">

### Structures

A normal Section will have Entries that are ordered by date. A Structure is a special kind of Section where Entries can be dragged and dropped into a fixed hierarchy that’s more useful for products and services, case studies, or content that’s meant to be presented in a very specific order.

<img src="../images/icons/singles.svg" width="42" class="no-zoom relative -mb-6 mt-8">

### Singles

Singles are for one-off pages. (Technically, Singles are a type of Section that only has one page.) These can be useful for something like your About page, which won’t have multiple Entries but may still require its own Field Layout.

<img src="../images/icons/globals.svg" width="46" class="no-zoom relative -mb-6 mt-8">

### Globals

Sometimes you’ll need to manage content that isn’t used on any single page, but shared by one or more pages on your site. This is what Globals are for. Globals are groupings of field sets, similar to Entry Types, that can be accessed globally, or throughout your site’s code. Common examples of globals might be a company name and address, office hours, or social media profile links.

<img src="../images/icons/assets.svg" width="46" class="no-zoom relative -mb-6 mt-8">

### Assets

Assets are files that are managed by Craft CMS. They’re stored in Asset Volumes, which you can think of like folders, and each Asset Volume can have its own Field Layout just like an Entry.

Craft CMS includes powerful tools for editing images and setting their focal points right in your browser, along with convenient tools for dynamically cropping and sizing them in your templates.

<img src="../images/icons/entry-types.svg" width="42" class="no-zoom relative -mb-6 mt-8">

### Entry Types

Craft uses the term Entry Type to define the set of input fields that belongs to a Section. Every Section has at least one Entry Type or set of fields. You can, however, add as many Entry Types as you’d like for each Section. Using multiple Entry Types can be useful when your content regularly takes one of several forms. A job posting, for example, might typically be related to a specific office location in a _Local_ Entry Type, but also sometimes need to be a remote position (_Remote_ Entry Type) related to a specific timezone or set of countries.

<img src="../images/icons/fields.svg" width="46" class="no-zoom relative -mb-6 mt-8">

### Fields

Each Entry Type is made up of whatever Fields you decide to add.

By default, every Entry will have a Title, Post Date, Expiration Date, and a Slug if its Section has public URLs.

You’ll use Field Layouts to add and arrange as many Field Types as you need, in any number of tabs. Craft comes with powerful Field Types out of the box:

<div class="grid-container">
  <GridItem label="Assets" src="/images/field-assets.svg" />
  <GridItem label="Categories" src="/images/field-categories.svg" />
  <GridItem label="Checkboxes" src="/images/field-checkboxes.svg" />
  <GridItem label="Colors" src="/images/field-colors.svg" />
  <GridItem label="Date/Time" src="/images/field-date-time.svg" />
  <GridItem label="Dropdown" src="/images/field-dropdown.svg" />
  <GridItem label="Email" src="/images/field-email.svg" />
  <GridItem label="Entries" src="/images/field-entries.svg" />
  <GridItem label="Lightswitch" src="/images/field-lightswitch.svg" />
  <GridItem label="Matrix" src="/images/field-matrix.svg" />
  <GridItem label="Multi-select" src="/images/field-multi-select.svg" />
  <GridItem label="Number" src="/images/field-number.svg" />
  <GridItem label="Plain Text" src="/images/field-plain-text.svg" />
  <GridItem label="Radio Buttons" src="/images/field-radio-buttons.svg" />
  <GridItem label="Table" src="/images/field-table.svg" />
  <GridItem label="Tags" src="/images/field-tags.svg" />
  <GridItem label="URL" src="/images/field-url.svg" />
  <GridItem label="Users" src="/images/field-users.svg" />
</div>

::: tip
These are the fields that ship with Craft CMS; more are available [in the plugin store](https://plugins.craftcms.com/categories/fields).
:::

## Modeling a blog

Since Craft CMS doesn’t make assumptions about what you build, it’s important to start with a plan for the content you’ll need to support.

For the purpose of this tutorial, we’ll focus on simple requirements common to any blog:

- headline
- post author
- post dates
- feature or summary image
- summary post description
- post content
- categories for post taxonomy

Here’s how we’ll use Craft CMS to cover each one:

- Leverage default entry details: **Title**, **Author**, **Post Date** and **Expiry Date**.
- **Assets** field for the summary image.
- **Plain Text** field for the summary description.
- **Matrix** field for building the main post content in block types we choose:
  - **Rich Text** block
  - **Images** block
- **Categories** field for the post categories.

We’ll create an upload location and a category group to support these fields, and we’ll use Matrix because it lets us customize block types for content that facilitate a clean editing experience that can evolve with future content needs.

Keep in mind that you can build content however you’d like; these are just the simple requirements for the tutorial and how we’re about to use the CMS to support them.

Next we’ll set these things up in the control panel.
