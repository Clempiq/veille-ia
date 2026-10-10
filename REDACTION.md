# Règles de rédaction du Fil IA

Ce fichier fait autorité pour la tâche quotidienne qui publie une édition. Il est relu à chaque exécution.

## Format d'une édition

Un fichier par jour : `editions/AAAA-MM-JJ.json` (date du jour de publication, heure de Paris).

```json
{
  "date": "2026-10-10",
  "window": "8 au 9 octobre 2026",
  "calm": false,
  "intro": "2 à 4 phrases qui donnent la couleur de la fenêtre.",
  "items": [
    {
      "angle": "outils | dev | creation",
      "title": "Un titre qui dit l'information, pas juste le nom du produit",
      "summary": "3 à 5 phrases, 900 caractères maximum.",
      "why": "Une phrase : pourquoi ça compte pour un dev, un PO ou un créateur.",
      "sources": [{ "name": "Nom du média", "url": "https://..." }]
    }
  ]
}
```

`calm: true` signale une journée sans actu fraîche : l'édition est publiée quand même, avec une intro qui le dit.

## Les trois angles

- `outils` : nouveaux outils IA, apps, plateformes, modèles.
- `dev` : IA pour le développement, le product management et le no-code.
- `creation` : IA pour la création de contenu, TikTok et YouTube.

## Règles éditoriales

1. **Fraîcheur avant volume.** Seules les actus des dernières 24 à 48 heures. Pas de nombre minimum. 3 à 10 entrées est la norme.
2. **Pas de redite.** Avant de chercher, relire les éditions des 7 derniers jours dans `editions/`. Un sujet déjà publié ne revient que pour un développement réellement nouveau, et le titre commence alors par « Suite : ».
3. **Nos mots.** Le site est public. Les résumés sont entièrement réécrits, jamais copiés ni calqués sur la structure d'un article. Aucune citation de plus de 15 mots, une seule par source au maximum, et de préférence aucune.
4. **Des sources réelles.** Chaque URL vient d'un résultat de recherche obtenu dans la session. Jamais d'URL reconstruite de mémoire, jamais de lien de redirection (google.com/url). 1 à 3 sources par entrée.
5. **Les réserves.** Si un chiffre vient de l'éditeur seul, si un produit vient de sortir sans test indépendant, si l'accès est limité : le dire en une phrase.
6. **Public large.** On écrit pour des inconnus : pas de « tu », pas de référence à une personne en particulier. Vouvoiement ou tournures neutres.
7. **Style.** Français simple et direct. Jamais de tiret cadratin. Pas de formules creuses (« révolutionnaire », « game changer », « dans un monde où »).
8. **Hors sujet.** Levées de fonds sans produit, nominations, rumeurs non sourcées, résultats financiers.

## Contrôle

`npm run check` vérifie le format, la longueur des résumés, les sources, l'absence de tiret cadratin et de lien de redirection. `npm run build` lance ce contrôle puis construit le site. Un build en échec n'est jamais poussé.
