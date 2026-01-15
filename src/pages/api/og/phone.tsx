import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const device = searchParams.get('device') || 'PREMIUM DEVICE';
  const price = searchParams.get('price') || '0';
  const imageUrl = searchParams.get('image');

  // Inline SVG for Location Pin (Gold)
  const PinIcon = (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C5A059" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  // Inline SVG for Web/Globe (Gray)
  const WebIcon = (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#050505',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* LUXURY BACKGROUND ACCENTS */}
        <div style={{ position: 'absolute', top: -150, left: -150, width: 700, height: 700, background: 'radial-gradient(circle, rgba(128, 0, 0, 0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: 300, right: -200, width: 600, height: 600, background: 'radial-gradient(circle, rgba(197, 160, 89, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />

        {/* 1. HEADER LOGO */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 80 }}>
          <img 
            src="https://ik.imagekit.io/ericmwangi/tklogo.png" 
            width={420} 
            height={120} 
            style={{ objectFit: 'contain' }} 
          />
        </div>

        {/* 2. DEVICE TITLE */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40, padding: '0 60px' }}>
          <span style={{ 
            fontSize: 115, 
            fontWeight: 900, 
            textAlign: 'center', 
            textTransform: 'uppercase', 
            letterSpacing: -5, 
            lineHeight: 0.85,
          }}>
            {device}
          </span>
        </div>

        {/* 3. HERO PRODUCT AREA */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          {/* Mint Glow behind phone */}
          <div style={{ 
            position: 'absolute', 
            width: 900, height: 900, 
            background: 'radial-gradient(circle, rgba(62, 180, 137, 0.1) 0%, transparent 70%)', 
            borderRadius: '50%' 
          }} />
          
          {imageUrl && (
            <img 
              src={imageUrl} 
              style={{ width: 950, height: 950, objectFit: 'contain', zIndex: 10 }} 
            />
          )}
        </div>

        {/* 4. PRICE BADGE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
          <div style={{ 
            display: 'flex', 
            background: '#3EB489', 
            padding: '25px 120px', 
            borderRadius: 100, 
            border: '5px solid #C5A059',
            boxShadow: '0 30px 60px rgba(0,0,0,0.8)' 
          }}>
            <span style={{ fontSize: 90, fontWeight: 900, color: '#000', letterSpacing: -2 }}>
                KSH {price}
            </span>
          </div>
        </div>

        {/* 5. PROFESSIONAL INFO FOOTER */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          background: 'rgba(18,18,18,0.95)', 
          margin: '0 60px 40px 60px', 
          padding: '45px', 
          borderRadius: 50, 
          border: '1px solid #252525',
        }}>
          {/* Row 1: WhatsApp & Location */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 35 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png?updatedAt=1765797099945" width={60} height={60} style={{ marginRight: 20 }} />
              <span style={{ fontSize: 48, fontWeight: 900, color: 'white' }}>0715 130013</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: 15 }}>{PinIcon}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#C5A059', letterSpacing: 1 }}>CBD, NAIROBI</span>
                <span style={{ fontSize: 18, fontWeight: 600, color: '#666' }}>OPP. MOI AVENUE</span>
              </div>
            </div>
          </div>

          {/* Row 2: Website */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid #222', paddingTop: 30 }}>
            <div style={{ marginRight: 15 }}>{WebIcon}</div>
            <span style={{ fontSize: 32, fontWeight: 700, color: '#777', letterSpacing: 4 }}>
                WWW.TRIPPLEK.CO.KE
            </span>
          </div>
        </div>

        {/* 6. MAROON CTA BAR */}
        <div style={{ 
          display: 'flex', 
          background: '#800000', 
          width: '100%', 
          height: 140, 
          justifyContent: 'center', 
          alignItems: 'center', 
          borderTop: '4px solid #C5A059' 
        }}>
          <span style={{ fontSize: 48, fontWeight: 900, letterSpacing: 10, color: '#C5A059' }}>
            SHOP NOW ❯
          </span>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
    }
  );
}
