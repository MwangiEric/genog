import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  // Dynamic Params
  const device   = searchParams.get('device') || 'PREMIUM DEVICE';
  const price    = searchParams.get('price')  || '0';
  const imageUrl = searchParams.get('image');
  const ram      = searchParams.get('ram')    || '8GB';
  const rom      = searchParams.get('rom')    || '128GB';
  const bat      = searchParams.get('bat')    || '5000mAh';
  
  const glowHex  = /^[0-9A-F]{6}$/i.test(searchParams.get('glow') || '') ? searchParams.get('glow') : 'C5A059';
  const fontSize = device.length > 15 ? 85 : 115;

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
        backgroundColor: '#050505', color: 'white', fontFamily: 'sans-serif', padding: '80px',
      }}>
        
        {/* 1. BRANDING (Image Link 1) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={400} height={120} style={{ objectFit: 'contain' }} />
        </div>

        {/* 2. TITLE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: fontSize, fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', lineHeight: 1, letterSpacing: -3 }}>
            {device}
          </span>
        </div>

        {/* 3. HERO (Image Link 2) */}
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', width: 850, height: 850, background: `radial-gradient(circle, #${glowHex}22 0%, transparent 70%)`, borderRadius: '50%' }} />
          {imageUrl && <img src={imageUrl} style={{ width: 900, height: 900, objectFit: 'contain', zIndex: 10 }} />}
        </div>

        {/* 4. SPECS (Text-Only for Stability) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 50 }}>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#111', padding: '20px 40px', borderRadius: 20, border: '1px solid #222' }}>
              <span style={{ color: '#C5A059', fontSize: 20, fontWeight: 800 }}>STORAGE</span>
              <span style={{ fontSize: 36, fontWeight: 900 }}>{ram}/{rom}</span>
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#111', padding: '20px 40px', borderRadius: 20, border: '1px solid #222' }}>
              <span style={{ color: '#C5A059', fontSize: 20, fontWeight: 800 }}>BATTERY</span>
              <span style={{ fontSize: 36, fontWeight: 900 }}>{bat}</span>
           </div>
        </div>

        {/* 5. PRICE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
          <div style={{ background: '#3EB489', padding: '25px 100px', borderRadius: 30, boxShadow: '0 20px 50px rgba(62, 180, 137, 0.3)' }}>
            <span style={{ fontSize: 100, fontWeight: 900, color: '#000' }}>KES {price}</span>
          </div>
        </div>

        {/* 6. CONTACT FOOTER */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#111', padding: '40px', borderRadius: 40, border: '1px solid #222' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#C5A059', fontSize: 22, fontWeight: 800 }}>WHATSAPP / CALL</span>
                <span style={{ fontSize: 50, fontWeight: 900 }}>0704 554 445</span>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ color: '#C5A059', fontSize: 22, fontWeight: 800 }}>LOCATION</span>
                <span style={{ fontSize: 28, fontWeight: 900 }}>CBD, NAIROBI</span>
             </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid #222', paddingTop: 25 }}>
             <span style={{ fontSize: 32, fontWeight: 900, color: '#C5A059', letterSpacing: 4 }}>WWW.TRIPPLEK.CO.KE</span>
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
