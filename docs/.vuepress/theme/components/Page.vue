<template>
  <main class="page relative">
    <slot name="top" />

    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <PageFooter />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from "./PageEdit";
import PageNav from "./PageNav";
import PageFooter from "./PageFooter";

export default {
  name: "Page",
  components: { PageEdit, PageNav, PageFooter },
  props: ["sidebarItems"]
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;
}
</style>
