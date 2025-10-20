<template>
    <span
        class="glossary-term"
        @mouseenter="prefetch">
        <a
            :href="url"
            target="_blank"
            class="glossary-term-link"
            :title="`${label} in the Glossary`"
            v-text="label"></a>

        <InfoHud>
            <template v-if="loaded">
                <h3 class="glossary-term-heading" v-text="this.term.title"></h3>
                <div class="glossary-term-content theme-default-content" v-html="this.term.summaryHtml"></div>

                <a :href="this.term.url" target="_blank" class="glossary-term-more">
                    <span class="glossary-term-more-label">View in the glossary</span>
                    <span class="glossary-term-more-arrow">&rarr;</span>
                </a>

                <div v-if="this.term.docsLinks.length" class="glossary-term-docs-links">
                    <h4 class="glossary-term-heading">In the documentation…</h4>
                    <ul class="glossary-term-docs-links-list">
                        <li v-for="(link, i) in this.term.docsLinks" v-bind:key="i" class="glossary-term-docs-link">
                            <a :href="link.url">{{ link.title }}</a>
                        </li>
                    </ul>
                </div>
            </template>
            <template v-else>
                …
            </template>
        </InfoHud>
    </span>
</template>

<style scoped lang="postcss">
.glossary-term {
    padding: 4px 8px;
    background-color: var(--custom-block-bg-color);
    border-radius: 4px;
    white-space: nowrap;
}

.glossary-term-link {
    text-decoration: none !important;
}

.glossary-term-heading {
    font-weight: 500;
}

.glossary-term-content {
    padding: 0;
}

.glossary-term-more {}

.glossary-term-more-label {
    .glossary-term-more:hover & {
        text-decoration: underline;
    }
}

.glossary-term-more-arrow {
    @apply text-gray-500 ml-1;

    .glossary-term-more:hover & {
        color: var(--text-color-muted);
    }
}

.glossary-term-docs-links {
    @apply mt-3;
}

.glossary-term-docs-link {
    &::before {
        @apply text-gray-500;
        content: '–';
        margin: 0 0.5em;
    }
}

/* Special HUD styles */

.info-hud {
    @apply ml-1;
}

.icon-wrapper {
    fill: var(--link-color-default);
}
</style>

<script>
const CRAFTCOM_BASE_URL = 'https://craftcom.ddev.site';

export default {
    props: {
        slug: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
    computed: {
        // This (and the `apiUrl` method) will also come back in the API response; we just need to be able to generate them for the initial request!
        url() {
            return `${CRAFTCOM_BASE_URL}/glossary/${this.slug}`;
        },
        apiUrl() {
            return `${CRAFTCOM_BASE_URL}/api/glossary/${this.slug}`;
        }
    },
    mounted() {},
    data() {
        return {
            loaded: false,
            term: {},
        };
    },
    methods: {
        prefetch() {
            // Do we have data already?
            if (this.loaded) {
                return;
            }

            fetch(this.apiUrl, {
                crossorigin: 'anonymous',
            })
                .then((r) => r.json())
                .then((d) => {
                    this.term = d;
                    this.loaded = true;
                });
        },
    },
};
</script>
