/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const width = 1080;
    const height = 1920;

    const fullDeviceName = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
    const price = searchParams.get('price') || 'TBD';
    const ram = searchParams.get('ram') || '---';
    const rom = searchParams.get('rom') || '---';
    const bat = searchParams.get('bat') || '---';
    const scr = searchParams.get('scr') || '---';
    const imageUrl = searchParams.get('image');

    // Split logic: Brand is the first word, Model is the rest
    const nameParts = fullDeviceName.split(' ');
    const brand = nameParts[0];
    const model = nameParts.slice(1).join(' ');

    const MAROON = '#800000';
    const GOLD = '#C5A059';

    return new ImageResponse(
      (
        <div style={{
          height: '100%', width: '100%',
          display: 'flex', flexDirection: 'column',
          backgroundColor: '#f8f8f8', 
          fontFamily: 'sans-serif',
          alignItems: 'center',
          position: 'relative',
        }}>
          
          {/* 1. TOP MAROON HEADER */}
          <div style={{ 
            display: 'flex', width: '100%', height: 420, background: MAROON, 
            flexDirection: 'column', alignItems: 'center', paddingTop: 60, position: 'relative' 
          }}>
            <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={300} alt="Logo" style={{ filter: 'brightness(0) invert(1)' }} />
            <div style={{ position: 'absolute', bottom: -40, width: 80, height: 80, background: GOLD, transform: 'rotate(45deg)', display: 'flex' }} />
          </div>

          {/* 2. THE PRODUCT CARD */}
          <div style={{ 
            display: 'flex', width: '88%', height: 800, background: '#FFFFFF', 
            marginTop: -100, borderRadius: 40, boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
            justifyContent: 'center', alignItems: 'center', border: `1.5px solid ${GOLD}`,
            overflow: 'hidden', zIndex: 10
          }}>
             {imageUrl && (
               <img 
                 src={imageUrl} 
                 alt="Phone" 
                 style={{ width: '85%', height: '85%', objectFit: 'contain' }} 
               />
             )}
          </div>

          {/* 3. TWO-LINE DEVICE TITLE */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
            {/* BRAND (Line 1) */}
            <span style={{ 
              fontSize: 60, fontWeight: 700, color: GOLD, textAlign: 'center', letterSpacing: 10, marginBottom: -10
            }}>
              {brand}
            </span>
            {/* MODEL (Line 2) */}
            <span style={{ 
              fontSize: 130, fontWeight: 900, color: MAROON, textAlign: 'center', letterSpacing: -5, lineHeight: 1
            }}>
              {model || '---'}
            </span>
          </div>

          {/* 4. SPECS GRID */}
          <div style={{ display: 'flex', width: '90%', justifyContent: 'center', gap: 15, marginTop: 40 }}>
            {[
              { l: 'SCR', v: scr },
              { l: 'RAM', v: ram },
              { l: 'ROM', v: rom },
              { l: 'BAT', v: bat }
            ].map((spec) => (
              <div key={spec.l} style={{ 
                display: 'flex', flexDirection: 'column', alignItems: 'center', 
                background: '#FFFFFF', padding: '15px 5px', borderRadius: 20, 
                border: '1.5px solid #eee', minWidth: '200px'
              }}>
                <span style={{ color: GOLD, fontSize: 16, fontWeight: 800, marginBottom: 5 }}>{spec.l}</span>
                <span style={{ fontSize: 32, fontWeight: 900, color: '#333' }}>{spec.v}</span>
              </div>
            ))}
          </div>

          {/* 5. PRICE RIBBON */}
          <div style={{ 
            display: 'flex', backgroundColor: MAROON, padding: '20px 100px', borderRadius: 25, marginTop: 50,
            boxShadow: '0 15px 35px rgba(128, 0, 0, 0.2)'
          }}>
            <span style={{ fontSize: 80, fontWeight: 900, color: '#FFFFFF' }}>KES {price}</span>
          </div>

          {/* 6. FIXED FOOTER */}
          <div style={{ 
            display: 'flex', width: '100%', position: 'absolute', bottom: 0, padding: '50px 60px', 
            background: '#FFFFFF', borderTop: `6px solid ${MAROON}`, justifyContent: 'space-between', alignItems: 'center' 
          }}>
             <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={60} height={60} alt="WhatsApp" />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: MAROON }}>0733 565861</span>
                  <span style={{ color: GOLD, fontSize: 16, fontWeight: 800 }}>GET IT DELIVERED</span>
                </div>
             </div>

             <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 20 }}>
                  <span style={{ fontSize: 24, fontWeight: 900, color: MAROON }}>CBD OPP. MKU</span>
                  <span style={{ color: GOLD, fontSize: 16, fontWeight: 800 }}>VISIT OUR STORE</span>
                </div>
                <img src="https://ik.imagekit.io/ericmwangi/location.png" width={55} height={55} alt="Location" />
             </div>
          </div>

        </div>
      ),
      { width, height }
    );
  } catch (e: any) {
    return new Response(`Generation failed`, { status: 500 });
  }
}
