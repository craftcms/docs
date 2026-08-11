export function applyTabindexIfOverflowing(el) {
  if (!el) return;
  const isOverflowing = el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;

  if (isOverflowing) {
    el.setAttribute('tabindex', '0');
  }
}
