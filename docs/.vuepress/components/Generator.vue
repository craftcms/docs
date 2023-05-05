<template>
    <div class="generator">
        <div class="prompt">
            <a class="bolt" href="https://github.com/craftcms/generator" target="_blank" title="Add the generator to your project!">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                    <path d="m164.5,0L55,144h66.9l-30.4,112,109.5-144h-66.9L164.5,0Z" />
                </svg>
            </a>
            <div class="command">
                <span class="executable">php craft</span>
                <span class="make">make</span>
                <span class="component">{{ component }}</span>
                <span class="options">{{ args.join(' ') }}</span>
            </div>
        </div>
        <button
            class="copy"
            title="Copy this command"
            @click="copy()">{{ copyText }}</button>
    </div>
</template>

<script>
import Icon from '../public/icons/icon-generator.svg';

export default {
    components: {
        Icon,
    },
    props: {
        component: {
            type: String,
            required: false,
        },
        app: {
            type: Boolean,
            required: false,
            default: false,
        },
        plugin: {
            type: String,
            required: false,
        },
        module: {
            type: String,
            required: false,
        },
        options: {
            type: Array,
            required: false,
            default: () => [],
        },
        // Technically, Generator also supports --with-docblock and --path arguments. Not sure how we should handle these.
    },
    computed: {
        fullCommand () {
            return [
                'php craft make',
                this.component,
                ...this.args,
            ].filter((s) => !!s).join(' ');
        },
        args () {
            return [
                this.app ? '--app' : null,
                this.plugin ? `--plugin=${this.plugin}` : null,
                this.module ? `--module=${this.module}` : null,
            ];
        },
    },
    data () {
        return {
            copyText: 'Copy',
        };
    },
    methods: {
        copy () {
            navigator.clipboard.writeText(this.fullCommand)
                .then(() => {
                    this.copyText = 'Copied!';

                    window.setTimeout(() => {
                        this.copyText = 'Copy';
                    }, 2000);
                });
        }
    },
};
</script>

<style lang="postcss" scoped>
    .generator {
        @apply relative rounded block p-4 text-current;

        background-color: var(--code-bg-color);
    }
    .prompt {
        align-items: center;
        display: flex;
    }

    .bolt {
        @apply w-6 mr-4 p-1;
        border-radius: 2px;
        transition: 0.1s linear background-color;

        &:hover {
            background-color: var(--bg-color);
        }
    }

    .icon {
        fill: var(--craft-red);

    }

    .command {
        @apply font-mono;

        font-size: 0.8rem;
    }

    .executable {
        @apply opacity-50 transition-opacity duration-200;

        .generator:hover & {
            @apply opacity-100;
        }
    }

    .make {
        @apply text-red;
    }

    .component {
        @apply opacity-50 transition-opacity duration-200 delay-100;

        .generator:hover & {
            @apply opacity-100;
        }
    }

    .options {
        @apply opacity-50 transition-opacity duration-200 delay-200;

        .generator:hover & {
            @apply opacity-100;
        }
    }
    .copy {
        @apply absolute top-0 right-0 mt-4 mr-4 uppercase tracking-widest text-xs;
    }
</style>
