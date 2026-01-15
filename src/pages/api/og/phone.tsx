import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// Primary and Secondary CDN URLs
const FONT_URL_1 = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFufMZhrib2Bg-4.ttf';
const FONT_URL_2 = 'https://cdn.jsdelivr.net/gh/googlefonts/inter@master/docs/font-files/Inter-Bold.ttf';

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // ✅ Sequential Loading with Failover
    let fontBuffer;
    try {
      const res = await fetch(FONT_URL_1);
      fontBuffer = await res.arrayBuffer();
      
      // Critical Check: Detect the <htm error signature
      const check = new Uint8Array(fontBuffer.slice(0, 4));
      if (String.fromCharCode(...check) === '<htm') throw new Error('CDN_ERROR');
    } catch (e) {
      // ✅ Fallback to Secondary CDN if Primary fails
      const res = await fetch(FONT_URL_2);
      fontBuffer = await res.arrayBuffer();
    }

    // Design params
    const device = searchParams.get('device') || 'DEVICE';
    const price = searchParams.get('price') || '0';
    const imageUrl = searchParams.get('image');
    const glow = searchParams.get('glow') || 'C5A059';

    return new ImageResponse(
      (
        <div style={{ 
          height: '100%', width: '100%', display: 'flex', flexDirection: 'column', 
          backgroundColor: '#050505', color: 'white', fontFamily: 'Inter' 
        }}>
          {/* Your Triple K Layout Logic */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 70 }}>
              <span style={{ fontSize: 60, fontWeight: 900, color: '#C5A059', letterSpacing: 10 }}>TRIPLE K</span>
          </div>

          <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <div style={{ position: 'absolute', width: 850, height: 850, background: `radial-gradient(circle, #${glow}44 0%, transparent 70%)`, borderRadius: '50%' }} />
             {imageUrl && <img src={imageUrl} style={{ width: 950, height: 950, objectFit: 'contain', zIndex: 10 }} />}
          </div>

          <div style={{ display: 'flex', background: '#3EB489', padding: '20px', borderRadius: 100, border: '5px solid #C5A059', alignSelf: 'center', marginBottom: 50 }}>
            <span style={{ fontSize: 80, fontWeight: 900, color: '#000' }}>KSH {price}</span>
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1920,
        fonts: [
          {
            name: 'Inter',
            data: fontBuffer,
            weight: 900,
            style: 'normal',
          },
        ],
      }
    );
  } catch (err: any) {
    // Final Safety Net: Returns a 200 status with text so the user knows what happened
    console.error(err);
    return new Response(`Render Error: ${err.message}`, { status: 200 });
  }
}
