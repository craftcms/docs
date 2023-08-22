<script>
export default {
  functional: true,
  props: {
    label: String,
  },
  render(h, { props, slots }) {
    const content = [h('div', { class: 'content' }, slots().default)];

    if (props.label) {
        content.unshift(h(
            'div',
            {
                class: 'banner',
            },
            [h('span', { class: 'label' }, props.label)]
        ));
    }

    return h('div', { class: 'custom-block' }, content);
  },
};
</script>

<style lang="postcss" scoped>
.banner {
    @apply mb-5 mt-5;
}

.label {
    @apply uppercase bg-transparent tracking-wider leading-none h-auto font-mono;
    font-size: 0.8em;
    border-color: currentColor;
    border-radius: 3px;
    border-width: 1px;
    opacity: 0.4;
    padding: 4px 8px 3px;
}
</style>
