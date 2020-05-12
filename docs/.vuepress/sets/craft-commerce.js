module.exports = {
  title: "Craft Commerce",
  icon: "/icons/commerce.svg",
  baseDir: "commerce",
  defaultUri: "/commerce/v3/",
  versions: {
    v3: "v3",
    v2: "v2",
    v1: "v1"
  },
  defaultVersion: "v3",
  primarySet: true,
  sidebar: {
    v3: {
      "/": [
        {
          title: "Introduction",
          collapsable: false,
          children: ["editions"]
        },
        {
          title: "Installing Craft Commerce",
          collapsable: false,
          children: ["requirements", "installation", "upgrading"]
        },
        {
          title: "Configuration",
          collapsable: false,
          children: ["configuration", "project-config"]
        },
        {
          title: "Core Concepts",
          collapsable: false,
          children: [
            "cart",
            "orders",
            "products",
            "product-types",
            "donations",
            "customers",
            "sales",
            "discounts",
            "tax",
            "shipping",
            "custom-order-statuses",
            "order-status-emails",
            "payment-currencies",
            "subscriptions"
          ]
        },
        {
          title: "Payment Gateways",
          collapsable: false,
          children: ["payment-gateways", "gateway-config"]
        },
        {
          title: "Getting Elements",
          collapsable: false,
          children: [
            "dev/element-queries/order-queries",
            "dev/element-queries/product-queries",
            "dev/element-queries/variant-queries",
            "dev/element-queries/subscription-queries",
            "craft-commerce-carts-cart"
          ]
        },
        {
          title: "Developers",
          collapsable: false,
          children: [
            "events",
            "extensibility",
            "purchasables",
            "adjusters",
            "shipping-methods"
          ]
        },
        {
          title: "Template Guides",
          collapsable: false,
          children: [
            "example-templates",
            "commonly-used-variables",
            "adding-to-and-updating-the-cart",
            "estimate-cart-addresses",
            "update-cart-addresses",
            "update-cart-customer",
            "coupon-codes",
            "customer-address-management",
            "twig-filters",
            "loading-a-cart",
            "making-payments",
            "saving-payment-sources",
            "subscription-templates"
          ]
        },
        {
          title: "Fields",
          collapsable: false,
          children: ["products-fields"]
        }
      ]
    },
    v2: {},
    v1: {
      "/": [
        {
          title: "Getting Started",
          collapsable: false,
          children: [""]
        },
        {
          title: "Installing and Updating",
          collapsable: false,
          children: [
            "requirements",
            "installation",
            "updating",
            "configuration"
          ]
        },
        {
          title: "Core Concepts",
          collapsable: false,
          children: [
            "cart",
            "orders",
            "products",
            "product-types",
            "customers",
            "sales",
            "discounts",
            "tax",
            "shipping",
            "custom-order-statuses",
            "order-status-emails",
            "payment-currencies"
          ]
        },
        {
          title: "Payment Gateways",
          collapsable: false,
          children: ["payment-gateways"]
        },
        {
          title: "Getting Elements",
          collapsable: false,
          children: [
            "craft-commerce-orders",
            "craft-commerce-cart",
            "craft-commerce-products",
            "craft-commerce-variants"
          ]
        },
        {
          title: "Models",
          collapsable: false,
          children: [
            "address-model",
            "country-model",
            "customer-model",
            "order-adjustment-model",
            "order-history-model",
            "order-model",
            "order-status-model",
            "payment-form-model",
            "product-model",
            "state-model",
            "transaction-model",
            "variant-model"
          ]
        },
        {
          title: "Developers",
          collapsable: false,
          children: [
            "extensibility",
            "events-reference",
            "purchasables",
            "adjusters",
            "hooks-reference",
            "shipping-methods"
          ]
        },
        {
          title: "Template Guides",
          collapsable: false,
          children: [
            "available-variables",
            "add-to-cart",
            "update-cart-addresses",
            "customer-address-management",
            "twig-filters"
          ]
        },
        {
          title: "Fields",
          collapsable: false,
          children: ["products-fields", "customer-info-fields"]
        }
      ]
    }
  }
};
