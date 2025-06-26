import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">利用規約</h1>
        <p className="text-muted-foreground">MKWorld Tools利用規約</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>第1条　許可される利用</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">
                ✅ 以下の利用は許可されています
              </h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>商用利用（動画収益化など）</strong>:
                  YouTube、Twitch等での収益化配信での利用可能
                </li>
                <li>
                  <strong>SNS・動画配信・ブログでの公開</strong>:
                  Twitter、Instagram、TikTok、ブログ記事等での利用可能
                </li>
                <li>
                  <strong>スクリーンショット・画面録画</strong>:
                  本ツールの画面を撮影・録画しての共有可能
                </li>
                <li>
                  <strong>教育・解説目的での利用</strong>:
                  攻略記事や解説動画での利用可能
                </li>
                <li>
                  <strong>個人・法人問わず利用可能</strong>:
                  営利・非営利問わず自由に利用可能
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>第2条　禁止事項</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="font-semibold mb-2">
                ❌ 以下の行為は禁止されています
              </h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>本ツールを複製・再配布・販売すること</li>
                <li>本ツールのソースコードを無断で利用すること</li>
                <li>本ツールに過度な負荷をかける行為</li>
                <li>他者に迷惑をかける目的での利用</li>
                <li>法令に違反する目的での利用</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>第3条　著作権について</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-4">
                本ツールで使用されているゲーム関連の画像、データ、名称等は、
                すべて任天堂株式会社の著作物です。
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>本ツールは非公式のファンツールです</li>
                <li>任天堂株式会社とは一切関係ありません</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>第4条　免責事項</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  本ツールの利用により生じたいかなる損害についても、
                  開発者は一切の責任を負いません
                </li>
                <li>
                  表示されるデータの正確性について保証するものではありません
                </li>
                <li>サービスの継続性について保証するものではありません</li>
                <li>予告なくサービスを停止・変更する場合があります</li>
                <li>他のWebサイトへのリンクについて責任を負いません</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>第5条　プライバシー・データの取り扱い</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <ul className="list-disc ml-6 space-y-2">
                <li>本ツールは個人情報を収集しません</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>第6条　規約の変更</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-4">
                本利用規約は予告なく変更される場合があります。
                変更後の規約は本ページに掲載された時点で効力を生じます。
              </p>
              <p>
                継続してサービスを利用された場合、
                変更後の利用規約に同意されたものとみなします。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>第7条　お問い合わせ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-4">
                本利用規約に関するお問い合わせや、
                ツールの利用に関するご質問については、
                以下の方法でお気軽にお問い合わせください。
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <Link
                    href="https://x.com/chiji1108"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    X（@chiji1108）
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/ChijiiwaShingo"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    技術的な質問: X（@ChijiiwaShingo）
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/Chijidosu"
                    target="_blank"
                    className="text-primary hover:underline line-through"
                  >
                    大学の質問: X（@Chijidosu）
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/miririmon"
                    target="_blank"
                    className="text-primary hover:underline line-through"
                  >
                    ブロスタの質問: X（@miririmon）
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/shingo_seikei"
                    target="_blank"
                    className="text-primary hover:underline line-through"
                  >
                    整形の質問: X（@shingo_seikei）
                  </Link>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center pt-8 text-sm text-muted-foreground">
          <p>制定日: 2025年6月26日</p>
          <p>最終更新: 2025年6月26日</p>
        </div>
      </div>
    </div>
  );
}
