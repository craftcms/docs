# Debugging with Ray

[Ray](https://myray.app/) is a Desktop PHP debugging tool that makes it easy to debug your PHP application.

## Installation

Ray is PHP framework agnostic, however there is a [helpful plugin](https://plugins.craftcms.com/craft-ray) to make configuring Craft and Ray super easy!

Install the plugin using the [`nitro composer`](commands.md#composer) command:

`nitro composer require spatie/craft-ray`

::: tip
If you only want to use Ray in development, run `nitro composer require spatie/craft-ray --dev`
:::

## Configuring

Visit the control panel -> plugins and enable the Ray.

**Host:** `host.docker.internal`

**Remote Path:** `/app`

**Local Path:** `/path/to/your/local/project`

![Ray Plugin Settings](./images/ray-plugin-config.png)

## Usage

You can use Ray directly in your Twig templates.

Open your template of choice and enter:

```
{{ ray("Hello Ray!") }}
```

::: tip
Ray can also be used directly in plugin development. See the [Yii2 documentation](https://spatie.be/docs/ray/v1/usage/yii2) for usage examples.
:::

::: tip
For a full site of available methods in Twig, visit the [Ray docs for Craft CMS](https://spatie.be/docs/ray/v1/usage/craft-cms).
:::
