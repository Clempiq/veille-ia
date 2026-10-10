// Contrôle qualité des éditions, lancé avant chaque build.
// Un build qui échoue ici n'est pas déployé par Vercel : le site en ligne reste intact.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIR = new URL("../editions/", import.meta.url).pathname;
const ANGLES = ["outils", "dev", "creation"];
const errors = [];
const warnings = [];
const seenTitles = new Map();

const files = readdirSync(DIR).filter((f) => f.endsWith(".json")).sort();
if (files.length === 0) errors.push("Aucune édition dans editions/.");

for (const file of files) {
  const where = `editions/${file}`;
  let ed;
  try {
    ed = JSON.parse(readFileSync(join(DIR, file), "utf8"));
  } catch (e) {
    errors.push(`${where} : JSON invalide (${e.message})`);
    continue;
  }
  const raw = readFileSync(join(DIR, file), "utf8");
  if (raw.includes("—")) errors.push(`${where} : tiret cadratin interdit`);
  if (raw.includes("google.com/url?")) errors.push(`${where} : lien de redirection Google, mettre l'URL directe`);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(ed.date || "")) errors.push(`${where} : champ date manquant ou mal formé`);
  if (file !== `${ed.date}.json`) errors.push(`${where} : le nom du fichier doit être ${ed.date}.json`);
  if (typeof ed.intro !== "string" || ed.intro.length < 40) errors.push(`${where} : intro manquante ou trop courte`);
  if (!Array.isArray(ed.items)) {
    errors.push(`${where} : items doit être une liste`);
    continue;
  }
  if (ed.items.length === 0 && !ed.calm) warnings.push(`${where} : aucune actu (mettre "calm": true si c'est voulu)`);

  ed.items.forEach((it, i) => {
    const w = `${where} item ${i + 1}`;
    if (!ANGLES.includes(it.angle)) errors.push(`${w} : angle doit être ${ANGLES.join(", ")}`);
    if (!it.title || it.title.length < 15 || it.title.length > 160) errors.push(`${w} : titre absent ou longueur hors 15-160`);
    if (!it.summary || it.summary.length < 120) errors.push(`${w} : résumé trop court`);
    if (it.summary && it.summary.length > 900) errors.push(`${w} : résumé trop long (${it.summary.length} > 900), raccourcir`);
    if (!it.why || it.why.length < 30) errors.push(`${w} : champ why ("pourquoi ça compte") manquant`);
    if (!Array.isArray(it.sources) || it.sources.length === 0) errors.push(`${w} : au moins une source`);
    (it.sources || []).forEach((s) => {
      if (!s.name || !/^https:\/\//.test(s.url || "")) errors.push(`${w} : source invalide (${JSON.stringify(s)})`);
    });
    const key = (it.title || "").toLowerCase();
    if (seenTitles.has(key)) errors.push(`${w} : titre identique à ${seenTitles.get(key)}`);
    seenTitles.set(key, w);
  });
}

warnings.forEach((m) => console.warn("Avertissement :", m));
if (errors.length) {
  errors.forEach((m) => console.error("Erreur :", m));
  console.error(`\nContrôle qualité échoué : ${errors.length} erreur(s).`);
  process.exit(1);
}
console.log(`Contrôle qualité réussi : ${files.length} édition(s).`);
