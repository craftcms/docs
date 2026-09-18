---
sidebarDepth: 2
---

# The Adapter + Compatibility

To make existing projects compatible with the new Laravel architecture, our adapter package is installed during the upgrade.
This page covers a few groups of features that you’ll need to review before ejecting the adapter.

<!-- more -->

The adapter is a sophisticated translation layer that exposes legacy APIs, events, and configuration schemes to your project, proxying them to the new APIs.
When using legacy features (like many services via `craft.app.*`), the adapter logs deprecation warnings to the control panel.
You can think of the adapter as our way of reducing (or eliminating) the burden of an upgrade for 

New projects will not see Yii as a dependency, unless they explicitly include the adapter (or an installed plugin requires it).
When present, a “shadow” Yii application is bootstrapped alongside Laravel, sharing enough configuration and state to make legacy APIs behave consistently.

This begins with `CraftCms\Yii2Adapter\Yii2ServiceProvider`, which is automatically registered and booted by Laravel.
As a service provider, it is given an opportunity early in the application’s lifecycle to…

- …re-bind compatible classes;
- …define aliases for relocated classes;
- …add support for legacy configuration styles;
- …define [constants](#constants) and other configuration defaults;
- …register template roots;
- …expose the `Craft` singleton;
- …add handlers for [action routes](#forms) and other catch-all routes;
- …translate legacy filesystems;
- …proxy and emit events;

Most of these tasks are only directly relevant to plugin developers (who have [their own upgrade pathway](extend/README.md)), but any project that uses Craft’s [Twig environment](#twig-features), interacts with [services](#services) like the `request` or `session`, or reaches into internals via `craft.app` will be exposed to some API changes.
This page covers everything you’ll need to do to modernize a project and remove the adapter package.

::: tip
Keep in mind that the adapter is an official, fully-supported compatibility tool, and we expect that many projects (and plugins) will use it throughout the entire 6.x release cycle—or even longer!
Its primary function is to let _us_ (the maintainers of Craft) iterate on architectural concerns while keeping the upgrade path as simple as possible.

Everything on this page is optional, and can be addressed over time, in as many discrete chunks as your time and budget require.
:::

## Configuration

Multi-environment configuration is only supported with the adapter.
Flatten any [multi-environment](/5.x/configure.md#multi-environment-configs) config files (arrays with a `*` key and one or more environment or host names) using environment variables.
If you use the [fluent style](/5.x/configure.md#style) for configuration, you are good to go.

Config files that use “app-type” prefixes (i.e. `general.web.php`) will also need to be flattened into a single config file.
HTTP and console applications are even more similar in Laravel, so scoping configuration to one or the other is rarely necessary.

### Constants

These constants (sometimes called [bootstrap variables](/5.x/reference/config/bootstrap.md)) are only supported with the adapter:

| Constant | Replacement |
| --- | --- |
| `CRAFT_CONFIG_PATH` | `config_path('craft')` |
| `CRAFT_TRANSLATIONS_PATH` | `lang_path()` |
| `CRAFT_STORAGE_PATH` | `storage_path()` |
| `CRAFT_DOTENV_PATH` | `app()->environmentPath()` |
| `CRAFT_VENDOR_PATH` | `base_path('vendor')` |
| `CRAFT_LICENSE_KEY_PATH` | Technically still supported, defaults to `config_path('craft/license.key')` |

::: warning
If you had set any of these in your `boostrap.php` file, they were removed during the upgrade.
We strongly recommend using the new directory structure so that your project remains compatible with Laravel.
:::

## Services

Craft’s entire architecture has been radically flattened, in the move to Laravel.
“Services” that you’d ordinarily access via the main application instance (`craft.app` or `Craft::$app`) are now directly accessible via [facades](laravel:facades) or helper functions:

| Service | Facade or Helper |
| --- | --- |
| `cache` | `Cache` facade |
| `db`, `db2` | `DB` facade; use `DB::connection('db2')` to specifically select the default side-channel connection, then chain normal connection methods. |
| `deprecator` | `Deprecator` facade |
| `elements` | `Elements` facade |
| `entries` | `Entries`, `EntryTypes`, and `Sections` facades |
| `fields` | `Fields` facade |
| `formatter` | Via `I18N` facade: `I18N::getFormatter()` |
| `fs` | `Filesystems` facade |
| `gc` | Access via `app(\CraftCms\Cms\GarbageCollection\GarbageCollection::class)` |
| `globals` | Globals were removed in Craft 6.x, in favor of single sections, which you can access via the `Sections` facade |
| `i18n` and `locale` | `I18N` facade |
| `log` | `Log` facade |
| `mailer` | `Mail` facade |
| `mutex` | Laravel uses the default cache connection (via the `Cache` facade) for locks |
| `path` | `Path` facade |
| `plugins` | `Plugins` facade |
| `request` | Laravel `Request` facade, plus features from `CraftCms\Cms\Http\Mixins\RequestMixin` |
| `response` | Laravel `Response` facade |
| `security` | `Security` facade |
| `session` | Laravel `Session` facade, plus features from `CraftCms\Cms\Http\Mixins\SessionMixin` |
| `sites` | `Sites` facade |
| `users` | `Users` facade |
| `userGroups` | `UserGroups` facade |
| `view` | Generally not needed; see the [templating](#templating) section, below. |

The new facade classes are all exposed as global Twig variables with the same name.

::: warning
This is an abbreviated list of APIs that were available via `craft.app`!
Some low-level services (or _components_, more accurately) were owned by Yii, and don’t have a direct equivalent.
Service classes have been marked with `@deprecated` tags and include guidance for where the functionality is located, within the `CraftCms` namespace.

While many classes have remained compatible, the facades (and the classes they delegate to) won’t be drop-in replacements for _every_ use case.
:::

When working in PHP, Laravel encourages use of [dependency injection](laravel:container#automatic-injection) to resolve these kinds of singleton service classes.
The most common application for this is likely in your main service provider, where you’d interact with things like Craft’s [registries](extend/registries.md).

## Templating

Templates now live in the `resources/views/` directory.
If your `templates/` directory was not relocated by the upgrade tool, you will need to move it before ejecting the adapter, or [add the old location](extend/templates.md) via an application service provider.

### Globals

References to `craft.app` (or `Craft::$app`, in a module) must be replaced with their equivalent facades or helpers.
See the [services](#services) section above for specifics.

The global `craft` variable now attempts to forward unknown method calls to…

- …`CraftCms\Cms\Cms` (similar to the `Craft` static class in 5.x and earlier);
- …Laravel’s global `Illuminate\Foundation\Application` instance (same as you would get via the `app()` helper);
- …registered [macros](laravel:macros);

This means that a ton of new framework features are available in every Twig context.
It is possible that generically-named methods supplied by plugins (via legacy behaviors) will now resolve on the core Laravel application instance; consult the plugin’s upgrade instructions if you encounter unexpected errors.

The `view` variable was primarily used to register HTML fragments (i.e: `view.registerJs()`, `view.registerCssFile()`, etc…), or render templates:

- Use the `HtmlStack` facade to buffer scripts, styles, and other markup.
- Use `renderObjectTemplate()`, or Twig’s `include()` function to compile and render a template. The new `blade()` function provides interoperability, in case you want to experiment with or incrementally adopt [Blade templates](laravel:blade).

### Element Queries

Built-in element types now have their own Twig functions, which behave identically to the `craft.entries()` query factories.
You may pass in a map of query properties to initialize a query:

```twig
{% set stations = entries({ section: 'stations' }).all() %}
```

Chaining remains supported:

```twig
{% set stationSchedule = entries()
    .section('events')
    .relatedTo({
        targetElement: station,
    })
    .dateStart("> #{now|atom}")
    .orderBy('dateStart ASC')
    .all() %}
```

### Twig Features

- `purify` &rarr; `sanitize`

## Forms

Legacy “action paths” are still registered by Craft to avoid breaking changes, even without the adapter.
Plugins can also continue registering action routes for backwards-compatibility, but 

## Ejecting the Adapter

When you have resolved all deprecation warnings and are ready to test your project without the adapter, remove it with Composer:

```bash
ddev composer remove craftcms/yii2-adapter
```

Additional errors may present themselves, with the compatibility layer removed—especially if your project directly accessed Yii features.
`yiisoft/yii2` is only a dependency of the adapter, so _all_ classes 

::: warning
Note that during the 6.x alpha and beta, your editor may still be able to discover classes in the old `craftcms\` namespace.
While in active development, we elected to version Craft and the adapter together, and do a “subtree split” into the adapter package.
:::


---

### Configuration

#### General Config

A few settings have been removed, renamed, or relocated:

| Setting | Notes |
| --- | --- |
| `timezone` | Use the `timezone` key in the main Laravel config file (`config/app.php`). Project config supersedes this. |
| `defaultCookieDomain` | Use the `domain` key in Laravel’s [session](laravel:session#configuration) config file (`config/session.php`). |
| `blowfishHashCost` | Use `blowfish.bcrypt.rounds` in Laravel’s [hashing](laravel:hashing#main-content) config file (`config/hashing.php`). |
| `phpSessionName` | Use `cookie` in Laravel’s `config/session.php` |
| `systemMessageTemplate` | Site-specific templates are configured via Settings &rarr; Email |
| `elevatedSessionDuration` | Use [`password_timeout`](laravel:authentication#password-confirmation) in Laravel’s authentication config file (`config/auth.php`). The default is now 10800 seconds (three hours). |

You can selectively publish Laravel’s default config files from the console:

```bash
ddev artisan config:publish [auth|session|hashing|mail|...]
```

Additionally, these settings’ default values have changed:

| Setting | Previous | New | Notes |
| --- | --- | --- | --- |
| `loginPath` | `'login'` | `false` |  The front-end login form is now hidden, by default. |

#### Database

`db.php` is no longer used.
Environment variables beginning with `CRAFT_DB_*` in `.env` have been renamed to agree with [Laravel convention](laravel:database#configuration) and the new DDEV project type behavior.

Advanced database configuration (historically handled via `app.php`) can be accomplished with Laravel’s `config/database.php`.

### Control Panel

Some sections in the control panel have been replaced by direct Laravel configuration.

#### Email

Configure Laravel’s [mailer](laravel:mail) using `config/mail.php`.

- Translate your old mail adapter’s settings into the appropriate config array, under `mailers`.
- Set the `default` near the top of `mail.php` to your chosen driver. The default configuration works with DDEV’s Mailpit service.
- Optional: Remove any drivers you don’t want/need.
- Optional: Configure additional `failover` drivers.
- Test from the control panel (<Journey path="Settings, Email, Send a test email" />) or console (`ddev artisan craft:mailer:test`).

::: tip
Password reset and email validation notifications are now sent via the queue.
:::

#### Branding

Two new general config settings are available, which replace customizations you would make via the control panel in <Journey path="Settings, General" />.
`cpIconUrl` and `cpLogoUrl` can be set to any string that resolves to a publicly-accessible url:

- `/logo.png`
- `asset('logo.png')`
- `env('LOGO_URL')`
- `https://...`
- Aliases (e.g: `@brand/logo.png`)

::: tip
Control panel branding is now available to all editions (Solo, Team, and Pro)!
:::

### Templates

Your templates have been moved to `resources/views/`, per Laravel convention.

#### Twig

All Twig features remain intact, but accessing Craft APIs via `craft.app` has been deprecated.
Common use cases for this were…

- **Request data** (`craft.app.request.getQueryParam()`) — Use `Request.get('paramName')` to retrieve data from a `GET` query string or `POST` body.
- **Session data** (`craft.app.session`) — See the [flashes](#flashes) section, below.
- **Other services** (`craft.app.entries`, `craft.app.fields`, `craft.app.sites`, …) — All of Craft’s facades are exposed to Twig, using their standard names (`Entries`, `Fields`, `Sites`, …). These proxy classes that are close equivalents to the services you’re familiar with in Craft. For a list of facades, see `extra.laravel.aliases` in `vendor/craftcms/cms/composer.json`.

These filters have been deprecated:

- `filterByValue` &rarr; Use the `where` filter for closures, or `collect(arr).where('someKey', 'exactValue')`
- `firstWhere` &rarr; Going forward, only closures will be supported (i.e: `guesses|firstWhere(guess => guess.qty == raffle.realQty)`). This had limited utility, because the only comparison was strict (`===`) or lax (`==`) equality; closures can use any operator, call methods, etc.
- `index` &rarr; Use `collect(arr).keyBy('myKey')`.
- `purify` &rarr; Replace with new `sanitize` filter. See the section on our [HTMLPurifier replacement](#html-purification).
- `ucfirst` &rarr; Replace with Twig’s built-in `capitalize` filter.

#### Flashes

The way you access flashes and restore submitted data has changed.
A global `errors` variable will be populated when a model fails validation.

Access individual field errors from that object using `errors.has('fieldName')` and `errors.get('fieldName')`.
This snippet is equivalent to the macro in our [entry form guide](kb:entry-form) and can be used similarly to the [forms documentation](/5.x/development/forms.md#models-and-validation) on models and validation:

```twig
{% macro errorList(errors, field) %}
    {% if errors.has(field) ?? false %}
        <ul>
            {% for error in errors.get(field) %}
                <li class="error">{{ error }}</li>
            {% endfor %}
        </ul>
    {% endif %}
{% endmacro %}
```

Submitted values are flashed back to the session and can be retrieved using the `old('fieldName')` Twig helper, after redirection.

#### HTML Purification

HTMLPurifier has been replaced by Symfony’s [HtmlSanitizer](https://symfony.com/doc/current/html_sanitizer.html).
This means any custom configurations in `config/craft/htmlpurifier/*` will need to be translated into the new format.

::: tip
If you never modified Craft’s `Default.json` config that came with the starter project, you can just remove it.
The new defaults are intended to be equivalent.
:::

You have two options for configuration, both of which use a [standard config schema](https://symfony.com/doc/current/html_sanitizer.html#configuration):

1. **Config file:** Create a new PHP file in `config/craft/sanitiziers/`, and return an array:
    ```php
    <?php

    return [
        'allow_elements' => [
            'a' => ['href'],
        ],
    ];
    ```
1. **Service provider:** In the `boot()` method, instantiate and register a new sanitizer object:
    ```php
    use CraftCms\Cms\Support\HtmlSanitizer\HtmlSanitizerManager;
    use Symfony\Component\HtmlSanitizer\HtmlSanitizer;
    use Symfony\Component\HtmlSanitizer\HtmlSanitizerConfig;

    public function boot(HtmlSanitizerManager $sanitizers): void
    {
        $config = new HtmlSanitizerConfig()
            ->allowElement('a')
            ->allowAttribute('href', ['a']);

        $sanitizers->extend('links-only', new HtmlSanitizer($config));
    }
    ```
    If you do not wish to add the manager as an injected dependency, you can resolve it via the service container or facade:
    ```php
    // Container:
    $sanitizers = app(\CraftCms\Cms\Support\HtmlSanitizer\HtmlSanitizerManager);
    $sanitizers->extend('links-only', new HtmlSanitizer($config));

    // Facade:
    HtmlSanitizers::extend('links-only', new HtmlSanitizer($config));
    ```

Plugins can contribute configurations using the second method.

The `purify` Twig filter has also been replaced with the appropriately-named `sanitize` filter.
Like the old one, this filter accepts a custom configuration handle, like `instructions | sanitize('links-only')`

#### Markdown

We also replaced the Markdown engine that came with Yii (`cebe/markdown`) with [CommonMark](https://commonmark.thephpleague.com/).
All the same filters and flavors remain available, but customizations to the parser may not work.

If you were parsing Markdown anywhere in PHP (like an [Element API](plugin:element-api) transformer), you should use the new facade:

```php
use CraftCms\Cms\Support\Facades\Markdown;

Markdown::parse($text);
Markdown::parseParagraph($line);
```

The `md` Twig filter remains functionally identical.

### Commands

Craft’s `exec` command has been removed.
We recommend using [Laravel’s `tinker` REPL](https://github.com/laravel/tinker) as a replacement for this and Yii’s `shell` command.

If you still find the need to evaluate arbitrary PHP code in a non-interactive setting, you can re-implement it as a [closure command](laravel:artisan#closure-commands) on a project-by-project basis, from a service provider:

```php
public function boot()
{
    Artisan::command('eval {code}', function ($code) {
        $output = '';

        $this->components->task(
            'Evaluating PHP code',
            function () use ($code, &$output) {
                ob_start();
                eval($code);
                $output = ob_get_clean();
            }
        );

        $this->line($output);

        return 0;
    });
}
```

### Routing

The `{uid}` placeholder token now matches UUIDs of any version, meaning rules that use it will be _slightly_ more permissive.
Otherwise, there are no changes to routes defined in the control panel (and stored in project config).

#### Custom Rules

Your existing `config/routes.php` file (having moved to `config/craft/routes.php` during the upgrade) is evaluated by the adapter.
Yii routes can be translated to [Laravel routes](laravel:routing) and relocated to `routes/web.php`:

::: code
```php Yii
# config/craft/routes.php
return [
    // Mapping a route to a template:
    'newsletter' => ['template' => '_forms/newsletter'],

    // Adding a cosmetic alias for a controller action path:
    'subscribe' => 'newsletter/subscribers/add',

    // Route params:
    'profiles/<userUid:{uid}>' => ['template' => '_users/profile'],
];
```
```php Laravel
# routes/web.php
use Illuminate\Support\Facades\Route;

// Render a template:
Route::view('newsletter', '_forms/newsletter');

// Map a controller:
Route::post('subscribe', [\AcmeLabs\Newsletter\Http\Controllers\Subscriber::class, 'create']);

// Use a dynamic path:
Route::view('profiles/{userUid}', '_users/profile')->whereUuid('userUid');
```
:::

If you want to gather some data before rendering a template, this is equivalent to `Route::view()`:

```php
use Illuminate\Http\Request;
use function CraftCms\Cms\pageTemplate;

Route::get('newsletter', function (Request $request) {
    return pageTemplate('_forms/newsletter', [
        'source' => $request->input('campaign_id', 'internal'),
    ]);
});
```

The [templating](extend/templates.md) section of the extension documentation has additional information about `pageTemplate()` and other view helper functions.
