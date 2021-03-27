# Connect the database

Before we can install Craft, we have to make sure it’s able to find the database you created for it. You’ll do this by editing settings in the `.env` file. Unless you skipped ahead, your file will look just like this but with a unique `SECURITY_KEY` filled in:

```bash
# The environment Craft is currently running in ('dev', 'staging', 'production', etc.)
ENVIRONMENT="dev"

# The secure key Craft will use for hashing and encrypting data
SECURITY_KEY="••••••••••••••••••••••••••••••••"

# The database driver that will be used ("mysql" or "pgsql")
DB_DRIVER="mysql"

# The database server name or IP address
DB_SERVER="127.0.0.1"

# The port to connect to the database with
DB_PORT=""

# The name of the database to select
DB_DATABASE=""

# The database username to connect with
DB_USER="root"

# The database password to connect with
DB_PASSWORD=""

# The database schema that will be used (PostgreSQL only)
DB_SCHEMA="public"

# The prefix that should be added to generated table names (only necessary if multiple things are sharing the same database)
DB_TABLE_PREFIX=""
```

See the setup guide for your environment for your database settings, then run the following console command:

```bash
php craft setup/db
```

This will prompt you for the settings to fill in. For each step, type your response and press return. Once you’ve finished adding settings, Craft will immediately test them. If it’s successful, it will update the `.env` file for you.

::: tip
If you’re using Nitro, run `nitro context` in your terminal and grab the hostname from the “Databases” section. You’ll need that for your `DB_SERVER` environment variable.
:::

Your settings may look different, but a successful setup will look like this:

```
Which database driver are you using? [mysql,pgsql,?]: mysql
Database server name or IP address: [127.0.0.1]
Database port: [3306]
Database username: [root] nitro
Database password:
Database name: nitro
Database table prefix:
Testing database credentials ... success!
Saving database credentials to your .env file ... done
```

If you look again at your `.env` file, you’ll see those connection settings were filled in and saved:

```bash
# The environment Craft is currently running in ('dev', 'staging', 'production', etc.)
ENVIRONMENT="dev"

# The secure key Craft will use for hashing and encrypting data
SECURITY_KEY="••••••••••••••••••••••••••••••••"

# The database driver that will be used ("mysql" or "pgsql")
DB_DRIVER="mysql"

# The database server name or IP address
DB_SERVER="mysql-8.0-3306.database.nitro"

# The port to connect to the database with
DB_PORT="3306"

# The name of the database to select
DB_DATABASE="nitro"

# The database username to connect with
DB_USER="nitro"

# The database password to connect with
DB_PASSWORD="nitro"

# The database schema that will be used (PostgreSQL only)
DB_SCHEMA="public"

# The prefix that should be added to generated table names (only necessary if multiple things are sharing the same database)
DB_TABLE_PREFIX=""
```

If you’re seeing `Testing database credentials ... failed`, Craft will try guessing another port and ask again for updated credentials. Double-check your setup guide and make sure you’ve got the details right and that your server is running. If you’re stuck here, consider [asking for help on Discord](https://craftcms.com/discord). Be sure to share what environment you’re working with and any error message you’re seeing.
