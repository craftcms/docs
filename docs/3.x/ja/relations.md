# リレーション

Craft は、エレメントを互いに関連付けるための強力なエンジンを持っています。 関連フィールドタイプを利用して、それらの関連性を作成します。

- [アセットフィールド](assets-fields.md)
- [カテゴリフィールド](categories-fields.md)
- [エントリフィールド](entries-fields.md)
- [タグフィールド](tags-fields.md)
- [ユーザーフィールド](users-fields.md)

Craft は次の5つの関連フィールドタイプがあります。

## 専門用語

他のフィールドタイプと同様に、これらを[セクション](entries.md#sections)、[ユーザー](users.md)、[アセット](assets.md)、[カテゴリグループ](categories.md)、[タググループ](tags.md)、および、[グローバル設定](globals.md)のフィールドレイアウトに追加できます。

- **ソース**エレメント - 他のエレメントを選択した関連フィールドを持つもの
- **ターゲット**エレメント - ソースによって選択されたエレメント

Craft のリレーションを操作する前に、それがテンプレート記法に関連するため、次の用語を把握することが重要です。

それぞれのリレーションは2つのエレメントを必要とします。

1. フィールドタイプ「エントリ」を使用する新しいフィールドを作成し、名前を「原材料」とします。
2. 与えられたエレメントのソースとして関連付くエレメントだけを見つけたい場合、`sourceElement` を使用します
3. レシピごとに必要とする多くの原材料を選択できるよう、「リミット」欄を空白のままにします。

これは実際にどのように見えるのでしょう？

（エントリフィールド経由で）関連する要素を選択したドリンクレシピ向けのエントリがある場合、エレメントに次のようにラベル付けします。

## テンプレート記法

これを設定するために、エントリフィールドタイプの新しいフィールドを作成し、「原材料」という名前を付け、ソース（利用可能なエレメントが原材料セクションに存在するとします）から「原材料」を選択し、それぞれのレシピが必要とする多くの原材料を選択できるようリミット欄を空白のままにします。

### ソースエレメントを経由したターゲットエレメントの取得

これで、それぞれのドリンクエントリに新しい「原材料」フィールドから原材料を割り当てることができます。

リレーションフィールドをセットアップすると、テンプレート内で関連するエレメントを出力するためのオプションを見ることができます。

If we want to output the ingredients list for a drink recipe, we’d use the following:

```twig
{% set ingredients = entry.ingredients.all() %}
{% if ingredients|length %}

    <h3>Ingredients</h3>

    <ul>
        {% for ingredient in ingredients %}
            <li>{{ ingredient.title }}</li>
        {% endfor %}
    </ul>

{% endif %}
```

ソースの関連フィールドのハンドル（`ingredients`）を呼び出すと、そのフィールドのターゲットエレメントをフィールドに定義された順序で出力することができる Element Criteria Model が返ります。

```twig
{% for ingredient in entry.ingredients.section('ingredients').all() %}
    <li>{{ ingredient.title }}</li>
{% endfor %}
```

### `relatedTo` パラメータ

ドリンクレシピの原材料リストを出力したい場合、次のようにします。

次のうちの1つを渡すことができます。

- ドリンクレシピエントリ：ソース  <craft3:craft\elements\Tag>
- 原材料：ターゲット
- 以下ようなプロパティを持つ[**ハッシュ**](dev/twig-primer.md#hashes)：`element`、オプションで `field`、および / または、`sourceSite` を持つ `sourceElement` または `targetElement`
- 上記のオプションの任意の組み合わせを含む[**配列**](dev/twig-primer.md#arrays)。 _いくつかの_ エレメントではなく、すべてのエレメントのリレーションの場合は `and` ではじめることができます。

::: warning
You cannot chain multiple `relatedTo` parameters on the same element query; any subsequent `relatedTo` criteria will overwrite whatever was previously set.
:::

### The `andRelatedTo` Parameter

You can use the `andRelatedTo` parameter to further specify criteria that will be joined with an `and`. It accepts the same arguments, and you can use multiple `andRelatedTo` parameters.

::: warning
You can’t combine multiple `relatedTo` criteria with `or` *and* `and` conditions.
:::

#### 行列を経由する

次のプロパティを含む[ハッシュ](dev/twig-primer.md#hashes)を `relatedTo` に渡すことで、より具体的なクエリを実行できます。

```twig
{% set relatedDrinks = craft.entries.section('drinks').relatedTo(drink).all() %}
```

::: warning
翻訳可能なリレーションフィールドとしてデザインされている場合のみ、`sourceSite` を利用してください。
:::

```twig
{% set ingredients = craft.entries.section('ingredients').relatedTo({
    sourceElement: drink,
    field: 'ingredients'
}) %}
```

これは `drink.ingredients.all()` の呼び出しと同等です。

```twig
{% set ingredients = craft.entries.section('ingredients').relatedTo({
    sourceElement: drink,
    sourceLocale: craft.app.language
}) %}
```

これは特定のフィールドを制限しませんが、現在のサイトとのリレーションに制限しています。

```twig
{% set otherUsers = craft.users()
    .not(currentUser)
    .all() %}

{% set recommendedCocktails = craft.entries()
    .section('drinks')
    .relatedTo([
        'and',
        { sourceElement: otherUsers, field: 'favoriteDrinks' },
        { targetElement: drink.ingredients.one(), field: 'ingredients' }
    ])
    .all() %}
{# result: other users’ favorite drinks that use `drink`’s first ingredient #}
```

これは現在の原材料を主成分とするドリンクを探します。

```twig
{% set relatedDrinks = craft.entries()
    .section('drinks')
    .relatedTo([ 'or', gin, lime ])
    .andRelatedTo([ 'or', rum, grenadine ])
    .all() %}
{# result: drinks entries with any relationship to `gin` or `lime` *and*
   `rum` or `grenadine` #}
```

#### 複数のリレーションの判定基準を渡す

You can query more specifically by passing `relatedTo`/`andRelatedTo` a [hash](dev/twig-primer.md#hashes) that contains the following properties:

| プロパティ                                          | 受け入れる値                                                        | 説明                                                                |
| ---------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| `element`, `sourceElement`、または `targetElement` | エレメントオブジェクト、および / または、 ID の配列                                 | 返されるエレメントが、渡したエレメントとソースまたはターゲットのどちらで関連付くかを気にしない場合、`element`を使用します |
| `field` _（オプション）_                              | フィールドハンドルかフィールド ID のいずれか（もしくは、ハンドル、および / または、ID の配列）をセットできます。 | 指定したフィールドによって作成されたリレーションにスコープを制限します。                              |
| `sourceLocale` _（オプション）_                       | [サイト](craft3:craft\models\Site)オブジェクト、サイト ID、または、サイトハンドル。   | 指定したサイトによって作成されたリレーションにスコープを制限します。                                |

::: warning
Only use `sourceSite` if you’ve designated your relational field to be translatable.
:::

または、現在の原材料を主成分とするユーザーのお気に入りのドリンクを探すために、エレメントクエリを渡したいことでしょう。

```twig
{% set ingredients = craft.entries()
    .section('ingredients')
    .relatedTo({
        sourceElement: drink,
        field: 'ingredients'
    })
    .all() %}
{# result: ingredients entries related from `drink`’s custom `ingredients` field #}
```

This doesn’t limit to a specific field, but it limits relations to the current site only:

```twig
{% set ingredients = craft.entries()
    .section('ingredients')
    .relatedTo({
        sourceElement: drink,
        sourceSite: craft.app.sites.currentSite.id
    })
    .all() %}
{# result: ingredients entries related from `drink`, limited to the current site #}
```

This finds other drinks that uses the current one’s primary ingredient:

```twig
{% set moreDrinks = craft.entries()
    .section('drinks')
    .relatedTo({
        targetElement: drink.ingredients.one(),
        field: 'ingredients'
    })
    .all() %}
{# result: other drinks using `drink`’s first ingredient #}
```

#### 行列を経由する

[行列](matrix-fields.md)フィールド内のソースエレメントに関連するエレメントを見つけたい場合、行列フィールドのハンドルを `field` パラメータに渡します。 複数の関連フィールドを持つ行列フィールドにある特定のフィールドだけをターゲットにしたい場合、ドット表記を利用してブロックタイプのフィールドハンドルを指定できます。

```twig
{% set ingredients = craft.entries()
    .section('ingredients')
    .relatedTo({
        sourceElement: drink,
        field: 'ingredientsMatrix.relatedIngredient'
    })
    .all() %}
```

#### 複数のリレーションの判定基準を渡す

複数のタイプのリレーションを組み合わせる必要がある場合があります。 例えば、エスプレッソを含む現在のユーザーのお気に入りのドリンクをすべて出力するには、次のようになります。

```twig
{% set espresso = craft.entries()
    .section('ingredients')
    .slug('espresso')
    .one() %}

{% set cocktails = craft.entries()
    .section('drinks')
    .relatedTo([
        'and',
        { sourceElement: currentUser, field: 'favoriteDrinks' },
        { targetElement: espresso, field: 'ingredients' }
    ])
    .all() %}
{# result: current user’s favorite espresso drinks #}
```

Or you might want to pass an element query to find other users’ favorite drinks using the current one’s primary ingredient:

```twig
{% set otherUsers = craft.users()
    .id('not '~currentUser.id)
    .all() %}

{% set recommendedCocktails = craft.entries()
    .section('drinks')
    .relatedTo([
        'and',
        { sourceElement: otherUsers, field: 'favoriteDrinks' },
        { targetElement: drink.ingredients.one(), field: 'ingredients' }
    ])
    .all() %}
{# result: other users’ favorite drinks that use `drink`’s first ingredient #}
```
