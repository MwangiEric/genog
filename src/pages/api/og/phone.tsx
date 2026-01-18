/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const variant = searchParams.get('variant') || 'status'; 
  const width = 1080;
  let height = 1920; 

  if (variant === 'catalog') height = 1080; 
  if (variant === 'banner') height = 650;

  const isLight = searchParams.get('theme') === 'light';
  
  const COLORS = {
    bg: isLight ? '#FFFFFF' : '#050505',
    text: isLight ? '#111111' : '#FFFFFF',
    device: isLight ? '#800000' : '#FFFFFF',
    card: isLight ? '#F7F7F7' : '#0f0f0f',
    border: isLight ? '#E5E5E5' : '#222222',
    glow: isLight ? 'rgba(128,0,0,0.08)' : 'rgba(255,255,255,0.12)',
    maroon: '#800000',
    gold: '#C5A059',
    mint: '#3EB489'
  };

  const device = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
  const price = searchParams.get('price') || 'TBD';
  const ram = searchParams.get('ram') || '---';
  const rom = searchParams.get('rom') || '---';
  const bat = searchParams.get('bat') || '---';
  const scr = searchParams.get('scr') || '---';
  const imageUrl = searchParams.get('image');

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%', 
        display: 'flex',
        flexDirection: variant === 'banner' ? 'row' : 'column',
        backgroundColor: COLORS.bg, color: COLORS.text,
        padding: variant === 'banner' ? '40px' : '60px',
        alignItems: 'center', fontFamily: 'sans-serif',
      }}>
        
        {/* LOGO WRAPPER */}
        <div style={{ position: 'absolute', top: 40, display: 'flex', width: '100%', justifyContent: 'center' }}>
          <img 
            src="https://ik.imagekit.io/ericmwangi/tklogo.png" 
            width={variant === 'status' ? 320 : 220} 
            height={80} 
            alt="Logo"
            style={{ objectFit: 'contain' }} 
          />
        </div>

        {/* HERO IMAGE AREA WITH FALLBACK */}
        <div style={{ 
          display: 'flex',
          width: variant === 'banner' ? '45%' : '100%',
          height: variant === 'banner' ? '100%' : variant === 'catalog' ? '40%' : '45%',
          justifyContent: 'center', alignItems: 'center', position: 'relative',
          marginTop: variant === 'banner' ? 0 : 80
        }}>
          <div style={{ position: 'absolute', display: 'flex', width: 800, height: 800, background: `radial-gradient(circle, ${COLORS.glow} 0%, transparent 70%)`, borderRadius: '50%' }} />
          
          {imageUrl ? (
            <img 
               src={imageUrl} 
               alt="Phone"
               style={{ width: '90%', height: '90%', objectFit: 'contain', zIndex: 10 }} 
            />
          ) : (
            /* FALLBACK ICON/LOGO WHEN NO IMAGE IS PROVIDED */
            <div style={{ display: 'flex', opacity: 0.2, zIndex: 10 }}>
               <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={400} alt="Fallback" style={{ objectFit: 'contain', filter: isLight ? 'grayscale(1)' : 'invert(1)' }} />
            </div>
          )}
        </div>

        {/* CONTENT AREA */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column', 
          width: variant === 'banner' ? '55%' : '100%',
          alignItems: variant === 'banner' ? 'flex-start' : 'center',
          textAlign: variant === 'banner' ? 'left' : 'center'
        }}>
          <span style={{ 
            display: 'flex',
            fontSize: variant === 'status' ? 100 : 70, 
            fontWeight: 900, color: COLORS.device, letterSpacing: -3, lineHeight: 1 
          }}>
            {device}
          </span>
          <div style={{ display: 'flex', height: 5, width: 100, background: isLight ? COLORS.gold : COLORS.maroon, marginTop: 15 }} />

          {/* SPECS GRID */}
          {variant !== 'banner' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 30 }}>
              {[ { l: 'RAM', v: ram }, { l: 'ROM', v: rom }, { l: 'BAT', v: bat }, { l: 'SCR', v: scr } ].map(s => (
                <div key={s.l} style={{ display: 'flex', background: COLORS.card, padding: '12px 18px', borderRadius: 15, border: `1px solid ${COLORS.border}`, flexDirection: 'column', minWidth: '110px' }}>
                  <span style={{ display: 'flex', color: COLORS.gold, fontSize: 12, fontWeight: 800 }}>{s.l}</span>
                  <span style={{ display: 'flex', fontSize: 18, fontWeight: 900, color: isLight ? COLORS.maroon : '#FFF' }}>{s.v}</span>
                </div>
              ))}
            </div>
          )}

          {/* PRICE */}
          <div style={{ 
            display: 'flex',
            backgroundColor: isLight ? COLORS.maroon : COLORS.mint, 
            padding: '20px 60px', borderRadius: 20, marginTop: 40,
          }}>
            <span style={{ display: 'flex', fontSize: 60, fontWeight: 900, color: isLight ? '#FFF' : '#000' }}>KES {price}</span>
          </div>

          {/* FOOTER */}
          <div style={{ 
            display: 'flex',
            width: variant === 'banner' ? '100%' : '90%', 
            background: COLORS.card, padding: '25px', borderRadius: 30, 
            border: `1px solid ${isLight ? '#EEE' : 'rgba(128,0,0,0.2)'}`, 
            justifyContent: 'space-between', alignItems: 'center', marginTop: 40 
          }}>
             <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" width={50} height={50} alt="WhatsApp" style={{ marginRight: 15 }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ display: 'flex', fontSize: 28, fontWeight: 900, color: isLight ? COLORS.maroon : '#FFF' }}>0733 565861</span>
                  <span style={{ display: 'flex', fontSize: 18, fontWeight: 800, opacity: 0.6 }}>0715 130013</span>
                </div>
             </div>
             <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 15 }}>
                  <span style={{ display: 'flex', color: COLORS.gold, fontSize: 12, fontWeight: 800 }}>LOCATION</span>
                  <span style={{ display: 'flex', fontSize: 18, fontWeight: 900, color: isLight ? COLORS.maroon : '#FFF' }}>CBD OPP. MKU</span>
                </div>
                <img src="https://ik.imagekit.io/ericmwangi/location.png" width={45} height={45} alt="Location" />
             </div>
          </div>
        </div>

      </div>
    ),
    { width, height }
  );
}
