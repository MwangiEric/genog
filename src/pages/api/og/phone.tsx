import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const device = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
  const price  = searchParams.get('price')  || 'Contact for Price';
  const imageUrl = searchParams.get('image');
  const glowHex = /^[0-9A-F]{6}$/i.test(searchParams.get('glow') || '') ? searchParams.get('glow') : 'C5A059';

  /* -------  FALLBACK RECTANGLE (drawn every time)  ------- */
  const FallbackRect = (
    <div
      style={{
        position: 'absolute',
        width: 950,
        height: 950,
        background: `linear-gradient(135deg, #222 0%, #111 100%)`,
        border: '2px dashed #333',
        borderRadius: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#555',
        fontSize: 40,
        fontWeight: 700,
      }}
    >
      DEVICE IMAGE
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#050505',
          color: 'white',
          fontFamily: 'sans-serif', // ← system font only
          padding: '60px 0 40px 0',
        }}
      >
        {/* HEADER */}
        <div style={{ fontSize: 55, fontWeight: 900, color: '#C5A059', letterSpacing: 10, marginBottom: 30 }}>TRIPLE K</div>

        {/* DEVICE NAME */}
        <div style={{ fontSize: device.length > 20 ? 80 : 105, fontWeight: 900, textAlign: 'center', marginBottom: 20 }}>{device}</div>

        {/* IMAGE AREA – fallback rectangle is **always** behind the img */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div style={{ position: 'absolute', width: 850, height: 850, background: `radial-gradient(circle, #${glowHex}33 0%, transparent 70%)`, borderRadius: '50%' }} />
          {FallbackRect}
          {imageUrl && <img src={imageUrl} style={{ width: 950, height: 950, objectFit: 'contain', zIndex: 10 }} />}
        </div>

        {/* PRICE */}
        <div style={{ background: '#3EB489', padding: '20px 110px', borderRadius: 100, border: '5px solid #C5A059', marginTop: 40 }}>
          <span style={{ fontSize: 85, fontWeight: 900, color: '#000' }}>KSH {price}</span>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
