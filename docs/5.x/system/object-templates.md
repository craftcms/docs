# Object Templates

Craft uses single-line [Twig](../development/twig.md) “templates” in a number of places throughout the control panel to generate values from data that is only known at runtime. These templates are most often stored in [Project Config](project-config.md), but the resulting values are typically part of a record stored in the database, or only used temporarily.

Some examples of object templates in use are:

- [Element](elements.md) title and slug formats;
- [Asset field](../reference/field-types/assets.md) default upload paths;
- [Section](../reference/element-types/entries.md#sections) and [category group](../reference/element-types/categories.md#category-groups) URI formats;
- Values sent to controllers via a [`redirectInput()`](../reference/twig/functions.md) function;
- The [`group()` filter](../reference/twig/filters.md) in Twig;
- Console controllers that [re-save elements](../reference/cli.md#resave);
- Translation keys for fields;
- Some condition rules stored in Project Config;

Object templates _are_ Twig templates—but there are a few behavioral differences to be aware of!

::: warning
Like system messages, object templates grant access to the full suite of Craft APIs (via `craft.app`), and are therefore considered a trusted template environment. See the [Security](#security) section below for details.
:::

## Evaluation & Invalidation

Craft typically renders object templates in response to specific actions, like an element being saved. This is important for performance reasons, especially when building URIs: the system can’t generate thousands or millions of URIs on-the-fly for the purposes of matching against the current request! Instead, Craft evaluates a template and stores the resulting string, which can be scanned quickly by the database.

Consequently, it’s possible for those values to become stale. If the dynamic attributes in a URI template belong exclusively to the object it was rendered for, it should always be up-to-date—but if it includes attributes or variables from _other_ sources (like the [environment](../configure.md#env) or another element), Craft isn’t always able to invalidate those cached values. There are two features in place, though, to help avoid common problems with URIs:

- Whenever an entry in a [structure](../reference/element-types/entries.md#structures) are saved, the slugs and URIs of its descendants are recursively re-rendered. This helps hierarchical URIs stay in sync with their parent element(s).
- If a component is updated via project config in a way that _could_ change URIs of the elements it governs, Craft re-saves those elements. An example of this would be the URI format for a category group in a given site; only elements in sites that 

::: tip
Craft’s [`resave/*` commands](../reference/cli.md#resave) can be run on an entire section, category group, or other slice of your elements to re-render their URIs, if you believe a change has caused them to become stale. You must run this command in each environment the change is made!
:::

Most templates (like redirects after a form submission or default asset field upload paths) aren’t affected by this, because it’s always possible to efficiently resolve their values at runtime.

## Objects & Variables

Every object template is rendered in the context of a primary model. In the same way that an entry’s template (as determined by a [section](../reference/element-types/entries.md#sections)’s settings) automatically receives an `entry` variable, object templates expose an `object` variable.

This agnostic variable name is important, because the context a template is rendered in may differ between uses! For example, [asset fields](../reference/field-types/assets.md) allow you to customize where files are uploaded… but the path is evaluated using the element that field is attached to. A single field configured with the path `header-images/{slug}` might be attached to an entry, category, _and_ tag, and would otherwise have an unpredictable variable naming convention.

In most cases, you don’t even need to include the primary object’s variable name in the template at all, thanks to the concise attribute access [syntax](#syntax)!

### Other Features

Because this is a fully-fledged Twig environment, you also get access to all the [global variables](../reference/twig/global-variables.md) and Twig language features you’d expect:

```twig
Current Coupons (Last updated {{ now|date('Y-m-d') }})
Current Coupons (Last updated by {{ currentUser.username }})
```

::: tip
Global variables must be referenced using the normal Twig output tags, not the [concise syntax](#syntax).
:::

### Stability

When writing an object template, consider the stability of the resulting value! If you use values that change (like `dateUpdated` or the global `now` variable), the resulting string may change every time you edit an element. Craft only routes to the latest revision of an element, so unstable URI templates will invalidate old URLs.

This is also important to keep in mind for 

## Syntax

Regular [Twig templates](../development/twig.md) evaluate content in pairs of output tags (`{{ ... }}`) and control blocks (`{% ... %}`). Object templates extend this syntax to make referencing attributes of the passed object more concise. For example, outputting an entry’s `slug` attribute would look like this in a normal Twig template:

```twig
{{ entry.slug }}
```

In an object template, you have the option of this compact syntax:

```
{slug}
```

Craft expands this to `{{ object.slug }}`. In the same way, an object template containing `{postDate.format('Y')}` is expanded to `{{ object.postDate.format('Y') }}`. If you prefer to use the full Twig syntax, each of the object’s attributes are unfolded into the template’s context, making any of these functionally equivalent:

- Compact notation: `{slug}`
- Normalized Twig syntax: `{{ object.slug }}`
- Attributes-as-variables: `{{ slug }}`

The attributes that are exposed in this way are dependent on the kind of object you’re working with. _Methods_ of those objects are _not_ expanded into the global space, so they must be referred to via `object`, using the compact syntax or dot notation.

::: tip
Object templates are always limited to a single line. Their output is also generally expected to be a single line, and including line breaks may cause validation errors on any attributes that assume the output from a template is “clean.”
:::

### Conditional Logic

Conditions are slightly more complicated, and are often clearest when using complete Twig syntax:

```twig
{{ object.level == 1 ? 'topics' : object.parent.uri }}/{slug}
```

This template combines a normal Twig output statement with the compact syntax. Craft normalizes this before evaluation, so both statements will work!

### Default Values

This pattern above can be simplified using the special `getParentUri()` method (or `parentUri` getter):

```twig
{parentUri ?? 'topics'}/{slug}
```

The `??` or [null-coalescing](https://twig.symfony.com/doc/3.x/templates.html#other-operators) operator is equivalent to the `|default` filter, in that it will swallow `null` values and errors, falling back to whatever the right-hand value is.

### Whitespace

Be mindful of spaces between your Twig statements! These will be considered part of the resulting string. Spaces _inside_ a Twig expression do _not_ contribute to the resulting string.

## Security

Object templates are most useful when they incorporate user-provided content—take URIs for example:

```
blog/{postDate.format('Y')}/{slug}
```

We know that `postDate.format('Y')` will always produce a four-digit number like `2024`… but `slug` is an attribute of the entry element that can be controlled by user input! Fortunately, this is a pretty safe thing to do, because the slug is heavily validated by the time it’s used in the template. Let’s look at some examples of object templates that _aren’t_ safe.

### Attribute Access

If you are accepting user-submitted content, **do not** construct an object template that would allow access to arbitrary attributes:

::: code
```twig Dangerous
profiles/{{ object[slugSource] }}/{id}
```
```twig Safe
profiles/{{ slugPrefixSource == 'accountType' ? memberType : 'member' }}/{id}
```
:::

While the first template _feels_ more dynamic and provides greater control, it would allow anyone updating the user to access other attributes (and potentially _methods_) by updating the record with a malicious value.

### Nested Templates

Take care when including other templates. Template paths should _always_ come from a trusted source!

In the same spirit, you should never render _nested_ object templates with the [`renderObjectTemplate()` Twig function](../reference/twig/functions.md#renderobjecttemplate), especially when the input comes from an untrusted user.

### Hashing

When using the [`redirectInput()` function](../reference/twig/functions.md#redirectinput), the provided object template will appear verbatim in the rendered HTML, but prepended with a secure hash.
