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

### Recommended System Specs

For a smooth development experience, we recommend a minimum of 8GB system RAM and 2.5GB disk space, assuming you use a few PHP versions and have 5-10 running projects.

Your machine needs to meet Docker’s minimum [macOS](https://docs.docker.com/docker-for-mac/install/#system-requirements) or [Windows](https://docs.docker.com/docker-for-windows/install/#system-requirements) system requirements. \
Nitro utilizes whatever resources you allocate to Docker, downloading the images it needs to support your projects.

While optimal settings depend on your machine specs, we generally recommend allocating at least 1/3 of your cores and 1/4 of your memory for Docker.
