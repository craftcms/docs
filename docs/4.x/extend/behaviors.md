---
description: Behaviors enable plugins to decorate built-in classes with native-feeling attributes and methods.
---

# Behaviors

[Behaviors](guide:concept-behaviors) are a feature of Yii [Components](guide:concept-components), and functionally similar to “mixins” in other frameworks or programming paradigms. A behavior can provide additional properties and methods to its owner, without needing to subclass or replace built-in components.

::: tip
A behavior’s methods and properties are not actually defined on the owner, but accessed as part of Yii’s magic <yii2:yii\base\Component::__get()> and <yii2:yii\base\Component::__call()> implementations. We’ll follow this logic in the [usage](#usage) section, below.
:::

Every class that extends <craft4:craft\base\Model> (in effect, virtually all core system components and data objects) automatically emits [events](events.md) that make it easy to attach custom behaviors at runtime. Some classes that _don’t_ inherit from `craft\base\Model` follow a similar pattern (like <craft4:craft\web\Controller> <Since ver="4.5.0" feature="Attaching behaviors to controllers" />) and emit an `EVENT_DEFINE_BEHAVIORS` event.

In this example, we’re going to give a subset of entries (within a “Posts” section) a special `getAuthorUrl()` method to standardize how we link to author indexes in our site’s front-end.

## Behavior Class

A behavior is a special type of class that extends <yii2:yii\base\Behavior>, and defines methods or properties that you wish to make available on any object it is eventually attached to.

```php
namespace mynamespace\myplugin\behaviors;

use craft\helpers\UrlHelper;
use yii\base\Behavior;

class Post extends Behavior
{
    public function getAuthorUrl(): ?string
    {
        $author = $this->owner->getAuthor();

        if (!$author) {
            return null;
        }

        return UrlHelper::siteUrl("authors/{$author->id}");
    }
}
```

Your [IDE](README.md#ide) may complain about the `$owner` property not having a `getAuthor()` method. You can “type-hint” this with a class-level docblock:

```php
/**
 * @property craft\elements\Entry $owner
 */
class Post extends Behavior
{
    // ...
}
```

## Attachment

In your plugin’s `init()` method, register an event handler on <craft4:craft\elements\Entry::EVENT_DEFINE_BEHAVIORS>:

```php
use yii\base\Event;
use craft\elements\Entry;
use craft\events\DefineBehaviorsEvent;
use mynamespace\myplugin\behaviors\Post;

Event::on(
    Entry::class,
    Entry::EVENT_DEFINE_BEHAVIORS,
    function(DefineBehaviorsEvent $e) {
        $section = $e->sender->getSection();

        // Is it relevant to this entry?
        if ($section->handle !== 'blog') {
            return;
        }

        $e->behaviors['post'] = Post::class;
    }
);
```

Here, we’re only bothering to attach the behavior to entry elements that belong to the `blog` section.

::: tip
This event registration signature is consistent across any class that emits the `EVENT_DEFINE_BEHAVIORS` event.
:::

### Naming

A name is not _required_ when attaching a behavior, but can become important if its methods or properties collide with those defined by the owner or another behavior. In the example above, we’re attaching the `Post` behavior as `post`, which will allow us to access it explicitly, in the future:

```php
$url = $entry->getBehavior('post')->getAuthorUrl();
```

This also makes it possible to detach a behavior, should you no longer need it:

```php
$entry->detachBehavior('post');
```

### Events

Behaviors can automatically bind [events](events.md) to their owners by defining an `events()` method and returning a map of event names (as keys) to methods (as values). This is a great way to collocate event handlers and functionality when they are already tightly coupled:

```php
public function events()
{
    return [
        Entry::EVENT_SET_ROUTE => [$this, 'defineRoute'],
    ];
}

public function defineRoute(SetElementRouteEvent $event)
{
    $event->route = '...';
}
```

Handlers registered in this way will only receive events emitted by the owner. If you need to respond to events on _all_ instances of a class, you will need to attach your behavior to every instance, or use a [class-level event listener](events.md#class-level-events).

Read more about behaviors in the [Yii guide](guide:concept-behaviors#handling-component-events).

## Usage

With the behavior attached to a class, its properties and methods will be available everywhere that instance is used:

```php
$url = $entry->getAuthorUrl();
```

That means you (or your plugin’s users) can take advantage of convenience features in their Twig templates, too:

```twig
{{ entry.getAuthorUrl() }}
```

### How it Works

We alluded to “magic” methods, earlier—these are special PHP features that allow classes to intercept attempts to access properties or call methods that don’t exist on it (or any of its parent classes) and handle them on a case-by-case basis (rather than immediately throwing an exception).

<yii2:yii\base\Component> implements a few of these:

`__get()`
: This is called when accessing an undefined property. It receives the desired property name as an argument, and checks if any of the component’s behaviors define it, and returns that value.

`__call()`
: This performs an equivalent function to `__get()`, but for methods. It receives the called method as an argument, and checks if it is defined by any attached behaviors.

::: warning
Yii also uses `__get()` (and another magic method, `__set()`) to create “virtual” public properties. For example, a class may have a private `$_data` property, then implement `getData()` and `setData()` methods; it’s possible, then, to access `$model->data` or set `$model->data = 'value'` without there being a property

However: Yii will always attempt to resolve native `getMyCustomProperty()` and `setMyCustomProperty()` methods before looking for a `myCustomProperty` property on any attached behaviors. Special care should be taken when naming behavior properties so as to avoid conflicts or ambiguity when attached to a parent class. Should this be unavoidable, you can directly access a behavior via `$class->getBehavior('behaviorName')`.

Consider accessing properties and calling methods of behaviors you own via their registered [names](#naming), rather than magic methods.
:::

<Todo notes="This would be a perfect place to include some information about adding custom columns to elements." />
