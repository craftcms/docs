import { withKnobs, text, select } from "@storybook/addon-knobs";
import ContentContainer from "./ContentContainer";
import Badge from "../global-components/Badge";

export default {
  title: "global-components/Badge",
  decorators: [withKnobs]
};

const exampleItems = [
  {
    label: "Read Time",
    value: "5 minutes"
  },
  {
    label: "Skill Level",
    value: "Advanced"
  },
  {
    label: "Edition",
    value: "Craft Pro"
  }
];

export const Default = () => ({
  components: { Badge, ContentContainer },
  props: {
    text: { default: text("Text", "beta") },
    type: {
      default: select("Type", ["tip", "warning", "error"], "tip")
    },
    vertical: { default: select("Vertical", ["top", "middle"], "top") }
  },
  template: `<ContentContainer :vertical-center="true">
    <h1>Drone Shipments API <Badge :text="text" :type="type" :vertical="vertical" /></h1>
  </ContentContainer>`
});
