export const affixColorsDark: Record<string, string> = {
  none: "#4A4A6A",
  "ber-": "#00B4D8",
  "me-": "#9D4EDD",
  "di-": "#2DC653",
  "ter-": "#FFD166",
  "ke-...-an": "#F4A261",
  "pe-...-an": "#E63946",
  "per-...-an": "#E63946",
  "se-": "#00B4D8",
  "me-...-kan": "#9D4EDD",
  "me-...-i": "#9D4EDD",
  "di-...-kan": "#2DC653",
  "di-...-i": "#2DC653",
  "memper-": "#9D4EDD",
  "ter-...-kan": "#FFD166",
};

export const affixColorsLight: Record<string, string> = {
  none: "#2E2E4A",
  "ber-": "#0077A8",
  "me-": "#6A1FA8",
  "di-": "#1A8C3A",
  "ter-": "#A87C00",
  "ke-...-an": "#C4621A",
  "pe-...-an": "#A81A24",
  "per-...-an": "#A81A24",
  "se-": "#0077A8",
  "me-...-kan": "#6A1FA8",
  "me-...-i": "#6A1FA8",
  "di-...-kan": "#1A8C3A",
  "di-...-i": "#1A8C3A",
  "memper-": "#6A1FA8",
  "ter-...-kan": "#A87C00",
};

export function getAffixColor(affix: string, isDark: boolean): string {
  const colors = affixColorsDark;
  const normalized = affix.toLowerCase();
  return colors[normalized] ?? (isDark ? "#4A4A6A" : "#2E2E4A");
}
