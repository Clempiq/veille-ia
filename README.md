# Le Fil IA

> Une veille sur l'intelligence artificielle en français, préparée par un agent IA et cadrée par des règles éditoriales écrites à la main, publiée automatiquement.

**Site :** [le-fil-ia.vercel.app](https://le-fil-ia.vercel.app)

## Le problème

L'actualité de l'IA va trop vite : nouveaux outils, nouveaux modèles et annonces s'enchaînent, surtout en anglais. Suivre ce qui compte vraiment prend du temps, et beaucoup de newsletters noient l'essentiel dans le volume.

**Pour qui :** celles et ceux qui fabriquent (développeurs, product owners, makers no-code, créateurs de contenu) et veulent une sélection courte, sourcée et en français.

## Fonctionnalités clés

- **Éditions structurées** : une intro, puis des actus classées en trois angles (nouveaux outils, dev/produit/no-code, création de contenu), chacune avec un résumé, une phrase « pourquoi ça compte » et ses sources.
- **Archives** de toutes les éditions, une page par édition.
- **Flux RSS** et **plan du site** générés automatiquement.
- **Contrôle qualité au build** : le script `scripts/check-editions.mjs` valide chaque édition (format, longueurs, sources) et bloque la publication si une règle n'est pas respectée.
- **Publication autonome** : une tâche planifiée Claude fait la recherche, écrit l'édition au format JSON, lance le build et pousse sur `main`. Vercel déploie à chaque push.

## Stack

| Catégorie | Technologie |
|---|---|
| Site | Astro (génération statique), `@astrojs/rss`, `@astrojs/sitemap` |
| Contenu | Un fichier JSON par édition dans `editions/` |
| Règles éditoriales | [REDACTION.md](REDACTION.md), relu à chaque exécution |
| Automatisation | Tâche planifiée Claude dans le cloud |
| Déploiement | Vercel, à chaque push sur `main` |

## Lancer en local

```bash
npm install
npm run dev     # site en local
npm run check   # contrôle qualité des éditions seul
npm run build   # contrôle qualité + build
```

## Statut

✅ **En production.** Lancé en publication quotidienne en octobre 2026, passé en édition hebdomadaire (le dimanche) pour gagner en qualité et maîtriser le coût.

## Ce que j'ai appris

- **Cadrer un agent IA comme on cadre une équipe** : des règles écrites (fraîcheur, pas de redite, toujours une source, réserves signalées) plutôt que des consignes floues.
- **Mettre un garde-fou automatique** : le contrôle qualité au build empêche une édition mal formée d'être publiée.
- **Arbitrer coût et valeur** : passer du quotidien à l'hebdomadaire a réduit la consommation tout en améliorant le fond.
- **Être transparent** : la page « À propos » dit clairement que la veille est préparée par une IA.
