# Control Panel

We aren’t ready to share specifics about the extensibility of our new client-side architecture for the control panel, but a few things have been decided.

<!-- more -->

In Craft 5.x, we began experimenting with [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) as a means of cataloging, testing, and documenting the control panel.
This was by all measures a success, so we’re excited to formalize it by adopting [Lion](https://lion.js.org).

We anticipate that most of the components available to developers will be lightweight wrappers around Lion tools, or adapters between server-rendered HTML, web components, and Vue components.

## Storybook

Examples of every UI component and its parameters will be available in a live “storybook.”

## Registration vs. Explicit Binding

[Scripts and styles](assets.md) registered via plugins load on every control panel page, by default.
This is compatible with new mechanisms for pre-registering generic handlers that are later triggered by interactive elements, regardless of when they arrive in the client.

For example, instead of installing a handler for clicks on one specific, namespaced button element via `{% js %}` tags in a template (often resulting in bizarre selectors like `#my-button-6a023eb46f26f`), your bundle will have a chance to register handlers with Craft’s client-side event bus—for both custom interactivity, _and_ internal hooks.

### Server-driven events

Some key interfaces (like action menus) are being re-engineered to use this pattern via configuration arrays in PHP, instead of registering one-off script fragments.
Common tasks like copying text, opening a slideout, and navigating programmatically will become significantly simpler—often requiring no JavaScript at all.
