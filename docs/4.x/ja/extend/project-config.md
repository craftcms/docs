# プロジェクトコンフィグ

Each Craft installation has a central place it keeps track of **project config**, a sharable configuration store that makes it easier for developers to collaborate and deploy site changes across multiple environments.

## プロジェクトコンフィグファイルの有効化

Craft はプロジェクトコンフィグに次の設定を保存します。

自身に問いかけてください。

- アセットボリューム、および、名前付けされた画像の変形
- カテゴリグループ
- Craft、および、プラグインのスキーマのバーション

いずれかの答えが（現在、または、近い将来において）「はい」の場合、プロジェクトコンフィグのサポートに向いていません。

## 注意事項

To start sharing a project config across multiple environments, follow these steps:

- メール設定の Gmail / SMTP パスワード
- AWS S3 ボリュームのシークレットアクセスキー

Craft Commerce で製品タイプを保存するためにどのように機能するかを見てみましょう。

### Composer があるでしょう

There are a few things you should keep in mind when working with the project config:

```php
// Bad:
'secret' => getenv('SECRET_ACCESS_KEY'),

// Good:
'secret' => '$SECRET_ACCESS_KEY',
```

::: tip
プラグインがプロジェクトコンフィグに追加情報を保存できます。 どのようにするかを知るには、[プロジェクトコンフィグのサポート](extend/project-config.md)を参照してください。
:::

### 機密情報は `project.yaml` に保存できます

次に、config イベントリスナーで参照している `handleChangedProductType()`、および、`handleDeletedProductType()` メソッドを追加してください。

これらのファンクションは、プロジェクトコンフィグに基づいてデータベースを変更する責任があります。

```php
use Craft;
use craft\db\Query;
use craft\events\ConfigEvent;

public function handleChangedProductType(ConfigEvent $event)
{
    // Get the UID that was matched in the config path
    $uid = $event->tokenMatches[0];

    // Does this product type exist?
    $id = (new Query())
        ->select(['id'])
        ->from('{{%producttypes}}')
        ->where(['uid' => $uid])
        ->scalar();

    $isNew = empty($id);

    // Insert or update its row
    if ($isNew) {
        Craft::$app->db->createCommand()
            ->insert('{{%producttypes}}', [
                'name' => $event->newValue['name'],
                // ...
            ])
            ->execute();
    } else {
        Craft::$app->db->createCommand()
            ->update('{{%producttypes}}', [
                'name' => $event->newValue['name'],
                // ...
            ], ['id' => $id])
            ->execute();
    }

    // Fire an 'afterSaveProductType' event?
    if ($this->hasEventHandlers('afterSaveProductType')) {
        $productType = $this->getProductTypeByUid($uid);
        $this->trigger('afterSaveProductType', new ProducTypeEvent([
            'productType' => $productType,
            'isNew' => $isNew,
        ]));
    }
}

public function handleDeletedProductType(ConfigEvent $event)
{
    // Get the UID that was matched in the config path
    $uid = $event->tokenMatches[0];

    // Get the product type
    $productType = $this->getProductTypeByUid($uid);

    // If that came back empty, we're done!
    if (!$productType) {
        return;
    }

    // Fire a 'beforeApplyProductTypeDelete' event?
    if ($this->hasEventHandlers('beforeApplyProductTypeDelete')) {
        $this->trigger('beforeApplyProductTypeDelete', new ProducTypeEvent([
            'productType' => $productType,
        ]));
    }

    // Delete its row
    Craft::$app->db->createCommand()
        ->delete('{{%producttypes}}', ['id' => $productType->id])
        ->execute();

    // Fire an 'afterDeleteProductType' event?
    if ($this->hasEventHandlers('afterDeleteProductType')) {
        $this->trigger('afterDeleteProductType', new ProducTypeEvent([
            'productType' => $productType,
        ]));
    }
}
```

Some of your system components may have required sensitive information in their settings, such as:

::: tip
あなたのコンポーネント設定が他のコンポーネント設定を参照している場合、ハンドラーメソッド内で [ProjectConfig::processConfigChanges()](craft3:craft\services\ProjectConfig::processConfigChanges()) を呼び出すことで、他の設定変更が最初に処理されることが保証されます。

