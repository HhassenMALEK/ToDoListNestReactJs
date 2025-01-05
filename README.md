# ToDoListNestReactJs
Ce projet implémente une **API de gestion des tâches** en utilisant **NestJS** pour le backend et **React** pour le frontend. L'API permet de gérer des tâches (création, lecture, mise à jour et suppression), et le frontend offre une interface utilisateur permettant de manipuler ces tâches.

-**Install les dépendances**: yarn install<br>
-**Pour démarrer** : yarn start:dev pour le backend,  yarn dev pour le frontend 

### Fonctionnalités

- **Backend (NestJS)** : API REST pour gérer les tâches dans une base de données.
- **Frontend (React)** : Interface utilisateur permettant d'interagir avec l'API.

## Architecture

### Backend (NestJS)
-**pourDma

- **TaskController** : Gère les routes HTTP pour interagir avec les tâches (GET, POST, PATCH, DELETE).
- **SaveTaskUseCase** : Cas d'utilisation pour gérer la logique de création et mise à jour des tâches.
- **TaskRepository** : Interagit avec la base de données via Prisma pour enregistrer, mettre à jour, supprimer ou récupérer des tâches.
- 
- **Le backend expose les points suivants** :
1. **GET /tasks** : Récupérer toutes les tâches.
2. **POST /tasks** : Créer une nouvelle tâche.
3. **PATCH /tasks/:id** : Mettre à jour une tâche existante.
4. **DELETE /tasks/:id** : Supprimer une tâche.


### Frontend (React)

L'interface utilisateur permet de :
1. **Afficher la liste des tâches**.
2. **Créer une nouvelle tâche**.
3. **Modifier une tâche existante** (mise à jour).
4. **Supprimer une tâche**.

### Décisions de Conception

- **Separation des préoccupations** : Le backend suit une architecture modulaire (Controller, UseCases, Repository), et le frontend utilise une approche fonctionnelle pour gérer l'état des tâches.
- **Gestion des erreurs** : Des messages d'erreur sont affichés en cas d'échec des appels API (création, mise à jour, suppression).
- **Gestion de l'état du bouton** : Le bouton de mise à jour est désactivé si le nom de la tâche n'a pas changé.

## Backend (NestJS)

L
### Difficulté rencontrée et apprentissage
Lors de la mise en place de la base de données MySQL, j'ai rencontré quelques difficultés pour la faire fonctionner correctement. Après plusieurs tentatives et recherches, j'ai décidé d'utiliser Docker pour isoler et gérer l'environnement de la base de données. Cette approche n'a pas été simple au début, mais grâce à la documentation officielle et à diverses ressources en ligne, j'ai réussi à configurer et à faire fonctionner MySQL à travers Docker.

Cette expérience m'a permis non seulement de résoudre le problème, mais aussi d'apprendre à utiliser Docker plus efficacement pour gérer des environnements de développement et des bases de données de manière isolée.
