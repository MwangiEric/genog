import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

/* ----------  inline logo svg  ---------- */
const LogoSVG = (
  <svg width="350" height="100" viewBox="0 0 350 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="350" height="100" rx="12" fill="#C5A059"/>
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#050505" fontSize="45" fontWeight="900" fontFamily="sans-serif">TRIPLE K</text>
  </svg>
);

/* ----------  product fallback (vector)  ---------- */
const DeviceFallback = (
  <div style={{ width: 950, height: 950, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#222 0%, #111 100%)', border: '2px dashed #333', borderRadius: 24, fontSize: 40, color: '#555' }}>
    DEVICE IMAGE
  </div>
);

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const device   = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
  const price    = searchParams.get('price')  || 'Contact for Price';
  const imageUrl = searchParams.get('image');
  const glowHex  = /^[0-9A-F]{6}$/i.test(searchParams.get('glow') || '') ? searchParams.get('glow') : 'C5A059';

  return new ImageResponse(
    (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#050505', color: 'white', fontFamily: 'sans-serif', padding: '60px 0 40px 0' }}>
        {/* logo */}
        <div style={{ marginBottom: 30 }}>{LogoSVG}</div>

        {/* device name */}
        <div style={{ fontSize: device.length > 20 ? 80 : 105, fontWeight: 900, textAlign: 'center', marginBottom: 20 }}>{device}</div>

        {/* hero area – single child guaranteed */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div style={{ position: 'absolute', width: 850, height: 850, background: `radial-gradient(circle, #${glowHex}33 0%, transparent 70%)`, borderRadius: '50%' }} />
          {imageUrl ? <img src={imageUrl} style={{ width: 950, height: 950, objectFit: 'contain' }} /> : DeviceFallback}
        </div>

        {/* price & cta */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
          <div style={{ display: 'flex', background: '#3EB489', padding: '20px 80px', borderRadius: 25, marginBottom: 40, boxShadow: '0 25px 50px rgba(62, 180, 137, 0.3)' }}>
            <span style={{ fontSize: 85, fontWeight: 900, color: '#000' }}>KES {price}</span>
          </div>
          <div style={{ display: 'flex', width: '100%', background: '#111', padding: '40px', borderRadius: 30, border: '1px solid #222', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#C5A059', fontSize: 24, fontWeight: 800 }}>WHATSAPP TO ORDER</span>
              <span style={{ fontSize: 45, fontWeight: 900 }}>0704 554 445</span>
            </div>
            <div style={{ display: 'flex', background: '#C5A059', color: 'black', padding: '15px 40px', borderRadius: 15, fontWeight: 900, fontSize: 28 }}>BUY NOW</div>
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
