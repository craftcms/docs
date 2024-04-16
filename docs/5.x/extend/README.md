---
sidebarDepth: 2
---

# Extending Craft

[Craft](../README.md) is a powerful and flexible content management system built on top of the popular PHP application framework [Yii](https://yiiframework.com/).

Yii’s [application structure](guide:structure-overview) informs much of Craft’s internal organization. You may already be familiar with some [core components](guide:structure-application-components) if you’ve made changes to the [application config](../reference/config/app.md).

A Craft extension (often referred to as a [module](#modules) or [plugin](#plugins)) can be as lean as a single class, or as complex as an embedded <abbr title="Model, View, Controller">MVC</abbr>-style application. Either way, Craft’s entire API is at your finger tips.

<See path="./generator.md" description="Jump right in by generating your first plugin or module!" />

Let’s take a moment to survey the means and motives for developing an extension.

## Fundamentals

The inspiration to extend Craft can come from _anywhere_. Our community is replete with developers who have embraced Craft’s extensibility to satisfy personal curiosity, grow professionally, provide a broader array of client services, or build first-party platform integrations.

While expanding the footprint of what you can do with Craft is a reward unto itself, many developers are able to monetize that expertise by publishing paid plugins to the official [Plugin Store](./plugin-store.md).

### The Lay of the Land

The public [Plugin Store](https://plugins.craftcms.com/) is a great place to familiarize yourself with the kinds of things extensions can do. Adding capabilities and value to your Craft projects by installing existing plugins is a huge part of what makes Craft such an accessible, powerful, and vibrant platform—but for the enterprising developer, this is just a gateway to building truly bespoke web applications.

::: tip Did you know?
The Plugin Store and Craft Console are both built with Craft!
:::

Not all extensions must be conceived as portable or publishable! In fact, the most common kinds of customization you are apt to need are more akin to configuration—altering or augmenting built-in components to suit your application or infrastructure.

### Types of Extensions

Most customizations come in the form of a **module** or a **plugin**.

::: tip
Private plugins combine the best of both worlds. If this is your first time writing an extension, we recommend using the [Generator](generator.md) to scaffold a private plugin.
:::

#### Modules

**Modules** are a great way to tightly couple extra functionality with the parent application—say, business logic that is specific to a single website or project.

Initially, this may afford you a greater sense of freedom when designing your extension:

- Instead of having intermediate [settings](environmental-settings.md) layer for consumers, you might directly reference environment variables that you know will exist in your project;
- Referencing specific field handles, sections, globals, or other resources is acceptable, because the module is versioned with the parent application’s project config;

While you will miss _some_ convenience features provided by [plugins](#plugins), modules are equally capable in almost every way.

<See path="./module-guide.md" description="Learn how to add functionality to a Craft project by creating your first module." />

#### Plugins

**Plugins** are a Craft-specific concept, so—unlike _modules_—you won’t find any mention of them in the Yii documentation. They can do everything modules can do (plugins are, in fact, modules), but are better suited for public distribution:

- They can be installed/trialed/purchased from the Craft [Plugin Store](plugin-store.md);
- They can make [database changes](migrations.md) when installed, updated, or uninstalled;
- They get their own config file and [settings](plugin-settings.md) page within the control panel, and are automatically registered with [project config](project-config.md);
- They can be enabled/disabled by an admin, without running any Composer commands;

If the thing you want to build would benefit from any of these features (or you’re unsure whether it might), make it a plugin. Just like modules, plugins can live as [part of a project](plugin-guide.md#path-repository).

<See path="./plugin-guide.md" description="Learn about the Craft plugin ecosystem." />

### Design + Approach

Extensions naturally invite technical debt—for maintainers _and_ users. This isn’t necessarily a bad thing, though! The most common manifestation is some additional friction during major version upgrades. Craft itself has enough abstractions in place to protect most developers from significant API changes (for example, Twig templates are largely compatible back to Craft 2), but as you get deeper into Craft’s API, you will need to pay special attention to deprecation notices and our dedicated [plugin upgrade guides](updating-plugins.md).

One of the most important things to consider as you set out is how you will communicate to others (your teammates, a client’s future development partners, or even your future self) where a project’s special features come from. It could be documentation or training—or nothing at all, if the scope of the extension is limited!

Craft automatically handles this for [plugins](#plugins)—from the control panel, you can see what’s currently installed and [temporarily disable](config5:disabledPlugins) one (or all) to track down problems. Registered [modules](#modules) are also disclosed in the control panel… but without understanding how they’re organized, auto-loaded, bootstrapped, or otherwise factored into the logic of your application, their purpose and specific effects may be unclear.

#### Extension Points

An extension usually leverages one or more of these concepts:

Controllers
: Provide new endpoints for [web](controllers.md) or [console](commands.md) requests.

Events
: React to, prevent, or modify default behaviors by listening to [events](events.md) or attaching [hooks](template-hooks.md).

Component Types
: Create new kinds of existing components like [element exporters](element-exporter-types.md) or [background jobs](queue-jobs.md).

Services
: Add, modify, or replace components accessible via `Craft::$app` or as part of your own extension.

Templates
: Expose functionality to [Twig](extending-twig.md) via built-in language features like functions and filters—or add your own!

::: tip
This is not an exhaustive list! Check the sidebar for more info on what aspects of Craft are extensible, or take a spin through the [topics](topics.md) page for some more ideas.
:::

These fixtures can be combined to create advanced front-end and control panel interfaces, communicate with external services, improve developer experience… or build virtually any other web- or console-based functionality.

<See path="topics.md" />

### First Steps

While the [Generator](./generator.md) has dramatically simplified the process of initializing a new extension, it’s still a good idea to get a sense for what you can do with the tools you already know.

Here are a few activities (in no particular order) that can help you get oriented with the Craft API, without treading into completely new territory:

1. In a Twig template, use the [`{% dd %}` tag](../reference/twig/tags.md#dd) to output a value or variable to the browser.  
  _What kinds of values do you see?_
1. Dive in to the `vendor/craftcms/cms/` directory and look for a familiar-sounding class.  
  _Can you find the corresponding documentation in the [class reference][class-ref]?_
1. Look at the list of [common services](../reference/twig/global-variables.md#common-services) that are available on the [`craft.app` variable](../reference/twig/global-variables.md#craft-app) in any template.  
  _Can you determine what other services are accessible in the same way?_
1. Install one of the [recommended editors](#ide) and open up a config file. Move your cursor over one of the [`use` statements](repo:craftcms/craft/blob/main/config/general.php#L11-L12) at the top to get information about the classes.  
  _Can you figure out how to open the file that the class is defined in?_

## Resources

Keep these learning tools in mind, as you get started!

### Links

- [**Generator**](./generator.md): Let Craft generate and wire up boilerplate components.
- [**Coding Guidelines**](./coding-guidelines.md): Keeping your own code organized will make source-diving less daunting.
- [**Class Reference**][class-ref]: Comprehensive documentation for Craft’s source code, automatically generated with every release.
- [**Craft Source**](repo:craftcms/cms): Dive into Craft’s source code.
- [**Issues + Discussions**](repo:craftcms/cms): Join the conversation about Craft’s future.

::: tip
All of our [first-party plugins](https://github.com/search?q=topic%3Acraft-plugin+org%3Acraftcms&type=Repositories&ref=advsearch&l=&l=) are published on GitHub as learning resources. Please be aware that use of a plugin is still subject to its license.
:::

### Tools

The “right” development tools can make or break your initial experience building an extension. These are only recommendations, though—the only requirement is that you are comfortable enough PHP and your development environment to debug or troubleshoot unexpected errors, as they emerge.

#### IDE

Any time you’re working with PHP, [PhpStorm](https://www.jetbrains.com/phpstorm/) (or [VS Code](https://code.visualstudio.com) with the [Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client) extension) will provide valuable insight into your (and Craft’s) code.

#### DDEV

[DDEV](https://ddev.readthedocs.io/en/stable/) is our recommended [local development tool](../install.md). Everything you need to run Craft and build extensions is neatly packaged into a consistent, container-based environment.

#### xdebug

DDEV comes [pre-configured with xdebug](https://ddev.readthedocs.io/en/stable/users/debugging-profiling/step-debugging/), and can be connected to your IDE of choice to support breakpoints and step-debugging.

#### Debug Toolbar

Yii’s built-in [debug toolbar](repo:yiisoft/yii2-debug) is invaluable, especially while troubleshooting database queries, [events](events.md), and other performance issues.

#### Composer

If your journey with Craft so far has not involved [Composer](https://getcomposer.org), certain concepts (like namespacing and auto-loading) may present additional difficulty. Consider reviewing our article on using the [starter project](kb:using-the-starter-project), and try running [updates](../update.md#composer) or installing a plugin with Composer.

::: danger
In the course of extending Craft, you will _never_ need to modify files that live in the `vendor/` directory. Changes to source files will be lost any time Composer installs or updates packages.

This documentation does not cover altering Craft’s source code, even with the intention of submitting a pull request.
:::

[class-ref]: https://docs.craftcms.com/api/v5/
