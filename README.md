# Le Fil IA

Veille IA quotidienne en français, publiée automatiquement chaque matin.

- **Site** : https://le-fil-ia.vercel.app
- **Contenu** : un fichier JSON par jour dans `editions/`, règles dans `REDACTION.md`
- **Stack** : Astro (statique), déployé par Vercel à chaque push sur `main`
- **Publication** : une tâche planifiée Claude fait la veille, écrit l'édition du jour, lance `npm run build` (contrôle qualité compris) et pousse sur `main`

```bash
npm install
npm run dev     # site en local
npm run build   # contrôle qualité + build
```
