// /api/og/phone.ts
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
  <div style={{ width: 950, height: 950, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#222 0%, #111 100%)', border: '2px dashed #333', borderRadius: 24, fontSize: 40, color: '#555' }}>DEVICE IMAGE</div>
);

/* ----------  icons  ---------- */
const IconRAM = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5">
    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="6" y1="5" x2="6" y2="9"/><line x1="14" y1="5" x2="14" y2="9"/>
  </svg>
);
const IconROM = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5">
    <path d="M12 2v10m0 0l-3-3m3 3l3-3"/><path d="M2 17l.6-3a2 2 0 0 1 2-1.6h14.8a2 2 0 0 1 2 1.6l.6 3a2 2 0 0 1-2 2.4H4a2 2 0 0 1-2-2.4z"/>
  </svg>
);
const IconBAT = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5">
    <rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/>
  </svg>
);
const IconSCR = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 12h10M12 7v10"/>
  </svg>
);

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  // -------  required fields  -------
  const device   = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
  const price    = searchParams.get('price')  || 'Contact for Price';
  const imageUrl = searchParams.get('image');

  // -------  optional specs (with fall-backs)  -------
  const ram = searchParams.get('ram') || '8GB';
  const rom = searchParams.get('rom') || '128GB';
  const bat = searchParams.get('bat') || '5000mAh';
  const scr = searchParams.get('scr') || '6.5"';

  // -------  glow validator  -------
  const glowHex = /^[0-9A-F]{6}$/i.test(searchParams.get('glow') || '') ? searchParams.get('glow') : 'C5A059';

  return new ImageResponse(
    (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#050505', color: 'white', fontFamily: 'sans-serif', padding: '60px 0 40px 0' }}>
        {/* logo */}
        <div style={{ marginBottom: 30 }}>{LogoSVG}</div>

        {/* device name */}
        <div style={{ fontSize: device.length > 20 ? 80 : 105, fontWeight: 900, textAlign: 'center', marginBottom: 20 }}>{device}</div>

        {/* hero image – single child only */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div style={{ position: 'absolute', width: 850, height: 850, background: `radial-gradient(circle, #${glowHex}33 0%, transparent 70%)`, borderRadius: '50%' }} />
          {imageUrl ? <img src={imageUrl} style={{ width: 950, height: 950, objectFit: 'contain' }} /> : DeviceFallback}
        </div>

        {/* specs row – explicit flex parent, multiple children allowed */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, margin: '35px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>{IconRAM}<span style={{ marginLeft: 10, fontSize: 24, fontWeight: 700 }}>{ram}</span></div>
          <div style={{ display: 'flex', alignItems: 'center' }}>{IconROM}<span style={{ marginLeft: 10, fontSize: 24, fontWeight: 700 }}>{rom}</span></div>
          <div style={{ display: 'flex', alignItems: 'center' }}>{IconBAT}<span style={{ marginLeft: 10, fontSize: 24, fontWeight: 700 }}>{bat}</span></div>
          <div style={{ display: 'flex', alignItems: 'center' }}>{IconSCR}<span style={{ marginLeft: 10, fontSize: 24, fontWeight: 700 }}>{scr}</span></div>
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
