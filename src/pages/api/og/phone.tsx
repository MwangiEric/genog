import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  
  // Platform Detection & Layout logic
  const platform = searchParams.get('platform') || 'whatsapp'; 
  const width = 1080;
  let height = 1920;
  let paddingBottom = '80px'; 

  if (platform === 'facebook') {
    height = 1350; 
  } else if (platform === 'tiktok') {
    paddingBottom = '350px'; // Higher safe zone for TikTok UI
  }

  const device = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
  const price = searchParams.get('price') || '0';
  const imageUrl = searchParams.get('image');
  const glowHex = searchParams.get('glow') || 'C5A059';

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#050505', color: 'white',
        fontFamily: 'sans-serif',
        padding: `60px 60px ${paddingBottom} 60px`,
      }}>
        
        {/* BRANDING */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={320} height={90} style={{ objectFit: 'contain' }} />
        </div>

        {/* DEVICE NAME BADGE */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <div style={{ 
            display: 'flex', backgroundColor: '#fff', color: '#000', 
            padding: '12px 30px', borderRadius: '10px', fontWeight: 900, fontSize: 32 
          }}>
            {device}
          </div>
        </div>

        {/* MAIN PRODUCT AREA */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', width: 850, height: 850, 
            background: `radial-gradient(circle, #${glowHex}20 0%, transparent 75%)`, 
            borderRadius: '50%', display: 'flex' 
          }} />
          {imageUrl && <img src={imageUrl} style={{ width: '90%', height: '80%', objectFit: 'contain', zIndex: 10 }} />}
        </div>

        {/* PRICE GRID (istreet Style) */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: 60 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>{searchParams.get('storage') || '256GB'}</span>
            <div style={{ display: 'flex', backgroundColor: '#fff', color: '#000', padding: '12px 40px', borderRadius: '8px' }}>
              <span style={{ fontSize: 60, fontWeight: 900 }}>KES {price}</span>
            </div>
          </div>
        </div>

        {/* FOOTER: WHATSAPP ICON INTEGRATION */}
        <div style={{ 
          display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
           {/* WhatsApp Section */}
           <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="https://ik.imagekit.io/ericmwangi/whatsapp.png" 
                width={60} height={60} 
                style={{ marginRight: 20 }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#C5A059', fontSize: 20, fontWeight: 800 }}>Order via WhatsApp</span>
                <span style={{ fontSize: 42, fontWeight: 900 }}>0704 554 445</span>
              </div>
           </div>
           
           {/* Location Section */}
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ color: '#C5A059', fontSize: 20, fontWeight: 800 }}>Visit us</span>
              <span style={{ fontSize: 26, fontWeight: 900 }}>CBD, NAIROBI</span>
           </div>
        </div>

        {/* WEBSITE URL */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
          <span style={{ fontSize: 24, color: '#444', fontWeight: 800, letterSpacing: 5 }}>WWW.TRIPPLEK.CO.KE</span>
        </div>

      </div>
    ),
    { width, height }
  );
}
