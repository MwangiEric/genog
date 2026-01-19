/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const width = 1080;
    const height = 1920;

    const device = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
    const price = searchParams.get('price') || 'TBD';
    const imageUrl = searchParams.get('image');

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
          
          {/* 1. TOP MAROON HEADER BAR */}
          <div style={{ 
            display: 'flex', width: '100%', height: 400, background: MAROON, 
            flexDirection: 'column', alignItems: 'center', paddingTop: 60, position: 'relative' 
          }}>
            <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={300} alt="Logo" style={{ filter: 'brightness(0) invert(1)' }} />
            <div style={{ position: 'absolute', bottom: -50, width: 100, height: 100, background: GOLD, transform: 'rotate(45deg)', display: 'flex' }} />
          </div>

          {/* 2. THE WHITE IMAGE CARD */}
          <div style={{ 
            display: 'flex', width: '85%', height: 900, background: '#FFFFFF', 
            marginTop: -120, borderRadius: 40, boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
            justifyContent: 'center', alignItems: 'center', border: `1px solid ${GOLD}`,
            overflow: 'hidden', zIndex: 10, position: 'relative'
          }}>
             {/* Decorative Inner Border */}
             <div style={{ position: 'absolute', top: 20, left: 20, right: 20, bottom: 20, border: '1px solid #f0f0f0', borderRadius: 30, display: 'flex' }} />
             
             {imageUrl && (
               <img 
                 src={imageUrl} 
                 alt="Phone" 
                 style={{ width: '85%', height: '85%', objectFit: 'contain' }} 
               />
             )}
          </div>

          {/* 3. DEVICE INFO */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 60, padding: '0 40px' }}>
            <span style={{ fontSize: 100, fontWeight: 900, color: MAROON, textAlign: 'center', lineHeight: 1 }}>
              {device}
            </span>
            <div style={{ display: 'flex', backgroundColor: GOLD, padding: '15px 60px', borderRadius: 50, marginTop: 40 }}>
              <span style={{ fontSize: 70, fontWeight: 900, color: '#000' }}>KES {price}</span>
            </div>
          </div>

          {/* 4. FOOTER */}
          <div style={{ 
            display: 'flex', width: '100%', position: 'absolute', bottom: 0, padding: '60px', 
            background: '#FFFFFF', borderTop: `8px solid ${MAROON}`, justifyContent: 'space-between', alignItems: 'center' 
          }}>
             <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={60} height={60} alt="WA" />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
                  <span style={{ fontSize: 32, fontWeight: 900, color: MAROON }}>0733 565861</span>
                </div>
             </div>
             <img src="https://ik.imagekit.io/ericmwangi/location.png" width={55} height={55} alt="Loc" />
          </div>

        </div> // This closes the main wrapper (Line 22)
      ),
      { width, height }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
