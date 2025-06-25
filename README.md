# マリオカートワールド カスタムビルダー

マリオカートワールドのキャラクターとマシンの組み合わせを選択し、合計ステータスをグラフィカルに表示するWebアプリケーションです。

## 機能

- 🏎️ **キャラクター選択**: 60種類のキャラクターから選択
- 🚗 **マシン選択**: 52種類のマシン（カート・バイク）から選択
- 📊 **ステータス表示**: 選択した組み合わせの合計値をグラフィカルに表示
  - スピード（スムーズ路面）
  - スピード（ラフ路面）
  - スピード（水中）
  - 加速
  - 重さ
  - ハンドリング
- 🎨 **モダンUI**: shadcn/uiを使用した美しいインターフェース
- 🌓 **ダークモード対応**: ライト/ダークテーマの切り替え

## 技術スタック

- **フレームワーク**: Next.js 15.3.4 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **UIコンポーネント**: shadcn/ui
- **グラフ**: Recharts
- **フォーム**: React Hook Form + Zod

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

## 開発

```bash
# 開発サーバー（Turbopack使用）
pnpm dev

# ビルド
pnpm build

# プロダクションサーバー
pnpm start

# リント
pnpm lint
```

## プロジェクト構造

```
src/
├── app/                # Next.js App Router
│   ├── layout.tsx     # ルートレイアウト
│   └── page.tsx       # メインページ（ビルダー）
├── components/        
│   ├── ui/            # shadcn/ui コンポーネント
│   ├── character-selector.tsx  # キャラクター選択
│   ├── vehicle-selector.tsx    # マシン選択
│   └── stats-display.tsx       # ステータス表示
└── lib/
    ├── stats.ts       # キャラクター・マシンのデータ
    └── utils.ts       # ユーティリティ関数
```

## ライセンス

MIT