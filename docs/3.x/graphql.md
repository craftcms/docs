---
keywords: headless
---

# GraphQL API <badge type="edition" vertical="middle" title="GraphQL is only available in Craft Pro">Pro</badge>

Craft Pro provides a [GraphQL](https://graphql.org) API you can use to work with your content in separate applications like single-page apps (SPAs) and static site generators.

## Getting Started

Make sure you’re running Craft Pro 3.3 or later and [the `enableGql` setting](config3:enableGql) is not set to `false`.

Because GraphQL is self-documenting, you can jump right into Craft’s included [GraphiQL IDE](#using-the-graphiql-ide) from the control panel and interactively build and execute queries. Querying from the control panel gives you full access to data that’s available, unlike queries from the outside that require [and endpoint and appropriate permissions](#setting-up-your-api-endpoint).

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
{{ craft.app.getRequest().getHeaders().has('authorization') ?
    'auth token present ✓' : 
    'auth token missing!' }}
```

Apache strips `Authorization` headers by default, which can be fixed by enabling [CGIPassAuth](https://httpd.apache.org/docs/2.4/en/mod/core.html#cgipassauth) or adding the following to your `.htaccess` file:

```
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
```
:::

## Caching

Query results are cached to speed up subsequent queries. The GraphQL result cache is very simple, so if the site’s content or structure changes, the entire cache is invalidated.

Craft’s GraphQL result caching is enabled by default and you can disable it with the <config3:enableGraphQlCaching> setting.

## Interface Implementation

A defined type exists for each specific interface implementation. For example, if a “News” section has “Article” and “Editorial” entry types, in addition to the `EntryInterface` interface type, two additional types would be defined the GraphQL schema, if the token used allows it: `news_article_Entry` and `news_editorial_Entry` types.

## Query Reference

::: tip
The actual API features will depend on what your schema allows.
:::

<!-- BEGIN QUERIES -->

### The `assets` query
This query is used to query for assets.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `volumeId`| `[QueryArgument]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ IDs.
| `volume`| `[String]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ handles.
| `folderId`| `[QueryArgument]` | Narrows the query results based on the folders the assets belong to, per the folders’ IDs.
| `filename`| `[String]` | Narrows the query results based on the assets’ filenames.
| `kind`| `[String]` | Narrows the query results based on the assets’ file kinds.
| `height`| `[String]` | Narrows the query results based on the assets’ image heights.
| `width`| `[String]` | Narrows the query results based on the assets’ image widths.
| `size`| `[String]` | Narrows the query results based on the assets’ file sizes (in bytes).
| `dateModified`| `String` | Narrows the query results based on the assets’ files’ last-modified dates.
| `includeSubfolders`| `Boolean` | Broadens the query results to include assets from any of the subfolders of the folder specified by `folderId`.
| `withTransforms`| `[String]` | A list of transform handles to preload.
| `uploader`| `QueryArgument` | Narrows the query results based on the user the assets were uploaded by, per the user’s ID.

### The `assetCount` query
This query is used to return the number of assets.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `volumeId`| `[QueryArgument]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ IDs.
| `volume`| `[String]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ handles.
| `folderId`| `[QueryArgument]` | Narrows the query results based on the folders the assets belong to, per the folders’ IDs.
| `filename`| `[String]` | Narrows the query results based on the assets’ filenames.
| `kind`| `[String]` | Narrows the query results based on the assets’ file kinds.
| `height`| `[String]` | Narrows the query results based on the assets’ image heights.
| `width`| `[String]` | Narrows the query results based on the assets’ image widths.
| `size`| `[String]` | Narrows the query results based on the assets’ file sizes (in bytes).
| `dateModified`| `String` | Narrows the query results based on the assets’ files’ last-modified dates.
| `includeSubfolders`| `Boolean` | Broadens the query results to include assets from any of the subfolders of the folder specified by `folderId`.
| `withTransforms`| `[String]` | A list of transform handles to preload.
| `uploader`| `QueryArgument` | Narrows the query results based on the user the assets were uploaded by, per the user’s ID.

### The `asset` query
This query is used to query for a single asset.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `volumeId`| `[QueryArgument]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ IDs.
| `volume`| `[String]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ handles.
| `folderId`| `[QueryArgument]` | Narrows the query results based on the folders the assets belong to, per the folders’ IDs.
| `filename`| `[String]` | Narrows the query results based on the assets’ filenames.
| `kind`| `[String]` | Narrows the query results based on the assets’ file kinds.
| `height`| `[String]` | Narrows the query results based on the assets’ image heights.
| `width`| `[String]` | Narrows the query results based on the assets’ image widths.
| `size`| `[String]` | Narrows the query results based on the assets’ file sizes (in bytes).
| `dateModified`| `String` | Narrows the query results based on the assets’ files’ last-modified dates.
| `includeSubfolders`| `Boolean` | Broadens the query results to include assets from any of the subfolders of the folder specified by `folderId`.
| `withTransforms`| `[String]` | A list of transform handles to preload.
| `uploader`| `QueryArgument` | Narrows the query results based on the user the assets were uploaded by, per the user’s ID.

### The `entries` query
This query is used to query for entries.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element.
| `editable`| `Boolean` | Whether to only return entries that the user has permission to edit.
| `section`| `[String]` | Narrows the query results based on the section handles the entries belong to.
| `sectionId`| `[QueryArgument]` | Narrows the query results based on the sections the entries belong to, per the sections’ IDs.
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
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element.
| `editable`| `Boolean` | Whether to only return entries that the user has permission to edit.
| `section`| `[String]` | Narrows the query results based on the section handles the entries belong to.
| `sectionId`| `[QueryArgument]` | Narrows the query results based on the sections the entries belong to, per the sections’ IDs.
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
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element.
| `editable`| `Boolean` | Whether to only return entries that the user has permission to edit.
| `section`| `[String]` | Narrows the query results based on the section handles the entries belong to.
| `sectionId`| `[QueryArgument]` | Narrows the query results based on the sections the entries belong to, per the sections’ IDs.
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
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `handle`| `[String]` | Narrows the query results based on the global sets’ handles.

### The `globalSet` query
This query is used to query for a single global set.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `handle`| `[String]` | Narrows the query results based on the global sets’ handles.

### The `users` query
This query is used to query for users.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `email`| `[String]` | Narrows the query results based on the users’ email addresses.
| `username`| `[String]` | Narrows the query results based on the users’ usernames.
| `firstName`| `[String]` | Narrows the query results based on the users’ first names.
| `lastName`| `[String]` | Narrows the query results based on the users’ last names.
| `hasPhoto`| `Boolean` | Narrows the query results to only users that have (or don’t have) a user photo.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the user group the users belong to, per the groups’ IDs.
| `group`| `[QueryArgument]` | Narrows the query results based on the user group the users belong to.

### The `userCount` query
This query is used to return the number of users.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `email`| `[String]` | Narrows the query results based on the users’ email addresses.
| `username`| `[String]` | Narrows the query results based on the users’ usernames.
| `firstName`| `[String]` | Narrows the query results based on the users’ first names.
| `lastName`| `[String]` | Narrows the query results based on the users’ last names.
| `hasPhoto`| `Boolean` | Narrows the query results to only users that have (or don’t have) a user photo.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the user group the users belong to, per the groups’ IDs.
| `group`| `[QueryArgument]` | Narrows the query results based on the user group the users belong to.

### The `user` query
This query is used to query for a single user.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `email`| `[String]` | Narrows the query results based on the users’ email addresses.
| `username`| `[String]` | Narrows the query results based on the users’ usernames.
| `firstName`| `[String]` | Narrows the query results based on the users’ first names.
| `lastName`| `[String]` | Narrows the query results based on the users’ last names.
| `hasPhoto`| `Boolean` | Narrows the query results to only users that have (or don’t have) a user photo.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the user group the users belong to, per the groups’ IDs.
| `group`| `[QueryArgument]` | Narrows the query results based on the user group the users belong to.

### The `tags` query
This query is used to query for tags.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `group`| `[String]` | Narrows the query results based on the tag groups the tags belong to per the group’s handles.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the tag groups the tags belong to, per the groups’ IDs.

### The `tagCount` query
This query is used to return the number of tags.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `group`| `[String]` | Narrows the query results based on the tag groups the tags belong to per the group’s handles.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the tag groups the tags belong to, per the groups’ IDs.

### The `tag` query
This query is used to query for a single tag.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `group`| `[String]` | Narrows the query results based on the tag groups the tags belong to per the group’s handles.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the tag groups the tags belong to, per the groups’ IDs.

### The `categories` query
This query is used to query for categories.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element.
| `editable`| `Boolean` | Whether to only return categories that the user has permission to edit.
| `group`| `[String]` | Narrows the query results based on the category groups the categories belong to per the group’s handles.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the category groups the categories belong to, per the groups’ IDs.

### The `categoryCount` query
This query is used to return the number of categories.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element.
| `editable`| `Boolean` | Whether to only return categories that the user has permission to edit.
| `group`| `[String]` | Narrows the query results based on the category groups the categories belong to per the group’s handles.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the category groups the categories belong to, per the groups’ IDs.

### The `category` query
This query is used to query for a single category.
| Argument | Type | Description
| - | - | -
| `id`| `[QueryArgument]` | Narrows the query results based on the elements’ IDs.
| `uid`| `[String]` | Narrows the query results based on the elements’ UIDs.
| `site`| `[String]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `siteId`| `[QueryArgument]` | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.
| `unique`| `Boolean` | Determines whether only elements with unique IDs should be returned by the query.
| `enabledForSite`| `Boolean` | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.
| `title`| `[String]` | Narrows the query results based on the elements’ titles.
| `slug`| `[String]` | Narrows the query results based on the elements’ slugs.
| `uri`| `[String]` | Narrows the query results based on the elements’ URIs.
| `search`| `String` | Narrows the query results to only elements that match a search query.
| `relatedTo`| `[QueryArgument]` | Narrows the query results to elements that relate to the provided element IDs. This argument is ignored, if `relatedToAll` is also used.
| `relatedToAssets`| `[AssetCriteriaInput]` | Narrows the query results to elements that relate to an asset list defined with this argument.
| `relatedToEntries`| `[EntryCriteriaInput]` | Narrows the query results to elements that relate to an entry list defined with this argument.
| `relatedToUsers`| `[UserCriteriaInput]` | Narrows the query results to elements that relate to a use list defined with this argument.
| `relatedToCategories`| `[CategoryCriteriaInput]` | Narrows the query results to elements that relate to a category list defined with this argument.
| `relatedToTags`| `[TagCriteriaInput]` | Narrows the query results to elements that relate to a tag list defined with this argument.
| `relatedToAll`| `[QueryArgument]` | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead.
| `ref`| `[String]` | Narrows the query results based on a reference string.
| `fixedOrder`| `Boolean` | Causes the query results to be returned in the order specified by the `id` argument.
| `inReverse`| `Boolean` | Causes the query results to be returned in reverse order.
| `dateCreated`| `[String]` | Narrows the query results based on the elements’ creation dates.
| `dateUpdated`| `[String]` | Narrows the query results based on the elements’ last-updated dates.
| `offset`| `Int` | Sets the offset for paginated results.
| `limit`| `Int` | Sets the limit for paginated results.
| `orderBy`| `String` | Sets the field the returned elements should be ordered by
| `withStructure`| `Boolean` | Explicitly determines whether the query should join in the structure data.
| `structureId`| `Int` | Determines which structure data should be joined into the query.
| `level`| `Int` | Narrows the query results based on the elements’ level within the structure.
| `hasDescendants`| `Boolean` | Narrows the query results based on whether the elements have any descendants.
| `ancestorOf`| `Int` | Narrows the query results to only elements that are ancestors of another element.
| `ancestorDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element specified by `ancestorOf`.
| `descendantOf`| `Int` | Narrows the query results to only elements that are descendants of another element.
| `descendantDist`| `Int` | Narrows the query results to only elements that are up to a certain distance away from the element specified by `descendantOf`.
| `leaves`| `Boolean` | Narrows the query results based on whether the elements are “leaves” (element with no descendants).
| `nextSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately after another element.
| `prevSiblingOf`| `Int` | Narrows the query results to only the entry that comes immediately before another element.
| `positionedAfter`| `Int` | Narrows the query results to only entries that are positioned after another element.
| `positionedBefore`| `Int` | Narrows the query results to only entries that are positioned before another element.
| `editable`| `Boolean` | Whether to only return categories that the user has permission to edit.
| `group`| `[String]` | Narrows the query results based on the category groups the categories belong to per the group’s handles.
| `groupId`| `[QueryArgument]` | Narrows the query results based on the category groups the categories belong to, per the groups’ IDs.

<!-- END QUERIES -->

## List of available directives
Directives are not regulated by permissions and they affect how the returned data is displayed.

<!-- BEGIN DIRECTIVES -->

### The `formatDateTime` directive
This directive allows for formatting any date to the desired format. It can be applied to all fields, but changes anything only when applied to a DateTime field.
| Argument | Type | Description
| - | - | -
| `format`| `String` | This specifies the format to use. This can be `short`, `medium`, `long`, `full`, an [ICU date format](http://userguide.icu-project.org/formatparse/datetime), or a [PHP date format](https://www.php.net/manual/en/function.date.php). It defaults to the [Atom date time format](https://www.php.net/manual/en/class.datetimeinterface.php#datetime.constants.atom]).
| `timezone`| `String` | The full name of the timezone, defaults to UTC. (E.g., America/New_York)
| `locale`| `String` | The locale to use when formatting the date. (E.g., en-US)


### The `transform` directive
This directive is used to return a URL for an [asset transform](https://craftcms.com/docs/3.x/image-transforms.html). It accepts the same arguments you would use for a transform in Craft and adds the `immediately` argument.
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
| `immediately`| `Boolean` | Whether the transform should be generated immediately or only when the image is requested used the generated URL


### The `markdown` directive
Parses the passed field value as Markdown.
| Argument | Type | Description
| - | - | -
| `flavor`| `String` | The “flavor” of Markdown the input should be interpreted with. Accepts the same arguments as yii\helpers\Markdown::process().
| `inlineOnly`| `Boolean` | Whether to only parse inline elements, omitting any `<p>` tags.

<!-- END DIRECTIVES -->

## Pre-defined interfaces
Craft defines several interfaces to be implemented by the different GraphQL types.

<!-- BEGIN INTERFACES -->

### The `AssetInterface` interface
This is the interface implemented by all assets.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The id of the entity
| `uid`| `String` | The uid of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled or not.
| `archived`| `Boolean` | Whether the element is archived or not.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `String` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted or not.
| `status`| `String` | The element's status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `volumeId`| `Int` | The ID of the volume that the asset belongs to.
| `folderId`| `Int` | The ID of the folder that the asset belongs to.
| `filename`| `String` | The filename of the asset file.
| `extension`| `String` | The file extension for the asset file.
| `hasFocalPoint`| `Boolean` | Whether a user-defined focal point is set on the asset.
| `focalPoint`| `[Float]` | The focal point represented as an array with `x` and `y` keys, or null if it's not an image.
| `kind`| `String` | The file kind.
| `size`| `String` | The file size in bytes.
| `height`| `Int` | The height in pixels or null if it's not an image.
| `width`| `Int` | The width in pixels or null if it's not an image.
| `img`| `String` | An `<img>` tag based on this asset.
| `srcset`| `String` | Returns a `srcset` attribute value based on the given widths or x-descriptors.
| `url`| `String` | The full URL of the asset. This field accepts the same fields as the `transform` directive.
| `mimeType`| `String` | The file’s MIME type, if it can be determined.
| `path`| `String` | The asset's path in the volume.
| `dateModified`| `DateTime` | The date the asset file was last modified.
| `prev`| `AssetInterface` | Returns the previous element relative to this one, from a given set of criteria.
| `next`| `AssetInterface` | Returns the next element relative to this one, from a given set of criteria.


### The `EntryInterface` interface
This is the interface implemented by all entries.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The id of the entity
| `uid`| `String` | The uid of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled or not.
| `archived`| `Boolean` | Whether the element is archived or not.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `String` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted or not.
| `status`| `String` | The element's status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `lft`| `Int` | The element’s left position within its structure.
| `rgt`| `Int` | The element’s right position within its structure.
| `level`| `Int` | The element’s level within its structure
| `root`| `Int` | The element’s structure’s root ID
| `structureId`| `Int` | The element’s structure ID.
| `isDraft`| `Boolean` | Returns whether this is a draft.
| `isRevision`| `Boolean` | Returns whether this is a revision.
| `sourceId`| `Int` | Returns the element’s ID, or if it’s a draft/revision, its source element’s ID.
| `sourceUid`| `String` | Returns the element’s UUID, or if it’s a draft/revision, its source element’s UUID.
| `draftId`| `Int` | The ID of the draft to return (from the `drafts` table)
| `isUnpublishedDraft`| `Boolean` | Returns whether this is an unpublished draft.
| `isUnsavedDraft`| `Boolean` | Returns whether this is an unpublished draft. **This field is deprecated.** `isUnpublishedDraft` should be used instead.
| `draftName`| `String` | The name of the draft.
| `draftNotes`| `String` | The notes for the draft.
| `sectionId`| `Int` | The ID of the section that contains the entry.
| `sectionHandle`| `String` | The handle of the section that contains the entry.
| `typeId`| `Int` | The ID of the entry type that contains the entry.
| `typeHandle`| `String` | The handle of the entry type that contains the entry.
| `postDate`| `DateTime` | The entry's post date.
| `expiryDate`| `DateTime` | The expiry date of the entry.
| `children`| `[EntryInterface]` | The entry’s children, if the section is a structure. Accepts the same arguments as the `entries` query.
| `parent`| `EntryInterface` | The entry’s parent, if the section is a structure.
| `url`| `String` | The element’s full URL
| `localized`| `[EntryInterface]` | The same element in other locales.
| `prev`| `EntryInterface` | Returns the previous element relative to this one, from a given set of criteria.
| `next`| `EntryInterface` | Returns the next element relative to this one, from a given set of criteria.


### The `GlobalSetInterface` interface
This is the interface implemented by all global sets.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The id of the entity
| `uid`| `String` | The uid of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled or not.
| `archived`| `Boolean` | Whether the element is archived or not.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `String` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted or not.
| `status`| `String` | The element's status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `name`| `String` | The name of the global set.
| `handle`| `String` | The handle of the global set.


### The `MatrixBlockInterface` interface
This is the interface implemented by all matrix blocks.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The id of the entity
| `uid`| `String` | The uid of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled or not.
| `archived`| `Boolean` | Whether the element is archived or not.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `String` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted or not.
| `status`| `String` | The element's status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `fieldId`| `Int` | The ID of the field that owns the matrix block.
| `ownerId`| `Int` | The ID of the element that owns the matrix block.
| `typeId`| `Int` | The ID of the matrix block's type.
| `typeHandle`| `String` | The handle of the matrix block's type.
| `sortOrder`| `Int` | The sort order of the matrix block within the owner element field.


### The `UserInterface` interface
This is the interface implemented by all users.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The id of the entity
| `uid`| `String` | The uid of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled or not.
| `archived`| `Boolean` | Whether the element is archived or not.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `String` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted or not.
| `status`| `String` | The element's status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `friendlyName`| `String` | The user's first name or username.
| `fullName`| `String` | The user's full name.
| `name`| `String` | The user's full name or username.
| `preferences`| `String` | The user’s preferences.
| `preferredLanguage`| `String` | The user’s preferred language.
| `username`| `String` | The username.
| `firstName`| `String` | The user's first name.
| `lastName`| `String` | The user's last name.
| `email`| `String` | The user's email.


### The `CategoryInterface` interface
This is the interface implemented by all categories.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The id of the entity
| `uid`| `String` | The uid of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled or not.
| `archived`| `Boolean` | Whether the element is archived or not.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `String` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted or not.
| `status`| `String` | The element's status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `lft`| `Int` | The element’s left position within its structure.
| `rgt`| `Int` | The element’s right position within its structure.
| `level`| `Int` | The element’s level within its structure
| `root`| `Int` | The element’s structure’s root ID
| `structureId`| `Int` | The element’s structure ID.
| `groupId`| `Int` | The ID of the group that contains the category.
| `groupHandle`| `String` | The handle of the group that contains the category.
| `children`| `[CategoryInterface]` | The category’s children.
| `parent`| `CategoryInterface` | The category’s parent.
| `url`| `String` | The element’s full URL
| `localized`| `[CategoryInterface]` | The same element in other locales.
| `prev`| `CategoryInterface` | Returns the previous element relative to this one, from a given set of criteria.
| `next`| `CategoryInterface` | Returns the next element relative to this one, from a given set of criteria.


### The `TagInterface` interface
This is the interface implemented by all tags.
| Field | Type | Description
| - | - | -
| `id`| `ID` | The id of the entity
| `uid`| `String` | The uid of the entity
| `_count`| `Int` | Return a number of related elements for a field.
| `title`| `String` | The element’s title.
| `slug`| `String` | The element’s slug.
| `uri`| `String` | The element’s URI.
| `enabled`| `Boolean` | Whether the element is enabled or not.
| `archived`| `Boolean` | Whether the element is archived or not.
| `siteId`| `Int` | The ID of the site the element is associated with.
| `language`| `String` | The language of the site element is associated with.
| `searchScore`| `String` | The element’s search score, if the `search` parameter was used when querying for the element.
| `trashed`| `Boolean` | Whether the element has been soft-deleted or not.
| `status`| `String` | The element's status.
| `dateCreated`| `DateTime` | The date the element was created.
| `dateUpdated`| `DateTime` | The date the element was last updated.
| `groupId`| `Int` | The ID of the group that contains the tag.
| `groupHandle`| `String` | The handle of the group that contains the tag.

<!-- END INTERFACES -->

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

To create or update a [category](categories.md), use the category group-specific mutation which will have a name in the form of `save_<categoryGroupHandle>_Tag`.

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
