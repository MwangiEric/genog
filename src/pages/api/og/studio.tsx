import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// We'll use a placeholder for the logo as well
const LOGO_PLACEHOLDER = 'data:image/svg+xml;base64,' + Buffer.from(
  `<svg width="320" height="80" viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg">
     <rect width="320" height="80" fill="#FFD700"/>
     <text x="160" y="50" font-family="sans-serif" font-size="40" fill="#0F0A0A" text-anchor="middle">TRIPLE K</text>
   </svg>`
).toString('base64');

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  
  // Route Logic
  const template = searchParams.get('template') || 'single'; 
  const device   = searchParams.get('device')   || 'Awesome Gadget';
  const price    = searchParams.get('price')    || '999';
  const text1    = searchParams.get('text1')    || 'Discover More';
  const text2    = searchParams.get('text2')    || 'Limited Stock!';

  // Grid & Showcase Logic
  const itemsRaw = searchParams.get('items')    || 'Item 1,Item 2,Item 3,Item 4'; // Max 4 items
  const items = itemsRaw.split(',').filter(Boolean).slice(0, 4);

  // Specs Logic
  const specsRaw = searchParams.get('specs')    || 'Fast:2.5GHz,Big:6.7",Cam:48MP,Bat:5000mAh'; // "icon:value"
  const specs = specsRaw.split(',').filter(Boolean).map(s => s.split(':'));

  // --- TEMPLATE: 4-ITEM GRID (Catalog Preview) ---
  if (template === 'grid') {
    return new ImageResponse(
      (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0F0A0A', padding: 50 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
            <img src={LOGO_PLACEHOLDER} width={360} height={90} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30, justifyContent: 'center', flex: 1 }}>
            {items.map((itemText, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', width: '460px', height: '700px', background: '#141414', borderRadius: 40, alignItems: 'center', padding: 30, border: '1px solid #222' }}>
                <div style={{ display: 'flex', width: 380, height: 380, background: '#444', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                  <span style={{ color: '#DDD', fontSize: 30 }}>{itemText}</span>
                </div>
                <span style={{ display: 'flex', color: 'white', fontSize: 45, fontWeight: 'bold', textAlign: 'center' }}>{itemText}</span>
                <span style={{ display: 'flex', color: '#3EB489', fontSize: 35, marginTop: 10 }}>Ksh. {Math.floor(Math.random() * 50000 + 10000)}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', marginTop: 'auto', justifyContent: 'center', borderTop: '1px solid #333', paddingTop: 40 }}>
            <span style={{ display: 'flex', color: '#FFD700', fontSize: 40 }}>Triple K - {text1}</span>
          </div>
        </div>
      ),
      { width: 1080, height: 1920 }
    );
  }

  // --- TEMPLATE: FULL PAGE CATALOG (Showcase) ---
  if (template === 'showcase') {
    return new ImageResponse(
      (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0F0A0A', padding: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <img src={LOGO_PLACEHOLDER} width={400} height={100} />
          </div>
          <h1 style={{ display: 'flex', color: 'white', fontSize: 90, textAlign: 'center', marginBottom: 50 }}>Full Catalog</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, flex: 1, justifyContent: 'center' }}>
            {items.map((itemText, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', width: '45%', background: '#141414', borderRadius: 20, alignItems: 'center', padding: 20, border: '1px solid #333' }}>
                <div style={{ display: 'flex', width: '100%', height: 250, background: '#555', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                  <span style={{ color: '#EEE', fontSize: 25 }}>{itemText}</span>
                </div>
                <span style={{ display: 'flex', color: 'white', fontSize: 35, fontWeight: 'bold', textAlign: 'center' }}>{itemText}</span>
                <span style={{ display: 'flex', color: '#3EB489', fontSize: 28, marginTop: 5 }}>Ksh. {Math.floor(Math.random() * 30000 + 5000)}</span>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40, borderTop: '1px solid #444', paddingTop: 30 }}>
            <span style={{ display: 'flex', color: '#FFD700', fontSize: 45, fontWeight: 'bold' }}>{text1}</span>
            <span style={{ display: 'flex', color: 'white', fontSize: 35, marginTop: 10 }}>{text2}</span>
          </div>
        </div>
      ),
      { width: 1080, height: 1920 }
    );
  }

  // --- TEMPLATE: SINGLE POSTER WITH ICON SPECS (Default) ---
  return new ImageResponse(
    (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0F0A0A', alignItems: 'center', padding: 60 }}>
        {/* Branding */}
        <div style={{ display: 'flex', marginBottom: 40 }}>
          <img src={LOGO_PLACEHOLDER} width={400} height={100} />
        </div>

        {/* Hero Image Placeholder */}
        <div style={{ display: 'flex', height: 850, width: 950, justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(circle, #1a0a0a 0%, #0F0A0A 70%)', borderRadius: 30 }}>
          <div style={{ display: 'flex', width: 750, height: 750, background: '#444', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ color: '#DDD', fontSize: 50 }}>{device} Image</span>
          </div>
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <h1 style={{ display: 'flex', fontSize: 120, color: 'white', fontWeight: 900, textAlign: 'center', marginBottom: 0, marginTop: 40 }}>{device}</h1>
          <div style={{ display: 'flex', height: 6, width: 300, backgroundColor: '#FFD700', margin: '20px 0' }} />
          <span style={{ display: 'flex', fontSize: 90, color: '#3EB489', fontWeight: 'bold' }}>KES {price}</span>
        </div>

        {/* Spec Icons Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, marginTop: 60, width: '100%' }}>
          {specs.map(([icon, val], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', background: '#1A1A1A', padding: '15px 35px', borderRadius: 30, border: '1px solid rgba(255,215,0,0.3)' }}>
              {/* Icon Placeholder */}
              <div style={{ display: 'flex', width: 45, height: 45, background: '#FFD700', borderRadius: '50%', marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ color: '#0F0A0A', fontSize: 20 }}>{icon[0].toUpperCase()}</span> {/* First letter of icon type */}
              </div>
              <span style={{ display: 'flex', color: 'white', fontSize: 32 }}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
