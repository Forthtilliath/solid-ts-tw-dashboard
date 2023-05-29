// prettier-ignore
/*
Array.from(document.querySelectorAll(".game_box_wrap")).map((element) => ({
  name: element.querySelector(".gamename")!.textContent.trim(),
  premium: element.querySelector(".premium_game") !== null,
  image: element.querySelector(".bga_lazyload").src,
  popularity: Number(element.querySelector(".game_popularity").textContent.trim()),
  mber(element.querySelector(".game_extContent.trim()),
}));
*/

import { faker } from '@faker-js/faker';
import { prisma } from "./db";
import { daysBetween, setYear } from "../methodes/date";
import { assertsIsDate } from "../methodes/asserts";
import { Prisma } from "@prisma/client";

export async function generateData({ users = 0, histories = 0 }) {
  await createUsers(users);
  await createGames();
  await createHistory(histories);
}

/**
 *
 */

function getPremiumInfos(from: Date, to: Date): DB.PremiumCreation[] {
  assertsIsDate(from);
  assertsIsDate(to);

  const isPremium = faker.datatype.boolean({ probability: 0.35 });
  if (!isPremium) return [];

  const subscriptionAt = faker.date.between({ from, to });
  const duration = faker.datatype.boolean({ probability: 0.3 }) ? 1 : 12;

  const subscriptionEndAt = new Date(subscriptionAt);
  subscriptionEndAt.setMonth(subscriptionEndAt.getMonth() + duration);

  const nextPremiumInfos =
    subscriptionEndAt <= to ? getPremiumInfos(subscriptionEndAt, to) : [];

  return [
    {
      subscriptionAt,
      duration,
      subscriptionEndAt,
    },
  ].concat(nextPremiumInfos);
}

function getPlayersDate() {
  const createdAt = faker.date.past({ years: 10 });
  const recent = faker.datatype.boolean({ probability: 0.7 });
  const recentDays = 15;

  const lastConnection =
    recent || daysBetween(createdAt, new Date()) >= recentDays
      ? faker.date.recent({ days: recentDays })
      : faker.date.between({ from: createdAt, to: Date.now() });

  return { createdAt, lastConnection };
}

// Génère des ages en conformité avec les stats d'utilisation
// https://www.similarweb.com/website/boardgamearena.com/#traffic
function getBirthday() {
  // faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
  return faker.helpers.weightedArrayElement([
    {
      weight: 26.85,
      value: faker.date.birthdate({ min: 18, max: 24, mode: "age" }),
      // value: faker.date.between({
      //   from: setYear(-24),
      //   to: setYear(-18),
      // }),
    },
    {
      weight: 32.56,
      value: faker.date.birthdate({ min: 25, max: 34, mode: "age" }),
      // value: faker.date.between({
      //   from: setYear(-34),
      //   to: setYear(-25),
      // }),
    },
    {
      weight: 35.44,
      value: faker.date.birthdate({ min: 35, max: 44, mode: "age" }),
      // value: faker.date.between({
      //   from: setYear(-44),
      //   to: setYear(-35),
      // }),
    },
    {
      weight: 10.9,
      value: faker.date.birthdate({ min: 45, max: 54, mode: "age" }),
      // value: faker.date.between({
      //   from: setYear(-54),
      //   to: setYear(-45),
      // }),
    },
    {
      weight: 7.03,
      value: faker.date.birthdate({ min: 55, max: 64, mode: "age" }),
      // value: faker.date.between({
      //   from: setYear(-64),
      //   to: setYear(-55),
      // }),
    },
    {
      weight: 4.36,
      value: faker.date.birthdate({ min: 65, max: 90, mode: "age" }),
      // value: faker.date.between({
      //   from: setYear(-90),
      //   to: setYear(-65),
      // }),
    },
  ]);
}

