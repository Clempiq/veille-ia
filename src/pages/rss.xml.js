import rss from "@astrojs/rss";
import { editions, longDate, toDate } from "../lib/editions.js";

export function GET(context) {
  return rss({
    title: "Le Fil IA",
    description: "La veille IA du jour, en français : nouveaux outils, dev et produit, création de contenu.",
    site: context.site,
    customData: "<language>fr-fr</language>",
    items: editions.slice(0, 30).map((e) => ({
      title: `Veille IA du ${longDate(e.date)}`,
      pubDate: toDate(e.date),
      link: `/edition/${e.date}`,
      description: e.intro,
      content: e.items.map((i) => `<h3>${i.title}</h3><p>${i.summary}</p><p><strong>Pourquoi ça compte.</strong> ${i.why}</p><p>${i.sources.map((s) => `<a href="${s.url}">${s.name}</a>`).join(" · ")}</p>`).join(""),
    })),
  });
}
