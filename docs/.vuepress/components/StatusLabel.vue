<template>
    <div :class="['status-label', getSlug()]">
        <div class="status-label-pip" :style="{ backgroundColor: getColor() }"></div>
        <div class="status-label-text">
            {{ label }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: 'live',
            },
            color: {
                type: String,
                default: null,
            },
        },
        methods: {
            getSlug() {
                return this.label.toLowerCase().replace(/[^a-z]/, '-');
            },
            getColor() {
                if (!this.color) {
                    return null;
                }

                if (this.color.indexOf('#') !== 0) {
                    return null;
                }

                return this.color;
            },
        },
    };
</script>

<style lang="postcss" scoped>
    .status-label {
        align-items: center;
        border-radius: 1em;
        display: inline-flex;
        height: 20px;
        padding: 0 10px 0 5px;

        &.live {
            background-color: theme('colors.craft.green');
        }

        &.pending {
            background-color: theme('colors.craft.orange');
        }
    }

    .status-label-pip {
        background-color: white;
        border-radius: 100%;
        height: 12px;
        margin-right: 5px;
        width: 12px;
    }

    .status-label-text {
        color: white;
        font-size: 0.7em;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }
</style>
