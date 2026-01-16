import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

/* ----------  social PNG icons (external) ---------- */
const WhatsApp = 'https://ik.imagekit.io/ericmwangi/whatsapp.png';
const Web = 'https://ik.imagekit.io/ericmwangi/whatsapp.png';
const Location = 'https://ik.imagekit.io/ericmwangi/whatsapp.png';

/* ----------  spec icons (inline vector) ---------- */
const IconRAM = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2">
    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="6" y1="5" x2="6" y2="9"/><line x1="14" y1="5" x2="14" y2="9"/>
  </svg>
);
const IconROM = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2">
    <path d="M12 2v10m0 0l-3-3m3 3l3-3"/><path d="M2 17l.6-3a2 2 0 0 1 2-1.6h14.8a2 2 0 0 1 2 1.6l.6 3a2 2 0 0 1-2 2.4H4a2 2 0 0 1-2-2.4z"/>
  </svg>
);
const IconBAT = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2">
    <rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/>
  </svg>
);
const IconSCR = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 12h10M12 7v10"/>
  </svg>
);

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const device   = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
  const price    = searchParams.get('price')  || 'Contact for Price';
  const imageUrl = searchParams.get('image');
  const ram      = searchParams.get('ram') || '8GB';
  const rom      = searchParams.get('rom') || '128GB';
  const bat      = searchParams.get('bat') || '5000mAh';
  const scr      = searchParams.get('scr') || '6.5"';
  const glowHex  = /^[0-9A-F]{6}$/i.test(searchParams.get('glow') || '') ? searchParams.get('glow') : 'C5A059';

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)',
        color: 'white', fontFamily: 'sans-serif',
        padding: '80px', position: 'relative',
      }}>

        {/* 1.  GOLD TOP BAR  */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#C5A059', padding: '20px 40px', borderRadius: 18, marginBottom: 40 }}>
          <span style={{ fontSize: 32, fontWeight: 900, color: '#000' }}>TRIPLE K</span>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#000' }}>PREMIUM PHONES</span>
        </div>

        {/* 2.  DEVICE TITLE  */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: device.length > 20 ? 80 : 105, fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', letterSpacing: -4, lineHeight: 1 }}>
            {device}
          </span>
        </div>

        {/* 3.  HERO SECTION – glass plate + glow + phone  */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          {/* back glow */}
          <div style={{ position: 'absolute', width: 900, height: 900, background: `radial-gradient(circle, #${glowHex}44 0%, transparent 70%)`, borderRadius: '50%' }} />
          {/* glass plate */}
          <div style={{ position: 'absolute', width: 980, height: 980, backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 48 }} />
          {/* phone image */}
          {imageUrl
            ? <img src={imageUrl} style={{ width: 950, height: 950, objectFit: 'contain', zIndex: 10 }} />
            : <div style={{ width: 950, height: 950, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.3)', border: '2px dashed #333', borderRadius: 24, fontSize: 40, color: '#555' }}>DEVICE IMAGE</div>
          }
        </div>

        {/* 4.  SPECS – icons + labels  */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 35, gap: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>{IconRAM}<span style={{ marginLeft: 10, fontSize: 26, fontWeight: 700 }}>{ram}</span></div>
          <div style={{ display: 'flex', alignItems: 'center' }}>{IconROM}<span style={{ marginLeft: 10, fontSize: 26, fontWeight: 700 }}>{rom}</span></div>
          <div style={{ display: 'flex', alignItems: 'center' }}>{IconBAT}<span style={{ marginLeft: 10, fontSize: 26, fontWeight: 700 }}>{bat}</span></div>
          <div style={{ display: 'flex', alignItems: 'center' }}>{IconSCR}<span style={{ marginLeft: 10, fontSize: 26, fontWeight: 700 }}>{scr}</span></div>
        </div>

        {/* 5.  PRICE BADGE  */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <div style={{ display: 'flex', background: '#3EB489', padding: '20px 80px', borderRadius: 25, boxShadow: '0 25px 50px rgba(62, 180, 137, 0.3)' }}>
            <span style={{ fontSize: 85, fontWeight: 900, color: '#000' }}>KES {price}</span>
          </div>
        </div>

        {/* 6.  CONTACT BAR – glass + social icons  */}
        <div style={{ display: 'flex', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', marginTop: 40, padding: '30px 40px', borderRadius: 30, justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img src={WhatsApp} width={36} height={36} style={{ objectFit: 'contain' }} />
            <span style={{ fontSize: 32, fontWeight: 900 }}>0704 554 445</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img src={Web}      width={36} height={36} style={{ objectFit: 'contain' }} />
            <img src={Location} width={36} height={36} style={{ objectFit: 'contain' }} />
          </div>
        </div>

        {/* 7.  GOLD CTA BAR  */}
        <div style={{ display: 'flex', background: '#C5A059', height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginTop: 30, boxShadow: '0 20px 40px rgba(197,160,89,0.4)' }}>
          <span style={{ fontSize: 38, fontWeight: 900, letterSpacing: 6, color: '#000' }}>SHOP NOW ❯</span>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
