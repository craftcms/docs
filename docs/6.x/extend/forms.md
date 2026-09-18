# Form Builder

Throughout the control panel, Craft constructs forms using a set of new form builder classes.

<!-- more -->

These classes roughly correspond to the legacy Twig includes and macros, but provide an output-agnostic, typed API that connects back-end logic to our new front-end web component library.
They also make it significantly easier to inject plugin-provided fields and context: you no longer need to worry about the resulting DOM structure, HTML identifiers, namespacing and nesting, or how JavaScript is registered and bound.
Your forms’ logic (including the behavior of individual form [controls](#controls)) can now be entirely driven by the back-end, while remaining [responsive](#refreshing) to user input.

## Components

Depending on the component you are developing, you’ll be responsible for different amounts of the form’s structure:

- [Field types](fields.md) — Settings are injected as a [nested form](#nesting-context). The field’s UI in an element form is a [control](#controls).
- [Plugin settings](config.md) — A complete [form](#forms) object.
- Field layout element — A single node is injected into the form; multiple nodes can be contributed to its settings form.
- Novel features — Up to you! Simple forms can be [returned as HTML](#html); dynamic forms can be sent as an [Inertia](#inertia) response; extensible forms can mimic field configuration.

## Structure

Forms bring the power of elements’ field layouts to every part of the control panel, but don’t require an element, or use of the field layout designer.
You can construct a form programmatically, with reliable function and appearance, and never touch a line of HTML.

Our own field layouts implementation is much thinner in Craft 6.x, acting as a configuration and organization layer rather than a rendering layer; each field layout component delegates its output to a node or [control](#controls).

### Forms

Unsurprisingly, the root of a form is a `CraftCms\Cms\Form\Form` object:

```php
$form = Form::make();
```

A form can contain any number of _nodes_.
Nodes are either [fields](#fields), UI elements like headings and separators, or containers like [_groups_ or _tabs_](#grouping) that organize other nodes.

When merging fragments contributed by plugins, we often ask that you return a `CraftCms\Cms\Form\Form` instance, but only end up copying its `nodes()` into the main form using a provided [context](#nesting-context).

::: tip
The following examples contain a lot of [field](#fields)- and [control](#controls)-specific code, which we cover in the corresponding sections.
For now, we’re only concerned with the form object’s capabilities.
:::

Simple forms can be declared all at once:

```php
use CraftCms\Cms\Form\Form;
use CraftCms\Cms\Form\Controls\Text;
use CraftCms\Cms\Form\Nodes\Field;
use CraftCms\Cms\Form\Nodes\Separator;

return Form::make([
    Field::make(t('API Key', category: 'my-plugin'), Text::make('apiKey'))
        ->instructions(t('The access key you generated when creating your account.', category: 'my-plugin'))
        ->required(),
    Separator::make('advanced-settings'),
    // ...
]);
```

The static form factory method `make()` accepts an array of nodes, and returns a form builder instance, which you can use to manipulate the node list like you would build DOM using JavaScript APIs:

```php
$form = Form::make([
    // Initial nodes...
]);

// Try loading buckets
try {
    $bucketSelect = Choice::make('bucket')
        ->options(array_map(
            fn (array $bucket): array => ['value' => $bucket->handle, 'label' => $bucket->name],
            $this->getBuckets(),
        ));
    $form->add(Field::make(t('Bucket', category: 'my-plugin'), $bucketSelect));
} catch (VendorException $e) {
    Log::error(sprintf('Failed to load buckets: %s', $e->getMessage()));

    // Failed! Add a message to the form:
    $callout = Callout::make('bucket-list-error', t('The available credentials were not sufficient to populate a list of bucket options. Please check your credentials and try again.', category: 'my-plugin'))->variant('warning')
    $form->add($callout);
}
```

Forms use Laravel’s `Illuminate\Support\Traits\Conditionable` trait, which allows fluid composition of nodes using `->with()`:

```php
$form->when(
    $this->getBuckets(),
    // Buckets are present/“truthy,” and get passed to the callback:
    fn ($f, $buckets) => $f->add(Field::make(/* ... */)),
    // Empty/“falsey” bucket list:
    fn ($f) => $f->add(Callout::make(/* ... */)),
);
```

::: tip
This kind of dynamic messaging works best when the current context is [refreshable](#refreshing), meaning that the form is re-rendered as data changes rather than in response to errors encountered during a submission.
:::

Multiple nodes can be added at a time and spread into the form (`$form->add($a, $b, $c)`), prepended (`$form->prepend($a, $b, $c)`), added as a [group](#nesting-context) (`$form->addGroup($label, $nodes)`), inserted before or after a specific node (`$form->insertBefore()` and `insertAfter()`), or at a specific index (`$form->insertAt($index, $node)`).

When extending a built-in component, these methods allow you to call the parent implementation and cleanly insert additional fields:

```php
class MyField extends Dropdown
{
    // ...

    public function settingsForm(FormContext $context = new FormContext): Form
    {
        $form = parent::settingsForm($context);

        return $form->insertAfter(/* ... */);
    }
}
```

### Fields

Most traditional inputs begin with a `CraftCms\Cms\Form\Nodes\Field` instance, which helps establish relationships between the [control](#controls) and its labels, instructions, errors, and actions.

The field factory takes a label and a control:

```php
$backupPrefix = Field::make(t('Filename prefix', category: 'my-plugin'), Text::make('filenamePrefix'));
```

Customize the field instance using its fluent methods:

```php
Field::make(t('Filename prefix', category: 'my-plugin'), Text::make('filenamePrefix'))
    ->instructions(t('Provide the default name for a backup. The plugin appends a timestamp and randomized value.', category: 'my-plugin'))
    ->tip(t('Avoid spaces and other special characters, as they may not be valid for the storage medium.'));
```

Note that we’ve chained these methods onto the _field_, not the _control_.

::: tip
Like forms, fields and other nodes are [conditionable](https://api.laravel.com/docs/13.x/Illuminate/Support/Traits/Conditionable.html), so they can be composed fluidly.
:::

### Controls

A control is an isolated interface that owns one or more inputs or [nested forms](#nesting-context).
Everything from a `textarea` to an inline Matrix editor is a control!

Our built-in control implementations are extremely flexible and solve for _many_ standard input experiences, but you are free to implement a custom one or extend anything in the `CraftCms\Cms\Form\Controls` namespace for a specific look and feel.
You’ll notice that most controls correspond to an existing [field type](fields.md)—we’ve consolidated much of the layout and rendering into web components, and field types now delegate to controls for their UI.

#### Paths

Every control has a _path_.
Paths determine inputs’ `name`s, as well as what values and errors are gathered from the [context](#nesting-context).

As it renders a form, Craft validates that every resolved path is unique, ensuring that they are…

- …addressable: inputs can be located anywhere in the form tree, using known identifiers.
- …non-overlapping: inputs will not clobber one another based on their eventual order in the DOM.

Paths can be defined locally, without concern for the context that will eventually resolve them.
As a form is [rendered](#rendering), the paths are recursively expanded so that each node is aware of its location within the payload.

Craft throws an error as soon as it discovers a path collision, and will not render an invalid form.

### Grouping

Nodes can be logically or semantically grouped to improve the user’s experience using _containers_.
The most basic container implementation is a _group_:

```php
use CraftCms\Cms\Form\Nodes\Group;

Group::make('advanced-settings', [
    Field::make(t('Maximum backup age', category: 'my-plugin'), Text::make('maxAge'))
        ->instructions(t('Use a PHP duration expression (i.e: `P1M`) to define the age at which backups will be automatically purged.')),
    Field::make(t('Maximum backups', category: 'my-plugin'), Number::make('maxBackupsCount'))
        ->instructions(t('Keep no more than this number of backups at any one time.', category: 'my-plugin')),
    // ...
]);
```

Groups can have a top-level `label`, and be made `collapsible`:

```php
Group::make('advanced-settings', [
    // ...
])
    ->label(t('Advanced retention policies', category: 'my-plugin'))
    ->collapsible();
```

::: tip
Containers can affect how their child nodes are nested in the resulting DOM or accessibility tree, but do not impact nested controls’ paths.
:::

#### Tabs

Nodes can be split into _tabs_ that control the visibility of their children.
Tabs are hoisted to the top of a form’s interface, and best used when there are no other types of top-level nodes in the form.

```php
use CraftCms\Cms\Form\Nodes\Tab;

Form::make([
    Tab::make('schedule', t('Schedule', category: 'my-plugin'), [
        // ...
    ]),
    Tab::make('advanced', t('Advanced', category: 'my-plugin'), [
        // ...
    ]),
]);
```

While tab identifiers do not impact control paths of their child nodes, they must unique within a form; if you are generating tabs dynamically (say, one per entry type), make sure you have a way of avoiding collisions:

```php{4}
$form = Form::make();

foreach (EntryTypes::getAllEntryTypes() as $entryType) {
    $form->add(Tab::make("settings-types-$entryType->uid", t('{type} Settings', ['type' => $entryType->name], category: 'my-plugin'), [
        // ...
    ]));
}
```

### Templates

You’ll find that directly rendering HTML is rarely necessary, within the form builder.
To bridge the gap as you translate arbitrary _non-control_ markup, we provide a `CraftCms\Cms\Form\Nodes\TemplateContent` node.

Initialize it with a stable identifier within the form and an HTML string:

```php
use CraftCms\Cms\Form\Nodes\TemplateContent;

$form->add(TemplateContent::make('setup-instructions', $html));
```

Craft [sanitizes](../compatibility.md#html-purification) the input with custom instructions to prevent leaking form elements (like buttons and inputs).
If you need to inject custom form UI, your markup should be encapsulated in a [control](#controls) class.

## Nesting + Context

Forms use a `FormContext` instance to hold `values`, `errors`, and a `namespace`, which are used when resolving specific control.
The context also determines the _control mode_ a set of nodes targets (editable, read-only, or disabled).
This process is covered in greater detail in the [rendering](#rendering) section.

Namespaces are primarily used to build input `name` attributes and resolve fields’ values and errors in a predictable and safe way.
This replaces the legacy `{% namespace %}` tag, which searched HTML fragments and modified identifiers to match the expected context.

## Data + Reactivity

Forms, fields, and controls can be rebuilt each time their data changes, which means you can focus and sculpt the administrative experience based on existing choices.
Craft quietly handles this for built-in component forms (like fields), but custom forms may require a [dedicated controller](#refresh-action).

See `CraftCms\Cms\Http\Controllers\FieldsController::renderForm()` for an example of how we combine consistent form data (like a `name` and `handle`) with dynamic plugin- or field-type-provided `settings`, and construct a form response.

### Refreshing

In an [Inertia](#inertia) front-end, a _refreshable_ form is re-fetched from the server when certain controls change.
A form’s [context](#nesting-context) controls whether any part of it can be refreshed, and individual controls that should trigger a refresh must be marked `->reactive()`.

::: tip
Contexts are read-only, and must be initialized as refreshable.
You cannot force a context provided by Craft to be refreshable, because the behavior always relies on corresponding back-end plumbing (specifically, a [dedicated controller](#refresh-action) that rebuilds the form).
:::

When a number of controls rely on a “reactive” field, you can wrap them in a [group](#grouping):

```php{11}
$form = Form::make([
    Field::make(t('Purge backups', category: 'my-plugin'), Lightswitch::make('autoPurge')->reactive()),
]);

$purgeNodes = [];

if ($this->autoPurge) {
    $purgeNodes[] = Field::make(t('Maximum backup age', category: 'my-plugin'), Text::make('maxAge'))
        ->instructions(t('Use a PHP duration expression (i.e: `P1M`) to define the age at which backups will be automatically purged.'));
}

$form->add(Group::make('purge-config', $purgeNodes)->dependsOn('autoPurge'));

return $form;
```

Note that `dependsOn()` is only a hint for the client about where conditional nodes will appear—the group itself must always be present in the form for the associated status signals to work!

## Text Expansion

Every text field now has access to a variety of powerful auto-completion tools, including environment suggestions and object template expansions.

To provide hints to users, pass any number of triggers and options to a text control:

```php
use CraftCms\Cms\Cp\SelectOptions;

$triggers = SelectOptions::getEnvTextExpanderTriggers();

// Supplement with your own:
$triggers[] = [
    // ...
];

$keyField = Field::make(t('API Key', category: 'my-plugin'), Text::make('apiKey')
    ->textExpanderTriggers($triggers))
    ->instructions(t('The access key you generated when creating your account.', category: 'my-plugin'))
    ->required();
```

Each trigger should have the following format:

```php
[
    'trigger' => '{',
    'boundary' => 'anywhere',
    'label' => t('Tags', category: 'my-plugin'),
    'options' => [
        [
            // (Optional) human-readable UI label:
            'label' => t('Archive', category: 'my-plugin'),
            // Value to be inserted:
            'value' => 'archive',
            // (Optional) additional keywords/synonyms/related strings to match against:
            'keywords' => ['old', 'defunct', 'deprecated'],
            // (Optional)
            'data' => [
                // Reveal an example value, like a redacted environment variable:
                'hint' => 'built-ins/archive',
                // ...
            ],
        ],
        // ...
    ],
    // Max matches to show, within this trigger group: 
    'limit' => 5,
]
```

The input UI can also fetch a dynamic remote data from a `source` specified in the trigger config:

```php
[
    'trigger' => '@',
    'boundary' => 'whitespace',
    'label' => t('People', category: 'my-plugin'),
    // This source is a local “action” URL, but it can be any public endpoint:
    'source' => action('blame/user-list'),
]
```

Remote source URLs are requested with the current “match” fragment appended as a `query` param, and forwards any configured `limit`; this is enforced in the client (the source is not obligated to respect it—but it can be a useful hint if the data is computationally expensive to generate).
The response must be an array of JSON objects with the same schema as `options`, above.
`source` and `options` cannot be combined; options must either be defined as you build the input, or from a remote source.

```
GET https://my-project.ddev.site/actions/blame/user-list?query=rob&limit=5

[
    {
        "label": "Robert",
        "value": "robert"
    },
    {
        "label": "Robin",
        "value": "robin"
    }
]
```

If the shape of a source’s data does not match (or it requires authentication, a non-GET method, etc.), create your own [controller](http.md) to assemble the correct call and translate the response.

::: tip
Static suggestions (like those derived from configuration) should be mapped using `options`; dynamic suggestions should not block the form response, and use `source` to fetch the data asynchronously.
If you make your plugin’s suggestions extensible, assume developers will want to fetch data from a remote source, and use a `source`.

Guard your controllers with appropriate permissions to ensure the application doesn’t leak sensitive information.
:::

### Object Template Suggestions

Any model implementing `CraftCms\Cms\View\Contracts\ProvidesObjectTemplateSuggestions` can own the logic that exposes property expansions:

```php
SelectOptions::getObjectTemplateTextExpanderTriggers(Backup::class);
```

Your static `objectTemplateSuggestions()` method should return a map of suggested strings and their human-readable labels:

```php
public static function objectTemplateSuggestions(): array
{
    return [
        'id' => t('ID'),
        'uid' => t('UID'),
        'filename' => t('Filename'),
        'dateCreated' => t('Created at'),
        'datePushed' => t('Pushed at', category: 'my-plugin'),
        'datePurged' => t('Purged at', category: 'my-plugin'),
        'fileSize' => t('Size', category: 'my-plugin'),
        // ...
    ];
}
```

When selected, the key replaces any matched text, including the trigger character.

## Rendering

Forms are combined with [context](#nesting-context) into a `FormPayload` by the `FormResolver`.
You may then turn it into a concrete [HTML representation](#html) using `FormRenderer` or an [Inertia](#inertia)-ready JSON response.

### HTML

The form builder and all nodes and controls assume their HTML output targets an environment that can hydrate built-in or plugin-provided web components, and is not suitable for use in the front-end; inspecting the markup, you’ll see elements like `<craft-input-date-time>` with a combination of native and component-specific HTML attributes.

This controller renders our form as HTML, then hands it off to the control panel response builder, with an `action()` and `redirectUrl()`.
Craft knows to wrap the output in a full-page edit screen:

```php
use CraftCms\Cms\Form\FormContext;
use CraftCms\Cms\Form\FormPayload;
use CraftCms\Cms\Http\Responses\CpScreenResponse;

readonly class OffsiteBackupsController
{
    use RespondsWithFlash;

    public function __construct(private FormResolver $formResolver) {}

    public function purgeControls(): FormPayload
    {
        $resolver = app(\CraftCms\Cms\Form\FormResolver::class);
        $renderer = app(\CraftCms\Cms\Form\FormHtmlRenderer::class);

        $form = Form::make([
            Field::make(t('After', category: 'my-plugin'), DateTime::make('after'))->width(FieldWidth::Half),
            Field::make(t('Before', category: 'my-plugin'), DateTime::make('before'))->width(FieldWidth::Half),
        ]);

        $formPayload = $this->formResolver->resolve($form, new FormContext(
            values: [
                'after' => Request::param('after'),
                'before' => Request::param('before'),
            ],
        ));

        return new CpScreenResponse()
            ->title(t('Purge Backups', category: 'my-plugin'))
            ->redirectUrl('offsite-backups')
            ->action('offsite-backups/purge')
            ->contentHtml($renderer->render($formPayload));
    }
}
```

### Inertia

::: warning
Our front-end tooling and web component registration process is still in flux!
When it stabilizes, this section will be updated with client-side requirements.
:::

The control panel is built on [Inertia](https://laravel.com/framework/docs/13.x/frontend#inertia), which allows the entire structure and content of a form to be packed into an efficient JSON payload, and rendered in the client.

Your controller method will look nearly the same, but instead of calling `contentHtml()`, you can had off the payload, directly:

```php{5-10}
return new CpScreenResponse()
    ->title(t('Purge Backups', category: 'my-plugin'))
    ->redirectUrl('offsite-backups')
    ->action('offsite-backups/purge')
    ->inertiaPage('Form', [
        'form' => $formPayload,
        'submit' => [
            'method' => 'post',
        ],
    ]);
```

`'Form'` is a special built-in Vue component designed to receive the serialized payload and render a full-page form.
To make your form [refreshable](#refreshing), pass a `refreshUrl` param to the view:

```php
->inertiaPage('Form', [
    'form' => $formPayload,
    'submit' => [
        'method' => 'post',
    ],
    'refreshUrl' => action([OffsiteBackupsController::class, 'renderPurgeForm'], [$this->handle]),
]);
```

#### Refresh Action

The action responsible for re-rendering a form can share some logic with the initial view, but it does not need to return a complete `CpScreenResponse`.
Rather, a resolved `FormPayload` can be cast directly to JSON.

```php
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use CraftCms\Cms\Form\FormContext;
use CraftCms\Cms\Support\DateTimeHelper;

// ...

public function renderPurgeForm(Request $request): JsonResponse
{
    $data = [
        'after' => DateTimeHelper::toDateTime($request->get('after')) ?? null,
        'before' => DateTimeHelper::toDateTime($request->get('before')) ?? null,
    ];

    // Shift the dates as a courtesy, so the range is never inverted:
    if ($data['before'] !== null && $data['after'] !== null && $data['before'] < $data['after']) {
        $data['after'] = $data['before'];
    }

    // Set up a context:
    $context = new FormContext(
        values: $data,
        refreshable: true,
    );

    // Form building is abstracted so we can call it from here and the primary form view.
    $form = $this->getPurgeForm($context);

    // Return only the resolved `FormPayload`:
    return new JsonResponse([
        'form' => $this->formResolver->resolve($form, $context),
    ]);
}

private function getPurgeForm(FormContext $context): Form
{
    // Assemble the `Form` (previously part of the `purgeForm()` action)...
}
```

This action is _not_ concerned with the validity of the data, and it should avoid changing application state based on it.
Our simple form could be enhanced with a `Callout` node containing an estimate of the number of backups that would be purged if submitted.

## Validation

Forms (and more specifically, [fields](#fields)) are only concerned with presenting inputs and displaying errors.
A field is only “required” from the perspective of the form builder; no corresponding validation rules are added.
Similarly, validation may have additional constraints (like pattern-matching or uniqueness) that the front-end does not enforce.

Conditional nodes in a form can flag problematic values before the user even sees a validation error—or handle situations where a value might be _valid_, but is likely to present issues down the line (like an expired API key, or a URL that returns a 404).
