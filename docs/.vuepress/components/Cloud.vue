<template>
    <a class="cloud-cta" :href="url" target="_blank" rel="noopener">
        <div class="title">
            {{ title }}
        </div>
        <slot>
            <p>Meet our our new scalable hosting platform, designed just for Craft.</p>
        </slot>
        <div class="actions">
            <span class="action-text">{{ actionLabel }}</span><span class="action-arrow">&rarr;</span>
        </div>
    </a>
</template>

<script>
const CLOUD_URL = 'https://craftcms.com/cloud';

export default {
    props: {
        title: {
            type: String,
            default: 'Craft Cloud',
        },
        actionLabel: {
            type: String,
            default: 'Learn more',
        }
    },
    computed: {
        url() {
            return CLOUD_URL;
        },
    },
};
</script>

<style lang="postcss" scoped>
.cloud-cta {
    /* As similar to `custom-block` as possible! */
    @apply p-5 rounded overflow-hidden relative;
    background-image: linear-gradient(120deg, rgba(226, 190, 254, 0.3) 20%, rgba(147, 197, 253, 0.3) 90%);
    border: 1px solid rgba(175, 175, 175, 0.25);
    box-shadow: 0 6px 10px rgba(175, 175, 175, 0.15);
    color: inherit;
    display: block;
    margin: 1rem 0;
    position: relative;
    text-decoration: none;

    &:hover {
        text-decoration: none;
    }
}

.title {
    @apply font-bold
}

.actions {
    @apply text-xs font-bold tracking-wider uppercase flex text-blue;

    .theme-dark & {
        @apply text-white;
    }
}

.action-arrow {
    @apply ml-2;
    transform: translateX(0);
    transition: 0.15s ease-out transform;

    .cloud-cta:hover & {
        transform: translateX(3px);
    }
}
</style>
