<template>
    <RouterLink :to="targetPage" class="link">
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
        @apply relative rounded border block no-underline w-full p-4 pl-12 text-current;

        border: 1px solid var(--border-color);
    }

    .link:hover {
        @apply no-underline;
    }

    .arrow {
        @apply absolute top-0 left-0 mt-4 ml-4 text-gray-500;
    }

    .link:hover .arrow {
        @apply text-white;
    }

    .title {
        @apply text-lg font-medium text-blue;
    }

    .description {
        @apply text-sm text-gray-500 mt-1;
    }
</style>
