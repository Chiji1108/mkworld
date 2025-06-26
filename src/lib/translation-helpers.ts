// 日本語名から英語キーへのマッピング
const DRIVER_NAME_MAP: Record<string, string> = {
  マリオ: "mario",
  ルイージ: "luigi",
  ピーチ: "peach",
  ヨッシー: "yoshi",
  キノピオ: "toad",
  ノコノコ: "koopaTroopa",
  クッパ: "bowser",
  ワリオ: "wario",
  ワルイージ: "waluigi",
  ポリーン: "pauline",
  ベビィマリオ: "babyMario",
  ベビィルイージ: "babyLuigi",
  ベビィピーチ: "babyPeach",
  ベビィデイジー: "babyDaisy",
  キノピコ: "toadette",
  ベビィロゼッタ: "babyRosalin",
  ヘイホー: "shyGuy",
  トッテン: "nabbit",
  パックンフラワー: "piranhaPlant",
  ハンマーブロス: "hammerBro",
  チョロプー: "montyMole",
  クリボー: "goomba",
  カニ: "sidestepper",
  プクプク: "cheepCheep",
  カロン: "dryBones",
  ハナチャン: "wiggler",
  サンボ: "pokey",
  ウシ: "cow",
  ハッチン: "stingby",
  ゆきだるま: "snowman",
  ペンギン: "penguin",
  パタテンテン: "para-biddybud",
  デイジー: "daisy",
  ロゼッタ: "rosalina",
  ジュゲム: "lakitu",
  クッパJr: "bowserJr",
  キャサリン: "birdo",
  キングテレサ: "kingBoo",
  ドンキーコング: "donkeyKong",
  ガボン: "spike",
  ポイハナ: "cataquack",
  モンテ: "pianta",
  プー: "rockyWrench",
  ツッコンドル: "conkdor",
  テレン: "peepa",
  バサバサ: "swoop",
  フィッシュボーン: "fishBone",
  ガマネー: "coinCoffer",
  リフトン: "dolphin",
  ブル: "charginChuck",
};

const MACHINE_NAME_MAP: Record<string, string> = {
  スタンダードカート: "standardKart",
  ラリーカート: "rallyKard",
  リボンクラシカル: "plushbuggy",
  コゲッソー: "babyBlooper",
  タートルバギー: "zoomBuggy",
  ビッグブル: "charginTruck",
  ファイアチャージャー: "hotRod",
  ケロケロード: "ribbitRevster",
  ロイヤルターボ: "roadsterRoyale",
  Bダッシュ: "bDasher",
  パタテンテン: "biddybuggy",
  ホットラリー: "tinyTitan",
  スターモービル: "stellarSled",
  ムービースター: "reelRacer",
  マッハクイーン: "bumbleV",
  スーパーカーペット: "carpetFlyer",
  H2O: "cloud9",
  イグニッション: "blastronaut3",
  サファリカーゴ: "bigHorn",
  トイダンプ: "lilDumpy",
  メカクッパ: "mechaTrike",
  スケルトン: "pipeFrame",
  キラーヘッド: "billdozer",
  スタンダードバイク: "starndardBike",
  ラリーバイク: "rallyBike",
  カラフルスクーター: "cuteScoot",
  マッハレーサー: "machRocket",
  ドカンバイク: "hyperPipe",
  レディオライド: "tuneThumper",
  Wチョッパー: "w-twinChopper",
  こいのぼり: "finTwin",
  FCロボットバイク: "robHog",
  ドルフィンキック: "dolphinDasher",
  スチームバイク: "locoMoto",
  ドッシーウェーブ: "funkyDorrie",
  ベルトライク: "junkyardHog",
  ローブスター: "lobsterRoller",
  ファイアモービル: "dreadSled",
  ラリーゲイター: "rallygator",
  バウザーバギー: "bowserBruiser",
};

/**
 * ドライバー名を翻訳用キーに変換
 */
export function getDriverTranslationKey(japaneseName: string): string {
  return DRIVER_NAME_MAP[japaneseName] || japaneseName;
}

/**
 * マシン名を翻訳用キーに変換
 */
export function getMachineTranslationKey(japaneseName: string): string {
  return MACHINE_NAME_MAP[japaneseName] || japaneseName;
}

/**
 * ドライバー名を翻訳（useTranslationsと組み合わせて使用）
 */
export function translateDriverName(
  japaneseName: string,
  t: (key: string) => string
): string {
  const key = getDriverTranslationKey(japaneseName);
  const translationKey = `drivers.${key}`;
  const translated = t(translationKey);

  // 翻訳が見つからない場合は元の名前を返す
  return translated !== translationKey ? translated : japaneseName;
}

/**
 * マシン名を翻訳（useTranslationsと組み合わせて使用）
 */
export function translateMachineName(
  japaneseName: string,
  t: (key: string) => string
): string {
  const key = getMachineTranslationKey(japaneseName);
  const translationKey = `machines.${key}`;
  const translated = t(translationKey);

  // 翻訳が見つからない場合は元の名前を返す
  return translated !== translationKey ? translated : japaneseName;
}
