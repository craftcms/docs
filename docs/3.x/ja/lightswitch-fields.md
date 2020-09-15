# Lightswitch フィールド

Lightswitch フィールドでは、「はい」または「いいえ」の答えが必要なとき向けに、トグル入力を提供します。

## テンプレート記法

### Lightswitch フィールドによるエレメントの照会

Lightswitch フィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを利用して、Lightswitch フィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエレメント
| - | -
| `true` or `':notempty:'` | Lightswitch 値が有効になっている。
| `false` or `':empty:'` | Lightswitch 値が無効になっている。

```twig
{# Fetch entries with the Lightswitch field enabled #}
{% set entries = craft.entries()
    .myFieldHandle(true)
    .all() %}
```

::: tip
明示的な Lightswitch 値の設定を持たないエレメントは、フィールドの設定にしたがって、デフォルトのフィールド値を持つかのように扱われます。
:::

### Lightswitch フィールドデータの操作

テンプレート内で Lightswitch フィールドのエレメントを取得する場合、Lightswitch フィールドのハンドルを利用して、そのデータにアクセスできます。

```twig
{% if entry.myFieldHandle %}
    <p>I'm on!</p>
{% else %}
    <p>I'm off.</p>
{% endif %}
```

::: tip
そのエレメントが明示的な Lightswitch フィールド値の設定を持たない場合、フィールドのデフォルト値が返されます。
:::

### 投稿フォームで Lightswitch フィールドを保存

Lightswitch フィールドを含める必要がある[投稿フォーム](dev/examples/entry-form.md)がある場合、出発点としてこのテンプレートを利用してください。

```twig
{{ hiddenInput('fields[myFieldHandle]', '') }}

{{ tag('input', {
  type: 'checkbox',
  name: 'fields[myFieldHandle]',
  value: '1',
  checked: (entry.myFieldHandle ?? false) ? true : false,
}) }}
```
