<script>
export default {
  functional: true,
  props: {
    address: String,
    text: String,
  },
  render(h, { props }) {
    return h(
      "a",
      {
        attrs: {
          class: 'mailto',
          href: `mailto:${props.address}`,
        },
      },
      props.text || props.address,
    );
  },
};
</script>
