import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  // 1. Platform Detection
  const platform = searchParams.get('platform')?.toLowerCase() || 'whatsapp'; 
  const width = 1080;
  let height = 1920; 
  let paddingBottom = '60px'; 

  if (platform === 'facebook') {
    height = 1350; 
  } else if (platform === 'tiktok') {
    paddingBottom = '320px'; 
  }

  // Brand Palette
  const MAROON = '#800000';
  const GOLD = '#C5A059';
  const MINT = '#3EB489';
  const DARK_BG = '#050505';

  // Content Params
  const device = searchParams.get('device')?.toUpperCase() || 'PREMIUM SMARTPHONE';
  const price  = searchParams.get('price') || 'TBD';
  const imageUrl = searchParams.get('image');

  // Specs (Camera Removed, focus on 4 main specs)
  const ram = searchParams.get('ram') || '---';
  const rom = searchParams.get('rom') || '---';
  const bat = searchParams.get('bat') || '---';
  const scr = searchParams.get('scr') || '---';

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: DARK_BG, color: 'white',
        fontFamily: 'sans-serif',
        padding: `60px 50px ${paddingBottom} 50px`,
      }}>

        {/* 1. TOP LOGO */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={320} height={90} style={{ objectFit: 'contain' }} />
        </div>

        {/* 2. DEVICE NAME */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ 
            fontSize: device.length > 15 ? 80 : 120, 
            fontWeight: 900, textAlign: 'center', letterSpacing: -4, color: 'white'
          }}>
            {device}
          </span>
          <div style={{ height: 6, width: 140, background: MAROON, marginTop: 15 }} />
        </div>

        {/* 3. HERO AREA (White Spotlight behind phone) */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          {/* Subtle White Glow to pull phone forward */}
          <div style={{ 
            position: 'absolute', width: 900, height: 900, 
            background: `radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)`, 
            borderRadius: '50%', display: 'flex' 
          }} />
          
          {imageUrl ? (
            <img src={imageUrl} style={{ width: '92%', height: '82%', objectFit: 'contain', zIndex: 10 }} />
          ) : (
            <div style={{ 
                width: '60%', height: '65%', 
                borderRadius: 40, border: `2px dashed rgba(255,255,255,0.2)`,
                backgroundColor: '#111', display: 'flex',
                alignItems: 'center', justifyContent: 'center', zIndex: 10
            }}>
                <span style={{ color: '#444', fontSize: 32, fontWeight: 800 }}>IMAGE PENDING</span>
            </div>
          )}
        </div>

        {/* 4. SPECS GRID (Gold & Large Text) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 15, marginBottom: 40 }}>
          {[
            { label: 'SCREEN', val: scr },
            { label: 'RAM', val: ram },
            { label: 'STORAGE', val: rom },
            { label: 'BATTERY', val: bat }
          ].map((spec) => (
            <div key={spec.label} style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', 
              background: '#0f0f0f', padding: '20px 10px', borderRadius: 20, 
              border: '1px solid #222', minWidth: '220px' 
            }}>
              <span style={{ color: GOLD, fontSize: 18, fontWeight: 800, marginBottom: 5 }}>{spec.label}</span>
              <span style={{ fontSize: 32, fontWeight: 900 }}>{spec.val}</span>
            </div>
          ))}
        </div>

        {/* 5. PRICE SECTION (Mint) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 50 }}>
          <div style={{ 
            display: 'flex', backgroundColor: MINT, 
            padding: '22px 90px', borderRadius: 25,
            boxShadow: `0 20px 50px rgba(62, 180, 137, 0.3)`
          }}>
            <span style={{ fontSize: 85, fontWeight: 900, color: '#000' }}>KES {price}</span>
          </div>
        </div>

        {/* 6. FOOTER (With New Location Icon) */}
        <div style={{ 
          display: 'flex', width: '100%', background: '#0a0a0a', padding: '35px', 
          borderRadius: 40, border: `1px solid ${MAROON}40`, justifyContent: 'space-between', alignItems: 'center' 
        }}>
           <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={60} height={60} style={{ marginRight: 20 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: GOLD, fontSize: 18, fontWeight: 800 }}>ORDER NOW</span>
                <span style={{ fontSize: 42, fontWeight: 900 }}>0704 554 445</span>
              </div>
           </div>

           <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 20 }}>
                <span style={{ color: GOLD, fontSize: 18, fontWeight: 800 }}>LOCATION</span>
                <span style={{ fontSize: 26, fontWeight: 900 }}>CBD, NAIROBI</span>
              </div>
              <img src="https://ik.imagekit.io/ericmwangi/location.png" width={55} height={55} />
           </div>
        </div>

        {/* 7. WEBSITE (With New Web Icon) */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <img src="https://ik.imagekit.io/ericmwangi/location.png" width={30} height={30} style={{ marginRight: 15, opacity: 0.6 }} />
          <span style={{ fontSize: 24, color: '#444', fontWeight: 800, letterSpacing: 10 }}>WWW.TRIPPLEK.CO.KE</span>
        </div>

      </div>
    ),
    { width, height }
  );
}
