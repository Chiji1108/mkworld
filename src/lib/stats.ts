export type StatsColor =
  | "#B8DFFC"
  | "#BDFDD6"
  | "#D4FDB1"
  | "#EEFFC1"
  | "#FFFDC9"
  | "#F9D8AA"
  | "#F4BCA3"
  | "#EF9D9B"
  | "#D0826F";

export type BaseStats = {
  speed: { hard: number; soft: number; liquid: number };
  acceleration: number;
  weight: number;
  handling: { hard: number; soft: number; liquid: number };
  color: StatsColor;
};

export type Stats = BaseStats & {
  name: string;
};

export type GroupedStats = BaseStats & {
  names: string[];
};

export const DRIVERS: Stats[] = [
  {
    name: "ベビィピーチ",
    speed: { hard: 2, soft: 2, liquid: 2 },
    acceleration: 9,
    weight: 1,
    handling: { hard: 8, soft: 8, liquid: 8 },
    color: "#B8DFFC",
  },
  {
    name: "ベビィデイジー",
    speed: { hard: 2, soft: 2, liquid: 2 },
    acceleration: 9,
    weight: 1,
    handling: { hard: 8, soft: 8, liquid: 8 },
    color: "#B8DFFC",
  },
  {
    name: "バサバサ",
    speed: { hard: 2, soft: 2, liquid: 2 },
    acceleration: 9,
    weight: 1,
    handling: { hard: 8, soft: 8, liquid: 8 },
    color: "#B8DFFC",
  },
  {
    name: "パタテンテン",
    speed: { hard: 2, soft: 2, liquid: 2 },
    acceleration: 9,
    weight: 1,
    handling: { hard: 8, soft: 8, liquid: 8 },
    color: "#B8DFFC",
  },
  {
    name: "ベビィマリオ",
    speed: { hard: 3, soft: 2, liquid: 2 },
    acceleration: 8,
    weight: 2,
    handling: { hard: 9, soft: 7, liquid: 7 },
    color: "#BDFDD6",
  },
  {
    name: "クリボー",
    speed: { hard: 3, soft: 2, liquid: 2 },
    acceleration: 8,
    weight: 2,
    handling: { hard: 9, soft: 7, liquid: 7 },
    color: "#BDFDD6",
  },
  {
    name: "ガボン",
    speed: { hard: 3, soft: 2, liquid: 2 },
    acceleration: 8,
    weight: 2,
    handling: { hard: 9, soft: 7, liquid: 7 },
    color: "#BDFDD6",
  },
  {
    name: "ベビィルイージ",
    speed: { hard: 2, soft: 3, liquid: 2 },
    acceleration: 8,
    weight: 2,
    handling: { hard: 7, soft: 9, liquid: 7 },
    color: "#BDFDD6",
  },
  {
    name: "カロン",
    speed: { hard: 2, soft: 3, liquid: 2 },
    acceleration: 8,
    weight: 2,
    handling: { hard: 7, soft: 9, liquid: 7 },
    color: "#BDFDD6",
  },
  {
    name: "テレン",
    speed: { hard: 2, soft: 3, liquid: 2 },
    acceleration: 8,
    weight: 2,
    handling: { hard: 7, soft: 9, liquid: 7 },
    color: "#BDFDD6",
  },
  {
    name: "ベビィロゼッタ",
    speed: { hard: 2, soft: 2, liquid: 3 },
    acceleration: 8,
    weight: 2,
    handling: { hard: 7, soft: 7, liquid: 9 },
    color: "#BDFDD6",
  },
  {
    name: "カニ",
    speed: { hard: 2, soft: 2, liquid: 3 },
    acceleration: 8,
    weight: 2,
    handling: { hard: 7, soft: 7, liquid: 9 },
    color: "#BDFDD6",
  },
  {
    name: "フィッシュボーン",
    speed: { hard: 2, soft: 2, liquid: 3 },
    acceleration: 8,
    weight: 2,
    handling: { hard: 7, soft: 7, liquid: 9 },
    color: "#BDFDD6",
  },
  {
    name: "キノピコ",
    speed: { hard: 4, soft: 3, liquid: 3 },
    acceleration: 7,
    weight: 3,
    handling: { hard: 8, soft: 6, liquid: 6 },
    color: "#D4FDB1",
  },
  {
    name: "トッテン",
    speed: { hard: 4, soft: 3, liquid: 3 },
    acceleration: 7,
    weight: 3,
    handling: { hard: 8, soft: 6, liquid: 6 },
    color: "#D4FDB1",
  },
  {
    name: "キノピオ",
    speed: { hard: 3, soft: 4, liquid: 3 },
    acceleration: 7,
    weight: 3,
    handling: { hard: 6, soft: 8, liquid: 6 },
    color: "#D4FDB1",
  },
  {
    name: "ヘイホー",
    speed: { hard: 3, soft: 4, liquid: 3 },
    acceleration: 7,
    weight: 3,
    handling: { hard: 6, soft: 8, liquid: 6 },
    color: "#D4FDB1",
  },
  {
    name: "ハッチン",
    speed: { hard: 3, soft: 4, liquid: 3 },
    acceleration: 7,
    weight: 3,
    handling: { hard: 6, soft: 8, liquid: 6 },
    color: "#D4FDB1",
  },
  {
    name: "ノコノコ",
    speed: { hard: 3, soft: 3, liquid: 4 },
    acceleration: 7,
    weight: 3,
    handling: { hard: 6, soft: 6, liquid: 8 },
    color: "#D4FDB1",
  },
  {
    name: "ジュゲム",
    speed: { hard: 3, soft: 3, liquid: 4 },
    acceleration: 7,
    weight: 3,
    handling: { hard: 6, soft: 6, liquid: 8 },
    color: "#D4FDB1",
  },
  {
    name: "プクプク",
    speed: { hard: 3, soft: 3, liquid: 4 },
    acceleration: 7,
    weight: 3,
    handling: { hard: 6, soft: 6, liquid: 8 },
    color: "#D4FDB1",
  },
  {
    name: "ピーチ",
    speed: { hard: 5, soft: 4, liquid: 4 },
    acceleration: 6,
    weight: 4,
    handling: { hard: 7, soft: 5, liquid: 5 },
    color: "#EEFFC1",
  },
  {
    name: "デイジー",
    speed: { hard: 5, soft: 4, liquid: 4 },
    acceleration: 6,
    weight: 4,
    handling: { hard: 7, soft: 5, liquid: 5 },
    color: "#EEFFC1",
  },
  {
    name: "ガマネー",
    speed: { hard: 5, soft: 4, liquid: 4 },
    acceleration: 6,
    weight: 4,
    handling: { hard: 7, soft: 5, liquid: 5 },
    color: "#EEFFC1",
  },
  {
    name: "ヨッシー",
    speed: { hard: 4, soft: 5, liquid: 4 },
    acceleration: 6,
    weight: 4,
    handling: { hard: 5, soft: 7, liquid: 5 },
    color: "#EEFFC1",
  },
  {
    name: "チョロプー",
    speed: { hard: 4, soft: 5, liquid: 4 },
    acceleration: 6,
    weight: 4,
    handling: { hard: 5, soft: 7, liquid: 5 },
    color: "#EEFFC1",
  },
  {
    name: "クッパJr",
    speed: { hard: 4, soft: 4, liquid: 5 },
    acceleration: 6,
    weight: 4,
    handling: { hard: 5, soft: 5, liquid: 7 },
    color: "#EEFFC1",
  },
  {
    name: "リフトン",
    speed: { hard: 4, soft: 4, liquid: 5 },
    acceleration: 6,
    weight: 4,
    handling: { hard: 5, soft: 5, liquid: 7 },
    color: "#EEFFC1",
  },
  {
    name: "マリオ",
    speed: { hard: 6, soft: 5, liquid: 5 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 6, soft: 4, liquid: 4 },
    color: "#FFFDC9",
  },
  {
    name: "プー",
    speed: { hard: 6, soft: 5, liquid: 5 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 6, soft: 4, liquid: 4 },
    color: "#FFFDC9",
  },
  {
    name: "ルイージ",
    speed: { hard: 5, soft: 6, liquid: 5 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 4, soft: 6, liquid: 4 },
    color: "#FFFDC9",
  },
  {
    name: "ハンマーブロス",
    speed: { hard: 5, soft: 6, liquid: 5 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 4, soft: 6, liquid: 4 },
    color: "#FFFDC9",
  },
  {
    name: "サンボ",
    speed: { hard: 5, soft: 6, liquid: 5 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 4, soft: 6, liquid: 4 },
    color: "#FFFDC9",
  },
  {
    name: "キャサリン",
    speed: { hard: 5, soft: 5, liquid: 6 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 4, soft: 4, liquid: 6 },
    color: "#FFFDC9",
  },
  {
    name: "ペンギン",
    speed: { hard: 5, soft: 5, liquid: 6 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 4, soft: 4, liquid: 6 },
    color: "#FFFDC9",
  },
  {
    name: "ポリーン",
    speed: { hard: 7, soft: 6, liquid: 6 },
    acceleration: 4,
    weight: 6,
    handling: { hard: 5, soft: 3, liquid: 3 },
    color: "#F9D8AA",
  },
  {
    name: "パックンフラワー",
    speed: { hard: 7, soft: 6, liquid: 6 },
    acceleration: 4,
    weight: 6,
    handling: { hard: 5, soft: 3, liquid: 3 },
    color: "#F9D8AA",
  },
  {
    name: "ゆきだるま",
    speed: { hard: 7, soft: 6, liquid: 6 },
    acceleration: 4,
    weight: 6,
    handling: { hard: 5, soft: 3, liquid: 3 },
    color: "#F9D8AA",
  },
  {
    name: "キングテレサ",
    speed: { hard: 6, soft: 7, liquid: 6 },
    acceleration: 4,
    weight: 6,
    handling: { hard: 3, soft: 5, liquid: 3 },
    color: "#F9D8AA",
  },
  {
    name: "ツッコンドル",
    speed: { hard: 6, soft: 7, liquid: 6 },
    acceleration: 4,
    weight: 6,
    handling: { hard: 3, soft: 5, liquid: 3 },
    color: "#F9D8AA",
  },
  {
    name: "ロゼッタ",
    speed: { hard: 6, soft: 6, liquid: 7 },
    acceleration: 4,
    weight: 6,
    handling: { hard: 3, soft: 3, liquid: 5 },
    color: "#F9D8AA",
  },
  {
    name: "ポイハナ",
    speed: { hard: 6, soft: 6, liquid: 7 },
    acceleration: 4,
    weight: 6,
    handling: { hard: 3, soft: 3, liquid: 5 },
    color: "#F9D8AA",
  },
  {
    name: "ワリオ",
    speed: { hard: 8, soft: 7, liquid: 7 },
    acceleration: 3,
    weight: 7,
    handling: { hard: 4, soft: 2, liquid: 2 },
    color: "#F4BCA3",
  },
  {
    name: "ハナチャン",
    speed: { hard: 8, soft: 7, liquid: 7 },
    acceleration: 3,
    weight: 7,
    handling: { hard: 4, soft: 2, liquid: 2 },
    color: "#F4BCA3",
  },
  {
    name: "ドンキーコング",
    speed: { hard: 7, soft: 8, liquid: 7 },
    acceleration: 3,
    weight: 7,
    handling: { hard: 2, soft: 4, liquid: 2 },
    color: "#F4BCA3",
  },
  {
    name: "ウシ",
    speed: { hard: 7, soft: 8, liquid: 7 },
    acceleration: 3,
    weight: 7,
    handling: { hard: 2, soft: 4, liquid: 2 },
    color: "#F4BCA3",
  },
  {
    name: "ブル",
    speed: { hard: 7, soft: 8, liquid: 7 },
    acceleration: 3,
    weight: 7,
    handling: { hard: 2, soft: 4, liquid: 2 },
    color: "#F4BCA3",
  },
  {
    name: "ワルイージ",
    speed: { hard: 7, soft: 7, liquid: 8 },
    acceleration: 3,
    weight: 7,
    handling: { hard: 2, soft: 2, liquid: 4 },
    color: "#F4BCA3",
  },
  {
    name: "モンテ",
    speed: { hard: 7, soft: 7, liquid: 8 },
    acceleration: 3,
    weight: 7,
    handling: { hard: 2, soft: 2, liquid: 4 },
    color: "#F4BCA3",
  },
  {
    name: "クッパ",
    speed: { hard: 8, soft: 8, liquid: 8 },
    acceleration: 2,
    weight: 8,
    handling: { hard: 2, soft: 2, liquid: 2 },
    color: "#EF9D9B",
  },
];

