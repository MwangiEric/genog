/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // 1. BUILD FIXES
    const width = 1080;
    const height = 1920;

    const device = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
    const price = searchParams.get('price') || 'TBD';
    const ram = searchParams.get('ram') || '---';
    const rom = searchParams.get('rom') || '---';
    const bat = searchParams.get('bat') || '---';
    const scr = searchParams.get('scr') || '---';
    const imageUrl = searchParams.get('image');

    const MAROON = '#800000';
    const GOLD = '#C5A059';
    const MINT = '#3EB489';

    return new ImageResponse(
      (
        <div style={{
          height: '100%', width: '100%',
          display: 'flex', flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          fontFamily: 'sans-serif',
          padding: '60px 50px',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden' // Keeps shapes inside the canvas
        }}>
          
          {/* --- GEOMETRIC BACKGROUND SHAPES (CSS ONLY) --- */}
          
          {/* Top Left: Large Maroon Circle */}
          <div style={{ 
            position: 'absolute', top: -150, left: -150, width: 600, height: 600, 
            borderRadius: 300, background: MAROON, opacity: 0.04, display: 'flex' 
          }} />

          {/* Top Right: Gold Diamond */}
          <div style={{ 
            position: 'absolute', top: 100, right: -100, width: 300, height: 300, 
            background: GOLD, opacity: 0.07, transform: 'rotate(45deg)', display: 'flex' 
          }} />

          {/* Bottom Left: Maroon Accent Square */}
          <div style={{ 
            position: 'absolute', bottom: 200, left: -50, width: 200, height: 200, 
            background: MAROON, opacity: 0.05, transform: 'rotate(15deg)', display: 'flex' 
          }} />

          {/* Bottom Right: Gold Large Circle */}
          <div style={{ 
            position: 'absolute', bottom: -100, right: -100, width: 500, height: 500, 
            borderRadius: 250, background: GOLD, opacity: 0.08, display: 'flex' 
          }} />

          {/* --- CONTENT LAYER --- */}

          {/* 1. TOP LOGO */}
          <div style={{ display: 'flex', marginBottom: 20 }}>
            <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={320} height={90} alt="Logo" style={{ objectFit: 'contain' }} />
          </div>

          {/* 2. DEVICE NAME */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ 
              fontSize: device.length > 15 ? 85 : 115, 
              fontWeight: 900, textAlign: 'center', letterSpacing: -4, lineHeight: 0.9,
              color: MAROON 
            }}>
              {device}
            </span>
            <div style={{ height: 6, width: 140, background: GOLD, marginTop: 15 }} />
          </div>

          {/* 3. HERO AREA */}
          <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* Glow behind phone */}
            <div style={{ 
              position: 'absolute', width: 850, height: 850, 
              background: 'radial-gradient(circle, rgba(197,160,89,0.12) 0%, transparent 70%)', 
              borderRadius: '50%', display: 'flex' 
            }} />
            
            {imageUrl && (
              <img src={imageUrl} alt="Phone" style={{ width: '92%', height: '82%', objectFit: 'contain', zIndex: 10 }} />
            )}
          </div>

          {/* 4. SPECS GRID */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 15, marginBottom: 40 }}>
            {[
              { label: 'SCREEN', val: scr },
              { label: 'RAM', val: ram },
              { label: 'STORAGE', val: rom },
              { label: 'BATTERY', val: bat }
            ].map((spec) => (
              <div key={spec.label} style={{ 
                display: 'flex', flexDirection: 'column', alignItems: 'center', 
                background: '#FFFFFF', padding: '20px 10px', borderRadius: 20, 
                border: '1px solid #f0f0f0', minWidth: '220px',
                boxShadow: '0 8px 15px rgba(0,0,0,0.03)'
              }}>
                <span style={{ color: GOLD, fontSize: 18, fontWeight: 800, marginBottom: 5 }}>{spec.label}</span>
                <span style={{ fontSize: 32, fontWeight: 900, color: '#333' }}>{spec.val}</span>
              </div>
            ))}
          </div>

          {/* 5. PRICE SECTION */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 50 }}>
            <div style={{ 
              display: 'flex', backgroundColor: MAROON, padding: '22px 90px', borderRadius: 25,
            }}>
              <span style={{ fontSize: 85, fontWeight: 900, color: '#FFFFFF' }}>KES {price}</span>
            </div>
          </div>

          {/* 6. FOOTER */}
          <div style={{ 
            display: 'flex', width: '100%', background: '#FFFFFF', padding: '35px', 
            borderRadius: 40, border: `1.5px solid ${GOLD}`, justifyContent: 'space-between', alignItems: 'center' 
          }}>
             <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={65} height={65} alt="WhatsApp" style={{ marginRight: 20 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: GOLD, fontSize: 16, fontWeight: 800 }}>WHATSAPP / CALL</span>
                  <span style={{ fontSize: 36, fontWeight: 900, color: MAROON }}>0733 565861</span>
                </div>
             </div>

             <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 20 }}>
                  <span style={{ color: GOLD, fontSize: 16, fontWeight: 800 }}>LOCATION</span>
                  <span style={{ fontSize: 24, fontWeight: 900, color: MAROON }}>CBD OPP. MKU</span>
                </div>
                <img src="https://ik.imagekit.io/ericmwangi/location.png" width={55} height={55} alt="Location" />
             </div>
          </div>

          {/* 7. WEBSITE */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
            <span style={{ fontSize: 22, color: GOLD, fontWeight: 800, letterSpacing: 10 }}>WWW.TRIPPLEK.CO.KE</span>
          </div>

        </div>
      ),
      { width, height }
    );
  } catch (e: any) {
    return new Response(`Generation failed`, { status: 500 });
  }
}
