# Extending GraphQL

Developers can use Craft’s [GraphQL implementation](../graphql.md) to provide their own GraphQL data and access level for custom plugins and modules.

If you’ve created a custom element or field type, chances are you’ll want to make its data available via the GraphQL API.

## Overview

Unlike Craft’s element queries that are built on the fly, a GraphQL schema needs to define every possible query and data type up front.

This fundamental difference between Craft and GraphQL APIs, combined with Craft’s flexible content modeling, means _mapping out_ your custom implementation will probably take more effort than writing the code to make it happen.

Important questions to consider:

1. What kinds of data do you need to expose, and how complex is each?\
(Are there nested objects or multiple types? Will you need to support eager loading?)
2. What sort of arguments, if any, do you need to make available for narrowing your result set?
3. Should this data be available in the public schema, or will you need to add and honor schema “permissions”?

Craft relies on the [webonyx/graphql-php](https://github.com/webonyx/graphql-php) library and we’ll assume you’ve familiarized yourself with [GraphQL basics](https://graphql.org/learn/). It’s worth taking a look at each if you haven’t already.

::: tip
Be mindful of Craft vs. GraphQL terminology, because there are overlapping terms that can be confusing. It helps to pay careful attention to namespacing when looking at code examples.
:::

The rest of this page will cover each of the main things you may need to work with. If you’d like some concrete examples, have a look at Craft’s own pieces in the [`src/gql/` directory](https://github.com/craftcms/cms/tree/main/src/gql).

### Limitations

If you’re planning advanced or elaborate GraphQL features, please be aware of the following limitations with Craft’s GraphQL implementation:

- GraphQL subscriptions aren’t currently supported.
- Advanced query builder functions [are not exposed for GraphQL](https://github.com/craftcms/cms/issues/7842).

## Folder Structure

Here’s a high-level look at the folder structure we’ll explore in our example adding a “Widget” element. You can structure things however you want, we’re just following [Craft’s organization](https://github.com/craftcms/cms/tree/main/src/gql):

```treeview
src/gql/
├── arguments/
│   └── elements/
│       └── Widget.php
├── directives/
│   └── BarTheFoo.php
├── interfaces/
│   └── elements/
│       └── Widget.php
├── mutations/
│   └── Widget.php
├── queries/
│   └── Widget.php
├── resolvers/
│   └── elements/
│       └── Widget.php
│   └── mutations/
│       └── Widget.php
└── types/
    ├── elements/
    │    └── Widget.php
    ├── generators/
    │   └── WidgetType.php
    └── input/
        └── Widget.php
```

## The Gql Service

The <craft3:craft\services\Gql> class offers methods mostly for managing schemas and tokens and executing queries, so you won’t need to do much with it if you’re primarily exposing data to GraphQL. The Gql class does, however, define and trigger the events you’ll use to register any components you’d like to add to the system. (We’ll get to those in a moment.)

### Modifying Queries Before or After Execution

The Gql service includes events you can use to modfiy [queries](#queries) before and after they’re executed.

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

Queries are the top-level starting points someone will use fetching data from the GraphQL API. Craft includes query definitions for `entries` and `entry`, for example, and Craft Commerce adds its own custom queries for `products` and `product`.

Imagine we’ve added a custom element type for “Widgets”.

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

This example provides a `widgets` query that returns an array of custom [interfaces](#interfaces), optionally filtered by custom [arguments](#arguments). The [resolver](#resolvers) describes how to provide data for each interface.

```php
namespace mynamespace\gql\queries;

use GraphQL\Type\Definition\Type;
use mynamespace\helpers\Gql as GqlHelper;
use mynamespace\gql\interfaces\elements\Widget as WidgetInterface;
use mynamespace\gql\arguments\elements\Widget as WidgetArguments;
use mynamespace\gql\resolvers\elements\Widget as WidgetResolver;

class Widget extends \craft\gql\base\Query
{
    public static function getQueries($checkToken = true): array
    {
        // Make sure the current token’s schema allows querying widgets
        if ($checkToken && !GqlHelper::canQueryWidgets()) {
            return [];
        }

        // Provide one or more query definitions
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
        $event->queries = array_merge(
            $event->queries,
            Widget::getQueries()
        );
    }
);
```

## Arguments

A [query](#queries) can support any number of arguments someone can use to filter results.

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

use GraphQL\Type\Definition\Type;

class Widget extends craft\gql\base\ElementArguments
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
        ]);
    }
}
```

::: tip
This example extends <craft3:craft\gql\base\ElementArguments> in order to take advantage of common element arguments for free. It’s fine if you don’t have your own element type or even a class for arguments; you ultimately just need to provide an array of argument definitions for your queries if you want to use them.
:::

## Types

Not to be confused with Craft’s entry types, GraphQL types are the vital and specific descriptions of whatever the API can return.

::: tip
GraphQL is a _type system_, and if you’re not already familiar we recommend reading about its [schema and types](https://graphql.org/learn/schema/) for context.
:::

Each type must exhaustively describe what it contains—including any nested types—and every type in the GraphQL schema must be unique.

Everything has a `__typename`:

::: code
```graphql GraphQL Query
{
  __typename
  entry {
    __typename
  }
  user {
    __typename
  }
  widget {
    __typename
  }
}
```
```json JSON Response
{
  "data": {
    "__typename": "Query",
    "entry": {
      "__typename": "blog_blog_Entry"
    },
    "user": {
      "__typename": "User"
    },
    "widget": {
      "__typename": "Widget"
    }
  }
}
```
:::

Every available part of Craft’s content model, and every kind of data your custom plugin or module needs to expose via GraphQL, needs to be translated into an explicitly-named GraphQL type.

Craft’s <craft3:craft\gql\GqlEntityRegistry> keeps track of these GraphQL types, and you’ll use it to add, fetch, and modify them.

When adding fields to a given type, you should run them through <craft3:craft\gql\TypeManager::prepareFieldDefinitions()>. This makes it possible for others to programmatically [modify type fields](#modifying-type-fields) you’re introducing.

### Scalar Types

Pay special attention to the [GraphQL\Type\Definition\Type](https://github.com/webonyx/graphql-php/blob/master/src/Type/Definition/Type.php) class, which you’ll probably want to use for returning scalar types:

- `GraphQL\Type\Definition\Type::id()` is used to represent the GraphQL’s `ID` type.
- `GraphQL\Type\Definition\Type::string()` is used to represent the GraphQL’s `String` type.
- `GraphQL\Type\Definition\Type::boolean()` is used to represent the GraphQL’s `Boolean` type.
- `GraphQL\Type\Definition\Type::int()` is used to represent the GraphQL’s `Int` type.
- `GraphQL\Type\Definition\Type::float()` is used to represent the GraphQL’s `Float` type.
- `craft\gql\types\QueryArgument::getType()` is used to specify an integer, string, or boolean value. (It’s a catch-all for query methods that accept a variety of types like `2`, `['not', 2]`, `'handle'`, `false`, etc.)
- `craft\gql\types\DateTime::getType()` is used to specify a point in time.
- `craft\gql\types\Number::getType()` is used to specify a number than can be either an integer or a float. It can also be `null`.

::: tip
For consistency, use the `ID` type—not `Int`—when you’re returning IDs. The `ID` type serializes to a string rather than an integer.
:::

### Utility Types

You can specify a non-null value by wrapping it with the `\GraphQL\Type\Definition\Type::nonNull()` method.

To specify a list of types, you must wrap the type with the `\GraphQL\Type\Definition\Type::listOf()` method.

### Input Types

In addition to simple generic scalar values like strings and integers, you’ll probably want to describe more specific, complex data.

Craft includes several scalar input types like [DateTime](craft3:craft\gql\types\DateTime), [Number](craft3:craft\gql\types\Number), and [TableRow](craft3:craft\gql\types\TableRow).

Craft also includes more complex, relational input objects:

- [Asset](craft3:craft\gql\types\input\criteria\Asset)
- [Category](craft3:craft\gql\types\input\criteria\Category)
- [Entry](craft3:craft\gql\types\input\criteria\Entry)
- [Tag](craft3:craft\gql\types\input\criteria\Tag)
- [User](craft3:craft\gql\types\input\criteria\User)
- [File](craft3:craft\gql\types\input\File)
- [Matrix](craft3:craft\gql\types\input\Matrix)

You can use any of these in your type definitions, i.e. `DateTime::getType()` or `Asset::getType()`.

### Example Element Type

::: tip
“Element Type” in this context refers to the GraphQL type for our custom element, as opposed to Craft’s concept of [Element Types](./element-types.md) that are not GraphQL-specific.
:::

A custom element like our Widget would probably best be described by two classes: an [interface](#interfaces) and a type class that implements it.

The type class for the element is simple: it declares its interface—which we’ll get to in a moment—and otherwise leans on <craft3:craft\gql\types\elements\Element::resolve()>, which you could further customize in a more complex situation.

```php
namespace mynamespace\gql\types\elements;

use mynamespace\gql\interfaces\elements\Widget as WidgetInterface;

class Widget extends \craft\gql\types\elements\Element
{
    public function __construct(array $config)
    {
        $config['interfaces'] = [
            WidgetInterface::getType(),
        ];

        parent::__construct($config);
    }
}
```

While there are many GraphQL types you could implement, your custom objects will most likely want to provide interfaces that describe data models and input types for any [mutations](#mutations).

### Registering Types

The Gql service includes a `registerGqlTypes` event you can use to register your types.

Here we’re registering the `Widget` interface we just looked at above. While you’re not limited to adding interfaces, any class you add must have a `getType()` method that returns a valid GraphQL type definition.

```php
use craft\events\RegisterGqlTypesEvent;
use craft\services\Gql;
use yii\base\Event;
use mynamespace\gql\interfaces\elements\Widget as WidgetInterface;

Event::on(
    Gql::class,
    Gql::EVENT_REGISTER_GQL_TYPES,
    function(RegisterGqlTypesEvent $event) {
        $event->types[] = WidgetInterface::class;
    }
);
```

### Modifying Type Fields

Craft’s <craft3:craft\gql\TypeManager> includes a `defineGqlTypeFields` event you can use to add, remove or modify fields on any GraphQL type.

Below we’re removing IDs throughout the schema in favor of UIDs, and adding an `authorEmail` field to the entry interface:

```php
use craft\events\DefineGqlTypeFields;
use craft\gql\TypeManager;
use yii\base\Event;

Event::on(
    TypeManager::class,
    TypeManager::EVENT_DEFINE_GQL_TYPE_FIELDS,
    function(DefineGqlTypeFieldsEvent $event) {
        // Remove all ids to enforce use of uids
        unset($event->fields['id']);

        // Add author email to all entries
        if ($event->typeName == 'EntryInterface') {
            $event->fields['authorEmail'] = [
                'name' => 'authorEmail',
                'type' => Type::string(),
                'resolve' => function($source, $arguments, $context, $resolveInfo) {
                    // Illustrative only; a query per entry would perform poorly
                    return $source->getAuthor()->email;
                }
            ];
        }
    }
);
```

## Interfaces

Just like PHP interfaces, GraphQL interfaces are abstract types that describe the fields a type must implement.

![Screenshot of EntryInterface in GraphiQL’s documentation sidebar](../images/graphiql-entry-interface.png)

You don’t have to use interfaces, but they’re a nice way of formalizing the fields exposed by your type. Craft provides GraphQL interfaces for each included element type:

- <craft3:craft\gql\interfaces\Element>
- <craft3:craft\gql\interfaces\Structure>
- <craft3:craft\gql\interfaces\elements\Asset>
- <craft3:craft\gql\interfaces\elements\Category>
- <craft3:craft\gql\interfaces\elements\Entry>
- <craft3:craft\gql\interfaces\elements\GlobalSet>
- <craft3:craft\gql\interfaces\elements\MatrixBlock>
- <craft3:craft\gql\interfaces\elements\Tag>
- <craft3:craft\gql\interfaces\elements\User>

### Example Interface

This example extends Craft’s element GraphQL interface.

It does this in order to define a single GraphQL type for our custom Widget element that adds a custom `approved` field:

```php
namespace mynamespace\gql\interfaces\elements;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InterfaceType;
use craft\gql\GqlEntityRegistry;

class Widget extends \craft\gql\interfaces\Element
{
    public static function getName(): string
    {
        return 'WidgetInterface';
    }

    public static function getType($fields = null): Type
    {
        // Return the type if it’s already been created
        if ($type = GqlEntityRegistry::getEntity(self::getName())) {
            return $type;
        }

        // Otherwise create the type via the entity registry, which handles prefixing
        return GqlEntityRegistry::createEntity(self::getName(), new InterfaceType([
            'name' => static::getName(),
            'fields' => self::class . '::getFieldDefinitions',
            'description' => 'This is the interface implemented by all widgets.',
            'resolveType' => self::class . '::resolveElementTypeName',
        ]));
    }

    public static function getFieldDefinitions(): array
    {
        // Add our custom widget’s field to common ones for all elements
        return TypeManager::prepareFieldDefinitions(array_merge(
            parent::getFieldDefinitions(),
            [
                'approved' => [
                    'name' => 'approved',
                    'type' => Type::boolean(),
                    'description' => 'Whether the widget is approved.'
                ],
            ]
        ), self::getName());
    }
}
```

## Resolvers

A resolver is responsible for mapping a GraphQL API field to its Craft API equivalent.

You won’t see or interact with a resolver querying the GraphQL API because the resolver works behind the scenes to connect the query or mutation to the value it’s supposed to return.

### Example Resolver Class

This example resolver extends the base [ElementResolver](craft3:craft\gql\base\ElementResolver) and implements a single [prepareQuery()](craft3:craft\gql\base\ElementResolver::prepareQuery()) method whose job is to return an element query:

```php
namespace mynamespace\gql\resolvers\elements;

use mynamespace\elements\Widget as WidgetElement;
use mynamespace\helpers\Gql as GqlHelper;

class Widget extends \craft\gql\base\ElementResolver
{
    public static function prepareQuery($source, array $arguments, $fieldName = null)
    {
        if ($source === null) {
            // If this is the beginning of a resolver chain, start fresh
            $query = WidgetElement::find();
        } else {
            // If not, get the prepared element query
            $query = $source->$fieldName;
        }

        // Return the query if it’s preloaded
        if (is_array($query)) {
            return $query;
        }

        foreach ($arguments as $key => $value) {
            if (method_exists($query, $key)) {
                $query->$key($value);
            } elseif (property_exists($query, $key)) {
                $query->$key = $value;
            } else {
                // Catch custom field queries
                $query->$key($value);
            }
        }

        // Don’t return anything that’s not allowed
        if (!GqlHelper::canQueryWidgets()) {
            return [];
        }

        return $query;
    }
}
```

If this wasn’t a custom element type, we’d need a class to extend <craft3:craft\gql\base\Resolver> instead, implementing a [resolve()](craft3:craft\gql\base\Resolver::resolve()) method to return the field’s value rather than translating it into an element query.

The handling of `$source` here is important, because `prepareQuery()` may be called at different points in the request flow depending on exactly where `WidgetField` is accessed. `$source` will only have a `null` value if `WidgetField` is accessed at the top level of the query, and once populated `$fieldName` will either contain an array of `Widget` objects (if eager loading) or a prepped element query for returning `Widget` objects from the database.

## Generators

Craft introduces the concept of generators to bridge the gap between a complex content model and a GraphQL schema that needs to detail every potential type of content.

In the [example interface](#example-interface) above, we kept things simple by adding only one GraphQL type to the schema. In other words, our widget only comes in one “flavor.” If the data you’re representing only appears in one form, that may work great!

It’s common in Craft, however, for elements to have multiple types: entries have sections and entry types, assets have volumes, categories have groups, and so on. The site developer can create however many of these flavors they’d like, and yet we still need each one to be accounted for in the GraphQL schema. This is exactly the situation generators help with.

![Diagram of single- vs. multi-type element](../images/gql-type-generator.png =550x550)

Like the name implies, a generator can dynamically create GraphQL types based on whatever _contexts_ are needed. The generator needs to know about the unique scopes in which an element may appear for each unique flavor or context.

For example:

- An Asset’s context is its volume: `volumes.[UID]`
- A category’s context is its category group: `categorygroups.[UID]`
- An entry’s context is its entry type, and it has an additional section context: \
`sections.[section UID]`, `entrytypes.[UID]`

You can use your custom element’s <craft3:craft\base\Element::gqlScopesByContext()> method to declare its context-specific scopes. That’s exactly where Craft’s elements are defining those contexts in the list above:

- <craft3:craft\elements\Asset::gqlScopesByContext()>
- <craft3:craft\elements\Category::gqlScopesByContext()>
- <craft3:craft\elements\Entry::gqlScopesByContext()>
- <craft3:craft\elements\GlobalSet::gqlScopesByContext()>
- <craft3:craft\elements\MatrixBlock::gqlScopesByContext()>
- <craft3:craft\elements\Tag::gqlScopesByContext()>
- <craft3:craft\elements\User::gqlScopesByContext()>

If you’ll benefit from using a generator, you will need to write a class that extends <craft3:craft\gql\base\Generator> and implements <craft3:craft\gql\base\GeneratorInterface> and <craft3:craft\gql\base\SingleGeneratorInterface>.

The base Generator provides a `getContentFields()` method that gets custom fields for a given context, while the interfaces require `generateTypes()` and `generateType()` respectively—responsible for registering types based on the provided context.

### Example Generator Classes

Our single-flavor widget wouldn’t actually need to generate multiple types since it only has one context. It wouldn’t need a generator class, so just for illustration a single-type generator could look like this:

```php
namespace mynamespace\gql\types\generators;

use mynamespace\elements\Widget as WidgetElement;
use mynamespace\gql\types\elements\Widget;
use mynamespace\gql\interfaces\elements\Widget as WidgetInterface;
use craft\gql\base\GeneratorInterface;
use craft\gql\GqlEntityRegistry;
use craft\gql\TypeManager;

class WidgetType implements GeneratorInterface
{
    public static function generateTypes($context = null): array
    {
        // Widgets have no context
        $type = static::generateType($context);
        return [$type->name => $type];
    }

    public static function generateType($context): ObjectType
    {
        $pluginType = new WidgetElement();
        $typeName = $pluginType->getGqlTypeName();
        $widgetFields = TypeManager::prepareFieldDefinitions(
            WidgetInterface::getFieldDefinitions(),
            $typeName
        );

        // Return the type if it exists, otherwise create and return it
        return GqlEntityRegistry::getEntity($typeName) ?:
            GqlEntityRegistry::createEntity(
                $typeName,
                new Widget([
                    'name' => $typeName,
                    'fields' => function() use ($widgetFields) {
                        return $widgetFields;
                    },
                ])
            );
    }
}
```

::: tip
We’re assuming `mynamespace\elements\Widget` was an existing [element class](element-types.md#element-class).
:::

Now let’s spice things up and pretend our widgets come in multiple flavors, each one having custom field layouts—similar to Craft’s entry types.

We can think of each “flavor” as a context that widget might appear in, and use the generator to dynamically create a type for each context.

This example pretends a `getAllWidgetTypes()` method can give us back all the contexts we need to handle, then loops through them to generate an array of GraphQL types. The `generateTypes()` method does the work of determining which types we need, handing each one off to `generateType()` in order to get a context-specific GraphQL type definition:

```php
namespace mynamespace\gql\types\generators;

use mynamespace\Plugin;
use mynamespace\elements\Widget as WidgetElement;
use mynamespace\gql\types\elements\Widget;
use mynamespace\gql\interfaces\elements\Widget as WidgetInterface;
use mynamespace\helpers\Gql as MyGqlHelper;
use craft\gql\base\GeneratorInterface;
use craft\gql\GqlEntityRegistry;
use craft\gql\TypeManager;

class WidgetType implements GeneratorInterface
{
    public static function generateTypes($context = null): array
    {
        // Fetch all our pretend widget types to be used as contexts
        $widgetTypes = Plugin::getInstance()->getAllWidgetTypes();
        $gqlTypes = [];

        foreach ($widgetTypes as $widgetType) {
            // Get relevant scopes that may limit schema access
            $requiredContexts = WidgetElement::gqlScopesByContext($widgetType);

            // Ignore this widget variation if the schema doesn’t include it
            if (!MyGqlHelper::isSchemaAwareOf($requiredContexts)) {
                continue;
            }

            // Generate a GQL type for this widget type
            $type = static::generateType($widgetType);
            $gqlTypes[$type->name] = $type;
        }

        return $gqlTypes;
    }

    public static function generateType($context): ObjectType
    {
        // Get the intended GQL type name as determined by the element type
        $typeName = WidgetElement::gqlTypeNameByContext($context);

        // Get element’s user-defined content fields and
        $contentFieldGqlTypes = self::getContentFields($context);

        // Merge in GQL types for the widget element’s own custom fields
        $widgetFields = TypeManager::prepareFieldDefinitions(
            array_merge(
                WidgetInterface::getFieldDefinitions(),
                $contentFieldGqlTypes
            ),
            $typeName
        );

        // Return the type if it exists, otherwise create and return it
        return GqlEntityRegistry::getEntity($typeName) ?:
            GqlEntityRegistry::createEntity(
                $typeName,
                new Widget([
                    'name' => $typeName,
                    'fields' => function() use ($widgetFields) {
                        return $widgetFields;
                    },
                ])
            );
    }
}
```

The term “context” here is deliberately vague because you’re the one that decides what that should be.

Since Craft elements and field types are integral to the GraphQL API, their base classes include methods for describing their type names:

- <craft3:craft\base\Element::getGqlTypeName()>
- <craft3:craft\base\Element::gqlTypeNameByContext()>
- <craft3:craft\base\Field::getContentGqlType()>

These include sensible defaults since Craft can make some assumptions about how elements and fields will be used.

::: tip
A field can also use <craft3:craft\base\Field::includeInGqlSchema()>—`true` by default—to determine whether it should appear in a given schema.
:::

## Directives

Directives return types that can be used to transform result data in specified locations relative to the GraphQL query.

They’re invoked after Craft has returned everything to satisfy the query, so they can only manipulate results—not influence what’s returned in the first place.

The [`formatDateTime` directive](../graphql.md#the-formatdatetime-directive), for example, can be used to return any date in a specific format:

```graphql{3}
{
  widgets {
    dateCreated @formatDateTime (format: "Y-m-d")
  }
}
```

Craft’s included directives apply exclusively to requested fields, though they may be applied in mutations and numerous parts of the type system.

A directive needs to provide a name, description, and the relevant query location(s) it can be applied. It can optionally specify [arguments](#arguments).

### Example Directive Class

This simple example returns the field value, replacing any instances of `foo` with `bar`.

```php
namespace mynamespace\gql\directives;

use craft\gql\base\Directive;
use craft\gql\GqlEntityRegistry;
use GraphQL\Type\Definition\Directive as GqlDirective;

class BarTheFoo extends Directive
{

    public static function create(): GqlDirective
    {
        if ($type = GqlEntityRegistry::getEntity(self::name())) {
            return $type;
        }

        $type = GqlEntityRegistry::createEntity(static::name(), new self([
            'name' => static::name(),
            'locations' => [
                DirectiveLocation::FIELD,
            ],
            'description' => 'Replace `foo` with `bar`.',
            'args' => [],
        ]));

        return $type;
    }

    public static function name(): string
    {
        return 'fooTheBar';
    }

    public static function apply($source, $value, array $arguments, ResolveInfo $resolveInfo)
    {
        return str_replace('foo', 'bar', (string)$value);
    }
}
```

### Registering Directives

You can register your directive by appending its class name to the `directives` array on the [registerGqlDirectives](craft3:craft\services\Gql::EVENT_REGISTER_GQL_DIRECTIVES) event object:

```php
use mynamespace\gql\directives\BarTheFoo;
use craft\events\RegisterGqlDirectivesEvent;
use craft\services\Gql;
use yii\base\Event;

Event::on(
    Gql::class,
    Gql::EVENT_REGISTER_GQL_DIRECTIVES,
    function(RegisterGqlDirectivesEvent $event) {
        $event->directives[] = BarTheFoo::class;
    }
);
```

## Mutations

A Mutation class defines named mutations that should be available, including consideration for scope access. Each mutation can have its own [arguments](#arguments) and type, and it will need a mutation resolver for modifying data using Craft’s API.

Our example could provide a `createWidget` mutation for creating a new widget:

::: code
```graphql{2} GraphQL Query
mutation NewWidget($title: String) {
  createWidget(title: $title) {
    id
    title
  }
}

# query variables:
# {
#  "title": "My Glorious Mutated Widget",
# }
```
```json JSON Response
{
  "data": {
    "createWidget": {
        "id": "123",
        "title": "My Glorious Mutated Widget"
    }
}
```
:::

::: tip
Like the name-getting methods mentioned earlier, Craft’s base elements include a <craft3:craft\base\Element::gqlMutationNameByContext()> method for providing context-sensitive type names.
:::

### Input Type Value Normalizers

Craft supports an additional `'normalizeValue'` option for [input object types](#input-types) that can be used to prep validated mutation data before it’s passed on to be saved by the [resolver](#resolvers).

This can be useful, for example, if you want to accept GraphQL arguments in one form (like strings) that Craft will expect in another (like IDs).

If you provide a `'normalizeValue'` key in your type definition, the value must be a method that receives the field value, does whatever it needs with that value, and returns it.

### Example Mutation Class

Similar to the [queries](#queries) example, this class implements `getMutations()` to return a list of available mutations. The mutation definition has a name, description, type, arguments, and a resolver:

```php
namespace mynamespace\gql\mutations;

use mynamespace\helpers\Gql as GqlHelper;
use mynamespace\gql\interfaces\Widget;
use mynamespace\gql\resolvers\mutations\Widget as WidgetMutationResolver;
use craft\gql\base\Mutation;
use GraphQL\Type\Definition\Type;

class Widget extends Mutation
{
    public static function getMutations(): array
    {
        // Make sure we should be able to mutate widgets
        if (!GqlHelper::canMutateWidgets()) {
            return [];
        }

        $mutations = [];

        // Create an instance of our mutation resolver
        $resolver = Craft::createObject(WidgetMutationResolver::class);

        if (GqlHelper::canSchema('widget', 'edit')) {
            // Create a new widget
            $mutations['createWidget'] = [
                'name' => 'createWidget',
                'args' => [
                    'title' => Type::nonNull(Type::string())
                ],
                'resolve' => [$resolver, 'saveWidget'],
                'description' => 'Saves a new widget.',
                'type' => Widget::getType(),
            ];
        }

        if (GqlHelper::canSchema('widget', 'save')) {
            // Save an existing widget
            // ...
        }

        if (GqlHelper::canSchema('widget', 'delete')) {
            // Delete a widget
            // ...
        }

        return $mutations;
    }
}
```

### Example Mutation Resolver

We saw earlier how a [resolver](#resolvers) translates the GraphQL request to data Craft can return. We’ll need a separate resolver that can translate the GraphQL mutation into data Craft saves.

```php
namespace mynamespace\gql\resolvers\mutations;

use mynamespace\elements\Widget as WidgetElement;
use craft\gql\base\ElementMutationResolver;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Error\UserError;
use Craft;

class Widget extends ElementMutationResolver
{
    protected $immutableAttributes = ['id', 'uid'];

    public function saveWidget($source, array $arguments, $context, ResolveInfo $resolveInfo)
    {
        $this->requireSchemaAction('widget', 'edit');

        $elementService = Craft::$app->getElements();
        $widget = $elementService->createElement(WidgetElement::class);
        // Have Craft populate the element’s content
        $widget = $this->populateElementWithData($widget, $arguments);
        // Always set our custom approved field to false for mutations
        $widget->approved = false;
        // Save the new element
        $widget = $this->saveElement($widget);

        if ($widget->hasErrors()) {
            $validationErrors = [];

            foreach ($widget->getFirstErrors() as $attribute => $errorMessage) {
                $validationErrors[] = $errorMessage;
            }
            
            // Throw a UserError with validation messages if we can’t save
            throw new UserError(implode("\n", $validationErrors));
        }

        // Return the newly-saved element
        return $elementService->getElementById($widget->id, WidgetElement::class);
    }
}
```

### Registering Mutations

You can register your mutation by including its definitions to the `mutations` array on the [registerGqlMutations](craft3:craft\services\Gql::EVENT_REGISTER_GQL_MUTATIONS) event object:


```php
use mynamespace\gql\resolvers\mutations\Widget as WidgetMutations;
use craft\events\RegisterGqlMutationsEvent;
use craft\services\Gql;
use GraphQL\Type\Definition\Type;
use yii\base\Event;

Event::on(
    Gql::class,
    Gql::EVENT_REGISTER_GQL_MUTATIONS,
    function(RegisterGqlMutationsEvent $event) {
        $event->mutations = array_merge(
            $event->mutations,
            WidgetMutations::getMutations(),
        );
    }
);
```

## Advanced Components

### Schema Components

Schema components define the distinct parts that can be enabled in Craft’s GraphQL schemas:

![Schema components in the Craft control panel](../images/control-panel-schema-components.png)

While these look like GraphQL permissions, the configuration of these components directly determines how a schema is built—not simply whether something has access to a part of the schema.

How you label, organize, and enforce your schema components is entirely up to you.

::: warning
If your GraphQL implementation doesn’t add and honor these settings, your types will be available by default to the public schema. Once you register schema components and check for them in your code, they’ll only be available for each schema in which they’re explicitly enabled.
:::

Each component’s key may include an applicable action scope in `:action` format. So the `widget` component having a `read` action would be `widget:read`.

The default action is `read`, and the available actions are:

- `read`
- `edit`
- `save`

If you provide explicit schema components, you a `:read` action is required.

::: danger
You must honor whatever components you register; this is not done by default!
:::

#### Registering Schema Components

The Gql service provides a [registerGqlSchemaComponents](craft3:craft\services\Gql::EVENT_REGISTER_GQL_SCHEMA_COMPONENTS) event you can use to append your own schema components to the event object’s `queries` and/or `mutations` arrays:

```php
use craft\events\RegisterGqlSchemaComponentsEvent;
use craft\services\Gql;
use yii\base\Event;

Event::on(
    Gql::class,
    Gql::EVENT_REGISTER_GQL_SCHEMA_COMPONENTS,
    function(RegisterGqlSchemaComponentsEvent $event) {
        $event->queries = array_merge($event->queries, [
            // “Widgets” group
            'Widgets' => [
                // widget component with read action, labelled “View Widgets” in UI
                'widget:read' => ['label' => 'View Widgets']
            ],
        ]);

        // Same format applies for $event->mutations
    }
);
```

If you’d like to further specify individual types, you can append each relevant UID in the key:

```php
use mynamespace\Plugin;
use craft\events\RegisterGqlSchemaComponentsEvent;
use craft\services\Gql;
use yii\base\Event;

Event::on(
    Gql::class,
    Gql::EVENT_REGISTER_GQL_SCHEMA_COMPONENTS,
    function(RegisterGqlSchemaComponentsEvent $event) {
        // Assume an array of objects each having `uid` and `name` properties
        $widgetTypes = Plugin::getInstance()->getAllWidgetTypes();

        if (!empty($widgetTypes)) {
            $queryComponents = [];

            foreach ($widgetTypes as $widgetType) {
                $queryComponents['widget.' . $widgetType->uid . ':read'] = [
                    'label' => 'View Widgets – ' . $widgetType->name
                ];
            }
        }

        $event->queries = array_merge($event->queries, [
            // “Widgets” group
            'Widgets' => $queryComponents,
        ]);
    }
);
```

### Eager Loading

If you’re adding relational fields that would benefit from eager loading, you’ll want to register those by adding them to the `fieldList` array on the [registerGqlEagerLoadableFields](craft3:craft\gql\ElementQueryConditionBuilder::EVENT_REGISTER_GQL_EAGERLOADABLE_FIELDS) event object.

::: tip
Any fields you add using Craft’s stock GraphQL types do _not_ need to be registered for eager loading.
:::

If we had added a custom field with the handle `widgets`, we’d register it like this:

```php
use mynamespace\fields\Widgets;
use craft\gql\ElementQueryConditionBuilder;
use craft\events\RegisterGqlEagerLoadableFields;
use yii\base\Event;

Event::on(
    ElementQueryConditionBuilder::class,
    ElementQueryConditionBuilder::EVENT_REGISTER_GQL_EAGERLOADABLE_FIELDS,
    function(RegisterGqlEagerLoadableFields $event) {
        $event->fieldList['widgets'] = [Widgets::class];
    }
);
```

The key should be the field name, and the value can be one or more classes that define it.

Any classes you provide determine the context for that field to be eager-loadable. You may otherwise pass `*` which, if present, allows that field to be used and eager loaded anywhere at all:

```php
// ...
$event->fieldList['widgets'] = ['*'];
// ...
```

::: tip
Craft makes use of an additional `canBeAliased` option internally, `true` by default and set to `false` in some specific situations—but you shouldn’t ever need to use that.
:::

### Argument Handlers

Argument handlers are another Craft-specific concept. These are like the inverse of directives, used for pre-processing an argument’s value before a query is executed.

#### Example Argument Handler Class

This example class extends [RelationArgumentHandler](craft3:craft\gql\base\RelationArgumentHandler) to translate a `relatedToWidgets` argument into a query argument for our Widget IDs:

```php
namespace mynamespace\gql\argumenthandlers;

use mynamespace\elements\Widget;
use craft\gql\base\RelationArgumentHandler;

class RelatedWidgets extends RelationArgumentHandler
{
    protected $argumentName = 'relatedToWidgets';

    protected function handleArgument($argumentValue)
    {
        $argumentValue = parent::handleArgument($argumentValue);
        return $this->getIds(Widget::class, $argumentValue);
    }
}
```

#### Registering Argument Handlers

Add a listener for [defineGqlArgumentHandlers](craft3:craft3:craft\gql\ArgumentManager::EVENT_DEFINE_GQL_ARGUMENT_HANDLERS) and append any argument handler class names:

```php
use mynamespace\gql\argumenthandlers\RelatedWidgets;
use craft\gql\ArgumentManager;
use craft\events\RegisterGqlArgumentHandlersEvent;

Event::on(
    ArgumentManager::class,
    ArgumentManager::EVENT_DEFINE_GQL_ARGUMENT_HANDLERS,
    function(RegisterGqlArgumentHandlersEvent $event) {
        $event->handlers["argumentName"] = RelatedWidgets::class;
    }
});
```

### Complexity Values

GraphQL complexity values are numeric scores assigned to fields that indicate how much processing power will be needed to return a result.

The combined values are limited by Craft’s <config3:maxGraphqlComplexity> setting. If a query or mutation’s complexity exceeds that limit, it will not be executed. Assigning appropriate complexity values ensures that a Craft site developer may manage that threshold for a safe, optimal use of compute resources.

If you provide a field definition that involves relations or processor-intensive operations, you should specify a complexity score.

The <craft3:craft\services\Gql> service has the following complexity constants:

| Constant                          | Value | Description |
| --------------------------------- | --- | -----------
| `GRAPHQL_COMPLEXITY_SIMPLE_FIELD` | 1   | Complexity value for accessing a simple field.
| `GRAPHQL_COMPLEXITY_QUERY`        | 10  | Complexity value for accessing a field that will trigger a single query for the request.
| `GRAPHQL_COMPLEXITY_EAGER_LOAD`   | 25  | Complexity value for accessing a field that will add an instance of eager-loading for the request.
| `GRAPHQL_COMPLEXITY_CPU_HEAVY`    | 200 | Complexity value for accessing a field that will likely trigger a CPU heavy operation.
| `GRAPHQL_COMPLEXITY_NPLUS1`       | 500 | Complexity value for accessing a field that will trigger a query for every parent returned.

The <craft3:craft\services\Gql> service also provides static methods to help calculate complexity values:

- <craft3:craft\services\Gql::eagerLoadComplexity()>
- <craft3:craft\services\Gql::singleQueryComplexity()>
- <craft3:craft\services\Gql::relatedArgumentComplexity()>
- <craft3:craft\services\Gql::nPlus1Complexity()>

Any field definition has the option of providing a `'complexity'` value in its array:

```php{7-9}
// ...
'children' => [
    'name' => 'children',
    'args' => WidgetArguments::getArguments(),
    'type' => Type::listOf(WidgetInterface::getType()),
    'description' => 'Widget’s children. Accepts same arguments as `widgets` query.',
    'complexity' => Gql::relatedArgumentComplexity(
        GqlService::GRAPHQL_COMPLEXITY_EAGER_LOAD
    ),
],
// ...
```

### Validation Rules

GraphQL queries are validated against the schema, and in some cases you may want to adjust the GraphQL validation rules that are applied.

Craft, for example, removes validation rules when <config3:devMode> is enabled so faulty queries can be investigated in a development environment. (Those same faults may cause problems in production.)

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
        // Permanently disable introspection
        $event->validationRules[DisableIntrospection::class] = new DisableIntrospection();
    }
);
```
