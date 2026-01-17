import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// Simple in-memory fallbacks
const BRAND = {
  logo: 'https://ik.imagekit.io/ericmwangi/tklogo.png',
  whatsappIcon: 'https://ik.imagekit.io/ericmwangi/whatsapp.png',
  locationIcon: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  defaultPhone: 'https://ik.imagekit.io/ericmwangi/default-phone.png'
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  // Platform sizes
  const platform = searchParams.get('platform') || 'whatsapp';
  const width = 1080;
  const height = platform === 'facebook' ? 1350 : 1920;

  // Safe parameters
  const device = (searchParams.get('device') || 'NEW DEVICE').toUpperCase();
  const price = searchParams.get('price') || 'PRICE ON REQUEST';
  const glowHex = searchParams.get('glow') || 'C5A059';
  
  // Get image URL safely
  let imageUrl = searchParams.get('image') || BRAND.defaultPhone;
  if (!imageUrl.startsWith('http')) imageUrl = BRAND.defaultPhone;

  // Specs
  const specs = {
    ram: searchParams.get('ram') || 'RAM',
    rom: searchParams.get('rom') || 'STORAGE',
    bat: searchParams.get('bat') || 'BATTERY',
    cam: searchParams.get('cam') || 'CAMERA',
  };

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
        
        {/* LOGO - Fixed at top */}
        <div style={{ 
          height: '85px', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img 
            src={BRAND.logo} 
            width={300} 
            height={85} 
            style={{ objectFit: 'contain' }} 
          />
        </div>

        {/* DEVICE NAME - Fixed height container */}
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

        {/* DEVICE IMAGE - Fixed height (FLEX: 1 is problematic in Satori) */}
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
            background: `radial-gradient(circle, #${glowHex}20 0%, transparent 70%)`, 
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

        {/* SPECS GRID - Fixed height and explicit widths (NO FLEX-WRAP) */}
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
              {specs.ram}
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
              {specs.rom}
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
              {specs.bat}
            </div>
          </div>
          
          {/* CAMERA */}
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
              CAMERA
            </div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>
              {specs.cam}
            </div>
          </div>
        </div>

        {/* PRICE - Fixed height */}
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

        {/* FOOTER - Fixed height */}
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
              src={BRAND.whatsappIcon} 
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
              src={BRAND.locationIcon} 
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

        {/* WEBSITE - Fixed height */}
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
}