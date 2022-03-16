# Extending Commerce

You can customize Craft Commerce beyond configuration by introducing your own code in several ways:

- Using [template hooks](template-hooks.md) to add your own UI elements to Commerce views in the control panel.
- Writing a plugin or module that uses [events](events.md) to customize functionality as classes are registered and things happen in the order lifecycle, including:
    - Registering custom [adjusters](adjusters.md) to modify pricing.
    - Registering custom [shipping methods](shipping-methods.md).
    - Registering additional [purchasables](purchasable-types.md).
    - Customizing or replacing the [tax engine](tax-engines.md).
- Writing custom plugins that add support for additional [payment gateways](payment-gateway-types.md).
