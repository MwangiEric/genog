import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  // Dynamic Params
  const device   = searchParams.get('device') || 'PREMIUM DEVICE';
  const price    = searchParams.get('price')  || '0';
  const imageUrl = searchParams.get('image');
  
  // Specs
  const ram      = searchParams.get('ram')    || '8GB';
  const rom      = searchParams.get('rom')    || '128GB';
  const cpu      = searchParams.get('cpu')    || 'Octa-core';
  const cam      = searchParams.get('cam')    || '50MP';

  const glowHex  = /^[0-9A-F]{6}$/i.test(searchParams.get('glow') || '') ? searchParams.get('glow') : 'C5A059';
  const fontSize = device.length > 15 ? 80 : 110;

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
        backgroundColor: '#050505', color: 'white', fontFamily: 'sans-serif', padding: '70px',
      }}>
        
        {/* LOGO */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={350} height={100} style={{ objectFit: 'contain' }} />
        </div>

        {/* TITLE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: fontSize, fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', lineHeight: 1 }}>
            {device}
          </span>
        </div>

        {/* HERO */}
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', width: 800, height: 800, background: `radial-gradient(circle, #${glowHex}22 0%, transparent 70%)`, borderRadius: '50%' }} />
          {imageUrl && <img src={imageUrl} style={{ width: 850, height: 850, objectFit: 'contain', zIndex: 10 }} />}
        </div>

        {/* SPECS GRID (Using your new icons) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 40, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#111', padding: '15px 25px', borderRadius: 15 }}>
            <img src="https://ik.imagekit.io/ericmwangi/processor.png" width={30} height={30} />
            <span style={{ marginLeft: 12, fontSize: 24, fontWeight: 700 }}>{cpu}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#111', padding: '15px 25px', borderRadius: 15 }}>
            <img src="https://ik.imagekit.io/ericmwangi/camera.png" width={30} height={30} />
            <span style={{ marginLeft: 12, fontSize: 24, fontWeight: 700 }}>{cam}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#111', padding: '15px 25px', borderRadius: 15 }}>
            <img src="https://ik.imagekit.io/ericmwangi/memory.png" width={30} height={30} />
            <span style={{ marginLeft: 12, fontSize: 24, fontWeight: 700 }}>{ram}/{rom}</span>
          </div>
        </div>

        {/* PRICE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <div style={{ background: '#3EB489', padding: '20px 80px', borderRadius: 25 }}>
            <span style={{ fontSize: 85, fontWeight: 900, color: '#000' }}>KES {price}</span>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#111', padding: '35px', borderRadius: 35, border: '1px solid #222' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={40} height={40} />
              <span style={{ fontSize: 36, fontWeight: 900, marginLeft: 12 }}>0704 554 445</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" width={30} height={30} />
              <span style={{ fontSize: 24, fontWeight: 700, marginLeft: 10, color: '#C5A059' }}>CBD, NAIROBI</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid #222', paddingTop: 20 }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: '#C5A059', letterSpacing: 2 }}>WWW.TRIPPLEK.CO.KE</span>
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
