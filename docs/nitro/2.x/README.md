# About Craft Nitro

Nitro is a console-based tool for managing a Docker-based local PHP development environment. \
It’s built with [Craft CMS](https://craftcms.com/) in mind but works great with any modern PHP application.

## What is Nitro?

By design, Nitro uses Docker under the hood in a way that may be different from other Docker projects you’ve seen:

- **Simplicity matters** because the focus should be on building websites, not devops. \
Nitro provides simple, opinionated commands and manages Docker so you don’t have to. Everything’s containerized and ephemeral, so even if you don’t like Nitro you can remove its containers and CLI binary and it’s like it never existed.
- **Multiple projects** can run efficiently and simultaneously, each with whatever hostnames you’d like. You don’t have to run one project at a time to avoid port conflicts or fans running at full speed.
- **Best possible local Craft experience**, with the stuff you might want for Craft and Craft plugin development without the cruft and complexity that would slow you down or give you more to manage.

See [How Nitro Works](how-nitro-works.md) for more on what Nitro does under the hood.

## What’s Included

Nitro installs the following:

- PHP 8.0 (option to use 7.4, 7.3, 7.2, 7.1, or 7.0)
- MySQL & MariaDB
- PostgreSQL
- Redis
- [Xdebug](https://xdebug.org/)
- [MailHog](https://github.com/mailhog/MailHog) email testing
- [MinIO](https://min.io/) object storage
- [DynamoDB](https://aws.amazon.com/dynamodb/) NoSQL database service

## System Requirements

- macOS, Linux, Windows 10 with WSL2
- [Docker](https://www.docker.com/)

### Recommended Docker Resources

Your machine needs to meet Docker’s minimum [macOS](https://docs.docker.com/docker-for-mac/install/#system-requirements) or [Windows](https://docs.docker.com/docker-for-windows/install/#system-requirements) system requirements, and we recommend allocating the following in Docker Desktop’s **Settings** → **Resources** → **Advanced**:

- CPUs: 2+ (ideally at least 1/3 of your system’s cores)
- Memory: 4GB+ (ideally at least 1/4 of your system’s RAM)
- Swap: 1GB+
- Disk Image Size: 25GB+

::: tip
Nitro downloads the images it needs to support your projects. It’ll need at least 2.5GB of physical disk space to run a few PHP versions and 5-10 projects.
:::
