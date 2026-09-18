# Filesystems + Disks

Filesystems have been replaced by Laravel’s [disks](laravel:filesystem) concept.

<!-- more -->

Each project can define any number of disks in `config/filesystems.php` and select them

When upgrading a project, developers will need to translate legacy filesystem definitions to disk configurations, with the old `handle`.
This gives projects access to a deeper pool of Flysystem-based storage drivers, and improves interoperability with applications in which Craft is just a tenant.
