Projet Clean Code :

Pour démarrer l'application côté back nous avons mis en place une base de données avec PostgreSql avec un docker compose :

1. docker compose up -d

2. npm run start dans le dossier /server pour démarrer le serveur node sur le port 5000

Pour démarrer l'application côté front nous avons mis en place une petite application avec React :

1.  npm run start pour démarrer l'application sur le port 3000

Pour lancer les tests côté back se mettre dans le dossier /server :

1. npm test

## Architecture de l'Application Leitner - README

### Responsabilités des Briques Techniques :

1. **Interface Utilisateur (UI) :**
   - Responsabilités :
     - Afficher l'interface utilisateur pour permettre aux utilisateurs de créer, gérer et interagir avec les fiches d'apprentissage.
     - Collecter les actions de l'utilisateur et les transmettre à la couche d'application.
   - Interactions :
     - Reçoit les requêtes de l'utilisateur pour créer, éditer, ouvrir, et répondre aux fiches.
     - Affiche les résultats des questionnaires et les notifications.

2. **Application :**
   - Responsabilités :
     - Gérer la logique métier de l'application en suivant les principes du DDD.
     - Orchestrer les interactions entre les différents domaines de l'application.
   - Interactions :
     - Reçoit les requêtes de l'interface utilisateur et les traite en conséquence.
     - Utilise les services de gestion des utilisateurs, des fiches, des questionnaires, des tags, et des notifications pour effectuer les opérations demandées.

3. **Adaptateurs Entrées/Sorties :**
   - Responsabilités :
     - Servir d'interface entre les composants internes de l'application et les interfaces utilisateur ou les services externes.
     - Adapter les données selon les formats requis par les différentes couches.
   - Interactions :
     - Communique avec la couche d'application pour récupérer et fournir les données nécessaires aux interfaces utilisateur.
     - Gère les interactions avec les services externes tels que la gestion des utilisateurs (authentification), le stockage des données, etc.

### Interactions entre les Briques Techniques :

1. L'Interface Utilisateur envoie des requêtes d'actions à l'Application, telles que la création de nouvelles fiches, la gestion des tags, le déclenchement des questionnaires, etc.

2. L'Application traite les requêtes reçues de l'Interface Utilisateur en utilisant les services appropriés et en effectuant les opérations nécessaires sur les données.

3. L'Application interagit avec les Repositories (fiches, utilisateurs, tags, etc.) à travers les Adaptateurs Entrées/Sorties pour accéder et manipuler les données nécessaires.

4. L'Adaptateur Entrées/Sorties communique avec les interfaces utilisateur pour afficher les résultats des opérations effectuées par l'Application et collecter les actions de l'utilisateur.

5. L'Adaptateur Entrées/Sorties gère également les interactions avec les services externes, tels que la notification pour le déclenchement des questionnaires à l'heure spécifiée par l'utilisateur, et assure la cohérence des données échangées.

Cette architecture permet une séparation claire des responsabilités et facilite la maintenance, l'évolutivité et le test de l'application. Les interactions entre les différentes briques techniques sont définies de manière à assurer un flux de données cohérent et une expérience utilisateur fluide.



