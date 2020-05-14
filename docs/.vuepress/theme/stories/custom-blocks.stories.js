import { withKnobs, select } from "@storybook/addon-knobs";
import ContentContainer from "./ContentContainer.vue";

export default {
  title: "content/Custom Blocks",
  decorators: [withKnobs]
};

export const Tip = () => ({
  components: { ContentContainer },
  props: {
    type: {
      default: select("Type", ["tip", "warning", "danger"], "tip")
    }
  },
  template: `<ContentContainer :vertical-center="true">
      <div class="custom-block" :class="type">
        <p>
          Craft’s Control Panel browser requirements have nothing to do with your
          actual website. If you’re a glutton for punishment and want your website to
          look flawless on IE 6, that’s your choice.
        </p>
      </div>
    </ContentContainer>`
});
