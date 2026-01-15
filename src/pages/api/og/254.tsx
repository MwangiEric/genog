import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  // --- safe defaults ---
  const device   = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
  const price    = searchParams.get('price')  || 'Contact for Price';
  const imageUrl = searchParams.get('image');
  const glowHex  = /^[0-9A-F]{6}$/i.test(searchParams.get('glow') || '')
                 ? (searchParams.get('glow') as string)
                 : 'C5A059';

  // --- svg icons (inline, zero network) ---
  const IconRAM = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <line x1="6" y1="5" x2="6" y2="9"/>
      <line x1="14" y1="5" x2="14" y2="9"/>
    </svg>
  );
  const IconROM = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5">
      <path d="M12 2v10m0 0l-3-3m3 3l3-3"/>
      <path d="M2 17l.6-3a2 2 0 0 1 2-1.6h14.8a2 2 0 0 1 2 1.6l.6 3a2 2 0 0 1-2 2.4H4a2 2 0 0 1-2-2.4z"/>
    </svg>
  );
  const IconBAT = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5">
      <rect x="2" y="7" width="16" height="10" rx="2"/>
      <line x1="22" y1="11" x2="22" y2="13"/>
    </svg>
  );
  const IconSCR = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M7 12h10M12 7v10"/>
    </svg>
  );

  // --- fallback rectangle when no image supplied ---
  const FallbackRect = (
    <div
      style={{
        width: 950,
        height: 950,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg,#222 0%, #111 100%)',
        border: '2px dashed #333',
        borderRadius: 24,
        fontSize: 40,
        fontWeight: 700,
        color: '#555',
      }}
    >
      DEVICE IMAGE
    </div>
  );

  // --- render ---
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
          fontFamily: 'sans-serif', // system font only
          padding: '60px 0 40px 0',
        }}
      >
        {/* header */}
        <div style={{ fontSize: 55, fontWeight: 900, color: '#C5A059', letterSpacing: 10, marginBottom: 30 }}>
          TRIPLE K
        </div>

        {/* device name */}
        <div style={{ fontSize: device.length > 20 ? 80 : 105, fontWeight: 900, textAlign: 'center', marginBottom: 20 }}>
          {device}
        </div>

        {/* image area – single child guaranteed */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div style={{ position: 'absolute', width: 850, height: 850, background: `radial-gradient(circle, #${glowHex}33 0%, transparent 70%)`, borderRadius: '50%' }} />
          {imageUrl ? (
            <img src={imageUrl} style={{ width: 950, height: 950, objectFit: 'contain' }} />
          ) : (
            FallbackRect
          )}
        </div>

        {/* specs row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, margin: '35px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>{IconRAM}<span style={{ marginLeft: 10, fontSize: 24, fontWeight: 700 }}>{ram}</span></div>
          <div style={{ display: 'flex', alignItems: 'center' }}>{IconROM}<span style={{ marginLeft: 10, fontSize: 24, fontWeight: 700 }}>{rom}</span></div>
          <div style={{ display: 'flex', alignItems: 'center' }}>{IconBAT}<span style={{ marginLeft: 10, fontSize: 24, fontWeight: 700 }}>{bat}</span></div>
          <div style={{ display: 'flex', alignItems: 'center' }}>{IconSCR}<span style={{ marginLeft: 10, fontSize: 24, fontWeight: 700 }}>{scr}</span></div>
        </div>

        {/* price */}
        <div style={{ background: '#3EB489', padding: '20px 110px', borderRadius: 100, border: '5px solid #C5A059', marginBottom: 40 }}>
          <span style={{ fontSize: 85, fontWeight: 900, color: '#000' }}>KSH {price}</span>
        </div>

        {/* footer */}
        <div style={{ width: '100%', background: '#111', margin: '0 60px', padding: '40px', borderRadius: 45, border: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 45 }}>📞</span>
            <span style={{ fontSize: 45, fontWeight: 900, marginLeft: 15 }}>0715 130013</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#C5A059' }}>CBD, NAIROBI</span>
            <span style={{ fontSize: 16, color: '#777' }}>OPPOSITE MOI AVENUE</span>
          </div>
        </div>

        {/* bottom cta */}
        <div style={{ width: '100%', height: 130, background: '#800000', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '4px solid #C5A059', marginTop: 40 }}>
          <span style={{ fontSize: 45, fontWeight: 900, letterSpacing: 10, color: '#C5A059' }}>SHOP NOW ❯</span>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
    // fonts array intentionally omitted – system font only
  );
}
