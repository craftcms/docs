# Where to Go From Here

Craft CMS is a powerful tool for modeling and managing content as you need it. We’ve focused on some of Craft’s core features that let us scaffold a simple website—but there’s plenty more to explore.

To get a better sense of how Craft can support your next project’s unique requirements, consider tackling one of these exercises:

## Beginner: _Explore the Demo_

- Expose blog post author details.  
  **Hint:** add [`{% dump entry.author %}`](/4.x/dev/tags.md#dump) anywhere you have access to an `entry` to see what’s there—or consult the [User element API documentation](craft4:craft\elements\User).)
- Customize the homepage (`templates/index.twig`) to match your site.
- Add more posts and integrate [pagination](/4.x/dev/tags.md#paginate) in your templates.
- Add an RSS feed using the example [in the documentation](kb:rss-and-atom-feeds).
- Use the [Contact Form plugin](https://plugins.craftcms.com/contact-form) to add a form to your site.

## Intermediate: _Go Deeper with Craft_

- Add a new section to the site like _Galleries_ or _Reviews_.
- Add multiple [sites](/4.x/sites.md) to your installation that cross-promote content or offer it [in different languages](/4.x/sites.md#setting-up-a-localized-site).
- Add a [Structure section](/4.x/entries.md#sections) to the site for creating nested bundles of specialized content.
- Upgrade to [Craft Pro](kb:upgrading-to-craft-pro) and learn about [user accounts](/4.x/users.md)
- Create multiple user groups and experiment with [permissions](/4.x/user-management.md) and field layout conditions.
- Create a store using [Craft Commerce](https://craftcms.com/commerce).
- Optimize template performance with [caching](/4.x/dev/tags.md#cache) and [eager loading](/4.x/dev/eager-loading-elements.md).

## Advanced: _Extend Craft_

- [Build a custom plugin or module](/4.x/extend/) using your own business logic.
- Familiarize yourself with [Yii](https://www.yiiframework.com/doc/guide/2.0/en), the framework that Craft is built on.

## Additional Resources

This tutorial serves as a high-level introduction to features covered in the [official documentation](/4.x/). Take a look, and if you have questions or just want to chat about Craft and the modern web, [join us in Discord](https://craftcms.com/discord)!

We know you’ll build something great with Craft.
