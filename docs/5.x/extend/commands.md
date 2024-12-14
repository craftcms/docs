---
sidebarDepth: 2
---

# Console Commands

Plugins and modules can add additional [console commands](../reference/cli.md)
to Craft, which will be available via the `craft` executable in the terminal.

Console commands are implemented very similarly to [controllers](controllers.md), except that they should live within a `console/controllers/` folder within your plugin or module’s base source folder, and they should extend <craft5:craft\console\Controller> (rather than <craft5:craft\web\Controller>).

::: tip
For the most part, writing console commands for Craft is identical to writing console commands for Yii, so be sure to read the [Yii documentation][yii] as a starting point.
:::

## Module Setup

Plugins are [automatically configured](plugin-guide.md#automatic-defaults) to locate web and console controllers. Modules, on the other hand, must explicitly define their root `controllerNamespace` for both request types:

```php{13-17}
namespace acme;

use Craft;

class Module extends \yii\base\Module
{
    public function init()
    {
        // Define a custom alias named after the namespace:
        Craft::setAlias('@acme', __DIR__);

        // Set the controllerNamespace based on whether this is a console or web request:
        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'acme\\console\\controllers';
        } else {
            $this->controllerNamespace = 'acme\\controllers';
        }

        // Call init() *after* setting the `controllerNamespace` so Yii doesn’t try and set it:
        parent::init();

        // Additional custom initialization code goes here...
    }
}
```

You’ll also need to make sure your module is getting [bootstrapped](guide:runtime-bootstrapping) on every request from `config/app.php` (or `config/app.console.php`):

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

Supposing your [module ID](module-guide.md#preparation) or plugin handle was `acme`, you would access your controller like this:

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

### Options

In the example, we’ve declared a public class property, and set up a mapping for the single _action ID_. Any [option](guide:tutorial-console#options) can be set using bash’s familiar `--kebab-case-option-name` syntax.

::: tip
Use the [`optionAliases()` method](guide:tutorial-console#options-aliases) to define shorthand options like `-m`.
:::

### Arguments

Actions can declare arguments that will be processed from the command’s input. Arguments are separated by spaces, and the values are processed according to their declared types:

```php
public function actionDeveloper(string $emotion, ?int $days = null): int
{
    $who = $this->who ?? 'world';

    if ($days >= 500) {
        $this->stderr("Sorry, I don’t remember you, {$who}!", Console::FG_YELLOW);

        return ExitCode::TEMPFAIL;
    }

    $this->stdout("Hello, {$who}! I am {$emotion} to see you!", Console::FG_GREEN);

    return ExitCode::OK;
}
```

::: tip
Read more about passing [arguments](guide:tutorial-console#arguments) to console commands.
:::

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

You can register custom console commands on Craft’s own controllers, or plugin-supplied controllers, so long as they extend <craft5:craft\console\Controller>. For example, plugins that supply custom element types can add their own actions to the [resave](craft5:craft\console\controllers\ResaveController) controller.

To do that, use the <craft5:craft\console\Controller::EVENT_DEFINE_ACTIONS> event.

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
                /** @var ResaveController $controller */
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

## Output Helpers

Internally, Craft keeps console feedback consistent with a suite of helper methods provided by <craft5:craft\console\ControllerTrait>.

- **Success** — Output a message with a ✅ icon: `$this->success('Done!');`
- **Failure** — Output a message prefixed with an `X`: `$this->failure('Something went wrong.');`
- **Tips** — Output a message with a 💡 icon: `$this->tip('Try this, next!');`
- **Warning** — Output a message with a ⚠️ icon: `$this->warning('Check your input and try again.');`
- **Generic “Note”** — Output a message with a custom icon or prefix: `$this->note('Eat your vegetables!', '🥬 ');`

The above methods run the `$note` argument through <craft5:craft\console\ControllerTrait::markdownToAnsi()>, which provides some basic formatting for long messages. All methods write to `stdout`—use `$this->stderr()` if you need to target a particular output stream.

You can also format messages directly, using <yii2:yii\console\Controller::stdout()>. Additional <craft5:craft\helpers\Console> constants can be passed after the first argument (the message itself) to decorate the text output:

```php
use craft\helpers\Console;

$this->stdout(
    'This message will be bold and vibrant!',
    Console::FG_RED,
    Console::BG_YELLOW,
    Console::BOLD,
    // ...
);
```

[yii]: https://www.yiiframework.com/doc/guide/2.0/en/tutorial-console#create-command
