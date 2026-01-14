// api/og/phone.tsx
import { ImageResponse } from '@vercel/og';
export const config = { runtime: 'edge' };

/* tiny logo buffer (base64 10 KB WebP) – replace with your own < 20 KB asset */
const logoBuf = fetch(
  'https://ik.imagekit.io/ericmwangi/tklogo.webp?tr=w-320,h-80,q-80'
).then((r) => r.arrayBuffer());

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const device  = searchParams.get('device')  || 'Smartphone';
  const price   = searchParams.get('price')   || '0';
  const imgUrl  = searchParams.get('img')     || ''; // external handset shot
  const specsRaw= searchParams.get('specs')   || '';
  const specs   = specsRaw.split(',').filter(Boolean).map(s => s.trim());

  const logo = await logoBuf;

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
          padding: 40,
        }}
      >
        {/* Logo (always inline, tiny) */}
        <img src={logo as any} width={320} height={80} style={{ marginBottom: 30 }} />

        {/* Handset image – hot-linked, no fetch */}
        {imgUrl && (
          <img
            src={imgUrl}
            width={700}
            height={875}
            style={{ objectFit: 'contain' }}
          />
        )}

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
          <span style={{ fontSize: 60, color: '#3EB489', fontWeight: 700 }}>KES {price}</span>

          {/* Spec pills */}
          {specs.map((s, i) => (
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
              <span style={{ fontSize: 30 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
