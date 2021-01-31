# Adding PHP Extensions

The Docker images Nitro use the [`craftcms/nginx:<php-version>-dev`](https://github.com/craftcms/docker). These images are preconfigured with the PHP extensions required for Craft CMS and Commerce. However, there are times you may need to install additional extensions for a site.

To enable an extension for a site, run the following command:

```bash
$ nitro extensions
Select a site:
  1. craft-support.nitro
  2. another-site.nitro
  3. plugins-dev.nitro
  4. tutorial.nitro
Enter your selection: 1
Which PHP extension would you like to enable for craft-support.nitro?
  1. bcmath
  2. bz2
  3. calendar
  4. dba
  5. enchant
  // remove for readability
Enter your selection: 1
Apply changes now [Y/n] #
```

The additonal PHP extension will now be stored on your `nitro.yaml` file underneath the sites PHP `version` setting:

```yaml
// removed for brevity
sites:
    - hostname: craft-support.nitro
      aliases:
        - support.nitro
      path: ~/dev/support
      version: "7.3"
      extensions:
        - calendar
      webroot: craft-support/web
      xdebug: true
```

## Supported Extensions

The following extensions are available for installation:

1. bcmath
2. bz2
3. calendar
4. dba
5. enchant
6. exif
7. gettext
8. gmp
9. imap
10. interbase
11. ldap
12. mysqli
13. oci8
14. odbc
15. pcntl
16. pdo_dblib
17. pdo_firebird
18. pdo_oci
19. pdo_odbc
20. pdo_sqlite
21. recode
22. shmop
23. snmp
24. sockets
25. sysvmsg
26. sysvsem
27. sysvshm
28. tidy
29. wddx
30. xmlrpc
31. xsl
32. zend_test
