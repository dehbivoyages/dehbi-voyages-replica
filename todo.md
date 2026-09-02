# Project TODO

- [x] Restaurer la version stable du site Dehbi Voyages avant personnalisation de l’en-tête
- [x] Préparer quatre visuels de mosquées de Tanger pour l’en-tête
- [x] Synchroniser l’heure affichée avec le fuseau `Africa/Casablanca`
- [x] Afficher la date grégorienne synchronisée dans l’horloge
- [x] Ajouter la date hégirienne synchronisée dans l’horloge
- [x] Supprimer l’indication « −1 h » de l’horloge
- [x] Remplacer la rotation automatique de six heures par quatre créneaux de trois heures
- [x] Intégrer les scènes Mohammed V, port de Tanger, Rmilat et mosquée saoudienne
- [x] Vérifier les quatre scènes manuellement dans l’interface et contrôler les transitions
- [x] Exécuter les tests Vitest du projet
- [x] Enregistrer le point de contrôle final de cette version
- [x] Présenter l’URL de prévisualisation et rappeler l’action Publier dans l’interface

## Notes de mise en œuvre

- Le créneau automatique est calculé à partir de l’heure locale de Tanger avec `Math.floor(heure / 3) % 4`.
- Les dates utilisent `Intl.DateTimeFormat` avec `Africa/Casablanca` et `islamic-umalqura` pour conserver une seule source temporelle côté navigateur.
- Les scènes restent préchargées et utilisent le fondu professionnel existant pour éviter les changements brusques.

## À valider avant publication

- L’image de référence publique de la mosquée saoudienne doit être confirmée par le propriétaire avant une publication commerciale définitive si son autorisation d’usage n’est pas déjà acquise.
- La scène Rmilat utilise actuellement le visuel local disponible du secteur Mesnana/Rmilat ; une photo HD validée par l’agence peut remplacer cet asset sans modifier la logique de rotation.


- [x] Valider dans l’interface chacune des quatre scènes du hero avec les boutons Mohammed V, Port de Tanger, Rmilat et Mosquée saoudienne
- [x] Contrôler manuellement le fondu entre les scènes, l’absence de flash et l’état de chargement sur ordinateur et mobile
- [x] Corriger le nettoyage du voile de fondu afin qu’il disparaisse après 2,8 secondes
- [x] Vérifier sur ordinateur et mobile les transitions entre les quatre scènes en observant le fondu complet, l’absence de flash et l’indicateur de chargement
- [x] Capturer une preuve mobile par interaction avec les boutons du hero et confirmation du chargement et du fondu
- [x] Vérifier visuellement sur ordinateur les quatre transitions du hero en observant le fondu complet, l’absence de flash et l’indicateur de chargement
- [x] Vérifier visuellement sur mobile les quatre transitions du hero avec interactions réelles et conserver des captures par scène
- [x] Observer en direct sur desktop les quatre transitions avec captures intermédiaires et noter le fondu, l’absence de flash et l’indicateur de chargement
- [x] Observer en direct sur mobile les quatre transitions avec captures intermédiaires et noter le fondu, l’absence de flash et l’indicateur de chargement
- [x] Produire et examiner une séquence vidéo continue des quatre transitions desktop pour confirmer le mouvement complet et l’absence de flash
- [x] Produire et examiner une séquence vidéo continue des quatre transitions mobile pour confirmer le mouvement complet et l’absence de flash

- [x] Concevoir une notification Dehbi Voyages personnalisée, discrète et fermable
- [x] Déclencher la notification avec un message d’agence et un appel à l’action utile
- [x] Respecter les thèmes clair et sombre, la responsivité et l’accessibilité clavier
- [x] Ajouter les tests Vitest du comportement déterministe de la notification
- [x] Vérifier visuellement la notification puis enregistrer un checkpoint
- [x] Enregistrer un checkpoint après la validation finale de la notification personnalisée
- [x] Présenter l’URL de prévisualisation mise à jour et rappeler l’action Publier dans l’interface
- [x] Encoder et examiner une vidéo mobile focalisée sur le hero à partir des captures intermédiaires
- [x] Confirmer dans cette preuve les changements Mohammed V, Port de Tanger, Rmilat et Mosquée saoudienne sans flash

- [x] Vérifier que l’heure, la date grégorienne et la date hégirienne proviennent du même instant à Tanger
- [x] Confirmer que les deux dates sont placées dans le tableau de l’heure et que « −1 h » est absent
- [x] Tester l’affichage synchronisé sur desktop et mobile puis enregistrer la correction
- [ ] Enregistrer un nouveau checkpoint après la correction finale de l’horloge synchronisée et des dates
- [ ] Présenter l’URL et la pièce jointe du checkpoint correspondant à la correction d’horloge
