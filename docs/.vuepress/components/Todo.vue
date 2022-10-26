<template>
    <div class="todo" :text="notes"></div>
</template>

<script>
export default {
  components: {},
  props: {
    ver: String,
    notes: {
      type: String,
      default: 'No notes provided.',
    },
  },
  computed: {},
  mounted () {
    console.warn(`[${this.$page.title}] To Do: ${this.notes}`);
  }
};
</script>

<style lang="postcss" scoped>
.todo {
    display: none;
}
</style>
