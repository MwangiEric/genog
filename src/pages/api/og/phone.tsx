import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  // Core Data
  const device   = searchParams.get('device') || 'PREMIUM DEVICE';
  const price    = searchParams.get('price')  || '0';
  const imageUrl = searchParams.get('image');
  
  // Minimal Specs
  const specs    = searchParams.get('specs')  || '8GB | 128GB | 5000mAh';
  
  const glowHex  = /^[0-9A-F]{6}$/i.test(searchParams.get('glow') || '') 
                 ? searchParams.get('glow') 
                 : 'C5A059';

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#050505', color: 'white',
        fontFamily: 'sans-serif', padding: '80px',
        position: 'relative',
      }}>
        
        {/* 1. LOGO */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <img 
            src="https://ik.imagekit.io/ericmwangi/tklogo.png" 
            width={350} height={100} 
            style={{ objectFit: 'contain' }} 
          />
        </div>

        {/* 2. DEVICE TITLE */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ 
            fontSize: device.length > 15 ? 80 : 110, 
            fontWeight: 900, 
            textAlign: 'center', 
            textTransform: 'uppercase', 
            letterSpacing: -4, 
            lineHeight: 1 
          }}>
            {device}
          </span>
          <span style={{ color: '#C5A059', fontSize: 32, fontWeight: 700, marginTop: 10 }}>
            {specs}
          </span>
        </div>

        {/* 3. HERO IMAGE */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', width: 900, height: 900, 
            background: `radial-gradient(circle, #${glowHex}22 0%, transparent 70%)`, 
            borderRadius: '50%' 
          }} />
          {imageUrl && (
            <img src={imageUrl} style={{ width: 950, height: 950, objectFit: 'contain', zIndex: 10 }} />
          )}
        </div>

        {/* 4. PRICE & CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
          <div style={{ 
            display: 'flex', background: '#3EB489', 
            padding: '20px 80px', borderRadius: 25, 
            marginBottom: 40, boxShadow: '0 25px 50px rgba(62, 180, 137, 0.3)' 
          }}>
            <span style={{ fontSize: 85, fontWeight: 900, color: '#000' }}>KES {price}</span>
          </div>

          <div style={{ 
            display: 'flex', width: '100%', background: '#111', 
            padding: '40px', borderRadius: 30, border: '1px solid #222', 
            justifyContent: 'space-between', alignItems: 'center' 
          }}>
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#C5A059', fontSize: 24, fontWeight: 800 }}>ORDER VIA WHATSAPP</span>
                <span style={{ fontSize: 45, fontWeight: 900 }}>0704 554 445</span>
             </div>
             <div style={{ 
                display: 'flex', background: '#C5A059', color: 'black', 
                padding: '15px 40px', borderRadius: 15, fontWeight: 900, fontSize: 28 
             }}>
                BUY NOW
             </div>
          </div>
          
          <span style={{ marginTop: 30, color: '#555', fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
            WWW.TRIPPLEK.CO.KE
          </span>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
