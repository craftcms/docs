# Testing Tips

## Maintain Your Database

The Craft module provides a `cleanup` and `transaction` option for the `codeception.yml` file. It is recommended that you set these options to `true`.

### `transactions`

The transaction option ensures that changes made to the database during your test are rolled back using a Yii2
[transaction](https://www.yiiframework.com/doc/api/2.0/yii-db-transaction). This means that if you,
for example, save a `craft\db\ActiveRecord` instance before the next test that database row is removed. This prevents collisions and prevents you from spending hours debugging your tests.

::: warning
If you are running MySQL the `[[%searchindex]]` table may be running the MyISAM Database driver. If this is the case transactions are [not-supported](https://dev.mysql.com/doc/refman/5.6/en/myisam-storage-engine.html).

If you are creating new elements in your tests using `Craft::$app->getElements()->saveElement()` and the element you are saving has content in the `[[%searchindex]]` table, this `[[%searchindex]]` content will not be removed. It is recommended to manually clear the search index or use an [element fixture](fixtures.md#element-fixtures).
:::

### `cleanup`

The cleanup option ensures that fixtures are removed after a test. This cleans any fixture data inserted during your test from the database. Before the next test the new fixtures will be added again.

## Use .gitignore

In the [setup](../testing-craft/setup.md) section you set up a `_craft` folder which contains various directories for testing. One of these directories is the `storage` directory. While tests are running, Craft will create a lot of temporary files and logs in this folder. Use a [.gitignore](https://git-scm.com/docs/gitignore) file to keep these files out of your version control system (i.e. Git). The same policy should apply to the `tests/_output/` directory Codeception creates for tests.

If you are using Craft 3.5 or later, or are using [the `projectConfig` config option](../framework/config-options.md#config-options) in Codeception, you’ll likely want to ignore the `tests/_craft/config/project/*` as well.

## Namespacing

Craft namespaces its tests under one separate root namespace and then expands per test subject. I.E. Unit tests are namespaced under `crafttests\unit` while functional tests are namespaced under `crafttests\functional`. It is advised to apply this same convention to your tests. If you are testing a module or plugin you may want to provide support resources for testing, it is advised to namespace these using `my\plugin\namespace\test`. This is exactly how Craft does it as well. See the [element fixtures](../testing-craft/fixtures.md) as an example.

## Quick Setup via Console Command

If you have a general understanding of the typical Craft testing setup, you can use the `tests/setup` console command which will do all of the important setup work for you. It will copy from Craft’s `src/test/internal/example-test-suite` folder to either your project’s root directory or a directory path of your choosing. All you then have to do is:

- Install Codeception with `composer require codeception/codeception`.
- Run `codecept build`.
- Add a `.env` file.
