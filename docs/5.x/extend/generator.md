# Generator

The [Generator](repo:craftcms/generator) is a first-party tool for scaffolding modules, plugins, or components thereof. It was designed to reduce friction when setting up extensions—and contributing to Craft itself! We like to think of it as both a learning _and_ productivity tool.

## Installation

New Craft projects come with the Generator package installed and ready to use. If you started your project with a version of Craft earlier than 4.3.5, [update](../updating.md) and run:

```bash
composer require craftcms/generator --dev
```

## Usage

Generator’s API is accessible via the command line, under the `make` command:

<Generator />

Without passing an argument, you will be presented with the command’s help text, and two primary options:

1. `php craft make plugin`: Initialize and wire up a new [Plugin](./plugin-guide.md).
1. `php craft make module`: Create a new [Module](./module-guide.md).

Feel free to explore the generator API at your own pace. See the official readme for a list of [currently-supported components](repo:craftcms/generator#system-component-generation), or run `php craft make` to see what is supported by your installed version.

Subsequent commands should be run with either a `--module` or `--plugin` flag, using the target module ID or plugin handle, respectively.

## Updates

To get the latest Generator functionality, run `composer update` in your project directory. Generator is not considered a plugin, and therefore will not appear in Craft’s built-in updater tool, nor will its presence be recorded in [project config](./project-config.md).

### Documentation Changes

We will be gradually rolling out Generator examples to system component documentation, and plan to make it the recommended tool for scaffolding new extensions and components (rather than providing bare-bones examples, in-line).

Keep an eye out for these special Generator command call-outs, throughout the documentation:

<Generator component="controller" plugin="hello-world" />

## Generating Generators

::: warning
There’s no two ways about it: this section is extremely confusing. It’s intended only for developers with complete or near-complete plugins that provide their own extension points.

If you’re new here, consider skipping to our [topics](topics.md) overview!
:::

Generator can even generate _generators_ for your plugin! Any plugin that itself exposes [points of extension](topics.md) may benefit from bundling a generator:

<Generator component="generator" plugin="my-plugin" />

Each component supported by Generator is backed by a class in the `craft\generator\generators` namespace, extending `craft\generator\BaseGenerator`. These classes are responsible for gathering parameters from CLI input, then loading, modifying, and writing new classes to disk, using convenience methods provided by `BaseGenerator`.

### Registering a Generator

Once you’ve generated the generator class, you must register it with Generator for it to be available from the command line:

```php
use craft\events\RegisterComponentTypesEvent;
use craft\generator\Command;
use mynamespace\myplugin\generators\MyGenerator;
use yii\base\Event;

Event::on(
    Command::class,
    Command::EVENT_REGISTER_GENERATOR_TYPES,
    function(RegisterComponentTypesEvent $e) {
        $e->types[] = MyGenerator::class;
    }
);
```

This code belongs in your plugin’s [`init()` method](plugin-guide.md#initialization).

::: tip
The metaprogramming involved in generators is not for the faint of heart! Make sure you have a good grasp on the structure and substance of the base component you’re targeting and what the output of a subclass should look like. Some aspects of the generated classes can be defined with code (via the `properties()` or `methods()` methods, for example), but advanced customization may require manually concatenating PHP code while controlling indentation, quoting, brackets, etc—without the help of syntax highlighting or linting.

Test your generators early and often!
:::

## Trivia

Rather than implementing Generator as a plugin or module, we chose to use a Yii feature known as [bootstrapping](yii2:yii\base\BootstrapInterface), which automatically initializes the core class based on the [`extra.bootstrap`](guide:structure-extensions#bootstrapping-classes) key in `composer.json`.

This is generally _not_ a recommended extension point for Craft, as its presence in a project is opaque and non-optional once installed (bootstrapped classes cannot be temporarily disabled, unlike plugins and modules).
