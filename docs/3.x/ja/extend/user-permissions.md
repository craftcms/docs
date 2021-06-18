# ユーザー権限

モジュールとプラグインは、[EVENT_REGISTER_PERMISSIONS](craft3:craft\services\UserPermissions::EVENT_REGISTER_PERMISSIONS) イベントを使用して新しいユーザー権限をシステムに登録できます。

```php
use craft\events\RegisterUserPermissionsEvent;
use craft\services\UserPermissions;
use yii\base\Event;

public function init()
{
    parent::init();

    Event::on(
        UserPermissions::class,
        UserPermissions::EVENT_REGISTER_PERMISSIONS,
        function(RegisterUserPermissionsEvent $event) {
            $event->permissions['Permission Group Name'] = [
                'permissionName' => [
                    'label' => 'Permission Label',
                ],
            ];
        }
    );
}
```

権限は `nested` キーをパーミッションの配列に追加することで、ネストされた権限を持つこともできます。

```php
'permissionName' => [
    'label' => 'Permission Label',
    'nested' => [
        'nestedPermissionName' => [
            'label' => 'Nested Permission Label',
        ],
    ],
];
```

::: tip
Nesting is meant for UI only; if you wanted to reference `nestedPermissionName` in the example above you would use exactly that key.
:::

## 権限の要求

ユーザーがその権限を持たない場合、403 エラーが返されます。

```php
public function actionStayUpLate()
{
    // Require the `stayUpLate` permission
    $this->requirePermission('stayUpLate');
}
```

テンプレートでは、[requirePermission](../dev/tags.md#requirepermission) タグでユーザー権限を持っていることを保証することもできます。

を呼び出すことで、ログインしているユーザーが権限を持っているかを確認できます。

```twig
{% requirePermission 'stayUpLate' %}
```

## 権限の確認

を呼び出すことで、指定されたユーザーが権限を持っているかを確認することもできます。

```php
// See if they have the `stayUpLate` permission
if (Craft::$app->user->checkPermission('stayUpLate')) {
    // ...
}
```

コントローラーは、[requirePermission()](craft3:craft\web\Controller::requirePermission()) を呼び出すことで、ログインしているユーザー権限を持っていることを要求できます。

```php
/** @var \craft\elements\User $user */
if ($user->can('stayUpLate')) {
    // ...
}
```
