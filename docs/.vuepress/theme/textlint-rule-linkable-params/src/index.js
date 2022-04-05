const DEFAULT_OPTIONS = {
  terms: [
    ["id", "ID"],
    ["uid", "UID"],
    ["uuid", "UUID"],
    ["markdown", "Markdown"],
  ],
};

export default function (context, opts = {}) {
  const { Syntax, RuleError, report, getSource } = context;
  const options = { ...DEFAULT_OPTIONS, ...opts };
  const terms = options.terms;

  /**
   * Get parents of node.
   * The parent nodes are returned in order from the closest parent to the outer ones.
   * @param node
   * @returns {Array}
   */
  function getParents(node) {
    const result = [];
    // child node has `parent` property.
    let parent = node.parent;
    while (parent != null) {
      result.push(parent);
      parent = parent.parent;
    }
    return result;
  }

  /**
   * Return true if `node` is wrapped any one of `types`.
   * @param {TxtNode} node is target node
   * @param {string[]} types are wrapped target node
   * @returns {boolean|*}
   */
  function isNodeWrapped(node, types) {
    const parents = getParents(node);
    const parentsTypes = parents.map(function (parent) {
      return parent.type;
    });
    return types.some(function (type) {
      return parentsTypes.some(function (parentType) {
        return parentType === type;
      });
    });
  }

  /**
   * Match word in text.
   * Taken directly from https://github.com/sapegin/textlint-rule-terminology/blob/master/index.js.
   * @param {*} term
   * @returns
   */
  function getRegexForTerm(term) {
    return new RegExp(
      // 1. Beginning of the string, or any character that isn't "-" or alphanumeric
      // 2. Exact match of the pattern
      // 3. Space, ". ", "." at the end of the string, end of the string
      `(?<=^|[^-\\w])\\b${term}\\b(?= |\\. |\\.$|$)`,
      "ig"
    );
  }

  return {
    [Syntax.Str](node) {
      terms.forEach(([paramTerm, sentenceTerm]) => {
        const text = getSource(node); // Get text
        const regex = getRegexForTerm(paramTerm);
        const matches = regex.exec(text);

        if (!matches) {
          return;
        }

        // allow this if it’s wrapped in a link or code block
        if (isNodeWrapped(node, [Syntax.Link, Syntax.Code])) {
          return;
        }

        // sentence-appropriate format is fine
        if (matches[0] === sentenceTerm) {
          return;
        }

        const indexOfTerm = matches.index;
        const ruleError = new RuleError(
          `Found term “${paramTerm}”, use “${sentenceTerm}” instead.`,
          {
            index: indexOfTerm, // padding of index
          }
        );
        report(node, ruleError);
      });
    },
  };
}