```php
php craft project-config/rebuild
```
:::

### 本番環境の変更は忘れられるかもしれません

あとは、データベースの更新ではなくプロジェクトコンフィグを更新するよう、サービスメソッドをアップデートするだけです。

If any updates are made on production that updates `project.yaml` there, those changes will be lost the next time your project is deployed and `project.yaml` is overwritten.

::: tip
`ProjectConfig::set()` will sort all associative arrays by their keys, recursively. If you are storing an associative array where the order of the items is important (e.g. editable table data), then you must run the array through <craft3:craft\helpers\ProjectConfig::packAssociativeArray()> before passing it to `ProjectConfig::set()`.
:::

```php
use Craft;
use craft\helpers\Db;
use craft\helpers\StringHelper;

public function saveProductType($productType)
{
    $isNew = empty($productType->id);

    // Ensure the product type has a UID
    if ($isNew) {
        $productType->uid = StringHelper::UUID();
    } else if (!$productType->uid) {
        $productType->uid = Db::uidById('{{%producttypes}}', $productType->id);
    }

    // Fire a 'beforeSaveProductType' event?
    if ($this->hasEventHandlers('beforeSaveProductType')) {
        $this->trigger('beforeSaveProductType', new ProducTypeEvent([
            'productType' => $productType,
            'isNew' => $isNew,
        ]));
    }

    // Make sure it validates
    if (!$productType->validate()) {
        return false;
    }

    // Save it to the project config
    $path = "product-types.{$productType->uid}";
    Craft::$app->projectConfig->set($path, [
        'name' => $productType->name,
        // ...
    ]);

    // Now set the ID on the product type in case the
    // caller needs to know it
    if ($isNew) {
        $productType->id = Db::idByUid('{{%producttypes}}', $productType->uid);
    }

    return true;
}

public function deleteProductType($productType)
{
    // Fire a 'beforeDeleteProductType' event?
    if ($this->hasEventHandlers('beforeDeleteProductType')) {
        $this->trigger('beforeDeleteProductType', new ProducTypeEvent([
            'productType' => $productType,
        ]));
    }

    // Remove it from the project config
    $path = "product-types.{$productType->uid}";
    Craft::$app->projectConfig->remove($path);
}
```

## プロジェクトコンフィグのマイグレーション

Any plugins that are storing configuration settings outside of their main plugin settings will need to be updated to [support the project config](extend/project-config.md). So there may still be some cases where changes need to be manually made on each environment.

新しいプラグインのマイグレーションが保留中、_かつ_、 `project.yaml` の変更が保留中の場合、Craft は最初にマイグレーションを実行してから `project.yaml` の変更を同期します。

1. プロジェクトコンフィグを変更する新しいマイグレーションが含まれるプラグインが、環境 A でアップデートされました。
3. Ensure that your primary environment is running the latest version of Craft.
4. If you were already running Craft 3.1 or later, run `php craft project-config/rebuild` on that environment, to ensure that its project config is up-to-date with config settings stored throughout the database.

Going forward, Craft will start updating `config/project.yaml` any time something changes that is managed by the project config.

One way to keep project config in sync is to version control `project.yaml` and use the console command for syncing any changes with Craft:

To avoid this, always check your plugin’s schema version _in `project.yaml`_ before making project config changes. (You do that by passing `true` as the second argument when calling [ProjectConfig::get()](craft3:craft\services\ProjectConfig::get()).)

```php
::: warning
Craft 3.5 added changes to project config, see <a href="https://craftcms.com/knowledge-base/upgrading-to-craft-3-5#project-config-workflow">craftcms.com/knowledge-base/upgrading-to-craft-3-5</a>.

:::
```

## プロジェクトコンフィグデータの再構築

This will treat all project config values as added or updated, resulting in a longer sync process and potentially overriding any expected changes that might have been favored in the database.

```php
use craft\events\RebuildConfigEvent;
use craft\services\ProjectConfig;
use yii\base\Event;

Event::on(ProjectConfig::class, ProjectConfig::EVENT_REBUILD, function(RebuildConfigEvent $e) {
    // Add plugin's project config data...
   $e->config['myPlugin']['key'] = $value;
});
```
