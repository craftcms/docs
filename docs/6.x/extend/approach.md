# Approach

Simple plugins (like those that exist mostly to handle or alter an event) can probably be **fully ported** and released as an alpha.

We recommend that developers of larger plugins (which provide entirely new features or new types of existing components) make the minimum required updates for compatibility, then use the alpha to gradually migrate. This will unblock others who wish to test the upgrade process in real projects and report issues with Craft, the compatibility layer, or your plugin.

::: tip
If you maintain a plugin that provides its own extension surface (events, service APIs, etc.), you should decide and telegraph whether you intend to fully port your plugin during the alpha, and whether you intend to ship a compatibility layer.
:::

## Necessity

Some low-level plugins may not be strictly necessary in the Laravel ecosystem, but developers will still appreciate a configuration layer that is accessible via the control panel and tracked in project config.

Examples of this are:

- **Mail transport adapters** — Projects can set up mailers via `config/mail.php` and select one in <Journey path="Settings, Email" />
- **Custom log back-ends** — As with prior versions of Craft, plugins may not be initialized early enough in the app’s lifecycle to capture a complete picture. Consider whether projects can effectively use Laravel’s built-in [logging](laravellogging) tools.
- **Filesystem types** — Developers can directly configure *disks* and use them for volumes. The <Journey path="Settings, Filesystems" /> screen also acts as a disk configurator.
