<template>
    <ol class="journey theme-default-content-override">
        <li v-for="(segment, i) in segments" :key="i" class="step">
            {{ ' ' }}
            <span class="step-label">{{ segment }}</span><span v-if="i < (segments.length - 1)" class="step-arrow" aria-hidden="true">&rarr;</span>
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
        return this.path.split(',').map((s) => s.trim());
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
    font-size: 0.9em;
}

.step-label {
    border: 1px solid var(--border-color);
    border-radius: 3px;
    padding: 0.2em 0.4em;
    white-space: nowrap;
}

.step-arrow {
    margin: 0 2px 0 4px;
    opacity: 0.5;
}
</style>
