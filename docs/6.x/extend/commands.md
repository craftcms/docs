# Commands

Console controllers are now just [commands](laravel:artisan).
API changes aside, the main difference you’ll notice is that there is no inherent organization to commands as there was in Yii: each command is its own class (or closure), and are only grouped by their signature.

For example, the built-in `project-config:apply` and `project-config:diff` commands are separate classes, sharing the `project-config:` prefix.
You are free to structure your commands however makes sense, but please avoid generic names like `run` or `send`, and consider using a prefix like `my-plugin:` so users can locate related functionality that your plugin provides.

::: warning
`command` is no longer a valid argument name.
:::

There are two primary ways to make commands: [classes](#command-class) and [closures](#command-closure).

## Command Class

Commands should extend `Illuminate\Console\Command`.

```php
namespace MyOrg\MyPlugin\Reporting\Commands;

use MyOrg\MyPlugin\Reporting\Manager;
use CraftCms\Cms\Console\CraftCommand;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('report:generate {templateId}')]
#[Description('Start building a report')]
class GenerateReport extends Command
{
    use CraftCommand;

    // Alternatively, the signature can be set via a property:
    // protected $signature = 'report:generate {teamId}';

    public function handle(Manager $manager, int $templateId): void
    {
        $template = $manager->getTemplateById($templateId);

        $this->info("Queueing report: {$template->name}!");

        // ...
    }
}
```

Your command’s [arguments and options](artisan#defining-input-expectations) are determined by its _signature_.
Laravel takes care of matching command arguments with those of the `handle()` method; other arguments are resolved with dependency injection.
In this example, `$manager` isn’t an argument that we’d expect a user to supply—it’s just a [service](services.md) we want access to in that scope.

Register command classes with your plugin’s `$commands` property:

```php
public array $commands = [
    MyOrg\MyPlugin\Reporting\Commands\GenerateReport::class,
];
```

## Command Closure

You can also create simple commands directly in your plugin’s `bootPlugin()` method, using a [laravel:artisan#closure-commands]:

```php
Artisan::command('report:generate {templateId}', function (Manager $manager, int $templateId) {
    $template = $manager->getTemplateById($templateId);

    $this->info("Queueing report: {$template->name}!");

    // ...
});
```

## Formatting + Output

Laravel’s command class has a number of [output helper methods](laravel:artisan#writing-output).
Styling is handled by Symfony’s [XML-like tags](https://symfony.com/doc/2.x/console/coloring.html).
