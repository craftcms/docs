<template>
  <div class="event-browser">
    <div class="event-search">
      <div
        class="event-search-wrapper w-full shadow rounded relative pt-2 px-4 pb-4"
      >
        <label
          for="event-autosuggest"
          class="block font-bold relative text-light-slate pb-1"
          >Selected Event</label
        >
        <vue-autosuggest
          v-model="searchText"
          :suggestions="filteredOptions"
          :input-props="{
            placeholder: 'Select an event...',
            class: 'autosuggest__input',
            id: 'event-autosuggest'
          }"
          @selected="onSelected"
        >
        </vue-autosuggest>
        <div class="absolute top-0 right-0">
          <div
            class="relative text-xs text-light-slate"
            style="top: 0.8rem; right: 1rem;"
          >
            {{ numSuggestions.toLocaleString("en") }} item{{
              numSuggestions !== 1 ? "s" : ""
            }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentEvent" class="detail">
      <div
        v-if="currentEvent.desc"
        v-html="renderMarkdown(currentEvent.desc)"
      ></div>

      <div class="example">
        <h3>Example</h3>

        <fieldset v-if="filterOptions" class="filters shadow rounded px-4 pb-2">
          <legend>
            <b>Filter Options:</b> toggle to update the example below.
          </legend>
          <div
            v-for="(filterData, filterType, index) in filterOptions"
            :key="filterType"
            class="filter-option flex w-full py-2"
            :class="{
              'border-t': index !== 0,
              disabled: disabledFilters.includes(filterType)
            }"
          >
            <div class="w-4/5 flex items-center content-center">
              <span v-if="filterData.label" class="block">
                {{ filterData.label }}
              </span>
            </div>
            <div class="w-1/5 text-right">
              <div class="flex">
                <label
                  class="filter-toggle text-red rounded-l"
                  title="Example should exclude this condition."
                  :for="filterType + '-off'"
                  :class="{
                    selected: filterSelections[filterType] == 'off'
                  }"
                >
                  <input
                    type="radio"
                    v-model="filterSelections[filterType]"
                    value="off"
                    :id="filterType + '-off'"
                    class="hidden"
                  />
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="times"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 352 512"
                    class="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                      class=""
                    ></path>
                  </svg>
                </label>
                <label
                  class="filter-toggle unset text-gray-500 border-l-2 border-r-2"
                  :for="filterType + '-unset'"
                  :class="{
                    selected: filterSelections[filterType] == ''
                  }"
                  title="Example should not account for this condition."
                >
                  <input
                    type="radio"
                    v-model="filterSelections[filterType]"
                    value=""
                    :id="filterType + '-unset'"
                    class="hidden"
                  />
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="circle"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"
                      class=""
                    ></path>
                  </svg>
                </label>
                <label
                  class="filter-toggle text-green rounded-r"
                  :for="filterType + '-on'"
                  :class="{
                    selected: filterSelections[filterType] == 'on'
                  }"
                  title="Example should include this condition."
                >
                  <input
                    type="radio"
                    v-model="filterSelections[filterType]"
                    value="on"
                    :id="filterType + '-on'"
                    class="hidden"
                  />
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="check"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                    ></path>
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <div class="code-example relative">
          <button
            @click="copyCode"
            class="copy-button absolute top-0 right-0 mr-2 mt-2 bg-white rounded px-3 py-2 leading-none text-center"
          >
            <span
              class="block relative overflow-hidden w-5 h-5 text-center"
              :class="{ copied: codeCopied }"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="copy"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="copy-icon"
              >
                <path
                  fill="currentColor"
                  d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"
                  class=""
                ></path>
              </svg>
              <check-mark class="success-icon" />
            </span>
          </button>
          <pre
            class="language-php"
          ><code v-html="highlightCode(exampleCode)"></code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.event-browser {
  .code-example {
    .copy-button {
      @apply opacity-0;
      transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);

      .copy-icon,
      .success-icon {
        @apply absolute w-4 h-4;
        left: 2px;
        top: 2px;
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
          opacity 100ms linear;
      }

      .copy-icon {
        @apply opacity-100;
        transform: translateY(0);
      }

      .success-icon {
        transform: translateY(1.25rem);
      }

      .copied {
        .copy-icon {
          @apply opacity-0;
          transform: translateY(-1.25rem);
        }

        .success-icon {
          transform: translateY(0);
        }
      }
    }

    &:hover {
      .copy-button {
        @apply opacity-100;
      }
    }
  }
}

