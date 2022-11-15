# Control Panel

The control panel is one of Craft’s greatest strengths.

<Todo notes="Finish opening statement. Should include something about being a powerful tool for developers and content authors." />

<BrowserShot url="https://my-craft-project.ddev.site/admin" :link="false" caption="The Craft control panel viewed in a fresh installation.">
<img src="./images/control-panel-dashboard.png" alt="Craft dashboard">
</BrowserShot>

::: tip
If this is your first time using Craft, it might feel a little bit empty—don’t worry, that’s [by design](#schema)!
:::

## Tour

The appearance and organization of the control panel can differ based on what types of content you’ve set up, your permissions, user preferences, and the environment—but the general structure will always be the same.

Let’s take a quick spin around a typical control panel “screen:”
- On the left edge is the _main navigation_. At the top of this bar, your [system name and icon](#icon) are displayed. Below, each [main section](#main-sections) of the control panel is linked, and the current one is highlighted.
- At the top, the _global header_ contains breadcrumbs (when working with nested content or settings) and the user menu.
- The current screen’s _main container_ takes up the remainder of the horizontal space, and will scroll if the content is tall enough. Within this region, you’ll find some combination of the following features:
    - A _header_, displaying a title and controls for the current screen;
    - A _sub-menu_ at the left edge, listing siblings of the current screen;
    - A _content container_ for the screen’s primary content (usually set off from the background on a lighter color);
    - _Tabs_, splitting the screen’s content or settings into logical groups;
    - A _details_ pane at the right edge, with metadata and controls specific to the type of content being viewed;

### Main Sections

You may not see (or need) all these sections in your _main navigation_. They’ll appear only when Craft determines that they’ll be useful to the logged-in user—for example, _Categories_ is hidden until you’ve configured at least one [Category Group](./categories.md#category-groups).

Section | Description
------- | -----------
[Dashboard](#dashboard) | Customizable landing page.
[Assets](./assets.md) | Create and edit Asset elements.
[Entries](./entries.md) | Create and edit Entry elements.
[Categories](./categories.md) | Create and edit Category elements.
[Globals](./globals.md) | Manage Globals.
[Users](./users.md) | <Badge type="edition" vertical="middle" title="Only available in Craft Pro">Pro</Badge> Create and edit User elements.
[GraphQL](./graphql.md) | <Badge type="edition" vertical="middle" title="Only available in Craft Pro">Pro</Badge> Configure GraphQL schemas, create tokens, and access the built-in playground.
[Utilities](./utilities.md) | Get system info and perform a variety of upkeep actions.
[Settings](#settings) | Configure Craft’s system settings and content model.
[Plugin Store](#plugin-store) | Browse, install, and purchase Craft and plugin licenses from the official store.
…and more! | Some plugins provide their own control panel screens; others may only have a pane in the [Settings](#settings) section.

## Schema

Craft doesn’t impose a content model on your site, so you won’t see any default features like posts or pages—instead, you’ll be presented with tools to create the features you do need from a collection of agnostic [element types](./elements.md).

## Settings

The **Settings** screen is where you’ll configure the system and your content model.

::: tip
Don’t see **Settings** in the main navigation? Make sure you have admin privileges, and that <config4:allowAdminChanges> is enabled.

We only recommend that this is enabled in development environments.
:::

<BrowserShot url="https://my-craft-project.ddev.site/admin/settings" :link="false" caption="The settings screen in Craft.">
<img src="./images/control-panel-settings.png" alt="Craft settings screen">
</BrowserShot>
