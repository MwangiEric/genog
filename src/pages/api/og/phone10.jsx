/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

function formatPrice(price: string | null | undefined): string {
  if (!price) return '0';
  const num = parseInt(price.replace(/[^0-9]/g, ''), 10);
  if (isNaN(num)) return price;
  return num.toLocaleString('en-US');
}

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const width = 1080;
    const height = 1920;

    const fullDeviceName = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
    const price = formatPrice(searchParams.get('price'));
    const imageUrl = searchParams.get('image');

    const nameParts = fullDeviceName.split(' ');
    const brand = nameParts[0];
    const model = nameParts.slice(1).join(' ');

    // Neon Maroon palette
    const MAROON = '#800000';
    const GOLD = '#C5A059';
    const NEON_PINK = '#ff2a6d';
    const ELECTRIC_GOLD = '#ffd700';
    const DARK = '#1a0505';

    const SOCIALS = [
      { icon: 'https://ik.imagekit.io/ericmwangi/whatsapp.png?updatedAt=1765797099945', label: 'Order' },
      { icon: 'https://ik.imagekit.io/ericmwangi/call.png?updatedAt=1765804033399', label: 'Call' },
      { icon: 'https://ik.imagekit.io/ericmwangi/instagram.png?updatedAt=1765799625326', label: 'DM' },
      { icon: 'https://ik.imagekit.io/ericmwangi/facebook.png?updatedAt=1765799627234', label: 'Like' },
    ];

    return new ImageResponse(
      (
        <div style={{
          height: '100%', width: '100%',
          display: 'flex', flexDirection: 'column',
          background: DARK,
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}>

          {/* Neon grid background */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `linear-gradient(${MAROON}22 1px, transparent 1px), linear-gradient(90deg, ${MAROON}22 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            opacity: 0.5,
          }} />

          {/* Glowing orbs */}
          <div style={{
            position: 'absolute',
            width: 400, height: 400,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${NEON_PINK}33 0%, transparent 70%)`,
            top: -100, right: -100,
            filter: 'blur(40px)',
          }} />
          <div style={{
            position: 'absolute',
            width: 500, height: 500,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`,
            bottom: -200, left: -200,
            filter: 'blur(60px)',
          }} />

          {/* HEADER */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '30px 40px',
            zIndex: 10,
          }}>
            <img 
              src="https://ik.imagekit.io/ericmwangi/tklogo.png?updatedAt=1764543349107" 
              width={160} 
              alt="TK" 
              style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,42,109,0.5))' }} 
            />
            
            {/* Neon brand tag */}
            <div style={{
              padding: '8px 25px',
              background: 'transparent',
              border: `2px solid ${NEON_PINK}`,
              borderRadius: 30,
              boxShadow: `0 0 20px ${NEON_PINK}66, inset 0 0 20px ${NEON_PINK}22`,
            }}>
              <span style={{
                fontSize: 18,
                fontWeight: 800,
                color: NEON_PINK,
                letterSpacing: 4,
                textTransform: 'uppercase',
              }}>
                {brand}
              </span>
            </div>
          </div>

          {/* PHONE with neon frame */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            position: 'relative',
            zIndex: 10,
          }}>
            {/* Hexagon frame */}
            <div style={{
              position: 'absolute',
              width: 650, height: 650,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: `linear-gradient(135deg, ${MAROON} 0%, ${NEON_PINK} 100%)`,
              opacity: 0.3,
            }} />
            
            {/* Inner hexagon */}
            <div style={{
              position: 'absolute',
              width: 600, height: 600,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: DARK,
              border: `3px solid ${GOLD}`,
            }} />

            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={fullDeviceName}
                style={{
                  width: 480, height: 480,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 40px rgba(255,42,109,0.4))',
                  zIndex: 20,
                }}
              />
            )}
          </div>

          {/* MODEL - Neon text */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center',
            padding: '0 40px',
            zIndex: 10,
            marginTop: -20,
          }}>
            <span style={{
              fontSize: 56,
              fontWeight: 900,
              color: ELECTRIC_GOLD,
              textAlign: 'center',
              letterSpacing: 2,
              textShadow: `0 0 20px ${NEON_PINK}, 0 0 40px ${NEON_PINK}66`,
            }}>
              {model}
            </span>
          </div>

          {/* PRICE - Neon badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 15,
            marginTop: 25,
            padding: '20px 50px',
            background: 'transparent',
            border: `3px solid ${ELECTRIC_GOLD}`,
            borderRadius: 15,
            boxShadow: `0 0 30px ${GOLD}44, inset 0 0 30px ${GOLD}22`,
            zIndex: 10,
          }}>
            <span style={{ fontSize: 28, color: NEON_PINK, fontWeight: 800 }}>KES</span>
            <span style={{
              fontSize: 64,
              fontWeight: 900,
              color: ELECTRIC_GOLD,
              textShadow: `0 0 20px ${GOLD}`,
            }}>
              {price}
            </span>
          </div>

          {/* SOCIAL - Neon circles */}
          <div style={{
            display: 'flex',
            gap: 20,
            marginTop: 30,
            justifyContent: 'center',
            zIndex: 10,
          }}>
            {SOCIALS.map((social, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}>
                <div style={{
                  width: 60, height: 60,
                  borderRadius: '50%',
                  background: 'transparent',
                  border: `2px solid ${NEON_PINK}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 15px ${NEON_PINK}66`,
                }}>
                  <img 
                    src={social.icon} 
                    width={28} 
                    height={28} 
                    alt={social.label} 
                    style={{ filter: 'brightness(0) invert(1)' }} 
                  />
                </div>
                <span style={{ fontSize: 12, color: NEON_PINK, fontWeight: 700 }}>
                  {social.label}
                </span>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div style={{
            display: 'flex',
            width: '100%',
            padding: '25px 40px',
            marginTop: 'auto',
            background: MAROON,
            borderTop: `3px solid ${NEON_PINK}`,
            alignItems: 'center',
            zIndex: 10,
            boxShadow: `0 -10px 40px ${MAROON}66`,
          }}>
            <img 
              src="https://ik.imagekit.io/ericmwangi/globe.png?updatedAt=1768588437810" 
              width={35} 
              height={35} 
              alt="Globe"
              style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 8px rgba(255,42,109,0.8))' }}
            />
            
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 15 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: ELECTRIC_GOLD }}>
                CBD • OPP. MKU TOWERS
              </span>
              <span style={{ fontSize: 14, color: NEON_PINK, marginTop: 2 }}>
                NAIROBI, KENYA
              </span>
            </div>

            <div style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 25px',
              background: NEON_PINK,
              borderRadius: 10,
              boxShadow: `0 0 20px ${NEON_PINK}66`,
            }}>
              <span style={{ fontSize: 24, fontWeight: 900, color: DARK }}>
                0733 565861
              </span>
            </div>
          </div>

        </div>
      ),
      { width, height }
    );
  } catch (e: any) {
    return new Response(`Generation failed: ${e.message}`, { status: 500 });
  }
}
