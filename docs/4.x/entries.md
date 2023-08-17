# Entries

Entries are the primary container for content you want to display on your web pages. Each entry has _Title_, _Author_, a _Post Date_, an _Expiration Date_ (if desired), a _Status_ (enabled or disabled), and—like other [element types](elements.md)—flexible content defined via [custom fields](fields.md). Also like other elements, entries can have their own [URLs](#entry-uri-formats), or be fetched from anywhere via [element queries](#querying-entries).

Content authors also get access to a powerful [drafts and revisions](#editing-entries) system, allowing them to stage different versions of content and preview it alongside the current live entry.

Entries are one of Craft’s built-in [element types](elements.md), and are represented throughout the application as instances of <craft4:craft\elements\Entry>.

## Sections

Before you can create entries, you must create Sections to contain them. In each Section you can define the following:

- Whether entries in the section have URLs;
- What the entries’ URLs should look like;
- Which template should get loaded if an entry’s URL is requested;
- What types of entries should be available in the section, and which fields each of those [entry types](#entry-types) should have;

If your project has multiple [sites](sites.md), your Section can define these additional settings:

- Which sites entries in the section should target;
- Which sites are enabled by default when creating new entries;

To create a new section, go to **Settings** → **Sections** and choose **New Section**.

### Section Types

Craft has three different types of sections:

#### Singles

![Illustration of Entries layout with “Singles” selected, showing “About Us”, “Contact” and “Home” entries](./images/entry-types-singles.png)

Singles are used for one-off pages or content objects that have unique requirements, such as…

- …a website’s homepage;
- …an _About Us_ page;
- …a _Contact Us_ page;

Unlike the other section types, singles only ever have _one_ entry associated with them, meaning their URIs can be static (like `contact-us`) rather than parameterized (like `news/{slug}`).

Like [globals](./globals.md), singles don’t have an editable **Author**, **Post Date**, or **Expiration Date**.

::: tip
Singles have all the functionality of [globals](./globals.md), and can even be pre-loaded into global Twig variables with the <config4:preloadSingles> <Since ver="4.4.0" feature="Preloading singles entries" /> config setting.

A single’s **Status** controls can be hidden with the **Show the Status field** setting in its sole **Entry Type**. <Since ver="4.5.0" feature="Hiding status fields for singles" />
:::

#### Channels

![Illustration of Entries layout with a “Press Releases” channel selected, showing three dated news entries](./images/entry-types-channels.png)

Channels are used for lists or streams of similar content, such as…

- …posts on a blog;
- …articles in a knowledge base;
- …recipes;
- …reviews;

Entries in channels are intended to be queried and displayed ordered by one or more of their attributes or [custom fields](./fields.md)—or explicitly attached to other elements via [entries fields](./entries-fields.md). Channels are also a simple way to maintain a flat taxonomy, standing in for [tags](./tags.md) or [categories](./categories.md).

#### Structures

Structures are an extension of channels that support explicit, hierarchical ordering.

![Illustration of Entries layout with a “Galleries” structure selected, showing nested building and gallery entries with drag-and-drop handles](./images/entry-types-structures.png)

Unlike other section types, structure sections expose a **Structure** view option on their [element indexes](./elements.md#indexes):

![Illustration of an element index’s “View” options with “Structure” selected.](./images/entry-types-structure-view-mode.png)

Types of content that might benefit from being defined as a structure include…

- …documentation;
- …a “Services” section, where the order of services matters;
- …a company organization chart with personnel and teams;
- …editable navigation menus;

Just like channels, entries in structures can be assigned [types](#entry-types). Structures offer great flexibility in presentation—in particular, the ability to collect nested content on a parent page, or alter the appearance of pages based on their hierarchical “depth” within a bundle of content.

::: tip
Structures can also make use of the **Maintain Hierarchy** <Since ver="4.4.0" feature="Maintain Hierarchy setting on entries fields" /> setting on entries fields.
:::

#### Custom Sources

Content authors can add their own special element sources based on existing Singles, Channels, and Structures by creating custom sources. Each custom source lists all entries by default, and can be filtered to only those that meet customized **Entry Criteria**.

To create a new custom source, go to **Entries** → **Customize (<icon kind="settings" />)**, and from the bottom-left “+” menu choose **New custom source**:

![Screenshot of a modal window with fields for a new custom source: Label, Entry Criteria, and Table Columns](./images/custom-source.png)

### Entry URI Formats

Channel and Structure sections can choose whether their entries should be assigned URLs in the system by filling in the **Entry URI Format** setting. Singles have a “URI” setting, but it is typically defined statically or omitted (if it doesn’t need its own URL).

When Craft matches a request to an entry, its section’s designated **Template** is rendered. That template is automatically provided an `entry` variable, set to the resolved <craft4:craft\elements\Entry> object, and ready to output any of its attributes or custom field data.

Entry URI Formats are tiny Twig templates, which get evaluated each time an entry in the section is saved. The result is saved as the entry’s **URI** in the system.

The entry being saved is available to that **object template**—just like its main template—so something like this is possible:

```twig
blog/authors/{{ object.author.username }}/{{ object.slug }}
```

A shortcut syntax is also available if you are accessing simple properties on the `object` variable:

```twig
blog/authors/{author.username}/{slug}
```

Structure sections may benefit from nested paths, for child entries:

```twig
{parent.uri}/{slug}
```

Suppose our structure represents geographic regions on Earth. With the above **Entry URI Format**, a top-level “continent” entry URI might be `south-america`; a nested “country” entry’s URI would then be `south-america/chile`.

Structure sections might also want to include a segment before the nested path:

```twig
{parent.uri ?? 'earth'}/{slug}
```

The above template could also be expressed with this syntax:

```twig
{% if level == 1 %}earth{% else %}{parent.uri}{% endif %}/{slug}
```

With the above Entry URI Format, a top-level entry’s URI would be `earth/south-america`, with a nested entry having `earth/south-america/chile`.

::: tip
Consider these tips for creating special URIs:
- A URI that evaluates to `__home__` (and nothing more) will be available at your site’s base path;
- An empty URI means the entry does not get a route and will not have a public URL—unless you define one manually via `routes.php`;
- Any Twig statement can be used to output values in a URI template—including ones that query for other elements,  e.g. `{{ craft.entries().section('mySingle').one().slug }}/news`;
- [Aliases](./config/README.md#aliases-and-environment-variables) can be evaluated with the [`alias()` function](./dev/functions.md#alias): `{{ alias('@basePressUri') }}/news`, `{{ alias('@mySectionUri') }}`.
- The [null-coalescing operator](https://twig.symfony.com/doc/3.x/templates.html#other-operators) (`??`) can silently swallow undefined variable errors (like `parent.uri`, above);
:::

### Preview Targets

If you’re using Craft Pro, your section can have one or more **Preview Targets**, or URLs where your entries will show up on. This makes it possible for authors to preview entries as they are writing them in the control panel, or share a private URL with colleagues to view changes prior to publishing.

Like entry URI formats, these preview target URLs are simple Twig templates that can contain entry properties and other dynamic values.

Use single curly braces to render attributes on the entry. For example if entries in your section have their own URLs, then you can create a preview target for the entry’s primary URL using the URL template, `{url}`.

Create additional preview targets for any other areas the entry might show up, such as `news`, or `archive/{postDate|date('Y')}`. If the entries show up on the homepage, you can create a preview target with a blank URL (unlike URI formats, a blank URL _is_ valid, here).

![A section’s Preview Targets setting.](./images/preview-targets.png)

Preview target **URL Formats** support slightly different features than for **URI Formats**:

- If you want to include the entry’s ID or UID in a preview target URL, use `{canonicalId}` or `{canonicalUid}` rather than `{id}` or `{uid}`, so the source entry’s ID or UID is used rather than the [draft](#drafts)’s;
- You can use [environment variables and aliases](./config/README.md#control-panel-settings) in the preview target URL. These _do not_ get wrapped in curly braces on their own, as they are not part of the object template. Aliases may be part of a longer URI (e.g.`@headlessUrl/news/{slug}`), but environment variables can only be used on their own (e.g. `$NEWS_INDEX`);

When an author is editing an entry from a section with custom preview targets, the **View** button will be replaced with a menu that lists the **Primary entry page** (if the section has an Entry URI Format), plus the names of each preview target.

![An entry’s View menu with 3 custom preview targets.](./images/share-with-targets.png =394x)

If you share a link from this menu that includes a preview token, it will expire by default after one day. You can customize this with the [defaultTokenDuration](config4:defaultTokenDuration) config setting.

The targets will also be available within **Preview**.

#### Previewing Decoupled Front Ends

If your site’s front end lives outside of Craft (e.g. as a Vue or React app), you can still support previewing drafts and revisions with **Preview** or **Share** buttons. To do that, your front end must check for the existence of a `token` query string parameter (or whatever the <config4:tokenParam> setting is). If it’s in the URL, then you will need to pass that same token in the request that loads the page content. This token will cause the API request to respond with the correct content based on what the token was created to preview.

<Block label="Nuxt Example">

Whether you are using the Element API plugin or the built-in [GraphQL](graphql.md) API, Craft automatically injects preview elements whenever they match the query being executed.

To illustrate, suppose you were building a [Nuxt](https://nuxt.com/) application, and you used the [file-based routing scheme](https://nuxt.com/docs/getting-started/routing) to render blog posts: you would create `pages/blog/[slug].vue`, then define a preview target in Craft with a similar path, like `@nuxt/blog/{slug}`.

```vue
<script setup>
const route = useRoute();

// Construct a GraphQL fragment using the route param:
const query = `{
  entry(slug: "${route.params.slug}") {
    title
    description
  }
}`;

// Fetch the incoming token:
const token = route.query.token;

// Build the URL, with `query` and `token` params:
const { data: gql } = await useFetch('https://my-project.ddev.site/api', {
  params: { query, token },
});
</script>

<template>
  <article>
    <h1>{{ gql.data.entry.title }}</h1>
    <code>{{ gql.data.entry.uid }}</code>
  </article>
</template>
```

This assumes you have defined a [GraphQL API route](graphql.md#setting-up-your-api-endpoint) of `api`, and that the previewed entry will reliably have (at least) a slug set. When the `token` param is omitted, Nuxt ignores it and the GraphQL API will respond as though it were any other request for an entry with the given slug.

</Block>

You can pass the token via either a query string parameter named after your <config4:tokenParam> config setting, or an `X-Craft-Token` header.

::: tip
For live preview, you should also consider [enabling iFrame Resizer](config4:useIframeResizer) so that Craft can maintain the page scroll position between page loads.
:::

## Entry Types

Both Channel and Structure sections let you define multiple types of entries using Entry Types.

You can manage your sections’ Entry Types by choosing **Edit Entry Types** link beside the section’s name in **Settings** → **Sections**. That’ll take you to the section’s entry type index. Choosing on an entry type’s name takes you to its settings page:

![Entry Type Edit Settings](./images/sections-and-entries-entry-types.png)

Entry types have the following settings:

- **Name** — The entry type’s name;
- **Handle** — The entry type’s template-facing handle;
- **Show the Title field?** — Whether a Title field is displayed for entries of this type, or the title should be [dynamically defined](#dynamic-entry-titles) from other properties via an object template;
- **Title Field Label** — What the Title field label should be;

### Dynamic Entry Titles

If you want your entries to have auto-generated titles (rather than requiring authors to enter them manually), you can uncheck the **Show the Title field?** checkbox. When you do, a new **Title Format** setting will appear, where you can define how the auto-generated titles are generated.

The Title Format is a full-blown Twig template (just like the **Entry URI Format** and preview target **URL Format** we looked, above), and it will get parsed whenever your entries are saved.

The entry is passed to this template as a variable named `object`. You can reference the entry’s [properties](craft4:craft\elements\Entry#public-properties) in two ways:

1. normal Twig syntax: `{{ object.property }}`
2. shortcut Twig syntax: `{property}`

<Todo text="Object templates need to be consolidated." />

If Craft finds any of these in your **Title Format**, it will replace the `{` with `{{object.` and the `}` with `}}`, before passing the template off to Twig for parsing.

You can use Twig filters in both syntaxes:

```twig
{{ object.postDate|date('M j, Y') }}
{postDate|date('M j, Y')}
```

Craft’s [global variables](dev/global-variables.md) are available to these templates as well:

```twig
{{ now|date('Y-m-d') }}
{{ currentUser.username }}
```

Conditionals are also fair game. There’s no shortcut syntax for those, so if you want to use a conditional on one of the entry’s properties, you will need to reference it with the `object` variable:

```twig
{% if object.postDate %}{postDate|date('M j, Y')}{% else %}{{ now|date('M j, Y') }}{% endif %}
```

## Editing Entries

If you have at least one section, there will be an **Entries** menu item in the primary control panel navigation. Clicking on it will take you to the entry [index](elements.md#indexes). From there, you can navigate to the entry you wish to edit, or create a new one.

Depending on your section’s settings, can perform some or all of the following actions from any entry’s edit screen:

- Choose the entry type (if there is more than one to choose from);
- Edit the entry’s **Title**, **Slug**, and [custom field](fields.md) values;
- Choose the entry’s **Author** (Pro edition only);
- Choose the entry’s **Parent** (if it’s within a [Structure](#structures) section);
- Set the entry’s **Post Date** (when it will be considered published);
- Set the entry’s **Expiration Date** (optional);
- Choose whether the entry is **Enabled** or not (globally, and/or per-site);
- Save changes to the entry;
- Save a new [draft](#drafts) of the entry;
- View [revisions](#revisions) of the entry;
- Apply changes from a derivative (draft or revision);

::: tip
If you leave the **Post Date** blank, Craft will automatically set it the first time an entry is saved as enabled.
:::

### Entry Creation

As soon as you click **New entry**, Craft creates an empty entry, and redirects you to its edit screen. This gives the system a place to auto-save your edits—effectively a new entry represented only as a [draft](#drafts). Internally, this is called a “fresh” entry.

Once you add some content to a fresh entry (or explicitly choose **Save draft** from the **Create entry** menu), Craft marks the draft as having been saved, and will expose it in element indexes when using the **All** or **Draft** status options.

::: tip
Stray drafts (those that were created but never edited or explicitly saved) are automatically [garbage-collected](gc.md), respecting the <config4:purgeUnsavedDraftsDuration> setting.
:::

The entry editing lifecycle is designed to provide authors clear, actionable information about the state of their content, and to prevent unintended loss. Let’s look more closely at a few supporting features.

### Drafts

As soon as you alter a field on an entry, Craft auto-saves the changes as a _provisional draft_.

![Screenshot of an entry with unsaved changes](./images/entries-edit-provisional.png)

Subsequent edits are also saved to your provisional draft, and made available any time you view that entry in the control panel. Each user gets their own provisional draft, so your changes are private.

Pressing the **Save** button applies changes from a provisional draft to its _canonical_ entry, and creates a _revision_ (if its section supports revisions).

If you aren’t ready to publish your changes, you can instead press **Create a Draft** to save your work as a new _draft_. You may have as many regular drafts as you wish—and those drafts can have their own name and notes to help you track what you’re working on. The name of your current draft (if any) is shown at the top of the edit screen in the [revision](#revisions) menu.

::: warning
Your drafts may be visible to (and editable by) other users! While an auto-saved _provisional_ draft is always private, the visibility of _saved_ drafts is governed by users’ [permissions for the entry’s section](user-management.md#permissions).
:::

While Craft’s auto-saving behavior creates a provisional draft from the canonical entry, edits to an existing, explicitly-saved draft are saved directly to that draft—in other words, Craft doesn’t create drafts for another draft!

When your edits are ready to be published, press **Apply draft** to merge the changes into the canonical entry.

### Revisions

Any time you apply a draft (provisional or otherwise) to the canonical entry, Craft creates a _revision_. Revisions track which fields and attributes changed each time the canonical entry is updated, and provide a means to revert to previous versions of an entry. Drafts and revisions both have a `creator` property that stores what user initiated the update separately from the “author.”

::: tip
The revision menu only displays the ten most recent revisions. Older revisions are available via the **View all revisions &rarr;** link at the bottom of the menu.

Any time a revision is created, Craft pushes a job into the [queue](queue.md) to ensure the oldest one(s) are pruned (if there are more revisions than allowed by the <config4:maxRevisions> setting).
:::

#### Querying for Revisions

You can [find](#querying-entries) drafts and revisions of a specific entry using the [draftOf()](#draftof) and [revisionOf()](#revisionof) query params.

### Trash

All [elements](elements.md) support _soft-deletion_. When you delete an entry, its `dateDeleted` property is set to the current time, and Craft excludes it from results—unless the [`trashed` query param](#trashed) is used. Similarly, when restoring a deleted entry, its `dateDeleted` is set to `null`.

::: warning
Entries remain in the “trashed” state until they are manually hard-deleted from the control panel or their `dateDeleted` is longer ago than the <config4:softDeleteDuration> setting when [garbage collection](gc.md) runs.

**The trash should not be used to temporarily remove content from your site.** Restoring trashed entries is only intended as a means to recover inadvertently-deleted content—instead, use the global or site-specific **Enabled** settings. Entries can remain disabled indefinitely.
:::

### Activity <Since ver="4.5.0" feature="Element editing activity indicators" />

Craft keeps track of user activity on entries, and will push presence pips and notifications to anyone working with drafts of the same entry.

<BrowserShot
  url="https://my-craft-project.ddev.site/admin/entries/blog/247"
  :link="false"
  caption="Other users editing the same entry will appear in the page header. TJ has corrected the page title in a draft.">
<img src="./images/entries-edit-activity.png" alt="Screenshot of the entry edit screen with other active users">
</BrowserShot>

Notifications will appear in the bottom-left corner along with other flashes, and prompt you to reload the entry if it has changed since you opened it. This can play out in a couple ways:

- If another user applied a draft to the canonical entry while you were working on a provisional draft, Craft will merge all non-conflicting edits into your provisional draft. In situations where you both made changes to a field, Craft keeps your changes.
- If only the other user made a change, the page simply refreshes to show the new canonical entry content.

::: tip
Automatic merging of changes from canonical entries is nondestructive, and non-optional. Merging occurs just before an entry’s edit screen is viewed.
:::

## Querying Entries

While an entry’s configured template will automatically make an `entry` variable available, you can fetch entries throughout your templates or PHP code using **entry queries**.

::: code
```twig
{# Create a new entry query #}
{% set myEntryQuery = craft.entries() %}
```
```php
// Create a new entry query
$myEntryQuery = \craft\elements\Entry::find();
```
:::

Once you’ve created an entry query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](element-queries.md#executing-element-queries) by calling `.all()`. An array of [Entry](craft4:craft\elements\Entry) objects will be returned.

::: tip
See [Element Queries](element-queries.md) to learn about how element queries work.
:::

### Example

We can display the 10 most recent entries in a “Blog” section by doing the following:

1. Create an entry query with `craft.entries()`.
2. Set the [section](#section) and [limit](#limit) parameters on it.
3. Fetch the entries with `.all()`.
4. Loop through the entries using a [for](https://twig.symfony.com/doc/3.x/tags/for.html) tag to output the blog post HTML.

```twig
{# Create an entry query with the 'section' and 'limit' parameters #}
{% set myEntryQuery = craft.entries()
  .section('blog')
  .limit(10) %}

{# Fetch the entries #}
{% set entries = myEntryQuery.all() %}

{# Display the entries #}
{% for entry in entries %}
  <article>
    <h1><a href="{{ entry.url }}">{{ entry.title }}</a></h1>
    {{ entry.summary }}
    <a href="{{ entry.url }}">Continue reading</a>
  </article>
{% endfor %}
```

### Parameters

Entry queries support the following parameters:

<!-- BEGIN PARAMS -->



<!-- textlint-disable -->

| Param                                     | Description
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [after](#after)                           | Narrows the query results to only entries that were posted on or after a certain date.
| [afterPopulate](#afterpopulate)           | Performs any post-population processing on elements.
| [ancestorDist](#ancestordist)             | Narrows the query results to only entries that are up to a certain distance away from the entry specified by [ancestorOf](#ancestorof).
| [ancestorOf](#ancestorof)                 | Narrows the query results to only entries that are ancestors of another entry in its structure.
| [andRelatedTo](#andrelatedto)             | Narrows the query results to only entries that are related to certain other elements.
| [asArray](#asarray)                       | Causes the query to return matching entries as arrays of data, rather than [Entry](craft4:craft\elements\Entry) objects.
| [authorGroup](#authorgroup)               | Narrows the query results based on the user group the entries’ authors belong to.
| [authorGroupId](#authorgroupid)           | Narrows the query results based on the user group the entries’ authors belong to, per the groups’ IDs.
| [authorId](#authorid)                     | Narrows the query results based on the entries’ authors.
| [before](#before)                         | Narrows the query results to only entries that were posted before a certain date.
| [cache](#cache)                           | Enables query cache for this Query.
| [clearCachedResult](#clearcachedresult)   | Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).
| [collect](#collect)                       |
| [dateCreated](#datecreated)               | Narrows the query results based on the entries’ creation dates.
| [dateUpdated](#dateupdated)               | Narrows the query results based on the entries’ last-updated dates.
| [descendantDist](#descendantdist)         | Narrows the query results to only entries that are up to a certain distance away from the entry specified by [descendantOf](#descendantof).
| [descendantOf](#descendantof)             | Narrows the query results to only entries that are descendants of another entry in its structure.
| [draftCreator](#draftcreator)             | Narrows the query results to only drafts created by a given user.
| [draftId](#draftid)                       | Narrows the query results based on the entries’ draft’s ID (from the `drafts` table).
| [draftOf](#draftof)                       | Narrows the query results to only drafts of a given entry.
| [drafts](#drafts)                         | Narrows the query results to only drafts entries.
| [expiryDate](#expirydate)                 | Narrows the query results based on the entries’ expiry dates.
| [fixedOrder](#fixedorder)                 | Causes the query results to be returned in the order specified by [id](#id).
| [hasDescendants](#hasdescendants)         | Narrows the query results based on whether the entries have any descendants in their structure.
| [id](#id)                                 | Narrows the query results based on the entries’ IDs.
| [ignorePlaceholders](#ignoreplaceholders) | Causes the query to return matching entries as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).
| [inReverse](#inreverse)                   | Causes the query results to be returned in reverse order.
| [leaves](#leaves)                         | Narrows the query results based on whether the entries are “leaves” (entries with no descendants).
| [level](#level)                           | Narrows the query results based on the entries’ level within the structure.
| [limit](#limit)                           | Determines the number of entries that should be returned.
| [nextSiblingOf](#nextsiblingof)           | Narrows the query results to only the entry that comes immediately after another entry in its structure.
| [offset](#offset)                         | Determines how many entries should be skipped in the results.
| [orderBy](#orderby)                       | Determines the order that the entries should be returned in. (If empty, defaults to `postDate DESC`, or the order defined by the section if the [section](#section) or [sectionId](#sectionid) params are set to a single Structure section.)
| [positionedAfter](#positionedafter)       | Narrows the query results to only entries that are positioned after another entry in its structure.
| [positionedBefore](#positionedbefore)     | Narrows the query results to only entries that are positioned before another entry in its structure.
| [postDate](#postdate)                     | Narrows the query results based on the entries’ post dates.
| [preferSites](#prefersites)               | If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepareSubquery](#preparesubquery)       | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [prevSiblingOf](#prevsiblingof)           | Narrows the query results to only the entry that comes immediately before another entry in its structure.
| [provisionalDrafts](#provisionaldrafts)   | Narrows the query results to only provisional drafts.
| [relatedTo](#relatedto)                   | Narrows the query results to only entries that are related to certain other elements.
| [revisionCreator](#revisioncreator)       | Narrows the query results to only revisions created by a given user.
| [revisionId](#revisionid)                 | Narrows the query results based on the entries’ revision’s ID (from the `revisions` table).
| [revisionOf](#revisionof)                 | Narrows the query results to only revisions of a given entry.
| [revisions](#revisions)                   | Narrows the query results to only revision entries.
| [savable](#savable)                       | Sets the [savable](https://docs.craftcms.com/api/v3/craft-elements-db-entryquery.html#savable) property.
| [savedDraftsOnly](#saveddraftsonly)       | Narrows the query results to only unpublished drafts which have been saved after initial creation.
| [search](#search)                         | Narrows the query results to only entries that match a search query.
| [section](#section)                       | Narrows the query results based on the sections the entries belong to.
| [sectionId](#sectionid)                   | Narrows the query results based on the sections the entries belong to, per the sections’ IDs.
| [siblingOf](#siblingof)                   | Narrows the query results to only entries that are siblings of another entry in its structure.
| [site](#site)                             | Determines which site(s) the entries should be queried in.
| [siteId](#siteid)                         | Determines which site(s) the entries should be queried in, per the site’s ID.
| [siteSettingsId](#sitesettingsid)         | Narrows the query results based on the entries’ IDs in the `elements_sites` table.
| [slug](#slug)                             | Narrows the query results based on the entries’ slugs.
| [status](#status)                         | Narrows the query results based on the entries’ statuses.
| [title](#title)                           | Narrows the query results based on the entries’ titles.
| [trashed](#trashed)                       | Narrows the query results to only entries that have been soft-deleted.
| [type](#type)                             | Narrows the query results based on the entries’ entry types.
| [typeId](#typeid)                         | Narrows the query results based on the entries’ entry types, per the types’ IDs.
| [uid](#uid)                               | Narrows the query results based on the entries’ UIDs.
| [unique](#unique)                         | Determines whether only elements with unique IDs should be returned by the query.
| [uri](#uri)                               | Narrows the query results based on the entries’ URIs.
| [with](#with)                             | Causes the query to return matching entries eager-loaded with related elements.


<!-- textlint-enable -->


#### `after`

Narrows the query results to only entries that were posted on or after a certain date.

Possible values include:

| Value | Fetches entries…
| - | -
| `'2018-04-01'` | that were posted after 2018-04-01.
| a [DateTime](https://php.net/class.datetime) object | that were posted after the date represented by the object.
| `now`/`today`/`tomorrow`/`yesterday` | that were posted after midnight of the specified relative date.



::: code
```twig
{# Fetch entries posted this month #}
{% set firstDayOfMonth = date('first day of this month') %}

{% set entries = craft.entries()
  .after(firstDayOfMonth)
  .all() %}
```

```php
// Fetch entries posted this month
$firstDayOfMonth = new \DateTime('first day of this month');

$entries = \craft\elements\Entry::find()
    ->after($firstDayOfMonth)
    ->all();
```
:::


#### `afterPopulate`

Performs any post-population processing on elements.










#### `ancestorDist`

Narrows the query results to only entries that are up to a certain distance away from the entry specified by [ancestorOf](#ancestorof).





::: code
```twig
{# Fetch entries above this one #}
{% set entries = craft.entries()
  .ancestorOf(myEntry)
  .ancestorDist(3)
  .all() %}
```

```php
// Fetch entries above this one
$entries = \craft\elements\Entry::find()
    ->ancestorOf($myEntry)
    ->ancestorDist(3)
    ->all();
```
:::


#### `ancestorOf`

Narrows the query results to only entries that are ancestors of another entry in its structure.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | above the entry with an ID of 1.
| a [Entry](craft4:craft\elements\Entry) object | above the entry represented by the object.



::: code
```twig
{# Fetch entries above this one #}
{% set entries = craft.entries()
  .ancestorOf(myEntry)
  .all() %}
```

```php
// Fetch entries above this one
$entries = \craft\elements\Entry::find()
    ->ancestorOf($myEntry)
    ->all();
```
:::



::: tip
This can be combined with [ancestorDist](#ancestordist) if you want to limit how far away the ancestor entries can be.
:::


#### `andRelatedTo`

Narrows the query results to only entries that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all entries that are related to myCategoryA and myCategoryB #}
{% set entries = craft.entries()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all entries that are related to $myCategoryA and $myCategoryB
$entries = \craft\elements\Entry::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `asArray`

Causes the query to return matching entries as arrays of data, rather than [Entry](craft4:craft\elements\Entry) objects.





::: code
```twig
{# Fetch entries as arrays #}
{% set entries = craft.entries()
  .asArray()
  .all() %}
```

```php
// Fetch entries as arrays
$entries = \craft\elements\Entry::find()
    ->asArray()
    ->all();
```
:::


#### `authorGroup`

Narrows the query results based on the user group the entries’ authors belong to.

Possible values include:

| Value | Fetches entries…
| - | -
| `'foo'` | with an author in a group with a handle of `foo`.
| `'not foo'` | not with an author in a group with a handle of `foo`.
| `['foo', 'bar']` | with an author in a group with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not with an author in a group with a handle of `foo` or `bar`.
| a [UserGroup](craft4:craft\models\UserGroup) object | with an author in a group represented by the object.
| an array of [UserGroup](craft4:craft\models\UserGroup) objects | with an author in a group represented by the objects.



::: code
```twig
{# Fetch entries with an author in the Foo user group #}
{% set entries = craft.entries()
  .authorGroup('foo')
  .all() %}
```

```php
// Fetch entries with an author in the Foo user group
$entries = \craft\elements\Entry::find()
    ->authorGroup('foo')
    ->all();
```
:::


#### `authorGroupId`

Narrows the query results based on the user group the entries’ authors belong to, per the groups’ IDs.

Possible values include:

| Value | Fetches entries…
| - | -
| `1` | with an author in a group with an ID of 1.
| `'not 1'` | not with an author in a group with an ID of 1.
| `[1, 2]` | with an author in a group with an ID of 1 or 2.
| `['not', 1, 2]` | not with an author in a group with an ID of 1 or 2.



::: code
```twig
{# Fetch entries with an author in a group with an ID of 1 #}
{% set entries = craft.entries()
  .authorGroupId(1)
  .all() %}
```

```php
// Fetch entries with an author in a group with an ID of 1
$entries = \craft\elements\Entry::find()
    ->authorGroupId(1)
    ->all();
```
:::


#### `authorId`

Narrows the query results based on the entries’ authors.

Possible values include:

| Value | Fetches entries…
| - | -
| `1` | with an author with an ID of 1.
| `'not 1'` | not with an author with an ID of 1.
| `[1, 2]` | with an author with an ID of 1 or 2.
| `['not', 1, 2]` | not with an author with an ID of 1 or 2.



::: code
```twig
{# Fetch entries with an author with an ID of 1 #}
{% set entries = craft.entries()
  .authorId(1)
  .all() %}
```

```php
// Fetch entries with an author with an ID of 1
$entries = \craft\elements\Entry::find()
    ->authorId(1)
    ->all();
```
:::


#### `before`

Narrows the query results to only entries that were posted before a certain date.

Possible values include:

| Value | Fetches entries…
| - | -
| `'2018-04-01'` | that were posted before 2018-04-01.
| a [DateTime](https://php.net/class.datetime) object | that were posted before the date represented by the object.
| `now`/`today`/`tomorrow`/`yesterday` | that were posted before midnight of specified relative date.



::: code
```twig
{# Fetch entries posted before this month #}
{% set firstDayOfMonth = date('first day of this month') %}

{% set entries = craft.entries()
  .before(firstDayOfMonth)
  .all() %}
```

```php
// Fetch entries posted before this month
$firstDayOfMonth = new \DateTime('first day of this month');

$entries = \craft\elements\Entry::find()
    ->before($firstDayOfMonth)
    ->all();
```
:::


#### `cache`

Enables query cache for this Query.










#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).






#### `collect`








#### `dateCreated`

Narrows the query results based on the entries’ creation dates.



Possible values include:

| Value | Fetches entries…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were created at midnight of the specified relative date.



::: code
```twig
{# Fetch entries created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set entries = craft.entries()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch entries created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the entries’ last-updated dates.



Possible values include:

| Value | Fetches entries…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were updated at midnight of the specified relative date.



::: code
```twig
{# Fetch entries updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set entries = craft.entries()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch entries updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `descendantDist`

Narrows the query results to only entries that are up to a certain distance away from the entry specified by [descendantOf](#descendantof).





::: code
```twig
{# Fetch entries below this one #}
{% set entries = craft.entries()
  .descendantOf(myEntry)
  .descendantDist(3)
  .all() %}
```

```php
// Fetch entries below this one
$entries = \craft\elements\Entry::find()
    ->descendantOf($myEntry)
    ->descendantDist(3)
    ->all();
```
:::


#### `descendantOf`

Narrows the query results to only entries that are descendants of another entry in its structure.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | below the entry with an ID of 1.
| a [Entry](craft4:craft\elements\Entry) object | below the entry represented by the object.



::: code
```twig
{# Fetch entries below this one #}
{% set entries = craft.entries()
  .descendantOf(myEntry)
  .all() %}
```

```php
// Fetch entries below this one
$entries = \craft\elements\Entry::find()
    ->descendantOf($myEntry)
    ->all();
```
:::



::: tip
This can be combined with [descendantDist](#descendantdist) if you want to limit how far away the descendant entries can be.
:::


#### `draftCreator`

Narrows the query results to only drafts created by a given user.



Possible values include:

| Value | Fetches drafts…
| - | -
| `1` | created by the user with an ID of 1.
| a [craft\elements\User](craft4:craft\elements\User) object | created by the user represented by the object.



::: code
```twig
{# Fetch drafts by the current user #}
{% set entries = craft.entries()
  .draftCreator(currentUser)
  .all() %}
```

```php
// Fetch drafts by the current user
$entries = \craft\elements\Entry::find()
    ->draftCreator(Craft::$app->user->identity)
    ->all();
```
:::


#### `draftId`

Narrows the query results based on the entries’ draft’s ID (from the `drafts` table).



Possible values include:

| Value | Fetches drafts…
| - | -
| `1` | for the draft with an ID of 1.



::: code
```twig
{# Fetch a draft #}
{% set entries = craft.entries()
  .draftId(10)
  .all() %}
```

```php
// Fetch a draft
$entries = \craft\elements\Entry::find()
    ->draftId(10)
    ->all();
```
:::


#### `draftOf`

Narrows the query results to only drafts of a given entry.



Possible values include:

| Value | Fetches drafts…
| - | -
| `1` | for the entry with an ID of 1.
| a [Entry](craft4:craft\elements\Entry) object | for the entry represented by the object.
| `'*'` | for any entry
| `false` | that aren’t associated with a published entry



::: code
```twig
{# Fetch drafts of the entry #}
{% set entries = craft.entries()
  .draftOf(myEntry)
  .all() %}
```

```php
// Fetch drafts of the entry
$entries = \craft\elements\Entry::find()
    ->draftOf($myEntry)
    ->all();
```
:::


#### `drafts`

Narrows the query results to only drafts entries.





::: code
```twig
{# Fetch a draft entry #}
{% set entries = craft.entries()
  .drafts()
  .id(123)
  .one() %}
```

```php
// Fetch a draft entry
$entries = \craft\elements\Entry::find()
    ->drafts()
    ->id(123)
    ->one();
```
:::


#### `expiryDate`

Narrows the query results based on the entries’ expiry dates.

Possible values include:

| Value | Fetches entries…
| - | -
| `':empty:'` | that don’t have an expiry date.
| `':notempty:'` | that have an expiry date.
| `'>= 2020-04-01'` | that will expire on or after 2020-04-01.
| `'< 2020-05-01'` | that will expire before 2020-05-01
| `['and', '>= 2020-04-04', '< 2020-05-01']` | that will expire between 2020-04-01 and 2020-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that expire at midnight of the specified relative date.



::: code
```twig
{# Fetch entries expiring this month #}
{% set nextMonth = date('first day of next month')|atom %}

{% set entries = craft.entries()
  .expiryDate("< #{nextMonth}")
  .all() %}
```

```php
// Fetch entries expiring this month
$nextMonth = (new \DateTime('first day of next month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->expiryDate("< {$nextMonth}")
    ->all();
```
:::


#### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).



::: tip
If no IDs were passed to [id](#id), setting this to `true` will result in an empty result set.
:::



::: code
```twig
{# Fetch entries in a specific order #}
{% set entries = craft.entries()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch entries in a specific order
$entries = \craft\elements\Entry::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `hasDescendants`

Narrows the query results based on whether the entries have any descendants in their structure.



(This has the opposite effect of calling [leaves](#leaves).)



::: code
```twig
{# Fetch entries that have descendants #}
{% set entries = craft.entries()
  .hasDescendants()
  .all() %}
```

```php
// Fetch entries that have descendants
$entries = \craft\elements\Entry::find()
    ->hasDescendants()
    ->all();
```
:::


#### `id`

Narrows the query results based on the entries’ IDs.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | with an ID of 1.
| `'not 1'` | not with an ID of 1.
| `[1, 2]` | with an ID of 1 or 2.
| `['not', 1, 2]` | not with an ID of 1 or 2.



::: code
```twig
{# Fetch the entry by its ID #}
{% set entry = craft.entries()
  .id(1)
  .one() %}
```

```php
// Fetch the entry by its ID
$entry = \craft\elements\Entry::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching entries as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch entries in reverse #}
{% set entries = craft.entries()
  .inReverse()
  .all() %}
```

```php
// Fetch entries in reverse
$entries = \craft\elements\Entry::find()
    ->inReverse()
    ->all();
```
:::


#### `leaves`

Narrows the query results based on whether the entries are “leaves” (entries with no descendants).



(This has the opposite effect of calling [hasDescendants](#hasdescendants).)



::: code
```twig
{# Fetch entries that have no descendants #}
{% set entries = craft.entries()
  .leaves()
  .all() %}
```

```php
// Fetch entries that have no descendants
$entries = \craft\elements\Entry::find()
    ->leaves()
    ->all();
```
:::


#### `level`

Narrows the query results based on the entries’ level within the structure.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | with a level of 1.
| `'not 1'` | not with a level of 1.
| `'>= 3'` | with a level greater than or equal to 3.
| `[1, 2]` | with a level of 1 or 2
| `['not', 1, 2]` | not with level of 1 or 2.



::: code
```twig
{# Fetch entries positioned at level 3 or above #}
{% set entries = craft.entries()
  .level('>= 3')
  .all() %}
```

```php
// Fetch entries positioned at level 3 or above
$entries = \craft\elements\Entry::find()
    ->level('>= 3')
    ->all();
```
:::


#### `limit`

Determines the number of entries that should be returned.



::: code
```twig
{# Fetch up to 10 entries  #}
{% set entries = craft.entries()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 entries
$entries = \craft\elements\Entry::find()
    ->limit(10)
    ->all();
```
:::


#### `nextSiblingOf`

Narrows the query results to only the entry that comes immediately after another entry in its structure.



Possible values include:

| Value | Fetches the entry…
| - | -
| `1` | after the entry with an ID of 1.
| a [Entry](craft4:craft\elements\Entry) object | after the entry represented by the object.



::: code
```twig
{# Fetch the next entry #}
{% set entry = craft.entries()
  .nextSiblingOf(myEntry)
  .one() %}
```

```php
// Fetch the next entry
$entry = \craft\elements\Entry::find()
    ->nextSiblingOf($myEntry)
    ->one();
```
:::


#### `offset`

Determines how many entries should be skipped in the results.



::: code
```twig
{# Fetch all entries except for the first 3 #}
{% set entries = craft.entries()
  .offset(3)
  .all() %}
```

```php
// Fetch all entries except for the first 3
$entries = \craft\elements\Entry::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

Determines the order that the entries should be returned in. (If empty, defaults to `postDate DESC`, or the order defined by the section if the [section](#section) or [sectionId](#sectionid) params are set to a single Structure section.)



::: code
```twig
{# Fetch all entries in order of date created #}
{% set entries = craft.entries()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all entries in order of date created
$entries = \craft\elements\Entry::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


#### `positionedAfter`

Narrows the query results to only entries that are positioned after another entry in its structure.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | after the entry with an ID of 1.
| a [Entry](craft4:craft\elements\Entry) object | after the entry represented by the object.



::: code
```twig
{# Fetch entries after this one #}
{% set entries = craft.entries()
  .positionedAfter(myEntry)
  .all() %}
```

```php
// Fetch entries after this one
$entries = \craft\elements\Entry::find()
    ->positionedAfter($myEntry)
    ->all();
```
:::


#### `positionedBefore`

Narrows the query results to only entries that are positioned before another entry in its structure.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | before the entry with an ID of 1.
| a [Entry](craft4:craft\elements\Entry) object | before the entry represented by the object.



::: code
```twig
{# Fetch entries before this one #}
{% set entries = craft.entries()
  .positionedBefore(myEntry)
  .all() %}
```

```php
// Fetch entries before this one
$entries = \craft\elements\Entry::find()
    ->positionedBefore($myEntry)
    ->all();
```
:::


#### `postDate`

Narrows the query results based on the entries’ post dates.

Possible values include:

| Value | Fetches entries…
| - | -
| `'>= 2018-04-01'` | that were posted on or after 2018-04-01.
| `'< 2018-05-01'` | that were posted before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were posted between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were posted at midnight of the specified relative date.



::: code
```twig
{# Fetch entries posted last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set entries = craft.entries()
  .postDate(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch entries posted last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->postDate(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `preferSites`

If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C,
and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site B, and Bar will be returned
for Site C.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique entries from Site A, or Site B if they don’t exist in Site A #}
{% set entries = craft.entries()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique entries from Site A, or Site B if they don’t exist in Site A
$entries = \craft\elements\Entry::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```
:::


#### `prepareSubquery`

Prepares the element query and returns its subquery (which determines what elements will be returned).






#### `prevSiblingOf`

Narrows the query results to only the entry that comes immediately before another entry in its structure.



Possible values include:

| Value | Fetches the entry…
| - | -
| `1` | before the entry with an ID of 1.
| a [Entry](craft4:craft\elements\Entry) object | before the entry represented by the object.



::: code
```twig
{# Fetch the previous entry #}
{% set entry = craft.entries()
  .prevSiblingOf(myEntry)
  .one() %}
```

```php
// Fetch the previous entry
$entry = \craft\elements\Entry::find()
    ->prevSiblingOf($myEntry)
    ->one();
```
:::


#### `provisionalDrafts`

Narrows the query results to only provisional drafts.





::: code
```twig
{# Fetch provisional drafts created by the current user #}
{% set entries = craft.entries()
  .provisionalDrafts()
  .draftCreator(currentUser)
  .all() %}
```

```php
// Fetch provisional drafts created by the current user
$entries = \craft\elements\Entry::find()
    ->provisionalDrafts()
    ->draftCreator(Craft::$app->user->identity)
    ->all();
```
:::


#### `relatedTo`

Narrows the query results to only entries that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all entries that are related to myCategory #}
{% set entries = craft.entries()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all entries that are related to $myCategory
$entries = \craft\elements\Entry::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `revisionCreator`

Narrows the query results to only revisions created by a given user.



Possible values include:

| Value | Fetches revisions…
| - | -
| `1` | created by the user with an ID of 1.
| a [craft\elements\User](craft4:craft\elements\User) object | created by the user represented by the object.



::: code
```twig
{# Fetch revisions by the current user #}
{% set entries = craft.entries()
  .revisionCreator(currentUser)
  .all() %}
```

```php
// Fetch revisions by the current user
$entries = \craft\elements\Entry::find()
    ->revisionCreator(Craft::$app->user->identity)
    ->all();
```
:::


#### `revisionId`

Narrows the query results based on the entries’ revision’s ID (from the `revisions` table).



Possible values include:

| Value | Fetches revisions…
| - | -
| `1` | for the revision with an ID of 1.



::: code
```twig
{# Fetch a revision #}
{% set entries = craft.entries()
  .revisionId(10)
  .all() %}
```

```php
// Fetch a revision
$entries = \craft\elements\Entry::find()
    ->revisionIf(10)
    ->all();
```
:::


#### `revisionOf`

Narrows the query results to only revisions of a given entry.



Possible values include:

| Value | Fetches revisions…
| - | -
| `1` | for the entry with an ID of 1.
| a [Entry](craft4:craft\elements\Entry) object | for the entry represented by the object.



::: code
```twig
{# Fetch revisions of the entry #}
{% set entries = craft.entries()
  .revisionOf(myEntry)
  .all() %}
```

```php
// Fetch revisions of the entry
$entries = \craft\elements\Entry::find()
    ->revisionOf($myEntry)
    ->all();
```
:::


#### `revisions`

Narrows the query results to only revision entries.





::: code
```twig
{# Fetch a revision entry #}
{% set entries = craft.entries()
  .revisions()
  .id(123)
  .one() %}
```

```php
// Fetch a revision entry
$entries = \craft\elements\Entry::find()
    ->revisions()
    ->id(123)
    ->one();
```
:::


#### `savable`

Sets the [savable](https://docs.craftcms.com/api/v3/craft-elements-db-entryquery.html#savable) property.






#### `savedDraftsOnly`

Narrows the query results to only unpublished drafts which have been saved after initial creation.





::: code
```twig
{# Fetch saved, unpublished draft entries #}
{% set entries = craft.entries()
  .draftOf(false)
  .savedDraftsOnly()
  .all() %}
```

```php
// Fetch saved, unpublished draft entries
$entries = \craft\elements\Entry::find()
    ->draftOf(false)
    ->savedDraftsOnly()
    ->all();
```
:::


#### `search`

Narrows the query results to only entries that match a search query.



See [Searching](https://craftcms.com/docs/4.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all entries that match the search query #}
{% set entries = craft.entries()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all entries that match the search query
$entries = \craft\elements\Entry::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `section`

Narrows the query results based on the sections the entries belong to.

Possible values include:

| Value | Fetches entries…
| - | -
| `'foo'` | in a section with a handle of `foo`.
| `'not foo'` | not in a section with a handle of `foo`.
| `['foo', 'bar']` | in a section with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not in a section with a handle of `foo` or `bar`.
| a [Section](craft4:craft\models\Section) object | in a section represented by the object.



::: code
```twig
{# Fetch entries in the Foo section #}
{% set entries = craft.entries()
  .section('foo')
  .all() %}
```

```php
// Fetch entries in the Foo section
$entries = \craft\elements\Entry::find()
    ->section('foo')
    ->all();
```
:::


#### `sectionId`

Narrows the query results based on the sections the entries belong to, per the sections’ IDs.

Possible values include:

| Value | Fetches entries…
| - | -
| `1` | in a section with an ID of 1.
| `'not 1'` | not in a section with an ID of 1.
| `[1, 2]` | in a section with an ID of 1 or 2.
| `['not', 1, 2]` | not in a section with an ID of 1 or 2.



::: code
```twig
{# Fetch entries in the section with an ID of 1 #}
{% set entries = craft.entries()
  .sectionId(1)
  .all() %}
```

```php
// Fetch entries in the section with an ID of 1
$entries = \craft\elements\Entry::find()
    ->sectionId(1)
    ->all();
```
:::


#### `siblingOf`

Narrows the query results to only entries that are siblings of another entry in its structure.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | beside the entry with an ID of 1.
| a [Entry](craft4:craft\elements\Entry) object | beside the entry represented by the object.



::: code
```twig
{# Fetch entries beside this one #}
{% set entries = craft.entries()
  .siblingOf(myEntry)
  .all() %}
```

```php
// Fetch entries beside this one
$entries = \craft\elements\Entry::find()
    ->siblingOf($myEntry)
    ->all();
```
:::


#### `site`

Determines which site(s) the entries should be queried in.



The current site will be used by default.

Possible values include:

| Value | Fetches entries…
| - | -
| `'foo'` | from the site with a handle of `foo`.
| `['foo', 'bar']` | from a site with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not in a site with a handle of `foo` or `bar`.
| a [craft\models\Site](craft4:craft\models\Site) object | from the site represented by the object.
| `'*'` | from any site.

::: tip
If multiple sites are specified, elements that belong to multiple sites will be returned multiple times. If you
only want unique elements to be returned, use [unique](#unique) in conjunction with this.
:::



::: code
```twig
{# Fetch entries from the Foo site #}
{% set entries = craft.entries()
  .site('foo')
  .all() %}
```

```php
// Fetch entries from the Foo site
$entries = \craft\elements\Entry::find()
    ->site('foo')
    ->all();
```
:::


#### `siteId`

Determines which site(s) the entries should be queried in, per the site’s ID.



The current site will be used by default.

Possible values include:

| Value | Fetches entries…
| - | -
| `1` | from the site with an ID of `1`.
| `[1, 2]` | from a site with an ID of `1` or `2`.
| `['not', 1, 2]` | not in a site with an ID of `1` or `2`.
| `'*'` | from any site.



::: code
```twig
{# Fetch entries from the site with an ID of 1 #}
{% set entries = craft.entries()
  .siteId(1)
  .all() %}
```

```php
// Fetch entries from the site with an ID of 1
$entries = \craft\elements\Entry::find()
    ->siteId(1)
    ->all();
```
:::


#### `siteSettingsId`

Narrows the query results based on the entries’ IDs in the `elements_sites` table.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | with an `elements_sites` ID of 1.
| `'not 1'` | not with an `elements_sites` ID of 1.
| `[1, 2]` | with an `elements_sites` ID of 1 or 2.
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2.



::: code
```twig
{# Fetch the entry by its ID in the elements_sites table #}
{% set entry = craft.entries()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the entry by its ID in the elements_sites table
$entry = \craft\elements\Entry::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `slug`

Narrows the query results based on the entries’ slugs.



Possible values include:

| Value | Fetches entries…
| - | -
| `'foo'` | with a slug of `foo`.
| `'foo*'` | with a slug that begins with `foo`.
| `'*foo'` | with a slug that ends with `foo`.
| `'*foo*'` | with a slug that contains `foo`.
| `'not *foo*'` | with a slug that doesn’t contain `foo`.
| `['*foo*', '*bar*']` | with a slug that contains `foo` or `bar`.
| `['not', '*foo*', '*bar*']` | with a slug that doesn’t contain `foo` or `bar`.



::: code
```twig
{# Get the requested entry slug from the URL #}
{% set requestedSlug = craft.app.request.getSegment(3) %}

{# Fetch the entry with that slug #}
{% set entry = craft.entries()
  .slug(requestedSlug|literal)
  .one() %}
```

```php
// Get the requested entry slug from the URL
$requestedSlug = \Craft::$app->request->getSegment(3);

// Fetch the entry with that slug
$entry = \craft\elements\Entry::find()
    ->slug(\craft\helpers\Db::escapeParam($requestedSlug))
    ->one();
```
:::


#### `status`

Narrows the query results based on the entries’ statuses.

Possible values include:

| Value | Fetches entries…
| - | -
| `'live'` _(default)_ | that are live.
| `'pending'` | that are pending (enabled with a Post Date in the future).
| `'expired'` | that are expired (enabled with an Expiry Date in the past).
| `'disabled'` | that are disabled.
| `['live', 'pending']` | that are live or pending.
| `['not', 'live', 'pending']` | that are not live or pending.



::: code
```twig
{# Fetch disabled entries #}
{% set entries = craft.entries()
  .status('disabled')
  .all() %}
```

```php
// Fetch disabled entries
$entries = \craft\elements\Entry::find()
    ->status('disabled')
    ->all();
```
:::


#### `title`

Narrows the query results based on the entries’ titles.



Possible values include:

| Value | Fetches entries…
| - | -
| `'Foo'` | with a title of `Foo`.
| `'Foo*'` | with a title that begins with `Foo`.
| `'*Foo'` | with a title that ends with `Foo`.
| `'*Foo*'` | with a title that contains `Foo`.
| `'not *Foo*'` | with a title that doesn’t contain `Foo`.
| `['*Foo*', '*Bar*']` | with a title that contains `Foo` or `Bar`.
| `['not', '*Foo*', '*Bar*']` | with a title that doesn’t contain `Foo` or `Bar`.



::: code
```twig
{# Fetch entries with a title that contains "Foo" #}
{% set entries = craft.entries()
  .title('*Foo*')
  .all() %}
```

```php
// Fetch entries with a title that contains "Foo"
$entries = \craft\elements\Entry::find()
    ->title('*Foo*')
    ->all();
```
:::


#### `trashed`

Narrows the query results to only entries that have been soft-deleted.





::: code
```twig
{# Fetch trashed entries #}
{% set entries = craft.entries()
  .trashed()
  .all() %}
```

```php
// Fetch trashed entries
$entries = \craft\elements\Entry::find()
    ->trashed()
    ->all();
```
:::


#### `type`

Narrows the query results based on the entries’ entry types.

Possible values include:

| Value | Fetches entries…
| - | -
| `'foo'` | of a type with a handle of `foo`.
| `'not foo'` | not of a type with a handle of `foo`.
| `['foo', 'bar']` | of a type with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not of a type with a handle of `foo` or `bar`.
| an [EntryType](craft4:craft\models\EntryType) object | of a type represented by the object.



::: code
```twig
{# Fetch entries in the Foo section with a Bar entry type #}
{% set entries = craft.entries()
  .section('foo')
  .type('bar')
  .all() %}
```

```php
// Fetch entries in the Foo section with a Bar entry type
$entries = \craft\elements\Entry::find()
    ->section('foo')
    ->type('bar')
    ->all();
```
:::


#### `typeId`

Narrows the query results based on the entries’ entry types, per the types’ IDs.

Possible values include:

| Value | Fetches entries…
| - | -
| `1` | of a type with an ID of 1.
| `'not 1'` | not of a type with an ID of 1.
| `[1, 2]` | of a type with an ID of 1 or 2.
| `['not', 1, 2]` | not of a type with an ID of 1 or 2.



::: code
```twig
{# Fetch entries of the entry type with an ID of 1 #}
{% set entries = craft.entries()
  .typeId(1)
  .all() %}
```

```php
// Fetch entries of the entry type with an ID of 1
$entries = \craft\elements\Entry::find()
    ->typeId(1)
    ->all();
```
:::


#### `uid`

Narrows the query results based on the entries’ UIDs.





::: code
```twig
{# Fetch the entry by its UID #}
{% set entry = craft.entries()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the entry by its UID
$entry = \craft\elements\Entry::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `unique`

Determines whether only elements with unique IDs should be returned by the query.



This should be used when querying elements from multiple sites at the same time, if “duplicate” results is not
desired.



::: code
```twig
{# Fetch unique entries across all sites #}
{% set entries = craft.entries()
  .site('*')
  .unique()
  .all() %}
```

```php
// Fetch unique entries across all sites
$entries = \craft\elements\Entry::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


#### `uri`

Narrows the query results based on the entries’ URIs.



Possible values include:

| Value | Fetches entries…
| - | -
| `'foo'` | with a URI of `foo`.
| `'foo*'` | with a URI that begins with `foo`.
| `'*foo'` | with a URI that ends with `foo`.
| `'*foo*'` | with a URI that contains `foo`.
| `'not *foo*'` | with a URI that doesn’t contain `foo`.
| `['*foo*', '*bar*']` | with a URI that contains `foo` or `bar`.
| `['not', '*foo*', '*bar*']` | with a URI that doesn’t contain `foo` or `bar`.



::: code
```twig
{# Get the requested URI #}
{% set requestedUri = craft.app.request.getPathInfo() %}

{# Fetch the entry with that URI #}
{% set entry = craft.entries()
  .uri(requestedUri|literal)
  .one() %}
```

```php
// Get the requested URI
$requestedUri = \Craft::$app->request->getPathInfo();

// Fetch the entry with that URI
$entry = \craft\elements\Entry::find()
    ->uri(\craft\helpers\Db::escapeParam($requestedUri))
    ->one();
```
:::


#### `with`

Causes the query to return matching entries eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/4.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch entries eager-loaded with the "Related" field’s relations #}
{% set entries = craft.entries()
  .with(['related'])
  .all() %}
```

```php
// Fetch entries eager-loaded with the "Related" field’s relations
$entries = \craft\elements\Entry::find()
    ->with(['related'])
    ->all();
```
:::



<!-- END PARAMS -->
