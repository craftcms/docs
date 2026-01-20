<template>
    <ol class="journey theme-default-content-override">
        <li v-for="(segment, i) in segments" :key="i" class="step">
            {{ ' ' }}
            <span :class="{ 'step-label': true, 'step-label--is-user-defined': segment.isDynamic }">{{ segment.label }}</span><span v-if="i < (segments.length - 1)" class="step-arrow" aria-hidden="true">&rarr;</span>
        </li>
    </ol>
</template>

<script>
export default {
  props: {
    path: String,
  },
  computed: {
    segments() {
      let arr = this.path.split(',')
        .map((s) => s.trim())
        .map(function(s) {
          if (s.indexOf('*') === 0) {
            return {
                label: s.substring(1),
                isDynamic: true,
            };
          }

          return {
            label: s,
            isDynamic: false,
          };
        });

      return arr;
    }
  }
};
</script>

<style lang="postcss" scoped>
.journey {
    list-style: none;
    display: inline;
    padding: 0;
    margin: 0;
    white-space: normal;
}

.step {
    display: inline;
}

.step-label {
    border: 1px solid var(--border-color);
    border-radius: 3px;
    font-weight: bold;
    padding: 2px 7px 1px;
    white-space: nowrap;

    &--is-user-defined {
        border-style: dashed;
    }
}

.step-arrow {
    margin: 0 2px 0 4px;
    opacity: 0.5;
}
</style>
