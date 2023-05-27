# Dashboard => Jeux de société

https://apexcharts.com/javascript-chart-demos/

## MDX 
https://stackblitz.com/edit/github-n9s1u9-lhahvl?file=src%2Froutes%2Findex.mdx,src%2Froutes%2Fnews%2Fa.mdx
https://blog.logrocket.com/create-next-js-mdx-blog/#writing-esm-mdx
https://blog.openreplay.com/build-a-mdx-powered-blog-with-contentlayer-and-next/
https://www.youtube.com/watch?v=hpSubvgSvxo
https://www.codemotion.com/magazine/frontend/how-to-create-an-mdx-blog-in-typescript-with-next-js/

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
  - Taux de satisfaction : Pie
  - Taux de joueurs premium : Pie
  - Taux de jeux premium : Pie
- Gestions des news
  - MDX avec comments via prisma ?
    - Like des players
- Liste des jeux
  - Administration du jeu : Nom, description, règles : [exemple](https://boardgamearena.com/gamepanel?game=innovation)
  - Possibilité d'activer ou non un jeu
  - Possibilité de le rendre premium
- Liste des joueurs
  - Administration du joueur : modifier le nom, profil, etc
  - Possibilité de le bannir ou non
  - Possibilité de le rendre premium
- Stats liées aux jeux
  - Jeux les plus joués : Area Spline
  - ~~Type de jeux favoris~~
- Stats liées aux joueurs
  - Diagrammes avec nombre de joueurs chaque jour de la semaine : Radar Basic
  - Le plus de joueurs co simultanément : Juste un nombre
  - Le plus de joueurs en partie simultanément : Juste un nombre
  - Nombre de nouveaux joueurs jour/semaine/mois/année : Bar basic / Area Datetime
    - 1 diagramme pour le jour J jusqu'à J-3
    - 1 diagramme pour le semaine S jusqu'à S-3
    - 1 diagramme pour le mois M jusqu'à M-3
    - 1 diagramme pour le année A jusqu'à A-3
- Stats liées aux revenus
  - Taux de joueurs premium : Pie
  - Nombre de nouveaux abonnements jour/semaine/mois/année : Bar basic
    - 1 diagramme pour le jour J jusqu'à J-3
    - 1 diagramme pour le semaine S jusqu'à S-3
    - 1 diagramme pour le mois M jusqu'à M-3
    - 1 diagramme pour le année A jusqu'à A-3


## Programmer du jour
- [ ] Mettre en place le système des posts via MDX
- [ ] Mettre en place la bottom navigation avec un système de double niveau (dropdown)
- [ ] Ajouter une grille pour les graphes
- [ ] 