export const MACHINES: Stats[] = [
  {
    name: "スタンダードバイク",
    speed: { hard: 1, soft: 1, liquid: 1 },
    acceleration: 10,
    weight: 2,
    handling: { hard: 7, soft: 7, liquid: 7 },
    color: "#B8DFFC",
  },
  {
    name: "カラフルスクーター",
    speed: { hard: 1, soft: 1, liquid: 1 },
    acceleration: 10,
    weight: 2,
    handling: { hard: 7, soft: 7, liquid: 7 },
    color: "#B8DFFC",
  },
  {
    name: "レディオライド",
    speed: { hard: 1, soft: 1, liquid: 1 },
    acceleration: 10,
    weight: 2,
    handling: { hard: 7, soft: 7, liquid: 7 },
    color: "#B8DFFC",
  },
  {
    name: "こいのぼり",
    speed: { hard: 0, soft: 0, liquid: 5 },
    acceleration: 9,
    weight: 2,
    handling: { hard: 6, soft: 6, liquid: 10 },
    color: "#BDFDD6",
  },
  {
    name: "ドルフィンキック",
    speed: { hard: 0, soft: 0, liquid: 5 },
    acceleration: 9,
    weight: 2,
    handling: { hard: 6, soft: 6, liquid: 10 },
    color: "#BDFDD6",
  },
  {
    name: "ラリーバイク",
    speed: { hard: 0, soft: 5, liquid: 0 },
    acceleration: 9,
    weight: 2,
    handling: { hard: 6, soft: 10, liquid: 6 },
    color: "#BDFDD6",
  },
  {
    name: "ドカンバイク",
    speed: { hard: 0, soft: 5, liquid: 0 },
    acceleration: 9,
    weight: 2,
    handling: { hard: 6, soft: 10, liquid: 6 },
    color: "#BDFDD6",
  },
  {
    name: "スケルトン",
    speed: { hard: 2, soft: 2, liquid: 2 },
    acceleration: 9,
    weight: 3,
    handling: { hard: 6, soft: 6, liquid: 6 },
    color: "#BDFDD6",
  },
  {
    name: "パタテンテン",
    speed: { hard: 1, soft: 6, liquid: 1 },
    acceleration: 8,
    weight: 3,
    handling: { hard: 5, soft: 9, liquid: 5 },
    color: "#D4FDB1",
  },
  {
    name: "マッハレーサー",
    speed: { hard: 6, soft: 1, liquid: 1 },
    acceleration: 8,
    weight: 2,
    handling: { hard: 10, soft: 6, liquid: 6 },
    color: "#D4FDB1",
  },
  {
    name: "FCロボットバイク",
    speed: { hard: 6, soft: 1, liquid: 1 },
    acceleration: 8,
    weight: 2,
    handling: { hard: 10, soft: 6, liquid: 6 },
    color: "#D4FDB1",
  },
  {
    name: "スチームバイク",
    speed: { hard: 4, soft: 4, liquid: 4 },
    acceleration: 7,
    weight: 3,
    handling: { hard: 6, soft: 6, liquid: 6 },
    color: "#EEFFC1",
  },
  {
    name: "コゲッソー",
    speed: { hard: 7, soft: 2, liquid: 2 },
    acceleration: 7,
    weight: 3,
    handling: { hard: 9, soft: 5, liquid: 5 },
    color: "#EEFFC1",
  },
  {
    name: "スタンダードカート",
    speed: { hard: 5, soft: 5, liquid: 5 },
    acceleration: 6,
    weight: 4,
    handling: { hard: 5, soft: 5, liquid: 5 },
    color: "#FFFDC9",
  },
  {
    name: "リボンクラシカル",
    speed: { hard: 5, soft: 5, liquid: 5 },
    acceleration: 6,
    weight: 4,
    handling: { hard: 5, soft: 5, liquid: 5 },
    color: "#FFFDC9",
  },
  {
    name: "イグニッション",
    speed: { hard: 5, soft: 5, liquid: 5 },
    acceleration: 7,
    weight: 5,
    handling: { hard: 3, soft: 3, liquid: 3 },
    color: "#FFFDC9",
  },
  {
    name: "ファイアモービル",
    speed: { hard: 3, soft: 9, liquid: 5 },
    acceleration: 4,
    weight: 5,
    handling: { hard: 3, soft: 9, liquid: 4 },
    color: "#F9D8AA",
  },
  {
    name: "ケロケロード",
    speed: { hard: 4, soft: 4, liquid: 8 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 3, soft: 3, liquid: 8 },
    color: "#F9D8AA",
  },
  {
    name: "スーパーカーペット",
    speed: { hard: 4, soft: 4, liquid: 8 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 3, soft: 3, liquid: 8 },
    color: "#F9D8AA",
  },
  {
    name: "H2O",
    speed: { hard: 4, soft: 4, liquid: 8 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 3, soft: 3, liquid: 8 },
    color: "#F9D8AA",
  },
  {
    name: "ドッシーウェーブ",
    speed: { hard: 4, soft: 4, liquid: 8 },
    acceleration: 6,
    weight: 6,
    handling: { hard: 1, soft: 1, liquid: 6 },
    color: "#F9D8AA",
  },
  {
    name: "タートルバギー",
    speed: { hard: 4, soft: 8, liquid: 4 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 3, soft: 8, liquid: 3 },
    color: "#F9D8AA",
  },
  {
    name: "ラリーカート",
    speed: { hard: 4, soft: 8, liquid: 4 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 3, soft: 8, liquid: 3 },
    color: "#F9D8AA",
  },
  {
    name: "ファイアチャージャー",
    speed: { hard: 8, soft: 4, liquid: 4 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 8, soft: 3, liquid: 3 },
    color: "#F9D8AA",
  },
  {
    name: "ロイヤルターボ",
    speed: { hard: 8, soft: 4, liquid: 4 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 8, soft: 3, liquid: 3 },
    color: "#F9D8AA",
  },
  {
    name: "Bダッシュ",
    speed: { hard: 8, soft: 4, liquid: 4 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 8, soft: 3, liquid: 3 },
    color: "#F9D8AA",
  },
  {
    name: "マッハクイーン",
    speed: { hard: 8, soft: 4, liquid: 4 },
    acceleration: 5,
    weight: 5,
    handling: { hard: 8, soft: 3, liquid: 3 },
    color: "#F9D8AA",
  },
  {
    name: "Wチョッパー",
    speed: { hard: 7, soft: 7, liquid: 7 },
    acceleration: 4,
    weight: 4,
    handling: { hard: 5, soft: 5, liquid: 5 },
    color: "#F4BCA3",
  },
  {
    name: "サファリカーゴ",
    speed: { hard: 9, soft: 6, liquid: 6 },
    acceleration: 3,
    weight: 7,
    handling: { hard: 7, soft: 1, liquid: 1 },
    color: "#F4BCA3",
  },
  {
    name: "キラーヘッド",
    speed: { hard: 9, soft: 6, liquid: 6 },
    acceleration: 3,
    weight: 7,
    handling: { hard: 7, soft: 1, liquid: 1 },
    color: "#F4BCA3",
  },
  {
    name: "ラリーゲイター",
    speed: { hard: 9, soft: 6, liquid: 6 },
    acceleration: 4,
    weight: 8,
    handling: { hard: 5, soft: 0, liquid: 0 },
    color: "#F4BCA3",
  },
  {
    name: "メカクッパ",
    speed: { hard: 7, soft: 7, liquid: 10 },
    acceleration: 2,
    weight: 7,
    handling: { hard: 1, soft: 1, liquid: 7 },
    color: "#EF9D9B",
  },
  {
    name: "ローブスター",
    speed: { hard: 7, soft: 7, liquid: 10 },
    acceleration: 3,
    weight: 8,
    handling: { hard: 0, soft: 0, liquid: 5 },
    color: "#EF9D9B",
  },
  {
    name: "ビッグブル",
    speed: { hard: 7, soft: 10, liquid: 7 },
    acceleration: 2,
    weight: 7,
    handling: { hard: 1, soft: 7, liquid: 1 },
    color: "#EF9D9B",
  },
  {
    name: "ホットラリー",
    speed: { hard: 7, soft: 10, liquid: 7 },
    acceleration: 2,
    weight: 7,
    handling: { hard: 1, soft: 7, liquid: 1 },
    color: "#EF9D9B",
  },
  {
    name: "トイダンプ",
    speed: { hard: 7, soft: 10, liquid: 7 },
    acceleration: 2,
    weight: 7,
    handling: { hard: 1, soft: 7, liquid: 1 },
    color: "#EF9D9B",
  },
  {
    name: "バウザーバギー",
    speed: { hard: 7, soft: 10, liquid: 7 },
    acceleration: 2,
    weight: 7,
    handling: { hard: 1, soft: 7, liquid: 1 },
    color: "#EF9D9B",
  },
  {
    name: "ムービースター",
    speed: { hard: 8, soft: 8, liquid: 8 },
    acceleration: 3,
    weight: 5,
    handling: { hard: 4, soft: 4, liquid: 4 },
    color: "#EF9D9B",
  },
  {
    name: "ベルトライク",
    speed: { hard: 8, soft: 8, liquid: 8 },
    acceleration: 4,
    weight: 6,
    handling: { hard: 2, soft: 2, liquid: 2 },
    color: "#EF9D9B",
  },
  {
    name: "スターモービル",
    speed: { hard: 6, soft: 8, liquid: 11 },
    acceleration: 1,
    weight: 7,
    handling: { hard: 1, soft: 2, liquid: 8 },
    color: "#D0826F",
  },
];

