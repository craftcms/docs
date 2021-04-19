# Debugging with Ray

[Ray](https://myray.app/) is a desktop PHP debugging tool that makes it easy to debug Craft or any PHP application.

## Installation

Ray’s first-party [Craft plugin](https://plugins.craftcms.com/craft-ray) makes configuration quick and easy. From your terminal, require and install it:

```
nitro composer require spatie/craft-ray
nitro craft plugin/install craft-ray
```

::: tip
If you only want to use Ray in development, run \
`nitro composer require spatie/craft-ray --dev`
:::

## Configuring

In the control panel, visit **Settings** → **Plugins**, choose **Ray** and switch on the **Enable** setting.

Enter the following:

**Host:** `host.docker.internal`\
**Remote Path:** `/app`\
**Local Path:** `/path/to/your/local/project`

<BrowserShot url="https://tutorial.nitro/admin/settings/plugins/craft-ray" :link="false" caption="Ray plugin settings">
<img src="./images/ray-plugin-settings.png" alt="Screenshot of Ray plugin settings in the Craft control panel" />
</BrowserShot>

## Usage

You can use Ray directly in your Twig templates or Plugin. To use Ray in Twig, open your template of choice and enter the following:

```twig
{{ ray("Hello Ray!") }}
```

::: tip
For a full site of available methods in Twig, visit the [Ray documentation for Craft CMS](https://spatie.be/docs/ray/v1/usage/craft-cms).
:::

The Ray desktop app will now have a new debug event!

![Ray App](./images/ray-gui.png)

To use Ray for plugin or module development, enter the following in your plugin:

```php
<?php

namespace modules;

use Craft;

class Module extends \yii\base\Module
{
    public function init()
    {
        Craft::setAlias('@modules', __DIR__);

        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'modules\\console\\controllers';
        } else {
            $this->controllerNamespace = 'modules\\controllers';
        }

        ray('Hello Ray!');

        ray()->showEvents();

        parent::init();

        // Custom initialization code goes here...
    }
}
```

::: tip
For a complete list of available methods, see the [Yii2 documentation](https://spatie.be/docs/ray/v1/usage/yii2) for more detailed usage examples.
:::
