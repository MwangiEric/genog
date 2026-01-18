/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Content Params
    const device = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
    const price = searchParams.get('price') || 'TBD';
    const ram = searchParams.get('ram') || '---';
    const rom = searchParams.get('rom') || '---';
    const bat = searchParams.get('bat') || '---';
    const scr = searchParams.get('scr') || '---';
    const imageUrl = searchParams.get('image');

    // Branding Constants
    const MAROON = '#800000';
    const GOLD = '#C5A059';
    const MINT = '#3EB489';

    return new ImageResponse(
      (
        <div style={{
          height: '100%', width: '100%',
          display: 'flex', flexDirection: 'column',
          backgroundColor: '#050505', color: 'white',
          fontFamily: 'sans-serif',
          padding: '60px 50px',
          alignItems: 'center'
        }}>

          {/* 1. TOP LOGO */}
          <div style={{ display: 'flex', marginBottom: 20 }}>
            <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={320} height={90} alt="Tripple K Logo" style={{ objectFit: 'contain' }} />
          </div>

          {/* 2. DEVICE NAME */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ 
              fontSize: device.length > 15 ? 80 : 110, 
              fontWeight: 900, textAlign: 'center', letterSpacing: -4, lineHeight: 0.9 
            }}>
              {device}
            </span>
            <div style={{ height: 6, width: 140, background: MAROON, marginTop: 15 }} />
          </div>

          {/* 3. HERO AREA */}
          <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div style={{ 
              position: 'absolute', width: 900, height: 900, 
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', 
              borderRadius: '50%', display: 'flex' 
            }} />
            
            {imageUrl ? (
              <img src={imageUrl} alt="Device Image" style={{ width: '92%', height: '82%', objectFit: 'contain', zIndex: 10 }} />
            ) : (
              <div style={{ 
                  width: '60%', height: '65%', borderRadius: 40, border: '2px dashed #333',
                  backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
              }}>
                  <span style={{ color: '#444', fontSize: 32, fontWeight: 800 }}>IMAGE PENDING</span>
              </div>
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
                background: '#0f0f0f', padding: '20px 10px', borderRadius: 20, 
                border: '1px solid #222', minWidth: '220px' 
              }}>
                <span style={{ color: GOLD, fontSize: 18, fontWeight: 800, marginBottom: 5 }}>{spec.label}</span>
                <span style={{ fontSize: 32, fontWeight: 900 }}>{spec.val}</span>
              </div>
            ))}
          </div>

          {/* 5. PRICE SECTION */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 50 }}>
            <div style={{ 
              display: 'flex', backgroundColor: MINT, padding: '22px 90px', borderRadius: 25,
              boxShadow: '0 20px 50px rgba(62, 180, 137, 0.3)'
            }}>
              <span style={{ fontSize: 85, fontWeight: 900, color: '#000' }}>KES {price}</span>
            </div>
          </div>

          {/* 6. FOOTER */}
          <div style={{ 
            display: 'flex', width: '100%', background: '#0a0a0a', padding: '35px', 
            borderRadius: 40, border: `1px solid rgba(128,0,0,0.3)`, justifyContent: 'space-between', alignItems: 'center' 
          }}>
             {/* Left side: Contact */}
             <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={65} height={65} alt="WhatsApp Icon" style={{ marginRight: 20 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: GOLD, fontSize: 16, fontWeight: 800 }}>WHATSAPP / CALL</span>
                  <span style={{ fontSize: 36, fontWeight: 900 }}>0733 565861</span>
                  <span style={{ fontSize: 24, fontWeight: 800, opacity: 0.7 }}>0715 130013</span>
                </div>
             </div>

             {/* Right side: Location with Icon */}
             <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 20 }}>
                  <span style={{ color: GOLD, fontSize: 16, fontWeight: 800 }}>LOCATION</span>
                  <span style={{ fontSize: 24, fontWeight: 900 }}>CBD OPP. MKU</span>
                </div>
                <img src="https://ik.imagekit.io/ericmwangi/location.png" width={55} height={55} alt="Location Icon" />
             </div>
          </div>

          {/* 7. WEBSITE */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
            <span style={{ fontSize: 22, color: '#333', fontWeight: 800, letterSpacing: 10 }}>WWW.TRIPPLEK.CO.KE</span>
          </div>

        </div>
      ),
      { width: 1080, height: 1920 }
    );
  } catch (e: any) {
    return new Response(`Generation failed`, { status: 500 });
  }
}