.event-browser {
  legend {
    @apply text-light-slate px-2 rounded -mx-2;
    background: var(--tooltip-bg-color);
  }

  .filter-option {
    border-color: var(--border-color);

    div {
      @apply opacity-100;
      transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1);
    }

    &.disabled div {
      @apply opacity-25 pointer-events-none;
    }
  }

  .filter-toggle {
    @apply text-center flex items-center justify-center px-1 cursor-pointer bg-gray-300 py-2 w-1/3 select-none;

    &.unset {
      border-color: var(--bg-color);
    }

    &.selected {
      @apply bg-gray-400 shadow-inner;
    }
  }
}

.theme-default-content .autosuggest__results-container {
  @apply max-w-full w-full relative;
}

.theme-default-content .autosuggest__results {
  @apply absolute z-30 w-full overflow-y-scroll m-0 p-0 shadow-lg rounded-b;
  max-height: 400px;
  background-color: var(--bg-color);

  ul {
    @apply m-0 p-0;
  }

  .autosuggest__results-item {
    @apply list-none font-mono text-sm py-1 px-4;
  }

  .autosuggest__results-item--highlighted {
    @apply bg-gray-300;
  }
}

.autosuggest__input {
  @apply border rounded py-1 px-2 w-full font-mono text-sm;
  background: var(--bg-color);
  border-color: var(--border-color);
}

.autosuggest__input--open {
  @apply rounded-b-none !important;
}

.theme-dark {
  .event-search-wrapper {
    background: var(--sidebar-bg-color);
  }

  .btn {
    background: var(--tooltip-bg-color);
  }

  .theme-default-content .autosuggest__results {
    .autosuggest__results-item--highlighted {
      @apply bg-gray-700;
    }
  }

  .event-browser {
    .filter-toggle {
      background-color: rgba(255, 255, 255, 0.1);

      &.selected {
        @apply bg-gray-700 shadow-inner;
      }
    }

    .code-example {
      .copy-button {
        @apply bg-gray-800;
      }
    }
  }
}
</style>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import EventData from "../../../3.x/event-data/events.json";
import copy from "copy-to-clipboard";
import CheckMark from "../global-components/CheckMark.vue";

