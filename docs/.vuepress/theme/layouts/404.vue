<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>

      <blockquote>{{ getMsg() }}</blockquote>

      <RouterLink to="/">Take me home</RouterLink> or <a :href="getIssueUrl()">report a broken link</a>.
    </div>
  </div>
</template>

<script>
const msgs = [
  `There’s nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`,
];

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)];
    },
    getIssueUrl () {
      const issueBaseUrl = 'https://github.com/craftcms/docs/issues/new';
      // Not running on the client?
      if (typeof window === 'undefined') {
        return `${issueBaseUrl}?template=BROKEN_LINK.yml`;
      }

      return `${issueBaseUrl}?template=BROKEN_LINK.yml&url=${window.location.href}`
    },
  },
};
</script>
