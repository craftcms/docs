# エントリの投稿フォーム

次のコードを利用して、サイトのフロントエンド向けに新しいエントリの投稿フォームを作成できます。

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

<form method="post" accept-charset="UTF-8">
    {{ csrfInput() }}
    {{ actionInput('entries/save-entry') }}
    {{ redirectInput('viewentry/{slug}') }}
    {{ hiddenInput('sectionId', '2') }}
    {{ hiddenInput('enabled', '1') }}

    <label for="title">Title</label>
    <input id="title" type="text" name="title"
        {%- if entry is defined %} value="{{ entry.title }}"{% endif -%}>

    {% if entry is defined %}
        {{ _self.errorList(entry.getErrors('title')) }}
    {% endif %}

    <label for="body">Body</label>
    <textarea id="body" name="fields[body]">
        {%- if entry is defined %}{{ entry.body }}{% endif -%}
    </textarea>

    {% if entry is defined %}
        {{ _self.errorList(entry.getErrors('body')) }}
    {% endif %}

    <input type="submit" value="Publish">
</form> If that’s not
   set, we’ll default to a new entry. If that’s not
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
  {{ tag('textarea', {
    id: 'body',
    name: 'body',
    class: entry.hasErrors('body') ? 'error',
    text: entry.body,
  }) }}
  {{ _self.errorList(entry.getErrors('body')) }}

  <input type="submit" value="Publish">
</form>
```

「sectionId」は必ずエントリを保存したいセクションの実際の ID に調整してください。

エントリを送信するユーザーは、そのセクションのエントリを作成するための権限を持っている必要があります。

不可視項目の「entryId」を追加すると、既存のエントリを保存するためのフォームに変更できます。

```twig
{{ hiddenInput('entryVariable', 'badEntry'|hash) }}
```
:::

::: tip
You can accept anonymous entry submissions using the [Guest Entries](https://plugins.craftcms.com/guest-entries) plugin.
:::

### エントリの編集フォーム

You can modify the form to save existing entries by adding an `entryId` hidden input to the form:

```twig
{{ hiddenInput('entryId', entry.id) }}
```
