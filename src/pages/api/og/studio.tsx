import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

const LOGO_DATA = 'data:image/svg+xml;base64,' + Buffer.from(
  `<svg width="400" height="100" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
     <rect width="400" height="100" rx="15" fill="#FFD700"/>
     <text x="200" y="65" font-family="sans-serif" font-weight="900" font-size="50" fill="black" text-anchor="middle">TRIPLE K</text>
   </svg>`
).toString('base64');

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  
  // Business Info (Triple K Defaults)
  const phone = searchParams.get('phone') || '+254 704 554 445';
  const location = searchParams.get('loc') || 'Nairobi, Kenya';
  const email = 'info@triplek.co.ke';
  const date = new Date().toLocaleDateString('en-GB');

  // Categories
  const category = searchParams.get('category') || '8GB RAM | 256GB ROM';
  const brand = searchParams.get('brand') || 'Samsung Official';

  // Items: "Name:Price:Specs"
  const itemsRaw = searchParams.get('items') || 'Device:Price:Spec';
  const items = itemsRaw.split(',').map(item => item.split(':')).slice(0, 4);

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#0F0A0A', padding: 60,
        fontFamily: 'sans-serif', position: 'relative'
      }}>
        
        {/* WATERMARK BACKGROUND */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%) rotate(-30deg)',
          fontSize: 200, color: 'rgba(255, 215, 0, 0.03)',
          fontWeight: 900, whiteSpace: 'nowrap', pointerEvents: 'none'
        }}>
          TRIPLE K VERIFIED
        </div>

        {/* TOP SECTION: Branding & Quotation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img src={LOGO_DATA} width={300} height={75} />
            <span style={{ color: '#FFD700', fontSize: 24, marginTop: 15, fontWeight: 'bold' }}>Premium Mobile Solutions</span>
            <span style={{ color: '#888', fontSize: 22 }}>{location}</span>
            <span style={{ color: '#888', fontSize: 22 }}>{phone}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', background: 'rgba(62, 180, 137, 0.1)', padding: '10px 20px', borderRadius: 10, border: '1px solid #3EB489', marginBottom: 15 }}>
               <span style={{ color: '#3EB489', fontSize: 24, fontWeight: 'bold' }}>SAMSUNG CERTIFIED</span>
            </div>
            <span style={{ color: 'white', fontSize: 55, fontWeight: 'bold' }}>QUOTATION</span>
            <span style={{ color: '#666', fontSize: 24 }}>ID: TK-{Math.floor(1000 + Math.random() * 9000)}</span>
          </div>
        </div>

        {/* CATEGORY & HARDWARE FILTER */}
        <div style={{ 
          display: 'flex', width: '100%', background: '#1A1A1A', 
          padding: '25px 40px', borderRadius: 25, marginBottom: 40,
          borderLeft: '12px solid #FFD700', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: 45, fontWeight: 'bold' }}>{brand}</span>
            <span style={{ color: '#666', fontSize: 22, marginTop: 5 }}>Official Retail Partner</span>
          </div>
          <div style={{ display: 'flex', background: '#333', padding: '10px 25px', borderRadius: 15 }}>
            <span style={{ color: '#FFD700', fontSize: 28 }}>{category}</span>
          </div>
        </div>

        {/* GRID OF PRODUCTS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30, justifyContent: 'center' }}>
          {items.map(([name, price, spec], i) => (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column',
              width: 460, height: 620,
              background: '#151515', borderRadius: 45,
              padding: 30, border: '1px solid #222', position: 'relative'
            }}>
              {/* Box Placeholder for Phone */}
              <div style={{
                display: 'flex', width: '100%', height: 320,
                background: 'linear-gradient(to bottom, #222, #111)', borderRadius: 30,
                justifyContent: 'center', alignItems: 'center'
              }}>
                <span style={{ color: '#333', fontSize: 40, fontWeight: 'bold' }}>IMAGE</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: 30 }}>
                <span style={{ display: 'flex', color: 'white', fontSize: 44, fontWeight: 'bold' }}>{name}</span>
                <span style={{ display: 'flex', color: '#888', fontSize: 26, marginTop: 5 }}>{spec || 'Official Global Version'}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 15 }}>
                   <span style={{ color: '#3EB489', fontSize: 50, fontWeight: 'bold' }}>Ksh {price}</span>
                   <span style={{ color: '#555', fontSize: 24, marginLeft: 15, textDecoration: 'line-through' }}>{price + 500}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER: LEGAL & CONTACT */}
        <div style={{ 
          display: 'flex', marginTop: 'auto', 
          background: '#1A1A1A', padding: '30px 40px', 
          borderRadius: 30, justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>TRIPLE K SOLUTIONS</span>
            <span style={{ color: '#666', fontSize: 20 }}>Authenticity Guaranteed • 1 Year Warranty</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#25D366', padding: '15px 35px', borderRadius: 50 }}>
            <span style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>WhatsApp: {phone}</span>
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
