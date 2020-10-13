<script>
export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: "tip"
    },
    text: String,
    vertical: {
      type: String,
      default: "top"
    }
  },
  render(h, { props, slots }) {
    return h(
      "span",
      {
        class: ["badge", props.type],
        style: {
          verticalAlign: props.vertical
        }
      },
      props.text || slots().default
    );
  }
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

  &.edition {
    @apply uppercase bg-transparent text-xs tracking-widest leading-none h-auto;
    border-width: 1px;
    border-color: var(--text-color);
    color: var(--text-color);
    padding: 1px 3px;
  }

  & + & {
    margin-left: 5px;
  }
}
</style>
