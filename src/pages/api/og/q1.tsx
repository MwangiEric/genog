/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Content Params
    const device = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
    const price = searchParams.get('price') || 'TBD';
    const ram = searchParams.get('ram') || '---';
    const rom = searchParams.get('rom') || '---';
    const bat = searchParams.get('bat') || '---';
    const scr = searchParams.get('scr') || '---';
    const imageUrl = searchParams.get('image');

    // Modern Color Palette
    const PRIMARY = '#6366F1';      // Indigo
    const SECONDARY = '#8B5CF6';    // Purple
    const ACCENT = '#EC4899';       // Pink
    const GRADIENT_START = '#1E293B'; // Dark Slate
    const GRADIENT_END = '#0F172A';   // Darker Slate

    return new ImageResponse(
      (
        <div style={{
          height: '100%', width: '100%',
          background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
          color: 'white',
          fontFamily: 'Inter, -apple-system, sans-serif',
          padding: '80px 60px',
          display: 'flex',
          flexDirection: 'column'
        }}>

          {/* BRAND BADGE */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 40
          }}>
            <div style={{ 
              background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
              padding: '12px 32px',
              borderRadius: 50,
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)'
            }}>
              <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: 1 }}>PRO</span>
            </div>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '15px 35px',
              borderRadius: 30,
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <span style={{ fontSize: 24, fontWeight: 600, opacity: 0.9 }}>KENYA</span>
            </div>
          </div>

          {/* DEVICE NAME */}
          <div style={{ marginBottom: 20, textAlign: 'center' }}>
            <span style={{ 
              fontSize: device.length > 20 ? 65 : device.length > 15 ? 75 : 90, 
              fontWeight: 800, 
              letterSpacing: -2,
              background: `linear-gradient(90deg, #FFFFFF 0%, #A5B4FC 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'block',
              lineHeight: 1.1
            }}>
              {device}
            </span>
          </div>

          {/* DECORATIVE DIVIDER */}
          <div style={{ 
            height: 4, 
            background: `linear-gradient(90deg, transparent 0%, ${PRIMARY} 25%, ${SECONDARY} 50%, ${ACCENT} 75%, transparent 100%)`,
            marginBottom: 50,
            borderRadius: 2,
            maxWidth: 400,
            margin: '0 auto 50px'
          }} />

          {/* HERO IMAGE AREA */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            position: 'relative',
            marginBottom: 60,
            flex: 1
          }}>
            {/* Glowing Orb Background */}
            <div style={{ 
              position: 'absolute',
              width: 800,
              height: 800,
              background: `radial-gradient(circle, ${PRIMARY}20 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(40px)',
              zIndex: 1
            }} />
            
            {/* Product Image Container */}
            <div style={{
              position: 'relative',
              width: '85%',
              height: '75%',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 40,
              border: `2px solid rgba(255, 255, 255, 0.1)`,
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              zIndex: 10
            }}>
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt="Device" 
                  style={{ 
                    width: '90%', 
                    height: '90%', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))'
                  }} 
                />
              ) : (
                <div style={{ 
                  color: 'rgba(255, 255, 255, 0.3)',
                  fontSize: 36,
                  fontWeight: 700,
                  textAlign: 'center',
                  padding: '40px'
                }}>
                  NO IMAGE<br />SELECTED
                </div>
              )}
            </div>
          </div>

          {/* SPECS GRID - MODERN CARDS */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            marginBottom: 50
          }}>
            {[
              { label: 'SCREEN', val: scr, color: PRIMARY },
              { label: 'RAM', val: ram, color: SECONDARY },
              { label: 'STORAGE', val: rom, color: ACCENT },
              { label: 'BATTERY', val: bat, color: '#38BDF8' }
            ].map((spec) => (
              <div key={spec.label} style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid rgba(255, 255, 255, 0.1)`,
                borderRadius: 20,
                padding: '25px 15px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}>
                <div style={{ 
                  fontSize: 16, 
                  fontWeight: 600, 
                  opacity: 0.7, 
                  marginBottom: 10,
                  letterSpacing: 0.5
                }}>
                  {spec.label}
                </div>
                <div style={{ 
                  fontSize: 28, 
                  fontWeight: 800,
                  background: `linear-gradient(90deg, ${spec.color} 0%, #FFFFFF 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {spec.val}
                </div>
              </div>
            ))}
          </div>

          {/* PRICE BADGE - CENTERED */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: 60
          }}>
            <div style={{ 
              background: `linear-gradient(135deg, ${ACCENT} 0%, #F43F5E 100%)`,
              padding: '25px 80px',
              borderRadius: 30,
              boxShadow: '0 20px 60px rgba(236, 72, 153, 0.4)',
              border: '3px solid rgba(255, 255, 255, 0.2)'
            }}>
              <span style={{ 
                fontSize: 70, 
                fontWeight: 900, 
                color: 'white',
                letterSpacing: -1,
                textShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
              }}>
                KES {price}
              </span>
            </div>
          </div>

          {/* CONTACT FOOTER */}
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 30,
            padding: '30px 50px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ 
                width: 50, 
                height: 50, 
                background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                borderRadius: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 24
              }}>
                📞
              </div>
              <div>
                <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 5 }}>ORDER NOW</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>0733 565861</div>
              </div>
            </div>
            
            <div style={{ 
              height: 60, 
              width: 2, 
              background: 'linear-gradient(0deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)'
            }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div>
                <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 5, textAlign: 'right' }}>VISIT US</div>
                <div style={{ fontSize: 22, fontWeight: 700, textAlign: 'right' }}>Nairobi CBD</div>
              </div>
              <div style={{ 
                width: 50, 
                height: 50, 
                background: `linear-gradient(135deg, ${ACCENT} 0%, #F43F5E 100%)`,
                borderRadius: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 24
              }}>
                📍
              </div>
            </div>
          </div>

        </div>
      ),
      { width: 1080, height: 1920 }
    );
  } catch (e: any) {
    console.error('OG Generation Error:', e);
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
  }
}