export type SpeedSpecialization = "hard" | "soft" | "liquid" | "balance";

export function analyzeSpeedSpecialization(
  stats: BaseStats
): SpeedSpecialization {
  const { hard, soft, liquid } = stats.speed;

  const maxSpeed = Math.max(hard, soft, liquid);
  const minSpeed = Math.min(hard, soft, liquid);
  const difference = maxSpeed - minSpeed;

  if (difference === 0) {
    return "balance";
  }

  if (hard === maxSpeed && hard > soft && hard > liquid) {
    return "hard";
  }

  if (soft === maxSpeed && soft > hard && soft > liquid) {
    return "soft";
  }

  if (liquid === maxSpeed && liquid > hard && liquid > soft) {
    return "liquid";
  }

  return "balance";
}

export function groupStatsByIdenticalValues(stats: Stats[]): GroupedStats[] {
  const groups: Map<string, GroupedStats> = new Map();

  stats.forEach((stat) => {
    const key = `${stat.speed.hard}-${stat.speed.soft}-${stat.speed.liquid}-${stat.acceleration}-${stat.weight}-${stat.handling.hard}-${stat.handling.soft}-${stat.handling.liquid}`;

    if (groups.has(key)) {
      const group = groups.get(key)!;
      group.names.push(stat.name);
    } else {
      groups.set(key, {
        names: [stat.name],
        speed: { ...stat.speed },
        acceleration: stat.acceleration,
        weight: stat.weight,
        handling: { ...stat.handling },
        color: stat.color,
      });
    }
  });

  // Define color order from #B8DFFC to #D0826F
  const colorOrder = [
    "#B8DFFC",
    "#BDFDD6",
    "#D4FDB1",
    "#EEFFC1",
    "#FFFDC9",
    "#F9D8AA",
    "#F4BCA3",
    "#EF9D9B",
    "#D0826F",
  ];

  return Array.from(groups.values()).sort((a, b) => {
    const aIndex = colorOrder.indexOf(a.color);
    const bIndex = colorOrder.indexOf(b.color);
    return aIndex - bIndex;
  });
}

export const GROUPED_DRIVERS = groupStatsByIdenticalValues(DRIVERS);
export const GROUPED_MACHINES = groupStatsByIdenticalValues(MACHINES);
