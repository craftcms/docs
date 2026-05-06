---
description: Official documentation for Craft CMS 6.x
---

# About Craft CMS

Craft is a flexible, user-friendly CMS for creating custom digital experiences on the web—and beyond.

<!-- more -->

People who use Craft love its…

- …intuitive, user-friendly [control panel](/5.x/system/control-panel.md) for content creation and administrative tasks;
- …clean-slate approach to content modeling and [front-end development](/5.x/development/README.md) that doesn’t make any assumptions about your content or how it should be delivered;
- …official Plugin Store with hundreds of free and commercial [plugins](https://plugins.craftcms.com/);
- …robust framework for [plugin development](extend/README.md);
- …active, vibrant [community](https://craftcms.com/community);

You can learn all about it at [craftcms.com](https://craftcms.com).

## Getting Started

Welcome to the alpha!
Ready to try out a bleeding-edge version of Craft?
Spin up a [new project](install.md) or [upgrade](upgrade.md) an existing one.

<Block label="Documentation Changes">

You’ll notice that the docs are relatively sparse for 6.x!
Our work so far as focused on the Laravel port and adapter, but we are slowly pivoting into feature development on the new platform.
Craft remains functionally very similar to 5.x, and most of the control panel will be identical… so we’re using this space to focus on the upgrade process!
Closer to release, we’ll start replicating the structure and content of 5.x.

</Block>

## Tech Specs

Craft is a self-hosted PHP application, built on [Laravel](https://www.laravel.com/).
It can connect to MySQL and PostgreSQL databases for content storage.
Server-side rendering is powered by [Twig](https://twig.symfony.com), and headless applications have access to content via a GraphQL API.

<See path="requirements.md" label="View System Requirements" description="Craft runs best on the latest PHP and MySQL or Postgres versions, but can be configured to work on most modern hosting platforms." />
