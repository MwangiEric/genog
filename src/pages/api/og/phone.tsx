import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  
  // Platform Detection for WhatsApp/FB/TikTok
  const platform = searchParams.get('platform') || 'whatsapp'; 
  const width = 1080;
  let height = 1920;
  let paddingBottom = '60px'; 

  if (platform === 'facebook') {
    height = 1350; 
  } else if (platform === 'tiktok') {
    paddingBottom = '320px'; // Safe zone for TikTok UI
  }

  // Content Params
  const device = searchParams.get('device')?.toUpperCase() || 'IPHONE 16 PRO MAX';
  const price  = searchParams.get('price') || '150,000';
  const imageUrl = searchParams.get('image');
  
  // All Specs Params
  const ram = searchParams.get('ram') || '8GB';
  const rom = searchParams.get('rom') || '256GB';
  const bat = searchParams.get('bat') || '5000mAh';
  const cam = searchParams.get('cam') || '48MP';

  const glowHex = searchParams.get('glow') || 'C5A059';

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#050505', color: 'white',
        fontFamily: 'sans-serif',
        padding: `60px 60px ${paddingBottom} 60px`,
      }}>
        
        {/* 1. TOP LOGO */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={320} height={90} style={{ objectFit: 'contain' }} />
        </div>

        {/* 2. BIG DEVICE NAME (High-End Typography) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ 
            fontSize: device.length > 15 ? 90 : 130, 
            fontWeight: 900, 
            textAlign: 'center', 
            letterSpacing: -5, 
            lineHeight: 0.85,
            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            {device}
          </span>
          <div style={{ height: 4, width: 100, background: '#C5A059', marginTop: 20 }} />
        </div>

        {/* 3. HERO AREA */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', width: 900, height: 900, 
            background: `radial-gradient(circle, #${glowHex}20 0%, transparent 75%)`, 
            borderRadius: '50%', display: 'flex' 
          }} />
          {imageUrl && <img src={imageUrl} style={{ width: '95%', height: '85%', objectFit: 'contain', zIndex: 10 }} />}
        </div>

        {/* 4. ALL SPECS GRID (Clean & Professional) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 15, marginBottom: 40 }}>
          {[
            { label: 'RAM', val: ram },
            { label: 'STORAGE', val: rom },
            { label: 'BATTERY', val: bat },
            { label: 'CAMERA', val: cam }
          ].map((spec) => (
            <div key={spec.label} style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', 
              background: '#111', padding: '15px 25px', borderRadius: 15, border: '1px solid #222' 
            }}>
              <span style={{ color: '#C5A059', fontSize: 14, fontWeight: 800, marginBottom: 5 }}>{spec.label}</span>
              <span style={{ fontSize: 24, fontWeight: 900 }}>{spec.val}</span>
            </div>
          ))}
        </div>

        {/* 5. PRICE SECTION (istreet Green Style) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 50 }}>
          <div style={{ 
            display: 'flex', backgroundColor: '#3EB489', 
            padding: '20px 80px', borderRadius: 20,
            boxShadow: '0 20px 40px rgba(62, 180, 137, 0.2)'
          }}>
            <span style={{ fontSize: 80, fontWeight: 900, color: '#000' }}>KES {price}</span>
          </div>
        </div>

        {/* 6. FOOTER: WHATSAPP & LOCATION ICONS */}
        <div style={{ 
          display: 'flex', width: '100%', background: '#0a0a0a', padding: '35px', 
          borderRadius: 35, border: '1px solid #1a1a1a', justifyContent: 'space-between', alignItems: 'center' 
        }}>
           {/* WhatsApp */}
           <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={55} height={55} style={{ marginRight: 15 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#C5A059', fontSize: 18, fontWeight: 800 }}>ORDER NOW</span>
                <span style={{ fontSize: 38, fontWeight: 900 }}>0704 554 445</span>
              </div>
           </div>
           
           {/* Location */}
           <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" width={40} height={40} style={{ marginRight: 15 }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ color: '#C5A059', fontSize: 18, fontWeight: 800 }}>LOCATION</span>
                <span style={{ fontSize: 22, fontWeight: 900 }}>CBD, NAIROBI</span>
              </div>
           </div>
        </div>

        {/* WEBSITE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}>
          <span style={{ fontSize: 24, color: '#333', fontWeight: 800, letterSpacing: 6 }}>WWW.TRIPPLEK.CO.KE</span>
        </div>

      </div>
    ),
    { width, height }
  );
}
