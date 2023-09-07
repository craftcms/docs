# Where to Go From Here

Craft CMS is a powerful tool for modeling and managing content, the way _you_ want to. We’ve focused on some of Craft’s core features that let us scaffold a simple website—but there’s plenty more to explore.

To get a better sense of how Craft can support your next project’s unique requirements, consider tackling one of these exercises:

## Beginner: _Explore the Demo_

- Expose blog post author details.  
  **Hint:** add [`{% dump entry.author %}`](/4.x/dev/tags.md#dump) anywhere you have access to an `entry` to see what’s there—or consult the [User element API documentation](craft4:craft\elements\User);
- Update the homepage (`templates/index.twig`) to match the rest of the site;
- Add more posts and implement [pagination](/4.x/dev/tags.md#paginate) on the index pages;
- Add an RSS feed using the example [in the knowledge base](kb:rss-and-atom-feeds);
- Use the [Contact Form plugin](https://plugins.craftcms.com/contact-form) to add a form to your site;

## Intermediate: _Go Deeper with Craft_

- Add a new section to the site like _Galleries_ or _Reviews_;
- Add multiple [sites](/4.x/sites.md) to your installation that cross-promote content or offer it [in different languages](/4.x/sites.md#setting-up-a-localized-site);
- Add a [Structure section](/4.x/entries.md#sections) to the site for creating nested bundles of specialized content;
- Upgrade to [Craft Pro](kb:upgrading-to-craft-pro) and learn about [user accounts](/4.x/users.md) and front-end authentication;
- Create multiple user groups and experiment with [permissions](/4.x/user-management.md);
- Set up new [element sources](/4.x/elements.md#indexes) or advanced [field layouts](/4.x/fields.md#field-layouts) with the condition builder;

## Advanced: _Extend Craft_

- Create a store and start selling products with [Craft Commerce](https://craftcms.com/commerce);
- Familiarize yourself with [Yii](https://www.yiiframework.com/doc/guide/2.0/en), the framework that Craft is built on;
- [Build a custom plugin or module](/4.x/extend/) using your own business logic;

## Additional Resources

This tutorial serves as a high-level introduction to features covered in the [official documentation](/4.x/). Take a look, and if you have questions or just want to chat about Craft and the modern web, [join us in Discord](https://craftcms.com/discord)!

We know you’ll build something great with Craft.
