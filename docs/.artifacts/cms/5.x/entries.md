<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

<!-- BEGIN PARAMS -->



<!-- textlint-disable -->

| Param                                           | Description
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [after](#after)                                 | Narrows the query results to only entries that were posted on or after a certain date.
| [afterPopulate](#afterpopulate)                 | Performs any post-population processing on elements.
| [ancestorDist](#ancestordist)                   | Narrows the query results to only entries that are up to a certain distance away from the entry specified by [ancestorOf](#ancestorof).
| [ancestorOf](#ancestorof)                       | Narrows the query results to only entries that are ancestors of another entry in its structure.
| [andNotRelatedTo](#andnotrelatedto)             | Narrows the query results to only entries that are not related to certain other elements.
| [andRelatedTo](#andrelatedto)                   | Narrows the query results to only entries that are related to certain other elements.
| [asArray](#asarray)                             | Causes the query to return matching entries as arrays of data, rather than [Entry](craft5:craft\elements\Entry) objects.
| [authorGroup](#authorgroup)                     | Narrows the query results based on the user group the entries’ authors belong to.
| [authorGroupId](#authorgroupid)                 | Narrows the query results based on the user group the entries’ authors belong to, per the groups’ IDs.
| [authorId](#authorid)                           | Narrows the query results based on the entries’ author ID(s).
| [before](#before)                               | Narrows the query results to only entries that were posted before a certain date.
| [cache](#cache)                                 | Enables query cache for this Query.
| [canonicalsOnly](#canonicalsonly)               | Narrows the query results to only canonical elements, including elements that reference another canonical element via `canonicalId` so long as they aren’t a draft.
| [clearCachedResult](#clearcachedresult)         | Clears the [cached result](https://craftcms.com/docs/5.x/development/element-queries.html#cache).
| [dateCreated](#datecreated)                     | Narrows the query results based on the entries’ creation dates.
| [dateUpdated](#dateupdated)                     | Narrows the query results based on the entries’ last-updated dates.
| [descendantDist](#descendantdist)               | Narrows the query results to only entries that are up to a certain distance away from the entry specified by [descendantOf](#descendantof).
| [descendantOf](#descendantof)                   | Narrows the query results to only entries that are descendants of another entry in its structure.
| [draftCreator](#draftcreator)                   | Narrows the query results to only drafts created by a given user.
| [draftId](#draftid)                             | Narrows the query results based on the entries’ draft’s ID (from the `drafts` table).
| [draftOf](#draftof)                             | Narrows the query results to only drafts of a given entry.
| [drafts](#drafts)                               | Narrows the query results to only drafts entries.
| [eagerly](#eagerly)                             | Causes the query to be used to eager-load results for the query’s source element and any other elements in its collection.
| [expiryDate](#expirydate)                       | Narrows the query results based on the entries’ expiry dates.
| [fixedOrder](#fixedorder)                       | Causes the query results to be returned in the order specified by [id](#id).
| [getFieldLayouts](#getfieldlayouts)             | Returns the field layouts that could be associated with the resulting elements.
| [hasDescendants](#hasdescendants)               | Narrows the query results based on whether the entries have any descendants in their structure.
| [id](#id)                                       | Narrows the query results based on the entries’ IDs.
| [ignorePlaceholders](#ignoreplaceholders)       | Causes the query to return matching entries as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).
| [inBulkOp](#inbulkop)                           | Narrows the query results to only entries that were involved in a bulk element operation.
| [inReverse](#inreverse)                         | Causes the query results to be returned in reverse order.
| [language](#language)                           | Determines which site(s) the entries should be queried in, based on their language.
| [leaves](#leaves)                               | Narrows the query results based on whether the entries are “leaves” (entries with no descendants).
| [level](#level)                                 | Narrows the query results based on the entries’ level within the structure.
| [limit](#limit)                                 | Determines the number of entries that should be returned.
| [nextSiblingOf](#nextsiblingof)                 | Narrows the query results to only the entry that comes immediately after another entry in its structure.
| [notRelatedTo](#notrelatedto)                   | Narrows the query results to only entries that are not related to certain other elements.
| [offset](#offset)                               | Determines how many entries should be skipped in the results.
| [orderBy](#orderby)                             | Determines the order that the entries should be returned in. (If empty, defaults to `postDate DESC, elements.id`, or the order defined by the section if the [section](#section) or [sectionId](#sectionid) params are set to a single Structure section.)
| [positionedAfter](#positionedafter)             | Narrows the query results to only entries that are positioned after another entry in its structure.
| [positionedBefore](#positionedbefore)           | Narrows the query results to only entries that are positioned before another entry in its structure.
| [postDate](#postdate)                           | Narrows the query results based on the entries’ post dates.
| [preferSites](#prefersites)                     | If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepForEagerLoading](#prepforeagerloading)     | Prepares the query for lazy eager loading.
| [prepareSubquery](#preparesubquery)             | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [prevSiblingOf](#prevsiblingof)                 | Narrows the query results to only the entry that comes immediately before another entry in its structure.
| [provisionalDrafts](#provisionaldrafts)         | Narrows the query results to only provisional drafts.
| [relatedTo](#relatedto)                         | Narrows the query results to only entries that are related to certain other elements.
| [render](#render)                               | Executes the query and renders the resulting elements using their partial templates.
| [revisionCreator](#revisioncreator)             | Narrows the query results to only revisions created by a given user.
| [revisionId](#revisionid)                       | Narrows the query results based on the entries’ revision’s ID (from the `revisions` table).
| [revisionOf](#revisionof)                       | Narrows the query results to only revisions of a given entry.
| [revisions](#revisions)                         | Narrows the query results to only revision entries.
| [savable](#savable)                             | Sets the [savable](https://docs.craftcms.com/api/v5/craft-elements-db-entryquery.html#property-savable) property.
| [savedDraftsOnly](#saveddraftsonly)             | Narrows the query results to only unpublished drafts which have been saved after initial creation.
| [search](#search)                               | Narrows the query results to only entries that match a search query.
| [section](#section)                             | Narrows the query results based on the sections the entries belong to.
| [sectionId](#sectionid)                         | Narrows the query results based on the sections the entries belong to, per the sections’ IDs.
| [siblingOf](#siblingof)                         | Narrows the query results to only entries that are siblings of another entry in its structure.
| [site](#site)                                   | Determines which site(s) the entries should be queried in.
| [siteId](#siteid)                               | Determines which site(s) the entries should be queried in, per the site’s ID.
| [siteSettingsId](#sitesettingsid)               | Narrows the query results based on the entries’ IDs in the `elements_sites` table.
| [slug](#slug)                                   | Narrows the query results based on the entries’ slugs.
| [status](#status)                               | Narrows the query results based on the entries’ statuses.
| [title](#title)                                 | Narrows the query results based on the entries’ titles.
| [trashed](#trashed)                             | Narrows the query results to only entries that have been soft-deleted.
| [type](#type)                                   | Narrows the query results based on the entries’ entry types.
| [typeId](#typeid)                               | Narrows the query results based on the entries’ entry types, per the types’ IDs.
| [uid](#uid)                                     | Narrows the query results based on the entries’ UIDs.
| [unique](#unique)                               | Determines whether only elements with unique IDs should be returned by the query.
| [uri](#uri)                                     | Narrows the query results based on the entries’ URIs.
| [wasCountEagerLoaded](#wascounteagerloaded)     | Returns whether the query result count was already eager loaded by the query's source element.
| [wasEagerLoaded](#waseagerloaded)               | Returns whether the query results were already eager loaded by the query's source element.
| [with](#with)                                   | Causes the query to return matching entries eager-loaded with related elements.
| [withCustomFields](#withcustomfields)           | Sets whether custom fields should be factored into the query.
| [withProvisionalDrafts](#withprovisionaldrafts) | Causes the query to return provisional drafts for the matching elements, when they exist for the current user.


<!-- textlint-enable -->


#### `after`

Narrows the query results to only entries that were posted on or after a certain date.

Possible values include:

| Value | Fetches entries…
| - | -
| `'2018-04-01'` | that were posted on or after 2018-04-01.
| a [DateTime](https://php.net/class.datetime) object | that were posted on or after the date represented by the object.
| `now`/`today`/`tomorrow`/`yesterday` | that were posted on or after midnight of the specified relative date.



::: code
```twig
{# Fetch entries posted this month #}
{% set firstDayOfMonth = date('first day of this month') %}

{% set entries = craft.entries()
  .after(firstDayOfMonth)
  .all() %}
```

```php
// Fetch entries posted this month
$firstDayOfMonth = new \DateTime('first day of this month');

$entries = \craft\elements\Entry::find()
    ->after($firstDayOfMonth)
    ->all();
```
:::


#### `afterPopulate`

Performs any post-population processing on elements.










#### `ancestorDist`

Narrows the query results to only entries that are up to a certain distance away from the entry specified by [ancestorOf](#ancestorof).





::: code
```twig
{# Fetch entries above this one #}
{% set entries = craft.entries()
  .ancestorOf(myEntry)
  .ancestorDist(3)
  .all() %}
```

```php
// Fetch entries above this one
$entries = \craft\elements\Entry::find()
    ->ancestorOf($myEntry)
    ->ancestorDist(3)
    ->all();
```
:::


#### `ancestorOf`

Narrows the query results to only entries that are ancestors of another entry in its structure.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | above the entry with an ID of 1.
| a [Entry](craft5:craft\elements\Entry) object | above the entry represented by the object.



::: code
```twig
{# Fetch entries above this one #}
{% set entries = craft.entries()
  .ancestorOf(myEntry)
  .all() %}
```

```php
// Fetch entries above this one
$entries = \craft\elements\Entry::find()
    ->ancestorOf($myEntry)
    ->all();
```
:::



::: tip
This can be combined with [ancestorDist](#ancestordist) if you want to limit how far away the ancestor entries can be.
:::


#### `andNotRelatedTo`

Narrows the query results to only entries that are not related to certain other elements.



See [Relations](https://craftcms.com/docs/5.x/system/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all entries that are related to myCategoryA and not myCategoryB #}
{% set entries = craft.entries()
  .relatedTo(myCategoryA)
  .andNotRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all entries that are related to $myCategoryA and not $myCategoryB
$entries = \craft\elements\Entry::find()
    ->relatedTo($myCategoryA)
    ->andNotRelatedTo($myCategoryB)
    ->all();
```
:::


#### `andRelatedTo`

Narrows the query results to only entries that are related to certain other elements.



See [Relations](https://craftcms.com/docs/5.x/system/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all entries that are related to myCategoryA and myCategoryB #}
{% set entries = craft.entries()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all entries that are related to $myCategoryA and $myCategoryB
$entries = \craft\elements\Entry::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `asArray`

Causes the query to return matching entries as arrays of data, rather than [Entry](craft5:craft\elements\Entry) objects.





::: code
```twig
{# Fetch entries as arrays #}
{% set entries = craft.entries()
  .asArray()
  .all() %}
```

```php
// Fetch entries as arrays
$entries = \craft\elements\Entry::find()
    ->asArray()
    ->all();
```
:::


#### `authorGroup`

Narrows the query results based on the user group the entries’ authors belong to.

Possible values include:

| Value | Fetches entries…
| - | -
| `'foo'` | with an author in a group with a handle of `foo`.
| `'not foo'` | not with an author in a group with a handle of `foo`.
| `['foo', 'bar']` | with an author in a group with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not with an author in a group with a handle of `foo` or `bar`.
| a [UserGroup](craft5:craft\models\UserGroup) object | with an author in a group represented by the object.
| an array of [UserGroup](craft5:craft\models\UserGroup) objects | with an author in a group represented by the objects.



::: code
```twig
{# Fetch entries with an author in the Foo user group #}
{% set entries = craft.entries()
  .authorGroup('foo')
  .all() %}
```

```php
// Fetch entries with an author in the Foo user group
$entries = \craft\elements\Entry::find()
    ->authorGroup('foo')
    ->all();
```
:::


#### `authorGroupId`

Narrows the query results based on the user group the entries’ authors belong to, per the groups’ IDs.

Possible values include:

| Value | Fetches entries…
| - | -
| `1` | with an author in a group with an ID of 1.
| `'not 1'` | not with an author in a group with an ID of 1.
| `[1, 2]` | with an author in a group with an ID of 1 or 2.
| `['not', 1, 2]` | not with an author in a group with an ID of 1 or 2.



::: code
```twig
{# Fetch entries with an author in a group with an ID of 1 #}
{% set entries = craft.entries()
  .authorGroupId(1)
  .all() %}
```

```php
// Fetch entries with an author in a group with an ID of 1
$entries = \craft\elements\Entry::find()
    ->authorGroupId(1)
    ->all();
```
:::


#### `authorId`

Narrows the query results based on the entries’ author ID(s).

Possible values include:

| Value | Fetches entries…
| - | -
| `1` | with an author with an ID of 1.
| `'not 1'` | not with an author with an ID of 1.
| `[1, 2]` | with an author with an ID of 1 or 2.
| `['and', 1, 2]` |  with authors with IDs of 1 and 2.
| `['not', 1, 2]` | not with an author with an ID of 1 or 2.



::: code
```twig
{# Fetch entries with an author with an ID of 1 #}
{% set entries = craft.entries()
  .authorId(1)
  .all() %}
```

```php
// Fetch entries with an author with an ID of 1
$entries = \craft\elements\Entry::find()
    ->authorId(1)
    ->all();
```
:::


#### `before`

Narrows the query results to only entries that were posted before a certain date.

Possible values include:

| Value | Fetches entries…
| - | -
| `'2018-04-01'` | that were posted before 2018-04-01.
| a [DateTime](https://php.net/class.datetime) object | that were posted before the date represented by the object.
| `now`/`today`/`tomorrow`/`yesterday` | that were posted before midnight of specified relative date.



::: code
```twig
{# Fetch entries posted before this month #}
{% set firstDayOfMonth = date('first day of this month') %}

{% set entries = craft.entries()
  .before(firstDayOfMonth)
  .all() %}
```

```php
// Fetch entries posted before this month
$firstDayOfMonth = new \DateTime('first day of this month');

$entries = \craft\elements\Entry::find()
    ->before($firstDayOfMonth)
    ->all();
```
:::


#### `cache`

Enables query cache for this Query.










#### `canonicalsOnly`

Narrows the query results to only canonical elements, including elements
that reference another canonical element via `canonicalId` so long as they
aren’t a draft.



Unpublished drafts can be included as well if `drafts(null)` and
`draftOf(false)` are also passed.






#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/5.x/development/element-queries.html#cache).






#### `dateCreated`

Narrows the query results based on the entries’ creation dates.



Possible values include:

| Value | Fetches entries…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were created at midnight of the specified relative date.



::: code
```twig
{# Fetch entries created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set entries = craft.entries()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch entries created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the entries’ last-updated dates.



Possible values include:

| Value | Fetches entries…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were updated at midnight of the specified relative date.



::: code
```twig
{# Fetch entries updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set entries = craft.entries()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch entries updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `descendantDist`

Narrows the query results to only entries that are up to a certain distance away from the entry specified by [descendantOf](#descendantof).





::: code
```twig
{# Fetch entries below this one #}
{% set entries = craft.entries()
  .descendantOf(myEntry)
  .descendantDist(3)
  .all() %}
```

```php
// Fetch entries below this one
$entries = \craft\elements\Entry::find()
    ->descendantOf($myEntry)
    ->descendantDist(3)
    ->all();
```
:::


#### `descendantOf`

Narrows the query results to only entries that are descendants of another entry in its structure.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | below the entry with an ID of 1.
| a [Entry](craft5:craft\elements\Entry) object | below the entry represented by the object.



::: code
```twig
{# Fetch entries below this one #}
{% set entries = craft.entries()
  .descendantOf(myEntry)
  .all() %}
```

```php
// Fetch entries below this one
$entries = \craft\elements\Entry::find()
    ->descendantOf($myEntry)
    ->all();
```
:::



::: tip
This can be combined with [descendantDist](#descendantdist) if you want to limit how far away the descendant entries can be.
:::


#### `draftCreator`

Narrows the query results to only drafts created by a given user.



Possible values include:

| Value | Fetches drafts…
| - | -
| `1` | created by the user with an ID of 1.
| a [craft\elements\User](craft5:craft\elements\User) object | created by the user represented by the object.



::: code
```twig
{# Fetch drafts by the current user #}
{% set entries = craft.entries()
  .draftCreator(currentUser)
  .all() %}
```

```php
// Fetch drafts by the current user
$entries = \craft\elements\Entry::find()
    ->draftCreator(Craft::$app->user->identity)
    ->all();
```
:::


#### `draftId`

Narrows the query results based on the entries’ draft’s ID (from the `drafts` table).



Possible values include:

| Value | Fetches drafts…
| - | -
| `1` | for the draft with an ID of 1.



::: code
```twig
{# Fetch a draft #}
{% set entries = craft.entries()
  .draftId(10)
  .all() %}
```

```php
// Fetch a draft
$entries = \craft\elements\Entry::find()
    ->draftId(10)
    ->all();
```
:::


#### `draftOf`

Narrows the query results to only drafts of a given entry.



Possible values include:

| Value | Fetches drafts…
| - | -
| `1` | for the entry with an ID of 1.
| `[1, 2]` | for the entries with an ID of 1 or 2.
| a [Entry](craft5:craft\elements\Entry) object | for the entry represented by the object.
| an array of [Entry](craft5:craft\elements\Entry) objects | for the entries represented by the objects.
| `'*'` | for any entry
| `false` | that aren’t associated with a published entry



::: code
```twig
{# Fetch drafts of the entry #}
{% set entries = craft.entries()
  .draftOf(myEntry)
  .all() %}
```

```php
// Fetch drafts of the entry
$entries = \craft\elements\Entry::find()
    ->draftOf($myEntry)
    ->all();
```
:::


#### `drafts`

Narrows the query results to only drafts entries.





::: code
```twig
{# Fetch a draft entry #}
{% set entries = craft.entries()
  .drafts()
  .id(123)
  .one() %}
```

```php
// Fetch a draft entry
$entries = \craft\elements\Entry::find()
    ->drafts()
    ->id(123)
    ->one();
```
:::


#### `eagerly`

Causes the query to be used to eager-load results for the query’s source element
and any other elements in its collection.










#### `expiryDate`

Narrows the query results based on the entries’ expiry dates.

Possible values include:

| Value | Fetches entries…
| - | -
| `':empty:'` | that don’t have an expiry date.
| `':notempty:'` | that have an expiry date.
| `'>= 2020-04-01'` | that will expire on or after 2020-04-01.
| `'< 2020-05-01'` | that will expire before 2020-05-01
| `['and', '>= 2020-04-04', '< 2020-05-01']` | that will expire between 2020-04-01 and 2020-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that expire at midnight of the specified relative date.



::: code
```twig
{# Fetch entries expiring this month #}
{% set nextMonth = date('first day of next month')|atom %}

{% set entries = craft.entries()
  .expiryDate("< #{nextMonth}")
  .all() %}
```

```php
// Fetch entries expiring this month
$nextMonth = (new \DateTime('first day of next month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->expiryDate("< {$nextMonth}")
    ->all();
```
:::


#### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).



::: tip
If no IDs were passed to [id](#id), setting this to `true` will result in an empty result set.
:::



::: code
```twig
{# Fetch entries in a specific order #}
{% set entries = craft.entries()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch entries in a specific order
$entries = \craft\elements\Entry::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `getFieldLayouts`

Returns the field layouts that could be associated with the resulting elements.










#### `hasDescendants`

Narrows the query results based on whether the entries have any descendants in their structure.



(This has the opposite effect of calling [leaves](#leaves).)



::: code
```twig
{# Fetch entries that have descendants #}
{% set entries = craft.entries()
  .hasDescendants()
  .all() %}
```

```php
// Fetch entries that have descendants
$entries = \craft\elements\Entry::find()
    ->hasDescendants()
    ->all();
```
:::


#### `id`

Narrows the query results based on the entries’ IDs.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | with an ID of 1.
| `'not 1'` | not with an ID of 1.
| `[1, 2]` | with an ID of 1 or 2.
| `['not', 1, 2]` | not with an ID of 1 or 2.



::: code
```twig
{# Fetch the entry by its ID #}
{% set entry = craft.entries()
  .id(1)
  .one() %}
```

```php
// Fetch the entry by its ID
$entry = \craft\elements\Entry::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching entries as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).










#### `inBulkOp`

Narrows the query results to only entries that were involved in a bulk element operation.










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch entries in reverse #}
{% set entries = craft.entries()
  .inReverse()
  .all() %}
```

```php
// Fetch entries in reverse
$entries = \craft\elements\Entry::find()
    ->inReverse()
    ->all();
```
:::


#### `language`

Determines which site(s) the entries should be queried in, based on their language.



Possible values include:

| Value | Fetches entries…
| - | -
| `'en'` | from sites with a language of `en`.
| `['en-GB', 'en-US']` | from sites with a language of `en-GB` or `en-US`.
| `['not', 'en-GB', 'en-US']` | not in sites with a language of `en-GB` or `en-US`.

::: tip
Elements that belong to multiple sites will be returned multiple times by default. If you
only want unique elements to be returned, use [unique](#unique) in conjunction with this.
:::



::: code
```twig
{# Fetch entries from English sites #}
{% set entries = craft.entries()
  .language('en')
  .all() %}
```

```php
// Fetch entries from English sites
$entries = \craft\elements\Entry::find()
    ->language('en')
    ->all();
```
:::


#### `leaves`

Narrows the query results based on whether the entries are “leaves” (entries with no descendants).



(This has the opposite effect of calling [hasDescendants](#hasdescendants).)



::: code
```twig
{# Fetch entries that have no descendants #}
{% set entries = craft.entries()
  .leaves()
  .all() %}
```

```php
// Fetch entries that have no descendants
$entries = \craft\elements\Entry::find()
    ->leaves()
    ->all();
```
:::


#### `level`

Narrows the query results based on the entries’ level within the structure.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | with a level of 1.
| `'not 1'` | not with a level of 1.
| `'>= 3'` | with a level greater than or equal to 3.
| `[1, 2]` | with a level of 1 or 2.
| `[null, 1]` | without a level, or a level of 1.
| `['not', 1, 2]` | not with level of 1 or 2.



::: code
```twig
{# Fetch entries positioned at level 3 or above #}
{% set entries = craft.entries()
  .level('>= 3')
  .all() %}
```

```php
// Fetch entries positioned at level 3 or above
$entries = \craft\elements\Entry::find()
    ->level('>= 3')
    ->all();
```
:::


#### `limit`

Determines the number of entries that should be returned.



::: code
```twig
{# Fetch up to 10 entries  #}
{% set entries = craft.entries()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 entries
$entries = \craft\elements\Entry::find()
    ->limit(10)
    ->all();
```
:::


#### `nextSiblingOf`

Narrows the query results to only the entry that comes immediately after another entry in its structure.



Possible values include:

| Value | Fetches the entry…
| - | -
| `1` | after the entry with an ID of 1.
| a [Entry](craft5:craft\elements\Entry) object | after the entry represented by the object.



::: code
```twig
{# Fetch the next entry #}
{% set entry = craft.entries()
  .nextSiblingOf(myEntry)
  .one() %}
```

```php
// Fetch the next entry
$entry = \craft\elements\Entry::find()
    ->nextSiblingOf($myEntry)
    ->one();
```
:::


#### `notRelatedTo`

Narrows the query results to only entries that are not related to certain other elements.



See [Relations](https://craftcms.com/docs/5.x/system/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all entries that are related to myEntry #}
{% set entries = craft.entries()
  .notRelatedTo(myEntry)
  .all() %}
```

```php
// Fetch all entries that are related to $myEntry
$entries = \craft\elements\Entry::find()
    ->notRelatedTo($myEntry)
    ->all();
```
:::


#### `offset`

Determines how many entries should be skipped in the results.



::: code
```twig
{# Fetch all entries except for the first 3 #}
{% set entries = craft.entries()
  .offset(3)
  .all() %}
```

```php
// Fetch all entries except for the first 3
$entries = \craft\elements\Entry::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

Determines the order that the entries should be returned in. (If empty, defaults to `postDate DESC,
    elements.id`, or the order defined by the section if the [section](#section) or [sectionId](#sectionid) params are set to a single Structure section.)



::: code
```twig
{# Fetch all entries in order of date created #}
{% set entries = craft.entries()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all entries in order of date created
$entries = \craft\elements\Entry::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


#### `positionedAfter`

Narrows the query results to only entries that are positioned after another entry in its structure.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | after the entry with an ID of 1.
| a [Entry](craft5:craft\elements\Entry) object | after the entry represented by the object.



::: code
```twig
{# Fetch entries after this one #}
{% set entries = craft.entries()
  .positionedAfter(myEntry)
  .all() %}
```

```php
// Fetch entries after this one
$entries = \craft\elements\Entry::find()
    ->positionedAfter($myEntry)
    ->all();
```
:::


#### `positionedBefore`

Narrows the query results to only entries that are positioned before another entry in its structure.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | before the entry with an ID of 1.
| a [Entry](craft5:craft\elements\Entry) object | before the entry represented by the object.



::: code
```twig
{# Fetch entries before this one #}
{% set entries = craft.entries()
  .positionedBefore(myEntry)
  .all() %}
```

```php
// Fetch entries before this one
$entries = \craft\elements\Entry::find()
    ->positionedBefore($myEntry)
    ->all();
```
:::


#### `postDate`

Narrows the query results based on the entries’ post dates.

Possible values include:

| Value | Fetches entries…
| - | -
| `'>= 2018-04-01'` | that were posted on or after 2018-04-01.
| `'< 2018-05-01'` | that were posted before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were posted between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were posted at midnight of the specified relative date.



::: code
```twig
{# Fetch entries posted last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set entries = craft.entries()
  .postDate(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch entries posted last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->postDate(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `preferSites`

If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C,
and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site B, and Bar will be returned
for Site C.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique entries from Site A, or Site B if they don’t exist in Site A #}
{% set entries = craft.entries()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique entries from Site A, or Site B if they don’t exist in Site A
$entries = \craft\elements\Entry::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```
:::


#### `prepForEagerLoading`

Prepares the query for lazy eager loading.










#### `prepareSubquery`

Prepares the element query and returns its subquery (which determines what elements will be returned).






#### `prevSiblingOf`

Narrows the query results to only the entry that comes immediately before another entry in its structure.



Possible values include:

| Value | Fetches the entry…
| - | -
| `1` | before the entry with an ID of 1.
| a [Entry](craft5:craft\elements\Entry) object | before the entry represented by the object.



::: code
```twig
{# Fetch the previous entry #}
{% set entry = craft.entries()
  .prevSiblingOf(myEntry)
  .one() %}
```

```php
// Fetch the previous entry
$entry = \craft\elements\Entry::find()
    ->prevSiblingOf($myEntry)
    ->one();
```
:::


#### `provisionalDrafts`

Narrows the query results to only provisional drafts.





::: code
```twig
{# Fetch provisional drafts created by the current user #}
{% set entries = craft.entries()
  .provisionalDrafts()
  .draftCreator(currentUser)
  .all() %}
```

```php
// Fetch provisional drafts created by the current user
$entries = \craft\elements\Entry::find()
    ->provisionalDrafts()
    ->draftCreator(Craft::$app->user->identity)
    ->all();
```
:::


#### `relatedTo`

Narrows the query results to only entries that are related to certain other elements.



See [Relations](https://craftcms.com/docs/5.x/system/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all entries that are related to myCategory #}
{% set entries = craft.entries()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all entries that are related to $myCategory
$entries = \craft\elements\Entry::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `render`

Executes the query and renders the resulting elements using their partial templates.

If no partial template exists for an element, its string representation will be output instead.




#### `revisionCreator`

Narrows the query results to only revisions created by a given user.



Possible values include:

| Value | Fetches revisions…
| - | -
| `1` | created by the user with an ID of 1.
| a [craft\elements\User](craft5:craft\elements\User) object | created by the user represented by the object.



::: code
```twig
{# Fetch revisions by the current user #}
{% set entries = craft.entries()
  .revisionCreator(currentUser)
  .all() %}
```

```php
// Fetch revisions by the current user
$entries = \craft\elements\Entry::find()
    ->revisionCreator(Craft::$app->user->identity)
    ->all();
```
:::


#### `revisionId`

Narrows the query results based on the entries’ revision’s ID (from the `revisions` table).



Possible values include:

| Value | Fetches revisions…
| - | -
| `1` | for the revision with an ID of 1.



::: code
```twig
{# Fetch a revision #}
{% set entries = craft.entries()
  .revisionId(10)
  .all() %}
```

```php
// Fetch a revision
$entries = \craft\elements\Entry::find()
    ->revisionIf(10)
    ->all();
```
:::


#### `revisionOf`

Narrows the query results to only revisions of a given entry.



Possible values include:

| Value | Fetches revisions…
| - | -
| `1` | for the entry with an ID of 1.
| a [Entry](craft5:craft\elements\Entry) object | for the entry represented by the object.



::: code
```twig
{# Fetch revisions of the entry #}
{% set entries = craft.entries()
  .revisionOf(myEntry)
  .all() %}
```

```php
// Fetch revisions of the entry
$entries = \craft\elements\Entry::find()
    ->revisionOf($myEntry)
    ->all();
```
:::


#### `revisions`

Narrows the query results to only revision entries.





::: code
```twig
{# Fetch a revision entry #}
{% set entries = craft.entries()
  .revisions()
  .id(123)
  .one() %}
```

```php
// Fetch a revision entry
$entries = \craft\elements\Entry::find()
    ->revisions()
    ->id(123)
    ->one();
```
:::


#### `savable`

Sets the [savable](https://docs.craftcms.com/api/v5/craft-elements-db-entryquery.html#property-savable) property.






#### `savedDraftsOnly`

Narrows the query results to only unpublished drafts which have been saved after initial creation.





::: code
```twig
{# Fetch saved, unpublished draft entries #}
{% set entries = craft.entries()
  .draftOf(false)
  .savedDraftsOnly()
  .all() %}
```

```php
// Fetch saved, unpublished draft entries
$entries = \craft\elements\Entry::find()
    ->draftOf(false)
    ->savedDraftsOnly()
    ->all();
```
:::


#### `search`

Narrows the query results to only entries that match a search query.



See [Searching](https://craftcms.com/docs/5.x/system/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all entries that match the search query #}
{% set entries = craft.entries()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all entries that match the search query
$entries = \craft\elements\Entry::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `section`

Narrows the query results based on the sections the entries belong to.

Possible values include:

| Value | Fetches entries…
| - | -
| `'foo'` | in a section with a handle of `foo`.
| `'not foo'` | not in a section with a handle of `foo`.
| `['foo', 'bar']` | in a section with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not in a section with a handle of `foo` or `bar`.
| a [Section](craft5:craft\models\Section) object | in a section represented by the object.
| `'*'` | in any section.



::: code
```twig
{# Fetch entries in the Foo section #}
{% set entries = craft.entries()
  .section('foo')
  .all() %}
```

```php
// Fetch entries in the Foo section
$entries = \craft\elements\Entry::find()
    ->section('foo')
    ->all();
```
:::


#### `sectionId`

Narrows the query results based on the sections the entries belong to, per the sections’ IDs.

Possible values include:

| Value | Fetches entries…
| - | -
| `1` | in a section with an ID of 1.
| `'not 1'` | not in a section with an ID of 1.
| `[1, 2]` | in a section with an ID of 1 or 2.
| `['not', 1, 2]` | not in a section with an ID of 1 or 2.



::: code
```twig
{# Fetch entries in the section with an ID of 1 #}
{% set entries = craft.entries()
  .sectionId(1)
  .all() %}
```

```php
// Fetch entries in the section with an ID of 1
$entries = \craft\elements\Entry::find()
    ->sectionId(1)
    ->all();
```
:::


#### `siblingOf`

Narrows the query results to only entries that are siblings of another entry in its structure.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | beside the entry with an ID of 1.
| a [Entry](craft5:craft\elements\Entry) object | beside the entry represented by the object.



::: code
```twig
{# Fetch entries beside this one #}
{% set entries = craft.entries()
  .siblingOf(myEntry)
  .all() %}
```

```php
// Fetch entries beside this one
$entries = \craft\elements\Entry::find()
    ->siblingOf($myEntry)
    ->all();
```
:::


#### `site`

Determines which site(s) the entries should be queried in.



The current site will be used by default.

Possible values include:

| Value | Fetches entries…
| - | -
| `'foo'` | from the site with a handle of `foo`.
| `['foo', 'bar']` | from a site with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not in a site with a handle of `foo` or `bar`.
| a [craft\models\Site](craft5:craft\models\Site) object | from the site represented by the object.
| `'*'` | from any site.

::: tip
If multiple sites are specified, elements that belong to multiple sites will be returned multiple times. If you
only want unique elements to be returned, use [unique](#unique) in conjunction with this.
:::



::: code
```twig
{# Fetch entries from the Foo site #}
{% set entries = craft.entries()
  .site('foo')
  .all() %}
```

```php
// Fetch entries from the Foo site
$entries = \craft\elements\Entry::find()
    ->site('foo')
    ->all();
```
:::


#### `siteId`

Determines which site(s) the entries should be queried in, per the site’s ID.



The current site will be used by default.

Possible values include:

| Value | Fetches entries…
| - | -
| `1` | from the site with an ID of `1`.
| `[1, 2]` | from a site with an ID of `1` or `2`.
| `['not', 1, 2]` | not in a site with an ID of `1` or `2`.
| `'*'` | from any site.



::: code
```twig
{# Fetch entries from the site with an ID of 1 #}
{% set entries = craft.entries()
  .siteId(1)
  .all() %}
```

```php
// Fetch entries from the site with an ID of 1
$entries = \craft\elements\Entry::find()
    ->siteId(1)
    ->all();
```
:::


#### `siteSettingsId`

Narrows the query results based on the entries’ IDs in the `elements_sites` table.



Possible values include:

| Value | Fetches entries…
| - | -
| `1` | with an `elements_sites` ID of 1.
| `'not 1'` | not with an `elements_sites` ID of 1.
| `[1, 2]` | with an `elements_sites` ID of 1 or 2.
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2.



::: code
```twig
{# Fetch the entry by its ID in the elements_sites table #}
{% set entry = craft.entries()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the entry by its ID in the elements_sites table
$entry = \craft\elements\Entry::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `slug`

Narrows the query results based on the entries’ slugs.



Possible values include:

| Value | Fetches entries…
| - | -
| `'foo'` | with a slug of `foo`.
| `'foo*'` | with a slug that begins with `foo`.
| `'*foo'` | with a slug that ends with `foo`.
| `'*foo*'` | with a slug that contains `foo`.
| `'not *foo*'` | with a slug that doesn’t contain `foo`.
| `['*foo*', '*bar*']` | with a slug that contains `foo` or `bar`.
| `['not', '*foo*', '*bar*']` | with a slug that doesn’t contain `foo` or `bar`.



::: code
```twig
{# Get the requested entry slug from the URL #}
{% set requestedSlug = craft.app.request.getSegment(3) %}

{# Fetch the entry with that slug #}
{% set entry = craft.entries()
  .slug(requestedSlug|literal)
  .one() %}
```

```php
// Get the requested entry slug from the URL
$requestedSlug = \Craft::$app->request->getSegment(3);

// Fetch the entry with that slug
$entry = \craft\elements\Entry::find()
    ->slug(\craft\helpers\Db::escapeParam($requestedSlug))
    ->one();
```
:::


#### `status`

Narrows the query results based on the entries’ statuses.

Possible values include:

| Value | Fetches entries…
| - | -
| `'live'` _(default)_ | that are live.
| `'pending'` | that are pending (enabled with a Post Date in the future).
| `'expired'` | that are expired (enabled with an Expiry Date in the past).
| `'disabled'` | that are disabled.
| `['live', 'pending']` | that are live or pending.
| `['not', 'live', 'pending']` | that are not live or pending.



::: code
```twig
{# Fetch disabled entries #}
{% set entries = craft.entries()
  .status('disabled')
  .all() %}
```

```php
// Fetch disabled entries
$entries = \craft\elements\Entry::find()
    ->status('disabled')
    ->all();
```
:::


#### `title`

Narrows the query results based on the entries’ titles.



Possible values include:

| Value | Fetches entries…
| - | -
| `'Foo'` | with a title of `Foo`.
| `'Foo*'` | with a title that begins with `Foo`.
| `'*Foo'` | with a title that ends with `Foo`.
| `'*Foo*'` | with a title that contains `Foo`.
| `'not *Foo*'` | with a title that doesn’t contain `Foo`.
| `['*Foo*', '*Bar*']` | with a title that contains `Foo` or `Bar`.
| `['not', '*Foo*', '*Bar*']` | with a title that doesn’t contain `Foo` or `Bar`.



::: code
```twig
{# Fetch entries with a title that contains "Foo" #}
{% set entries = craft.entries()
  .title('*Foo*')
  .all() %}
```

```php
// Fetch entries with a title that contains "Foo"
$entries = \craft\elements\Entry::find()
    ->title('*Foo*')
    ->all();
```
:::


#### `trashed`

Narrows the query results to only entries that have been soft-deleted.





::: code
```twig
{# Fetch trashed entries #}
{% set entries = craft.entries()
  .trashed()
  .all() %}
```

```php
// Fetch trashed entries
$entries = \craft\elements\Entry::find()
    ->trashed()
    ->all();
```
:::


#### `type`

Narrows the query results based on the entries’ entry types.

Possible values include:

| Value | Fetches entries…
| - | -
| `'foo'` | of a type with a handle of `foo`.
| `'not foo'` | not of a type with a handle of `foo`.
| `['foo', 'bar']` | of a type with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not of a type with a handle of `foo` or `bar`.
| an [EntryType](craft5:craft\models\EntryType) object | of a type represented by the object.



::: code
```twig
{# Fetch entries in the Foo section with a Bar entry type #}
{% set entries = craft.entries()
  .section('foo')
  .type('bar')
  .all() %}
```

```php
// Fetch entries in the Foo section with a Bar entry type
$entries = \craft\elements\Entry::find()
    ->section('foo')
    ->type('bar')
    ->all();
```
:::


#### `typeId`

Narrows the query results based on the entries’ entry types, per the types’ IDs.

Possible values include:

| Value | Fetches entries…
| - | -
| `1` | of a type with an ID of 1.
| `'not 1'` | not of a type with an ID of 1.
| `[1, 2]` | of a type with an ID of 1 or 2.
| `['not', 1, 2]` | not of a type with an ID of 1 or 2.



::: code
```twig
{# Fetch entries of the entry type with an ID of 1 #}
{% set entries = craft.entries()
  .typeId(1)
  .all() %}
```

```php
// Fetch entries of the entry type with an ID of 1
$entries = \craft\elements\Entry::find()
    ->typeId(1)
    ->all();
```
:::


#### `uid`

Narrows the query results based on the entries’ UIDs.





::: code
```twig
{# Fetch the entry by its UID #}
{% set entry = craft.entries()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the entry by its UID
$entry = \craft\elements\Entry::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `unique`

Determines whether only elements with unique IDs should be returned by the query.



This should be used when querying elements from multiple sites at the same time, if “duplicate” results is not
desired.



::: code
```twig
{# Fetch unique entries across all sites #}
{% set entries = craft.entries()
  .site('*')
  .unique()
  .all() %}
```

```php
// Fetch unique entries across all sites
$entries = \craft\elements\Entry::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


#### `uri`

Narrows the query results based on the entries’ URIs.



Possible values include:

| Value | Fetches entries…
| - | -
| `'foo'` | with a URI of `foo`.
| `'foo*'` | with a URI that begins with `foo`.
| `'*foo'` | with a URI that ends with `foo`.
| `'*foo*'` | with a URI that contains `foo`.
| `'not *foo*'` | with a URI that doesn’t contain `foo`.
| `['*foo*', '*bar*']` | with a URI that contains `foo` or `bar`.
| `['not', '*foo*', '*bar*']` | with a URI that doesn’t contain `foo` or `bar`.



::: code
```twig
{# Get the requested URI #}
{% set requestedUri = craft.app.request.getPathInfo() %}

{# Fetch the entry with that URI #}
{% set entry = craft.entries()
  .uri(requestedUri|literal)
  .one() %}
```

```php
// Get the requested URI
$requestedUri = \Craft::$app->request->getPathInfo();

// Fetch the entry with that URI
$entry = \craft\elements\Entry::find()
    ->uri(\craft\helpers\Db::escapeParam($requestedUri))
    ->one();
```
:::


#### `wasCountEagerLoaded`

Returns whether the query result count was already eager loaded by the query's source element.










#### `wasEagerLoaded`

Returns whether the query results were already eager loaded by the query's source element.










#### `with`

Causes the query to return matching entries eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/5.x/development/eager-loading.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch entries eager-loaded with the "Related" field’s relations #}
{% set entries = craft.entries()
  .with(['related'])
  .all() %}
```

```php
// Fetch entries eager-loaded with the "Related" field’s relations
$entries = \craft\elements\Entry::find()
    ->with(['related'])
    ->all();
```
:::


#### `withCustomFields`

Sets whether custom fields should be factored into the query.










#### `withProvisionalDrafts`

Causes the query to return provisional drafts for the matching elements,
when they exist for the current user.











<!-- END PARAMS -->
