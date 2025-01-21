<template>
    <div class="indent" :style="`width: ${level * 1.5}em;`">↳</div>
</template>

<script>
    export default {
        props: {
            level: {
                type: Number,
                default: 1,
            },
        }
    };
</script>

<style scoped>
    .indent {
        display: inline-block;
        text-align: right;
    }
</style>
