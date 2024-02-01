<template>
    <a v-if="url" :href="url" target="_blank" rel="noopener" class="see see--outbound">
        <div class="see-title">
            {{ label || targetPage.title }}
            <span class="see-arrow" aria-hidden="true">&rarr;</span>
        </div>
        <div class="see-description" v-if="description || targetPage.frontmatter.description">{{ description || targetPage.frontmatter.description }}</div>
    </a>
    <RouterLink v-else :to="{ path: targetPage.path, hash: hash ? `#${hash}` : null }" class="see see--internal">
        <div class="see-title">
            {{ label || targetPage.title }}
            <span class="see-arrow" aria-hidden="true">&rarr;</span>
        </div>
        <div class="see-description" v-if="description || targetPage.frontmatter.description">{{ description || targetPage.frontmatter.description }}</div>
    </RouterLink>
</template>

<script>
import { resolvePage } from "../theme/util";

export default {
    props: {
        url: {
            type: String,
            required: false,
        },
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
    .see {
        @apply relative rounded border block no-underline w-full my-4 p-4 text-current;

        border: 1px solid var(--border-color);

        &:not(:last-child) {
            @apply mb-4;
        }
    }

    .see:hover {
        @apply no-underline;
    }

    .see-arrow {
        @apply text-gray-500 ml-2;
    }

    .see--outbound .see-arrow {
        transform: rotate(-45deg);
        transform-origin: center center;
    }

    .see:hover .see-arrow {
        color: var(--text-color);
    }

    .see-title {
        @apply text-lg font-medium text-blue;
    }

    .see:hover .see-title {
        color: var(--heading-color);
    }

    .see-description {
        @apply text-sm text-gray-500 mt-1;
    }
</style>
