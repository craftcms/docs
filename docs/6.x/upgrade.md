---
description: Craft 6.x is our biggest technical leap and easiest upgrade, yet. Let’s get started!
sidebarDepth: 3
---

# Upgrading to Craft 6.x

The smoothest way to upgrade to Craft 6 is to make sure your live and local environments are already running the [latest version of Craft 5](/5.x/updating.md).
We recommend approaching the upgrade in three phases: [preparation](#preparing-for-the-upgrade), a [local upgrade](#performing-the-upgrade), and [triage](#deprecations).

<!-- more -->

## Preparing for the Upgrade

### Requirements

There’s a few things that you need to take care of _before_ the upgrade (even with the [adapter](#adapter)):

- Update Craft to the latest 5.x release, and all plugins to their latest compatible versions (see the note below about the state of plugins during alpha). You cannot upgrade directly to Craft 6.x from Craft 4.x or earlier.
- Upgrade PHP on your host to 8.5
- Resolve any outstanding deprecation notices
- Flatten any [multi-environment](/5.x/configure.md#multi-environment-configs) config files (arrays with a `*` key and one or more environment names) using environment variables. If you use the [fluent style](/5.x/configure.md#style) for configuration, you are good to go.

### Reminders

The alpha is primarily intended to give [plugin developers](extend/README.md) a chance to make a handful of required compatibility updates.
That said, we were seeing successful upgrades as early as the first developer preview, which we shared at Dot All Lisbon, in October 2025!

If you haven’t already, consider spinning up a fresh Craft 6.x project.
You’ll be able to get a sense for the new project structure without the pressure of immediately

- If you want to customize how Categories, Global Sets, and Tags are migrated, use the [`entrify/*` commands](/5.x/reference/cli.md#entrify) before you begin the upgrade.
- Commit and deploy any final changes to your live environment
    - While project config schema is *mostly* consistent between 5.x and 6.x, we do not recommend attempting to merge changes across versions (i.e. from an a feature branch), especially during the alpha and beta.
- Allow your queue to fully process. Consider running `ddev craft queue/run` if there are a lot of pending jobs and you can’t keep a browser open.
    ::: warning
    During the upgrade, your `queue` table is removed and rebuilt. _Any remaining jobs will be lost._
    :::
- Capture a database backup.
- Take note of your configured mail adapter in <Journey path="Settings, Email" />.

Your project is apt to continue working after the update, but it will include the adapter package.
Don’t remove it before reviewing the rest of this guide!

### On Plugins

During the alpha and beta phases, you may need to set `CRAFT_DISABLED_PLUGINS="*"` in `.env` or fully uninstall plugins before starting the upgrade to prevent incompatible ones from loading or running.
They are bootstrapped very early in the app’s lifecycle, and an error can leave your project in a partially-upgraded state.

Not all plugins will be necessary!
Laravel makes it possible to directly configure mailers, loggers, filesystems, and more.

## Performing the Upgrade

1. Install the upgrade tool:

    ```bash
    composer global install craftcms/craft6-revamp
    ```
    
    The tool will examine your project structure and will warn you if it’s unable to safely make changes.
    It runs on any system that runs Craft 5.x.

    ::: tip
    If you can’t install a composer package on your host machine, you can mount your project directory into an ephemeral Docker container and run the commands there:

    ```
    # On the host machine...
    $ docker run --interactive --tty --volume $PWD:/app composer bash

    # ...in the container:
    -> 42dae745a6ab:/app# composer global require craftcms/craft6-revamp
    -> ...
    -> 42dae745a6ab:/app# composer global exec craft6-revamp
    ```
    :::
2. Run `craft6-revamp` in your project’s root directory. The full list of actions our tool will attempt to take is available on its [repository](repo:craftcms/craft6-revamp).
3. Perform any **Next Steps** recommended by the tool. At a minimum, this should include…
    - `ddev restart` to apply the new project settings (DDEV users only);
    - `ddev composer update` to install new dependencies (or `composer update` outside of DDEV);
    - `ddev artisan vendor:publish --tag=craftcms` to publish stubs for Laravel and Craft;

### Run Migrations

There are about ten lightweight migrations to run.
Many handle replacing legacy class names with their new namespaces.
None touch your content, and the number of required queries does not scale with the amount of elements you have.

```
# Use the new `artisan` entrypoint...
ddev artisan craft:up

# ...or the familiar `craft` executable:
ddev php craft up
```

The new DDEV project type means that it will only forward `artisan` commands, but you can still use Craft’s entry point via `php`.

::: tip
If you see a warning about the application being in production, it’s safe to ignore.
Laravel will warn you before applying migrations when `APP_DEBUG` is off.
:::

<aside>
<img src="/icons/warning_red.svg" alt="/icons/warning_red.svg" width="40px" />

If you see a warning about the application being in production, it’s safe to ignore. Laravel will warn you before applying migrations when `APP_DEBUG` is off.

</aside>

### Cleanup

We recommend taking another snapshot of your database and code so that you can revert to this freshly-upgraded state if you want to try different strategies for dealing with [deprecations](#deprecations).


## Deprecations

At this point, you should have a fully-functional Craft application!

The rest of the upgrade can be tackled at your leisure, but you should review the rest of this section to get an idea of how much work is ahead.

### Bootstrapping

During the upgrade, we removed the `bootstrap.php` file that has come with new projects [since Craft 3.7](https://github.com/craftcms/craft/releases/tag/1.1.5).
If you had any customizations to Craft’s initialization process (like how environment variables are loaded), you may need to find equivalent features in Laravel.

Many of the [bootstrap variables](https://craftcms.com/docs/5.x/reference/config/bootstrap.html) you would define here have been removed and will have no effect.
We strongly recommend using the [new default Craft project structure](https://github.com/craftcms/craft/tree/6.x).

If you used the upgrade tool, it removed `vlucas/phpdotenv` from your `composer.json`, but it will still be installed as a transitive dependency of Laravel.
You do not need to do anything to continue using a `.env` file.

### Configuration

### General Config

As mentioned in the preparation step, multi-environment configuration is no longer supported.

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

### Database

`db.php` is no longer used.
Environment variables beginning with `CRAFT_DB_*` in `.env` have been renamed to agree with [Laravel convention](laravel:database#configuration) and the new DDEV project type behavior.

Advanced configuration (historically done via `app.php`) can be accomplished with Laravel’s `config/database.php`.

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
This means any custom configurations in `config/craft/htmlpurifier/*` will need to be translated into [the new format](https://symfony.com/doc/current/html_sanitizer.html#configuration), and registered via a service provider (or contributed by plugin).

::: tip
If you never modified Craft’s `Default.json` config, you can just remove it.
The new defaults are intended to be equivalent.
:::

The `purify` Twig filter has also been replaced with the appropriately-named `sanitize` filter.
Like the old one, this filter accepts a custom configuration handle.


#### Markdown

We also replaced the Markdown engine that came with Yii (`cebe/markdown`) with [CommonMark](https://commonmark.thephpleague.com/).
All the same filters and flavors remain available, but customizations to the parser may not work.

If you were parsing Markdown anywhere in PHP (like an [Element API](plugin:element-api) transformer), you should use the new facade:

```php
use CraftCms\Cms\Support\Facades\Markdown;

Markdown::parse($text);
Markdown::parseParagraph($line);
```

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

The `{uid}` placeholder token now matches UUIDs of any version.
This only means that the rule may be *more* permissive; your routes will continue to work as expected.

## Extensions

Plugin developers should continue exploring the [extension upgrade guide](extend/README.md).

If you maintain a _module_, your application just got a whole lot more powerful.
Craft 6.x projects are just Laravel applications, meaning you are free to use them just as you would if Craft wasn’t part of the picture… except you get access to its huge library of APIs for working with content, users, templates, GraphQL, and more!

You can follow along with the plugin development guide or jump right in to the [Laravel documentation](laravel:lifecycle) to learn about how modules can unfurl into your project’s main “app” space.

## Tools + Resources

Everything we’ve talked about, so far.

<ul class="theme-default-content-override w-full px-0 sm:flex sm:-mx-2 flex-wrap">
    <li class="block mb-4 sm:w-1/2 sm:px-2 sm:py-0">
        <IconLink
            title="craft6-revamp"
            subtitle="The fastest way to upgrade."
            link="https://github.com/craftcms/craft6-revamp"
            icon="/docs/icons/icon-generic-link.svg"
            iconSize="large" />
    </li>
    <li class="block mb-4 sm:w-1/2 sm:px-2 sm:py-0">
        <IconLink
            title="Laravel Documentation"
            subtitle="Authoritative docs for the new framework."
            link="https://laravel.com/docs"
            icon="/docs/icons/icon-book.svg"
            iconSize="large" />
    </li>
    <li class="block mb-4 sm:w-1/2 sm:px-2 sm:py-0">
        <IconLink
            title="Changelog"
            subtitle="Scaffold system components."
            link="https://github.com/craftcms/cms/blob/6.x/CHANGELOG.md"
            icon="/docs/icons/icon-generic-link.svg"
            iconSize="large" />
    </li>
    <li class="block mb-4 sm:w-1/2 sm:px-2 sm:py-0">
        <IconLink
            title="Adapter"
            subtitle="Our compatibility layer."
            link="https://github.com/craftcms/yii2-adapter"
            icon="/docs/icons/icon-generic-link.svg"
            iconSize="large" />
    </li>
</ul>
