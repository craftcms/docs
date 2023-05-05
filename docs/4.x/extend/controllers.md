---
sidebarDepth: 2
description: Respond to HTTP requests by connecting them with back-end services.
---

# Controllers

Plugins and modules can provide custom [controllers][yii] to Craft installations.

::: tip
For the most part, Craft controllers behave the same as they do in Yii, so everything in the [Yii documentation][yii] still applies—this page is concerned primarily with additional features that _are_ Craft-specific.
:::

## Creating a Controller

Controllers should live within the `controllers/` directory of your plugin or module’s base source folder, and must include the a `Controller` suffix in their class and filename.

Craft controllers should extend <craft4:craft\web\Controller>, which offers a few advantages over its parent, <yii2:yii\web\Controller>:

- You can decide when the controller should allow “anonymous” access by overriding
  [$allowAnonymous](craft4:craft\web\Controller::$allowAnonymous). (An active user session is required by default.)
- If an [exception](#exceptions) is thrown by a controller action and the request accepts a JSON response, the response will automatically be formatted as JSON, with an `error` key.
- It provides several [helper methods](#request-validation-methods) that ease development.

If you’re working on a _module_, its base class’s [$controllerNamespace](yii2:yii\base\Application::$controllerNamespace) property must set the right namespace for your controllers. Plugins handle this for you, automatically.

::: tip
The `$controllerNamespace` property is ultimately evaluated as a path [alias](../config/README.md#aliases) but it _should not_ include a leading `@`. You may encounter errors if the first segment of the “namespace” is not a valid alias—for example, `mymodule\\controllers` will only work if the `@mymodule` alias is already defined, and points to your module’s directory.
:::

## Actions

Controllers themselves don’t provide any functionality without _actions_. Actions are methods on a controller that begin with `action`, like `actionLogin` or `actionSave`.

An action is responsible for gathering information about the request and generating a response. In the process of serving a request, you might access:

- Values passed via [route params](#routes-with-params);
- <badge vertical="baseline" type="verb">POST</badge> body params;
- <badge vertical="baseline" type="verb">GET</badge> query string params;
- HTTP headers;
- Session data;

Typically, actions return a <craft4:craft\web\Response> object—but they can also return `null` as a means of handing control back to Craft and [routing](#routing) to whatever _path_ was originally requested (ignoring the incoming [`action` param](#action-params)). As a convenience, <craft4:craft\web\Controller> includes a number of [request validation](#request-validation-methods) and [response](#sending-responses) factory methods.

A basic controller looks like this:

```php
namespace mynamespace\controllers;

use craft\web\Controller;

class WidgetsController extends Controller
{
    protected array|bool|int $allowAnonymous = true;

    public function actionEcho()
    {
        return $this->asJson(['ping' => 'Pong!']);
    }
}
```

## Routing

There are several ways to access your controller action in a request.

::: tip
Information on [using controller actions](../dev/controller-actions.md) lives in the main documentation. Everything that applies to built-in controllers holds true for those provided by a plugin.
:::

### Action Params

Passing an [`action` param](../dev/controller-actions.md#making-requests) in a <badge vertical="baseline" type="verb">GET</badge> request’s query string or a <badge vertical="baseline" type="verb">POST</badge> request’s body lets you tell Craft exactly what controller and action you want to run.

The most common way to do this is with an HTML form, but it’s also possible via [Ajax](../dev/controller-actions.md#ajax):

```twig{3}
<form method="POST">
  {{ csrfInput() }}
  {{ actionInput('my-plugin/widgets/save') }}

  {# ... #}

  <button>Save</button>
</form>
```

<See path="../dev/controller-actions.md#form-helpers" label="Form Helpers" description="Read more about building front-end forms." />

### Action Paths

Craft will route requests using a specific “action path” format to the matching action:

**Action Trigger** + **Plugin/Module Handle** + **Controller Name** + **Action Method**

```bash
curl -X POST https://my-project.tld/actions/my-plugin/widgets/save
```

Each URL segment follows [Yii’s conventions](guide:structure-controllers) and is lower-kebab-cased:

- Plugin Handle: From [composer.json](plugin-guide.md#composer-json) or [config/app.php](module-guide.md#update-the-application-config), for modules;
- Controller Name: `WidgetsController` becomes `widgets`;
- Action `WidgetsController::actionSave()` becomes `save`

::: tip
The **Action Trigger** is the only exception to this rule, and can be customized with the <config4:actionTrigger> config setting. This setting has no effect on the [`action` param](#action-params).
:::

### Control Panel Routes

Many plugins that provide functionality via the control panel will want to register a bundle of sensible, human-readable routes.

In your plugin’s `init()` method, listen for the <craft4:craft\web\UrlManager::EVENT_REGISTER_CP_URL_RULES> event:

```php
use craft\web\UrlManager;
use craft\events\RegisterUrlRulesEvent;
use yii\base\Event;

Event::on(
    UrlManager::class,
    UrlManager::EVENT_REGISTER_CP_URL_RULES,
    function(RegisterUrlRulesEvent $event) {
        $event->rules['widgets/new'] = 'my-plugin/widgets/edit';
        $event->rules['widgets/edit/<id:\d+>'] = 'my-plugin/widgets/edit';

        // ...
    }
);
```

Here, the key represents the user-facing “path” (what will appear in the address bar of their browser), and the value is an [action path](#action-paths).

::: tip
The second rule here defines a named parameter (`id`), which will be mapped to the target action. We will cover [route params](#routes-with-params), next!
:::

### Site Routes

Plugins should generally avoid setting site URL rules. Instead, document common actions that developers may need, and encourage use of the [`actionInput()`](../dev/functions.md#actioninput) Twig function or [`routes.php`](../routing.md#advanced-routing-with-url-rules) to route requests:

```php
return [
    'rate-widget' => 'my-plugin/widgets/submit-review',
];
```

### Routes with Params

Through the magic of [reflection](yii2:yii\web\Controller::bindActionParams()), Yii automatically maps route and query params into action arguments that share a name. For example, an action with this signature…

```php{7}
namespace mynamespace\controllers;

use craft\web\Controller;

class WidgetsController extends Controller
{
    public function actionEdit(?int $id = null)
    {
        // ...
    }
}
```

…will automatically receive the `id` parameter from a request to `?action=my-plugin/widgets/edit&id=42`.

In the previous section, we registered two control panel URL rules, the second of which included a [named parameter](guide:runtime-routing#named-parameters) pattern (`my-plugin/widgets/edit/<id:\d+>`) matching any numeric value; that value will be passed to our action as though it were a query param (so long as the named parameter matches an argument).

## Handling Requests

A controller action’s primary job is to handle an incoming web request and generate an appropriate [response](#sending-responses).

### Request Validation Methods

<craft4:craft\web\Controller> offers several methods you can call from within your actions, to validate the current request:

Method | Description
------ | -----------
[requireLogin()](craft4:craft\web\Controller::requireLogin()) | Requires that a user is logged in.
[requireGuest()](craft4:craft\web\Controller::requireGuest()) | Requires that the user is anonymous.
[requireAdmin()](craft4:craft\web\Controller::requireAdmin()) | Requires that the user is logged in with an Admin account.
[requirePermission()](craft4:craft\web\Controller::requirePermission()) | Requires that the user is logged in with an account that has a given permission.
[requireAuthorization()](craft4:craft\web\Controller::requireAuthorization()) | Requires that the user has been granted authorization to do something (whether or not they are logged in).
[requireElevatedSession()](craft4:craft\web\Controller::requireElevatedSession()) | Requires that the user has an elevated session.
[requirePostRequest()](craft4:craft\web\Controller::requirePostRequest()) | Requires that the request was sent as a POST request.
[requireAcceptsJson()](craft4:craft\web\Controller::requireAcceptsJson()) | Requires that the request was sent with an `Accept: application/json` header.
[requireToken()](craft4:craft\web\Controller::requireToken()) | Requires that the request was sent with a [token](craft4:craft\web\Request::getToken()).
[requireCpRequest()](craft4:craft\web\Controller::requireCpRequest()) | Requires that the request URI begins with the [control panel trigger](config4:cpTrigger).
[requireSiteRequest()](craft4:craft\web\Controller::requireSiteRequest()) | Requires that the request URI doesn’t begin with the [control panel trigger](config4:cpTrigger).

Generally speaking, these checks should occur at the _top_ of your action methods:

```php
public function actionFoo()
{
    // This action should only be available to the control panel
    $this->requireCpRequest();

    // ...
}
```

::: tip
Perform request validation in your controller’s `beforeAction()` method to enforce it for all actions.
:::

### CSRF

Craft requires a valid [CSRF token](../dev/controller-actions.md#csrf) for any <badge vertical="baseline" type="verb">POST</badge> requests. This can be disabled for an entire controller by overriding its `$enableCsrfValidation` property, or just for a specific action:

```php
public function beforeAction($actionId)
{
    // Don’t require a CSRF token for incoming webhooks:
    if ($actionId === 'receive-webhook') {
        $this->enableCsrfValidation = false;
    }

    return parent::beforeAction($actionId);
}
```

::: warning
Only disable CSRF validation when you have some other means of validating the authenticity of a request, like a webhook signature or shared secret.
:::

## Sending Responses

You may want to send different types of responses based on request conditions. All of the following situations involve calling the appropriate response factory method and _returning_ the result.

### Rendering Templates

Controller actions can render and return Twig templates using <craft4:craft\web\Controller::renderTemplate()>.

```php{11-15}
use yii\web\Response;
use craft\web\View;

public function actionFoo(): Response
{
    $variables = [
        'bar' => 'baz',
    ];

    // Render and return the plugin’s `foo.twig` template
    return $this->renderTemplate(
        'plugin-handle/foo',
        $variables,
        View::TEMPLATE_MODE_CP,
    );
}
```

<craft4:craft\web\Controller::renderTemplate()> calls <craft4:craft\web\View::renderPageTemplate()> internally, which ensures all registered assets are added to the rendered HTML—then it will set the `Content-Type` header on the response, based template’s extension, or `text/html` when a MIME type can’t be determined.

#### Registering Assets

To register an asset for inclusion in a rendered page, call one of the <craft4:craft\web\View> methods:

Calling… | Registers…
------ | -----------
[`registerJs()`](craft4:craft\web\View::registerJs()) | …a block of JavaScript code.
[`registerJsFile()`](craft4:craft\web\View::registerJsFile()) | …a `<script>` tag, with the provided value as its `src` attribute.
[`registerCss()`](craft4:craft\web\View::registerCss()) | …a block of CSS code.
[`registerCssFile()`](craft4:craft\web\View::registerCssFile()) | …a `<link rel="stylesheet">` tag with the provided value as its `href` attribute.
[`registerLinkTag()`](craft4:craft\web\View::registerLinkTag()) | …an arbitrary `<link>` tag.
[`registerAssetBundle()`](craft4:craft\web\View::registerAssetBundle()) | …everything in the provided [asset bundle](./asset-bundles.md).

::: tip
Some methods support passing one of the `View::POS_*` constants to determine where it is registered, or use an [asset bundle](./asset-bundles.md) to declare dependencies to ensure scripts are output in the correct order.
:::

### Returning JSON

Controller actions can explicitly return JSON responses using <yii2:yii\web\Controller::asJson()>.

```php
use Craft;
use yii\web\Response;

public function actionFoo(): Response
{
    return $this->asJson([
        'foo' => true,
    ]);
}
```

If your action is _only_ intended for use by clients expecting JSON, the request should include an `Accept` header, and the action should call <craft4:craft\web\Controller::requireAcceptsJson()>.

Alternatively, <craft4:craft\web\Controller::asSuccess()> and <craft4:craft\web\Controller::asFailure()> may be more appropriate, as they will automatically determine the best format for a response—and they keep the structure of the response consistent.

### Redirection

Controller actions can redirect the request using <craft4:craft\web\Controller::redirect()>.

```php
use yii\web\Response;

public function actionFoo(): Response
{
    return $this->redirect('bar');
}
```

Or, if the request may contain a hashed `redirect` param, you can redirect to that using <craft4:craft\web\Controller::redirectToPostedUrl()>.

```php
use yii\web\Response;

public function actionFoo(): Response
{
    // Redirect the request based on a 'redirect' param
    return $this->redirectToPostedUrl();
}
```

If the controller action is saving something, you may want to allow forms’ `redirect` params to include dynamic tokens such as `{id}`, which should be replaced with the object’s attribute values. To support that, pass the object into [redirectToPostedUrl()](craft4:craft\web\Controller::redirectToPostedUrl()).

```php
use yii\web\Response;

public function actionFoo(): Response
{
    // ...

    // Redirect the request based on a POSTed 'redirect' param,
    // which can contain entry attribute tokens, such as {id}:
    return $this->redirectToPostedUrl($entry);
}
```

### Success and Failure states

For any requests that deal primarily with a single model, you can indicate success and failure states (say, saves or validation errors, respectively) with <craft4:craft\web\Controller::asModelSuccess()> and <craft4:craft\web\Controller::asModelFailure()>.

These methods combine aspects of the options above, constructing a response based on the [`Accept` header](#returning-json), issuing a [redirect](#redirection), or setting flashes and route params. Check out the [model lifecycle](#model-lifecycle) section for an example of them in use.

::: tip
The lower-level <craft4:craft\web\Controller::asSuccess()> and <craft4:craft\web\Controller::asFailure()> methods accomplish much the same thing, but don’t require a model.
:::

### Sending Files

Actions can also return entire files, rather than HTML or JSON:

```php
return $this->response->sendFile(Craft::getAlias('@storage/path/to/temp-file.pdf'), 'Your Invoice.pdf', );

// ...or...

return $this->response->sendContentAsFile($csv, 'report.csv');
```

::: tip
Note that these methods are accessed via the <craft4:craft\web\Response> stub attached to the controller.
:::

### Control Panel Screens

When working with control panel views, you can construct a context-agnostic response by calling <craft4:craft\web\Controller::asCpScreen()>. In doing so, you allow Craft to format the response as a complete HTML document, or just the fragment required for a slide-out. The universal [element editor](./element-types.md#edit-screen) makes extensive use of this.

To set up a response, call the `asCpScreen()` method from an action:

```php
$response = $this->asCpScreen()
    ->action('my-plugin/widgets/save')
    ->docTitle("Edit {$widget->name}")
    ->title($widget->name)
    ->editUrl(UrlHelper::cpUrl("widgets/edit/{$widget->id}");

// ...

return $response;
```

::: tip
See <craft4:craft\web\CpScreenResponseBehavior> for a complete list of methods used to prepare the response object. Keep in mind that some properties are only used one context or another, but that the response can (and should) be configured without needing to know which context is being targeted!
:::

## Model Lifecycle

::: tip
This section expands on concepts covered in [models and validation](../dev/controller-actions.md#models-and-validation), with a focus on the implementation of the underlying actions. Examples here will conform to the patterns discussed in that user-facing documentation.
:::

Craft extends [parameterized URL rules](#routes-with-params) to help maintain continuity while editing models. In cases where a validation error prevents a model from saving, you’ll want to provide the user an opportunity to view and correct issues.

In this exercise, we’ll assume your plugin defines two URL rules for the control panel, like the examples above:

- `widgets/new` for creating a `Widget`;
- `widgets/<id:\d+>` for editing an existing `Widget`;

When a user arrives at `widgets/new` (or `admin/widgets/new`, more accurately), we will present them with a form to create a new `Widget`. If there are no issues with their submission, they’ll be redirected to the new widget’s edit URL (`widgets/{id}`). If there _is_ an issue creating the widget (or updating it, later), we’ll drop them back where they started—for new `Widget`s, that would mean the `new` path; for existing `Widget`s, their edit URL.

### Presentation Routes

To support this workflow, both rules must be mapped to a single “edit” action capable of handling both _new_ and _existing_ records. The action will have two arguments—one that corresponds to the `id` param from our _edit_ route, and one that will receive a [dynamically-set `widget` param](#mutation-validation). Let’s look at how this is set up, in practice:

```php{1,6,8,19}
public function actionEdit(?int $id = null, ?Widget $widget = null)
{
    $widgets = MyPlugin::getInstance()->getWidgets();

    // Do we have an incoming Widget ID from the route?
    if ($widgetId !== null) {
        // Was a Widget model passed back via route params? It should take priority:
        if ($widget === null) {
            // Nope, let’s look it up:
            $widget = $widgets->getWidgetById($id);

            if (!$widget) {
                // Uh oh, they’re trying to edit something that doesn’t exist!
                throw new NotFoundHttpException('The requested widget does not exist.');
            }
        }
    } else {
        // Ok, so we’re dealing with a “new” Widget… was one passed back via route params?
        if ($widget === null) {
            // Still no—let’s instantiate a fresh one so we have something to pass to the template:
            $widget = new Widget();
        }
    }

    return $this->renderTemplate('my-plugin/_widgets/edit', [
        'widget' => $widget,
    ]);
}
```

This one action can handle both the `new` and `edit` routes, defined earlier—including cases when the `Widget` fails validation and is passed back to the original path. Here’s a breakdown of the possible combinations of route params that might be available and what scenario it might represent:

`$id` | `$widget` | Scenario
----- | --------- | --------
<x-mark /> | <x-mark /> | Displaying a new form, with no prior submission.
<x-mark /> | <check-mark /> | Displaying validation errors for a new `Widget`.
<check-mark /> | <x-mark /> | Displaying a form for an existing `Widget`.
<check-mark /> | <check-mark /> | Displaying a form with validation errors for an existing `Widget`.

### Mutation + Validation

But how do we actually _save_ a `Widget`? This is handled in a separate action, bearing a familiar structure:

```php{11,20,29-33,36-41}
public function actionSave()
{
    $this->requirePostRequest();

    $request = Craft::$app->getRequest();
    $widgets = MyPlugin::getInstance()->getWidgets();

    // Is the user trying to edit an existing widget?
    $id = $request->getBodyParam('id');

    if ($id) {
        // Ok, we’ve got an ID—let’s look it up.
        $widget = $widgets->getWidgetById($id);

        // Uh oh, it doesn’t exist!
        // (Or maybe you decide they don't have permission to edit it...)
        if (!$widget) {
            throw new BadRequestHttpException('Invalid widget ID.');
        }
    } else {
        // Ok, no ID was passed—looks like they want to create a new one:
        $widget = new Widget();
    }

    // ...assign, update, and validate properties...

    if (!$widgets->saveWidget($widget)) {
        // Hand the model back to the original route:
        return $this->asModelFailure(
            $widget,
            Craft::t('my-plugin', 'Something went wrong!'), // Flash message
            'widget', // Route param key
        );
    }

    return $this->asModelSuccess(
        $widget,
        Craft::t('my-plugin', 'Widget saved.'), // Flash message
        'widget', // Route param key
        'my-plugin/widgets/{id}', // Redirect “object template”
    );
}
```

This implementation of `actionSave()` doesn’t require route params to be bound to arguments—instead, it just looks for a POSTed `id` value, and attempts to load the corresponding `Widget`. Without an ID in the request, it just instantiates a new `Widget` model.

In the last return statement, you’ll notice a [redirection](#redirection) object template, which is rendered after a widget is successfully saved—the format matches our original “edit” URL rule, meaning the user will be dropped at their newly created or updated `Widget` edit screen.

::: tip
Read more about the `asModelSuccess()` and `asModelFailure()` [response factory methods](#models-and-validation).
:::

### Forms

The final piece of this puzzle is the `<form>` we use to display and update a `Widget`:

```twig
<form method="POST">
  {{ csrfInput() }}
  {{ actionInput('my-plugin/widgets/save') }}

  {# Our `widget` may be new, so it won’t always have an ID: #}
  {% if widget.id %}
    {{ hiddenInput('id', widget.id) }}
  {% endif %}

  <label>
    {{ input('text', 'name', widget.name) }}

    {# It may also have come back with validation errors attached: #}
    {% if widget.hasErrors('name') %}
        <span>{{ widget.getErrors('name') | join(', ') }}</span>
    {% endif %}
  </label>

  <button type="submit">Save Widget</button>
</form>
```

Notice that we aren’t setting an [`action` _attribute_](../dev/controller-actions.md#making-requests) on the form! This means that if the widget is _isn’t_ saved successfully, the request will fall through to the same route the user submitted the form from (in this case, mapped to the `my-plugin/widgets/edit` action), allowing them to pick back up with the model intact. If it _was_ successful, Craft will [redirect](#sending-responses) to the rendered object template (fourth argument to `asModelSuccess()` at the end of `actionSave()`).

::: tip
You may still define an `action` attribute on your form when it exists at a different path from the primary editing page. The “Quick Post” dashboard widget is representative of this pattern—a minimal form is presented in one context, but errors are displayed elsewhere, after submission.
:::

## Exceptions

Craft automatically handles exceptions that bubble out of an action, and will present an error to the client—but only subclasses of <yii2:yii\base\UserException> will display the actual message.

Yii provides <yii2:yii\web\HttpException>, which can be thrown with a specific `statusCode` to set it on the response. Specific subclasses like <yii2:yii\web\ForbiddenHttpException> should be used when available.

Do not throw `HttpException`s anywhere but web controllers. If you want to indicate an internal failure, catch and re-throw an appropriate `HttpException`.

[yii]: https://www.yiiframework.com/doc/guide/2.0/en/structure-controllers
