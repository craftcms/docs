# Supporting Project Config

If your plugin has any configurable components that store settings outside of your main [plugin settings](plugin-settings.md), they may be good candidates for [project config](../system/project-config.md) support.

<Block label="Is Project Config Support Right for You?">

Before adding project config support to your component, consider the tradeoff: components that are managed via project config [should only be editable by administrators](../system/project-config.md#production-changes-reverted) in development environments.

Ask yourself:

- Can this component be managed by non-admins?
- Does it depend on anything that can be managed by non-admins?
- Would it be cumbersome to admins’ workflows if the component could only be edited in development environments?

If the answer to any of those is **yes** (now or in the foreseeable future), then it’s likely _not_ a good candidate for project config support. See the [scope](../system/project-config.md#scope) section of the main project config docs for examples of what Craft itself tracks in project config.

Plugins do not need to track _everything_ in project config for it to be worthwhile managing one or two components this way. Incremental adoption is a totally valid and encouraged approach. You may even be able to implement project config in a minor release, with no disruption to your plugin’s service APIs. We do discourage opt-in/out support of project config (i.e. a plugin setting that enables or disables project config support for one or more of its features).

::: tip
We also maintain some recommendations for effective use of project config in [teams and multi-environment systems](../deploy.md)—keep these in mind as you consider project config support.
:::

</Block>

## Project Config Theory

To add project config support to a plugin, some of your existing <abbr title="Create, Read, Update, Delete">CRUD</abbr> operations will have to be reorganized. Your existing workflow might look something like this:

- A controller populates a model with request data;
- The model is passed to a service;
- The service copies properties from the model onto a corresponding `ActiveRecord` class, then saves it (or directly writes data to a table via `Db::upsert()` or an equivalent);

Instead, we’re going to split this into two parts, and connect them via project config “events.” Our new workflow will look like this:

### Express Changes

The first step involves taking input and telling the system what changes ought to be made.

- A controller populates a model with request data;
- The model is passed to a service;
- The service [writes the model’s config data](#step-3-push-config-changes) to project config;

### Emit Events

At this point, Craft emits a [series of events](#step-1-listen-for-config-changes) to let the system know that project config values have been added, changed, or removed—but it hasn’t touched the database.

::: tip
These events are emitted _regardless_ of how a project config change occurs. In fact, they’re an essential part of how Craft is able to reconcile and synchronize state between YAML files and what is in the database. By “air-gapping” the changes to project config from changes to the database, we are able to express _intended changes_ and _actual changes_ as two discrete steps, then play the actual changes back in other environments.
:::

### Update Database

In response to those events, our only responsibility is [getting the updates into the database](#step-2-handle-config-changes).

## Implementing Project Config

Let’s take a look at how this works for saving product types in Craft Commerce. The order above represents the flow as it pertains to usage, but we’re going to walk through implementation in a slightly different order:

### Step 1: Listen for Config Changes

From your plugin’s `init()` method, use <craft5:craft\services\ProjectConfig::onAdd()>, [onUpdate()](craft5:craft\services\ProjectConfig::onUpdate()), and [onRemove()](craft5:craft\services\ProjectConfig::onRemove()) to register event handlers that are triggered when product types are added, updated, and removed from project config:

```php
public function init()
{
    parent::init();

    Craft::$app->getProjectConfig()
        ->onAdd('myplugin.productTypes.{uid}', [$this->productTypes, 'handleChangedProductType'])
        ->onUpdate('myplugin.productTypes.{uid}', [$this->productTypes, 'handleChangedProductType'])
        ->onRemove('myplugin.productTypes.{uid}', [$this->productTypes, 'handleDeletedProductType']);
}
```

The first argument is a “config path” that uses dot notation to describe where the data we’re interested in lives. The second is a [callable](https://www.php.net/manual/en/language.types.callable.php) that refers to a method of service class (in this case, Commerce’s [ProductTypes](commerce4:craft\commerce\services\ProductTypes)) mounted on the main plugin instance.

::: tip
`{uid}` is a special config path token that will match any valid UID (such as ones generated by [StringHelper::UUID()](craft5:craft\helpers\StringHelper::UUID())). When an event handler is called, if the path contained a `{uid}` token, the matching UID will be available via [ConfigEvent::$tokenMatches](craft5:craft\events\ConfigEvent::$tokenMatches).

The UID will be generated in [Step 3](#step-3-push-changes-to-the-config).
:::

### Step 2: Handle Config Changes

Now it’s time to implement the `handleChangedProductType()` and `handleDeletedProductType()` methods we’re referencing in our config event listeners. These functions are only responsible for making database changes, based on new (or removed) project config values.

```php{23,50}
use Craft;
use craft\db\Query;
use craft\events\ConfigEvent;
use craft\helpers\Db;
use craft\commerce\events\ProductTypeEvent;

// ...

public function handleChangedProductType(ConfigEvent $event)
{
    // Get the UID that was matched in the config path
    $uid = $event->tokenMatches[0];

    // Does this product type exist?
    $id = Db::idByUid('{{%plugin_producttypes}}', $uid);
    $isNew = empty($id);

    // Insert or update its row, accordingly:
    if ($isNew) {
        Db::insert('{{%plugin_producttypes}}', [
            'name' => $event->newValue['name'],
            // ...
            'uid' => $uid,
        ]);
    } else {
        Db::update('{{%plugin_producttypes}}', [
            'name' => $event->newValue['name'],
            // ...
        ], ['id' => $id]);
    }

    // Fire an 'afterSaveProductType' event?
    if ($this->hasEventHandlers('afterSaveProductType')) {
        // Load the product type so we can emit the event with a fully-hydrated model:
        $productType = $this->getProductTypeByUid($uid);

        $this->trigger('afterSaveProductType', new ProductTypeEvent([
            'productType' => $productType,
            'isNew' => $isNew,
        ]));
    }
}

public function handleDeletedProductType(ConfigEvent $event)
{
    // Get the UID that was matched in the config path:
    $uid = $event->tokenMatches[0];

    // Look up the product type by its UID:
    $productType = $this->getProductTypeByUid($uid);

    // If that came back empty, we’re done—must have already been deleted!
    if (!$productType) {
        return;
    }

    // Fire a 'beforeApplyProductTypeDelete' event:
    if ($this->hasEventHandlers('beforeApplyProductTypeDelete')) {
        $this->trigger('beforeApplyProductTypeDelete', new ProductTypeEvent([
            'productType' => $productType,
        ]));
    }

    // Delete its row:
    Db::delete('{{%plugin_producttypes}}', ['id' => $productType->id]);

    // Fire an 'afterDeleteProductType' event?
    if ($this->hasEventHandlers('afterDeleteProductType')) {
        $this->trigger('afterDeleteProductType', new ProductTypeEvent([
            'productType' => $productType,
        ]));
    }
}
```

We are able to implement this with just two methods, because the process for creating new product types and updating existing ones is almost identical—the only difference being that we explicitly set the `uid` column when creating new records. This is an essential part of how project config tracks records across environments, and it’s discussed more in the [IDs and UIDs](#ids-and-uids) section!

At this point, if product types were added or removed from project config _manually_ (say, by creating the corresponding YAML files in your `config/project/` directory, then running `php craft project-config/apply`), those changes would be synchronized with the database, and any `afterSaveProductType`, `beforeApplyProductTypeDelete`, and `afterDeleteProductType` event listeners would be triggered.

If you’d like to test what we’ve implemented so far, you can set project config data via the command line:

```bash
php craft project-config/set myPlugin.productTypes.689fcbe5-9433-4fb0-bc88-d89fdd9bb2df.name "Widgets"
```

We don’t generally recommend this as a means of manipulating project config, but it _is_ a great way to test changes in an isolated way.

#### Component Dependencies

If your component depends on other components in the system (whether or not your plugin owns them), you can ensure those components’ changes are applied _first_ by calling [ProjectConfig::processConfigChanges()](craft5:craft\services\ProjectConfig::processConfigChanges()) (or one of the [ProjectConfig](craft5:craft\helpers\ProjectConfig) helper’s shortcut methods) within your handler:

```php
Craft::$app->getProjectConfig()->processConfigChanges('productTypeGroups');
```

To illustrate this, suppose a plugin had configurable alerts for user activity. If someone created a new user group _and_ set up a notification rule in the plugin targeting that group, Craft might come to an impasse when applying those changes in another environment—suddenly, an alert references a user group that doesn’t exist yet! Project config doesn’t track when each change was made, nor what its dependencies are—so it’s your responsibility to fill in the gaps.

Keep in mind that circular dependencies can cause project config to enter an infinite loop. You may always require Craft changes are processed before your plugin’s changes, but two of your own components cannot declare one another as dependencies.

::: tip
While components can be connected in the database via their IDs, references in project config must be tracked using [UIDs](#ids-and-uids).
:::

### Step 3: Push Config Changes

Now that we have our handlers set up, it’s time to update our service methods so that they operate directly on the project config store, rather than the database. Items in the project config can be added or updated using <craft5:craft\services\ProjectConfig::set()>, and removed using [remove()](craft5:craft\services\ProjectConfig::remove()). _The keys you use when setting project config data must match your handlers from [step 1](#step-1-listen-for-config-changes), or they will not trigger, and you will be left with an inconsistent database state._

::: tip
`ProjectConfig::set()` will sort all associative arrays by their keys, recursively. If you are storing an associative array where the order of the items is important (e.g. editable table data), then you must run the array through <craft5:craft\helpers\ProjectConfig::packAssociativeArray()> before passing it to `ProjectConfig::set()`.
:::

```php{22-27,39-41}
use Craft;
use craft\helpers\Db;
use craft\helpers\StringHelper;
use craft\commerce\models\ProductType;

public function saveProductType(ProductType $productType)
{
    $isNew = empty($productType->id);

    // Ensure the product type has a UID:
    if ($isNew) {
        $productType->uid = StringHelper::UUID();
    } else if (!$productType->uid) {
        $productType->uid = Db::uidById('{{%plugin_producttypes}}', $productType->id);
    }

    // Make sure it validates:
    if (!$productType->validate()) {
        return false;
    }

    // Save it to the project config:
    $path = "myPlugin.productTypes.{$productType->uid}";

    Craft::$app->getProjectConfig()->set($path, [
        'name' => $productType->name,
        // ...
    ]);

    // Now set the ID on the product type in case the caller expects it to exist after being saved:
    if ($isNew) {
        $productType->id = Db::idByUid('{{%plugin_producttypes}}', $productType->uid);
    }

    return true;
}

public function deleteProductType(ProductType $productType)
{
    $path = "myPlugin.productTypes.{$productType->uid}";

    Craft::$app->getProjectConfig()->remove($path);
}
```

::: tip
Plugins can be made extensible themselves by adopting an [interface-oriented](services.md#interface-oriented-methods) control flow, as opposed to the [class-oriented](services.md#class-oriented-methods) control flow demonstrated above.

This may involve adding your own [events](events.md), or defining a class `interface` that other developers can adopt. [Gateways](/commerce/5.x/system/gateways.md) are an example of this, in Commerce.
:::

### IDs and UIDs

If your component references other records or built-in features (like sites, sections, entry types, etc.), those relationships must be stored in project config as UIDs instead of IDs. Project config makes extensive use of UIDs as a means of stabilizing relationships when moving between environments. In the above methods, <craft5:craft\helpers\Db::idByUid()> is used to translate between identifiers that are unique to a database or environment (IDs) and universally unique identifiers (UIDs). Suppose our product type definition included a “site” setting—we would track that relationships with foreign keys in the database, but with UIDs in project config:

::: code
```php Updating Config
use craft\helpers\Db;

$siteUid = Db::uidById('{{%sites}}', $productType->siteId);

// ...

Craft::$app->getProjectConfig()->set($path, [
    'name' => $productType->name,
    'site' => $siteUid,
    // ...
]);
```
```php Updating DB
// (Some context omitted!)

$siteId = Db::idByUid('{{%sites}}', $event->newValue['site']);

Db::update('{{%plugin_producttypes}}', [
    'name' => $event->newValue['name'],
    'siteId' => $siteId,
    // ...
], ['id' => $id]);
```
:::

::: warning
When [creating new records](#step-2-handle-config-changes) in response to project config changes, you **must** set the UID, and that value **must** come from the project config map that is being applied. In the examples so far, the UID is part of the project config “path” that our product type model definition lives within.
:::

## Migrations

You can add, update, and remove items from project config in a [migration](migrations.md). However, because migrations are run in _every_ environment, those changes may have already been made to project config in a different environment.

Consider this scenario:

1. Your plugin is updated in a development environment, which includes a new migration that makes a change to the project config.
1. The updated `composer.lock` and project config YAML files are committed to git.
1. The commit is pulled into the production environment, where Craft must now run the new plugin migration _and_ apply the changes in the project config YAML files.

When new migrations _and_ project config YAML changes are both pending, Craft runs migrations first, then applies project config changes. If your plugin migration were to set the same project config values _again_ on the secondary environment, those changes will be combined with the app’s current state (reflected by the database, not the YAML files) and written over the YAML files on disk, losing any pending changes. When Craft later checks for pending project config changes, it will not see any differences between its internal state and the clobbered YAML files.

### Schema Version

To avoid this, check your plugin’s **schema version** _in the YAML file_ before making project config changes from a migration. You can do this by passing `true` as the second argument when calling [ProjectConfig::get()](craft5:craft\services\ProjectConfig::get()):

```php
public function safeUp()
{
    // Don’t make the same config changes twice:
    $schemaVersion = Craft::$app->getProjectConfig()
        ->get('plugins.myPlugin.schemaVersion', true);

    // It’s OK to hard-code a schema version, because they’re always tied to migrations:
    if (version_compare($schemaVersion, '1.2.3', '<')) {
        // Project config changes made in this block will only be run once,
        // wherever the plugin is updated...
    }
}
```

Any time you make this sort of change, your plugin class’s [`schemaVersion` property](migrations.md) must also updated.

::: warning
Craft never forces project config changes to be applied. Code defensively, and make sure your plugin works normally _without_ relying on project config YAML changes.
:::

## Rebuilding Project Config Data

If your plugin is storing data in both the project config (i.e. global plugin settings) and elsewhere in the database (i.e. product types), you should listen to <craft5:craft\services\ProjectConfig::EVENT_REBUILD> to aid Craft in rebuilding the project config based on database-stored data, when the `php craft project-config/rebuild` command is run.

```php
use craft\events\RebuildConfigEvent;
use craft\services\ProjectConfig;
use yii\base\Event;

Event::on(
    ProjectConfig::class,
    ProjectConfig::EVENT_REBUILD,
    function(RebuildConfigEvent $e) {
        // Add plugin’s project config data...
        $productTypes = MyPlugin::getInstance()->getProductTypes()->getAllProductTypes();

        $config = [];

        foreach ($productTypes as $productType) {
            $config[$productType->uid] = $productType->getConfig();
        }

        $e->config['myPlugin']['productTypes'] = $config;
    }
);
```

## Validating Models

Craft treats project config as the authority on system state, so config must be validated _before_ committing it to the store. Beyond some basic organizational features (like when a folder is created instead of a file), the project config map does not have a schema, and makes no attempt to validate the key-value pairs set on it.

Similarly, project config handlers can (and should) only care about how to bring the database’s state into agreement with that map. Unless your plugin emits [events](events.md) when a savable component is updated, you may not even need to populate a model!

Looking back at the examples, notice that we _are_ validating a `ProductType` model [when making changes](#step-3-push-config-changes) to project config, but _not_ [when synchronizing](#step-2-handle-config-changes) project config into the database.

## Secrets and Environmental Differences

One of the benefits of project config is that secrets and other environment-specific settings can be kept out of the database and tracked files. Whenever you capture a setting or component bound for project config, make sure only the raw, un-parsed value is saved.

The best way to manage this is by attaching <craft5:craft\behaviors\EnvAttributeParserBehavior> to a model, and declaring the properties that you wish to be parsed as environment strings:

```php
use craft\base\Model;
use craft\behaviors\EnvAttributeParserBehavior;

class Webhook extends Model
{
    public ?string $targetUrl;
    public ?string $secret;
    public ?string $secretParam;

    protected function defineBehaviors(): array
    {
        return [
            'parser' => [
                'class' => EnvAttributeParserBehavior::class,
                'attributes' => [
                    'targetUrl',
                    'secret',
                ],
            ],
        ];
    }
}
```

The class property will still return the literal configured value when accessed (i.e. `$API_KEY`), so you must evaluate it at the time of use:

```php{7}
$client = \Craft::createGuzzleClient([
    'baseUri' => App::parseEnv($crm->targetUrl),
]);

$response = $client->post('', [
    'body' => [
        $webhook->secretParam => \craft\helpers\App::parseEnv($crm->secret),
        'payload' => [
            // ...
        ],
    ],
]);
```

If you would prefer this to be automatic, consider using a private property and a pair of getter/setter methods:

```php
private ?string $_secret;

public function getSecret(bool $parse = true): ?string
{
     if ($this->_secret) {
        if ($parse) {
            return \craft\helpers\App::parseEnv($this->_secret);
        }

        return $this->_secret;
    }

    return null;
}

public function setSecret(?string $secret): void
{
    $this->_secret = $secret;
}
```

::: tip
Yii helps make these methods transparent, allowing you (and other developers) to use `$webhook->secret` [as though it were a regular property](guide:concept-properties).
:::

Note that we are never memoizing or overwriting the parsed value. In situations where you need to get the raw value, you can call `getSecret(false)`—perhaps most importantly, when building the object that will get serialized into config:

```php{11}
use craft\base\Model;

class Webhook extends Model
{
    // ...

    public function getConfig(): array
    {
        return [
            'targetUrl' => $this->targetUrl,
            'secret' => $this->getSecret(false),
            'secretParam' => $this->secretParam,
        ];
    }
}
```

You would then call the `getConfig()` method on your configurable component just before [pushing it to project config](#step-3-push-config-changes):

```php
$path = "myPlugin.webhooks.{$webhook->uid}";

Craft::$app->getProjectConfig()->set($path, $webhook->getConfig());
```

### Settings UI

Settings that accept an alias or environment variable should use the autosuggest input helper:

```twig
{% from "_includes/forms" import autosuggestField %}

{{ autosuggestField({
    label: 'Secret'|t('my-plugin'),
    instructions: 'Provide a shared secret that will be sent under the `secretParam` key in the request body.'|t('my-plugin'),
    id: 'webhook-secret',
    name: 'secret',
    suggestEnvVars: true,
    value: webhook.secret,
    required: true,
    placeholder: 'https://',
    errors: webhook.getErrors('secret'),
}) }}
```

The `value` passed to the autosuggest input should always be the raw, un-parsed setting. In the getter/setter example above, this means you might need to call `webhook.getSecret(false)` to explicitly bypass parsing.
