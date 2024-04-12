---
description: Official documentation for Craft CMS 5.
---

# About Craft CMS

Craft is a flexible, user-friendly CMS for creating custom digital experiences on the web—and beyond.

<!-- more -->

People who use Craft love its…

- …intuitive, user-friendly [control panel](system/control-panel.md) for content creation and administrative tasks;
- …clean-slate approach to content modeling and [front-end development](development/README.md) that doesn’t make any assumptions about your content or how it should be delivered;
- …official Plugin Store with hundreds of free and commercial [plugins](https://plugins.craftcms.com/);
- …robust framework for [plugin development](extend/README.md);
- …active, vibrant [community](https://craftcms.com/community);

You can learn all about it at [craftcms.com](https://craftcms.com).

## Getting Started

Ready to try out the latest version of Craft? Spin up a [new project](install.md) or [upgrade](upgrade.md) an existing one.

<Block label="Documentation Changes">

The documentation has been rearranged a bit for this release, in order to better highlight the breadth of Craft’s features and consolidate technical material:

- High-level concepts are more visible in the [**System**](system/README.md) section;
- [**Reference**](reference/README.md) material has been given a dedicated space, including [element types](system/elements.md), [field types](system/fields.md), [console commands](reference/cli.md), controllers, Twig features, and [configuration](configure.md).
- Some pages geared toward front-end development have been moved into the [**Development**](development/README.md) section, including lots of new information on [eager-loading](development/eager-loading.md) and [collections](development/collections.md);
- Information about using [forms](development/forms.md) has been split into a dedicated page, while specific [controller actions](reference/controller-actions.md) remain in the **Reference** section. 

</Block>

## Tech Specs

Craft is a self-hosted PHP application, built on [Yii 2](https://www.yiiframework.com/). It can connect to MySQL and PostgreSQL [databases](reference/config/db.md) for content storage. Server-side rendering is powered by [Twig](https://twig.symfony.com), and headless applications have access to content via a [GraphQL API](development/graphql.md).

<See path="requirements.md" label="View System Requirements" description="Craft runs best on the latest PHP and MySQL or Postgres versions, but can be configured to work on most modern hosting platforms." />

## Diving In

Here are some great ways to begin your journey with Craft:

<div class="sm:flex sm:flex-wrap">
    <div class="py-1 sm:w-1/2 sm:py-0">
        <IconLink
            title="Tutorial"
            subtitle="New to Craft? This is the place to start."
            link="/getting-started-tutorial"
            icon="/docs/icons/icon-tutorial.svg"
            iconSize="large" />
    </div>
</div>

<div class="sm:flex sm:flex-wrap">
    <div class="py-1 sm:w-1/2 sm:py-0">
        <IconLink
            title="System Tour"
            subtitle="Discover all the tools at your disposal."
            link="system"
            icon="/docs/icons/icon-generic-link.svg"
            iconSize="large" />
    </div>
    <div class="py-1 sm:w-1/2 sm:py-0">
        <IconLink
            title="Content & Elements"
            subtitle="Learn about content modeling in Craft."
            link="system/elements"
            icon="/docs/icons/icon-generic-link.svg"
            iconSize="large" />
    </div>
    <div class="py-1 sm:w-1/2 sm:py-0">
        <IconLink
            title="Front-End Development"
            subtitle="Deliver your content to any screen."
            link="system/elements"
            icon="/docs/icons/icon-generic-link.svg"
            iconSize="large" />
    </div>
    <div class="py-1 sm:w-1/2 sm:py-0">
        <IconLink
            title="Configuration"
            subtitle="Customize Craft to your heart’s content."
            link="configure"
            icon="/docs/icons/icon-generic-link.svg"
            iconSize="large" />
    </div>
</div>

#### Resources

<div class="sm:flex sm:flex-wrap">
    <div class="py-1 sm:w-1/2 sm:py-0">
        <IconLink
            title="Reference"
            subtitle="Find exactly what you’re looking for."
            link="reference"
            icon="/docs/icons/icon-book.svg"
            iconSize="large" />
    </div>
    <div class="py-1 sm:w-1/2 sm:py-0">
        <IconLink
            title="Extending Craft"
            subtitle="Add radical new functionality to your site or app."
            link="extend/README.md"
            icon="/docs/icons/icon-flask.svg"
            iconSize="large" />
    </div>
</div>
