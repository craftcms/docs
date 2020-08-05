# Controllers

Plugins and modules can provide custom [controllers][yii] to Craft installations.

Controllers should live within a `controllers/` folder within the plugin or modules’s base source folder, and be named in the format `FooBarController.php` (the `Controller` suffix is required).

::: tip
For the most part, writing controllers for Craft is identical to writing controllers for Yii, so be sure to read the [Yii documentation][yii] as a starting point.
:::

Craft controllers should extend <craft3:craft\web\Controller>, which offers a few advantages over its parent, <yii2:yii\web\Controller>:

- You can easily control whether the controller should allow anonymous access by overriding [$allowAnonymous](craft3:craft\web\Controller::$allowAnonymous). (An active user session is required by default.)
- If an exception is thrown by a controller action and the request accepts a JSON response, the response will automatically be formatted as JSON, with an `error` key.
- It provides several helper methods that ease development.

## Request Validation Methods

<craft3:craft\web\Controller> offers several methods you can call from within your actions, to validate the current request:

| Method                                                                              | Description                                                                                                |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [requireLogin()](craft3:craft\web\Controller::requireLogin())                     | Requires that a user is logged in.                                                                         |
| [requireGuest()](craft3:craft\web\Controller::requireGuest())                     | Requires that the user is anonymous.                                                                       |
| [requireAdmin()](craft3:craft\web\Controller::requireAdmin())                     | Requires that the user is logged in with an Admin account.                                                 |
| [requirePermission()](craft3:craft\web\Controller::requirePermission())           | Requires that the user is logged in with an account that has a given permission.                           |
| [requireAuthorization()](craft3:craft\web\Controller::requireAuthorization())     | Requires that the user has been granted authorization to do something (whether or not they are logged in). |
| [requireElevatedSession()](craft3:craft\web\Controller::requireElevatedSession()) | Requires that the user has an elevated session.                                                            |
| [requirePostRequest()](craft3:craft\web\Controller::requirePostRequest())         | Requires that the request was sent as a POST request.                                                      |
| [requireAcceptsJson()](craft3:craft\web\Controller::requireAcceptsJson())         | Requires that the request was sent with an `Accept: application/json` header.                              |
| [requireToken()](craft3:craft\web\Controller::requireToken())                     | Requires that the request was sent with a [token](craft3:craft\web\Request::getToken()).                 |
| [requireCpRequest()](craft3:craft\web\Controller::requireCpRequest())             | Requires that the request URI begins with the [control panel trigger](config3:cpTrigger).                  |
| [requireSiteRequest()](craft3:craft\web\Controller::requireSiteRequest())         | Requires that the request URI doesn’t begin with the [control panel trigger](config3::cpTrigger).          |

```php
public function actionFoo()
{
    // This action should only be available to the control panel
    $this->requireCpRequest();

    // ...
}
```

## Requesting Your Controller Action

There are several ways to access your controller action in a request.

### POST `action` Param

Provide an `action` param set to your controller’s action path:

```bash
curl -d "action=plugin-handle/controller/action" \
  -X POST https://my-project.test/
```

### Custom Route

Create your own endpoint for requests with a [custom URL rule](../routing.md#advanced-routing-with-url-rules) that resolves to your controller action.

For example, in `config/routes.php`:

```php
return [
    'my/custom/endpoint' => 'plugin-handle/controller/action',
];
```

### The `actions/<action-path>` Route

By default, Craft makes an `actions/` route available for appending any valid action path. This can be customized with the <config3:actionTrigger> config setting.

```bash
curl -X POST https://my-project.test/actions/plugin-handle/controller/action
```

## Handling Requests

A controller action’s primary job is to handle an incoming web request, and determine the response. There are a few ways an action could go about that, depending on the needs.

### Rendering Templates

Controller actions can render and return Twig templates using <craft3:craft\web\Controller::renderTemplate()>.

```php
use yii\web\Response;
use craft\web\View;

public function actionFoo(): Response
{
    // Render and return the plugin's 'foo.twig' template
    return $this->renderTemplate('plugin-handle/foo.twig', $variables, View::TEMPLATE_MODE_CP);
}
```

<craft3:craft\web\Controller::renderTemplate()> calls <craft3:craft\web\View::renderPageTemplate()> internally, which ensures all registered JS and CSS resources have been added to the rendered HTML, and then it will set the `Content-Type` header on the response, based on the MIME type of the template being rendered (using `text/html` as the default if the MIME type isn’t known).

### Returning JSON

Controller actions can return JSON responses using <yii2:yii\web\Controller::asJson()>.

```php
use Craft;
use yii\web\Response;

public function actionFoo(): Response
{
    if (Craft::$app->request->acceptsJson) {
        return $this->asJson([
            'foo' => true,
        ]);
    }

    // ...
}
```

::: tip
You can call <craft3:craft\web\Controller::asErrorJson()> instead for an easy way to return a JSON response with an `error` key.
:::

### Redirecting the Request

Controller actions can redirect the request using <craft3:craft\web\Controller::redirect()>.

```php
use yii\web\Response;

public function actionFoo(): Response
{
    return $this->redirect('bar');
}
```

Or, if the request may contain a hashed `redirect` param, you can redirect to that using <craft3:craft\web\Controller::redirectToPostedUrl()>.

```php
use yii\web\Response;

public function actionFoo(): Response
{
    // Redirect the request based on a 'redirect' param
    return $this->redirectToPostedUrl();
}
```

If the controller action is saving something, you may want to allow forms’ `redirect` params to include dynamic tokens such as `{id}`, which should be replaced with the object’s attribute values. To support that, pass the object into [redirectToPostedUrl()](craft3:craft\web\Controller::redirectToPostedUrl()).

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

[yii]: https://www.yiiframework.com/doc/guide/2.0/en/structure-controllers

[yii]: https://www.yiiframework.com/doc/guide/2.0/en/structure-controllers
