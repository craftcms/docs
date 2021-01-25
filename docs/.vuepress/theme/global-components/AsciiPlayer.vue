<template>
  <div class="asciicast-wrap">
    <figure :id="id" class="asciicast-inner"></figure>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      source: `https://asciinema.org/a/${this.id}.js`,
      ascid: `asciicast-${this.id}`
    }
  },
  mounted() {
    let asciiscript = document.createElement('script');
    asciiscript.setAttribute('src', this.source);
    asciiscript.setAttribute('id', this.ascid);
    asciiscript.setAttribute('data-rows', 24);
    asciiscript.setAttribute('data-theme', 'solarized-dark');
    document.getElementById(this.id).appendChild(asciiscript)
  }
}
</script>

<style scoped>
.asciicast-wrap {
  @apply overflow-x-scroll;
}

.asciicast-inner {
  width: 688px;
}
</style>