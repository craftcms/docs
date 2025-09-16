<template>
    <span class="placeholder" :title="help"><slot /></span>
</template>

<script>
export default {
    props: {
        help: {
            type: String,
            required: false,
        },
    },
};
</script>


<style lang="postcss" scoped>
    .placeholder {
        @apply border border-dashed px-1;

        font-size: 0.95em;
        cursor: help;
    }
</style>
