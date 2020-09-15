# Atom フィード

次のテンプレートは、あなたのサイトで Atom 1.0 フィードを提供するために使用できます。`feedAuthorName` と `feedAuthorEmail` の2つのフィールドを持つ、`globals` というハンドルの[グローバル設定](../../globals.md)があることを前提としています。

::: tip
ファイル拡張子 `.atom` で終わるテンプレートとして保存すると、Craft はそれを MIME タイプ `application/atom+xml` で配信します。
:::

```twig
<?xml version="1.0"?>
<feed xmlns="http://www.w3.org/2005/Atom">

    <title>{{ siteName }}</title>
    <link href="{{ siteUrl }}" />
    <link type="application/atom+xml" rel="self" href="{{ url(craft.app.request.pathInfo) }}" />
    <updated>{{ now|atom }}</updated>
    <id>{{ url(craft.app.request.pathInfo) }}</id>
    <author>
        <name>{{ globals.feedAuthorName }}</name>
        <email>{{ globals.feedAuthorEmail }}</email>
    </author>

    {% for entry in craft.entries.all() %}
        <entry>
            <id>{{ entry.url }}</id>
            <link type="text/html" rel="alternate" href="{{ entry.url }}" />
            <title>{{ entry.title }}</title>
            <published>{{ entry.postDate|atom }}</published>
            <updated>{{ entry.dateUpdated|atom }}</updated>
            <author>
                <name>{{ entry.author.fullName }}</name>
                <uri>{{ siteUrl }}</uri>
            </author>
            <content type="html"><![CDATA[
                {{ entry.body }}
            ]]></content>
        </entry>
    {% endfor %}
</feed>
```

