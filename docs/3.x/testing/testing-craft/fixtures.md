# Using Fixtures

Fixtures establish data that’s predictable in each test run for making assertions.

They can be defined in the `fixturesMethod` [defined](../framework/config-options.md) in the `codeception.yml` file. You can read more in the [Yii2 docs](https://www.yiiframework.com/doc/guide/2.0/en/test-fixtures#defining-a-fixture) about fixture classes and data and how these can be used for testing.

To setup fixtures Create a folder called `fixtures` in your `tests` folder. In this folder we will put our fixture classes and fixture data.

## Craft-Specific Data

Regular fixtures will suffice for traditional database rows. Because Craft utilizes complex linked data structures, it introduces some of its own fixtures for an improved testing experience.

### Element Fixtures

Craft’s powerful element types are a key selling point for developers, but their under-the-hood complexity can be a challenge for testing. For this reason, Craft’s test suite provides support for setting up various element types.

::: tip
Craft’s element fixtures are based on the [robuust](https://robuust.digital/) team’s [Fixtures plugin](https://github.com/robuust/craft-fixtures).
:::

#### Working with your own custom element type?

You can extend [craft\test\fixtures\elements\ElementFixture](craft3:craft\test\fixtures\elements\ElementFixture) for your own testing and to offer other developers the ability to use your element type as a fixture testing their code.

### Asset Fixtures

You can add Asset fixtures by extending [craft\test\fixtures\elements\AssetFixture](craft3:craft\test\fixtures\elements\AssetFixture).

The fixture data file could look like this:

```php
<?php

return [
    [
        'tempFilePath' => 'path/to/_craft/storage/runtime/temp/product.jpg',
        'filename' => 'product.jpg',
        'volumeId' => $this->volumeIds['products'],
        'folderId' => $this->folderIds['clothes'],
    ],
];
```

`product.jpg` should live alongside other testing assets in `tests/_craft/assets`.

This will upload and link `product.jpg` as an Asset.

`AssetFixture` will define `$this->volumeIds` and `$this->folderIds` with their handles as key.

The primary keys are: `volumeId`, `folderId`, `filename` and `title`.

::: warning
The `AssetFixture` class will automatically copy your assets into the `tests/_craft/storage/runtime/temp` folder.
Please ensure the `tempFilePath` points to a filename this directory.
:::

### Category Fixtures

You can add Category fixtures by extending [craft\test\fixtures\elements\CategoryFixture](craft3:craft\test\fixtures\elements\CategoryFixture).


The fixture data file could look like this:

```php
<?php

return [
    [
        'groupId' => $this->groupIds['categories'],
        'title' => 'Category',
    ],
];
```

`CategoryFixture` will define `$this->groupIds` with all category group handles as key.

The primary keys are: `siteId`, `groupId` and `title`.

### Entry Fixtures

You can add Entry fixtures by extending [craft\test\fixtures\elements\EntryFixture](craft3:craft\test\fixtures\elements\EntryFixture).

The fixture data file could look like this:

```php
<?php

return [
    [
        'sectionId' => $this->sectionIds['home'],
        'typeId' => $this->typeIds['home']['home'],
        'title' => 'Home',
    ],
];
```

`EntryFixture` will define `$this->sectionIds` with all section handles as key. It will also define `$this->typeIds` with all section handles as the first key and the entry type handles as the second key.

The primary keys are: `siteId`, `sectionId`, `typeId` and `title`.

### Global Set Fixture

You can add Global Set fixtures by extending [craft\test\fixtures\elements\GlobalSetFixture](craft3:craft\test\fixtures\elements\GlobalSetFixture).

The fixture data file could look like this:

```php
<?php

return [
    [
        'handle' => 'aHandle',
    ],
];
```

The primary keys are: `handle`.

::: tip
By default, a Global Set doesn’t get its own database row. If you need it to, you can set `$useActiveRecord` to `true`.
:::

### Tag Fixtures

You can add Tag fixtures by extending [craft\test\fixtures\elements\TagFixture](craft3:craft\test\fixtures\elements\TagFixture).

The fixture data file could look like this:

```php
<?php

return [
    [
        'groupId' => $this->groupIds['tags'],
        'title' => 'Tag',
    ],
];
```

`TagFixture` will define `$this->groupIds` with all tag group handles as key.

The primary keys are: `siteId`, `groupId` and `title`.

### User Fixtures

You can add User fixtures by extending [craft\test\fixtures\elements\UserFixture](craft3:craft\test\fixtures\elements\UserFixture).

The fixture data file could look like this:

```php
<?php

return [
    [
        'username' => 'User',
        'email' => 'info@example.com',
    ],
];
```

The primary keys are: `siteId`, `username` and `email`.

### Element Fixture Field Layout & Content

If you pass a `fieldLayoutType` into any class that extends the base `ElementFixture` class, Craft will automatically try to find the associated field layout and link it to the new Element you’re creating.

If you want to set custom field values you can simply include those into your fixture data file, prefixing the custom field handle with `field:`.

Here’s an example of a fixture data file that creates an entry with a title and custom fields:

```php
<?php
return [
    [
        // Standard `craft\elements\Entry` fields.
        'authorId' => '1',
        'sectionId' => '1000',
        'typeId' => '1000',
        'title' => 'Theories of matrix',

        // Set a field layout
        'fieldLayoutType' => 'field_layout_with_matrix_and_normal_fields',

        // Set custom field values
        'field:myPlainTextFieldHandle' => 'value of text field',
        'field:myOtherPlainTextFieldHandle' => 'another value',

        // Set custom Matrix field values
        'field:matrixFirst' => [
            'new1' => [
                'type' => 'myBlockType',
                'fields:mySubfield' => 'Some text'
            ],
            'new2' => [
                'type' => 'myBlockType',
                'fields:mySubfield' => 'Some text'
            ],
        ],
    ]
];

```

### Field Layout Fixtures

Field Layouts are another Craft-specific concept. They consist of:

- the layouts themselves
- Tabs
- Fields

These are linked to one another and would be difficult to manage in a test environment with ordinary fixtures. Craft provides a special [FieldLayoutFixture](craft3:craft\test\fixtures\FieldLayoutFixture) class that provides all the required support for field layouts along with their tabs and the underlying fields—this includes creating the fields in the `{{%content}}` table.

To use this, first create an ordinary fixture class extending [craft\test\fixtures\FieldLayoutFixture](craft3:craft\test\fixtures\FieldLayoutFixture).

Then, add the `public $dataFile = 'path/to/datafile/` property that points to a datafile containing at least the following keys (including the nested position).

```php
<?php
use craft\fields\Matrix;
use craft\fields\PlainText;

return [
    [
        'type' => 'craft\test\Craft', // Required - can be set to whatever you want.
        'tabs' => [ // Required - Value can be set to an empty array[]
            [
                'name' => 'My First Tab', // Required
                'fields' => [ // Required - Value can be set to an empty array[]
                    [
                        'layout-link' => [ // Required
                            'required' => true // Required
                        ],
                        'field' => [
                            'name' => 'Test field', // Required
                            'handle' => 'myTestField', // Required
                            'fieldType' => PlainText::class, // Required
                        ]
                    ],
                    // Matrix fields are supported in the following config:
                    [
                        'layout-link' => [
                            'required' => false
                        ],
                        'field' => [
                            'name' => 'Matrix Field',
                            'handle' => 'myMatrixField',
                            'fieldType' => Matrix::class,
                            'blockTypes' => [
                                'new1' => [
                                    'name' => 'A Block',
                                    'handle' => 'myMatrixBlock',
                                    'fields' => [
                                        'new1' => [
                                            'type' => PlainText::class,
                                            'name' => 'First Subfield',
                                            'handle' => 'myBlockField',
                                            'instructions' => '',
                                            'required' => false,
                                            'typesettings' => [
                                                'multiline' => ''
                                            ]
                                        ]
                                    ]
                                ],
                                'new2' => [
                                    'name' => 'Another Block',
                                    'handle' => 'myOtherMatrixBlock',
                                    'fields' => [
                                        'new1' => [
                                            'type' => PlainText::class,
                                            'name' => 'Another Subfield',
                                            'handle' => 'myOtherBlockField',
                                            'instructions' => '',
                                            'required' => false,
                                            'typesettings' => [
                                                'multiline' => ''
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ],
                ]
            ]
        ]
    ]
];
```

::: tip
The value part of the key-value pairs can be set to whatever is required
for your project. It’s crucial that the array keys are set with **any** string value. You can add your own parameters to the array value of the `field` key, as long as they correspond to `public` properties in the class defined in the `fieldType` key.
:::
