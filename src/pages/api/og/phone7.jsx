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

    // Brand colors
    const MAROON = '#800000';
    const GOLD = '#C5A059';
    const CREAM = '#faf8f5';
    const DARK_MAROON = '#4a0000';

    const SOCIALS = [
      { icon: 'https://ik.imagekit.io/ericmwangi/whatsapp.png?updatedAt=1765797099945', label: 'Order' },
      { icon: 'https://ik.imagekit.io/ericmwangi/call.png?updatedAt=1765804033399', label: 'Call' },
      { icon: 'https://ik.imagekit.io/ericmwangi/instagram.png?updatedAt=1765799625326', label: 'DM' },
      { icon: 'https://ik.imagekit.io/ericmwangi/facebook.png?updatedAt=1765799627234', label: 'Like' },
      { icon: 'https://ik.imagekit.io/ericmwangi/tiktok.png?updatedAt=1765799624640', label: 'Share' },
      { icon: 'https://ik.imagekit.io/ericmwangi/x.png?updatedAt=1765799626076', label: 'Post' },
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

          {/* TOP: Maroon header with gold accent */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: 280,
            background: `linear-gradient(180deg, ${MAROON} 0%, ${DARK_MAROON} 100%)`,
            position: 'relative',
            paddingTop: 40,
          }}>
            {/* Gold top border */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: 6,
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            }} />

            <img 
              src="https://ik.imagekit.io/ericmwangi/tklogo.png?updatedAt=1764543349107" 
              width={220} 
              alt="TK" 
              style={{ filter: 'brightness(0) invert(1)' }} 
            />

            {/* Gold diamond divider */}
            <div style={{
              position: 'absolute',
              bottom: -30,
              width: 60, height: 60,
              background: GOLD,
              transform: 'rotate(45deg)',
              boxShadow: '0 10px 30px rgba(197,160,89,0.4)',
            }} />
          </div>

          {/* BRAND PILL */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 50,
            zIndex: 10,
          }}>
            <div style={{
              padding: '12px 40px',
              background: MAROON,
              borderRadius: 50,
              border: `3px solid ${GOLD}`,
              boxShadow: `0 10px 30px ${MAROON}44`,
            }}>
              <span style={{
                fontSize: 24,
                fontWeight: 800,
                color: GOLD,
                letterSpacing: 6,
                textTransform: 'uppercase',
              }}>
                {brand}
              </span>
            </div>
          </div>

          {/* PHONE IMAGE with gold ring */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            position: 'relative',
            marginTop: 20,
          }}>
            {/* Outer gold ring */}
            <div style={{
              position: 'absolute',
              width: 700, height: 700,
              borderRadius: '50%',
              border: `4px solid ${GOLD}66`,
              boxShadow: `0 0 60px ${GOLD}33, inset 0 0 60px ${CREAM}`,
            }} />

            {/* Inner maroon ring */}
            <div style={{
              position: 'absolute',
              width: 620, height: 620,
              borderRadius: '50%',
              border: `2px solid ${MAROON}44`,
            }} />

            {/* Phone */}
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={fullDeviceName}
                style={{
                  width: 550, height: 550,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                  zIndex: 20,
                }}
              />
            )}
          </div>

          {/* MODEL NAME */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center',
            marginTop: -20,
            padding: '0 40px',
          }}>
            <span style={{
              fontSize: 64,
              fontWeight: 900,
              color: MAROON,
              textAlign: 'center',
              letterSpacing: -1,
              lineHeight: 1.1,
              textShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}>
              {model}
            </span>
          </div>

          {/* PRICE - Gold badge with maroon text */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 15,
            marginTop: 30,
            padding: '20px 50px',
            background: `linear-gradient(135deg, ${GOLD} 0%, #d4af37 50%, ${GOLD} 100%)`,
            borderRadius: 16,
            border: `4px solid ${MAROON}`,
            boxShadow: `0 15px 40px ${GOLD}66, 0 0 0 4px ${CREAM}`,
            transform: 'rotate(-1deg)',
          }}>
            <span style={{ fontSize: 32, color: MAROON, fontWeight: 700, opacity: 0.9 }}>KES</span>
            <span style={{
              fontSize: 68,
              fontWeight: 900,
              color: MAROON,
              textShadow: '0 1px 2px rgba(255,255,255,0.5)',
            }}>
              {price}
            </span>
          </div>

          {/* SOCIAL ICONS - Maroon circles with gold icons */}
          <div style={{
            display: 'flex',
            gap: 18,
            marginTop: 35,
            justifyContent: 'center',
          }}>
            {SOCIALS.map((social, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}>
                <div style={{
                  width: 56, height: 56,
                  borderRadius: '50%',
                  background: MAROON,
                  border: `2px solid ${GOLD}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 15px ${MAROON}44`,
                }}>
                  <img 
                    src={social.icon} 
                    width={28} 
                    height={28} 
                    alt={social.label} 
                    style={{ filter: 'brightness(0) invert(1)' }} 
                  />
                </div>
                <span style={{ fontSize: 11, color: MAROON, fontWeight: 700, textTransform: 'uppercase' }}>
                  {social.label}
                </span>
              </div>
            ))}
          </div>

          {/* BOTTOM: Location bar */}
          <div style={{
            display: 'flex',
            width: '100%',
            padding: '25px 40px',
            marginTop: 'auto',
            background: MAROON,
            borderTop: `4px solid ${GOLD}`,
            alignItems: 'center',
          }}>
            <img 
              src="https://ik.imagekit.io/ericmwangi/globe.png?updatedAt=1768588437810" 
              width={36} 
              height={36} 
              alt="Globe"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 15 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: GOLD }}>
                CBD • OPP. MKU TOWERS • NAIROBI
              </span>
              <span style={{ fontSize: 14, color: CREAM, opacity: 0.8, marginTop: 2 }}>
                Premium Devices • Fast Delivery • Best Prices
              </span>
            </div>

            <div style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              background: GOLD,
              borderRadius: 10,
            }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: MAROON }}>
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
