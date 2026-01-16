import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  // Core Params
  const device = searchParams.get('device') || 'SMARTPHONE';
  const price  = searchParams.get('price')  || '0';
  const imageUrl = searchParams.get('image');
  
  // Feature Params (Bullet points)
  const f1 = searchParams.get('f1') || 'Premium Build';
  const f2 = searchParams.get('f2') || 'High Refresh Rate';
  const f3 = searchParams.get('f3') || 'Fast Charging';
  const f4 = searchParams.get('f4') || 'Official Warranty';

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%', display: 'flex',
        backgroundColor: '#f5f5f5', color: '#000', fontFamily: 'sans-serif'
      }}>
        
        {/* LEFT PANEL: Branding & Image (Matches the "TCL Red" Style) */}
        <div style={{ 
          display: 'flex', flexDirection: 'column', width: '50%', 
          backgroundColor: '#C5A059', padding: '60px', position: 'relative' 
        }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={250} height={80} style={{ objectFit: 'contain' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '60px' }}>
            <span style={{ fontSize: 100, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{device}</span>
          </div>

          <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
            {imageUrl && <img src={imageUrl} style={{ width: '100%', height: '80%', objectFit: 'contain' }} />}
          </div>

          <div style={{ 
            display: 'flex', backgroundColor: '#000', padding: '20px 40px', 
            borderRadius: '10px', marginTop: 'auto' 
          }}>
            <span style={{ fontSize: 60, fontWeight: 900, color: '#C5A059' }}>KES {price}</span>
          </div>
        </div>

        {/* RIGHT PANEL: Features & Contact (Matches the "Clean White" Style) */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', padding: '80px 60px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '60px' }}>
            <span style={{ 
              backgroundColor: '#000', color: '#C5A059', padding: '10px 30px', 
              borderRadius: '50px', fontSize: 24, fontWeight: 800, alignSelf: 'flex-start' 
            }}>
              KEY FEATURES
            </span>
            
            <ul style={{ display: 'flex', flexDirection: 'column', marginTop: '40px', gap: '25px', padding: 0 }}>
              {[f1, f2, f3, f4].map((feature) => (
                <div key={feature} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#C5A059', marginRight: 20, display: 'flex' }} />
                  <span style={{ fontSize: 32, fontWeight: 700 }}>{feature}</span>
                </div>
              ))}
            </ul>
          </div>

          {/* CALL TO ACTION */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <div style={{ display: 'flex', backgroundColor: '#3EB489', padding: '30px', borderRadius: '20px', justifyContent: 'center' }}>
                <span style={{ fontSize: 40, fontWeight: 900, color: '#fff' }}>CHAT ON WHATSAPP</span>
             </div>
             
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 20, color: '#777', fontWeight: 800 }}>PHONE</span>
                  <span style={{ fontSize: 32, fontWeight: 900 }}>0704 554 445</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: 20, color: '#777', fontWeight: 800 }}>LOCATION</span>
                  <span style={{ fontSize: 26, fontWeight: 900 }}>CBD, NAIROBI</span>
                </div>
             </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
             <span style={{ fontSize: 24, fontWeight: 800, color: '#C5A059', letterSpacing: 3 }}>WWW.TRIPPLEK.CO.KE</span>
          </div>
        </div>

      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
