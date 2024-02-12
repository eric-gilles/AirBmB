# HAI806I - Projet MEAN 2023-2024 (facultatif / coeff. 15%)

**Pierre Pompidor**

Création d’une application web de location de logements (type AirBnB). L’application web devra être créée sous une architecture MEAN (MongoDB, Express, Angular et Node.js).

Modélisation et création d’une base de données gérée par MongoDB :

La base comportera au moins les trois collections suivantes :

- **Utilisateurs** : mail, prénom, nom, téléphone
- **Biens** : idBien, mailProprio (*), commune, rue, cp, nbCouchages, nbChambres, distance, prix
- **Locations** : idLocation, idBien (*), mailLoueur (*), dateDébut (**), dateFin (**), avis

(*) "clef étrangère" (**) Les dates seront exprimées sous la forme de nombres à 8 chiffres de type AAAAMMJJ.

Les documents des collections Utilisateurs et Biens peuvent être directement créés dans la base.

L’internaute pourra :

- Faire une recherche multicritères (de 0 à 7) suivant :
  - la date de début de location
  - la date de fin de location
  - la commune
  - un prix max
  - un nombre de chambres min
  - un nombre de couchages min
  - une distance max au centre ville (exprimée en mètres)

- Visualiser les biens à louer :
  Les biens à louer disponibles doivent s’afficher avec leurs caractéristiques et l’avis associé (moyenne des notes données par les loueurs). La sélection d’un bien entraîne une création d’un document dans la table Location.

  Dans un second temps, un avis (note) peut être laissé.

- En bonus :
  - Les utilisateurs pourraient s’authentifier
  - Les biens pourraient être géolocalisés sur une carte
  - Les avis pourraient être commentés

**Modalités de rendu :**

Le travail devra être préférentiellement effectué en binômes.

Le rendu se fera par une démonstration sur machine et un dépôt via le Moodle de HAI806I (le dépôt n’est pas encore ouvert). Il constituera en une archive (zip ou tar) qui contiendra :

- un mini-rapport comportant :
  - les noms des membres du groupe
  - le script de création des collections/documents de la base MongoDB initiale
  - la liste des services web (méthodes et routes)
  - la liste des composants Angular
  - les différentes captures d’écran de votre application
  - toute information que vous jugerez utile de me donner

- vos codes (en ce qui concerne Angular, le contenu du dossier src)

La mise en ligne de votre application web n’est pas obligatoire (de même qu’un lien sur un dépôt GIT) même si cela serait intéressant.
