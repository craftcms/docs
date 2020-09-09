# エントリの投稿フォーム

出発点としてこのテンプレートを使用することで、新しいエントリを投稿するためのフォームを作成できます。

```twig
{% macro errorList(errors) %}
  {% if errors %}
    <ul class="errors">
      {% for error in errors %}
        <li>{{ error }}</li>
      {% endfor %}
    </ul>
  {% endif %}
{% endmacro %}

{# If there were any validation errors, an `entry` variable will be passed to the
   template, which contains the posted values and validation errors. If that’s not
   set, we’ll default to a new entry. #}
{% set entry = entry ?? create('craft\\elements\\Entry') %}

<form method="post" accept-charset="UTF-8">
  {{ csrfInput() }}
  {{ actionInput('entries/save-entry') }}
  {{ redirectInput('viewentry/{slug}') }}
  {{ hiddenInput('sectionId', '2') }}
  {{ hiddenInput('enabled', '1') }}

  <label for="title">Title</label>
  {{ input('text', 'title', entry.title, {
    id: 'title',
    class: entry.hasErrors('title') ? 'error',
  }) }}
  {{ _self.errorList(entry.getErrors('title')) }}

  <label for="body">Body</label>
  {{ tag('textarea', entry.body, {
    id: 'body',
    name: 'body',
    class: entry.hasErrors('body') ? 'error',
  }) }}
  {{ _self.errorList(entry.getErrors('body')) }}

  <input type="submit" value="Publish">
</form>
```

`sectionId` は必ずエントリを保存したいセクションの実際の ID に調整してください。

エントリを送信するユーザーは、そのセクションのエントリを作成するための権限を持っている必要があります。

::: tip
入力項目 `entryVariable` をフォームに含めることで、バリデーションエラーを含む場合にエントリがテンプレートから返されるべき変数名を変更できます。

```twig
{{ hiddenInput('entryVariable', 'badEntry'|hash) }}
```
:::

::: tip
[Guest Entries](https://plugins.craftcms.com/guest-entries) プラグインを利用して、匿名のエントリ投稿を受け付けることができます。
:::

### 既存エントリの編集

不可視項目 `entryId` を追加すると、既存のエントリを保存するためのフォームに変更できます。

```twig
{{ hiddenInput('entryId', entry.id) }}
```
