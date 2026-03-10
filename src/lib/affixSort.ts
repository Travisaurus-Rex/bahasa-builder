const affixOrder: Record<string, number> = {
  none: 0,
  "ber-": 1,
  "me-": 2,
  "me-...-kan": 3,
  "me-...-i": 4,
  "di-": 5,
  "di-...-kan": 6,
  "di-...-i": 7,
  "ter-": 8,
  "ter-...-kan": 9,
  "ke-...-an": 10,
  "pe-...-an": 11,
  "per-...-an": 12,
  "memper-": 13,
  "se-": 14,
};

export function sortForms<T extends { affix: string }>(forms: T[]): T[] {
  return [...forms].sort(
    (a, b) => (affixOrder[a.affix] ?? 99) - (affixOrder[b.affix] ?? 99),
  );
}
