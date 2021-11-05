<template>
  <div class="event-browser">
    <div class="event-search">
      <div class="w-full shadow rounded relative">
        <vue-autosuggest
          :suggestions="suggestions"
          :input-props="{
            placeholder: 'Select an event...',
            class: 'border rounded py-1 px-2 m-3',
            style: 'width: calc(100% - 1.5rem);'
          }"
          @selected="onSelected"
          @input="onInputChange"
        >
          <template slot="after-suggestions">
            <div class="w-full text-center">
              <div
                class="rounded px-2 py-1 text-xs bg-white mx-auto inline-block"
              >
                {{ numSuggestions.toLocaleString("en") }} item{{
                  numSuggestions !== 1 ? "s" : ""
                }}
              </div>
            </div>
          </template>
        </vue-autosuggest>
      </div>
    </div>
    <div v-if="currentEvent" class="detail">
      <h2>
        <code>{{ currentEvent.class }}::{{ currentEvent.name }}</code>
      </h2>

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
              <!-- <span class="block">{{ filterType }}</span> -->
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
                      class=""
                    ></path>
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <pre class="language-php"><code v-html="exampleCode"></code></pre>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.event-browser {
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

.event-search {
}

.theme-default-content .autosuggest__results {
  @apply absolute z-20 w-full;
}

.theme-default-content .autosuggest__results ul {
  @apply m-0 p-0 overflow-y-scroll shadow-lg z-30 w-full relative rounded-b;
  background-color: var(--bg-color);
  top: -0.25rem;
  max-height: 400px;
}

.autosuggest__results .autosuggest__results-item {
  @apply list-none font-mono text-sm py-1 px-4;
}

.autosuggest__results .autosuggest__results-item--highlighted {
  @apply bg-gray-300;
}
</style>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import EventData from "../../../3.x/event-data/events.json";
import Prism from "prismjs";
import { marked } from "marked";
import "prismjs/components/prism-php";
import "prismjs/components/prism-markup-templating";

export default {
  components: {
    VueAutosuggest
  },
  data() {
    return {
      query: "",
      eventData: EventData,
      eventOptions: [],
      eventSearchKeyword: "",
      currentEvent: "",
      filterSelections: {}
    };
  },
  mounted() {
    let options = this.eventData;

    options.forEach(option => {
      option.text = option.class + "::" + option.name;
      option.value = option;
    });

    this.eventOptions = options;
  },
  methods: {
    onInputChange(q) {
      this.query = (q || "").toLowerCase();
    },
    getClassName(fullClass) {
      return fullClass.split("\\").pop();
    },
    onSelected(item) {
      let itemValue = this.getSuggestionValue(item);

      if (itemValue && itemValue.value) {
        this.currentEvent = itemValue.value;
      }

      //this.query = item.item;
    },
    getSuggestionValue(suggestion) {
      this.eventData.forEach(option => {
        let optionLabel = option.class + "::" + option.name;

        if (optionLabel === suggestion.item.replace("//", "/")) {
          this.currentEvent = option.value;
          return option.value;
        }
      });
    },
    renderMarkdown(text) {
      return marked.parse(text);
    }
  },
  watch: {
    currentEvent(event) {
      let filterSelections = {};

      if (event.filters !== undefined) {
        Object.keys(event.filters).forEach(label => {
          filterSelections[label] = "";
        });
      }

      this.filterSelections = filterSelections;
    }
  },
  computed: {
    suggestions() {
      return [
        {
          data: this.eventData
            .filter(item => {
              if (this.query === undefined) {
                return true;
              }

              let itemName = (item.class + "::" + item.name).toLowerCase();
              return itemName.indexOf(this.query.toLowerCase()) !== -1;
            })
            .map(item => {
              return item.class + "::" + item.name;
            })
        }
      ];
    },
    numSuggestions() {
      return this.suggestions[0].data.length;
    },
    exampleCode() {
      let classImports = [
        "yii\\base\\Event",
        this.currentEvent.class,
        this.currentEvent.type
      ];

      let html = "";

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
        html += `use ${classImport};\n`;
      });

      html += "\n";

      /**
       * Listener
       */
      html += `Event::on(\n`;

      let className = this.getClassName(this.currentEvent.class);
      let typeClassName = this.getClassName(this.currentEvent.type);

      html += `    ${className}::class,\n`;
      html += `    ${className}::${this.currentEvent.name},\n`;
      html += `    function (${typeClassName} $event) {\n`;

      if (!this.activeFilters.length) {
        // Don’t display a condition block
        html += `        // ...\n`;
      } else {
        let conditions = [];

        this.activeFilters.forEach(([name, value]) => {
          let filter = this.filterOptions[name];
          let posNeg = value === "off" ? "!" : "";
          conditions.push(`${posNeg}${filter.conditionsPhp}`);
        });

        if (conditions.length === 1) {
          // Single-line condition
          html += `        if (${conditions[0]}) {\n`;
        } else {
          // Multi-line condition
          html += `        if (\n`;

          conditions.forEach((condition, index) => {
            html += `            ${condition}`;
            html += index < conditions.length - 1 ? ` &&\n` : `\n`;
          });

          html += `        ) {\n`;
        }

        html += `            // ...\n`;
        html += `        }\n`;
      }

      html += `    }\n`;
      html += `);`;

      return Prism.highlight(html, Prism.languages.php, "php");
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
