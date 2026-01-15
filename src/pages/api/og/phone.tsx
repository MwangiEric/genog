import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const device = searchParams.get('device') || 'PREMIUM DEVICE';
  const price = searchParams.get('price') || '0';
  const image = searchParams.get('image');

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#050505',
        color: 'white', fontFamily: 'sans-serif',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* LUXURY BACKGROUND ACCENTS (Maroon & Gold) */}
        <div style={{ position: 'absolute', top: -150, left: -150, width: 600, height: 600, background: 'radial-gradient(circle, rgba(128, 0, 0, 0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: 200, right: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(197, 160, 89, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />

        {/* 1. HEADER LOGO */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 80 }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={380} height={100} style={{ objectFit: 'contain' }} />
        </div>

        {/* 2. DEVICE TITLE */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 60 }}>
          <span style={{ fontSize: 110, fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', letterSpacing: -3, lineHeight: 0.9 }}>
            {device}
          </span>
        </div>

        {/* 3. HERO PRODUCT AREA */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          {/* Mint Glow behind phone */}
          <div style={{ position: 'absolute', width: 800, height: 800, background: 'radial-gradient(circle, rgba(62, 180, 137, 0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
          {image && <img src={image} style={{ width: 950, height: 950, objectFit: 'contain' }} />}
        </div>

        {/* 4. PRICE BADGE (Mint & Gold) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
          <div style={{ 
            display: 'flex', background: '#3EB489', padding: '20px 100px', borderRadius: 50, 
            border: '4px solid #C5A059', boxShadow: '0 20px 40px rgba(62, 180, 137, 0.3)' 
          }}>
            <span style={{ fontSize: 80, fontWeight: 900, color: '#000' }}>KES {price}</span>
          </div>
        </div>

        {/* 5. PRO FOOTER SECTION */}
        <div style={{ 
          display: 'flex', flexDirection: 'column', background: 'rgba(17,17,17,0.9)', 
          margin: '0 50px 60px 50px', padding: '40px', borderRadius: 40, border: '1px solid #333' 
        }}>
          {/* Contact Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" width={45} height={45} style={{ marginRight: 15, filter: 'invert(1)' }} />
              <span style={{ fontSize: 38, fontWeight: 800 }}>0715 130013</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/484/484167.png" width={45} height={45} style={{ marginRight: 15, filter: 'invert(1)' }} />
              <span style={{ fontSize: 24, fontWeight: 700, color: '#C5A059' }}>CBD, OPPOSITE MOI AVENUE</span>
            </div>
          </div>

          {/* Web Row */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid #222', paddingTop: 20 }}>
            <img src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png" width={30} height={30} style={{ marginRight: 12, opacity: 0.7, filter: 'invert(1)' }} />
            <span style={{ fontSize: 28, fontWeight: 600, color: '#888', letterSpacing: 2 }}>www.tripplek.co.ke</span>
          </div>
        </div>

        {/* SHOP NOW MAROON BAR */}
        <div style={{ 
          display: 'flex', background: '#800000', width: '100%', height: 120, 
          justifyContent: 'center', alignItems: 'center', borderTop: '2px solid #C5A059' 
        }}>
          <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: 5 }}>SHOP NOW ❯</span>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
