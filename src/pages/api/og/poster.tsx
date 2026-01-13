import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

const CDN = "https://ik.imagekit.io/ericmwangi";

export default function (req: Request) {
  const { searchParams } = new URL(req.url);
  
  const device = searchParams.get('device') || 'Smartphone';
  const price = searchParams.get('price') || '0';
  const img = searchParams.get('img') || `${CDN}/iphone.png`;
  const specsRaw = searchParams.get('specs') || "";
  const specs = specsRaw.split(',').filter(Boolean).map(s => s.split(':'));

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#0F0A0A', padding: '60px',
        alignItems: 'center', fontFamily: 'sans-serif',
      }}>
        {/* Logo */}
        <img src={`${CDN}/tklogo.png`} style={{ width: 400, marginTop: 40 }} />

        {/* Device Title */}
        <h1 style={{ fontSize: 110, color: 'white', fontWeight: 'bold', marginTop: 60, textAlign: 'center' }}>
          {device}
        </h1>

        {/* Product Image */}
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <img src={img} style={{ width: 850, height: 850, objectFit: 'contain' }} />
        </div>

        {/* Specs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, width: '100%', marginBottom: 40 }}>
          {specs.map(([icon, val], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', background: '#1A1A1A', padding: '20px 30px', borderRadius: 25, border: '1px solid #FFD700' }}>
              <img src={`${CDN}/${icon}.png`} style={{ width: 40, marginRight: 15 }} />
              <span style={{ color: 'white', fontSize: 30 }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div style={{ backgroundColor: '#3EB489', padding: '30px 100px', borderRadius: 40, marginBottom: 60 }}>
          <span style={{ color: 'white', fontSize: 90, fontWeight: 'bold' }}>KES {price}</span>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
