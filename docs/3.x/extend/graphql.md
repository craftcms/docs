# Extending GraphQL

Developers can use Craft’s [GraphQL implementation](../graphql.md) to provide their own GraphQL data and permissions for custom plugins and modules.

If you’ve created a custom element or field type, chances are you’ll want to make its data available via the GraphQL API.

## Overview

Unlike Craft’s element queries that are built on the fly, the GraphQL schema needs to define every possible query and data type up front.

The fundamental difference between Craft and GraphQL APIs, combined with Craft’s flexible content modeling, means the greatest challenge for your custom implementation is likely to be planning rather than the mechanics of making it happen.

Important questions to consider:

1. What kinds of data do you need to expose, and how complex is each?\
(Are there nested objects or multiple types? Will you need to support eager loading?)
2. What sort of arguments, if any, do you need to make available for narrowing your result set?
3. Should this data be available in the public schema, or will you need to add and honor schema permissions?

::: tip
If you’re not already familiar with GraphQL terminology and the [webonyx/graphql-php](https://github.com/webonyx/graphql-php) library Craft uses, take care to keep Craft and GraphQL terminology separate; there are overlapping terms that can be confusing. It helps to pay careful attention to namespacing when looking at code examples.
:::

The rest of this page will cover each of the main things you may need to work with. If you’d like some concrete examples, have a look at Craft’s own pieces in the [`src/gql/` directory](https://github.com/craftcms/cms/tree/main/src/gql).

## The Gql Service

The <craft3:craft\services\Gql> class offers methods mostly for managing schemas and tokens and executing queries, so you won’t need to do much with it if you’re primarily exposing data to GraphQL. The Gql class does, however, define and trigger the events you’ll use to register any components you’d like to add to the system. (We’ll get to those in a moment.)

### Modifying Queries Before or After Execution

The Gql service also includes events you can use to modfiy [queries](#queries) before and after they’re executed.

#### beforeExecuteGqlQuery

```php
use craft\events\ExecuteGqlQueryEvent;
use craft\services\Gql;
use yii\base\Event;

Event::on(
    Gql::class,
    Gql::EVENT_BEFORE_EXECUTE_GQL_QUERY,
    function(ExecuteGqlQueryEvent $event) {
        // Set the result from cache
        $event->result = ...;
    }
);
```

#### afterExecuteGqlQuery

```php
use craft\events\ExecuteGqlQueryEvent;
use craft\services\Gql;
use yii\base\Event;

Event::on(
    Gql::class,
    Gql::EVENT_AFTER_EXECUTE_GQL_QUERY,
    function(ExecuteGqlQueryEvent $event) {
        // Cache results from $event->result or just tweak them
    }
);
```

## Queries

Queries are the top-level starting points someone will use fetching information from the GraphQL API. Craft includes query definitions for `entries` and `entry`, for example, and Craft Commerce adds its own custom queries for `products` and `product`.

A simple query to list `widgets` titles might look like this:

```graphql{2}
{
  widgets {
    title
  }
}
```

A <craft3:craft\gql\base\Query> class provides one or more query names, each describing a GraphQL type it will return, any arguments that can be used to tailor results, and pointing to a resolver that will be responsible for translating the GraphQL query into equivalent logic with Craft’s APIs.

### Example Query Class

This example provides a `widgets` query that returns an array of custom [interfaces](#interfaces), optionally filtered by custom [arguments](#arguments). The [resolver](#resolver) describes how to provide data for each interface.

```php
namespace mynamespace\gql\queries;

use craft\gql\base\Query;
use GraphQL\Type\Definition\Type;
use mynamespace\helpers\Gql as GqlHelper;
use mynamespace\gql\interfaces\elements\Widget as WidgetInterface;
use mynamespace\gql\arguments\elements\Widget as WidgetArguments;
use mynamespace\gql\resolvers\elements\Widget as WidgetResolver;

class Widget extends Query
{
    public static function getQueries($checkToken = true): array
    {
        // make sure the current token’s schema allows querying widgets
        if ($checkToken && !GqlHelper::canQueryWidgets()) {
            return [];
        }

        // provide one or more query definitions
        return [
            'widgets' => [
                'type' => Type::listOf(WidgetInterface::getType()),
                'args' => WidgetArguments::getArguments(),
                'resolve' => WidgetResolver::class . '::resolve',
                'description' => 'This query is used to query for custom widgets.'
            ],
        ];
    }
}
```

::: tip
The careful reader will notice a custom GqlHelper class above, which is a tiny extension of <craft3:craft\helpers\Gql> that makes it trivial to check whether entities are allowed by the schema:

```php
public static function canQueryWidgets(): bool
{
    $allowedEntities = self::extractAllowedEntitiesFromSchema();
    return isset($allowedEntities['widgets']);
}
```
:::

### Registering Queries

You can register one or more query classes using the [registerGqlQueries](craft3:craft\services\Gql::EVENT_REGISTER_GQL_QUERIES) event and appending them to the `queries` array:

```php
use craft\events\RegisterGqlQueriesEvent;
use craft\services\Gql;
use yii\base\Event;
use mynamespace\gql\queries\Widget;

Event::on(
    Gql::class,
    Gql::EVENT_REGISTER_GQL_QUERIES,
    function(RegisterGqlQueriesEvent $event) {
        $event->queries[] = Widget::class;
    }
);
```

## Arguments

A query can support any number of arguments someone can use to filter results.

Any Craft element can be filtered by `id`, `slug`, or its `enabledForSite` property, for example.

Our pretend Widget element could provide its own `approved` argument for narrowing results to approved widgets:

```graphql{2}
{
  widgets(approved: true) {
    title
  }
}
```

### Example Arguments Class

```php
namespace mynamespace\gql\arguments\elements;

use craft\gql\base\ElementArguments;
use GraphQL\Type\Definition\Type;

class Widget extends ElementArguments
{
    public static function getArguments(): array
    {
        // append our argument to common element arguments and any from custom fields
        return array_merge(parent::getArguments(), self::getContentArguments(), [
            'approved' => [
                'name' => 'approved',
                'type' => Type::boolean(),
                'description' => 'Narrows query results based on approved status.'
            ],
        );
    }
}
```

::: tip
This example extends <craft3:craft\gql\base\ElementArguments> in order to take advantage of common element arguments for free. It’s fine if you don’t have your own element type or even a class for arguments; you ultimately just need to provide an array of argument definitions for your queries if you want to use them.
:::

## Types

Not to be confused with entry types, GraphQL types are the all-important and specific descriptions of the kinds of data the API represents. Every single type must exhaustively describe what it contains—including any nested types—and every type in the GraphQL schema must be unique.

TODO: include example

Every available part of Craft’s content model, and every kind of data your custom plugin or module needs to make available via GraphQL, needs to be translated into an explicitly-named GraphQL type.

Craft’s <craft3:craft\gql\GqlEntityRegistry> keeps track of types that are registered, and you’ll use it to fetch, modify, and set these GraphQL types.

### Registering Types

```php
use craft\events\RegisterGqlTypesEvent;
use craft\services\Gql;
use yii\base\Event;
use MyGqlElementInterface;

Event::on(
    Gql::class,
    Gql::EVENT_REGISTER_GQL_TYPES,
    function(RegisterGqlTypesEvent $event) {
        $event->types[] = MyGqlElementInterface::class;
    }
);
```

## Interfaces

## Generators

Craft includes the concept of type generators that are crucial for dynamically generating the complex types necessary for entry types, Matrix fields, and other content structures with the ability to have many specific contexts that each need a unique type definition.

## Directives

Directives return types that can be used to transform result data in specified locations relative to the GraphQL query.

Craft’s included directives apply exclusively to requested fields, though they may be applied in mutations and numerous parts of the type system.

### Registering Directives

```php
use craft\events\RegisterGqlDirectivesEvent;
use craft\services\Gql;
use yii\base\Event;
use MyGqlDirective;

Event::on(
    Gql::class,
    Gql::EVENT_REGISTER_GQL_DIRECTIVES,
    function(RegisterGqlDirectivesEvent $event) {
        $event->directives[] = MyGqlDirective::class;
    }
);
```

## Mutations

A Mutation class defines named mutations that should be available, including consideration for permissions, each one including arguments, a type, and a mutation resolver responsible for modifying data using Craft’s APIs.

input objects

TODO: include example

### Registering Mutations

```php
use craft\events\RegisterGqlMutationsEvent;
use craft\services\Gql;
use GraphQL\Type\Definition\Type;
use yii\base\Event;
use MyGqlElementInterface;
use MyGqlArguments;

Event::on(
    Gql::class,
    Gql::EVENT_REGISTER_GQL_MUTATIONS,
    function(RegisterGqlMutationsEvent $event) {
        $event->mutations[] = [
            'myCustomElementData' => [
                'type' => Type::listOf(MyGqlElementInterface::getType()),
                'args' => MyGqlArguments::getArguments(),
            ]
        ];
    }
);
```

## Advanced Components

### Schema Components

Schema components define the permissions available to a Craft user building a schema. Once a schema is established, its permission set determines the scope available for a given token.

#### Registering Schema Components

```php
use craft\events\RegisterGqlSchemaComponentsEvent;
use craft\services\Gql;
use yii\base\Event;

Event::on(
    Gql::class,
    Gql::EVENT_REGISTER_GQL_SCHEMA_COMPONENTS,
    function(RegisterGqlSchemaComponentsEvent $event) {
        $event->queries = array_merge($event->queries, [
            'Widgets' => [
                'myCustomElement:read' => ['label' => 'View Widgets']
            ],
        ]);
    }
);
```

### Eager Loading

### Argument Handlers

### Complexity Values

GraphQL complexity values are numeric scores assigned to fields that indicate how much processing power will be needed to return a result.

### Validation Rules

#### Registering Validation Rules

```php
use craft\events\DefineGqlValidationRulesEvent;
use craft\services\Gql;
use yii\base\Event;
use GraphQL\Type\Definition\Type;
use GraphQL\Validator\Rules\DisableIntrospection;

Event::on(
    Gql::class,
    Gql::::EVENT_DEFINE_GQL_VALIDATION_RULES,
    function (DefineGqlValidationRulesEvent $event) {
        // Permanently disable introspection.
        $event->validationRules[DisableIntrospection::class] = new DisableIntrospection();
    }
);
```

## Examples

### GraphQL for Elements

See Craftnet Partners.

### GraphQL for Field Types

TODO: include example

