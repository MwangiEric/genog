import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// High-performance SVG Icons (Satori-compatible)
const Icon = ({ children }: { children: any }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'flex' }}>
    {children}
  </svg>
);

const Icons = {
  cpu: <path d="M4 4h16v16H4V4zm4 5h8v6H8V9zM2 9h2m0 6H2m18-6h2m-2 6h2M9 2v2m6-2v2M9 20v2m6-2v2" />,
  cam: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
  mem: <><path d="M6 19L2 19L2 5L6 5M18 5L22 5L22 19L18 19"/><path d="M10 5L14 5L14 19L10 19"/><path d="M6 9L10 9M6 15L10 15M14 9L18 9M14 15L18 15"/></>,
  loc: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
  web: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const device = searchParams.get('device') || 'PREMIUM DEVICE';
  const price = searchParams.get('price') || '0';
  const imageUrl = searchParams.get('image');
  const ram = searchParams.get('ram') || '8GB';
  const rom = searchParams.get('rom') || '128GB';
  
  const glowHex = /^[0-9A-F]{6}$/i.test(searchParams.get('glow') || '') ? searchParams.get('glow') : 'C5A059';

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
        backgroundColor: '#050505', color: 'white', fontFamily: 'sans-serif', padding: '80px',
      }}>
        
        {/* LOGO (Only 1 external fetch for stability) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={380} height={120} style={{ objectFit: 'contain' }} />
        </div>

        {/* TITLE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: device.length > 15 ? 80 : 110, fontWeight: 900, textAlign: 'center', textTransform: 'uppercase' }}>
            {device}
          </span>
        </div>

        {/* HERO */}
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', width: 850, height: 850, background: `radial-gradient(circle, #${glowHex}22 0%, transparent 70%)`, borderRadius: '50%' }} />
          {imageUrl && <img src={imageUrl} style={{ width: 900, height: 900, objectFit: 'contain', zIndex: 10 }} />}
        </div>

        {/* SPECS SECTION (Using Inline SVG Icons) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 30, marginBottom: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#111', padding: '15px 25px', borderRadius: 20, border: '1px solid #222' }}>
            <Icon>{Icons.mem}</Icon>
            <span style={{ marginLeft: 15, fontSize: 30, fontWeight: 800 }}>{ram}/{rom}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#111', padding: '15px 25px', borderRadius: 20, border: '1px solid #222' }}>
            <Icon>{Icons.cam}</Icon>
            <span style={{ marginLeft: 15, fontSize: 30, fontWeight: 800 }}>50MP</span>
          </div>
        </div>

        {/* PRICE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 50 }}>
          <div style={{ background: '#3EB489', padding: '25px 100px', borderRadius: 35 }}>
            <span style={{ fontSize: 95, fontWeight: 900, color: '#000' }}>KES {price}</span>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#111', padding: '40px', borderRadius: 45, border: '1px solid #222' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
             <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 45, fontWeight: 900 }}>0704 554 445</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon>{Icons.loc}</Icon>
                <span style={{ fontSize: 24, fontWeight: 800, marginLeft: 10, color: '#C5A059' }}>CBD, NAIROBI</span>
             </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid #222', paddingTop: 25 }}>
             <Icon>{Icons.web}</Icon>
             <span style={{ fontSize: 28, fontWeight: 800, color: '#C5A059', marginLeft: 15, letterSpacing: 2 }}>WWW.TRIPPLEK.CO.KE</span>
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
