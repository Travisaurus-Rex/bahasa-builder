export const affixColorsDark: Record<string, string> = {
  none: "#4A4A6A",
  "ber-": "#00B4D8",
  "me-": "#9D4EDD",
  "meng-": "#9D4EDD",
  "meny-": "#9D4EDD",
  "mem-": "#9D4EDD",
  "men-": "#9D4EDD",
  "me-...-i": "#9D4EDD",
  "me-...-kan": "#9D4EDD",
  "di-": "#2DC653",
  "di-...-i": "#2DC653",
  "di-...-kan": "#2DC653",
  "per-...-an": "#F4A261",
  "ke-...-an": "#F4A261",
  "peng-...-an": "#E63946",
  "pe-...-an": "#E63946",
  "ter-": "#FFD166",
};

export const affixColorsLight: Record<string, string> = {
  none: "#2E2E4A",
  "ber-": "#0077A8",
  "me-": "#6A1FA8",
  "meng-": "#6A1FA8",
  "meny-": "#6A1FA8",
  "mem-": "#6A1FA8",
  "men-": "#6A1FA8",
  "me-...-i": "#6A1FA8",
  "me-...-kan": "#6A1FA8",
  "di-": "#1A8C3A",
  "di-...-i": "#1A8C3A",
  "di-...-kan": "#1A8C3A",
  "per-...-an": "#C4621A",
  "ke-...-an": "#C4621A",
  "peng-...-an": "#A81A24",
  "pe-...-an": "#A81A24",
  "ter-": "#A87C00",
};

export function getAffixColor(affix: string, isDark: boolean): string {
  const colors = isDark ? affixColorsDark : affixColorsLight;
  const normalized = affix.toLowerCase();
  return colors[normalized] ?? (isDark ? "#4A4A6A" : "#2E2E4A");
}
