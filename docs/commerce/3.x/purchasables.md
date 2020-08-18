# Purchasables

The core of anything sold with Commerce is a purchasable, a custom [element type](https://craftcms.com/docs/3.x/extend/element-types.html) that can be added to a cart.

It should be extended to add useful attributes like Commerce’s included [product variant](products.md#variants) and [donation](donations.md) purchasables. [Plugins and modules](https://craftcms.com/docs/3.x/extend/) can provide their own purchasables.

## Purchasables and Line Items

Every purchasable is destined to become a line item, which happens when the purchasable is added to a cart. This is an important shift where the purchasable describing an item’s content and available options becomes a line item in an order.

When a line item is populated from a purchasable, a JSON shapshot is saved on that line item. The snapshot provides a permanent reference to whatever the purchasable looked like in that moment, regardless of how products or variations change over time. In other words, the details in the snapshot will persist regardless of any store changes during or after the checkout process.

::: details Example Snapshot

```json
{
  "productId": "29",
  "isDefault": "1",
  "sku": "ANT-001",
  "price": 20,
  "sortOrder": "1",
  "width": null,
  "height": null,
  "length": null,
  "weight": null,
  "stock": "0",
  "hasUnlimitedStock": "1",
  "minQty": null,
  "maxQty": null,
  "deletedWithProduct": false,
  "id": "30",
  "tempId": null,
  "draftId": null,
  "revisionId": null,
  "uid": "076305ef-17c5-4433-99de-bf5fb090f704",
  "fieldLayoutId": null,
  "contentId": "23",
  "enabled": "1",
  "archived": "0",
  "siteId": "1",
  "title": "A New Toga",
  "slug": "ant-001",
  "uri": null,
  "dateCreated": "2020-06-29T09:12:02-07:00",
  "dateUpdated": "2020-06-29T09:12:03-07:00",
  "dateDeleted": null,
  "trashed": false,
  "propagateAll": false,
  "newSiteIds": [],
  "resaving": false,
  "duplicateOf": null,
  "previewing": false,
  "hardDelete": false,
  "ref": null,
  "status": "enabled",
  "structureId": null,
  "url": "https://foo.dev/shop/products/ant-001?variant=30",
  "isAvailable": true,
  "isPromotable": true,
  "shippingCategoryId": 1,
  "taxCategoryId": 1,
  "onSale": false,
  "cpEditUrl": "#",
  "product": {
    "postDate": "2020-06-29T09:12:02-07:00",
    "expiryDate": null,
    "typeId": "1",
    "taxCategoryId": "1",
    "shippingCategoryId": "1",
    "promotable": "1",
    "freeShipping": null,
    "enabled": "1",
    "availableForPurchase": true,
    "defaultVariantId": "30",
    "defaultSku": "ANT-001",
    "defaultPrice": "20.0000",
    "defaultHeight": "0.0000",
    "defaultLength": "0.0000",
    "defaultWidth": "0.0000",
    "defaultWeight": "0.0000",
    "taxCategory": null,
    "name": null,
    "id": "29",
    "tempId": null,
    "draftId": null,
    "revisionId": null,
    "uid": "71a2efe8-163f-4014-9ffc-b8272d469a7e",
    "fieldLayoutId": null,
    "contentId": "22",
    "archived": "0",
    "siteId": "1",
    "title": "A New Toga",
    "slug": "ant-001",
    "uri": "shop/products/ant-001",
    "dateCreated": "2020-06-29T09:12:02-07:00",
    "dateUpdated": "2020-06-29T09:12:02-07:00",
    "dateDeleted": null,
    "trashed": false,
    "propagateAll": false,
    "newSiteIds": [],
    "resaving": false,
    "duplicateOf": null,
    "previewing": false,
    "hardDelete": false,
    "ref": null,
    "status": "live",
    "structureId": null,
    "url": "https://foo.dev/shop/products/ant-001"
  },
  "description": "A New Toga",
  "purchasableId": "30",
  "options": [],
  "sales": []
}
```

:::

This can be particularly helpful, for example, if you’re displaying a completed order’s line items in templates and `getPurchasable()` returns `null`. This would happen if the purchasable was deleted, in which case details could be used from the snapshot instead. (This only applies to completed orders, because if a purchasable is deleted _during checkout_ the related line item would be removed from the customer’s cart.)

::: tip
When building your front end and displaying line items, it’s best to reference purchasable information through `getPurchasable()`, relying the `snapshot` property either as a fallback or a source of truth when the purchasable is changed or deleted.
:::

## Custom Purchasables

If you’d like to introduce your own purchasable in a custom module or plugin, you can either implement [`craft\commerce\base\PurchasableInterface`](commerce3:craft\commerce\base\PurchasableInterface) or extend [`craft\commerce\base\Purchasable`](commerce3:craft\commerce\base\Purchasable).

We recommend extending [the base Purchasable](commerce3:craft\commerce\base\Purchasable) because you’ll automatically get...

- `getSalePrice()` calculation
- `getSales()` to see the details of each sale applied in that calculation
- a standard Yii model that includes everything in `attributes()` and `extraFields()`
- automatic `sku` validation

You may alternatively choose to implement [PurchasableInterface](commerce3:craft\commerce\base\PurchasableInterface), but you’ll need to handle these and any additional features yourself.

## Implementation

To implement the Purchasable Interface, inherit from the base Purchasable and implement these methods:

### `getId()`

The ID of the element.

### `getDescription()`

This is the description of the purchasable. It would often be the title or name of the product. This is used for display in the order even if the purchasable is deleted later.

### `getPrice()`

The default price of the item.

### `getSalePrice()`

The base price of the item, adjusted by any applicable sales.

### `getSku()`

The stock keeping unit number of the purchasable. Must be unique based on the `commerce_purchasables` table.

When you inherit from `craft\commerce\base\Purchasable`, a unique validation rule for the `sku` attribute is added to the `rules()` method. This ignores soft-deleted purchasables; uniqueness if only checked for non-trashed purchasables.

### `getSnapshot()`

An array of data that is serialized as JSON on the line item when the purchasable is added to the cart. This is useful when the purchasable is later deleted, but the cart can still have all relevant data about the purchasable stored within it.

### `getTaxCategoryId()`

The tax category ID of the purchasable.

Defaults to the default tax category ID.

### `getShippingCategoryId()`

The shipping category ID of the purchasable.

Defaults to the default shipping category ID.

### `hasFreeShipping()`

Stops the shipping engine from adding shipping cost adjustment to a line item containing this purchasable.

### `getIsPromotable()`

Whether the purchasable can be subject to discounts or sales.

### `getIsAvailable()`

Whether the purchasable can be added to a cart.

Should return `true` or `false` if the purchasable can be added to, or exist on, the cart.

Base Purchasable defaults to `true` always.

### `populateLineItem(Commerce_LineItemModel $lineItem)`

Gives the purchasable the chance to change the `saleAmount` and `price` of the line item when it’s added to the cart or when the cart recalculates.

### `afterOrderComplete(Order $order, LineItem $lineItem)`

Runs any logic needed for this purchasable after it was on an order that was just completed—not necessarily when an order was paid, although paying an order will complete it.

This is called for each line item that contains the purchasable.

For example, variants use this method to deduct stock.

### `getPromotionRelationSource()`

Returns the source param value for an element relation query, for use with promotions. For example, a sale promotion on a category needs to know if the purchasable is related.

Defaults to the ID of the purchasable element, which would be sufficient for most purchasables.

## Purchasable deletion

::: tip
Craft 3.1 added [soft delete support](https://craftcms.com/docs/3.x/extend/soft-deletes.html) for all element types, including purchasables. You might want to familiarize yourself with soft deletion before adding delete and restore capabilities for your purchasable element.
:::

When you inherit from `craft\commerce\base\Purchasable` and your element is saved, Commerce automatically updates the `commerce_purchasables` table with the purchasable’s `sku` so that all purchasables have a central location to check their `sku` uniqueness.

The uniqueness of your `sku` is automatically validated for you when extending `craft\commerce\base\Purchasable`.

Commerce only validates non-trashed purchasables. Trashed purchasables will still be in the `commerce_purchasables` table until garbage collection is run.

## Restoring soft-deleted purchasables

If you decide to support restoration of your purchasable element, you need to make sure your its restored `sku` is unique.

You would do this by overriding the `beforeRestore()` method in your purchasable element.

Within that method, you would first see if any non-trashed purchasables have the same `sku` as the purchasable to be restored:

```php
if (!parent::beforeDelete()) {
    return false;
}

$found = (new Query())->select(['[[p.sku]]', '[[e.id]]'])
    ->from('{{%commerce_purchasables}} p')
    ->leftJoin(Table::ELEMENTS . ' e', '[[p.id]]=[[e.id]]')
    ->where(['[[e.dateDeleted]]' => null, '[[p.sku]]' => $this->getSku()])
    ->andWhere(['not', ['[[e.id]]' => $this->getId()]])
    ->count();
```

If `$found` is greater than zero, meaning there’s another live (non-trashed) purchasable with the same `sku`, make your purchasable’s `sku` unique and update the relevant tables:

```php
if ($found) {

    $this->sku = $this->getSku() . '-1'; // make unique

    // Update variant table with new SKU
    Craft::$app->getDb()->createCommand()->update('{{%commerce_variants}}',
        ['sku' => $this->sku],
        ['id' => $this->getId()]
    )->execute();

    if ($this->isDefault) {
        Craft::$app->getDb()->createCommand()->update('{{%commerce_products}}',
            ['defaultSku' => $this->sku],
            ['id' => $this->productId]
        )->execute();
    }

    // Update purchasable table with new SKU
    Craft::$app->getDb()->createCommand()->update('{{%commerce_purchasables}}',
        ['sku' => $this->sku],
        ['id' => $this->getId()]
    )->execute();
}
```

::: tip
It’s important to update your own tables in addition to the `commerce_purchasables` table.
:::
