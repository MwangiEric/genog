// api/og/phone.tsx
import { ImageResponse } from '@vercel/og';
export const config = { runtime: 'edge' };

const logoBuf = fetch('https://ik.imagekit.io/ericmwangi/tklogo.png').then((r) => r.arrayBuffer());

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const device = searchParams.get('device')  || 'Smartphone';
  const price  = searchParams.get('price')   || '0';
  const imgUrl = searchParams.get('img')     || '';
  const specs  = (searchParams.get('specs') || '').split(',').filter(Boolean).map(s => s.trim());

  const logo = await logoBuf;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0F0A0A',
          backgroundImage: 'radial-gradient(circle at top right, #3b000e, #121212)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: 40,
        }}
      >
        {/* Top bar: logo + headline */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <img src={logo as any} width={320} height={80} />
          <span style={{ fontSize: 40, fontWeight: 700, color: '#FFD700' }}>{device}</span>
        </div>

        {/* Centre handset + glow */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {imgUrl && (
            <>
              {/* soft glow behind phone */}
              <div
                style={{
                  position: 'absolute',
                  width: 800,
                  height: 975,
                  background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
                  borderRadius: '50%',
                }}
              />
              <img
                src={imgUrl}
                width={700}
                height={875}
                style={{ objectFit: 'contain', position: 'relative', zIndex: 2 }}
              />
            </>
          )}
        </div>

        {/* Bottom strip: specs + price badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 20 }}>
          {/* specs row */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {specs.map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#1A1A1A',
                  padding: '8px 16px',
                  borderRadius: 20,
                  border: '1px solid #FFD700',
                }}
              >
                <span style={{ fontSize: 24 }}>{s}</span>
              </div>
            ))}
          </div>

          {/* price badge */}
          <div
            style={{
              backgroundColor: '#3EB489',
              padding: '12px 28px',
              borderRadius: 30,
            }}
          >
            <span style={{ fontSize: 32, fontWeight: 700 }}>KES {price}</span>
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
