# Reference Tags

Reference tags can be used to create references to specific [elements](elements.md) in your site from any textual fields, including text cells within a [Table](../reference/field-types/table.md) field. Some field types automatically parse reference tags, and others may need to be [explicitly parsed](#parsing-reference-tags).

A reference tag usually takes this form:

```twig
{<Type>:<Identifier>(@<Site>):<Property>}
```

Curly braces (`{}`) surround three segments, separated by colons (`:`):

1.  `<Type>` – The type of element you’re creating a reference to. This can be a fully-qualified element class name (e.g. `craft\elements\Entry`) or the element type’s “reference handle”.

    Core element types have the following reference handles:

    - Addresses: `address`
    - Assets: `asset`
    - Categories: `category`
    - Entries: `entry`
    - Global Sets: `globalset`
    - Tags: `tag`
    - Users: `user`

2.  `<Identifier>` – Either the element’s ID or a custom identifier supported by the element type:

    - Entries: `my-entry-slug`, or `mySection/my-entry-slug`
    - Categories: `my-category-slug` or `myGroup/my-category-slug`
    - Global sets: `setHandle`

    Identifiers can also include the ID, UUID, or handle of a site that the element should be loaded from, using an `@<Site>` syntax.

3.  `<Property>` _(optional)_ – The element property that the reference tag should return. If omitted, the element’s URL will be returned.

    You can refer to the element types’ class references for a list of available properties:

    - [craft\elements\Address](craft4:craft\elements\Entry#public-properties)
    - [craft\elements\Asset](craft4:craft\elements\Asset#public-properties)
    - [craft\elements\Category](craft4:craft\elements\Category#public-properties)
    - [craft\elements\Entry](craft4:craft\elements\Entry#public-properties)
    - [craft\elements\GlobalSet](craft4:craft\elements\GlobalSet#public-properties)
    - [craft\elements\Tag](craft4:craft\elements\Tag#public-properties)
    - [craft\elements\User](craft4:craft\elements\User#public-properties)

    Custom field handles are also supported, for field types with values that can be represented as strings.

### Examples

The following are all valid reference tag formats:

- `{asset:123:filename}` — returns the filename of an asset with the ID of `123` (via <craft4:craft\elements\Asset::getFilename()>).
- `{entry:blog/whats-on-tap}` — returns the URL of an entry in a `blog` section with the slug `whats-on-tap`.
- `{entry:blog/whats-on-tap@en:intro}` — returns the value of an `intro` custom field on a `blog` section entry with the slug `whats-on-tap`, loaded from the site with the handle `en`.
- `{craft\commerce\Variant:123:price}` — returns the price of a Commerce Variant object with the ID of `123`. Note that no formatting will be applied to the price!
- `{globalset:siteInfo:description}` — returns the value of a `description` field on a global set with the handle `siteInfo`.

## Generating Tags

Some element types ([assets](../reference/element-types/assets.md), for instance) allow you to copy a basic reference tag from element indexes. Select a single row, then use the actions menu <icon kind="gear" /> to **Copy reference tag**. You can edit the copied tag to output a specific property—or let Craft decide the best representation (typically its URL).

## Parsing Reference Tags

You can parse any string for reference tags in your templates using the [parseRefs](reference/twig/filters.md#parserefs) filter:

```twig
{{ entry.body|parseRefs|raw }}
```

The equivalent function is available via <craft4:craft\services\Elements>:

```php
$parsed = Craft::$app->getElements()->parseRefs($text);
```

Both functions take an optional `$siteId` param, which will determine what site the references are assumed to be in, if a tag doesn’t explicitly declare one.

## Safety

Any time you allow dynamic references to other resources, it’s important to acknowledge some risks.

### Recursion

Reference tags are parsed recursively—so supposing you had a field with a reference to itself (or any other multi-element cyclical reference), Craft would go back and forth, parsing them until it ran out of memory!

### Untrusted Input

**Do not** pass untrusted user input through `parseRefs`! Reference tags allow access to arbitrary properties and can lead to [exfiltration](https://csrc.nist.gov/glossary/term/exfiltration) of private data—as an example, an anonymous user could submit `{user:1:email}` to try and get admin user’s email address.

This also applies to the [GraphQL directive](../development/graphql.md#the-parserefs-directive) of the same name.
