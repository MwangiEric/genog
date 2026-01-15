import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const device = searchParams.get('device') || 'PREMIUM DEVICE';
  const price = searchParams.get('price') || '0';
  const imageUrl = searchParams.get('image');

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#050505',
        padding: '80px',
        fontFamily: 'sans-serif',
        color: 'white',
        position: 'relative',
      }}>
        {/* TOP BRANDING */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: 40 }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={350} height={100} style={{ objectFit: 'contain' }} />
        </div>

        {/* PRODUCT TITLE */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 110, fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', letterSpacing: -4, lineHeight: 1 }}>
            {device}
          </span>
        </div>

        {/* HERO IMAGE SECTION */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          {/* Subtle Glow Background */}
          <div style={{ position: 'absolute', width: 900, height: 900, background: 'radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
          
          {imageUrl && (
            <img src={imageUrl} style={{ width: 950, height: 950, objectFit: 'contain' }} />
          )}
        </div>

        {/* PRICE & CTA SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
          <div style={{ display: 'flex', background: '#3EB489', padding: '20px 80px', borderRadius: 25, marginBottom: 40, boxShadow: '0 25px 50px rgba(62, 180, 137, 0.3)' }}>
            <span style={{ fontSize: 85, fontWeight: 900 }}>KES {price}</span>
          </div>
          
          {/* FOOTER CTA */}
          <div style={{ display: 'flex', width: '100%', background: '#111', padding: '40px', borderRadius: 30, border: '1px solid #222', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#C5A059', fontSize: 24, fontWeight: 800 }}>WHATSAPP TO ORDER</span>
                <span style={{ fontSize: 45, fontWeight: 900 }}>0704 554 445</span>
             </div>
             <div style={{ display: 'flex', background: '#C5A059', color: 'black', padding: '15px 40px', borderRadius: 15, fontWeight: 900, fontSize: 28 }}>
                BUY NOW
             </div>
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
