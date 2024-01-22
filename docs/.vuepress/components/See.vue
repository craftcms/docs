<template>
    <RouterLink :to="{ path: targetPage.path, hash: hash ? `#${hash}` : null }" class="link">
        <div class="arrow" aria-hidden="true">&rarr;</div>
        <div class="title">{{ label || targetPage.title }}</div>
        <div class="description" v-if="description || targetPage.frontmatter.description">{{ description || targetPage.frontmatter.description }}</div>
    </RouterLink>
</template>

<script>
import { resolvePage } from "../theme/util";

export default {
    props: {
        path: {
            type: String,
            required: true,
        },
        hash: {
            type: String,
            required: false,
        },
        label: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
    },
    computed: {
        targetPage() {
            return resolvePage(this.$site.pages, this.path, this.$page.path);
        },
    },
    methods: {},
};
</script>

<style lang="postcss" scoped>
    .link {
        @apply relative rounded border block no-underline w-full my-4 p-4 pl-12 text-current;

        border: 1px solid var(--border-color);

        &:not(:last-child) {
            @apply mb-4;
        }
    }

    .link:hover {
        @apply no-underline;
    }

    .arrow {
        @apply absolute text-gray-500 top-0 left-0 mt-4 ml-4;
    }

    .link:hover .arrow {
        color: var(--text-color);
    }

    .title {
        @apply text-lg font-medium text-blue;
    }

    .link:hover .title {
        color: var(--heading-color);
    }

    .description {
        @apply text-sm text-gray-500 mt-1;
    }
</style>
