// pages/api/og/phone.tsx
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const device  = searchParams.get('device')  || 'Smartphone';
  const price   = searchParams.get('price')   || '0';
  const img     = searchParams.get('img')     || 'https://ik.imagekit.io/ericmwangi/iphone.png';
  const specsRaw= searchParams.get('specs')   || '';
  const specs   = specsRaw.split(',').filter(Boolean).map(s => s.split(':'));

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0F0A0A',
          padding: 60,
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: 100, color: 'white' }}>{device}</h1>
        <h2 style={{ fontSize: 60, color: '#3EB489' }}>KES {price}</h2>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
