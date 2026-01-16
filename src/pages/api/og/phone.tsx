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
  
  const glowHex  = /^[0-9A-F]{6}$/i.test(searchParams.get('glow') || '')
                 ? searchParams.get('glow')
                 : 'C5A059';

  const fontSize = device.length > 15 ? 80 : 110;

  return new ImageResponse(
    (
      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#050505',
        color: 'white',
        fontFamily: 'sans-serif',
        padding: '80px',
        position: 'relative',
      }}>
        
        {/* 1. TOP BRANDING LOGO */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <img 
            src="https://ik.imagekit.io/ericmwangi/tklogo.png" 
            width={380} 
            height={120} 
            style={{ objectFit: 'contain' }} 
          />
        </div>

        {/* 2. PRODUCT TITLE */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ 
            fontSize: fontSize, 
            fontWeight: 900, 
            textAlign: 'center', 
            textTransform: 'uppercase', 
            letterSpacing: -4, 
            lineHeight: 1.1 
          }}>
            {device}
          </span>
        </div>

        {/* 3. HERO IMAGE AREA */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', 
            width: 800, 
            height: 800, 
            background: `radial-gradient(circle, #${glowHex}33 0%, transparent 70%)`, 
            borderRadius: '50%' 
          }} />
          
          {imageUrl && (
            <img src={imageUrl} style={{ width: 900, height: 900, objectFit: 'contain', zIndex: 10 }} />
          )}
        </div>

        {/* 4. SPECS SECTION */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 50, marginBottom: 50 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: '#C5A059', fontSize: 22, fontWeight: 800 }}>RAM</span>
            <span style={{ fontSize: 36, fontWeight: 900 }}>{ram}</span>
          </div>
          <div style={{ width: 2, height: 50, background: '#222' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: '#C5A059', fontSize: 22, fontWeight: 800 }}>ROM</span>
            <span style={{ fontSize: 36, fontWeight: 900 }}>{rom}</span>
          </div>
          <div style={{ width: 2, height: 50, background: '#222' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: '#C5A059', fontSize: 22, fontWeight: 800 }}>BATTERY</span>
            <span style={{ fontSize: 36, fontWeight: 900 }}>{bat}</span>
          </div>
        </div>

        {/* 5. PRICE BADGE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 50 }}>
          <div style={{ 
            display: 'flex', 
            background: '#3EB489', 
            padding: '25px 100px', 
            borderRadius: 30,
            boxShadow: '0 20px 40px rgba(62, 180, 137, 0.3)' 
          }}>
            <span style={{ fontSize: 95, fontWeight: 900, color: '#000' }}>
              KES {price}
            </span>
          </div>
        </div>

        {/* 6. CONTACT FOOTER (New Icons & Website) */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%', 
          background: '#111', 
          padding: '40px', 
          borderRadius: 40, 
          border: '1px solid #222'
        }}>
          {/* Row 1: WhatsApp & Call */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={45} height={45} />
              <span style={{ fontSize: 38, fontWeight: 900, marginLeft: 15 }}>0704 554 445</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://ik.imagekit.io/ericmwangi/call.png" width={40} height={40} />
              <span style={{ fontSize: 38, fontWeight: 900, marginLeft: 15 }}>CALL NOW</span>
            </div>
          </div>

          {/* Row 2: Website CTA */}
          <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid #222', paddingTop: 25 }}>
            <img src="https://ik.imagekit.io/ericmwangi/web.png" width={32} height={32} />
            <span style={{ fontSize: 28, fontWeight: 800, color: '#C5A059', marginLeft: 15, letterSpacing: 2 }}>
              WWW.TRIPPLEK.CO.KE
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