export default {
  components: {
    VueAutosuggest,
    CheckMark
  },
  data() {
    return {
      searchText: "",
      currentEvent: "",
      eventData: EventData,
      filterSelections: {},
      codeCopied: false,
      prism: null,
      marked: null
    };
  },
  mounted() {
    import("prismjs").then(module => {
      import("prismjs/components/prism-php");
      import("prismjs/components/prism-markup-templating");
      this.prism = module;
    });

    import("marked").then(module => {
      this.marked = module;
    });
  },
  methods: {
    getClassName(fullClass) {
      return fullClass.split("\\").pop();
    },
    onSelected(item) {
      if (!item) {
        return;
      }

      let itemValue = this.getSuggestionValue(item);

      if (itemValue && itemValue.value) {
        this.currentEvent = itemValue.value;
      }
    },
    getSuggestionValue(suggestion) {
      this.eventData.forEach(option => {
        let optionLabel = option.class + "::" + option.name;
        if (optionLabel === suggestion.item) {
          this.currentEvent = option;
          return option;
        }
      });
    },
    renderMarkdown(text) {
      return this.marked.parse(text);
    },
    copyCode() {
      if (copy(this.exampleCode)) {
        this.codeCopied = true;
      } else {
        console.log("couldn’t copy :(");
      }
    },
    highlightCode(code) {
      return this.prism.highlight(code, this.prism.languages.php, "php");
    }
  },
  watch: {
    currentEvent(event) {
      let filterSelections = {};

      if (event !== undefined && event.filters !== undefined) {
        Object.keys(event.filters).forEach(label => {
          filterSelections[label] = "";
        });
      }

      this.filterSelections = filterSelections;
    }
  },
  computed: {
    filteredOptions() {
      const filtered = [];

      this.eventData.forEach(item => {
        let itemName = item.class + "::" + item.name;

        if (
          this.searchText === undefined ||
          this.searchText === "" ||
          itemName.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
        ) {
          filtered.push(itemName);
        }
      });

      return [{ data: Object.freeze(filtered) }];
    },
    numSuggestions() {
      return this.filteredOptions[0].data.length;
    },
    exampleCode() {
      let classImports = [
        "yii\\base\\Event",
        this.currentEvent.class,
        this.currentEvent.type
      ];

      let code = "";

      classImports = classImports
        .concat(this.extraImports)
        .filter((item, index, inputArray) => {
          // remove any duplicate imports
          return inputArray.indexOf(item) == index;
        })
        .sort((a, b) => {
          // alphabetize imports
          return a > b;
        });

      /**
       * Imports
       */
      classImports.forEach(classImport => {
        code += `use ${classImport};\n`;
      });

      code += "\n";

      /**
       * Listener
       */
      code += `Event::on(\n`;

      let className = this.getClassName(this.currentEvent.class);
      let typeClassName = this.getClassName(this.currentEvent.type);

      code += `    ${className}::class,\n`;
      code += `    ${className}::${this.currentEvent.name},\n`;
      code += `    function (${typeClassName} $event) {\n`;

      if (!this.activeFilters.length) {
        // Don’t display a condition block
        code += `        // ...\n`;
      } else {
        let conditions = [];

        this.activeFilters.forEach(([name, value]) => {
          let filter = this.filterOptions[name];
          let posNeg = value === "off" ? "!" : "";
          conditions.push(`${posNeg}${filter.conditionsPhp}`);
        });

        if (conditions.length === 1) {
          // Single-line condition
          code += `        if (${conditions[0]}) {\n`;
        } else {
          // Multi-line condition
          code += `        if (\n`;

          conditions.forEach((condition, index) => {
            code += `            ${condition}`;
            code += index < conditions.length - 1 ? ` &&\n` : `\n`;
          });

          code += `        ) {\n`;
        }

        code += `            // ...\n`;
        code += `        }\n`;
      }

      code += `    }\n`;
      code += `);`;

      this.codeCopied = false;

      return code;
    },
    // Returns all filter options for the chosen event
    filterOptions() {
      return this.currentEvent.filters;
    },
    // Returns only the active (off or on, but not neutral) filters for the chosen event
    activeFilters() {
      return Object.entries(this.filterSelections).filter(([key, value]) => {
        return value !== "";
      });
    },
    extraImports() {
      let imports = [];

      // Add excludes from any existing filters that are set
      this.activeFilters.forEach(([name, value]) => {
        if (value !== "") {
          let filter = this.filterOptions[name];
          if (filter.imports !== undefined && filter.imports.length) {
            filter.imports.forEach(importClass => {
              imports.push(importClass);
            });
          }
        }
      });

      return imports;
    },
    disabledFilters() {
      let disabled = [];

      // Add excludes from any existing filters that are set
      this.activeFilters.forEach(([name, value]) => {
        if (value === "on") {
          let filter = this.filterOptions[name];
          if (filter.excludes !== undefined && filter.excludes.length) {
            filter.excludes.forEach(excludesFilter => {
              if (this.filterSelections[excludesFilter] !== undefined) {
                this.filterSelections[excludesFilter] = "";
                disabled.push(excludesFilter);
              } else {
                console.log(
                  `“${excludesFilter}” is not a filter that can be un-set.`
                );
              }
            });
          }
        }
      });

      return disabled;
    }
  }
};
</script>
