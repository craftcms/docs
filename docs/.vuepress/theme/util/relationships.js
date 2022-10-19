import { isExternal, resolvePage } from "../util";

export default function resolveRelated($page, $site) {
  const related = $page.frontmatter.related;

  // Nothing defined? Normalize to an empty array:
  if (!related) {
    return [];
  }

  // Ok, there are related items—let's fill in some info about each:
  return related.map((r) => {
    const rp = resolvePage($site.pages, r.uri);

    return {
      label: r.label || rp.title,
      uri: rp.path,
      external: isExternal(rp.path),
      html: r.html,
    };
  });
}
