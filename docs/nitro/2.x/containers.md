# Custom Containers

Nitro does its best to give you 80 percent of what you need for local development. However, some Craft projects have to interact with non-common tools such as MongoDB, Elasticsearch, and etc. Installing and managing these tools can be cumbersome and error-prone process, but Nitro supports `container` commands that leverage Docker for easier setup.

::: tip
Nitro exposes common tools such as [Minio](services/minio.md) and [Mailhog](services/mailhog.md) as services with the [`enable`](commands.md#enable) command.
:::

## Adding a Custom Container

Imagine we’re working on a project that needs to interact with data stored in Elasticsearch. We can use the [`container new`](commands.md#container-new) command to add the container, ports, and volumes to our Nitro configuration file. The `container new` command provides prompts to walk you through setup.

```bash
$ nitro container new
What image are you trying to add? elasticsearch
Which image should we use?
  1. elasticsearch
  2. bitnami/elasticsearch
  3. bitnami/elasticsearch-exporter
  4. elastichq/elasticsearch-hq
  5. justwatch/elasticsearch_exporter
  6. taskrabbit/elasticsearch-dump
  7. lmenezes/elasticsearch-kopf
  8. blacktop/elasticsearch
  9. barnybug/elasticsearch
  10. elastic/elasticsearch
Enter your selection: 1
What tag should we use [latest]? 7.10.1
  … downloading docker.io/library/elasticsearch:7.10.1 ✓
Expose port `9200` on the host machine [Y/n]? y
Expose port `9300` on the host machine [Y/n]? y
Should we proxy one of the ports to expose a web based UI [Y/n]?
Which port should we use for the UI?
  1. 9200
  2. 9300
Enter your selection: 1
What is the name of the container [elasticsearch]?
Create a file to store environment variables [Y/n]?
Created environment variables file at "/Users/oli/.nitro/.elasticsearch"...
New container "elasticsearch.containers.nitro" added!
Apply changes now [Y/n]? n
```

`nitro container new` performs the following steps:

1. Prompts for an image name and searches the Docker Hub Registry for matching images.
2. Prompts for the Docker tag to pull (in our example we wanted version `7.10.1` of Elasticsearch).
3. Downloads the image from the Docker Hub Registry.
4. Examines the image and looks for exposed ports and volumes.
5. Asks if you’d like to expose each port it found from the image’s config.
6. Asks if you’d like to create a Docker Volume for each volume in the image’s config.
7. Asks if you’d like create a file to store environment variables (stored at `~/.nitro/.<containername>`).
9. Prompts you to run [`nitro apply`](commands.md#apply) in order to update Nitro’s settings and your hosts file.

::: tip
Nitro will use the `portcheck` command to verify the port is available or find the next available.
:::

## Customizing Environment Variables for the Container

Most Docker images ship with sane defaults, but you may still need to use environment variables to configure the container. If you entered yes to the **Create a file to store environment variables** prompt, you will have a file created at `~/.nitro/.<containername>`. To add an environment variable to your container, open the file and add a new line:

```env
MY_CUSTOM_ENV=somevariable
```

::: tip
If the value contains whitespace, wrap it in quotes (`"`).
:::

To apply these changes, delete the container from Docker Desktop and run `nitro apply`. Your new environment variables will be appended to the container’s environment as it’s rebuilt.

::: tip
Defining an environment variable in the local file will override the default environment variables an image defines.
:::

## Removing a Custom Container

Use the [`container remove`](commands.md#container-remove) command to destroy a custom container. This will remove it from Nitro’s configuration, delete the running container, and delete the accompanying environment variable file if it was created.

::: tip
Running `nitro container remove` will only prompt for container selection if you’ve added more than one custom container.
:::