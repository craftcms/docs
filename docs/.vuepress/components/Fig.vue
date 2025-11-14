<template>
    <figure>
        <img :src="src">
        <figcaption :html="caption"></figcaption>
    </figure>
</template>

<script>
export default {
  props: {
    src: String,
    caption: String,
  },
};
</script>
