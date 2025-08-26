export function getHeaderText(token) {
  // Get the full text of the token (including any children, if it had formatting), and do a crude entity conversion:
  let text = decodeEntities(token.content);

  // Does it look like there might be HTML (say, from an in-line Vue component)?
  if (text.includes('<')) {
    // Taken from `npm-strip-html` package!
    text = text.replace(/<[^>]+>([^<]+)?/g, '$1').trim();
  }

  return text;
}

export function decodeEntities(str) {
  const entityMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
  };
  const expr = new RegExp(Object.keys(entityMap).join('|'));

  return str.replace(expr, function(r) {
    return entityMap[r];
  });
}

export function renderPermalink(slug, opts, state, idx) {
  // Get text of current header:
  const headerText = getHeaderText(state.tokens[idx + 1]);

  const linkTokens = [
    // Opening anchor tag:
    Object.assign(new state.Token('link_open', 'a', 1), {
      attrs: [
        ['class', opts.permalinkClass],
        ['href', opts.permalinkHref(slug, state)],
        ['aria-label', `Permalink to “${headerText}”`],
        ...Object.entries(opts.permalinkAttrs(slug, state)),
      ],
    }),
    // Symbol
    Object.assign(new state.Token('html_block', '', 0), { content: opts.permalinkSymbol }),
    // Closing anchor tag:
    new state.Token('link_close', 'a', -1),
  ];

  // Place at the beginning of the heading tag:
  state.tokens[idx + 1].children.unshift(...linkTokens);
}
