<template>
    <a class="cloud-cta" :href="url" target="_blank" rel="noopener">
        <div class="title">
            {{ title }}
        </div>
        <div class="body">
            <slot>
                <p>Meet our our new scalable hosting platform, designed just for Craft.</p>
            </slot>
        </div>
        <div class="actions">
            <span class="action-text">{{ actionLabel }}</span><span class="action-arrow">&rarr;</span>
        </div>
        <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" aria-hidden="true" role="none">
                <linearGradient
                    id="cloud-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1">
                    <stop offset="0%" stop-color="rgba(226, 190, 254, 0.75)" />
                    <stop offset="100%" stop-color="rgba(147, 197, 253, 0.75)" />
                </linearGradient>
                <path d="M512 479.8V480H144C64.47 480 0 415.5 0 336C0 273.3 40.07 219.1 96 200.2V200C96 107.2 171.2 32 264 32C314.9 32 360.4 54.6 391.3 90.31C406.2 83.68 422.6 80 440 80C506.3 80 560 133.7 560 200C560 206.6 559.5 213 558.5 219.3C606.5 240.3 640 288.3 640 344C640 416.4 583.4 475.6 512 479.8zM378.2 148.7L354.9 121.7C332.8 96.08 300.3 80 264 80C197.7 80 144 133.7 144 199.1L144 234.1L111.1 245.4C74.64 258.7 48 294.3 48 336C48 389 90.98 432 144 432H506.6L509.2 431.8C555.4 429.2 592 390.8 592 344C592 308 570.4 276.9 539.2 263.3L505.1 248.4L511.1 211.7C511.7 207.9 512 204 512 200C512 160.2 479.8 128 440 128C429.5 128 419.6 130.2 410.8 134.2L378.2 148.7zM144 199.1C144 199.1 144 199.1 144 199.1V199.1z" fill="url(#cloud-gradient)"></path>
            </svg>
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
    @apply p-5 rounded-md overflow-hidden relative;
    border: 1px solid rgba(175, 175, 175, 0.25);
    box-shadow:
        0 -3px 15px -3px rgba(255, 0, 55, 0.15),
        0 3px 15px rgba(0, 60, 255, 0.2);
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

.body {
    @apply my-2;
}

.actions {
    @apply text-xs font-bold tracking-wider uppercase flex text-blue;

    .theme-dark & {
        @apply text-white;
    }
}

.icon {
    @apply absolute top-0 right-0 my-5 mr-5 w-8;
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
