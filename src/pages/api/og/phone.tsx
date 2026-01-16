import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  
  // Platform Detection
  const platform = searchParams.get('platform') || 'whatsapp'; // whatsapp, facebook, tiktok
  
  // Dynamic Dimensions
  const width = 1080;
  let height = 1920;
  let paddingBottom = '80px'; // Default

  if (platform === 'facebook') {
    height = 1350; // Shorter for FB feed
  } else if (platform === 'tiktok') {
    height = 1920;
    paddingBottom = '300px'; // Extra space at bottom so TikTok UI doesn't hide your price
  }

  // Content Data
  const device = searchParams.get('device') || 'IPHONE 16 PRO MAX';
  const price = searchParams.get('price') || '150,000';
  const imageUrl = searchParams.get('image');

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#050505', color: 'white',
        fontFamily: 'sans-serif',
        padding: `60px 60px ${paddingBottom} 60px`, // Dynamic padding
      }}>
        
        {/* LOGO */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={300} height={80} style={{ objectFit: 'contain' }} />
        </div>

        {/* TITLE BOX */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'white', color: 'black', padding: '10px 30px', borderRadius: 8, fontWeight: 900, fontSize: 32 }}>
            {device}
          </div>
        </div>

        {/* MAIN PRODUCT IMAGE */}
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           {imageUrl && <img src={imageUrl} style={{ width: '90%', height: '80%', objectFit: 'contain' }} />}
        </div>

        {/* PRICE GRID (istreet style) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 24, fontWeight: 800, marginBottom: 5 }}>128GB</span>
              <div style={{ display: 'flex', background: 'white', color: 'black', padding: '8px 20px', borderRadius: 5 }}>
                <span style={{ fontSize: 22, fontWeight: 900 }}>KES {price}</span>
              </div>
           </div>
           {/* You can add more storage options here */}
        </div>

        {/* FOOTER BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #333', paddingTop: 30 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#C5A059', fontSize: 20, fontWeight: 800 }}>WHATSAPP</span>
            <span style={{ fontSize: 32, fontWeight: 900 }}>0704 554 445</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ color: '#C5A059', fontSize: 20, fontWeight: 800 }}>LOCATION</span>
            <span style={{ fontSize: 24, fontWeight: 900 }}>CBD, NAIROBI</span>
          </div>
        </div>

      </div>
    ),
    { width, height }
  );
}
