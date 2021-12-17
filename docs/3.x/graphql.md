---
keywords: headless
---

# GraphQL API <badge type="edition" vertical="middle" title="GraphQL is only available in Craft Pro">Pro</badge>

Craft Pro provides a [GraphQL](https://graphql.org) API you can use to work with your content in separate applications like single-page apps (SPAs) and static site generators.

## Getting Started

Make sure you’re running Craft Pro 3.3 or later and [the `enableGql` setting](config3:enableGql) is not set to `false`.

Because GraphQL is self-documenting, you can jump right into Craft’s included [GraphiQL IDE](#using-the-graphiql-ide) from the control panel and interactively build and execute queries. Querying from the control panel gives you full access to data that’s available, unlike queries from the outside that require [an endpoint and appropriate permissions](#setting-up-your-api-endpoint).

## Examples

### Query

Here’s what a [query](#query-reference) for two news entries might look like, complete with a formatted `dateCreated` and custom-transformed `featureImage`:

::: code
```graphql GraphQL
{
  entries (section: "news", limit: 2, orderBy: "dateCreated DESC") {
    dateCreated @formatDateTime (format: "Y-m-d")
    title
    children {
      title
    }
    ... on news_article_Entry {
      shortDescription
      featuredImage {
        url @transform (width: 300, immediately: true)
      }
    }
  }
}
```
```json JSON Response
{
  "data": {
    "entries": [
      {
        "dateCreated": "2019-08-21",
        "title": "An important news item",
        "children": [],
        "shortDescription": "<p>This is how we roll these days.</p>",
        "featuredImage": [
          {
            "url": "/assets/site/_300xAUTO_crop_center-center_none/glasses.jpg"
          }
        ]
      },
      {
        "dateCreated": "2019-07-02",
        "title": "Dolorem ea eveniet alias",
        "children": [
          {
            "title": "Child entry"
          },
          {
            "title": "This is also a child entry"
          }
        ],
        "shortDescription": "Et omnis explicabo iusto eum nobis. Consequatur debitis architecto est exercitationem vitae velit repellendus. Aut consequatur maiores error ducimus ea et. Rem ipsa asperiores eius quas et omnis. Veniam quasi qui repellendus dignissimos et necessitatibus. Aut a illo tempora.",
        "featuredImage": []
      }
    ]
  }
}
```
:::

#### Relations

You can use relational arguments like `relatedToAssets` and `relatedToEntries` to limit results based on relationships to other elements. Their respective types (referenced below) look like `[*CriteriaInput]`, where `*` will be the name of the target element, and you can pass an array of one or more objects each having the same arguments you’d use in an [element query](element-queries.md).

We could use the `relatedToCategories` argument, for example, to narrow our previous example’s news articles to those related to an “Announcements” category:

```graphql{2}
{
  entries (section: "news", relatedToCategories: [{slug: "announcements"}]) {
    title
  }
}
```

::: tip
See [Relations](relations.md) for more on Craft’s relational field types.
:::

### Mutation

Here’s a [mutation](#mutations), where we’re using the GraphQL API to save a new entry:

::: code
```graphql GraphQL
mutation saveEntry($title: String, $slug: String) {
  save_news_article_Entry(title: $title, slug: $slug) {
    title
    slug
    dateCreated @formatDateTime (format: "Y-m-d")
  }
}

# query variables:
{
  "title": "Craft 3.5 Supports GraphQL Mutations",
  "slug": "craft-graphql-mutations"
}
```
```json JSON Response
{
  "data": {
    "save_news_article_Entry": {
      "title": "Craft 3.5 Supports GraphQL Mutations",
      "slug": "craft-graphql-mutations",
      "dateCreated": "2020-04-18"
    }
  }
}
```
:::

## Setting Up Your API Endpoint

By default, none of your content is available outside of Craft via GraphQL. In order to send GraphQL queries to Craft, we need to establish an endpoint for receiving them and an appropriate set of permissions with a token.

### Create a GraphQL Route

You’ll need to establish a route that provides a public endpoint for the GraphQL API.

Create a [URL rule](routing.md#advanced-routing-with-url-rules) from `config/routes.php` that points to the `graphql/api` controller action. For example, the following URL rule would cause `/api` requests to route to the GraphQL API:

```php
return [
    'api' => 'graphql/api',
    // ...
];
```

::: tip
Craft sets an `access-control-allow-origin: *` header by default on GraphQL responses; consider limiting that for security using the <config3:allowedGraphqlOrigins> setting.
:::

Pretending your endpoint is `http://my-project.test/api`, you can verify that it’s configured correctly by sending a `{ping}` query to it:

```bash
curl -H "Content-Type: application/graphql" -d '{ping}' http://my-project.test/api
```

If you get a `pong` in your response, your GraphQL API is up and running!

```json
{"data":{"ping":"pong"}}
```

::: tip
The `ping` test works for any endpoint; content queries depend on your schema setup.
:::

### Define Your Schemas

Once you’ve created a GraphQL API endpoint, you need to tell Craft which content should be available from it. You do that by defining a **Schema**.

Craft has two types of schemas:

1. A single **Public Schema** that defines which content should be available publicly.
2. Any number of private schemas you create, each having its own secret **Access Token**.

Any GraphQL API request without a token will use the Public Schema. Craft with otherwise use a valid token to determine the relevant schema.

You can manage your schemas in the control panel at **GraphQL** → **Schemas**. In addition to defining the scope of each schema, you can also give them expiration dates, regenerate their tokens, and disable them.

## Sending API Requests

### Using the GraphiQL IDE

The easiest way to start exploring your GraphQL API is with the built-in [GraphiQL](https://github.com/graphql/graphiql) IDE, which is available in the control panel from **GraphQL** → **Explore**.

![The built-in GraphiQL IDE](./images/graphiql.png)

::: tip
The included GraphiQL IDE preselects a special “Full Schema” option for optimal exploration. You can change the applied schema from its dropdown menu.

![GraphiQL’s Full Schema default](./images/graphiql-full-schema.png)
:::

### Using Another IDE

Additional GraphQL IDEs are available as well:

* [Insomnia](https://insomnia.rest/)
* [GraphQL Playground](https://github.com/prisma/graphql-playground)
* [GraphQL Playground online](https://www.graphqlbin.com/v2/new)

::: tip
When you’re initially exploring the API, make sure <config3:devMode> is enabled so the IDE can be informed about the entire schema available to it.
:::

### Sending Requests Manually

The GraphQL API can be queried in three ways:

1. **A `GET` request** with the GraphQL query defined by a `query` parameter:
  ```bash
  curl \
    --data-urlencode "query={ping}" \
    http://craft32.test/api
  # or
  curl http://craft32.test/api?query=%7Bping%7D
  ```
2. **A `POST` request with an `application/json` content type** and the GraphQL query defined by a `query` key:
  ```bash
  curl \
    -H "Content-Type: application/json" \
    -d '{"query":"{ping}"}' \
    http://my-project.test/api
  ```
3. **A `POST` request with an `application/graphql` content type** and the GraphQL query defined by the raw request body:
  ```bash
  curl \
    -H "Content-Type: application/graphql" \
    -d '{ping}' \
    http://my-project.test/api
  ```

#### Specifying Variables

If you need to specify any [variables](https://graphql.org/learn/queries/#variables) along with your query, then you must send request as a `POST` request with an `application/json` content type, and include a `variables` key in the JSON body alongside `query`.

```bash
curl \
  -H "Content-Type: application/json" \
  -d '{
        "query": "query($id:[Int]) { entries(id: $id) { id, title } }",
        "variables": { "id": [1, 2, 3] }
      }' \
  http://my-project.test/api
```

#### Querying a Private Schema

The Public Schema is used by default. To query against a different [schema](#define-your-schemas), pass its Access Token using an `Authorization` header.

```bash
curl \
  -H "Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/graphql" \
  -d '{entries{id}}' \
  http://my-project.test/api
```

::: warning
If you’re unable to query a private schema because of a “missing authorization header”, make sure Craft received it from the web server with a quick post to a test template:

```twig
{{ craft.app.getRequest().getHeaders().has('authorization')
  ? 'auth token present ✓' :
  : 'auth token missing!' }}
```

Apache strips `Authorization` headers by default, which can be fixed by enabling [CGIPassAuth](https://httpd.apache.org/docs/2.4/en/mod/core.html#cgipassauth) or adding the following to your `.htaccess` file:

```
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
```
:::

## Caching

Query results are cached by default to speed up subsequent queries, and you can disable that caching with the <config3:enableGraphQlCaching> setting.

The entire GraphQL cache is purged for any schema changes, otherwise Craft only purges caches based on content changes relevant to a given query. The more specific your query, the less likely its cache will be cleared when an entry is saved or deleted. For example:

- If the query includes the `id` argument, its caches will only be cleared when that entry is saved or deleted.
- If the query includes `type` or `typeId` arguments, its caches will only be cleared when entries of the same type are saved or deleted.
- If the query includes `section` or `sectionId` arguments, its caches will only be cleared when entries in the same section are saved or deleted.

## Interface Implementation

A defined type exists for each specific interface implementation. For example, if a “News” section has “Article” and “Editorial” entry types, in addition to the `EntryInterface` interface type, two additional types would be defined the GraphQL schema, if the token used allows it: `news_article_Entry` and `news_editorial_Entry` types.

## Mutations

GraphQL mutations provide a way to modify data. The actual mutations will vary depending on the schema and what it allows. There are common mutations per GraphQL object type and additional type-specific mutations.

Mutations take the data as arguments. In this example, we’re using the type-specific `save_news_article_Entry` to save a new entry. We’re providing a title and slug and formatting the `dateCreated` that’s populated automatically when the entry is saved:

::: code
```graphql GraphQL
mutation saveEntry($title: String, $slug: String) {
  save_news_article_Entry(title: $title, slug: $slug) {
    title
    slug
    dateCreated @formatDateTime (format: "Y-m-d")
  }
}

# query variables:
{
  "title": "Craft 3.5 Supports GraphQL Mutations",
  "slug": "craft-graphql-mutations"
}
```
```json JSON Response
{
  "data": {
    "save_news_article_Entry": {
      "title": "Craft 3.5 Supports GraphQL Mutations",
      "slug": "craft-graphql-mutations",
      "dateCreated": "2020-04-18"
    }
  }
}
```
:::

While mutations are mostly straightforward, there are a few important cases to consider.

### Matrix Fields in Mutations

GraphQL’s limited input types can be challenging with complex [Matrix fields](matrix-fields.md).

::: tip
We recommend reading [how to save matrix field data in entry forms](matrix-fields.md#saving-matrix-fields-in-entry-forms) first if you’ve not saved Matrix field form data.
:::

Matrix input types generally have the following structure:

| Field       | Description
| ----------- | -----------
| `sortOrder` | A list of all the block IDs, including any new blocks, in the order you’d like to persist after the mutation.
| `blocks`    | A list of all the actual blocks. You can omit any blocks that aren’t modified, but they must be represented on the `sortOrder` field or they’ll be deleted.

An actual block input type will contain fields for all the possible block types for this field, however, the first non-empty block will be considered in the order that the block types are defined on the field.

As an example, let’s pretend we have a Matrix field with a handle `ingredients`.

The field has three block types: `spirit`, `mixer`, and `garnish`. Each block type has one or two fields:

```
ingredients
├── spirit
│   ├── spiritName (Plain Text)
│   └── ounces (Number)
├── mixer
│   ├── mixerName (Plain Text)
│   └── ounces (Number)
└── garnish
    └── garnishName (Plain Text)
```

These are all the GraphQL input types Craft generates for this Matrix field:

| Type Name | Type Description |
| - | -
| `ingredients_MatrixInput` | Input type for the Matrix field, containing `sortOrder` and `blocks`.
| `ingredients_MatrixBlockContainerInput` | Input type that represents the block, in this case containing `spirit`, `mixer`, and `garnish`.
| `ingredients_spirit_MatrixBlockInput` | Input type for the `spirit` block, containing `spiritName` and `ounces`.
| `ingredients_mixer_MatrixBlockInput` | Input type for the `mixer` block, containing `mixerName` and `ounces`.
| `ingredients_garnish_MatrixBlockInput` | Input type for the `garnish` block, containing `garnishName`.

Those input types would look like this in [GraphQL Schema Definition Language (SDL)](https://www.prisma.io/blog/graphql-sdl-schema-definition-language-6755bcb9ce51):

```graphql
input ingredients_MatrixInput {
  sortOrder: [QueryArgument]!
  blocks: [ingredients_MatrixBlockContainerInput]
}

input ingredients_MatrixBlockContainerInput {
  spirit: ingredients_spirit_MatrixBlockInput
  mixer: ingredients_mixer_MatrixBlockInput
  garnish: ingredients_garnish_MatrixBlockInput
}

input ingredients_spirit_MatrixBlockInput {
  # ... common Matrix Block fields ...
  spiritName: String
  ounces: Number
}

input ingredients_mixer_MatrixBlockInput {
  # ... common Matrix Block fields ...
  mixerName: String
  ounces: Number
}

input ingredients_garnish_MatrixBlockInput {
  # ... common Matrix Block fields ...
  garnishName: String
}
```

A mutation saving a new entry with multiple Matrix blocks might look like this:

::: code
```graphql GraphQL
mutation saveEntry(
  $title: String,
  $slug: String,
  $authorId: ID,
  $ingredients: [ingredients_MatrixBlockContainerInput],
  $sortOrder: [QueryArgument]
) {
  save_cocktails_cocktails_Entry(
    title: $title,
    slug: $slug,
    authorId: $authorId,
    ingredients: { blocks: $ingredients, sortOrder: $sortOrder }
  ) {
    title
    slug
    authorId
    dateCreated @formatDateTime (format: "Y-m-d")
    ingredients {
      __typename
        ...on MatrixBlockInterface {
          id
        }
        ... on ingredients_spirit_BlockType {
          spiritName
          ounces
        }
        ... on ingredients_mixer_BlockType {
          mixerName
          ounces
        }
        ... on ingredients_garnish_BlockType {
          garnishName
        }
     }
  }
}

# query variables:
{
  "title": "Gin and Tonic",
  "slug": "gin-tonic",
  "authorId": 1,
  "sortOrder": ["new1", "new2", "new3", "new4"],
  "ingredients": [
    {
      "spirit": {
        "id": "new1",
        "spiritName": "Gin",
        "ounces": 2
      }
    },
    {
      "mixer": {
        "id": "new2",
        "mixerName": "Tonic",
        "ounces": 4
      }
    },
    {
      "mixer": {
        "id": "new3",
        "mixerName": "Fresh Lime Juice",
        "ounces": 0.25
      }
    },
    {
      "garnish": {
        "id": "new4",
        "garnishName": "Lime Wedge or Twist"
      }
    }
  ]
}
```
```json JSON Response
{
  "data": {
    "save_cocktails_cocktails_Entry": {
      "title": "Gin and Tonic",
      "slug": "gin-tonic",
      "authorId": 1,
      "dateCreated": "2021-03-04",
      "ingredients": [
        {
          "__typename": "ingredients_spirit_BlockType",
          "id": "9",
          "spiritName": "Gin",
          "ounces": 2
        },
        {
          "__typename": "ingredients_mixer_BlockType",
          "id": "10",
          "mixerName": "Tonic",
          "ounces": 4
        },
        {
          "__typename": "ingredients_mixer_BlockType",
          "id": "11",
          "mixerName": "Fresh Lime Juice",
          "ounces": 0.25
        },
        {
          "__typename": "ingredients_garnish_BlockType",
          "id": "12",
          "garnishName": "Lime Wedge or Twist"
        }
      ]
    }
  }
}
```
:::

What field on those objects would contain data would determine the final block type.

::: warning
If more than one of the block types are defined, only the block type that is listed first will be considered.
:::

### Saving Files via Mutations

You can provide files for Assets as either Base64-encoded data, or a URL that Craft will download.

Either way you’ll use the `FileInput` GraphQL input type, which has the following fields:

| Field      | Description
| ---------- | -----------
| `url`      | URL of a file to be downloaded.
| `fileData` | File contents in Base64 format. If provided, takes precedence over `url`.
| `filename` | Filename to use for the saved Asset. If omitted, Craft will create a filename.

### Mutating Entries

#### Saving an Entry

To save an [entry](entries.md), use the entry type-specific mutation which will have the name in the form of `save_<sectionHandle>_<entryTypeHandle>_Entry`:

<!-- BEGIN ENTRY MUTATION ARGS -->

| Argument | Type | Description
| - | - | -
| `id`| `ID` | Set the element’s ID.
| `uid`| `String` | Set the element’s UID.
| `title`| `String` | The title of the element.
| `enabled`| `Boolean` | Whether the element should be enabled.
| `authorId`| `ID` | The ID of the user that created this entry.
| `postDate`| `DateTime` | When should the entry be posted.
| `expiryDate`| `DateTime` | When should the entry expire.
| `slug`| `String` | Narrows the query results based on the elements’ slugs.
| `siteId`| `Int` | Determines which site(s) the elements should be saved to. Defaults to the primary site.
| `...`|  | More arguments depending on the field layout for the type

<!-- END ENTRY MUTATION ARGS -->

The `id`, `uid` and `authorId` arguments do no exist for single entries. This is because single entries have no authors and are identified already by the exact mutation. In a similar fashion, there are additional arguments available for structured entries. For more information, refer to [mutating structure data](#mutating-structure-data).

::: tip
After saving an entry, Craft runs queue jobs for updating revisions and search indexes. If you’re using Craft headlessly or infrequently accessing the control panel, consider disabling <config3:runQueueAutomatically> and [establishing an always-running daemon](https://nystudio107.com/blog/robust-queue-job-handling-in-craft-cms) to keep revisions and search indexes up to date.
:::

#### Editing Existing Entries

You can modify existing entries by passing the populated `id` argument to your mutation.

#### Saving a Draft

To save a draft for an entry, use the entry type-specific mutation which will have the name in the form of `save_<sectionHandle>_<entryTypeHandle>_Draft`:

<!-- BEGIN DRAFT MUTATION ARGS -->

| Argument | Type | Description
| - | - | -
| `title`| `String` | The title of the element.
| `enabled`| `Boolean` | Whether the element should be enabled.
| `authorId`| `ID` | The ID of the user that created this entry.
| `postDate`| `DateTime` | When should the entry be posted.
| `expiryDate`| `DateTime` | When should the entry expire.
| `slug`| `String` | Narrows the query results based on the elements’ slugs.
| `siteId`| `Int` | Determines which site(s) the elements should be saved to. Defaults to the primary site.
| `draftId`| `ID!` | The ID of the draft.
| `draftName`| `String` | The name of the draft.
| `draftNotes`| `String` | Notes for the draft.
| `...`|  | More arguments depending on the field layout for the type

<!-- END DRAFT MUTATION ARGS -->

#### Creating or Publishing a Draft

You can use the `createDraft` mutation to save a new draft. It requires the `id` of the draft’s parent entry and returns the ID of the newly-saved draft.

You can publishing a draft using the `publishDraft` mutation, which requires the `id` of the draft to be published and returns the ID of the updated parent entry.

#### Deleting an Entry

You can delete an entry using the `deleteEntry` mutation, which requires the `id` of the entry to be deleted. It returns a boolean value indicating whether the operation was successful.

### Mutating Assets

#### Saving an Asset

To create or update an [asset](assets.md), use the volume-specific mutation which will have a name in the form of `save_<volumeHandle>_Asset`:

<!-- BEGIN ASSET MUTATION ARGS -->

| Argument | Type | Description
| - | - | -
| `id`| `ID` | Set the element’s ID.
| `uid`| `String` | Set the element’s UID.
| `title`| `String` | The title of the element.
| `enabled`| `Boolean` | Whether the element should be enabled.
| `_file`| `FileInput` | The file to use for this asset
| `newFolderId`| `ID` | ID of the new folder for this asset
| `...`|  | More arguments depending on the field layout for the type

<!-- END ASSET MUTATION ARGS -->

#### Deleting an Asset

You can delete an asset using the `deleteAsset` mutation, which requires the `id` of the asset to be deleted. It returns a boolean value indicating whether the operation was successful.

### Mutating Tags

#### Saving a Tag

To create or update a [tag](tags.md), use the tag group-specific mutation which will have a name in the form of `save_<tagGroupHandle>_Tag`:

<!-- BEGIN TAG MUTATION ARGS -->

| Argument | Type | Description
| - | - | -
| `id`| `ID` | Set the element’s ID.
| `uid`| `String` | Set the element’s UID.
| `title`| `String` | The title of the element.
| `enabled`| `Boolean` | Whether the element should be enabled.
| `...`|  | More arguments depending on the field layout for the type

<!-- END TAG MUTATION ARGS -->

#### Deleting a Tag

To delete a tag, use the `deleteTag` mutation which requires the `id` of the tag to be deleted. It returns a boolean value indicating whether the operation was successful.

### Mutating Categories

#### Saving a Category

To create or update a [category](categories.md), use the category group-specific mutation which will have a name in the form of `save_<categoryGroupHandle>_Category`.

<!-- BEGIN CATEGORY MUTATION ARGS -->

| Argument | Type | Description
| - | - | -
| `id`| `ID` | Set the element’s ID.
| `uid`| `String` | Set the element’s UID.
| `title`| `String` | The title of the element.
| `enabled`| `Boolean` | Whether the element should be enabled.
| `...`|  | More arguments depending on the field layout for the type

<!-- END CATEGORY MUTATION ARGS -->

#### Deleting a Category

To delete a category, use the `deleteCategory` mutation which requires the `id` of the category to be deleted. It returns a boolean value indicating whether the operation was successful.

### Mutating Structure Data

Structure section entries and categories exist with explicit order and nesting relationships. To manipulate their place in the structure, save the elements using the appropriate mutations and use the following arguments:

<!-- BEGIN STRUCTURE MUTATION ARGS -->

| Argument | Type | Description
| - | - | -
| `prependTo`| `ID` | The ID of the element to prepend to.
| `appendTo`| `ID` | The ID of the element to append to.
| `prependToRoot`| `Boolean` | Whether to prepend this element to the root.
| `appendToRoot`| `Boolean` | Whether to append this element to the root.
| `insertBefore`| `ID` | The ID of the element this element should be inserted before.
| `insertAfter`| `ID` | The ID of the element this element should be inserted after.

<!-- END STRUCTURE MUTATION ARGS -->

### Mutating Global Sets

To update a global set use the appropriate mutations which will have the name in the form of `save_<globalSetHandle>_GlobalSet`.

The only available arguments are custom fields on the global set.

### Mutating Users

It’s currently not possible to mutate users with Craft’s GraphQL API.

### Further Reading

See the [GraphQL Reference](graphql-reference.md) page for a complete reference of Craft’s GraphQL queries, directives, interfaces, types, and input types.

If you’re looking to add GraphQL support in your own plugin or module, see [Extending GraphQL](extend/graphql.md).