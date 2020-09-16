<script>
export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: "tip",
    },
    title: String,
    text: String,
    vertical: {
      type: String,
      default: "top",
    },
  },
  render(h, { props, slots }) {
    return h(
      "span",
      {
        class: ["badge", props.type],
        style: {
          verticalAlign: props.vertical,
        },
        attrs: {
          title: props.title,
        },
      },
      props.text || slots().default
    );
  },
};
</script>

<style lang="postcss" scoped>
.badge {
  @apply inline-block text-white rounded-sm py-0 px-1;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  background-color: #42b983;

  &.tip,
  &.green {
    background-color: #42b983;
  }

  &.error {
    background-color: #da5961;
  }

  &.warning,
  &.warn,
  &.yellow {
    background-color: #e7c000;
  }

  & + & {
    margin-left: 5px;
  }
}
</style>
