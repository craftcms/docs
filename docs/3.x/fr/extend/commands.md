# Console Commands

Plugins and modules can add additional [console commands][yii] to Craft, which will be available via the `craft` executable in the terminal.

Console commands are implemented very similarly to [controllers](controllers.md), except that they should live within a `console/controllers/` folder within your plugin or module’s base source folder, and they should extend <craft3:craft\console\Controller> (rather than <craft3:craft\web\Controller>).

::: tip
For the most part, writing console commands for Craft is identical to writing console commands for Yii, so be sure to read the [Yii documentation][yii] as a starting point.
:::

## Module Setup

If you are adding console commands to a custom module, make sure that your module class defines its root controller namespace for console requests:

```php{14,15}
<?php
namespace bar;

use Craft;

class Module extends \yii\base\Module
{
    public function init()
    {
        // Define a custom alias named after the namespace
        Craft::setAlias('@bar', __DIR__);

        // Set the controllerNamespace based on whether this is a console or web request
        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'bar\\console\\controllers';
        } else {
            $this->controllerNamespace = 'bar\\controllers';
        }

        parent::init();

        // Custom initialization code goes here...
    }
}
```

You’ll also need to make sure your module is getting [bootstrapped](https://www.yiiframework.com/doc/guide/2.0/en/runtime-bootstrapping) from `config/app.php` (or `config/app.console.php`).

```php{2}
return [
    'bootstrap' => ['bar'],
    'modules' => [
        'bar' => bar\Module::class,
    ],
];
```

## Registering Custom Console Commands

You can register custom console commands on Craft’s own controllers, or plugin-supplied controllers, so long as they extend <craft3:craft\console\Controller>. For example, plugins that supply custom element types can add their own actions to the [resave](craft3:craft\console\controllers\ResaveController) controller.

To do that, use the <craft3:craft\console\Controller::EVENT_DEFINE_ACTIONS> event.

```php
use craft\events\DefineConsoleActionsEvent;
use craft\console\Controller;
use craft\console\controllers\ResaveController;
use yii\base\Event;

Event::on(ResaveController::class,
    Controller::EVENT_DEFINE_ACTIONS,
    function(DefineConsoleActionsEvent $event) {
        $event->actions['products'] = [
            'options' => ['type'],
            'helpSummary' => 'Re-saves products.',
            'action' => function($params): int {
                // @var ResaveController $controller
                $controller = Craft::$app->controller;
                $query = Product::find();
                if ($controller->type) {
                    $query->type(explode(',', $controller->type));
                }
                return $controller->saveElements($query);
            }
        ];
    }
);
```

[yii]: https://www.yiiframework.com/doc/guide/2.0/en/tutorial-console#create-command

[yii]: https://www.yiiframework.com/doc/guide/2.0/en/tutorial-console#create-command
