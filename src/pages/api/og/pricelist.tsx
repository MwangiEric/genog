import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// Internal SVG logo
const LOGO_DATA = 'data:image/svg+xml;base64,' + Buffer.from(
  `<svg width="400" height="100" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
     <rect width="400" height="100" rx="15" fill="#FFD700"/>
     <text x="200" y="65" font-family="sans-serif" font-weight="900" font-size="50" fill="black" text-anchor="middle">TRIPLE K</text>
   </svg>`
).toString('base64');

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  
  const title = searchParams.get('title') || 'CERTIFIED PRICE LIST';
  const brand = searchParams.get('brand') || 'Samsung Official';
  const contact = searchParams.get('contact') || '+254 704 554 445';
  
  const itemsRaw = searchParams.get('items') || 'Galaxy S24:145k:12GB RAM,Galaxy A55:55k:8GB RAM,Galaxy A15:22k:6GB RAM';
  const items = itemsRaw.split(',').map(item => item.split(':'));

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#0A0A0A', padding: '60px 50px',
        fontFamily: 'sans-serif', position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* --- LOGO WATERMARK LAYER --- */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          alignItems: 'center', opacity: 0.04, pointerEvents: 'none',
          transform: 'rotate(-25deg) scale(1.5)',
        }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', margin: '100px', fontSize: 120, fontWeight: 900, color: '#FFD700', whiteSpace: 'nowrap' }}>
              TRIPLE K SOLUTIONS
            </div>
          ))}
        </div>

        {/* --- HEADER SECTION --- */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50, zIndex: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img src={LOGO_DATA} width={320} height={80} />
            <span style={{ color: '#FFD700', fontSize: 22, marginTop: 10, fontWeight: 'bold' }}>SAMSUNG CERTIFIED PARTNER</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
             <div style={{ display: 'flex', border: '2px solid #3EB489', padding: '8px 20px', borderRadius: 10 }}>
                <span style={{ color: '#3EB489', fontSize: 22, fontWeight: 'bold' }}>AUTHENTIC STOCK</span>
             </div>
          </div>
        </div>

        {/* --- MAIN TITLE BANNER --- */}
        <div style={{ 
          display: 'flex', flexDirection: 'column', width: '100%', 
          background: '#151515', padding: '40px', borderRadius: '30px', 
          borderLeft: '15px solid #FFD700', marginBottom: 40, zIndex: 10 
        }}>
          <span style={{ color: '#888', fontSize: 30 }}>{brand} Inventory</span>
          <h1 style={{ color: 'white', fontSize: 90, margin: '10px 0', fontWeight: 'bold' }}>{title}</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#25D366', marginRight: 15 }} />
            <span style={{ color: '#3EB489', fontSize: 28 }}>Verified & Available in Store</span>
          </div>
        </div>

        {/* --- PRODUCT ROWS --- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15, zIndex: 10 }}>
          {items.map(([name, price, spec], i) => (
            <div key={i} style={{
              display: 'flex', width: '100%', background: 'rgba(25, 25, 25, 0.8)', 
              padding: '35px 30px', borderRadius: '25px', alignItems: 'center',
              border: '1px solid #333'
            }}>
              <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'white', fontSize: 45, fontWeight: 'bold' }}>{name}</span>
                <span style={{ color: '#FFD700', fontSize: 24, marginTop: 5 }}>{spec}</span>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ color: '#3EB489', fontSize: 50, fontWeight: '900' }}>Ksh {price}</span>
                <span style={{ color: '#444', fontSize: 20 }}>Incl. Warranty</span>
              </div>
            </div>
          ))}
        </div>

        {/* --- FOOTER CONTACT --- */}
        <div style={{ 
          display: 'flex', marginTop: 'auto', background: '#FFD700', 
          padding: '35px', borderRadius: '35px', justifyContent: 'space-between', 
          alignItems: 'center', zIndex: 10 
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'black', fontSize: 32, fontWeight: 'bold' }}>TRIPLE K SOLUTIONS</span>
            <span style={{ color: 'black', fontSize: 22 }}>Quality Devices, Affordable Prices</span>
          </div>
          <span style={{ color: 'black', fontSize: 40, fontWeight: '900' }}>{contact}</span>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
