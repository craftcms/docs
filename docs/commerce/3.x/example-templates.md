# Example Templates

Commerce includes example templates you can use for a reference or starting point building your store.

The examples include a robust set of templates that do pretty much everything with Commerce. This includes a full checkout flow, address handling, order management, subscription management, and cart management.

The [`commerce/example-templates` console command](console-commands.md#example-templates) offers a quick way to customize the templates and copy them into your project, but you can also browse the templates built with default options in `vendor/craftcms/commerce/example-templates/build/`.

You can copy these built templates directly to your project’s top level `templates/` folder:

```bash
cp -r vendor/craftcms/commerce/example-templates/build/* ./templates
```

If your system supports it, you could also symlink these folders into your project’s `templates/` folder so you always have up-to-date examples _while in development_:

```bash
ln -s vendor/craftcms/commerce/example-templates/build/shop ./templates/shop
```
