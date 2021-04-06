# Changing PHP Settings

Nitro ships with PHP settings configured for local development and provides a [`nitro iniset`](commands.md#iniset) command to customize them.

Running the `iniset` command prompts you to choose a site for the custom setting and then the setting you’d like to specify.

In this example, we’re increasing `max_execution_time` for `craft-support.nitro`:

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

The PHP setting is stored in your `nitro.yaml` file:

```yaml{8-9}
# ...
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
Nitro attempts to validate your input; you can’t set `max_execution_time` to “tomorrow”.
:::

## Available Settings

The following options are available for modification.

- `1` display_errors
- `2` max_execution_time
- `3` max_input_vars
- `4` max_input_time
- `5` max_file_upload
- `6` memory_limit
- `7` opcache_enable
- `8` opcache_revalidate_freq
- `9` opcache_validate_timestamps
- `10` post_max_size
- `11` upload_max_file_size

## Manually Overriding PHP Settings

While the `iniset` command takes care of applying changes for you, you can alternatively add a `.user.ini` in your web root to override individual PHP settings.

If our web root is `web/` and we want to increase `max_execution_time` using a static file, we’d create `web/.user.ini` with the following contents:

```ini
max_execution_time = 7000
```

To apply the change, restart the container from Docker Desktop or run `nitro restart`.

::: warning
Any values you provide in your `.user.ini` file will override changes with `nitro iniset` and any environment variables.
:::

::: danger
Heroku and other hosting providers may allow your `.user.ini` file to override settings, so be careful not to make accidental changes in another environment!
:::
