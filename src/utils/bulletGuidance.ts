const ACTION_VERBS = new Set([
  'built', 'developed', 'designed', 'implemented', 'led', 'improved',
  'created', 'optimized', 'automated',
]);

/** True if text contains a number or number-like pattern. */
function hasNumber(text: string): boolean {
  if (!text || !text.trim()) return false;
  return (
    /\d+/.test(text) ||
    /%\s*/.test(text) ||
    /\d+k\b/i.test(text) ||
    /\d+M\b/i.test(text) ||
    /\d+x\b/i.test(text)
  );
}

/** First word of a trimmed line (lowercase). */
function firstWord(line: string): string {
  const t = line.trim();
  const m = t.match(/^\s*(\w+)/);
  return m ? m[1].toLowerCase() : '';
}

export type BulletGuidance = {
  needsActionVerb: boolean;
  needsNumber: boolean;
};

/**
 * For a details string (bullets = lines), returns whether to show
 * action-verb and number suggestions. Does not block input.
 */
export function getBulletGuidance(details: string | undefined): BulletGuidance {
  const text = (details ?? '').trim();
  if (!text) return { needsActionVerb: false, needsNumber: false };

  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return { needsActionVerb: false, needsNumber: false };

  const anyStartsWithVerb = lines.some((line) => ACTION_VERBS.has(firstWord(line)));
  const anyHasNumber = lines.some((line) => hasNumber(line));

  return {
    needsActionVerb: !anyStartsWithVerb,
    needsNumber: !anyHasNumber,
  };
}
