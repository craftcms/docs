# Controllers

Plugins and modules can provide custom [controllers][yii] to Craft installations.

Controllers should live within a `controllers/` folder within the plugin or modules’s base source folder, and be named
in the format `WidgetsController.php` (the `Controller` suffix is required).

::: tip
For the most part, writing controllers for Craft is identical to writing controllers for Yii, so be sure to read the
[Yii documentation][yii] as a starting point.
:::

Craft controllers should extend <craft4:craft\web\Controller>, which offers a few advantages over its parent,
<yii2:yii\web\Controller>:

- You can easily control whether the controller should allow “anonymous” access by overriding
  [$allowAnonymous](craft4:craft\web\Controller::$allowAnonymous). (An active user session is required by default.)
- If an exception is thrown by a controller action and the request accepts a JSON response, the response will
  automatically be formatted as JSON, with an `error` key.
- It provides several helper methods that ease development.

If you’re writing a custom module and not a plugin, its base class’s [$controllerNamespace](https://www.yiiframework.com/doc/api/2.0/yii-base-application#$controllerNamespace-detail) property must set the right namespace for your controllers.

## Request Validation Methods

<craft4:craft\web\Controller> offers several methods you can call from within your actions, to validate the current
request:

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

```php
public function actionFoo()
{
    // This action should only be available to the control panel
    $this->requireCpRequest();

    // ...
}
```

## Routing

There are several ways to access your controller action in a request.

::: tip
Our main article on [using controller actions](../controller-actions.md) lives in the main documentation. Everything that applies to built-in controllers holds true for those provided by a plugin.
:::

### The `actions/<action-path>` Route

In addition to using an explicit `action` param in your request, Craft will route requests matching a specific “action path” format to your actions:

**Action Trigger** + **Plugin/Module Handle** + **Controller Name** + **Action Method**

```bash
curl -X POST https://my-project.tld/actions/my-plugin-handle/widgets/new
```

Each URL segment follows [Yii’s conventions](guide:structure-controllers) and is lower-kebab-cased:

- 
- Plugin handle (`my-plugin-handle`, from [composer.json](plugin-guide.md#composer-json)) or Module ID (`my-module`, from [config/app.php](module-guide.md#update-the-application-config))
- Controller `SuperWidgetController` becomes `super-widget`
- Action `SuperWidgetController::actionReticulateWidget()` becomes `reticulate-widget`

::: tip
The “Action Trigger” here can be customized with the <config4:actionTrigger> config setting. This setting has no effect on the `action` _query_ or _body parameter_, though.
:::

### Custom Routes

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
        $event->rules['acme-labs/widgets/new'] = 'acme-labs/widgets/edit';
        $event->rules['acme-labs/widgets/edit/<id:\d+>'] = 'acme-labs/widgets/edit';

        // ...
    });
```

Aliases to your actions can also be added by developers via `config/routes.php`, too—although these are confined to “site” requests:

```php
return [
    'rate-widget' => 'acme-labs/widgets/submit-review',
];
```

### Routes with Params

Yii cleverly maps query params to action arguments, by default. For example, an action with this signature…

```php
public function actionEdit(?int $id = null)
{
    // ...
}
```

…will automatically receive the `id` parameter from a request to `?action=my-plugin/foo-controller/edit&id=42`.

In the previous section, we registered two control panel routes, the second of which includes a [named parameter](guide:runtime-routing#named-parameters) pattern (`acme-labs/widgets/edit/<id:\d+>`) matching any numeric value; that value will be passed to our action as though it were a query param.

### Advanced Route Params

Craft extends parameterized routes to help maintain continuity
In cases where a validation error prevents a model from saving, you’ll want to provide the user an opportunity to view and correct issues.

To do this, we’ll pass the model back to the original route via _route params_. To support route params, your action should include a nullable argument matching the class of your model, in addition to any arguments mapped to URL params. In this example, we’ll assume your plugin already registers two routes for managing  route that allows editing records in a format like `/admin/foo/<fooId:{\d+}>` and that the action looks up an existing record by ID:

```php
public function actionEditFoo(?int $fooId = null, ?FooModel $foo = null)
{
    // Handle routes
    if ($fooId !== null) {

    }
    if ($foo === null) {
        $foo = new FooModel();
    }
}
```


## Handling Requests

A controller action’s primary job is to handle an incoming web request, and determine the response. There are a few ways
an action could go about that, depending on the needs.

### Rendering Templates

Controller actions can render and return Twig templates using <craft4:craft\web\Controller::renderTemplate()>.

```php
use yii\web\Response;
use craft\web\View;

public function actionFoo(): Response
{
    // Render and return the plugin’s `foo.twig` template
    return $this->renderTemplate(
        'plugin-handle/foo.twig',
        $variables,
        View::TEMPLATE_MODE_CP
    );
}
```

<craft4:craft\web\Controller::renderTemplate()> calls <craft4:craft\web\View::renderPageTemplate()> internally, which
ensures all registered JS and CSS resources have been added to the rendered HTML, and then it will set the
`Content-Type` header on the response, based on the MIME type of the template being rendered (using `text/html` as the
default if the MIME type isn’t known).

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

If your action is _only_ intended to be used by a client that expects JSON, the request should include an `Accept` header, and the action should call <craft4:craft\web\Controller::requireAcceptsJson()>.

Alternatively, <craft4:craft\web\Controller::asSuccess()> and <craft4:craft\web\Controller::asFailure()> may be more appropriate, as they will automatically determine the best format for a response—and they keep the structure of the response consistent.

### Redirecting the Request

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

If the controller action is saving something, you may want to allow forms’ `redirect` params to include dynamic tokens
such as `{id}`, which should be replaced with the object’s attribute values. To support that, pass the object into
[redirectToPostedUrl()](craft4:craft\web\Controller::redirectToPostedUrl()).

```php
use yii\web\Response;

public function actionFoo(): Response
{
    // ...

    // Redirect the request based on a 'redirect' param,
    // which can contain entry attribute tokens, such as {id}
    return $this->redirectToPostedUrl($entry);
}
```

### Models and Validation

For any requests that deal primarily with a single model, you can indicate success and failure states (say, saves or validation errors, respectively) with <craft4:craft\web\Controller::asModelSuccess()> and <craft4:craft\web\Controller::asModelFailure()>.

These methods combine aspects of the options above, constructing a response based on the [`Accept` header](#returning-json), issuing a [redirect](#redirecting-the-request), setting a flash and route params,

::: tip
The lower-level <craft4:craft\web\Controller::asSuccess()> and <craft4:craft\web\Controller::asFailure()> methods accomplish much the same thing, but work without a model.
:::

[yii]: https://www.yiiframework.com/doc/guide/2.0/en/structure-controllers
