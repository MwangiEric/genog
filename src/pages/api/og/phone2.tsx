/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Build Fixes
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

    return new ImageResponse(
      (
        <div style={{
          height: '100%', width: '100%',
          display: 'flex', flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          fontFamily: 'sans-serif',
          padding: '40px 50px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* --- GEOMETRIC BACKGROUND (CSS ONLY) --- */}
          <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: 200, background: MAROON, opacity: 0.03, display: 'flex' }} />
          <div style={{ position: 'absolute', top: '20%', right: -50, width: 150, height: 150, background: GOLD, opacity: 0.05, transform: 'rotate(45deg)', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: -50, left: '10%', width: 300, height: 300, borderRadius: 150, background: GOLD, opacity: 0.04, display: 'flex' }} />

          {/* 1. HEADER LOGO */}
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: 40 }}>
            <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={300} height={80} alt="Logo" style={{ objectFit: 'contain' }} />
          </div>

          {/* 2. MAIN CONTENT AREA (ROW LAYOUT) */}
          <div style={{ display: 'flex', flex: 1, width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            
            {/* LEFT SIDE: PHONE IMAGE */}
            <div style={{ display: 'flex', width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
               <div style={{ position: 'absolute', width: 600, height: 600, background: 'radial-gradient(circle, rgba(197,160,89,0.15) 0%, transparent 70%)', borderRadius: '50%', display: 'flex' }} />
               {imageUrl && (
                 <img src={imageUrl} alt="Phone" style={{ width: '100%', height: '80%', objectFit: 'contain', zIndex: 10 }} />
               )}
            </div>

            {/* RIGHT SIDE: DETAILS */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '45%', paddingLeft: '20px' }}>
              
              {/* Device Title */}
              <span style={{ fontSize: 80, fontWeight: 900, color: MAROON, lineHeight: 1, marginBottom: 10 }}>{device}</span>
              <div style={{ height: 6, width: 80, background: GOLD, marginBottom: 40 }} />

              {/* Specs Stack (Vertical List) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { label: 'SCREEN SIZE', val: scr },
                  { label: 'MEMORY (RAM)', val: ram },
                  { label: 'STORAGE (ROM)', val: rom },
                  { label: 'BATTERY CAPACITY', val: bat }
                ].map((spec) => (
                  <div key={spec.label} style={{ display: 'flex', flexDirection: 'column', borderLeft: `4px solid ${GOLD}`, paddingLeft: 15 }}>
                    <span style={{ color: GOLD, fontSize: 16, fontWeight: 800 }}>{spec.label}</span>
                    <span style={{ fontSize: 32, fontWeight: 900, color: '#222' }}>{spec.val}</span>
                  </div>
                ))}
              </div>

              {/* Price Tag (Shifted right for emphasis) */}
              <div style={{ display: 'flex', backgroundColor: MAROON, padding: '20px 40px', borderRadius: 20, marginTop: 50, alignSelf: 'flex-start' }}>
                <span style={{ fontSize: 50, fontWeight: 900, color: '#FFF' }}>KES {price}</span>
              </div>

            </div>
          </div>

          {/* 3. FOOTER */}
          <div style={{ 
            display: 'flex', width: '100%', background: '#FFF', padding: '30px', 
            borderRadius: 30, border: `1.5px solid ${GOLD}`, justifyContent: 'space-between', alignItems: 'center', marginTop: 40 
          }}>
             <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={60} height={60} alt="WhatsApp" style={{ marginRight: 15 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: GOLD, fontSize: 14, fontWeight: 800 }}>CONTACT US</span>
                  <span style={{ fontSize: 32, fontWeight: 900, color: MAROON }}>0733 565861</span>
                </div>
             </div>

             <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 15 }}>
                  <span style={{ color: GOLD, fontSize: 14, fontWeight: 800 }}>LOCATION</span>
                  <span style={{ fontSize: 24, fontWeight: 900, color: MAROON }}>CBD OPP. MKU</span>
                </div>
                <img src="https://ik.imagekit.io/ericmwangi/location.png" width={50} height={50} alt="Location" />
             </div>
          </div>

          {/* 4. WEB LINK */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}>
            <span style={{ fontSize: 20, color: GOLD, fontWeight: 800, letterSpacing: 8 }}>WWW.TRIPPLEK.CO.KE</span>
          </div>

        </div>
      ),
      { width, height }
    );
  } catch (e: any) {
    return new Response(`Generation failed`, { status: 500 });
  }
}
