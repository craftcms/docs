# Laravel Terminology

As you get deeper into the upgrade, you will encounter more and more Laravel-specific language.
This page maps existing Craft and Yii concepts into the new ecosystem.

<!-- more -->

| Craft/Yii Concept | Laravel Equivalent | Notes |
| --- | --- | --- |
| Model | Class, Eloquent Model, or Data Object |  |
| Record | Eloquent Model | |
| Plugin | Extension, Package | Plugins still exist, but they are structured more like Laravel packages. |
| Module | Service Provider | |
| Filter | Middleware | |
| Generator | `artisan make` command | Currently, Laravel can only generate code in the `app\` namespace. |
| Asset bundle | Publishable | A lightweight implementation of Yii’s asset bundles ships with Craft 6.x, but we plan to remove it in a future version. |
| Filesystem | Disk | Filesystems are migrated to disks during the upgrade. |
| Service | Singleton | Laravel resolves “singleton” classes through the service container (directly, or via a facade). A service is uniquely identified by its class name. |
| Component | Service provider, class | A base “component” class still exists to support familiar validation patterns, but they do not bear any  |
| Helper | Facade | Facades provide a static API to services. |
| Filter | [Middleware](#) | Now added in the routing layer instead of configuration or within a controller. |
