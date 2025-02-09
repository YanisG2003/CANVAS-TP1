# CANVAS-TP1

# Jeu de Plateforme (avec Obstacle Mobile)

## Description
Ce projet implémente un jeu de plateforme où un personnage (OURS) doit naviguer à travers des obstacles fixes et mobiles tout en atteignant la sortie à la fin de chaque niveau (POT DE MIEL). À chaque niveau, la difficulté augmente avec des obstacles mobiles qui bougent et peuvent potentiellement percuter le joueur. Le but est de faire avancer l'ours jusqu'à la sortie sans entrer en collision avec les obstacles.

Le jeu présente 8 niveaux avec des configurations d'obstacles différents. Chaque niveau offre une nouvelle difficulté et des obstacles supplémentaires. Le joueur avance d'un niveau à l'autre jusqu'à la fin du jeu.

## Fonctionnalités

- **Déplacement du personnage** : Utilisation des touches fléchées pour déplacer l'ours à travers l'écran.
- **Obstacles fixes** : Des obstacles sont placés dans le niveau, et le joueur doit les éviter.
- **Obstacles mobiles** : Certains obstacles se déplacent sur l'écran, changeant de direction en fonction de leur position.
- **Changement de niveau** : Lorsqu'un joueur atteint la sortie, il passe au niveau suivant. Si le joueur atteint le dernier niveau, il gagne la partie.
- **Collision avec obstacles** : Le joueur peut se faire "repousser" par un obstacle en cas de collision.
- **Message de niveau** : Un message de niveau apparaît à chaque changement de niveau.

## Comment jouer

1. **Démarrage du jeu** :
   - Une fois le fichier `index.html` ouvert dans le navigateur, le jeu démarre automatiquement.
   - Le joueur contrôle le personnage avec les touches fléchées du clavier.

2. **But du jeu** :
   - Le but est de faire naviguer le monstre jusqu'à la sortie du niveau tout en évitant les obstacles.
   - Les niveaux augmentent en difficulté à chaque fois que le joueur atteint la sortie.

3. **Contrôles** :
   - **Flèche haut** : Déplace le monstre vers le haut.
   - **Flèche bas** : Déplace le monstre vers le bas.
   - **Flèche gauche** : Déplace le monstre vers la gauche.
   - **Flèche droite** : Déplace le monstre vers la droite.

4. **Gestion des niveaux** :
   - À chaque fois que le joueur atteint la sortie d'un niveau, un message indique le passage au niveau suivant.
   - Si le joueur termine tous les niveaux disponibles, il gagne la partie et un message de victoire s'affiche.

5. **Obstacles mobiles** :
   - Les obstacles mobiles bougent selon un schéma pré-défini et doivent être évités par le joueur.
   - Les obstacles fixes sont des éléments statiques du niveau, mais les obstacles mobiles peuvent changer de direction et rendre la navigation plus difficile.

6. **Fin de partie** :
   - Si le joueur entre en collision avec un obstacle, il est renvoyé au point de départ du niveau en cours.
   - La partie est terminée lorsque le joueur atteint la dernière sortie du dernier niveau.

## Aide au développement

### Structure du code

1. **`index.html`** : Ce fichier contient la structure HTML de base ainsi que les liens vers les ressources CSS et JavaScript.
2. **`game.js`** : Ce fichier contient la logique principale du jeu, y compris la gestion des mouvements du joueur, les interactions avec les obstacles et la progression des niveaux.
3. **`levels.js`** : Ce fichier configure les différents niveaux du jeu. Il définit les positions de départ, les obstacles et les sorties pour chaque niveau.
4. **`image/`** : Ce dossier contient toutes les images utilisées dans le jeu, comme le personnage et les obstacles.

### Fonctionnement du moteur de jeu

Le moteur de jeu repose sur la boucle principale qui se répète continuellement pour mettre à jour l'état du jeu, dessiner l'écran, et détecter les interactions. Cette boucle est gérée à l'aide de `requestAnimationFrame()` pour garantir des animations fluides.

1. **Mouvement du joueur** : Le monstre se déplace en fonction des entrées clavier. La vitesse de déplacement et les collisions sont gérées dans le fichier `game.js`.
2. **Gestion des niveaux** : Le fichier `levels.js` contient une fonction qui charge la configuration des niveaux et gère les obstacles à chaque niveau.
3. **Interaction avec les obstacles** : Le système de gestion des obstacles vérifie si le joueur entre en contact avec un obstacle fixe ou mobile. En cas de collision, le joueur est renvoyé à la position initiale du niveau.

## Auteurs

- **Yanis Gourar** : Développement du jeu et de la logique de jeu.
