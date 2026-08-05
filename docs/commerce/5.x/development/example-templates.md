# Example Templates

Commerce includes example templates you can use for a reference, or as a starting point when building your store. They are continually updated to support the full range of Commerce features, out-of-the-box, including:

- [Cart](cart.md) management;
- Complete [checkout](checkout.md) flow, including [payments](making-payments.md);
- [Address](address-management.md) management;
- [Order](orders.md) confirmation and history;
- [Subscription](subscription-templates.md) management;

…and more!

Use the [`commerce/example-templates` console command](../reference/console-commands.md#example-templates) to install the example templates into your project. Those templates are always available for reference, in `vendor/craftcms/commerce/example-templates/dist/`.

You can manually copy some or all of the templates into your project’s top level `templates/` folder:

```bash
cp -r vendor/craftcms/commerce/example-templates/dist/* ./templates
```

The rest of this section covers the implementation of common storefront features, from scratch.

## Plugin Development and Reference

If your system supports it, you can symlink these folders into your project’s `templates/` folder so you always have up-to-date examples:

```bash
ln -s vendor/craftcms/commerce/example-templates/dist/shop ./templates/shop
```

This is only recommended for active development—say, when frequently pulling in unreleased versions of Commerce to test a [gateway plugin](../extend/payment-gateway-types.md).
