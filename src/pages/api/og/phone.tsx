import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// Simplified Icon Helper (Satori-friendly)
const Icon = ({ path }: { path: JSX.Element }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const device = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
  const price = searchParams.get('price') || 'Contact for Price';
  const imageUrl = searchParams.get('image');
  const ram = searchParams.get('ram') || '8GB';
  const rom = searchParams.get('rom') || '128GB';
  const bat = searchParams.get('bat') || '5000mAh';
  const scr = searchParams.get('scr') || '6.5"';

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        background: '#0a0a0a',
        color: 'white', fontFamily: 'sans-serif',
        padding: '80px',
      }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#C5A059', padding: '20px 40px', borderRadius: 18, marginBottom: 40 }}>
          <span style={{ fontSize: 32, fontWeight: 900, color: '#000' }}>TRIPLE K</span>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#000' }}>PREMIUM PHONES</span>
        </div>

        {/* TITLE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 90, fontWeight: 900, textAlign: 'center' }}>{device}</span>
        </div>

        {/* IMAGE AREA */}
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          {imageUrl ? (
            <img src={imageUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <div style={{ width: 600, height: 600, borderRadius: 300, background: 'radial-gradient(circle, #C5A059 0%, transparent 70%)', opacity: 0.3 }} />
          )}
        </div>

        {/* SPECS SECTION */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon path={<><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="6" y1="5" x2="6" y2="9"/></>} />
            <span style={{ marginLeft: 10, fontSize: 28 }}>{ram}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon path={<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>} />
            <span style={{ marginLeft: 10, fontSize: 28 }}>{rom}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon path={<><rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/></>} />
            <span style={{ marginLeft: 10, fontSize: 28 }}>{bat}</span>
          </div>
        </div>

        {/* PRICE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
          <div style={{ background: '#3EB489', padding: '20px 60px', borderRadius: 20 }}>
            <span style={{ fontSize: 70, fontWeight: 900, color: '#000' }}>KES {price}</span>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 60, padding: '30px', background: 'rgba(255,255,255,0.05)', borderRadius: 20 }}>
          <span style={{ fontSize: 30, fontWeight: 800 }}>📞 0704 554 445</span>
          <span style={{ fontSize: 24, color: '#C5A059' }}>📍 CBD, NAIROBI</span>
        </div>

      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
