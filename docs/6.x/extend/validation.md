# Validation

Laravel’s validation system brings a number of additional options for sanitizing, filtering, and rejecting input.

<!-- more -->

Historically, validation in Craft has been the responsibility of “models.”
Yii technically supported [ad-hoc validation](guide:input-validation#ad-hoc-validation), but its design leaned heavily on rulesets defined by [models](models.md) (or _components_).

::: tip
In all of these examples, the “rules” come directly from Laravel’s [built-in validator types](laravel:validation#available-validation-rules).
:::

## Requests

Laravel convention tends to validate _input_ rather than _objects_.
This distinction is easiest to understand in the context of a controller.
The `Illuminate\Http\Request` object that you access in an action has a number of validation methods that simplify safely working with input:

```php
use Illuminate\Http\Request;

public function save(Request $request)
{
    $eventData = $request->validate([
        'name' => ['required', 'max:64'],
        'value' => ['required', 'integer'],
        'elementId' => ['sometimes', Rule::exists('elements', 'id')],
        'data' => ['array'],
    ]);

    // Save the event or perform additional validation...
}
```

If validation fails, Laravel throws the error and flashes the input (and validation errors) to the users’s session; the action only proceeds when `$eventData` can be safely assigned the validated values.
With this in place, you may not need to populate (or even maintain) a model, before sending the data to the database.

Before a request even reaches a controller, there are two additional validation layers that help guarantee the integrity of incoming data.

### Form Requests

Validation can be performed with a custom [form request](laravel:validation#form-request-validation) class:

```php
use Illuminate\Foundation\Http\FormRequest;

class EventFormRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'max:64'],
            'value' => ['required', 'integer'],
            'elementId' => ['sometimes', Rule::exists('elements', 'id')],
            'data' => ['array'],
        ];
    }
}
```

From a controller, replace the injected `Illuminate\Http\Request` class with your custom form request, and Laravel will automatically call its `authorize()` method (if defined) and validate against its returned `rules()`.
Execution won’t even reach the body of your action if those checks don’t pass!

### Middleware

Middleware can be applied to specific routes to limit access, protect against abuse, tidy up the incoming data, or post-process responses.
This example would be placed in front of specific routes that require a `share` token param:

```php
class HandleShareRequest
{
    public function handle(Request $request, Closure $next): Response
    {
        $shareToken = $request->string('share');

        if (! $shareToken) {
            return $next($request);
        }

        $validator = new SharingTokenRule(minAge: 'P1W');

        abort_unless($validator->validate($shareToken), t('The provided sharing token is not valid.', category: 'activity'));

        return $next($request);
    }
}
```

By using middleware, you can avoid duplicating validation rules across multiple form requests or actions.
Another way to abstract this would be via a [ruleset](#rulesets).

::: tip
Craft’s internal tokenization system is [implemented as middleware](repo:craftcms/cms/blob/6.x/src/Http/Middleware/HandleTokenRequest.php)!
:::

## Components

Components still exist and share many of the same features, but you have new options for defining rules.
The most familiar will be `getRules()`, which replaces `defineRules()`:

```php
use CraftCms\Cms\Component\Component;

class Chart extends Component
{
    #[\Override]
    public function getRules(): array
    {
        return [
            // ...
        ];
    }
}
```

Components implement the `CraftCms\Cms\Validation\Contracts\Validatable` interface and use the `CraftCms\Cms\Validation\Concerns\Validates` trait.
Together, these form a local validation API that incorporates aspects of Yii “models,” [form requests](#form-requests), and Laravel’s ad-hoc validation:

| Method/Property | Description |
| --- | --- |
| `getRules()` | Returns an array of validation rules, keyed by attribute. |
| `errors()` | Get a `Illuminate\Support\MessageBag` for existing errors. Populated after validation, or from old errors flashed to the session. |
| `getFirstErrors()` | Return when generating summaries of validation issues. |
| `getMessages()` | [Customize error messages](laravel:validation#customizing-the-error-messages) for each combination of attribute and rule. |
| `attributeLabels()` | Provide [explicit attribute labels](laravel:validation#customizing-the-validation-attributes) for validation messages. |
| `addModelErrors()` | Add another `Validatable` object’s errors to this one, using a prefix. Useful when validating nested resources. |
| `validationData()` | Customize the data that is validated. Defaults to all public properties. |
| `prepareForValidation()` |  |
| `validate()` | Begin validating the object. Returns `true` when valid, `false` when there are errors, and throws an exception if the `$throw` argument is passed. |
| `passedValidation()` | Called after validation _succeeds_. |
| `failedValidation()` | Called after validation _fails_, but before throwing an exception. |
| `afterValidate()` | Called after validation, regardless of outcome. |

## Rulesets

If you have multiple objects that follow similar validation rules (but do not share a parent class), you can bundle them in a [Ruleset](repo:craftcms/laravel-ruleset-validation) and attach them with an attribute or the `ruleset()` method:

```php{5,10}
use CraftCms\Cms\Component\Component;
use CraftCms\RulesetValidation\Attributes\Ruleset;
use MyOrg\Activity\Reporting\Rulesets\ChartRules;

#[Ruleset(ChartRules::class)]
class Chart extends Component
{
    public function ruleset(): string
    {
        return ChartRules::class;
    }
}
```

Rulesets are similar in design to [form requests](#form-requests), but can be applied to any class that implements `CraftCms\RulesetValidation\Contracts\ValidatesWithRuleset` (including `Component`s, via the `Validatable` interface):

::: code
```php{6} Event Class
namespace MyOrg\Activity\Data;

use CraftCms\Cms\Validation\Concerns\Validates;
use CraftCms\Cms\Validation\Contracts\Validatable;

#[Ruleset(EventRules::class)]
class Event implements Validatable
{
    use Validates;

    public string $name;
}
```
```php Rules Class
use CraftCms\Cms\Validation\Ruleset;

class EventRules extends Ruleset
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:64'],
        ];
    }
}
```
:::

Note that we’ve added the `Validates` trait to satisfy requirements from `Validatable`.
You are free to reimplement any of those methods for more control over the validation flow.

::: tip
When you extend `CraftCms\Cms\Validation\Ruleset`, Craft automatically emits an [event](#events) as rules are resolved.
:::

By default, [components](#components) use the `CraftCms\Cms\Validation\ComponentRules` ruleset, which forwards many internal calls to the corresponding `Validatable` methods so that the validation “subject” can be responsible for its own validation lifecycle.

### Scenarios

The ruleset package also reimplements Yii’s _scenarios_ concept.
Scenarios are just strings, but it will often make sense to centralize them on your rulesets as constants (as we do with `CraftCms\Cms\Element\Validation\ElementRules`) or in an `enum`.

See the [package documentation](repo:craftcms/laravel-ruleset-validation) for more information on how to apply scenarios.

## Events

Rulesets emit a `CraftCms\Cms\Element\Validation\Events\ValidationRulesResolving` event.
You may directly manipulate the event’s `rules` property, or call its `addRule()` or `addRules()` methods.
Check the `component` to see if it’s an object you care about:

```php
use CraftCms\Cms\Element\Validation\Events\ValidationRulesResolving;

Event::listen(function (ValidationRulesResolving $event) {
    if (! $event->component instanceof \CraftCms\Cms\Entry\Elements\Entry) {
        return;
    }

    // Limit slugs to 50 characters:
    $event->addRule('slug', 'max:50');
});
```
