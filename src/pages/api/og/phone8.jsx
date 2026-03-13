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

    // Brand colors + Mint accent
    const MAROON = '#800000';
    const GOLD = '#C5A059';
    const MINT = '#98D8C8';
    const DARK_MINT = '#6BC4B0';
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
          background: `linear-gradient(180deg, ${CREAM} 0%, ${MINT}15 50%, ${CREAM} 100%)`,
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}>

          {/* Mint accent bars top */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: 8,
            background: `linear-gradient(90deg, ${MAROON} 0%, ${MINT} 50%, ${GOLD} 100%)`,
          }} />

          {/* HEADER: Maroon with mint accent */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: 260,
            background: `linear-gradient(135deg, ${MAROON} 0%, ${DARK_MAROON} 100%)`,
            position: 'relative',
            paddingTop: 35,
            borderBottom: `4px solid ${MINT}`,
          }}>
            {/* Mint corner accent */}
            <div style={{
              position: 'absolute',
              top: 20, right: 20,
              width: 60, height: 60,
              border: `3px solid ${MINT}`,
              borderRadius: '50%',
              opacity: 0.6,
            }} />

            <img 
              src="https://ik.imagekit.io/ericmwangi/tklogo.png?updatedAt=1764543349107" 
              width={200} 
              alt="TK" 
              style={{ filter: 'brightness(0) invert(1)' }} 
            />

            {/* Gold + Mint diamond divider */}
            <div style={{
              position: 'absolute',
              bottom: -25,
              width: 50, height: 50,
              background: `linear-gradient(135deg, ${GOLD} 0%, ${MINT} 100%)`,
              transform: 'rotate(45deg)',
              boxShadow: `0 10px 30px ${MINT}66`,
            }} />
          </div>

          {/* BRAND PILL: Mint background */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 45,
            zIndex: 10,
          }}>
            <div style={{
              padding: '10px 35px',
              background: MINT,
              borderRadius: 50,
              border: `3px solid ${MAROON}`,
              boxShadow: `0 8px 25px ${MINT}88`,
            }}>
              <span style={{
                fontSize: 22,
                fontWeight: 900,
                color: MAROON,
                letterSpacing: 5,
                textTransform: 'uppercase',
              }}>
                {brand}
              </span>
            </div>
          </div>

          {/* PHONE SECTION with mint ring */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            position: 'relative',
            marginTop: 10,
          }}>
            {/* Mint glow ring */}
            <div style={{
              position: 'absolute',
              width: 720, height: 720,
              borderRadius: '50%',
              border: `6px solid ${MINT}55`,
              boxShadow: `0 0 80px ${MINT}44, inset 0 0 60px ${MINT}22`,
            }} />

            {/* Gold inner ring */}
            <div style={{
              position: 'absolute',
              width: 640, height: 640,
              borderRadius: '50%',
              border: `3px solid ${GOLD}66`,
            }} />

            {/* Maroon accent ring */}
            <div style={{
              position: 'absolute',
              width: 580, height: 580,
              borderRadius: '50%',
              border: `2px dashed ${MAROON}33`,
            }} />

            {/* Phone */}
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={fullDeviceName}
                style={{
                  width: 520, height: 520,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.25))',
                  zIndex: 20,
                }}
              />
            )}
          </div>

          {/* MODEL: Maroon with mint underline */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center',
            marginTop: -10,
            padding: '0 40px',
          }}>
            <span style={{
              fontSize: 60,
              fontWeight: 900,
              color: MAROON,
              textAlign: 'center',
              letterSpacing: -1,
              lineHeight: 1.1,
            }}>
              {model}
            </span>
            {/* Mint underline accent */}
            <div style={{
              width: 100, height: 4,
              background: `linear-gradient(90deg, transparent, ${MINT}, transparent)`,
              marginTop: 10,
              borderRadius: 2,
            }} />
          </div>

          {/* PRICE: Mint badge with maroon/gold */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 25,
            padding: '18px 45px',
            background: `linear-gradient(135deg, ${MINT} 0%, ${DARK_MINT} 100%)`,
            borderRadius: 20,
            border: `4px solid ${MAROON}`,
            boxShadow: `0 15px 40px ${MINT}66, 0 0 0 4px ${GOLD}`,
          }}>
            <span style={{ 
              fontSize: 28, 
              color: MAROON, 
              fontWeight: 800,
              background: GOLD,
              padding: '4px 12px',
              borderRadius: 8,
            }}>KES</span>
            <span style={{
              fontSize: 64,
              fontWeight: 900,
              color: MAROON,
            }}>
              {price}
            </span>
          </div>

          {/* SOCIAL: Mint circles with maroon icons */}
          <div style={{
            display: 'flex',
            gap: 16,
            marginTop: 30,
            justifyContent: 'center',
          }}>
            {SOCIALS.map((social, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
              }}>
                <div style={{
                  width: 54, height: 54,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${MINT} 0%, ${DARK_MINT} 100%)`,
                  border: `3px solid ${MAROON}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 6px 20px ${MINT}66`,
                }}>
                  <img 
                    src={social.icon} 
                    width={26} 
                    height={26} 
                    alt={social.label} 
                    style={{ filter: 'brightness(0) invert(0.2) sepia(1) hue-rotate(-50deg) saturate(5)' }} 
                  />
                </div>
                <span style={{ 
                  fontSize: 11, 
                  color: MAROON, 
                  fontWeight: 700, 
                  textTransform: 'uppercase',
                  background: GOLD,
                  padding: '2px 8px',
                  borderRadius: 4,
                }}>
                  {social.label}
                </span>
              </div>
            ))}
          </div>

          {/* FOOTER: Maroon with mint/gold accents */}
          <div style={{
            display: 'flex',
            width: '100%',
            padding: '22px 35px',
            marginTop: 'auto',
            background: MAROON,
            borderTop: `5px solid ${MINT}`,
            alignItems: 'center',
            position: 'relative',
          }}>
            {/* Gold corner accent */}
            <div style={{
              position: 'absolute',
              top: -15, left: 30,
              width: 30, height: 30,
              background: GOLD,
              transform: 'rotate(45deg)',
            }} />

            <img 
              src="https://ik.imagekit.io/ericmwangi/globe.png?updatedAt=1768588437810" 
              width={32} 
              height={32} 
              alt="Globe"
              style={{ filter: `drop-shadow(0 0 8px ${MINT})` }}
            />
            
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 12 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: MINT }}>
                CBD • OPP. MKU TOWERS • NAIROBI
              </span>
              <span style={{ fontSize: 13, color: GOLD, marginTop: 2 }}>
                Premium Devices • Fast Delivery
              </span>
            </div>

            <div style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              background: `linear-gradient(135deg, ${GOLD} 0%, ${MINT} 100%)`,
              borderRadius: 12,
              border: `2px solid ${CREAM}`,
            }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: MAROON }}>
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