export async function createUsers(quantity: number) {
  const dates = getPlayersDate();
  const users: DB.UserCreation[] = Array.from({ length: quantity }, () => ({
    username: faker.internet.userName(),
    password: faker.internet.password(),
    // Génère les genres en conformité avec les stats d'utilisation
    gender: faker.datatype.boolean({ probability: 0.35 }) ? "female" : "male",
    birthday: getBirthday(),
    ...dates,
    userPremium: {
      create: getPremiumInfos(dates.createdAt, dates.lastConnection),
    },
  }));

  await prisma.$transaction([
    ...users.map((user) => prisma.user.create({ data: user })),
  ]);
}

export async function createGames() {
  const games = [
    {
      name: "Innovation",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/innovation/box/en_180.png?h=1651658500",
      popularity: 35,
    },
    {
      name: "7 Wonders",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/sevenwonders/box/en_180.png?h=1651658786",
      popularity: 116,
    },
    {
      name: "6 qui prend !",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/sechsnimmt/box/fr_180.png?h=1663946208",
      popularity: 146,
    },
    {
      name: "Mr. Jack",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/mrjack/box/en_180.png?h=1651658630",
      popularity: 2,
    },
    {
      name: "Through the Ages",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/throughtheages/box/en_180.png?h=1651658901",
      popularity: 1,
    },
    {
      name: "7 Wonders Duel",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/sevenwondersduel/box/en_180.png?h=1651658789",
      popularity: 215,
    },
    {
      name: "Hanabi",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/hanabi/box/en_180.png?h=1651658459",
      popularity: 119,
    },
    {
      name: "Yahtzee",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/yatzy/box/en_180.png?h=1651658985",
      popularity: 75,
    },
    {
      name: "Love Letter",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/loveletter/box/en_180.png?h=1651658583",
      popularity: 23,
    },
    {
      name: "Diamant",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/incangold/box/fr_180.png?h=1663946094",
      popularity: 6,
    },
    {
      name: "L'Âge de Pierre",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/stoneage/box/en_180.png?h=1651658845",
      popularity: 65,
    },
    {
      name: "Les Loups-Garous de Thiercelieux",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/werewolves/box/en_180.png?h=1651658975",
      popularity: 2,
    },
    {
      name: "Not Alone",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/notalone/box/en_180.png?h=1651658659",
      popularity: 3,
    },
    {
      name: "Colt Express",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/coltexpress/box/en_180.png?h=1651658304",
      popularity: 4,
    },
    {
      name: "Carcassonne",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/carcassonne/box/en_180.png?h=1651766704",
      popularity: 313,
    },
    {
      name: "Kingdomino",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/kingdomino/box/en_180.png?h=1651658531",
      popularity: 95,
    },
    {
      name: "Seasons",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/seasons/box/en_180.png?h=1651658774",
      popularity: 46,
    },
    {
      name: "Eminent Domain",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/eminentdomain/box/en_180.png?h=1651658374",
      popularity: 2,
    },
    {
      name: "Échecs",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/chess/box/en_180.png?h=1661256002",
      popularity: 8,
    },
    {
      name: "Race for the Galaxy",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/raceforthegalaxy/box/en_180.png?h=1651658726",
      popularity: 70,
    },
    {
      name: "Tarot",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/frenchtarot/box/en_180.png?h=1651658416",
      popularity: 38,
    },
    {
      name: "Coloretto",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/coloretto/box/en_180.png?h=1651658300",
      popularity: 3,
    },
    {
      name: "Tokaido",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/tokaido/box/en_180.png?h=1671696527",
      popularity: 8,
    },
    {
      name: "Caylus",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/caylus/box/en_180.png?h=1651658265",
      popularity: 2,
    },
    {
      name: "Les Inventeurs",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/inventors/box/en_180.png?h=1651658506",
      popularity: 0,
    },
    {
      name: "Dice Forge",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/diceforge/box/en_180.png?h=1651658333",
      popularity: 22,
    },
    {
      name: "Saboteur",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/saboteur/box/en_180.png?h=1651658757",
      popularity: 11,
    },
    {
      name: "Hive",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/hive/box/en_180.png?h=1651658477",
      popularity: 4,
    },
    {
      name: "Libertalia",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/libertalia/box/en_180.png?h=1651658567",
      popularity: 2,
    },
    {
      name: "Dragon Keeper : Le Donjon",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/dragonkeeper/box/en_180.png?h=1651658352",
      popularity: 0,
    },
    {
      name: "Noir : Killer vs. Inspector",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/noirkvi/box/en_180.png?h=1651658657",
      popularity: 0,
    },
    {
      name: "Nautilus",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/nautilus/box/en_180.png?h=1651658641",
      popularity: 0,
    },
    {
      name: "Les Bâtisseurs - Moyen-Âge",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/thebuilders/box/fr_180.png?h=1663946025",
      popularity: 2,
    },
    {
      name: "Les Aventuriers du Rail",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/tickettoride/box/fr_180.png?h=1661680542",
      popularity: 426,
    },
    {
      name: "Splendor",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/splendor/box/en_180.png?h=1651658831",
      popularity: 264,
    },
    {
      name: "It's a Wonderful World",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/itsawonderfulworld/box/en_180.png?h=1653380555",
      popularity: 208,
    },
    {
      name: "Terra Mystica",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/terramystica/box/en_180.png?h=1651658873",
      popularity: 85,
    },
    {
      name: "Les Cités Perdues",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/lostcities/box/fr_180.png?h=1664104050",
      popularity: 69,
    },
    {
      name: "Takenoko",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/takenoko/box/en_180.png?h=1651658856",
      popularity: 31,
    },
    {
      name: "Jaipur",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/jaipur/box/en_180.png?h=1651658510",
      popularity: 28,
    },
    {
      name: "Abyss",
      premium: true,
      image:
        "https://x.boardgamearena.net/data/gamemedia/abyss/box/en_180.png?h=1651658160",
      popularity: 5,
    },
    {
      name: "Lewis & Clark",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/lewisclark/box/en_180.png?h=1651658563",
      popularity: 3,
    },
    {
      name: "Dungeon Twister",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/dungeontwister/box/en_180.png?h=1651658361",
      popularity: 2,
    },
    {
      name: "Khronos",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/khronos/box/en_180.png?h=1651658527",
      popularity: 0,
    },
    {
      name: "Signorie",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/signorie/box/en_180.png?h=1651658803",
      popularity: 0,
    },
    {
      name: "Penny Press",
      premium: false,
      image:
        "https://x.boardgamearena.net/data/gamemedia/pennypress/box/en_180.png?h=1651658693",
      popularity: 0,
    },
  ];

  await prisma.$transaction([
    ...games.map((game) => prisma.game.create({ data: game })),
  ]);
}

