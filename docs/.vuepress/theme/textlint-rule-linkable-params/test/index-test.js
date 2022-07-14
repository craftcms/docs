"use strict";
import TextLintTester from "textlint-tester";
const tester = new TextLintTester();
// rule
import rule from "../src/index";
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
  valid: [
    // no problem
    "We can link to a literal param [id](#id).",
    "We can refer to its ID.",
    "Using `id` in backticks should be fine.",
    "The use of the term *in* a word should be okay, like video.",
    "We can write Markdown in a sentence.",
    "We can refer to a [markdown](#markdown) filter.",
  ],
  invalid: [
    // single match
    {
      text: "We shouldn’t be able to use id lowercase in a sentence.",
      errors: [
        {
          message: "Found term “id”, use “ID” instead.",
          line: 1,
          column: 29,
        },
      ],
    },
    // single match
    {
      text: "We shouldn’t be able to use markdown lowercase in a sentence.",
      errors: [
        {
          message: "Found term “markdown”, use “Markdown” instead.",
          line: 1,
          column: 29,
        },
      ],
    },
  ],
});
