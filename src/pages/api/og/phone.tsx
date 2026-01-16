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

  // Responsive font size for device title
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
          {/* Background Glow */}
          <div style={{ 
            position: 'absolute', 
            width: 800, 
            height: 800, 
            background: `radial-gradient(circle, #${glowHex}33 0%, transparent 70%)`, 
            borderRadius: '50%' 
          }} />
          
          {imageUrl ? (
            <img src={imageUrl} style={{ width: 900, height: 900, objectFit: 'contain', zIndex: 10 }} />
          ) : (
            <div style={{ fontSize: 40, color: '#333' }}>[ NO IMAGE PROVIDED ]</div>
          )}
        </div>

        {/* 4. SPECS SECTION (Text-Based for Stability) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 50, marginBottom: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: '#C5A059', fontSize: 20, fontWeight: 800, marginBottom: 5 }}>RAM</span>
            <span style={{ fontSize: 34, fontWeight: 900 }}>{ram}</span>
          </div>
          <div style={{ width: 2, height: 50, background: '#222' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: '#C5A059', fontSize: 20, fontWeight: 800, marginBottom: 5 }}>STORAGE</span>
            <span style={{ fontSize: 34, fontWeight: 900 }}>{rom}</span>
          </div>
          <div style={{ width: 2, height: 50, background: '#222' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: '#C5A059', fontSize: 20, fontWeight: 800, marginBottom: 5 }}>BATTERY</span>
            <span style={{ fontSize: 34, fontWeight: 900 }}>{bat}</span>
          </div>
        </div>

        {/* 5. PRICE & CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Price Tag */}
          <div style={{ 
            display: 'flex', 
            background: '#3EB489', 
            padding: '25px 90px', 
            borderRadius: 30, 
            marginBottom: 50,
            boxShadow: '0 20px 40px rgba(62, 180, 137, 0.2)' 
          }}>
            <span style={{ fontSize: 90, fontWeight: 900, color: '#000' }}>
              KES {Number(price).toLocaleString()}
            </span>
          </div>

          {/* Contact Bar */}
          <div style={{ 
            display: 'flex', 
            width: '100%', 
            background: '#111', 
            padding: '45px', 
            borderRadius: 35, 
            border: '1px solid #222', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#C5A059', fontSize: 26, fontWeight: 800 }}>ORDER VIA WHATSAPP</span>
                <span style={{ fontSize: 48, fontWeight: 900 }}>0704 554 445</span>
             </div>
             <div style={{ 
               display: 'flex', 
               background: '#C5A059', 
               color: 'black', 
               padding: '18px 45px', 
               borderRadius: 18, 
               fontWeight: 900, 
               fontSize: 32,
               letterSpacing: 1
             }}>
                BUY NOW
             </div>
          </div>
        </div>
      </div>
    ),
    { 
      width: 1080, 
      height: 1920 
    }
  );
}
