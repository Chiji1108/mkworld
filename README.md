# MKWorld Tools

Mario Kart Worldのドライバーとマシンの組み合わせを分析・最適化するためのWebアプリケーションです。

## ページ構成

- **性能一覧**: 全ドライバー・マシンの性能を一覧表示
- **カスタムビルダー**: 組み合わせを選択して合計性能を確認
- **パレート最適**: 特定条件下での最適な組み合わせを探索

## 機能

- 🏎️ **ドライバー選択**: 50種類のドライバーから選択（画像付き）
- 🚗 **マシン選択**: 40種類のマシン（カート・バイク）から選択（画像付き）
- 📊 **ステータス表示**: 選択した組み合わせの合計値をグラフィカルに表示
  - スピード（舗装路）
  - スピード（未舗装路）
  - スピード（水上）
  - かそく
  - おもさ
  - まがりやすさ
- 🎨 **モダンUI**: shadcn/uiを使用した美しいインターフェース（プライマリカラー：ブルー）
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
│   ├── page.tsx       # ホームページ
│   ├── performance/   # 性能一覧ページ
│   ├── builder/       # カスタムビルダーページ
│   └── pareto/        # パレート最適ページ
├── components/        
│   ├── ui/            # shadcn/ui コンポーネント
│   └── navigation.tsx # ナビゲーションバー
└── lib/
    ├── stats.ts       # ドライバー・マシンのデータ
    └── utils.ts       # ユーティリティ関数
public/
├── drivers/           # ドライバー画像 (50枚)
└── machines/          # マシン画像 (40枚)
```

## ライセンス

MIT