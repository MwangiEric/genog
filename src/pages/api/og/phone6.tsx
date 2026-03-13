/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// Format number with commas
function formatPrice(price) {
  const num = parseInt(price.replace(/[^0-9]/g, ''), 10);
  if (isNaN(num)) return price;
  return num.toLocaleString('en-US');
}

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const width = 1080;
    const height = 1920;

    const fullDeviceName = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
    const price = searchPrice(searchParams.get('price') || '0');
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
            display: 'flex', width: '100%', height: 320, background: MAROON, 
            flexDirection: 'column', alignItems: 'center', paddingTop: 50, position: 'relative' 
          }}>
            <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={280} alt="Logo" style={{ filter: 'brightness(0) invert(1)' }} />
            <div style={{ position: 'absolute', bottom: -35, width: 70, height: 70, background: GOLD, transform: 'rotate(45deg)', display: 'flex' }} />
          </div>

          {/* 2. THE PRODUCT CARD - BIGGER IMAGE */}
          <div style={{ 
            display: 'flex', width: '92%', height: 950, background: '#FFFFFF', 
            marginTop: -80, borderRadius: 40, boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
            justifyContent: 'center', alignItems: 'center', border: `2px solid ${GOLD}`,
            overflow: 'hidden', zIndex: 10
          }}>
             {imageUrl && (
               <img 
                 src={imageUrl} 
                 alt="Phone" 
                 style={{ width: '95%', height: '95%', objectFit: 'contain' }} 
               />
             )}
          </div>

          {/* 3. TWO-LINE DEVICE TITLE */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30 }}>
            {/* BRAND (Line 1) */}
            <span style={{ 
              fontSize: 56, fontWeight: 700, color: GOLD, textAlign: 'center', letterSpacing: 8, marginBottom: -5
            }}>
              {brand}
            </span>
            {/* MODEL (Line 2) */}
            <span style={{ 
              fontSize: 120, fontWeight: 900, color: MAROON, textAlign: 'center', letterSpacing: -3, lineHeight: 1
            }}>
              {model || '---'}
            </span>
          </div>

          {/* 4. PRICE RIBBON - FORMATTED */}
          <div style={{ 
            display: 'flex', backgroundColor: MAROON, padding: '25px 80px', borderRadius: 30, marginTop: 40,
            boxShadow: '0 15px 35px rgba(128, 0, 0, 0.2)'
          }}>
            <span style={{ fontSize: 85, fontWeight: 900, color: '#FFFFFF' }}>KES {formatPrice(price)}</span>
          </div>

          {/* 5. FIXED FOOTER */}
          <div style={{ 
            display: 'flex', width: '100%', position: 'absolute', bottom: 0, padding: '40px 50px', 
            background: '#FFFFFF', borderTop: `6px solid ${MAROON}`, justifyContent: 'space-between', alignItems: 'center' 
          }}>
             <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={55} height={55} alt="WhatsApp" />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 15 }}>
                  <span style={{ fontSize: 32, fontWeight: 900, color: MAROON }}>0733 565861</span>
                  <span style={{ color: GOLD, fontSize: 14, fontWeight: 800 }}>GET IT DELIVERED</span>
                </div>
             </div>

             <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 15 }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: MAROON }}>CBD OPP. MKU</span>
                  <span style={{ color: GOLD, fontSize: 14, fontWeight: 800 }}>VISIT OUR STORE</span>
                </div>
                <img src="https://ik.imagekit.io/ericmwangi/location.png" width={50} height={50} alt="Location" />
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
