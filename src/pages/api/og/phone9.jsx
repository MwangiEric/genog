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

    // Elegant Gold palette
    const MAROON = '#800000';
    const GOLD = '#C5A059';
    const LIGHT_GOLD = '#e8d5a3';
    const CREAM = '#faf8f5';
    const CHARCOAL = '#2c2c2c';

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
          background: CREAM,
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}>

          {/* Subtle gold pattern */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `radial-gradient(circle at 20% 80%, ${LIGHT_GOLD}33 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${LIGHT_GOLD}33 0%, transparent 50%)`,
            opacity: 0.6,
          }} />

          {/* TOP: Elegant header */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 200,
            background: `linear-gradient(180deg, ${MAROON} 0%, ${MAROON}dd 100%)`,
            position: 'relative',
            borderBottom: `6px double ${GOLD}`,
          }}>
            {/* Corner ornaments */}
            <div style={{
              position: 'absolute',
              top: 20, left: 30,
              width: 40, height: 40,
              borderLeft: `3px solid ${GOLD}`,
              borderTop: `3px solid ${GOLD}`,
            }} />
            <div style={{
              position: 'absolute',
              top: 20, right: 30,
              width: 40, height: 40,
              borderRight: `3px solid ${GOLD}`,
              borderTop: `3px solid ${GOLD}`,
            }} />

            <img 
              src="https://ik.imagekit.io/ericmwangi/tklogo.png?updatedAt=1764543349107" 
              width={180} 
              alt="TK" 
              style={{ filter: 'brightness(0) invert(1)' }} 
            />
          </div>

          {/* BRAND - Gold ribbon */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 30,
            zIndex: 10,
          }}>
            <div style={{
              padding: '15px 50px',
              background: `linear-gradient(180deg, ${GOLD} 0%, ${LIGHT_GOLD} 50%, ${GOLD} 100%)`,
              borderRadius: 5,
              border: `2px solid ${MAROON}`,
              boxShadow: '0 10px 30px rgba(197,160,89,0.4)',
            }}>
              <span style={{
                fontSize: 26,
                fontWeight: 900,
                color: MAROON,
                letterSpacing: 8,
                textTransform: 'uppercase',
              }}>
                {brand}
              </span>
            </div>
          </div>

          {/* PHONE with elegant frame */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            position: 'relative',
            marginTop: 20,
            zIndex: 10,
          }}>
            {/* Ornate frame */}
            <div style={{
              position: 'absolute',
              width: 700, height: 700,
              borderRadius: 20,
              border: `8px double ${GOLD}`,
              background: 'transparent',
              boxShadow: `0 20px 60px rgba(197,160,89,0.3), inset 0 0 60px ${LIGHT_GOLD}22`,
            }} />
            
            {/* Inner shadow */}
            <div style={{
              position: 'absolute',
              width: 660, height: 660,
              borderRadius: 15,
              border: `2px solid ${MAROON}33`,
              background: `linear-gradient(135deg, ${CREAM} 0%, transparent 100%)`,
            }} />

            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={fullDeviceName}
                style={{
                  width: 520, height: 520,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 15px 40px rgba(0,0,0,0.2))',
                  zIndex: 20,
                }}
              />
            )}
          </div>

          {/* MODEL - Elegant typography */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center',
            marginTop: -10,
            padding: '0 50px',
            zIndex: 10,
          }}>
            <span style={{
              fontSize: 52,
              fontWeight: 400,
              color: CHARCOAL,
              textAlign: 'center',
              letterSpacing: 1,
              fontStyle: 'italic',
            }}>
              {model}
            </span>
            {/* Gold divider line */}
            <div style={{
              width: 150, height: 3,
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
              marginTop: 15,
            }} />
          </div>

          {/* PRICE - Luxury badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 15,
            marginTop: 30,
            padding: '25px 60px',
            background: MAROON,
            borderRadius: 10,
            border: `4px solid ${GOLD}`,
            boxShadow: '0 15px 40px rgba(128,0,0,0.3)',
            zIndex: 10,
          }}>
            <span style={{ 
              fontSize: 24, 
              color: LIGHT_GOLD, 
              fontWeight: 600,
              fontStyle: 'italic',
            }}>KES</span>
            <span style={{
              fontSize: 68,
              fontWeight: 300,
              color: GOLD,
              letterSpacing: 2,
            }}>
              {price}
            </span>
          </div>

          {/* SOCIAL - Elegant circles */}
          <div style={{
            display: 'flex',
            gap: 25,
            marginTop: 35,
            justifyContent: 'center',
            zIndex: 10,
          }}>
            {SOCIALS.map((social, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{
                  width: 60, height: 60,
                  borderRadius: '50%',
                  background: CREAM,
                  border: `3px solid ${GOLD}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 25px rgba(197,160,89,0.3)',
                }}>
                  <img 
                    src={social.icon} 
                    width={28} 
                    height={28} 
                    alt={social.label} 
                    style={{ filter: 'brightness(0) saturate(0) sepia(1) hue-rotate(-50deg)' }} 
                  />
                </div>
                <span style={{ 
                  fontSize: 12, 
                  color: MAROON, 
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                  {social.label}
                </span>
              </div>
            ))}
          </div>

          {/* FOOTER - Elegant bar */}
          <div style={{
            display: 'flex',
            width: '100%',
            padding: '30px 50px',
            marginTop: 'auto',
            background: CHARCOAL,
            borderTop: `4px solid ${GOLD}`,
            alignItems: 'center',
            zIndex: 10,
          }}>
            {/* Gold corner accents */}
            <div style={{
              position: 'absolute',
              bottom: 80, left: 20,
              width: 30, height: 30,
              borderLeft: `2px solid ${GOLD}`,
              borderBottom: `2px solid ${GOLD}`,
            }} />
            
            <img 
              src="https://ik.imagekit.io/ericmwangi/globe.png?updatedAt=1768588437810" 
              width={32} 
              height={32} 
              alt="Globe"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 15 }}>
              <span style={{ fontSize: 18, fontWeight: 400, color: LIGHT_GOLD, letterSpacing: 2 }}>
                CBD • OPP. MKU TOWERS • NAIROBI
              </span>
              <span style={{ fontSize: 13, color: GOLD, marginTop: 3, fontStyle: 'italic' }}>
                Premium Devices Since 2015
              </span>
            </div>

            <div style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '15px 30px',
              background: GOLD,
              borderRadius: 8,
            }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: MAROON, letterSpacing: 1 }}>
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
