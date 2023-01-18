# Console Commands

Plugins and modules can add additional [console commands](../console-commands.md)
to Craft, which will be available via the `craft` executable in the terminal.

Console commands are implemented very similarly to [controllers](controllers.md), except that they should live within a `console/controllers/` folder within your plugin or module’s base source folder, and they should extend <craft4:craft\console\Controller> (rather than <craft4:craft\web\Controller>).

::: tip
For the most part, writing console commands for Craft is identical to writing console commands for Yii, so be sure to read the [Yii documentation][yii] as a starting point.
:::

## Module Setup

If you are adding console commands to a custom module, make sure that your module class defines its root `controllerNamespace` for console requests:

```php{14,15}
<?php
namespace acme;

use Craft;

class Module extends \yii\base\Module
{
    public function init()
    {
        // Define a custom alias named after the namespace
        Craft::setAlias('@acme', __DIR__);

        // Set the controllerNamespace based on whether this is a console or web request
        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'acme\\console\\controllers';
        } else {
            $this->controllerNamespace = 'acme\\controllers';
        }

        parent::init();

        // Custom initialization code goes here...
    }
}
```

You’ll also need to make sure your module is getting [bootstrapped](guide:runtime-bootstrapping)
from `config/app.php` (or `config/app.console.php`):

```php{2}
return [
    'bootstrap' => ['acme'],
    'modules' => [
        'acme' => acme\Module::class,
    ],
];
```

## Adding a Controller

Any classes within the folder corresponding to your [`controllerNamespace` setting](#module-setup) will be automatically discovered when the console application initializes. Every controller has a default action (run when an action is not specified), and supports [options](guide:tutorial-console#options).

Create `GreetController.php` in `modules/console/controllers/`, with this content:

```php
<?php

namespace modules\console\controllers;

use craft\console\Controller;
use craft\helpers\Console;
use yii\console\ExitCode;

/**
 * Greet Controller
 */
class GreetController extends Controller
{
    public $defaultAction = 'developer';

    /**
     * @var string|null The name used when referring to the runner.
     */
    public ?string $who = null;

    public function options($actionID): array
    {
        $options = parent::options($actionID);

        // Always allow a --who flag:
        $options[] = 'who';

        switch ($actionID) {
            case 'developer':
                // Action-specific arguments:
                // $options[] = '...';
                break;
        }

        return $options;
    }

    /**
     * Issues a greeting to new Craft developers.
     */
    public function actionDeveloper(): int
    {
        $who = $this->who ?? 'world';

        $this->stdout("Hello, {$who}!", Console::FG_GREEN);

        return ExitCode::OK;
    }
}
```

### Running Actions

Supposing your module ID or plugin handle was `acme`, you would access your controller like this:

```bash
# Run the "default action":
php craft acme/greet
# -> Hello, world!

# Run the developer-specific greeting:
php craft acme/greet/developer
# -> Hello, world!

# Pass a name:
php craft acme/greet/developer --who="Marvin"
# -> Hello, Marvin!
```

### Help Text

To assist CLI users, Yii automatically parses docblocks from your controller’s action methods (as well as any public properties matching options you’ve registered) and displays them when running `php craft help`.

```bash
php craft help acme/greet
# -> List of actions

php craft help acme/greet/developer
# -> Action description, list of available --options

php craft acme/greet --help
# This works the same way as the main `help` command!
```

## Registering Custom Console Commands

You can register custom console commands on Craft’s own controllers, or plugin-supplied controllers, so long as they extend <craft4:craft\console\Controller>. For example, plugins that supply custom element types can add their own actions to the [resave](craft4:craft\console\controllers\ResaveController) controller.

To do that, use the <craft4:craft\console\Controller::EVENT_DEFINE_ACTIONS> event.

```php
use craft\events\DefineConsoleActionsEvent;
use craft\console\Controller;
use craft\console\controllers\ResaveController;
use yii\base\Event;

Event::on(
    ResaveController::class,
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
