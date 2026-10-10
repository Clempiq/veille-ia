const modules = import.meta.glob("/editions/*.json", { eager: true });

export const ANGLES = {
  outils: { label: "Nouveaux outils", long: "Nouveaux outils IA, apps et plateformes" },
  dev: { label: "Dev, produit, no-code", long: "IA pour le développement, le product management et le no-code" },
  creation: { label: "Création de contenu", long: "IA pour la création de contenu TikTok et YouTube" },
};

export const editions = Object.values(modules)
  .map((m) => m.default ?? m)
  .sort((a, b) => b.date.localeCompare(a.date));

const fmtLong = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const fmtShort = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", timeZone: "UTC" });
const fmtMonth = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" });

const d = (iso) => new Date(`${iso}T00:00:00Z`);
export const longDate = (iso) => fmtLong.format(d(iso));
export const shortDate = (iso) => fmtShort.format(d(iso));
export const monthLabel = (iso) => fmtMonth.format(d(iso));
export const toDate = d;

export function siblings(date) {
  const i = editions.findIndex((e) => e.date === date);
  return { newer: editions[i - 1] ?? null, older: editions[i + 1] ?? null };
}
