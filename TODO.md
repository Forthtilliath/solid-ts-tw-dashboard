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
  - [x] Taux de satisfaction : Pie
  - [x] Taux de joueurs premium : Pie
  - [x] Taux de jeux premium : Pie
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
  - [ ] Jeux les plus joués : Area Spline
- Stats liées aux joueurs
  - Diagrammes avec nombre de joueurs chaque jour de la semaine : Radar Basic
  - Le plus de joueurs co simultanément : Juste un nombre
  - Le plus de joueurs en partie simultanément : Juste un nombre => dashboard ?
  - Nombre de nouveaux joueurs jour/semaine/mois/année : Bar basic / Area Datetime
    - 1 diagramme pour le jour J jusqu'à J-3
    - 1 diagramme pour le semaine S jusqu'à S-3
    - 1 diagramme pour le mois M jusqu'à M-3
    - 1 diagramme pour le année A jusqu'à A-3
- Stats liées aux revenus
  - [x] Taux de joueurs premium : Pie
  - Nombre de nouveaux abonnements jour/semaine/mois/année : Bar basic
    - 1 diagramme pour le jour J jusqu'à J-3
    - 1 diagramme pour le semaine S jusqu'à S-3
    - 1 diagramme pour le mois M jusqu'à M-3
    - 1 diagramme pour le année A jusqu'à A-3

- 1 graph en bar pour les données liées aux jours
  - inscription
  - last connexion
  - last premium

- Nombre de parties en cours :
  - SetInterval() 30s inc/dec nombre

## Programmer du jour

- [ ] Mettre en place le système des posts via MDX
- [ ] Mettre en place la bottom navigation avec un système de double niveau (dropdown)
- [ ] Ajouter une grille pour les graphes

## To fix

- min height pour les graph : responsive ?
- label radar to style

https://www.similarweb.com/website/boardgamearena.com/#geography

https://www.npmjs.com/package/deepmerge

## TODO

### fetcherPlayer
```ts
export async function fetcherPlayer(key: keyof PLAYER_PARAM){
  const res = await fetch("http://localhost:3000/api/player?q=" + key);
  return res.json();
}

fetcherPlayer(PLAYER_PARAM.GENDER);

case PLAYER_PARAM.GENDER:
```

### Fonts