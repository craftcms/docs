# グローバル

グローバルは、テンプレート全体で包括的に利用可能なコンテンツを保存できます。これは、コントロールパネル経由でエントリではないコンテンツを簡単に編集できるようにする便利な方法です。

Craft はグローバル設定内でグローバルを整理します。それぞれのグローバル設定は、存在するすべてのフィールドや新しいフィールドを利用する独自の[フィールドレイアウト](fields.md#field-layouts)を持ちます。

グローバル設定を作るには、「設定 > グローバル」に移動します。

少なくとも1つのグローバル設定があれば、Craft はコントロールパネルのメインナビゲーションに「グローバル」項目を追加します。これをクリックすると、サイドバーにすべてのグローバル設定のリスト、メインコンテンツエリアに選択されたグローバル設定に関連するすべてのフィールドが表示されたページに移動します。

::: tip
[エントリ](entries.md#entries)とは異なり、特定の URL と関連付けられていないグローバル設定では、ライブプレビュー機能がありません。
:::

## テンプレートでのグローバル設定

任意のテンプレートからハンドル経由でグローバル設定にアクセスできます。

`companyInfo` というハンドルのグローバル設定があり、`yearEstablished` というハンドルのフィールドがある場合、次のコードを利用してそのフィールドへどこからでもアクセスできます。

```twig
{{ companyInfo.yearEstablished }}
```

カスタムフィールド以外で利用できる追加のグローバル設定のプロパティについては、リファレンスの <craft3:craft\elements\GlobalSet> を参照してください。

### グローバル設定の手動読み込み

メールテンプレートのような特殊な状況では、グローバル設定はデフォルトでは利用できません。グローバル設定は手動でも読み込めます。上記の例では、`getSetByHandle()` で読み込むことができます。

::: code
```twig
{% set companyInfo = craft.globals().getSetByHandle('companyInfo') %}
```
```php
$companyInfo = \Craft::$app->getGlobals()->getSetByHandle('companyInfo');
```
:::

詳細については、[Globals サービスクラスのドキュメント](craft3:craft\services\Globals) を参照してください。

## マルチサイトでのグローバル設定

Craft でマルチサイトを運用している場合、グローバル設定はすべてのサイトで利用可能です。しかしながら、必要に応じていくつかのフィールドを空のままにするなど、それぞれの設定値をサイトごとにセットできます。

そのためには、グローバル設定のフィールドを編集し、それぞれの「翻訳方法」設定で「各サイトに対して翻訳」をセットします。

グローバル設定を表示中にサイトを切り替えるには、コントロールパネルのグローバル設定ページの左上にあるドロップダウンメニューを使用します。

![グローバル内のサイトの切り替え](./images/globals-multisite-nav.png)

## グローバルの照会

**グローバル設定クエリ**を利用して、テンプレートや PHP コード内でグローバル設定を取得できます。

::: code
```twig
{# Create a new global set query #}
{% set myGlobalSetQuery = craft.globalSets() %}
```
```php
// Create a new global set query
$myGlobalSetQuery = \craft\elements\GlobalSet::find();
```
:::

グローバル設定クエリを作成すると、結果を絞り込むための[パラメータ](#parameters)をセットできます。 さらに、`.all()` を呼び出して[実行](element-queries.md#executing-element-queries)できます。[GlobalSet](craft3:craft\elements\GlobalSet) オブジェクトの配列が返されます。

::: tip
エレメントクエリがどのように機能するかについては、[エレメントクエリ](element-queries.md)を参照してください。
:::

### 実例

次の操作をすることで、プライマリサイトからグローバル設置をロードし、コンテンツを表示できます。

1. `craft.globalSets()` でグローバル設定クエリを作成します。
2. [handle](#handle) および [siteId](#siteid) パラメータをセットします。
3. `.one()` でグローバル設定を取得します。
4. コンテンツを出力します。

```twig
{# Create a global set query with the 'handle' and 'siteId' parameters #}
{% set myGlobalSetQuery = craft.globalSets()
    .handle('footerCopy')
    .siteId(1) %}

{# Fetch the global set #}
{% set globalSet = myGlobalSetQuery.one() %}

{# Display the content #}
<p>{{ globalSet.copyrightInfo }}</p>
```

::: tip
すべてのグローバル設定は、Twig テンプレートのグローバル変数としてすでに利用可能です。そのため、現在のサイトとは異なるサイトのコンテンツにアクセスする場合、`craft.globalSets()` を通して取得する必要があります。
:::

### パラメータ

グローバル設定クエリは、次のパラメータをサポートしています。

<!-- BEGIN PARAMS -->

| パラメータ | 説明 |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [anyStatus](#anystatus) | ステータスに基づくエレメントのフィルタを削除します。 |
| [asArray](#asarray) | [GlobalSet](craft3:craft\elements\GlobalSet) オブジェクトではなく、データの配列として、マッチしたグローバル設定をクエリが返します。 |
| [clearCachedResult](#clearcachedresult) | キャッシュされた結果をクリアします。 |
| [dateCreated](#datecreated) | グローバル設定の作成日に基づいて、クエリの結果を絞り込みます。 |
| [dateUpdated](#dateupdated) | グローバル設定の最終アップデート日に基づいて、クエリの結果を絞り込みます。 |
| [fixedOrder](#fixedorder) | クエリの結果を [id](#id) で指定された順序で返します。 |
| [handle](#handle) | グローバル設定のハンドルに基づいて、クエリの結果を絞り込みます。 |
| [id](#id) | グローバル設定の ID に基づいて、クエリの結果を絞り込みます。 |
| [ignorePlaceholders](#ignoreplaceholders) | [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement) によってセットされたマッチするプレースホルダーエレメントを無視して、データベースに保存されたマッチするグローバル設定をクエリが返します。 |
| [inReverse](#inreverse) | クエリの結果を逆順で返します。 |
| [limit](#limit) | 返されるグローバル設定の数を決定します。 |
| [offset](#offset) | 結果からスキップされるグローバル設定の数を決定します。 |
| [orderBy](#orderby) | 返されるグローバル設定の順序を決定します。（空の場合、デフォルトは `name ASC`） |
| [preferSites](#prefersites) | [unique](#unique) がセットされている場合、マルチサイトでエレメント照会する際に選択されるべきサイトを決定します |
| [relatedTo](#relatedto) | 特定の他のエレメントと関連付けられたグローバル設定だけに、クエリの結果を絞り込みます。 |
| [search](#search) | 検索クエリにマッチするグローバル設定だけに、クエリの結果を絞り込みます。 |
| [site](#site) | グローバル設定を照会するサイトを決定します。 |
| [siteId](#siteid) | サイトの ID ごとに、グローバル設定を照会するサイトを決定します。 |
| [trashed](#trashed) | ソフトデリートされたグローバル設定だけに、クエリの結果を絞り込みます。 |
| [uid](#uid) | グローバル設定の UID に基づいて、クエリの結果を絞り込みます。 |
| [unique](#unique) | クエリによってユニークな ID のエレメントだけが返されるかを決定します。 |
| [with](#with) | 関連付けられたエレメントを eager-loaded した状態で、マッチしたグローバル設定をクエリが返します。 |

#### `anyStatus`

ステータスに基づくエレメントのフィルタを削除します。





::: code
```twig
{# Fetch all global sets, regardless of status #}
{% set globalSets = craft.globalSets()
    .anyStatus()
    .all() %}
```

```php
// Fetch all global sets, regardless of status
$globalSets = \craft\elements\GlobalSet::find()
    ->anyStatus()
    ->all();
```
:::


#### `asArray`

[GlobalSet](craft3:craft\elements\GlobalSet) オブジェクトではなく、データの配列として、マッチしたグローバル設定をクエリが返します。





::: code
```twig
{# Fetch global sets as arrays #}
{% set globalSets = craft.globalSets()
    .asArray()
    .all() %}
```

```php
// Fetch global sets as arrays
$globalSets = \craft\elements\GlobalSet::find()
    ->asArray()
    ->all();
```
:::


#### `clearCachedResult`

キャッシュされた結果をクリアします。






#### `dateCreated`

グローバル設定の作成日に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するグローバル設定
| - | -
| `'>= 2018-04-01'` | 2018-04-01 以降に作成されたもの。
| `'< 2018-05-01'` | 2018-05-01 より前に作成されたもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に作成されたもの。



::: code
```twig
{# Fetch global sets created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set globalSets = craft.globalSets()
    .dateCreated(['and', ">= #{start}", "< #{end}"])
    .all() %}
```

```php
// Fetch global sets created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$globalSets = \craft\elements\GlobalSet::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

グローバル設定の最終アップデート日に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するグローバル設定
| - | -
| `'>= 2018-04-01'` | 2018-04-01 以降にアップデートされたもの。
| `'< 2018-05-01'` | 2018-05-01 より前にアップデートされたもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間にアップデートされたもの。



::: code
```twig
{# Fetch global sets updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set globalSets = craft.globalSets()
    .dateUpdated(">= #{lastWeek}")
    .all() %}
```

```php
// Fetch global sets updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$globalSets = \craft\elements\GlobalSet::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `fixedOrder`

クエリの結果を [id](#id) で指定された順序で返します。





::: code
```twig
{# Fetch global sets in a specific order #}
{% set globalSets = craft.globalSets()
    .id([1, 2, 3, 4, 5])
    .fixedOrder()
    .all() %}
```

```php
// Fetch global sets in a specific order
$globalSets = \craft\elements\GlobalSet::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `handle`

グローバル設定のハンドルに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するグローバル設定
| - | -
| `'foo'` | ハンドルが `foo`。
| `'not foo'` | ハンドルが `foo` ではない。
| `['foo', 'bar']` | ハンドルが `foo` または `bar`。
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` ではない。



::: code
```twig
{# Fetch the global set with a handle of 'foo' #}
{% set globalSet = craft.globalSets()
    .handle('foo')
    .one() %}
```

```php
// Fetch the global set with a handle of 'foo'
$globalSet = \craft\elements\GlobalSet::find()
    ->handle('foo')
    ->one();
```
:::


#### `id`

グローバル設定の ID に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するグローバル設定
| - | -
| `1` | ID が 1。
| `'not 1'` | ID が 1ではない。
| `[1, 2]` | ID が 1 または 2。
| `['not', 1, 2]` | ID が 1 または 2 ではない。



::: code
```twig
{# Fetch the global set by its ID #}
{% set globalSet = craft.globalSets()
    .id(1)
    .one() %}
```

```php
// Fetch the global set by its ID
$globalSet = \craft\elements\GlobalSet::find()
    ->id(1)
    ->one();
```
:::



::: tip
特定の順序で結果を返したい場合、[fixedOrder](#fixedorder) と組み合わせることができます。
:::


#### `ignorePlaceholders`

[craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement) によってセットされたマッチするプレースホルダーエレメントを無視して、データベースに保存されたマッチするグローバル設定をクエリが返します。










#### `inReverse`

クエリの結果を逆順で返します。





::: code
```twig
{# Fetch global sets in reverse #}
{% set globalSets = craft.globalSets()
    .inReverse()
    .all() %}
```

```php
// Fetch global sets in reverse
$globalSets = \craft\elements\GlobalSet::find()
    ->inReverse()
    ->all();
```
:::


#### `limit`

返されるグローバル設定の数を決定します。



::: code
```twig
{# Fetch up to 10 global sets  #}
{% set globalSets = craft.globalSets()
    .limit(10)
    .all() %}
```

```php
// Fetch up to 10 global sets
$globalSets = \craft\elements\GlobalSet::find()
    ->limit(10)
    ->all();
```
:::


#### `offset`

結果からスキップされるグローバル設定の数を決定します。



::: code
```twig
{# Fetch all global sets except for the first 3 #}
{% set globalSets = craft.globalSets()
    .offset(3)
    .all() %}
```

```php
// Fetch all global sets except for the first 3
$globalSets = \craft\elements\GlobalSet::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

返されるグローバル設定の順序を決定します。（空の場合、デフォルトは `name ASC`）



::: code
```twig
{# Fetch all global sets in order of date created #}
{% set globalSets = craft.globalSets()
    .orderBy('dateCreated asc')
    .all() %}
```

```php
// Fetch all global sets in order of date created
$globalSets = \craft\elements\GlobalSet::find()
    ->orderBy('dateCreated asc')
    ->all();
```
:::


#### `preferSites`

[unique](#unique) がセットされている場合、マルチサイトでエレメント照会する際に選択されるべきサイトを決定します



例えば、エレメント “Foo” がサイト A とサイト B に存在し、エレメント “Bar” がサイト B とサイト C に存在し、ここに `['c', 'b', 'a']` がセットされている場合、Foo will はサイト C に対して返され、Bar はサイト B に対して返されます。

これがセットされていない場合、現在のサイトが優先されます。



::: code
```twig
{# Fetch unique global sets from Site A, or Site B if they don’t exist in Site A #}
{% set globalSets = craft.globalSets()
    .site('*')
    .unique()
    .preferSites(['a', 'b'])
    .all() %}
```

```php
// Fetch unique global sets from Site A, or Site B if they don’t exist in Site A
$globalSets = \craft\elements\GlobalSet::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```
:::


#### `relatedTo`

特定の他のエレメントと関連付けられたグローバル設定だけに、クエリの結果を絞り込みます。



このパラメーターがどのように機能するかの詳細については、[リレーション](relations.md)を参照してください。



::: code
```twig
{# Fetch all global sets that are related to myCategory #}
{% set globalSets = craft.globalSets()
    .relatedTo(myCategory)
    .all() %}
```

```php
// Fetch all global sets that are related to $myCategory
$globalSets = \craft\elements\GlobalSet::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `search`

検索クエリにマッチするグローバル設定だけに、クエリの結果を絞り込みます。



このパラメーターがどのように機能するかの詳細については、[検索](searching.md)を参照してください。



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all global sets that match the search query #}
{% set globalSets = craft.globalSets()
    .search(searchQuery)
    .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all global sets that match the search query
$globalSets = \craft\elements\GlobalSet::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `site`

グローバル設定を照会するサイトを決定します。



デフォルトでは、現在のサイトが使用されます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するグローバル設定
| - | -
| `'foo'` | ハンドルが `foo` のサイトから。
| `['foo', 'bar']` | ハンドルが `foo` または `bar` のサイトから。
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` のサイトではない。
| [craft\models\Site](craft3:craft\models\Site) オブジェクト | オブジェクトで表されるサイトから。
| `'*'` | すべてのサイトから。

::: tip
複数のサイトを指定した場合、複数のサイトに属するエレメントは複数回返されます。単一のエレメントだけを返したい場合、これと併せて [unique](#unique) を利用してください。
:::



::: code
```twig
{# Fetch global sets from the Foo site #}
{% set globalSets = craft.globalSets()
    .site('foo')
    .all() %}
```

```php
// Fetch global sets from the Foo site
$globalSets = \craft\elements\GlobalSet::find()
    ->site('foo')
    ->all();
```
:::


#### `siteId`

サイトの ID ごとに、グローバル設定を照会するサイトを決定します。



デフォルトでは、現在のサイトが使用されます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するグローバル設定
| - | -
| `1` | ID が `1` のサイトから。
| `[1, 2]` | ID が `1` または `2` のサイトから。
| `['not', 1, 2]` | ID が `1` または `2` のサイトではない。
| `'*'` | すべてのサイトから。



::: code
```twig
{# Fetch global sets from the site with an ID of 1 #}
{% set globalSets = craft.globalSets()
    .siteId(1)
    .all() %}
```

```php
// Fetch global sets from the site with an ID of 1
$globalSets = \craft\elements\GlobalSet::find()
    ->siteId(1)
    ->all();
```
:::


#### `trashed`

ソフトデリートされたグローバル設定だけに、クエリの結果を絞り込みます。





::: code
```twig
{# Fetch trashed global sets #}
{% set globalSets = craft.globalSets()
    .trashed()
    .all() %}
```

```php
// Fetch trashed global sets
$globalSets = \craft\elements\GlobalSet::find()
    ->trashed()
    ->all();
```
:::


#### `uid`

グローバル設定の UID に基づいて、クエリの結果を絞り込みます。





::: code
```twig
{# Fetch the global set by its UID #}
{% set globalSet = craft.globalSets()
    .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    .one() %}
```

```php
// Fetch the global set by its UID
$globalSet = \craft\elements\GlobalSet::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `unique`

クエリによってユニークな ID のエレメントだけが返されるかを決定します。



一度に複数のサイトからエレメントを照会する際、「重複する」結果を望まない場合に使用します。



::: code
```twig
{# Fetch unique global sets across all sites #}
{% set globalSets = craft.globalSets()
    .site('*')
    .unique()
    .all() %}
```

```php
// Fetch unique global sets across all sites
$globalSets = \craft\elements\GlobalSet::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


#### `with`

関連付けられたエレメントを eager-loaded した状態で、マッチしたグローバル設定をクエリが返します。



このパラメーターがどのように機能するかの詳細については、[エレメントの Eager-Loading](dev/eager-loading-elements.md) を参照してください。



::: code
```twig
{# Fetch global sets eager-loaded with the "Related" field’s relations #}
{% set globalSets = craft.globalSets()
    .with(['related'])
    .all() %}
```

```php
// Fetch global sets eager-loaded with the "Related" field’s relations
$globalSets = \craft\elements\GlobalSet::find()
    ->with(['related'])
    ->all();
```
:::



<!-- END PARAMS -->
