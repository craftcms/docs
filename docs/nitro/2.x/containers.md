# Adding Custom Containers

Nitro does its best to give you 80 percent of what you need for local development. However, some Craft projects have to interact with non-common tools such as MongoDB, Elasticsearch, and etc. Installing and managing these tools can be a cumbersome and often error prone process. However, Nitro has built in support to make setting up these tools really simple with the [`containers`](commands.md#containers) command.

::: tip
Nitro exposes common tools such as [Minio](services/minio.md) and [Mailhog](services/mailhog.md) as services with the [`enable`](commands.md#enable) command.
:::

## Adding a Custom Container

Imagine we are working on a project that needs to interact with data stored in Elasticsearch. We can use the `containers add` command to add the container, ports, and volumes to our Nitro configuration file. The `containers add` command provides easy prompts to walk you through setup.

```bash
$ nitro containers add
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
  1. 9200:9200
  2. 9300:9300
Enter your selection: 1
What is the name of the container [elasticsearch]?
Create a file to store environment variables [Y/n]?
Created environment variables file at "/Users/jasonmccallister/.nitro/.elasticsearch"...
New container "elasticsearch.containers.nitro" added!
Apply changes now [Y/n]? n
```

`nitro containers add` performs the following steps:

1. Prompts for an image name and searches the Docker Hub Registry for matching images.
2. Prompts for the Docker tag to pull (in our example we wanted version `7.10.1` of Elasticsearch).
3. Downloads the image from the Docker Hub Registry.
4. Examines the image pulled and looks for exposed ports and volumes.
5. Asks if you would like to expose each port it found from the images config *.
6. Prompt to create a Docker Volume for each volume in the images config.
7. Ask the user if we should create a file to store environment variables (stored at `~/.nitro/.<containername>`).
9. Prompts you to run [`nitro apply`](commands.md#apply) in order to update Nitro’s settings and your hosts file.
Nitro will search the Docker Hub registry and find images that match the name you provided. After

::: tip
Nitro will use the `portcheck` command to verify the port is available or find the next available
:::

## Customizing Environment Variables for the Container

Most Docker Images ship with sane defaults. However, there are times where you need to provide additional environment variables to configure the container. If you entered yes to the `Create a file to store environment variables` prompt, you will have a file created at `~/.nitro/.<containername>`. To add an environment variable to your container, open the file and add a new line:

```env
MY_CUSTOM_ENV=somevariable
```

::: tip
If the value contains whitespace, wrap it in quotes (`"`).
:::

To apply these changes, run `nitro apply` and your new environment variables will be appended to the containers environment.

::: tip
Defining an environment variable in the local file will override the default environment variables an image defines.
:::
