// pages/api/og/phone.tsx
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const device  = searchParams.get('device')  || 'Smartphone';
  const price   = searchParams.get('price')   || '0';
  const img     = searchParams.get('img')     || 'https://ik.imagekit.io/ericmwangi/iphone.png';
  const specsRaw= searchParams.get('specs')   || '';
  const specs   = specsRaw.split(',').filter(Boolean).map(s => s.split(':'));

  console.log('[OG] parsed:', { device, price, img, specs });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0F0A0A',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: 60,
        }}
      >
        {/* Phone image */}
        <img src={img} width={850} height={850} style={{ objectFit: 'contain' }} />

        {/* Text block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            marginTop: 40,
          }}
        >
          <span style={{ fontSize: 100, fontWeight: 700 }}>{device}</span>
          <span style={{ fontSize: 60, color: '#3EB489', fontWeight: 700 }}>
            KES {price}
          </span>

          {/* Specs */}
          {specs.map(([k, v], i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: '#1A1A1A',
                padding: '10px 20px',
                borderRadius: 20,
                border: '1px solid #FFD700',
              }}
            >
              <span style={{ fontSize: 30 }}>{k.toUpperCase()}</span>
              <span style={{ fontSize: 30 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
