import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  
  const platform = searchParams.get('platform') || 'whatsapp'; 
  const width = 1080;
  let height = 1920;
  let paddingBottom = 60; 

  if (platform === 'facebook') {
    height = 1350; 
  } else if (platform === 'tiktok') {
    paddingBottom = 320; 
  }

  const device = searchParams.get('device')?.toUpperCase() || 'IPHONE 16 PRO MAX';
  const price  = searchParams.get('price') || '150,000';
  const imageUrl = searchParams.get('image');
  
  const ram = searchParams.get('ram') || '8GB';
  const rom = searchParams.get('rom') || '256GB';
  const bat = searchParams.get('bat') || '5000mAh';
  const scr = searchParams.get('scr') || "6.9''";

  const glowHex = searchParams.get('glow') || 'C5A059';

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#050505', color: 'white',
        fontFamily: 'sans-serif',
        padding: `60px 60px ${paddingBottom}px 60px`,
      }}>
        
        {/* 1. TOP LOGO */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={320} height={90} style={{ objectFit: 'contain' }} />
        </div>

        {/* 2. BIG DEVICE NAME */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ 
            fontSize: device.length > 15 ? 90 : 135, 
            fontWeight: 900, 
            textAlign: 'center', 
            letterSpacing: -5, 
            lineHeight: 0.85 
          }}>
            {device}
          </span>
          <div style={{ display: 'flex', height: 4, width: 120, background: '#C5A059', marginTop: 25 }} />
        </div>

        {/* 3. HERO AREA - Fixed Height to prevent "Line" errors */}
        <div style={{ display: 'flex', height: 850, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: 20 }}>
          <div style={{ 
            position: 'absolute', width: 800, height: 800, 
            background: `radial-gradient(circle, #${glowHex}25 0%, transparent 70%)`, 
            borderRadius: '500px', display: 'flex' 
          }} />
          {imageUrl && (
            <img 
              src={imageUrl} 
              width={900} 
              height={900} 
              style={{ objectFit: 'contain', zIndex: 10 }} 
            />
          )}
        </div>

        {/* 4. SPECS GRID */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 15, marginBottom: 40 }}>
          {[
            { label: 'RAM', val: ram },
            { label: 'ROM', val: rom },
            { label: 'BATTERY', val: bat },
            { label: 'SCREEN', val: scr }
          ].map((spec) => (
            <div key={spec.label} style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', 
              background: '#111', padding: '15px 10px', borderRadius: 15, border: '1px solid #222', flex: 1
            }}>
              <span style={{ color: '#C5A059', fontSize: 13, fontWeight: 800, marginBottom: 5 }}>{spec.label}</span>
              <span style={{ fontSize: 24, fontWeight: 900 }}>{spec.val}</span>
            </div>
          ))}
        </div>

        {/* 5. PRICE & ORDER NOW */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
          <div style={{ 
            display: 'flex', backgroundColor: '#3EB489', 
            padding: '20px 50px', borderRadius: '20px 0 0 20px', border: '1px solid #3EB489'
          }}>
            <span style={{ fontSize: 70, fontWeight: 900, color: '#000' }}>KES {price}</span>
          </div>
          <div style={{ 
            display: 'flex', backgroundColor: '#fff', 
            padding: '20px 40px', borderRadius: '0 20px 20px 0',
            height: 110, alignItems: 'center', border: '1px solid #fff'
          }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: '#000' }}>ORDER NOW</span>
          </div>
        </div>

        {/* 6. FOOTER */}
        <div style={{ 
          display: 'flex', width: '100%', background: '#0a0a0a', padding: '35px', 
          borderRadius: 35, border: '1px solid #1a1a1a', justifyContent: 'space-between', alignItems: 'center' 
        }}>
           <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={55} height={55} style={{ marginRight: 15 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#C5A059', fontSize: 18, fontWeight: 800 }}>WHATSAPP</span>
                <span style={{ fontSize: 38, fontWeight: 900 }}>0704 554 445</span>
              </div>
           </div>
           
           <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" width={40} height={40} style={{ marginRight: 15 }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ color: '#C5A059', fontSize: 18, fontWeight: 800 }}>LOCATION</span>
                <span style={{ fontSize: 22, fontWeight: 900 }}>CBD, NAIROBI</span>
              </div>
           </div>
        </div>
      </div>
    ),
    { width, height }
  );
}
