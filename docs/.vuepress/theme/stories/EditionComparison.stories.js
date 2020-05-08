import Vue from "vue";
import EditionComparison from "../global-components/EditionComparison.vue";

export default { title: "Edition Comparison" };

export const asAComponent = () => ({
  components: { EditionComparison },
  template: "<edition-comparison />"
});
