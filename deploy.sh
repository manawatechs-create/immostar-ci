#!/bin/bash
echo "🚀 Déploiement ImmoStar..."
git add .
git commit -m "Update: $(date '+%Y-%m-%d %H:%M')"
git push
echo "✅ Code poussé sur GitHub"
echo "⏳ Netlify déploie automatiquement..."
echo "🔗 https://immostar-ci.netlify.app"
