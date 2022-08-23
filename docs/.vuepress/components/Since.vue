<template>
    <a
      class="since" 
      :href="releaseUrl"
      :title="`${feature} was first available in version ${ver} of Craft.`"
      target="_blank">
        {{ ver }}<span class="plus">+</span>
      </a>
</template>

<script>
const GITHUB_BLOB_URL = "https://github.com/craftcms/cms/blob";
const GITHUB_CHANGELOG_FILENAME = "CHANGELOG.md";

export default {
  components: {},
  props: {
    ver: String,
    feature: {
      type: String,
      default: 'This feature',
    },
  },
  computed: {
    releaseUrl() {
      // Keep in mind that this doesn't validate the incoming version number. Check your references for dead URLs!
      return `${GITHUB_BLOB_URL}/${this.ver}/${GITHUB_CHANGELOG_FILENAME}`;
    },
  },
};
</script>

<style lang="postcss" scoped>
.since {
  @apply inline-block rounded-md py-1 px-1;
  background-color: var(--custom-block-bg-color);
  border-color: var(--custom-block-border-color);
  font-size: 13px;
  vertical-align: super;
  line-height: 12px;

  &:hover {
    background-color: var(--code-bg-color);
    text-decoration: none;
  }
}
</style>