export async function createGameplays(quantity: number) {}

export async function createHistory(quantity: number) {
  const gamesId = await prisma.game
    .findMany({ select: { id: true } })
    .then((r) => r.map((g) => g.id));
  const usersId = await prisma.user
    .findMany({ select: { id: true } })
    .then((r) => r.map((u) => u.id));

  // Les données générées pourraient etre mieux
  // Ici un historique ne prend en compte qu'un joueur par partie !
  // TODO: Il faudrait mettre idUser en Int[]
  // Si j'ai le temps
  const gamesData = Array.from(
    { length: quantity },
    () =>
      ({
        idGame: faker.helpers.arrayElement(gamesId),
        idUser: faker.helpers.arrayElement(usersId),
        playedAt: faker.date.past(),
        score: faker.number.int(100),
        duration: faker.number.int({ min: 5, max: 45 }),
      } satisfies WithoutId<DB.History>)
  );

  await prisma.$transaction([
    ...gamesData.map((history) => prisma.history.create({ data: history })),
  ]);
  console.log("Data seeded successfully!");
}

async function getGamesId() {
  return prisma.game
    .findMany({ select: { id: true } })
    .then((r) => r.map((g) => g.id));
}

async function getUsersId() {
  return prisma.user
    .findMany({ select: { id: true } })
    .then((r) => r.map((g) => g.id));
}

type ModelName = "game" | "user"; // Add all valid model names here

async function getModelIds(modelName: ModelName) {
  const records = await prisma[modelName].getAllIds();
  const recordIds = records.map((g) => g.id);
  return recordIds;
}

const gameIds = await getModelIds("game");
const userIds = await getModelIds("user");
