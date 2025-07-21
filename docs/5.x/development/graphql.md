---
keywords: headless
containsGeneratedContent: yes
---

# GraphQL API

Craft provides a [GraphQL](https://graphql.org) API you can use to work with your content in separate applications like single-page apps (SPAs) and static site generators.

<!-- more -->

## Getting Started

GraphQL’s API is self-documenting, so you can immediately start building and executing queries interactively via Craft’s included [GraphiQL IDE](#using-the-graphiql-ide). Querying from the control panel give you unfettered access to your content, whereas queries from the outside require [an endpoint and appropriate permissions](#setting-up-your-api-endpoint).

::: tip
You can also execute GraphQL queries from [Twig templates](templates.md) with the [`gql()` function](../reference/twig/functions.md#gql).
:::

### Setting Up Your API Endpoint

By default, none of your content is publicly accessible via GraphQL—you must explicitly authorize resources by defining a route and configuring one or more public or private [schemas](#define-your-schemas).

#### Create a GraphQL Route

The GraphQL endpoint is always available via its [action path](../system/routing.md), at `/index.php?action=graphql/api` or `/actions/graphql/api`. If you would prefer to access the API via a more concise path, create a [URL rule](../system/routing.md#advanced-routing-with-url-rules) in `config/routes.php` that maps to this `graphql/api` controller action—the following rule would make the GraphQL API available at `/api`:

```php
return [
    'api' => 'graphql/api',
    // ...
];
```

These routes are _not_ evaluated when <config5:headlessMode> is enabled! you must use one of the built-in action URLs.

::: tip
Craft sets an `access-control-allow-origin: *` header by default on GraphQL responses; consider limiting that for security using a [CORS filter](../reference/config/app.md#cors).
:::

#### Define Your Schemas

With a GraphQL API endpoint defined, Craft determines what content should be available from it via **Schemas**. Access to schemas is in turn granted by [tokens](#generate-tokens).

Craft has two types of schemas:

1. A single _public_ schema that defines which content should be available to unauthenticated clients. _The public schema is disabled by default._
2. Any number of _private_ schemas that permit querying and mutating specific types of elements.

Administrators have access to a third “full” schema, for testing with the [GraphiQL IDE](#using-the-graphiql-ide). Manage your schemas in the control panel by navigating to <Journey path="GraphQL, Schemas" />.

::: warning
Schema customization is only possible with an admin account and <config5:allowAdminChanges> _on_.
:::

#### Generate Tokens

A _token_ is required to use any non-public schema. Tokens use the standard “bearer” `Authorization` HTTP header:

```http
Authorization: Bearer {token}
```

Invalid tokens will produce a 400-level HTTP exception; requests _without_ a token default to the public schema, if it is enabled. More [examples](#examples) of token usage appear below!

To create a token, visit <Journey path="GraphQL, Tokens" /> and click **New token**. Every token’s **Name** must be unique, but multiple tokens may be created for each schema. Craft automatically generates a random 32-character access token, which can be copied from the **Authorization Header** section. Regenerate and save a token to revoke access to existing clients.

Because tokens are similar to [user groups](../system/user-management.md#user-groups) in the way they grant access to system resources, only admins are allowed to create and modify them. Tokens can also be created via the CLI, with the [`graphql/create-token` command](../reference/cli.md#graphql-create-token). To find a schema’s UUID (required by this command), run `graphql/list-schemas`.

While [schemas](#define-your-schemas) are tracked in [project config](../system/project-config.md), tokens are only stored in the database and must be created in each environment.

::: danger
Carefully protect tokens for schemas that allow [mutations](#mutations)! These are effectively as dangerous as a user with the equivalent permissions.
:::

## Sending API Requests

### CURL

Assuming your project lives at `https://my-project.ddev.site` and your [route](#create-a-graphql-route) was configured like the example above, you can confirm the [public schema](#define-your-schemas) is working by sending a `{ping}` query to it via the command line:

```bash
curl -H "Content-Type: application/graphql" -d '{ping}' https://my-project.ddev.site/api
```

If you get a `pong` in your response, your GraphQL API is up and running!

```json
{"data":{"ping":"pong"}}
```

If you get an error, make sure your [public schema](#define-your-schemas) is enabled, and try again.

::: tip
The `ping` test is implicitly allowed by all _enabled_ schemas. It is not a guarantee that any particular content is actually available, but authorization is performed when a token is sent.
:::

### Using the GraphiQL IDE

The easiest way to start exploring your GraphQL API is with the built-in [GraphiQL](https://github.com/graphql/graphiql) IDE, which is available in the control panel from <Journey path="GraphQL, GraphiQL" />.

![The built-in GraphiQL IDE](../images/graphiql.png)

::: tip
The included GraphiQL IDE preselects a special “Full Schema” option for exploration. This schema is only available to logged-in administrators. Change the active schema from the dropdown menu in the upper-right corner.
:::

### Using Another IDE

Additional GraphQL IDEs are available as well:

- [Insomnia](https://insomnia.rest/)
- [GraphQL Playground](https://github.com/prisma/graphql-playground)
- [GraphQL Playground online](https://www.graphqlbin.com/v2/new)

::: tip
When you’re initially exploring the API, make sure <config5:devMode> is enabled so the IDE can be informed about the entire schema available to it.
:::

### Sending Requests Manually

The GraphQL API can be queried in three ways:

1. **A `GET` request** with the GraphQL query defined by a `query` parameter:
  ```bash
  curl \
    --data-urlencode "query={ping}" \
    http://my-project.ddev.site/api
  # or
  curl https://my-project.ddev.site/api?query=%7Bping%7D
  ```
2. **A `POST` request with an `application/json` content type** and the GraphQL query defined by a `query` key:
  ```bash
  curl \
    -H "Content-Type: application/json" \
    -d '{"query":"{ping}"}' \
    https://my-project.ddev.site/api
  ```
3. **A `POST` request with an `application/graphql` content type** and the GraphQL query defined by the raw request body:
  ```bash
  curl \
    -H "Content-Type: application/graphql" \
    -d '{ping}' \
    https://my-project.ddev.site/api
  ```

#### Specifying Variables

If you need to specify any [variables](https://graphql.org/learn/queries/#variables) along with your query, then you must send request as a `POST` request with an `application/json` content type, and include a `variables` key in the JSON body alongside your `query`.

```bash
curl \
  -H "Content-Type: application/json" \
  -d '{
        "query": "query($id:[Int]) { entries(id: $id) { id, title } }",
        "variables": { "id": [1, 2, 3] }
      }' \
  https://my-project.ddev.site/api
```

#### Querying a Private Schema

The **Public Schema** is used by default. To query against a different [schema](#define-your-schemas), pass a valid [token](#generate-tokens) under the `Authorization` header.

```bash
curl \
  -H "Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/graphql" \
  -d '{entries{id}}' \
  https://my-project.ddev.site/api
```

::: warning
If you’re unable to query a private schema because of a “missing authorization header,” make sure Craft received it from the web server with a quick post to a test template:

```twig
{{ craft.app.getRequest().getHeaders().has('authorization')
  ? 'auth header present ✓'
  : 'auth header missing!' }}
```

Apache strips `Authorization` headers by default, which can be fixed by enabling [CGIPassAuth](https://httpd.apache.org/docs/2.4/en/mod/core.html#cgipassauth) or adding the following to your `.htaccess` file:

```
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
```
:::

## Examples

### Basic Query

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
    ... on article_Entry {
      shortDescription
      featuredImage {
        url @transform (width: 300)
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

### Custom Fields

In addition to nave element properties, content stored in [custom fields](../system/fields.md) is accessible via the GraphQL API.

The keys you use to access that data often depends on how the fields are connected to each type of element via [field layouts](../system/fields.md#field-layouts). Craft defines interfaces for each of your element types’ variations (like entry types or category groups) and exposes fields using either their global or locally-overridden handle. Altogether, this means that you will often add custom fields within an inline fragment:

```graphql{5,10,13}
query StationsQuery {
  entries(section: "weatherBeacons") {
    title
    id
    ... on terrestrialStation_Entry {
      location {
        administrativeArea
      }
    }
    ... on atmosphericStation_Entry {
      altitude
    }
    ... on maritimeStation_Entry {
      douglasSeaScale
    }
  }
}
```

In this example, `title` and `id` are fields available on _all_ entries, whereas `location`, `altitude`, and `douglasSeaScale` are fields available only on specific entry type interfaces (`terrestrialStation_Entry`, `atmosphericStation_Entry`, and `maritimeStation_Entry`, respectively).

While specific interfaces are required for _selecting_ fields, they aren’t required when using custom fields as query arguments. Here, we’re using a `sentiment` field to narrow a query for “Review” entries:

```graphql
query PositiveReviews {
  entries(section: "reviews", sentiment: "awesome") {
    postDate@formatDateTime(format: "F j, Y")
    title
    body
  }
}
```

::: tip
Mouseover any token in the GraphiQL editor to view introspections, or open the **Documentation Explorer** to learn about the acceptable argument types for each [field type](../reference/field-types/README.md).
:::

#### Relationships

The GraphQL API exposes Craft’s powerful, field-driven [relations](../system/relations.md) system in a familiar way.

::: tip
The following examples include server-rendered Twig “equivalents,” which are necessarily bound to HTML output.
:::

- Select fields from related elements:

  ::: code
  ```graphql GraphQL
  query Posts {
    entries(section: "blog") {
      title
      url

      ... on post_Entry {
        # Assets:
        featureImage {
          url
          width
          height
        }


        # Categories:
        primaryCategory {
          title
          url
        }

        topics {
          title
          url
        }
      }
    }
  }
  ```
  ```twig Twig
  {% set posts = craft.entries()
    .section('blog')
    .all() %}

  {% for post in posts %}
    {{ post.primaryCategory.eagerly().one().title }}

    {% set image = post.featureImage.eagerly().one() %}

    {% if image %}
      {{ image.getImg() }}
    {% endif %}

    {{ post.title }}

    <ul>
      {% for category in post.topics.eagerly().all() %}
        <li>{{ category.getLink() }}</li>
      {% endfor %}
    </ul>
  {% endfor %}
  ```
  :::

  Selections can be arbitrarily deep, but they must be explicit—GraphQL does not provide a means of recursively querying data.

- Narrow results using a specific field:

  ::: code
  ```graphql GraphQL
  query TopicPosts {
    entries(section: "blog", primaryCategory: [1234]) {
      title
      url

      # ...
    }
  }
  ```
  ```twig Twig
  {% set topicPosts = craft.entries()
    .section('blog')
    .primaryCategory(category)
    .all() %}

  {% for post in topicPosts %}
    {# ... #}
  {% endfor %}
  ```
  :::

  You may need to pre-flight a query to translate an identifier (like a slug) into a valid category ID:

  ```graphql
  query CategoryLookup($slug: String) {
    category(slug: [$slug]) {
      id
    }
  }
  ```

- Scope selection of related elements:

  ::: code
  ```graphql{6} GraphQL
  query PostsWithBroadTopics {
    entries(section: "blog") {
      title
      url

      ... on post_Entry {
        topics(level: 1) {
          title
        }
      }
    }
  }
  ```
  ```twig{8} Twig
  {% set posts = craft.entries()
    .section('blog')
    .all() %}

  {% for post in posts %}
    {{ post.title }}

    Filed in {{ post.topics.level(1).eagerly().collect().join(', ') }}
  {% endfor %}
  ```
  :::


- Find elements using abstract relational criteria:

  ::: code
  ```graphql GraphQL
  query TopicPosts {
    entries(
      section: "blog"
      relatedToCategories: [
        {
          slug: ["travel", "winter-sports"]
          group: "topics"
          relatedViaField: "topics"
        }
      ]
    ) {
      title
      url

      # ...
    }
  }
  ```
  ```twig{1-4,8-11} Twig
  {% set categoryIds = craft.categories()
    .group('topics')
    .slug(['travel', 'winter-sports'])
    .ids() %}

  {% set relatedPosts = craft.entries()
    .section('blog')
    .relatedTo({
      targetElement: categoryIds,
      field: 'topics',
    })
    .all() %}
  ```
  :::

  The criteria for `relatedToCategories` (or any of the `relatedTo*` arguments) are the same as the corresponding element query types (like `category()` and `categories()`).

::: tip
By default, relational criteria are logically joined with “or.” To query for elements that match _all_ the relational criteria, prepend `"and"` to the list of IDs passed to the `relatedTo` query argument.
:::

Advanced relational conditions are possible using the `relatedViaField` (seen above) and `relatedViaSite` params. <Since ver="5.4.0" feature="Site- and field-specific relational criteria" />

### Search

Craft’s search index is also exposed via GraphQL via the `search` query argument:

```graphql
query SearchResults($terms: String) {
  entries(search: $terms, orderBy: "score") {
    title
    url
    searchScore
  }
}
```

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

## Caching

Query results are cached by default to speed up subsequent queries, but you can disable that caching with the <config5:enableGraphQlCaching> setting.

The entire GraphQL cache is purged for any schema changes. Like template caches, Craft selectively purges GraphQL query results when the underlying elements’ content changes. Keep in mind that multiple GraphQL queries can be sent and executed in the same request, but responses will be cached and invalidated as a whole.

While combining queries may reduce the number of round-trips to your server, it may significantly impact the number of requests that Craft can serve from the cache. Consider splitting queries into chunks

## Types

Use the **Explorer** pane in the [GraphiQL IDE](#using-the-graphiql-ide) to browse queries and mutations, and the **Documentation** pane to get information about specific types. The specific types available for introspection and querying are determined by the current [schema](#define-your-schemas).

### Arguments

[Arguments](https://graphql.org/learn/queries/#arguments) typically correlate to element query params and are used to narrow the results of a query.

```graphql{2}
query BlogPosts {
  newsEntries(orderBy: "postDate DESC") {
    title
    summary
    postDate@formatDateTime(format: "F j, Y")
  }
}
```

### Inputs

[Input types](https://graphql.org/graphql-js/mutations-and-input-types/) help determine the allowed (and required) params for queries. Most inputs consist of scalar types (i.e. `String` or `Int`), but some arguments accept compound “criteria” represented by special Craft-specific types:

- **Query Argument** — A generic input type that describes a variety of common element query parameters. Frequently, this is used in conjunction with values that pass through <craft5:craft\helpers\Db::parseParam()>, which might accept a single scalar value, an array of scalar values (for an `OR`-style query), or an array with `not` in the first position.
- **Relational Criteria** — See the [relations](#relations) section for a complete list of accepted parameters.

Some input types are only used for mutations:

- **Addresses** — Defines fields for nested [address](../reference/element-types/addresses.md) elements, which have a very particular schema.
- **Matrix** — Defines fields for [nested entries](../reference/element-types/entries.md#nested-entries) within [Matrix](../reference/field-types/matrix.md) fields.
- **File** — See the [uploading files](#saving-files-via-mutations) for more information about the `FileInput` input type. This is only used when creating new assets directly (via the `_file` argument), or when creating new assets via an [assets field](../reference/field-types/assets.md).

### Elements

Each element type provides dedicated query and mutation interfaces that expose unique properties based on the system’s configuration. An additional generic query type is provided for each element type that allows you to build queries from scratch, similar to the `craft.entries()` or `craft.assets()` APIs available in Twig:

::: code
```graphql{2} Entries
query FeaturedResources {
  entries(section: "documents", type: ["report", "dataset"], featured: true) {
    title
    url
  }
}
```
```graphql{2} Assets
query Images {
  assets(volume: "uploads", kind: "image") {
    filename
    size
  }
}
```
:::

Specific query types are available for some subsets of elements, like [sections](../reference/element-types/entries.md#sections). The _News_ section above would get a dedicated `newsEntries` query.

[Mutations](#mutations) follow a similar pattern—to create or update an entry in our _News_ section, you would use the dedicated `save_news_post_Entry` mutation:

```graphql{2}
mutation CreateContact {
  save_contacts_person_Entry(
    title: "Oli",
    position: "Support Engineer",
    timezone: "GMT"
  ) {
    id
  }
}
```

## Query Reference

::: tip
The actual API features will depend on what your schema allows.
:::

<!-- BEGIN QUERIES -->

### The `addresses` query
This query is used to query for addresses.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `drafts`| `Boolean` | Whether draft elements should be returned.
| `draftOf`| `QueryArgument` | Narrows the query results to only drafts of a given element.  Set to `false` to fetch unpublished drafts.
| `draftId`| `Int` | The ID of the draft to return (from the `drafts` table)
| `draftCreator`| `Int` | The drafts’ creator ID
| `provisionalDrafts`| `Boolean` | Whether provisional drafts should be returned.
| `withProvisionalDrafts`| `Boolean` | Whether canonical elements should be replaced with provisional drafts if those exist.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `ownerId`| `[QueryArgument]` | Narrows the query results based on the addresses’ owners.
| `countryCode`| `[String]` | Narrows the query results based on the addresses’ country codes.
| `administrativeArea`| `[String]` | Narrows the query results based on the addresses’ administrative areas.

### The `addressCount` query
This query is used to return the number of addresses.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `drafts`| `Boolean` | Whether draft elements should be returned.
| `draftOf`| `QueryArgument` | Narrows the query results to only drafts of a given element.  Set to `false` to fetch unpublished drafts.
| `draftId`| `Int` | The ID of the draft to return (from the `drafts` table)
| `draftCreator`| `Int` | The drafts’ creator ID
| `provisionalDrafts`| `Boolean` | Whether provisional drafts should be returned.
| `withProvisionalDrafts`| `Boolean` | Whether canonical elements should be replaced with provisional drafts if those exist.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `ownerId`| `[QueryArgument]` | Narrows the query results based on the addresses’ owners.
| `countryCode`| `[String]` | Narrows the query results based on the addresses’ country codes.
| `administrativeArea`| `[String]` | Narrows the query results based on the addresses’ administrative areas.

### The `address` query
This query is used to query for a single address.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `drafts`| `Boolean` | Whether draft elements should be returned.
| `draftOf`| `QueryArgument` | Narrows the query results to only drafts of a given element.  Set to `false` to fetch unpublished drafts.
| `draftId`| `Int` | The ID of the draft to return (from the `drafts` table)
| `draftCreator`| `Int` | The drafts’ creator ID
| `provisionalDrafts`| `Boolean` | Whether provisional drafts should be returned.
| `withProvisionalDrafts`| `Boolean` | Whether canonical elements should be replaced with provisional drafts if those exist.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `ownerId`| `[QueryArgument]` | Narrows the query results based on the addresses’ owners.
| `countryCode`| `[String]` | Narrows the query results based on the addresses’ country codes.
| `administrativeArea`| `[String]` | Narrows the query results based on the addresses’ administrative areas.

### The `assets` query
This query is used to query for assets.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `volumeId`| `[QueryArgument]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ IDs.
| `volume`| `[String]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ handles.
| `folderId`| `[QueryArgument]` | Narrows the query results based on the folders the assets belong to, per the folders’ IDs.
| `filename`| `[String]` | Narrows the query results based on the assets’ filenames.
| `kind`| `[String]` | Narrows the query results based on the assets’ file kinds.
| `height`| `[String]` | Narrows the query results based on the assets’ image heights.
| `width`| `[String]` | Narrows the query results based on the assets’ image widths.
| `size`| `[String]` | Narrows the query results based on the assets’ file sizes (in bytes).
| `dateModified`| `String` | Narrows the query results based on the assets’ files’ last-modified dates.
| `hasAlt`| `Boolean` | Narrows the query results based on whether the assets have alternative text.
| `includeSubfolders`| `Boolean` | Broadens the query results to include assets from any of the subfolders of the folder specified by `folderId`.
| `withTransforms`| `[String]` | A list of transform handles to preload.
| `uploader`| `QueryArgument` | Narrows the query results based on the user the assets were uploaded by, per the user’s ID.

### The `assetCount` query
This query is used to return the number of assets.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `volumeId`| `[QueryArgument]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ IDs.
| `volume`| `[String]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ handles.
| `folderId`| `[QueryArgument]` | Narrows the query results based on the folders the assets belong to, per the folders’ IDs.
| `filename`| `[String]` | Narrows the query results based on the assets’ filenames.
| `kind`| `[String]` | Narrows the query results based on the assets’ file kinds.
| `height`| `[String]` | Narrows the query results based on the assets’ image heights.
| `width`| `[String]` | Narrows the query results based on the assets’ image widths.
| `size`| `[String]` | Narrows the query results based on the assets’ file sizes (in bytes).
| `dateModified`| `String` | Narrows the query results based on the assets’ files’ last-modified dates.
| `hasAlt`| `Boolean` | Narrows the query results based on whether the assets have alternative text.
| `includeSubfolders`| `Boolean` | Broadens the query results to include assets from any of the subfolders of the folder specified by `folderId`.
| `withTransforms`| `[String]` | A list of transform handles to preload.
| `uploader`| `QueryArgument` | Narrows the query results based on the user the assets were uploaded by, per the user’s ID.

### The `asset` query
This query is used to query for a single asset.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `volumeId`| `[QueryArgument]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ IDs.
| `volume`| `[String]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ handles.
| `folderId`| `[QueryArgument]` | Narrows the query results based on the folders the assets belong to, per the folders’ IDs.
| `filename`| `[String]` | Narrows the query results based on the assets’ filenames.
| `kind`| `[String]` | Narrows the query results based on the assets’ file kinds.
| `height`| `[String]` | Narrows the query results based on the assets’ image heights.
| `width`| `[String]` | Narrows the query results based on the assets’ image widths.
| `size`| `[String]` | Narrows the query results based on the assets’ file sizes (in bytes).
| `dateModified`| `String` | Narrows the query results based on the assets’ files’ last-modified dates.
| `hasAlt`| `Boolean` | Narrows the query results based on whether the assets have alternative text.
| `includeSubfolders`| `Boolean` | Broadens the query results to include assets from any of the subfolders of the folder specified by `folderId`.
| `withTransforms`| `[String]` | A list of transform handles to preload.
| `uploader`| `QueryArgument` | Narrows the query results based on the user the assets were uploaded by, per the user’s ID.

### The `entries` query
This query is used to query for entries.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `drafts`| `Boolean` | Whether draft elements should be returned.
| `draftOf`| `QueryArgument` | Narrows the query results to only drafts of a given element.  Set to `false` to fetch unpublished drafts.
| `draftId`| `Int` | The ID of the draft to return (from the `drafts` table)
| `draftCreator`| `Int` | The drafts’ creator ID
| `provisionalDrafts`| `Boolean` | Whether provisional drafts should be returned.
| `withProvisionalDrafts`| `Boolean` | Whether canonical elements should be replaced with provisional drafts if those exist.
| `revisions`| `Boolean` | Whether revision elements should be returned.
| `revisionOf`| `QueryArgument` | The source element ID that revisions should be returned for
| `revisionId`| `Int` | The ID of the revision to return (from the `revisions` table)
| `revisionCreator`| `Int` | The revisions’ creator ID
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants in their structure.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element in its structure, provided by its ID.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element in its structure provided by its ID.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” in their structure (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element in its structure, provided by its ID.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element in its structure, provided by its ID.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element in its structure, provided by its ID.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element in its structure, provided by its ID.
| `editable`| `Boolean` | Whether to only return entries that the user has permission to edit.
| `section`| `[String]` | Narrows the query results based on the section handles the entries belong to.
| `sectionId`| `[QueryArgument]` | Narrows the query results based on the sections the entries belong to, per the sections’ IDs.
| `field`| `[String]` | Narrows the query results based on the field the entries are contained by.
| `fieldId`| `[QueryArgument]` | Narrows the query results based on the field the entries are contained by, per the fields’ IDs.
| `primaryOwnerId`| `[QueryArgument]` | Narrows the query results based on the primary owner element of the entries, per the owners’ IDs.
| `ownerId`| `[QueryArgument]` | Narrows the query results based on the owner element of the entries, per the owners’ IDs.
| `type`| `[String]` | Narrows the query results based on the entries’ entry type handles.
| `typeId`| `[QueryArgument]` | Narrows the query results based on the entries’ entry types, per the types’ IDs.
| `authorId`| `[QueryArgument]` | Narrows the query results based on the entries’ authors.
| `authorGroup`| `[String]` | Narrows the query results based on the user group the entries’ authors belong to.
| `authorGroupId`| `[QueryArgument]` | Narrows the query results based on the user group the entries’ authors belong to, per the groups’ IDs.
| `postDate`| `[String]` | Narrows the query results based on the entries’ post dates.
| `before`| `String` | Narrows the query results to only entries that were posted before a certain date.
| `after`| `String` | Narrows the query results to only entries that were posted on or after a certain date.
| `expiryDate`| `[String]` | Narrows the query results based on the entries’ expiry dates.

### The `entryCount` query
This query is used to return the number of entries.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `drafts`| `Boolean` | Whether draft elements should be returned.
| `draftOf`| `QueryArgument` | Narrows the query results to only drafts of a given element.  Set to `false` to fetch unpublished drafts.
| `draftId`| `Int` | The ID of the draft to return (from the `drafts` table)
| `draftCreator`| `Int` | The drafts’ creator ID
| `provisionalDrafts`| `Boolean` | Whether provisional drafts should be returned.
| `withProvisionalDrafts`| `Boolean` | Whether canonical elements should be replaced with provisional drafts if those exist.
| `revisions`| `Boolean` | Whether revision elements should be returned.
| `revisionOf`| `QueryArgument` | The source element ID that revisions should be returned for
| `revisionId`| `Int` | The ID of the revision to return (from the `revisions` table)
| `revisionCreator`| `Int` | The revisions’ creator ID
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants in their structure.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element in its structure, provided by its ID.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element in its structure provided by its ID.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” in their structure (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element in its structure, provided by its ID.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element in its structure, provided by its ID.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element in its structure, provided by its ID.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element in its structure, provided by its ID.
| `editable`| `Boolean` | Whether to only return entries that the user has permission to edit.
| `section`| `[String]` | Narrows the query results based on the section handles the entries belong to.
| `sectionId`| `[QueryArgument]` | Narrows the query results based on the sections the entries belong to, per the sections’ IDs.
| `field`| `[String]` | Narrows the query results based on the field the entries are contained by.
| `fieldId`| `[QueryArgument]` | Narrows the query results based on the field the entries are contained by, per the fields’ IDs.
| `primaryOwnerId`| `[QueryArgument]` | Narrows the query results based on the primary owner element of the entries, per the owners’ IDs.
| `ownerId`| `[QueryArgument]` | Narrows the query results based on the owner element of the entries, per the owners’ IDs.
| `type`| `[String]` | Narrows the query results based on the entries’ entry type handles.
| `typeId`| `[QueryArgument]` | Narrows the query results based on the entries’ entry types, per the types’ IDs.
| `authorId`| `[QueryArgument]` | Narrows the query results based on the entries’ authors.
| `authorGroup`| `[String]` | Narrows the query results based on the user group the entries’ authors belong to.
| `authorGroupId`| `[QueryArgument]` | Narrows the query results based on the user group the entries’ authors belong to, per the groups’ IDs.
| `postDate`| `[String]` | Narrows the query results based on the entries’ post dates.
| `before`| `String` | Narrows the query results to only entries that were posted before a certain date.
| `after`| `String` | Narrows the query results to only entries that were posted on or after a certain date.
| `expiryDate`| `[String]` | Narrows the query results based on the entries’ expiry dates.

### The `entry` query
This query is used to query for a single entry.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `drafts`| `Boolean` | Whether draft elements should be returned.
| `draftOf`| `QueryArgument` | Narrows the query results to only drafts of a given element.  Set to `false` to fetch unpublished drafts.
| `draftId`| `Int` | The ID of the draft to return (from the `drafts` table)
| `draftCreator`| `Int` | The drafts’ creator ID
| `provisionalDrafts`| `Boolean` | Whether provisional drafts should be returned.
| `withProvisionalDrafts`| `Boolean` | Whether canonical elements should be replaced with provisional drafts if those exist.
| `revisions`| `Boolean` | Whether revision elements should be returned.
| `revisionOf`| `QueryArgument` | The source element ID that revisions should be returned for
| `revisionId`| `Int` | The ID of the revision to return (from the `revisions` table)
| `revisionCreator`| `Int` | The revisions’ creator ID
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants in their structure.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element in its structure, provided by its ID.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element in its structure provided by its ID.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” in their structure (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element in its structure, provided by its ID.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element in its structure, provided by its ID.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element in its structure, provided by its ID.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element in its structure, provided by its ID.
| `editable`| `Boolean` | Whether to only return entries that the user has permission to edit.
| `section`| `[String]` | Narrows the query results based on the section handles the entries belong to.
| `sectionId`| `[QueryArgument]` | Narrows the query results based on the sections the entries belong to, per the sections’ IDs.
| `field`| `[String]` | Narrows the query results based on the field the entries are contained by.
| `fieldId`| `[QueryArgument]` | Narrows the query results based on the field the entries are contained by, per the fields’ IDs.
| `primaryOwnerId`| `[QueryArgument]` | Narrows the query results based on the primary owner element of the entries, per the owners’ IDs.
| `ownerId`| `[QueryArgument]` | Narrows the query results based on the owner element of the entries, per the owners’ IDs.
| `type`| `[String]` | Narrows the query results based on the entries’ entry type handles.
| `typeId`| `[QueryArgument]` | Narrows the query results based on the entries’ entry types, per the types’ IDs.
| `authorId`| `[QueryArgument]` | Narrows the query results based on the entries’ authors.
| `authorGroup`| `[String]` | Narrows the query results based on the user group the entries’ authors belong to.
| `authorGroupId`| `[QueryArgument]` | Narrows the query results based on the user group the entries’ authors belong to, per the groups’ IDs.
| `postDate`| `[String]` | Narrows the query results based on the entries’ post dates.
| `before`| `String` | Narrows the query results to only entries that were posted before a certain date.
| `after`| `String` | Narrows the query results to only entries that were posted on or after a certain date.
| `expiryDate`| `[String]` | Narrows the query results based on the entries’ expiry dates.

### The `aboutEntry` query
Single entry within the “About” section.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `drafts`| `Boolean` | Whether draft elements should be returned.
| `draftOf`| `QueryArgument` | Narrows the query results to only drafts of a given element.  Set to `false` to fetch unpublished drafts.
| `draftId`| `Int` | The ID of the draft to return (from the `drafts` table)
| `draftCreator`| `Int` | The drafts’ creator ID
| `provisionalDrafts`| `Boolean` | Whether provisional drafts should be returned.
| `withProvisionalDrafts`| `Boolean` | Whether canonical elements should be replaced with provisional drafts if those exist.
| `revisions`| `Boolean` | Whether revision elements should be returned.
| `revisionOf`| `QueryArgument` | The source element ID that revisions should be returned for
| `revisionId`| `Int` | The ID of the revision to return (from the `revisions` table)
| `revisionCreator`| `Int` | The revisions’ creator ID
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants in their structure.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element in its structure, provided by its ID.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element in its structure provided by its ID.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” in their structure (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element in its structure, provided by its ID.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element in its structure, provided by its ID.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element in its structure, provided by its ID.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element in its structure, provided by its ID.
| `editable`| `Boolean` | Whether to only return entries that the user has permission to edit.
| `primaryOwnerId`| `[QueryArgument]` | Narrows the query results based on the primary owner element of the entries, per the owners’ IDs.
| `type`| `[String]` | Narrows the query results based on the entries’ entry type handles.
| `typeId`| `[QueryArgument]` | Narrows the query results based on the entries’ entry types, per the types’ IDs.
| `authorId`| `[QueryArgument]` | Narrows the query results based on the entries’ authors.
| `authorGroup`| `[String]` | Narrows the query results based on the user group the entries’ authors belong to.
| `authorGroupId`| `[QueryArgument]` | Narrows the query results based on the user group the entries’ authors belong to, per the groups’ IDs.
| `postDate`| `[String]` | Narrows the query results based on the entries’ post dates.
| `before`| `String` | Narrows the query results to only entries that were posted before a certain date.
| `after`| `String` | Narrows the query results to only entries that were posted on or after a certain date.
| `expiryDate`| `[String]` | Narrows the query results based on the entries’ expiry dates.

### The `homeEntry` query
Single entry within the “Home” section.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `drafts`| `Boolean` | Whether draft elements should be returned.
| `draftOf`| `QueryArgument` | Narrows the query results to only drafts of a given element.  Set to `false` to fetch unpublished drafts.
| `draftId`| `Int` | The ID of the draft to return (from the `drafts` table)
| `draftCreator`| `Int` | The drafts’ creator ID
| `provisionalDrafts`| `Boolean` | Whether provisional drafts should be returned.
| `withProvisionalDrafts`| `Boolean` | Whether canonical elements should be replaced with provisional drafts if those exist.
| `revisions`| `Boolean` | Whether revision elements should be returned.
| `revisionOf`| `QueryArgument` | The source element ID that revisions should be returned for
| `revisionId`| `Int` | The ID of the revision to return (from the `revisions` table)
| `revisionCreator`| `Int` | The revisions’ creator ID
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants in their structure.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element in its structure, provided by its ID.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element in its structure provided by its ID.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” in their structure (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element in its structure, provided by its ID.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element in its structure, provided by its ID.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element in its structure, provided by its ID.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element in its structure, provided by its ID.
| `editable`| `Boolean` | Whether to only return entries that the user has permission to edit.
| `primaryOwnerId`| `[QueryArgument]` | Narrows the query results based on the primary owner element of the entries, per the owners’ IDs.
| `type`| `[String]` | Narrows the query results based on the entries’ entry type handles.
| `typeId`| `[QueryArgument]` | Narrows the query results based on the entries’ entry types, per the types’ IDs.
| `authorId`| `[QueryArgument]` | Narrows the query results based on the entries’ authors.
| `authorGroup`| `[String]` | Narrows the query results based on the user group the entries’ authors belong to.
| `authorGroupId`| `[QueryArgument]` | Narrows the query results based on the user group the entries’ authors belong to, per the groups’ IDs.
| `postDate`| `[String]` | Narrows the query results based on the entries’ post dates.
| `before`| `String` | Narrows the query results to only entries that were posted before a certain date.
| `after`| `String` | Narrows the query results to only entries that were posted on or after a certain date.
| `expiryDate`| `[String]` | Narrows the query results based on the entries’ expiry dates.

### The `globalSets` query
This query is used to query for global sets.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `handle`| `[String]` | Narrows the query results based on the global sets’ handles.

### The `globalSet` query
This query is used to query for a single global set.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `handle`| `[String]` | Narrows the query results based on the global sets’ handles.

### The `users` query
This query is used to query for users.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `email`| `[String]` | Narrows the query results based on the users’ email addresses.
| `username`| `[String]` | Narrows the query results based on the users’ usernames.
| `fullName`| `[String]` | Narrows the query results based on the users’ full names.
| `firstName`| `[String]` | Narrows the query results based on the users’ first names.
| `lastName`| `[String]` | Narrows the query results based on the users’ last names.
| `hasPhoto`| `Boolean` | Narrows the query results to only users that have (or don’t have) a user photo.
| `assetUploaders`| `Boolean` | Narrows the query results based on whether the users have uploaded any assets.
| `authors`| `Boolean` | Narrows the query results based on whether the users are listed as the author of any entries.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the user group the users belong to, per the groups’ IDs.
| `group`| `[QueryArgument]` | Narrows the query results based on the user group the users belong to.
| `affiliatedSite`| `[String]` | Determines which site(s) the users should be affiliated with.
| `affiliatedSiteId`| `[QueryArgument]` | Determines which site(s) the users should be affiliated with.

### The `userCount` query
This query is used to return the number of users.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `email`| `[String]` | Narrows the query results based on the users’ email addresses.
| `username`| `[String]` | Narrows the query results based on the users’ usernames.
| `fullName`| `[String]` | Narrows the query results based on the users’ full names.
| `firstName`| `[String]` | Narrows the query results based on the users’ first names.
| `lastName`| `[String]` | Narrows the query results based on the users’ last names.
| `hasPhoto`| `Boolean` | Narrows the query results to only users that have (or don’t have) a user photo.
| `assetUploaders`| `Boolean` | Narrows the query results based on whether the users have uploaded any assets.
| `authors`| `Boolean` | Narrows the query results based on whether the users are listed as the author of any entries.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the user group the users belong to, per the groups’ IDs.
| `group`| `[QueryArgument]` | Narrows the query results based on the user group the users belong to.
| `affiliatedSite`| `[String]` | Determines which site(s) the users should be affiliated with.
| `affiliatedSiteId`| `[QueryArgument]` | Determines which site(s) the users should be affiliated with.

### The `user` query
This query is used to query for a single user.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `email`| `[String]` | Narrows the query results based on the users’ email addresses.
| `username`| `[String]` | Narrows the query results based on the users’ usernames.
| `fullName`| `[String]` | Narrows the query results based on the users’ full names.
| `firstName`| `[String]` | Narrows the query results based on the users’ first names.
| `lastName`| `[String]` | Narrows the query results based on the users’ last names.
| `hasPhoto`| `Boolean` | Narrows the query results to only users that have (or don’t have) a user photo.
| `assetUploaders`| `Boolean` | Narrows the query results based on whether the users have uploaded any assets.
| `authors`| `Boolean` | Narrows the query results based on whether the users are listed as the author of any entries.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the user group the users belong to, per the groups’ IDs.
| `group`| `[QueryArgument]` | Narrows the query results based on the user group the users belong to.
| `affiliatedSite`| `[String]` | Determines which site(s) the users should be affiliated with.
| `affiliatedSiteId`| `[QueryArgument]` | Determines which site(s) the users should be affiliated with.

### The `tags` query
This query is used to query for tags.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `group`| `[String]` | Narrows the query results based on the tag groups the tags belong to per the group’s handles.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the tag groups the tags belong to, per the groups’ IDs.

### The `tagCount` query
This query is used to return the number of tags.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `group`| `[String]` | Narrows the query results based on the tag groups the tags belong to per the group’s handles.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the tag groups the tags belong to, per the groups’ IDs.

### The `tag` query
This query is used to query for a single tag.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `group`| `[String]` | Narrows the query results based on the tag groups the tags belong to per the group’s handles.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the tag groups the tags belong to, per the groups’ IDs.

### The `categories` query
This query is used to query for categories.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants in their structure.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element in its structure, provided by its ID.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element in its structure provided by its ID.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” in their structure (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element in its structure, provided by its ID.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element in its structure, provided by its ID.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element in its structure, provided by its ID.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element in its structure, provided by its ID.
| `editable`| `Boolean` | Whether to only return categories that the user has permission to edit.
| `group`| `[String]` | Narrows the query results based on the category groups the categories belong to per the group’s handles.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the category groups the categories belong to, per the groups’ IDs.

### The `categoryCount` query
This query is used to return the number of categories.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants in their structure.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element in its structure, provided by its ID.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element in its structure provided by its ID.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” in their structure (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element in its structure, provided by its ID.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element in its structure, provided by its ID.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element in its structure, provided by its ID.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element in its structure, provided by its ID.
| `editable`| `Boolean` | Whether to only return categories that the user has permission to edit.
| `group`| `[String]` | Narrows the query results based on the category groups the categories belong to per the group’s handles.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the category groups the categories belong to, per the groups’ IDs.

### The `category` query
This query is used to query for a single category.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `status`| `[String]` | Narrows the query results based on the elements’ statuses.
| `archived`| `Boolean` | Narrows the query results to only elements that have been archived.
| `trashed`| `Boolean` | Narrows the query results to only elements that have been soft-deleted.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `preferSites`| `[QueryArgument]` | Determines which site should be selected when querying multi-site elements.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `searchTermOptions`| `SearchTermOptions` | Defines the default options that should be applied terms within the `search` argument.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `notRelatedTo`| `[QueryArgument]` | Narrows the query results to elements that do not relate to the provided element IDs.
| `relatedToAssets`| `[AssetRelationCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryRelationCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserRelationCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryRelationCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagRelationCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `language`| `[String]` | Determines which site(s) the elements should be queried in, based on their language.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by.
| `siteSettingsId`| `[QueryArgument]` | Narrows the query results based on the unique identifier for an element-site relation.
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants in their structure.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element in its structure, provided by its ID.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element in its structure provided by its ID.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element in its structure specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” in their structure (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element in its structure, provided by its ID.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element in its structure, provided by its ID.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element in its structure, provided by its ID.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element in its structure, provided by its ID.
| `editable`| `Boolean` | Whether to only return categories that the user has permission to edit.
| `group`| `[String]` | Narrows the query results based on the category groups the categories belong to per the group’s handles.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the category groups the categories belong to, per the groups’ IDs.

<!-- END QUERIES -->

## List of available directives
Directives are not regulated by permissions and they affect how the returned data is displayed.

<!-- BEGIN DIRECTIVES -->

### The `formatDateTime` directive
Formats a date in the desired format. Can be applied to all fields, only changes output of DateTime fields.
| Argument | Type | Description
| - | - | -
| `format`| `String` | The format to use. Can be `short`, `medium`, `long`, `full`, an [ICU date format](http://userguide.icu-project.org/formatparse/datetime), or a [PHP date format](https://www.php.net/manual/en/function.date.php). Defaults to the [Atom date time format](https://www.php.net/manual/en/class.datetimeinterface.php#datetime.constants.atom]).
| `timezone`| `String` | The full name of the timezone (e.g., America/New_York). Defaults to UTC if no timezone set on the field.
| `locale`| `String` | The locale to use when formatting the date. (E.g., en-US)


### The `markdown` directive
Parses the passed field value as Markdown.
| Argument | Type | Description
| - | - | -
| `flavor`| `String` | The “flavor” of Markdown the input should be interpreted with. Accepts the same arguments as yii\helpers\Markdown::process().
| `inlineOnly`| `Boolean` | Whether to only parse inline elements, omitting any `<p>` tags.


### The `money` directive
Formats a money object to the desired format. It can be applied to any fields, but only changes a Money field.
| Argument | Type | Description
| - | - | -
| `format`| `String` | This specifies the format to output. This can be `amount`, `decimal`, `number`, or `string`. It defaults to the `string`.
| `locale`| `String` | The locale to use when formatting the money value. (e.g. `en_US`). This argument is only valid with `number` and `string` formats.


### The `transform` directive
Returns a URL for an [asset transform](https://craftcms.com/docs/5.x/development/image-transforms.html). Accepts the same arguments you would use for a transform in Craft.
| Argument | Type | Description
| - | - | -
| `handle`| `String` | The handle of the named transform to use.
| `transform`| `String` | The handle of the named transform to use.
| `width`| `Int` | Width for the generated transform
| `height`| `Int` | Height for the generated transform
| `mode`| `String` | The mode to use for the generated transform.
| `position`| `String` | The position to use when cropping, if no focal point specified.
| `interlace`| `String` | The interlace mode to use for the transform
| `quality`| `Int` | The quality of the transform
| `format`| `String` | The format to use for the transform
| `immediately`| `Boolean` | [_Deprecated_] This argument is deprecated and has no effect.


### The `stripTags` directive
Strips HTML tags from the field value.
| Argument | Type | Description
| - | - | -
| `allowed`| `[String]` | List of allowed tag names.


### The `parseRefs` directive
Parses the element references on the field.

### The `trim` directive
Trims leading and trailing whitespace from the field value.

<!-- END DIRECTIVES -->

## Predefined interfaces
Craft defines several interfaces to be implemented by the different GraphQL types.

<!-- BEGIN INTERFACES -->

### The `AddressInterface` interface
This is the interface implemented by all addresses.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The ID of the entity
| `uid`| `String` | The UID of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled.
| `archived`| `Boolean` | Whether the element is archived.
| `siteHandle`| `String` | The handle of the site the element is associated with.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `siteSettingsId`| `ID` | The unique identifier for an element-site relation.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `Int` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted.
| `status`| `String` | The element’s status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `fullName`| `String` | The full name on the address.
| `firstName`| `String` | The first name on the address.
| `lastName`| `String` | The last name on the address.
| `countryCode`| `String!` | Two-letter country code
| `administrativeArea`| `String` | Administrative area.
| `locality`| `String` | Locality
| `dependentLocality`| `String` | Dependent locality
| `postalCode`| `String` | Postal code
| `sortingCode`| `String` | Sorting code
| `addressLine1`| `String` | First line of the address
| `addressLine2`| `String` | Second line of the address
| `addressLine3`| `String` | Third line of the address
| `organization`| `String` | Organization name
| `organizationTaxId`| `String` | Organization tax ID
| `latitude`| `String` | Latitude
| `longitude`| `String` | Longitude


### The `AssetInterface` interface
This is the interface implemented by all assets.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The ID of the entity
| `uid`| `String` | The UID of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled.
| `archived`| `Boolean` | Whether the element is archived.
| `siteHandle`| `String` | The handle of the site the element is associated with.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `siteSettingsId`| `ID` | The unique identifier for an element-site relation.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `Int` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted.
| `status`| `String` | The element’s status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `uploaderId`| `Int` | The ID of the user who first added this asset (if known).
| `uploader`| `UserInterface` | The user who first added this asset (if known).
| `alt`| `String` | Alternative text for the asset.
| `volumeId`| `Int` | The ID of the volume that the asset belongs to.
| `folderId`| `Int!` | The ID of the folder that the asset belongs to.
| `filename`| `String!` | The filename of the asset file.
| `extension`| `String!` | The file extension for the asset file.
| `hasFocalPoint`| `Boolean!` | Whether a user-defined focal point is set on the asset.
| `focalPoint`| `[Float]` | The focal point represented as an array with `x` and `y` keys, or null if it’s not an image.
| `kind`| `String!` | The file kind.
| `size`| `String` | The file size in bytes.
| `height`| `Int` | The height in pixels or null if it’s not an image.
| `width`| `Int` | The width in pixels or null if it’s not an image.
| `img`| `String` | An `<img>` tag based on this asset.
| `srcset`| `String` | Returns a `srcset` attribute value based on the given widths or x-descriptors.
| `url`| `String` | The full URL of the asset. This field accepts the same fields as the `transform` directive.
| `mimeType`| `String` | The file’s MIME type, if it can be determined.
| `format`| `String` | Returns the file’s format.
| `path`| `String!` | The asset’s path in the volume.
| `dateModified`| `DateTime` | The date the asset file was last modified.
| `prev`| `AssetInterface` | Returns the previous element relative to this one, from a given set of criteria.
| `next`| `AssetInterface` | Returns the next element relative to this one, from a given set of criteria.


### The `EntryInterface` interface
This is the interface implemented by all entries.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The ID of the entity
| `uid`| `String` | The UID of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled.
| `archived`| `Boolean` | Whether the element is archived.
| `siteHandle`| `String` | The handle of the site the element is associated with.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `siteSettingsId`| `ID` | The unique identifier for an element-site relation.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `Int` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted.
| `status`| `String` | The element’s status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `lft`| `Int` | The element’s left position within its structure.
| `rgt`| `Int` | The element’s right position within its structure.
| `level`| `Int` | The element’s level within its structure
| `root`| `Int` | The element’s structure’s root ID
| `structureId`| `Int` | The element’s structure ID.
| `isDraft`| `Boolean` | Returns whether this is a draft.
| `isRevision`| `Boolean` | Returns whether this is a revision.
| `revisionId`| `Int` | The revision ID (from the `revisions` table).
| `revisionNotes`| `String` | The revision notes (from the `revisions` table).
| `draftId`| `Int` | The draft ID (from the `drafts` table).
| `isUnpublishedDraft`| `Boolean` | Returns whether this is an unpublished draft.
| `draftName`| `String` | The name of the draft.
| `draftNotes`| `String` | The notes for the draft.
| `authorId`| `Int` | The primary entry author’s ID.
| `author`| `UserInterface` | The primary entry author.
| `authorIds`| `[Int]` | The entry authors’ IDs.
| `authors`| `[UserInterface]` | The entry authors.
| `draftCreator`| `UserInterface` | The creator of a given draft.
| `drafts`| `[EntryInterface]` | The drafts for the entry.
| `revisionCreator`| `UserInterface` | The creator of a given revision.
| `currentRevision`| `EntryInterface` | The current revision for the entry.
| `revisions`| `[EntryInterface]` | The revisions for the entry.
| `canonicalId`| `Int` | Returns the entry’s canonical ID.
| `canonicalUid`| `String` | Returns the entry’s canonical UUID.
| `sourceId`| `Int` | Returns the entry’s canonical ID.
| `sourceUid`| `String` | Returns the entry’s canonical UUID.
| `sectionId`| `Int` | The ID of the section that contains the entry.
| `sectionHandle`| `String` | The handle of the section that contains the entry.
| `fieldId`| `Int` | The ID of the field that contains the entry.
| `fieldHandle`| `String` | The handle of the field that contains the entry.
| `ownerId`| `Int` | The ID of the entry’s owner element.
| `sortOrder`| `Int` | The entry’s position within the field that contains it.
| `typeId`| `Int!` | The ID of the entry type that contains the entry.
| `typeHandle`| `String!` | The handle of the entry type that contains the entry.
| `postDate`| `DateTime` | The entry’s post date.
| `expiryDate`| `DateTime` | The expiry date of the entry.
| `children`| `[EntryInterface!]!` | The entry’s children, if the section is a structure. Accepts the same arguments as the `entries` query.
| `descendants`| `[EntryInterface!]!` | The entry’s descendants, if the section is a structure. Accepts the same arguments as the `entries` query.
| `parent`| `EntryInterface` | The entry’s parent, if the section is a structure.
| `ancestors`| `[EntryInterface!]!` | The entry’s ancestors, if the section is a structure. Accepts the same arguments as the `entries` query.
| `url`| `String` | The element’s full URL
| `localized`| `[EntryInterface!]!` | The same element in other locales.
| `prev`| `EntryInterface` | Returns the previous element relative to this one, from a given set of criteria.
| `next`| `EntryInterface` | Returns the next element relative to this one, from a given set of criteria.
| `enabledForSite`| `Boolean` | Whether the element is enabled for the site.


### The `GlobalSetInterface` interface
This is the interface implemented by all global sets.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The ID of the entity
| `uid`| `String` | The UID of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled.
| `archived`| `Boolean` | Whether the element is archived.
| `siteHandle`| `String` | The handle of the site the element is associated with.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `siteSettingsId`| `ID` | The unique identifier for an element-site relation.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `Int` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted.
| `status`| `String` | The element’s status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `name`| `String!` | The name of the global set.
| `handle`| `String!` | The handle of the global set.


### The `UserInterface` interface
This is the interface implemented by all users.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The ID of the entity
| `uid`| `String` | The UID of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled.
| `archived`| `Boolean` | Whether the element is archived.
| `siteHandle`| `String` | The handle of the site the element is associated with.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `siteSettingsId`| `ID` | The unique identifier for an element-site relation.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `Int` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted.
| `status`| `String` | The element’s status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `photo`| `AssetInterface` | The user’s photo.
| `friendlyName`| `String` | The user’s first name or username.
| `fullName`| `String` | The user’s full name.
| `name`| `String!` | The user’s full name or username.
| `preferences`| `String!` | The user’s preferences.
| `preferredLanguage`| `String` | The user’s preferred language.
| `username`| `String` | The username.
| `firstName`| `String` | The user’s first name.
| `lastName`| `String` | The user’s last name.
| `email`| `String` | The user’s email.
| `affiliatedSiteHandle`| `String` | The handle of the site the user is affiliated with.
| `affiliatedSiteId`| `Int` | The ID of the site the user is affiliated with.
| `addresses`| `[AddressInterface]` | The user’s addresses.


### The `CategoryInterface` interface
This is the interface implemented by all categories.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The ID of the entity
| `uid`| `String` | The UID of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled.
| `archived`| `Boolean` | Whether the element is archived.
| `siteHandle`| `String` | The handle of the site the element is associated with.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `siteSettingsId`| `ID` | The unique identifier for an element-site relation.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `Int` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted.
| `status`| `String` | The element’s status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `lft`| `Int` | The element’s left position within its structure.
| `rgt`| `Int` | The element’s right position within its structure.
| `level`| `Int` | The element’s level within its structure
| `root`| `Int` | The element’s structure’s root ID
| `structureId`| `Int` | The element’s structure ID.
| `groupId`| `Int!` | The ID of the group that contains the category.
| `groupHandle`| `String!` | The handle of the group that contains the category.
| `children`| `[CategoryInterface!]!` | The category’s children.
| `descendants`| `[CategoryInterface!]!` | The category’s descendants, if the section is a structure. Accepts the same arguments as the `entries` query.
| `ancestors`| `[CategoryInterface!]!` | The category’s ancestors, if the section is a structure. Accepts the same arguments as the `entries` query.
| `parent`| `CategoryInterface` | The category’s parent.
| `url`| `String` | The element’s full URL
| `localized`| `[CategoryInterface!]!` | The same element in other locales.
| `prev`| `CategoryInterface` | Returns the previous element relative to this one, from a given set of criteria.
| `next`| `CategoryInterface` | Returns the next element relative to this one, from a given set of criteria.


### The `TagInterface` interface
This is the interface implemented by all tags.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The ID of the entity
| `uid`| `String` | The UID of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled.
| `archived`| `Boolean` | Whether the element is archived.
| `siteHandle`| `String` | The handle of the site the element is associated with.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `siteSettingsId`| `ID` | The unique identifier for an element-site relation.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `Int` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted.
| `status`| `String` | The element’s status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `groupId`| `Int!` | The ID of the group that contains the tag.
| `groupHandle`| `String!` | The handle of the group that contains the tag.

<!-- END INTERFACES -->

## Mutations

GraphQL mutations provide a way to modify data. The actual mutations will vary depending on the [schema](#define-your-schemas) and what it allows. There are common mutations per GraphQL object type and additional type-specific mutations.

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

::: warning
For security reasons, [users](../reference/element-types/users.md) cannot be created, updated, or deleted via GraphQL.
:::

### Matrix Fields in Mutations

Connecting GraphQL’s input types to complex [Matrix fields](../reference/field-types/matrix.md) can be challenging.

::: tip
We recommend studying how to [save Matrix field data in entry forms](../reference/field-types/matrix.md#saving-matrix-fields) before diving in to the equivalent GraphQL.
:::

Matrix input types have the following structure, and are always named `{fieldHandle}_MatrixInput`:

| Field | Description
| --- | ---
| `sortOrder` | A list of all the nested entry IDs, including any new entries, in the order you’d like to persist after the mutation.
| `entries` | A list of all the actual entries. You can omit any entries that aren’t modified, but they must be represented on the `sortOrder` field or they’ll be deleted.

As an example, let’s pretend we have a Matrix field with a handle `ingredients`. The field has three entry types: `spirit`, `mixer`, and `garnish`. Each entry type has one or two fields:

```
ingredients (Matrix field)
├── spirit (Entry type)
│   ├── spiritName (Plain Text)
│   └── ounces (Number)
├── mixer (Entry type)
│   ├── mixerName (Plain Text)
│   └── ounces (Number)
└── garnish (Entry type)
    └── garnishName (Plain Text)
```

These are all the GraphQL “input types” Craft generates for this Matrix field:

| Type Name | Type Description |
| --- | --- |
| `ingredients_MatrixInput` | Input type for the Matrix field, containing `sortOrder` and `entries`.
| `ingredients_MatrixEntryContainerInput` | Input type that represents the block, in this case containing `spirit`, `mixer`, and `garnish`.
| `ingredients_spirit_MatrixEntryInput` | Input type for `spirit` entries, containing `spiritName` and `ounces` fields.
| `ingredients_mixer_MatrixEntryInput` | Input type for `mixer` entries, containing `mixerName` and `ounces` fields.
| `ingredients_garnish_MatrixEntryInput` | Input type for `garnish` entries, containing the `garnishName` field.

Those input types would look like this in [GraphQL Schema Definition Language (SDL)](https://www.prisma.io/blog/graphql-sdl-schema-definition-language-6755bcb9ce51):

```graphql
input ingredients_MatrixInput {
  sortOrder: [QueryArgument]!
  entries: [ingredients_MatrixEntryContainerInput]
}

input ingredients_MatrixEntryContainerInput {
  spirit: ingredients_spirit_MatrixEntryInput
  mixer: ingredients_mixer_MatrixEntryInput
  garnish: ingredients_garnish_MatrixEntryInput
}

input ingredients_spirit_MatrixEntryInput {
  # ... common entry fields ...
  spiritName: String
  ounces: Number
}

input ingredients_mixer_MatrixEntryInput {
  # ... common entry fields ...
  mixerName: String
  ounces: Number
}

input ingredients_garnish_MatrixEntryInput {
  # ... common entry fields ...
  garnishName: String
}
```

A mutation saving a new entry with multiple nested entries might look like this:

::: code
```graphql GraphQL
mutation saveEntry(
  $title: String,
  $slug: String,
  $authorId: ID,
  $ingredients: [ingredients_MatrixEntryContainerInput],
  $sortOrder: [QueryArgument]
) {
  save_cocktails_cocktail_Entry(
    title: $title,
    slug: $slug,
    authorId: $authorId,
    ingredients: { entries: $ingredients, sortOrder: $sortOrder }
  ) {
    title
    slug
    authorId
    dateCreated @formatDateTime (format: "Y-m-d")
    ingredients {
      __typename

      ...on EntryInterface {
        id
      }

      ... on spirit_entry {
        spiritName
        ounces
      }

      ... on mixer_Entry {
        mixerName
        ounces
      }

      ... on garnish_Entry {
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
    "save_cocktails_cocktail_Entry": {
      "title": "Gin and Tonic",
      "slug": "gin-tonic",
      "authorId": 1,
      "dateCreated": "2021-03-04",
      "ingredients": [
        {
          "__typename": "spirit_Entry",
          "id": "9",
          "spiritName": "Gin",
          "ounces": 2
        },
        {
          "__typename": "mixer_Entry",
          "id": "10",
          "mixerName": "Tonic",
          "ounces": 4
        },
        {
          "__typename": "mixer_Entry",
          "id": "11",
          "mixerName": "Fresh Lime Juice",
          "ounces": 0.25
        },
        {
          "__typename": "garnish_Entry",
          "id": "12",
          "garnishName": "Lime Wedge or Twist"
        }
      ]
    }
  }
}
```
:::

### Saving Files via Mutations

You can provide files for assets as either `base64`-encoded data, or a URL that Craft will download.

Either way, you’ll use the `FileInput` GraphQL input type, which has the following fields:

| Field      | Description
| ---------- | -----------
| `url`      | URL of a file to be downloaded.
| `fileData` | File contents in base64 format. If provided, takes precedence over `url`.
| `filename` | Filename to use for the saved asset. If omitted, Craft will create a filename.

### Mutating Entries

#### Saving an Entry

[Entries](../reference/element-types/entries.md) are created and updated with mutations named after the combination of the target section and entry type, like `save_{sectionHandle}_{typeHandle}_Entry`:

::: tip
See the section on [Matrix mutations](#matrix-fields-in-mutations) for more information about saving nested entries.
:::

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

The `id`, `uid` and `authorId` arguments do not exist for single entries. This is because single entries have no authors and are identified already by the exact mutation. In a similar fashion, there are additional arguments available for structured entries. For more information, refer to [mutating structure data](#mutating-structure-data).

::: tip
After saving an entry, Craft runs queue jobs for updating revisions and search indexes. If you’re using Craft headlessly or infrequently accessing the control panel, consider disabling <config5:runQueueAutomatically> and [establishing an always-running daemon](../system/queue.md#daemon) to keep revisions and search indexes up to date.
:::

#### Editing Existing Entries

You can modify existing entries by passing the populated `id` argument to your mutation.

#### Saving a Draft

Entry _drafts_ are created and updated with mutations named after the combination of the target section and entry type, like `save_{sectionHandle}_{typeHandle}_Draft`:

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

You can use the generic `createDraft` mutation to create a new draft. It requires the `id` of the draft’s canonical entry and returns the ID of the newly-saved draft:

::: code
```graphql Query
mutation MyNewDraft {
  createDraft(id: 1234)
}
```
```json Response
{
  "data": {
    "createDraft": "5678"
  }
}
```
:::

Additional (optional) arguments include a `name` for the draft, `notes`, a `creatorId` (if the draft should be created on behalf of a specific user), and a `provisional` flag. Provisional drafts (referred to in the control panel as auto-saved changes)

_Applying_ a draft is handled in the same way, but with the `publishDraft` mutation. It requires the `id` of the draft to be published and returns the ID of the updated canonical entry:

::: code
```graphql Query
mutation PublishMyDraft {
  publishDraft(id: 5678)
}
```
```json Response
{
  "data": {
    "publishDraft": "1234"
  }
}
```
:::

Neither mutation accepts properties or custom field values—use the appropriate [entry mutation](#saving-an-entry) to update a draft after it has been created. To work with drafts, the [schema](#define-your-schemas) must allow creating and saving entries in the canonical entry’s section; unlike user permissions, schemas do not have discrete permissions for draft creation and canonical entry mutations.

#### Deleting an Entry

You can delete an entry using the `deleteEntry` mutation, which requires the `id` of the entry to be deleted. It returns a boolean value indicating whether the operation was successful.

### Mutating Assets

#### Saving an Asset

To create or update an [asset](../reference/element-types/assets.md), use the volume-specific mutation which will have a name in the form of `save_<volumeHandle>_Asset`:

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

To create or update a [tag](../reference/element-types/tags.md), use the tag group-specific mutation which will have a name in the form of `save_<tagGroupHandle>_Tag`:

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

To create or update a [category](../reference/element-types/categories.md), use the category group-specific mutation which will have a name in the form of `save_<categoryGroupHandle>_Category`.

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

## Further Reading

If you’re looking to add GraphQL support in your own plugin or module, see [Extending GraphQL](../extend/graphql.md).
