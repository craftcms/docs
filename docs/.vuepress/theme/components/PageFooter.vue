<template>
  <div class="content-wrapper">
    <div class="flex w-full items-center">
      <div class="w-3/5">
        <div class="vote" :class="{ voted: hasVoted }">
          <div class="pane options">
            <h4
              class="heading"
            >{{ hasVoted ? "Thanks for your feedback." : "Was this page helpful?" }}</h4>
            <div class="vote-buttons">
              <button
                aria-label="Yes"
                class="option yes"
                :class="{ chosen: hasVoted && vote === true }"
                @click="handleFeedback(true)"
              >
                <svg
                  aria-hidden="true"
                  role="img"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 21H5V9H1V21ZM23 10C23 8.9 22.1 8 21 8H14.69L15.64 3.43L15.67
                    3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.59C7.22 7.95 7
                    8.45 7 9V19C7 20.1 7.9 21 9 21H18C18.83 21 19.54 20.5 19.84
                    19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10.09L22.99 10.08L23 10Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button
                aria-label="Yes"
                class="option no"
                :class="{ chosen: hasVoted && vote === false }"
                @click="handleFeedback(false)"
              >
                <svg
                  aria-hidden="true"
                  role="img"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 3H6C5.17 3 4.46 3.5 4.16 4.22L1.14 11.27C1.05 11.5 1 11.74 1
                    12V13.91L1.01 13.92L1 14C1 15.1 1.9 16 3 16H9.31L8.36 20.57L8.33
                    20.89C8.33 21.3 8.5 21.68 8.77 21.95L9.83 23L16.42 16.41C16.78 16.05
                    17 15.55 17 15V5C17 3.9 16.1 3 15 3ZM19 3V15H23V3H19Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-2/5 text-sm text-right">
        <p>
          <a href="https://craftcms.com/contact" target="_blank" rel="noopener">
            <span class="inline-block relative mr-1" style="top: 2px;">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="envelope"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="svg-inline--fa fa-envelope fa-w-16 fa-3x"
                width="12"
                height="12"
              >
                <path
                  fill="currentColor"
                  d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                  class
                />
              </svg>
            </span>
            contact us
          </a>
        </p>
        <p>
          <a href="https://craftcms.com/" target="_blank" rel="noopener">
            <span class="inline-block relative mr-1" style="top: 2px;">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="reply"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="svg-inline--fa fa-reply fa-w-16 fa-3x"
                width="12"
                height="12"
              >
                <path
                  fill="currentColor"
                  d="M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258 0 61.441-39.581 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328z"
                  class
                />
              </svg>
            </span>
            back to craftcms.com
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.vote {
  @apply block relative;
}

h4 {
  @apply mx-0 my-0 py-0 select-none leading-none;
  -webkit-font-smoothing: antialiased;
}

.vote-buttons {
  @apply mt-3 select-none;
}

.pane {
  @apply block;
  transition: top 0.75s cubic-bezier(0.86, 0, 0.07, 1),
    opacity 0.5s cubic-bezier(0.86, 0, 0.07, 1);
  top: 0;

  &.options {
    top: 0;

    svg {
      @apply block relative;
    }
  }

  &.thanks {
    @apply opacity-0;
    top: 5rem;
  }
}

.voted {
  .option {
    @apply text-slate opacity-25 border-slate pointer-events-none;

    &.chosen {
      @apply opacity-100;
    }
  }
}

.option {
  @apply relative inline-block overflow-hidden px-5 py-2;
  @apply bg-transparent rounded;
  @apply cursor-pointer;
  @apply fill-current text-center mr-3;
  @apply border text-blue;
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);

  &::before {
    @apply absolute z-0 top-0 left-0 bottom-0;
    content: " ";
    background: transparent;
    transition: opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &:focus {
    @apply outline-none;
  }

  &:active {
    transform: scale(0.97);
  }

  &:hover {
    @apply border-blue;
    svg {
      @apply opacity-100;
    }
  }

  svg {
    @apply opacity-75;
    transition: opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
}
</style>

<script>
import { getStorage, setStorage } from "../Storage";

export default {
  methods: {
    handleFeedback(wasHelpful) {
      if (typeof ga === "function") {
        ga(
          "send",
          "event",
          "HelpfulVote",
          helpful ? "yes" : "no",
          "Vote",
          helpful ? 1 : 0
        );
      } else {
        console.log(`Couldn’t log vote. :(`);
      }

      this.setVoteForPath(this.$route.fullPath, wasHelpful);
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

      let votesForPath = votes.filter(item => {
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
    }
  },
  computed: {
    hasVoted() {
      return this.vote !== null;
    },
    vote() {
      return this.getVoteForPath(this.$route.fullPath);
    }
  }
};
</script>
