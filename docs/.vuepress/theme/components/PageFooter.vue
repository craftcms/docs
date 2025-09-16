<template>
  <div class="content-wrapper">
    <div class="feedback">
      <div
        v-if="this.$page.frontmatter.helpfulVotes !== false"
        class="vote flex flex-col w-full items-center"
        :class="{ voted: hasVoted }">

        <h4>{{ hasVoted ? this.$themeConfig.feedback.thanks : this.$themeConfig.feedback.helpful }}</h4>

        <div class="flex w-full justify-center my-4">
          <button
            aria-label="Yes"
            class="vote-button yes"
            :class="{ 'chosen': hasVoted && vote === true }"
            :disabled="hasVoted"
            @click="handleFeedback(true)">
            <ThumbUp />
          </button>
          <button
            aria-label="No"
            class="vote-button no"
            :class="{ 'chosen': hasVoted && vote === false }"
            :disabled="hasVoted"
            @click="handleFeedback(false)">
            <ThumbDown />
          </button>
        </div>

        <a
          v-if="vote === false"
          :href="getIssueUrl()"
          target="_blank"
          rel="noopener">{{ this.$themeConfig.feedback.more }}</a>
      </div>
    </div>

    <ul class="footer-links w-full flex justify-center flex-wrap mt-6">
      <li class="mx-2">
        <a href="https://craftcms.com/" target="_blank" rel="noopener">
          <span class="right-footer-icon">
            <Reply />
          </span>
          craftcms.com
        </a>
      </li>
      <li class="mx-2">
        <a href="https://craftcms.com/contact" target="_blank" rel="noopener">
          <span class="right-footer-icon">
            <Envelope />
          </span>
          Contact Us
        </a>
      </li>
      <li v-if="!this.$page.frontmatter.containsGeneratedContent" class="mx-2">
        <PageEdit />
      </li>
    </ul>

    <div v-if="this.$page.frontmatter.containsGeneratedContent" class="text-sm opacity-75 text-center my-4">
      Parts of this page are generated or assembled by automations. While we greatly appreciate contributions to the documentation, <a :href="getIssueUrl()" target="_blank" rel="noopener">reporting automated content issues</a> will allow us to fix them at the source!
    </div>

    <div class="w-full flex justify-center xl:hidden">
      <ColorModeSwitch v-on="$listeners" :on="isDark" />
    </div>
  </div>
</template>

<style lang="postcss">
.vote-button {
  @apply relative inline-block overflow-hidden px-5 py-2;
  @apply bg-transparent rounded;
  @apply cursor-pointer;
  @apply fill-current text-center mx-2;
  @apply border text-blue;
  border-color: var(--border-color);

  &::before {
    @apply absolute z-0 top-0 left-0 bottom-0;
    content: " ";
    background: transparent;
  }

  &:focus {
    outline: var(--custom-focus-outline);
  }

  &:hover {
    @apply border-blue;
  }

  &:disabled {
    @apply opacity-25 pointer-events-none;
  }

  &.chosen {
    @apply opacity-100;
  }
}

.footer-links {
  a:hover .right-footer-icon {
    @apply opacity-100;
  }

  .right-footer-icon {
    @apply inline-block relative mr-1 text-light-slate opacity-25;
    top: 2px;
  }
}
</style>

<script>
import { getStorage, setStorage } from "../Storage";
import ThumbUp from "../icons/ThumbUp";
import ThumbDown from "../icons/ThumbDown";
import Envelope from "../icons/Envelope";
import Reply from "../icons/Reply";
import ColorModeSwitch from "./ColorModeSwitch";
import PageEdit from "./PageEdit";

export default {
  components: {
    ThumbUp,
    ThumbDown,
    Envelope,
    Reply,
    ColorModeSwitch,
    PageEdit,
  },
  props: ["isDark"],
  data() {
    return {
      vote: null,
      hasVoted: null,
    };
  },
  mounted() {
    this.refreshState();
  },
  methods: {
    handleFeedback(wasHelpful) {
      if (typeof ga === "function") {
        ga(
          "send",
          "event",
          "HelpfulVote",
          wasHelpful ? "yes" : "no",
          "Vote",
          wasHelpful ? 1 : 0
        );
      } else {
        console.log(`Couldn’t log vote. :(`);
      }

      this.setVoteForPath(this.$route.fullPath, wasHelpful);
      this.hasVoted = true;
      this.vote = wasHelpful;
    },
    getStoredVotes() {
      let storedVotes = getStorage("votes", this.$site.base);

      if (storedVotes) {
        return JSON.parse(storedVotes);
      }

      return [];
    },
    getVoteForPath(path) {
      let votes = this.getStoredVotes();

      let votesForPath = votes.filter((item) => {
        return item.path === path;
      }, this);

      if (votesForPath.length) {
        return votesForPath[0].value;
      }

      return null;
    },
    setVoteForPath(path, vote) {
      let votes = this.getStoredVotes();
      votes.push({ path: path, value: vote });
      setStorage("votes", JSON.stringify(votes), this.$site.base);

      // force refresh
      this.refreshState();
    },
    refreshState() {
      this.vote = this.getVoteForPath(this.$route.fullPath);
      this.hasVoted = this.vote !== null;
    },
    getIssueUrl() {
      return 'https://github.com/craftcms/docs/issues/new/choose';
    },
  },
  watch: {
    $route() {
      this.refreshState();
    },
  },
};
</script>
