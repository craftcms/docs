<template>
    <span class="inline-poi" v-text="label"></span>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                required: true,
            },
        },
    };
</script>

<style lang="postcss" scoped>
    .inline-poi {
        background-color: var(--craft-red);
        border-radius: 100%;
        color: theme("colors.white");
        display: inline-block;
        font-weight: bold;
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        width: 20px;
    }
</style>
