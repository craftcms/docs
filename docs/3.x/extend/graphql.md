# Extending GraphQL

Craft’s full-featured GraphQL implementation allows developers to include GraphQL data and permissions for custom plugins and modules.

If you’ve created a custom element or field type, chances are you’ll want to make its data available via the GraphQL API.

## Overview

Unlike Craft’s element queries that are built on the fly, the GraphQL schema needs to define every possible query and data type up front. The nature of these API differences, combined with Craft’s flexible content modeling, mean the greatest challenge for your custom implementation is likely to planning rather than the mechanics of making it happen.

Important questions to consider:

1. What kinds of data do you need to expose, and how complex is each?\
(Are there nested objects or multiple types? Will you need to support eager loading?)
2. What sort of arguments, if any, do you need to make available for narrowing your result set?
3. Should this data be available in the public schema, or will you need to add and honor schema permissions?
4. Is your data read-only or should it be writable via mutations?

::: tip
If you’re not already familiar with GraphQL terminology and the [webonyx/graphql-php](https://github.com/webonyx/graphql-php) library Craft uses, take care to keep Craft and GraphQL terminology separate; there are overlapping terms that can be confusing. It helps to pay careful attention to namespacing when looking at code examples.
:::

## GraphQL Basics

Let’s look at each of the main things you may need to work with.

### Gql Service

The <craft3:craft\services\Gql> class offers methods mostly for managing schemas and tokens and executing queries, so you won’t likely need to do much with it if you’re primarily exposing data to GraphQL. The Gql class does, however, define and trigger each of the events you’ll need to hook into in order to register the pieces described above.

### Queries

Queries are the top-level starting points someone will use fetching information from the GraphQL API. Craft includes query definitions for `entries` and `entry`, for example, and Craft Commerce adds its own custom queries for `product` and `products`.

A Query class provides one or more query names, each describing a GraphQL type it will return, any arguments that can be used to tailor results, and pointing to a resolver that will be responsible for translating the GraphQL query into equivalent logic with Craft’s APIs.

TODO: include example

### Types

Not to be confused with entry types, GraphQL types are the all-important and specific descriptions of the kinds of data the API represents. Every single type must exhaustively describe what it contains—including any nested types—and every type in the GraphQL schema must be unique.

Every available part of Craft’s content model, and every kind of data your custom plugin or module needs to make available via GraphQL, needs to be translated into an explicitly-named GraphQL type.

Craft’s <craft3:craft\gql\GqlEntityRegistry> keeps track of types that are registered, and you’ll use it to fetch, modify, and set these GraphQL types.

TODO: include example

### Mutations

A Mutation class defines named mutations that should be available, including consideration for permissions, each one including arguments, a type, and a mutation resolver responsible for modifying data using Craft’s APIs.

input objects

TODO: include example

### Directives

Directives return types that can be used to transform result data in specified locations relative to the GraphQL query.

Craft’s included directives apply exclusively to requested fields, though they may be applied in mutations and numerous parts of the type system.

### Generators

Craft includes the concept of type generators that are crucial for dynamically generating the complex types necessary for entry types, Matrix fields, and other content structures with the ability to have many specific contexts that each need a unique type definition.

### Schema Components

Schema components define the permissions available to a Craft user building a schema. Once a schema is established, its permission set determines the scope available for a given token.

### Argument Handlers

### Eager Loading

### Complexity Values

GraphQL complexity values are numeric scores assigned to fields that indicate how much processing power will be needed to return a result. These are factored into how a query is cached and executed, and it’s important to designate appropriate complexity values where complex, multi-relational queries or CPU-heavy tasks like image transformation are involved.

### Validation Rules

## Registering Components

### Types

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

### Queries

```php
use craft\events\RegisterGqlQueriesEvent;
use craft\services\Gql;
use yii\base\Event;
use MyGqlElementQueries;

Event::on(
    Gql::class,
    Gql::EVENT_REGISTER_GQL_QUERIES,
    function(RegisterGqlQueriesEvent $event) {
        $event->queries[] = MyGqlElementQueries::class;
    }
);
```

### Schema Components

```php
use craft\events\RegisterGqlSchemaComponentsEvent;
use craft\services\Gql;
use yii\base\Event;

Event::on(
    Gql::class,
    Gql::EVENT_REGISTER_GQL_SCHEMA_COMPONENTS,
    function(RegisterGqlSchemaComponentsEvent $event) {
        $event->queries = array_merge($event->queries, [
            'My Custom Element' => [
                'myCustomElement:read' => ['label' => 'View My Custom Element']
            ],
        ]);
    }
);
```

### Mutations

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

### Directives

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

### Validation Rules

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

## GraphQL for Elements

See Craftnet Partners.

## GraphQL for Field Types

TODO: include example

## Modifying Queries Before or After Execution

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


