# Extending Twig

Craft provides two ways for plugins to extend its Twig templating environment.

## Extend the Global `craft` Variable

The global `craft` template variable is an instance of <craft4:craft\web\twig\variables\CraftVariable>. When a template references `craft.entries` or `craft.entries()`, it’s calling [CraftVariable::entries()](craft4:craft\web\twig\variables\CraftVariable::entries()) behind the scenes, for example.

The `CraftVariable` instance can be extended by plugins with [behaviors](behaviors.md) and [services](./services.md). Choosing the right approach depends on what you’re trying to add to it.

- Use a **behavior** to add custom properties or methods directly onto the `craft` variable (e.g. `craft.foo()`).
- Use a **service** to add a sub-object to the `craft` variable, which can be accessed with a custom property name, called the service’s “ID”. (e.g. `craft.foo.*`).

You can attach your behavior or service to the `CraftVariable` instance by registering an [EVENT_INIT](craft4:craft\web\twig\variables\CraftVariable::EVENT_INIT) event handler from your plugin’s `init()` method:

```php
use craft\web\twig\variables\CraftVariable;
use yii\base\Event;

public function init()
{
    parent::init();

    Event::on(
        CraftVariable::class,
        CraftVariable::EVENT_INIT,
        function(Event $e) {
            /** @var CraftVariable $variable */
            $variable = $e->sender;

            // Attach a behavior:
            $variable->attachBehaviors([
                MyBehavior::class,
            ]);

            // Attach a service:
            $variable->set('serviceId', MyService::class);
        }
    );
}
```

## Register a Twig Extension

New features can be added to Twig by creating a [Twig extension](https://twig.symfony.com/doc/3.x/advanced.html#creating-an-extension).

Extensions follow this signature:

```php
namespace mynamespace\myplugin\twig;

use Craft;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;
use Twig\TwigTest;

class Extension extends AbstractExtension
{
    public function getFilters(): array
    {
        return [
            // First argument is the filter name; second is a callable:
            new TwigFilter('total', 'array_sum'),
        ];
    }

    public function getFunctions(): array
    {
        return [
            // First argument is the function name; second is a callable:
            new TwigFunction('log', [Craft::class, 'info']),
        ];
    }

    public function getTests(): array
    {
        return [
            // First argument is the test name; second is a callable:
            new TwigTest('infinite', 'is_infinite'),
        ];
    }
}
```

::: tip
Filters, functions, and tests are mostly equivalent in their capabilities, but as language constructs have specific uses in the template layer. Consider which makes the most sense for your users! It should be clear in a template what features come from which extensions—either from their naming or how they’re used.
:::

You do not need to define methods that your extension has no use for—except when explicitly implementing the `GlobalsInterface` to inject global variables:

```php {4,8}
namespace mynamespace\myplugin\twig;

use Craft;
use Twig\Extension\AbstractExtension;
use Twig\Extension\GlobalsInterface;
use mynamespace\myplugin\MyPlugin;

class Extension extends AbstractExtension implements GlobalsInterface
{
    // ...

    public function getGlobals(): array
    {
        // Keys are variable names!
        return [
            'myPlugin' => MyPlugin::getInstance(),
        ];
    }
}
```

Here, we’ve set a variable (`myVariable`) to our plugin’s singleton instance. This means that any services you’ve defined will be accessible in all Twig templates:

```twig
{{ myPlugin.myServiceName.myServiceMethod() }}
```

Avoid defining global variables that are ambiguous (like `plugin` or `elements`), apt to be frequently overwritten (like `entry` or `block`), or conflict with [built-in globals](../dev/global-variables.md).

Register your Twig extension in your plugin or module’s `init()` method by calling <craft4:craft\web\View::registerTwigExtension()>:

```php {7-8}
public function init()
{
    parent::init();

    if (Craft::$app->getRequest()->getIsSiteRequest()) {
        // Instantiate + register the extension:
        $extension = new mynamespace\myplugin\twig\Extension();
        Craft::$app->getView()->registerTwigExtension($extension);
    }
}
```

The `getIsSiteRequest()` check is optional. If your extension provides features that will be useful in system emails (commonly triggered from the control panel), or will be used when rendering templates from console requests (less common, but still valid), you may want to register it in all contexts.

::: tip
We’ve only covered the simplest means of extending the Twig environment—you can also provide custom _tags_ or _operators_. Craft’s own [Twig extension](https://github.com/craftcms/cms/tree/main/src/web/twig) is a great place to look for examples of advanced features.
:::
