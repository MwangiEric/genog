import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get ONLY dynamic text content
    const device = searchParams.get('device')?.toUpperCase() || 'NEW DEVICE';
    const price = searchParams.get('price') || 'PRICE ON REQUEST';
    const imageUrl = searchParams.get('image') || 'https://ik.imagekit.io/ericmwangi/iphone.png';
    
    // Simple specs with fallbacks
    const ram = searchParams.get('ram') || '8GB';
    const rom = searchParams.get('rom') || '256GB';
    const bat = searchParams.get('bat') || '5000mAh';
    const scr = searchParams.get('scr') || '6.7"';
    
    // Platform detection
    const platform = searchParams.get('platform') || 'whatsapp';
    const width = 1080;
    const height = platform === 'facebook' ? 1350 : 1920;
    
    // Text sizing
    const deviceFontSize = device.length > 25 ? 80 : device.length > 20 ? 90 : 110;
    const priceFontSize = price.length > 15 ? 60 : 70;
    
    return new ImageResponse(
      (
        <div style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#050505',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
        }}>
          
          {/* LOGO - HARDCODED */}
          <div style={{ 
            height: '85px', 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img 
              src="https://ik.imagekit.io/ericmwangi/tklogo.png" 
              width={300} 
              height={85} 
              style={{ objectFit: 'contain' }} 
            />
          </div>

          {/* DEVICE NAME - DYNAMIC TEXT ONLY */}
          <div style={{ 
            height: '140px',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ 
              fontSize: deviceFontSize, 
              fontWeight: 900, 
              textAlign: 'center',
              lineHeight: 1,
            }}>
              {device}
            </span>
            <div style={{ 
              height: 4, 
              width: 80, 
              background: '#C5A059',
              marginTop: '10px'
            }} />
          </div>

          {/* DEVICE IMAGE - ONLY DYNAMIC PART (with fallback) */}
          <div style={{ 
            height: '600px',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative',
          }}>
            <div style={{ 
              position: 'absolute', 
              width: '800px', 
              height: '800px', 
              background: 'radial-gradient(circle, #C5A05920 0%, transparent 70%)', 
              borderRadius: '50%' 
            }} />
            <img 
              src={imageUrl} 
              style={{ 
                width: '85%', 
                height: '85%', 
                objectFit: 'contain', 
                zIndex: 10,
              }} 
            />
          </div>

          {/* SPECS - DYNAMIC TEXT ONLY */}
          <div style={{ 
            height: '120px',
            display: 'flex', 
            flexDirection: 'row',
            marginBottom: '30px',
          }}>
            {/* RAM */}
            <div style={{ 
              flex: 1,
              marginRight: '15px',
              background: '#111', 
              borderRadius: '12px',
              border: '1px solid #222',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ color: '#C5A059', fontSize: 14, fontWeight: 700 }}>
                RAM
              </div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>
                {ram}
              </div>
            </div>
            
            {/* STORAGE */}
            <div style={{ 
              flex: 1,
              marginRight: '15px',
              background: '#111', 
              borderRadius: '12px',
              border: '1px solid #222',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ color: '#C5A059', fontSize: 14, fontWeight: 700 }}>
                STORAGE
              </div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>
                {rom}
              </div>
            </div>
            
            {/* BATTERY */}
            <div style={{ 
              flex: 1,
              marginRight: '15px',
              background: '#111', 
              borderRadius: '12px',
              border: '1px solid #222',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ color: '#C5A059', fontSize: 14, fontWeight: 700 }}>
                BATTERY
              </div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>
                {bat}
              </div>
            </div>
            
            {/* SCREEN */}
            <div style={{ 
              flex: 1,
              background: '#111', 
              borderRadius: '12px',
              border: '1px solid #222',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ color: '#C5A059', fontSize: 14, fontWeight: 700 }}>
                SCREEN
              </div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>
                {scr}
              </div>
            </div>
          </div>

          {/* PRICE - DYNAMIC TEXT ONLY */}
          <div style={{ 
            height: '120px',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
          }}>
            <div style={{ 
              background: '#3EB489', 
              padding: '18px 50px', 
              borderRadius: '16px',
            }}>
              <span style={{ fontSize: priceFontSize, fontWeight: 900, color: '#000' }}>
                KES {price}
              </span>
            </div>
          </div>

          {/* FOOTER - HARDCODED IMAGES & TEXT */}
          <div style={{ 
            height: '120px',
            display: 'flex', 
            flexDirection: 'row',
            background: '#0a0a0a', 
            padding: '25px 30px', 
            borderRadius: '20px',
            border: '1px solid #1a1a1a',
          }}>
            {/* Left: WhatsApp */}
            <div style={{ 
              flex: 1,
              display: 'flex', 
              alignItems: 'center',
            }}>
              <img 
                src="https://ik.imagekit.io/ericmwangi/whatsapp.png" 
                width={45} 
                height={45} 
                style={{ marginRight: '12px' }} 
              />
              <div>
                <div style={{ color: '#C5A059', fontSize: 16, fontWeight: 700 }}>ORDER NOW</div>
                <div style={{ fontSize: 32, fontWeight: 800 }}>0704 554 445</div>
              </div>
            </div>

            {/* Right: Location */}
            <div style={{ 
              flex: 1,
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
              <img 
                src="https://ik.imagekit.io/ericmwangi/location.png" 
                width={35} 
                height={35} 
                style={{ marginRight: '12px' }} 
              />
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#C5A059', fontSize: 16, fontWeight: 700 }}>LOCATION</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>CBD, NAIROBI</div>
              </div>
            </div>
          </div>

          {/* WEBSITE - HARDCODED */}
          <div style={{ 
            height: '60px',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
          }}>
            <span style={{ fontSize: 20, color: '#444', fontWeight: 800, letterSpacing: '3px' }}>
              WWW.TRIPPLEK.CO.KE
            </span>
          </div>

        </div>
      ),
      { 
        width, 
        height,
        headers: {
          'Cache-Control': 'public, immutable, max-age=31536000',
        }
      }
    );
  } catch (error) {
    // Return a simple error image if anything goes wrong
    return new ImageResponse(
      (
        <div style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#050505',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{ textAlign: 'center' }}>
            <img 
              src="https://ik.imagekit.io/ericmwangi/tklogo.png" 
              width={300} 
              height={85} 
              style={{ objectFit: 'contain', marginBottom: '30px' }} 
            />
            <div style={{ fontSize: 48, fontWeight: 900, color: '#C5A059', marginBottom: '20px' }}>
              TRIPLE K STUDIO
            </div>
            <div style={{ fontSize: 24, color: '#888' }}>
              Poster Generator Ready
            </div>
          </div>
        </div>
      ),
      { width: 1080, height: 1080 }
    );
  }
}