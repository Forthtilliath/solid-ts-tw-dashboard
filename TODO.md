# Dashboard => Jeux de société

https://apexcharts.com/javascript-chart-demos/


## Layout

- Mobile : Navigation en bas
- PC : navigation en sidebar
- Pas de bouton pour ouvrir/fermer

#### Mobile

- Header
- Content : flex 1 => overflow
- Navigation (fixed via flex 1)
  - Sous navigation
    - Dashboard
    - Gestions
      - News
      - Game
      - Player
    - Stats
      - Game
      - Player 
      - Income

#### PC

- Header
- Main
  - Sidebar
  - Content

=> Grid pour faire ca simplement

## Elements du menu

- Dashboard
  - Taux de satisfaction
  - Taux de joueurs premium
  - Taux de jeux premium
- Gestions des news
  - MDX avec comments via prisma ?
- Liste des jeux
  - Administration du jeu : Nom, description, règles : [exemple](https://boardgamearena.com/gamepanel?game=innovation)
  - Possibilité d'activer ou non un jeu
  - Possibilité de le rendre premium
- Liste des joueurs
  - Administration du joueur : modifier le nom, profil, etc
  - Possibilité de le bannir ou non
  - Possibilité de le rendre premium
- Stats liées aux jeux
  - Jeux les plus joués
  - Type de jeux favoris
- Stats liées aux joueurs
  - Diagrammes avec nombre de joueurs chaque jour
  - Le plus de joueurs co simultanément 
  - Le plus de joueurs en partie simultanément
  - Nombre de nouveaux joueurs
- Stats liées aux revenus
  - Taux de joueurs premium
  - Nombre de nouveaux abonnements jour/semaine/mois/année