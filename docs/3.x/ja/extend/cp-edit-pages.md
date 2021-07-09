# Control Panel Edit Pages

Modules and plugins can add new edit pages to the control panel, for editing models or [elements](./element-types.md).

First, decide on the URL patterns that the edit page should be accessed by, such as `my-plugin/events/new` when creating a new event, and `my-plugin/events/X` for editing an existing one.

Register two URL rules via <craft3:craft\web\UrlManager::EVENT_REGISTER_CP_URL_RULES> from your module/plugin’s `init()` method:

```php
use craft\events\RegisterUrlRulesEvent;
use craft\web\Urlmanager;
use yii\base\Event;

Event::on(
    UrlManager::class,
    UrlManager::EVENT_REGISTER_CP_URL_RULES,
    function(RegisterUrlRulesEvent $event) {
        $event->rules['my-plugin/events/new'] = 'my-plugin/events/edit';
        $event->rules['my-plugin/events/<eventId:\d+>'] = 'my-plugin/events/edit';
    }
);
```

Now create a new [form page template](./cp-templates.md#form-pages) that contains the edit form, such as `templates/events/_edit.twig`.

The model being edited will be available to the template as a predefined variable (e.g. `event`). The template can refer to that model when passing current field values and validation errors to the [form inputs](./cp-templates.md#form-inputs).

```twig
{% extends '_layouts/cp' %}
{% import '_includes/forms' as forms %}

{% set title = 'Edit Event'|t('my-plugin') %}
{% set fullPageForm = true %}

{% block content %}
    {# Have the form submit to a my-plugin/events/save controller action #}
    {{ actionInput('my-plugin/events/save') }}

    {# Have the save action redirect to /my-plugin/events afterward #}
    {{ redirectInput('my-plugin/events') }}

    {{ forms.textField({
      label: 'Event Name'|t('plugin-handle'),
      instructions: 'The name of the event'|t('plugin-handle'),
      id: 'name',
      name: 'name',
      value: event.name,
      required: true,
      errors: event.getErrors('name'),
    }) }}

    {{ forms.dateField({
      label: 'Start Date'|t('plugin-handle'),
      instructions: 'The start date of the event.'|t('plugin-handle'),
      id: 'start-date',
      name: 'startDate',
      value: event.startDate,
      required: true,
      errors: event.getErrors('startDate'),
    }) }}

    {{ forms.dateField({
      label: 'End Date'|t('plugin-handle'),
      instructions: 'The end date of the event.'|t('plugin-handle'),
      id: 'end-date',
      name: 'endDate',
      value: event.endDate,
      required: true,
      errors: event.getErrors('endDate'),
    }) }}
{% endblock %}
```

Once the template is ready, create [controller actions](./controllers.md) for displaying the edit page, and handling form submissions.

```php
use mynamespace\models\Event;
use Craft;
use craft\helpers\DateTimeHelper;
use yii\web\BadRequestHttpException;
use yii\web\Response;

public function actionEdit(?int $eventId = null, ?Event $event = null): Response
{
    // Ensure the user has permission to save events
    $this->requirePermission('edit-events');

    if (!$event) {
        // Are we editing an existing event?
        if ($eventId) {
            $event = MyPlugin::getInstance()->events->getEventById($eventId);
            if (!$event) {
                throw new BadRequestHttpException("Invalid event ID: $eventId");
            }
        } else {
            // We're creating a new event
            $event = new Event();
        }
    }

    return $this->renderTemplate('plugin-handle/events/_edit', [
        'event' => $event,
    ]);
}

public function actionSave(): ?Response
{
    // Ensure the user has permission to save events
    $this->requirePermission('edit-events');

    $eventId = $this->request->getBodyParam('eventId');

    if ($eventId) {
        $event = MyPlugin::getInstance()->events->getEventById($eventId);
        if (!$event) {
            throw new BadRequestHttpException("Invalid event ID: $eventId");
        }
    } else {
        $event = new Event();
    }

    // Populate the event with the form data
    $event->name = $this->request->getBodyParam('name');
    $event->startDate = DateTimeHelper::toDateTime($this->request->getBodyParam('startDate'));
    $event->endDate = DateTimeHelper::toDateTime($this->request->getBodyParam('endDate'));

    // Try to save it
    if (!MyPlugin::getInstance()->events->saveEvent($event)) {
        if ($this->request->acceptsJson) {
            return $this->asJson(['errors' => $event->getErrors()]);
        }

        $this->setFailFlash(Craft::t('plugin-handle', 'Couldn’t save event.'));

        // Send the event back to the edit action
        Craft::$app->urlManager->setRouteParams([
            'event' => $event,
        ]);
        return null;
    }

    if ($this->request->acceptsJson) {
        return $this->asJson(['success' => true]);
    }

    $this->setSuccessFlash(Craft::t('plugin-handle', 'Event saved.'));
    $this->redirectToPostedUrl($event);
}
```

On the surface, these look like two distinct actions—one for showing the edit page, and another for handling form submissions.

But there’s one scenario where _both_ of these actions will get run, one after the other: when there are validation errors on save.

If the `saveEvent()` method returns `false` (presumably due to validation errors), our `save` action registers the model as a _route param_ called `event`, by passing it to <craft3:craft\web\UrlManager::setRouteParams()>. Then the action will return `null`, which tells Craft it should continue [routing the request](../routing.md) as if it was never routed to our `save` action to begin with.

The next stop in the routing will be our `edit` action, per the URL rules we’ve registered. This time, our (invalid) model will be passed to its `$event` argument, so the action won’t need to fetch/create an event based on the `$eventId`. It will pass the model to the edit template, complete with validation errors.

::: tip
See [Model Operation Methods](./services.md#model-operation-methods) for a blueprint of how the service’s `saveEvent()` method might work.
:::
