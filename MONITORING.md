# 📊 Surveillance Automatique - Dehbi Voyages

## 🎯 Objectif
Vérifier quotidiennement que tous les programmes du site s'affichent correctement, même après la date d'expiration.

## 📋 Programmes Surveillés

### Voyages Organisés (5)
1. ✅ Arabie Saoudite
2. ✅ Chine Éternelle
3. ✅ Thaïlande Jungle & Plages De Rêve
4. ✅ Thaïlande Rêvée
5. ✅ Istanbul Mai 2026

### Voyages Spirituels (3)
6. ✅ Omra Complète
7. ✅ Visite Médinas Sacrées
8. ✅ Retraite Spirituelle

### Services Premium (1)
9. ✅ Circuits Touristiques

**Total : 9 programmes**

## ⏰ Configuration

### Fréquence
- **Type** : Quotidienne
- **Heure** : 02:00 AM (UTC)
- **Jours** : Tous les jours

### Vérifications
- ✅ Disponibilité des vidéos
- ✅ Accessibilité des URLs
- ✅ Codes de réponse HTTP
- ✅ Enregistrement des logs

## 📝 Logs

Les résultats de surveillance sont enregistrés dans `monitoring-log.txt` :

```
[2026-06-02T02:00:00.000Z] ============================================================
[2026-06-02T02:00:00.000Z] SURVEILLANCE AUTOMATIQUE - DÉBUT
[2026-06-02T02:00:00.000Z] Total de programmes à vérifier: 9
[2026-06-02T02:00:00.000Z] ============================================================
[2026-06-02T02:00:01.000Z] ✅ Voyage Organisé - Arabie Saoudite - OK (200)
[2026-06-02T02:00:01.500Z] ✅ Voyage Organisé - Chine Éternelle - OK (200)
...
[2026-06-02T02:00:10.000Z] ============================================================
[2026-06-02T02:00:10.000Z] RÉSUMÉ: 9/9 programmes OK
[2026-06-02T02:00:10.000Z] ============================================================
```

## 🚀 Démarrage

### Option 1 : Configuration automatique
```bash
./setup-monitoring.sh
```

### Option 2 : Configuration manuelle
```bash
manus-config schedule create \
  --name "Surveillance Programmes Dehbi Voyages" \
  --description "Vérification quotidienne de l'affichage des programmes" \
  --cron "0 2 * * *" \
  --run-as-new
```

## 📊 Consultation

### Voir toutes les tâches planifiées
```bash
manus-config schedule list
```

### Voir les logs de surveillance
```bash
tail -f monitoring-log.txt
```

### Voir les 50 dernières lignes
```bash
tail -50 monitoring-log.txt
```

### Voir les erreurs uniquement
```bash
grep "❌\|⚠️" monitoring-log.txt
```

## 🔧 Maintenance

### Exécuter une vérification manuelle
```bash
node monitoring-check.js
```

### Arrêter la surveillance
```bash
manus-config schedule pause <task-id>
```

### Reprendre la surveillance
```bash
manus-config schedule resume <task-id>
```

### Supprimer la tâche
```bash
manus-config schedule delete <task-id>
```

## 📧 Alertes

En cas d'erreur, vérifiez :
1. La disponibilité du serveur
2. L'accessibilité des URLs de stockage
3. Les logs pour plus de détails

## ✅ Statut

| Élément | Statut |
|---------|--------|
| Surveillance | ✅ Activée |
| Fréquence | ✅ Quotidienne |
| Programmes | ✅ 9 surveillés |
| Logs | ✅ Enregistrés |
| Alertes | ✅ Configurées |

---

**Dernière mise à jour** : 2026-06-02  
**Version** : 1.0
