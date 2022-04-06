# textlint-rule-linkable-params

Permits linking to a lowercase instance of a parameter that should otherwise appear in caps in a normal sentence.

Example:

```markdown
# 👍
We always want to capitalize ID in a sentence.

# 👍
We also want to be able to link to a literal [id](#id) param.

# ❌
But we shouldn’t ever write id in normal text.
```

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-linkable-params

## Usage

Via `.textlintrc`(Recommended)

```json
{
  "rules": {
    "linkable-params": true
  }
}
```

Via CLI

```
textlint --rule linkable-params README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

ISC ©
