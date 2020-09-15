# ガベージコレクション

Craft は古いデータを削除するためにいくつかのガベージコレクションルーチンを実行することがあります。

- （コンフィグ設定 <config3:purgeUnsavedDraftsDuration> ごとに）保存されていない下書きを削除します。
- 期限切れのテンプレートキャッシュを削除します。
- （コンフィグ設定 <config3:purgePendingUsersDuration> ごとに）期限切れの保留中のユーザーアカウントを削除します。
- （コンフィグ設定 <config3:softDeleteDuration> ごとに）期限切れのソフトデリート行を完全に削除します。
- 古いユーザーセッションデータを削除します。
- （既に存在しなくなったエレメントに属する）孤立した検索インデックスを削除します。

デフォルトでは、すべてのウェブリクエストがガベージコレクションを発動する 100,000 分の 1 のチャンスを持っています。<craft3:craft\services\Gc::$probability> を上書きすることによって `config/app.php` から設定できます。

```php
return [
    'components' => [
        'gc' => [
            'probability' => 0,     // no chance
            'probability' => 1,     // 1 in 1,000,000
            'probability' => 10,    // 1 in 100,000 (default)
            'probability' => 100,   // 1 in 10,000
            'probability' => 1000,  // 1 in 1,000
            'probability' => 10000, // 1 in 100
        ],
    ],
];
```

## 強制的なガベージコレクション

ターミナルコマンドを利用して、任意のタイミングでガベージコレクションを強制的に実行できます。

ターミナル上で Craft プロジェクトに移動し、次のコマンドを実行してください。

```bash
php craft gc
```

シェルが対話型である場合、Craft がすべての破棄済みアイテムを削除すべきかどうか尋ねられます。プロンプトで `yes` を入力した場合、まだ [soft delete duration](config3:softDeleteDuration) に満たないものでも、ソフトデリートされたすべてのデータベース行が即座に完全に削除されます。

`delete-all-trashed` オプションを利用して、すべてのソフトデリート行を強制削除することもできます。

```bash
php craft gc --delete-all-trashed=1
```
