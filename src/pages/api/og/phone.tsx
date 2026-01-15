import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const device = searchParams.get('device') || 'PREMIUM DEVICE';
  const price = searchParams.get('price') || '0';
  const brand = searchParams.get('brand') || 'Certified';
  const specsRaw = searchParams.get('specs') || "";
  const specs = specsRaw.split(',').filter(Boolean).map(s => s.split(':'));

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#0A0A0A',
        padding: '80px 70px',
        fontFamily: 'sans-serif',
        position: 'relative',
        color: 'white',
      }}>
        {/* BACKGROUND DECORATION */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(197, 160, 89, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} />

        {/* 1. HEADER SECTION */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 60 }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={280} height={85} style={{ objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
             <div style={{ display: 'flex', background: 'rgba(197,160,89,0.1)', border: '1px solid #C5A059', padding: '8px 20px', borderRadius: 10 }}>
                <span style={{ color: '#C5A059', fontSize: 20, fontWeight: 800, letterSpacing: 1 }}>{brand.toUpperCase()} CERTIFIED</span>
             </div>
          </div>
        </div>

        {/* 2. HERO TITLES */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ display: 'flex', fontSize: 115, fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', letterSpacing: -5, lineHeight: 0.9 }}>
            {device}
          </span>
          <div style={{ display: 'flex', marginTop: 40, background: '#3EB489', padding: '15px 70px', borderRadius: 20, boxShadow: '0 20px 40px rgba(62, 180, 137, 0.25)' }}>
            <span style={{ display: 'flex', fontSize: 65, fontWeight: 800 }}>KES {price}</span>
          </div>
        </div>

        {/* 3. THE PIL HOLE (Floating Area) */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
           {/* Light accent for the phone to sit on */}
           <div style={{ display: 'flex', width: 800, height: 800, background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>

        {/* 4. SPECS GRID (2x2 Professional Layout) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 25, marginBottom: 150, justifyContent: 'center' }}>
          {specs.slice(0, 4).map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', width: '47%', background: '#111', border: '1px solid #222', padding: '25px', borderRadius: 25, alignItems: 'center' }}>
              <img src={`https://ik.imagekit.io/ericmwangi/${k.toLowerCase()}.png`} width={45} height={45} style={{ marginRight: 20 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ display: 'flex', fontSize: 16, color: '#C5A059', fontWeight: 800, textTransform: 'uppercase' }}>{k}</span>
                <span style={{ display: 'flex', fontSize: 26, fontWeight: 700 }}>{v}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 5. CALL TO ACTION FOOTER */}
        <div style={{ position: 'absolute', bottom: 70, left: 70, right: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#151515', padding: '40px 50px', borderRadius: 40, border: '1px solid #252525' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={50} height={50} style={{ marginRight: 20 }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ display: 'flex', fontSize: 16, color: '#888', fontWeight: 700 }}>RESERVE VIA WHATSAPP</span>
              <span style={{ display: 'flex', fontSize: 38, fontWeight: 900 }}>0704 554 445</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
             <span style={{ display: 'flex', fontSize: 22, fontWeight: 800, color: '#C5A059' }}>CBD, NAIROBI</span>
             <span style={{ display: 'flex', fontSize: 16, color: '#555' }}>Triple K Solutions</span>
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
