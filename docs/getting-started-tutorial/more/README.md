# Where to Go From Here

Craft CMS is a powerful tool for modeling and managing content as you need it. We’ve kept the tutorial focused on basic concepts to build a common, simple type of website—but there’s more to explore to get a better sense of how Craft CMS can support whatever’s needed for the complexities of *your* project.

If you’d like to explore further, here are some immediate tasks you might tackle.

## Beginner: extend the demo

- Expose blog post author details. (Hint: use [`dd`](/3.x/dev/tags.md#dd) on `entry.author` to see what’s there, or consult the [User element API documentation](craft3:\craft\elements\User).)
- Customize the homepage (`index.twig`) to match your site.
- Add more posts and integrate [pagination](/3.x/dev/tags.md#paginate) in your templates.
- Add an RSS feed using the example [in the documentation](/3.x/dev/examples/rss-feed.md).
- Use the [Contact Form plugin](https://plugins.craftcms.com/contact-form) to add a form to your site.

## Intermediate: go deeper with Craft

- Add a new section to the site like portfolios, press releases, or recipes.
- Add multiple [sites](/3.x/sites.md) to your installation that cross-promote content or offer it [in different languages](/3.x/sites.md#setting-up-a-localized-site).
- Add a [Structure section](/3.x/entries.md#sections) to the site for creating specialized marketing landing pages.
- Create a store using [Craft Commerce](https://craftcms.com/commerce).
- Optimize template performance with [caching](/3.x/dev/tags.md#cache) and [eager loading](/3.x/dev/eager-loading-elements.md).

## Advanced: extend Craft’s core functionality

- [Build a custom plugin or module](/3.x/extend/) using your own business logic.
- Familiarize yourself with [the Yii 2.0 documentation](https://www.yiiframework.com/doc/guide/2.0/en), since Craft CMS is an application built on that framework.

## Additional Resources

This tutorial is an introduction to the more in-depth [official documentation](/3.x/). Take a look, [join us in Discord](https://craftcms.com/discord), and we hope you’ll build something great with Craft CMS!