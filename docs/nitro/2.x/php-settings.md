# Changing PHP Settings

Nitro ships with PHP settings that are configured for local development. However, if you need to change a PHP setting for a site, Nitro provides a convenient command [`nitro iniset`](commands.md#iniset) to walk you through the change.

```bash
$ nitro iniset
Select a site:
  1. craft-support.nitro
  2. another-site.nitro
  3. plugins-dev.nitro
Enter your selection: 1
Which PHP setting would you like to change for craft-support.nitro?
  1. display_errors
  2. max_execution_time
  3. max_input_vars
  4. max_input_time
  5. max_file_upload
  6. memory_limit
  7. opcache_enable
  8. opcache_revalidate_freq
  9. post_max_size
  10. upload_max_file_size
Enter your selection: 2
What should the max execution time be [5000]? 7000
Apply changes now [Y/n]
```

The PHP ini setting will now be stored on your `nitro.yaml` file underneath the sites PHP `version` setting:

```yaml
// removed for brevity
sites:
    - hostname: craft-support.nitro
      aliases:
        - support.nitro
      path: ~/dev/support
      version: "7.3"
      php:
        max_execution_time: 7000
      extensions:
        - calendar
      webroot: craft-support/web
      xdebug: true
```

::: tip
Nitro will do its best to validate your input (e.g. you can't set the `max_execution_time` to "tomorrow")
:::

## Available Settings

The following options are available for modification.

1. display_errors
2. max_execution_time
3. max_input_vars
4. max_input_time
5. max_file_upload
6. memory_limit
7. opcache_enable
8. opcache_revalidate_freq
9. post_max_size
10. upload_max_file_size
