import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  // 1. Platform Detection & Fallback
  const platform = searchParams.get('platform')?.toLowerCase() || 'whatsapp'; 
  const width = 1080;
  let height = 1920; // Default (WhatsApp/TikTok Vertical)
  let paddingBottom = '60px'; 

  if (platform === 'facebook') {
    height = 1350; 
  } else if (platform === 'tiktok') {
    paddingBottom = '320px'; 
  }

  // 2. Content Fallbacks
  const device = searchParams.get('device')?.toUpperCase() || 'SMARTPHONE';
  const price  = searchParams.get('price') || 'TBD';
  const imageUrl = searchParams.get('image');
  const glowHex = searchParams.get('glow') || 'C5A059';

  // 3. Specs Fallbacks
  const ram = searchParams.get('ram') || '---';
  const rom = searchParams.get('rom') || '---';
  const bat = searchParams.get('bat') || '---';
  const cam = searchParams.get('cam') || '---';
  const scr = searchParams.get('scr') || '---';

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#050505', color: 'white',
        fontFamily: 'sans-serif',
        padding: `60px 50px ${paddingBottom} 50px`,
      }}>

        {/* TOP LOGO */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={320} height={90} style={{ objectFit: 'contain' }} />
        </div>

        {/* DEVICE NAME */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ 
            fontSize: device.length > 15 ? 80 : 120, 
            fontWeight: 900, textAlign: 'center', letterSpacing: -4, lineHeight: 0.9,
          }}>
            {device}
          </span>
          <div style={{ height: 4, width: 120, background: `#${glowHex}`, marginTop: 15 }} />
        </div>

        {/* HERO AREA (Image or Placeholder Rectangle) */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', width: 800, height: 800, 
            background: `radial-gradient(circle, #${glowHex}20 0%, transparent 70%)`, 
            borderRadius: '50%', display: 'flex' 
          }} />
          
          {imageUrl ? (
            <img src={imageUrl} style={{ width: '90%', height: '80%', objectFit: 'contain', zIndex: 10 }} />
          ) : (
            /* Fallback Rectangle if Image is Missing */
            <div style={{ 
                width: '60%', height: '70%', 
                borderRadius: 40, border: `2px dashed #${glowHex}50`,
                backgroundColor: '#0a0a0a', display: 'flex',
                alignItems: 'center', justifyContent: 'center', zIndex: 10
            }}>
                <span style={{ color: '#333', fontSize: 40, fontWeight: 800 }}>{device}</span>
            </div>
          )}
        </div>

        {/* SPECS GRID */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 40 }}>
          {[
            { label: 'SCREEN', val: scr },
            { label: 'RAM', val: ram },
            { label: 'STORAGE', val: rom },
            { label: 'BATTERY', val: bat },
            { label: 'CAMERA', val: cam }
          ].map((spec) => (
            <div key={spec.label} style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', 
              background: '#111', padding: '18px 20px', borderRadius: 18, border: '1px solid #252525',
              minWidth: '185px' 
            }}>
              <span style={{ color: `#${glowHex}`, fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{spec.label}</span>
              <span style={{ fontSize: 30, fontWeight: 900 }}>{spec.val}</span>
            </div>
          ))}
        </div>

        {/* PRICE SECTION */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 45 }}>
          <div style={{ 
            display: 'flex', backgroundColor: '#3EB489', 
            padding: '20px 70px', borderRadius: 25,
            boxShadow: '0 15px 35px rgba(62, 180, 137, 0.3)'
          }}>
            <span style={{ fontSize: 85, fontWeight: 900, color: '#000' }}>KES {price}</span>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ 
          display: 'flex', width: '100%', background: '#0d0d0d', padding: '35px', 
          borderRadius: 35, border: '1px solid #1a1a1a', justifyContent: 'space-between', alignItems: 'center' 
        }}>
           <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={55} height={55} style={{ marginRight: 15 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: `#${glowHex}`, fontSize: 18, fontWeight: 800 }}>ORDER NOW</span>
                <span style={{ fontSize: 40, fontWeight: 900 }}>0704 554 445</span>
              </div>
           </div>

           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ color: `#${glowHex}`, fontSize: 18, fontWeight: 800 }}>LOCATION</span>
              <span style={{ fontSize: 24, fontWeight: 900 }}>CBD, NAIROBI</span>
           </div>
        </div>

        {/* WEBSITE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}>
          <span style={{ fontSize: 22, color: '#333', fontWeight: 800, letterSpacing: 8 }}>WWW.TRIPPLEK.CO.KE</span>
        </div>

      </div>
    ),
    { width, height }
  );
}
