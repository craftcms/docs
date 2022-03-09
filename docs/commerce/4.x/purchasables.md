# Purchasables

The core of anything sold with Commerce is a purchasable, a custom [element type](https://craftcms.com/docs/3.x/extend/element-types.html) that can be added to a cart.

## Purchasables and Line Items

Every purchasable is destined to become a line item, which happens when the purchasable is added to a cart. This is an important shift where the purchasable describing an item’s content and available options becomes a line item in an order.

When a line item is populated from a purchasable, a JSON shapshot is saved on that line item. The snapshot provides a permanent reference to whatever the purchasable looked like in that moment, regardless of how products or variations change over time. In other words, the details in the snapshot will persist regardless of any store changes during or after the checkout process.

<toggle-tip title="Example Snapshot">

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

</toggle-tip>

This can be particularly helpful, for example, if you’re displaying a completed order’s line items in templates and `getPurchasable()` returns `null`. This would happen if the purchasable was deleted, in which case details could be used from the snapshot instead. (This only applies to completed orders, because if a purchasable is deleted _during checkout_ the related line item would be removed from the customer’s cart.)

::: tip
When building your front end and displaying line items, it’s best to reference purchasable information through `getPurchasable()`, relying the `snapshot` property either as a fallback or a source of truth when the purchasable is changed or deleted.
:::

To learn more about adding your own custom purchasables, see the [Purchasable Types](extend/purchasable-types.md) page.