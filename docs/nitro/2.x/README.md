# About Craft Nitro

Nitro is a speedy Docker-based local development environment tuned for [Craft CMS](https://craftcms.com/).

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
