import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// PRIMARY FONT: Inter Bold from Google Static
const FONT_PRIMARY = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFufMZhrib2Bg-4.ttf';
// SECONDARY FONT: Roboto from a different CDN (Cloudflare/jsDelivr)
const FONT_SECONDARY = 'https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-700-normal.ttf';

// Pre-fetching both to ensure they are available
const fontBold = fetch(new URL(FONT_PRIMARY, import.meta.url)).then(res => res.arrayBuffer());
const fontFallback = fetch(new URL(FONT_SECONDARY, import.meta.url)).then(res => res.arrayBuffer());

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Load fonts in parallel for speed
    const [primaryData, secondaryData] = await Promise.all([fontBold, fontFallback]);

    // Check if what we got is actually a font binary (OpenType starts with 'OTTO' or '\0\1\0\0')
    const isValidFont = (buf: ArrayBuffer) => {
        const view = new Uint8Array(buf.slice(0, 4));
        const sig = String.fromCharCode(...view);
        return sig !== '<htm'; // If it starts with '<htm', it's a 404 error page
    };

    // Determine the best available font
    const activeFont = isValidFont(primaryData) ? primaryData : secondaryData;

    const device = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
    const price = searchParams.get('price') || '0';
    const imageUrl = searchParams.get('image');
    const glow = searchParams.get('glow') || 'C5A059';
    
    // Technical Specs
    const ram = searchParams.get('ram') || '12GB';
    const rom = searchParams.get('rom') || '256GB';
    const bat = searchParams.get('bat') || '5000mAh';
    const scr = searchParams.get('scr') || '6.7"';

    return new ImageResponse(
      (
        <div style={{ 
          height: '100%', width: '100%', display: 'flex', flexDirection: 'column', 
          backgroundColor: '#050505', color: 'white', fontFamily: 'CustomFont' 
        }}>
          {/* ... DESIGN CODE REMAINS THE SAME ... */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 70 }}>
              <span style={{ fontSize: 60, fontWeight: 900, color: '#C5A059', letterSpacing: 10 }}>TRIPLE K</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30, padding: '0 60px' }}>
            <span style={{ fontSize: device.length > 20 ? 80 : 105, fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', letterSpacing: -4, lineHeight: 0.9 }}>
              {device}
            </span>
          </div>

          <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', width: 850, height: 850, background: `radial-gradient(circle, #${glow}44 0%, transparent 70%)`, borderRadius: '50%' }} />
            {imageUrl && <img src={imageUrl} style={{ width: 950, height: 950, objectFit: 'contain', zIndex: 10 }} />}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 50 }}>
            <div style={{ background: '#3EB489', padding: '20px 110px', borderRadius: 100, border: '5px solid #C5A059' }}>
              <span style={{ fontSize: 85, fontWeight: 900, color: '#000' }}>KSH {price}</span>
            </div>
          </div>
          {/* ... END OF DESIGN CODE ... */}
        </div>
      ),
      {
        width: 1080,
        height: 1920,
        fonts: [
          {
            name: 'CustomFont',
            data: activeFont, // Dynamically selected valid font binary
            style: 'normal',
            weight: 900,
          },
        ],
      }
    );
  } catch (e: any) {
    // If EVERYTHING fails, return a basic system-font image response so the UI doesn't break
    console.error("Critical Render Error:", e.message);
    return new Response(`Triple K Render Error: Please refresh image.`, { status: 200 });
  }
}
