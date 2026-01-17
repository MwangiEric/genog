import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get text content
    const device = searchParams.get('device')?.toUpperCase() || 'NEW DEVICE';
    const price = searchParams.get('price') || 'PRICE ON REQUEST';
    const imageUrl = searchParams.get('image') || 'https://ik.imagekit.io/ericmwangi/phone-rectangle.png';
    
    // Specs
    const ram = searchParams.get('ram') || '8GB';
    const rom = searchParams.get('rom') || '256GB';
    const bat = searchParams.get('bat') || '5000mAh';
    const scr = searchParams.get('scr') || '6.7"';
    
    // Platform
    const platform = searchParams.get('platform') || 'whatsapp';
    const width = 1080;
    const height = platform === 'facebook' ? 1350 : 1920;
    
    // FIXED FONT SIZES (no calculations)
    const deviceFontSize = 110; // Always 110px
    const priceFontSize = 70;   // Always 70px
    
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
          
          {/* Device name with FIXED font size */}
          <div style={{ 
            height: '140px',
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ 
              fontSize: deviceFontSize, // Fixed 110px
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
          
          {/* ... rest of your JSX with priceFontSize ... */}
          
        </div>
      ),
      { 
        width, 
        height,
        headers: { 'Cache-Control': 'public, immutable, max-age=31536000' }
      }
    );
  } catch (error) {
    // Simple error
    return new ImageResponse(
      <div style={{ display: 'flex', height: '100%', width: '100%', backgroundColor: '#050505', color: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ fontSize: 48 }}>TRIPLE K</span>
      </div>,
      { width: 1080, height: 1080 }
    );
  }
}
