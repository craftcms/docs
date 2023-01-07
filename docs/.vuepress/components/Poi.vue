<template>
    <span
        class="inline-poi"
        :class="{ active: isActive }"
        :title="description"
        @click="activatePoi()">{{ label }}</span>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
    props: {
        id: {
            type: String,
            required: false,
            default: () => uuidv4(),
        },
        target: {
            type: String,
            required: false,
            default: '*',
        },
        label: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
    },
    computed: {
        isActive: {
            get() {
                return this.$store.state.activePoiId === `${this.target}:${this.id}`;
            },
            set(value) {
                if (value) {
                    this.$store.commit("activatePoi", `${this.target}:${this.id}`);
                } else {
                    // Nothing to do. Fine if it remains active.
                }
            },
        },
    },
    methods: {
        activatePoi() {
            this.isActive = true;
        },
        deactivatePoi() {
            this.isActive = false;
        }
    },
};
</script>

<style lang="postcss" scoped>
    .inline-poi {
        background-color: var(--craft-red);
        border-radius: 100%;
        color: theme("colors.white");
        cursor: help;
        display: inline-block;
        font-weight: bold;
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        width: 20px;
    }
    
    .active {
        background-color: theme("colors.blue");
    }
</style>
