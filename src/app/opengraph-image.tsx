import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MKWorld Tools - マリオカートワールド カスタムビルダー';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            MKWorld Tools
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: '0',
              maxWidth: '800px',
              lineHeight: '1.4',
            }}
          >
            マリオカートワールド カスタムビルダー
          </p>
          <p
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '20px 0 0 0',
              maxWidth: '900px',
              lineHeight: '1.3',
            }}
          >
            50人のドライバー × 40台のマシン = 最適な組み合わせを見つけよう
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}