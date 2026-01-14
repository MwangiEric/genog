import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const device = searchParams.get('device') || 'SMARTPHONE';
  const price = searchParams.get('price') || '0';
  const brand = searchParams.get('brand') || 'Samsung';
  const specsRaw = searchParams.get('specs') || "";
  const specs = specsRaw.split(',').filter(Boolean).map(s => s.split(':'));

  const COLORS = {
    bg_top: "#0F0A0A",
    mint: "#3EB489",
    gold: "#C5A059",
    white: "#FFFFFF"
  };

  const ICONS: Record<string, string> = {
    logo: "https://ik.imagekit.io/ericmwangi/tklogo.png",
    processor: "https://ik.imagekit.io/ericmwangi/processor.png",
    battery: "https://ik.imagekit.io/ericmwangi/battery.png",
    camera: "https://ik.imagekit.io/ericmwangi/camera.png",
    memory: "https://ik.imagekit.io/ericmwangi/memory.png",
    screen: "https://ik.imagekit.io/ericmwangi/screen.png",
    whatsapp: "https://ik.imagekit.io/ericmwangi/whatsapp.png",
    location: "https://cdn-icons-png.flaticon.com/512/684/684908.png"
  };

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: COLORS.bg_top,
        padding: '60px', fontFamily: 'sans-serif',
        position: 'relative', color: 'white'
      }}>
        
        {/* TOP BAR: Pushed to the very top */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 40 }}>
          <img src={ICONS.logo} width={280} height={80} style={{ objectFit: 'contain' }} />
          <div style={{ 
            display: 'flex', background: 'rgba(197, 160, 89, 0.1)', 
            border: `1.5px solid ${COLORS.gold}`, 
            padding: '10px 25px', borderRadius: 15 
          }}>
            <span style={{ display: 'flex', color: COLORS.gold, fontSize: 22, fontWeight: 'bold' }}>
                {brand.toUpperCase()} CERTIFIED
            </span>
          </div>
        </div>

        {/* DEVICE HEADER: Increased spacing from logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
          <span style={{ display: 'flex', fontSize: 110, fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', letterSpacing: -4, lineHeight: 1 }}>
            {device}
          </span>
          <div style={{ display: 'flex', background: COLORS.mint, padding: '12px 60px', borderRadius: 25, marginTop: 30, boxShadow: '0 10px 30px rgba(62, 180, 137, 0.3)' }}>
            <span style={{ display: 'flex', fontSize: 60, fontWeight: 800 }}>KES {price}</span>
          </div>
        </div>

        {/* MIDDLE PIL ZONE: flex: 1 ensures it takes all available space between header and specs */}
        <div style={{ 
          display: 'flex', flex: 1, width: '100%', 
          justifyContent: 'center', alignItems: 'center',
          position: 'relative', margin: '60px 0'
        }}>
          <div style={{
            display: 'flex', 
            width: 850, height: 850,
            background: `radial-gradient(circle, ${COLORS.gold}10 0%, transparent 70%)`,
            borderRadius: '50%',
          }} />
        </div>

        {/* SPECS SECTION: Grid-like spacing */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          gap: 20, 
          justifyContent: 'center',
          marginBottom: 160 // Leave space for the absolute footer
        }}>
          {specs.map(([label, value], i) => {
            const icon = ICONS[label.toLowerCase()] || ICONS.processor;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center',
                background: '#121212', padding: '20px 30px',
                borderRadius: 25, border: '1px solid #222', 
                width: '48%', // Allows 2 items per row
              }}>
                <img src={icon} width={45} height={45} style={{ marginRight: 15 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ display: 'flex', color: COLORS.gold, fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', opacity: 0.8 }}>
                    {label}
                  </span>
                  <span style={{ display: 'flex', fontSize: 24, fontWeight: 'bold' }}>{value}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER: Anchored to the bottom */}
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#161616', padding: '35px 50px', borderRadius: 40,
          border: '1px solid #333',
          position: 'absolute',
          bottom: 60,
          left: 60,
          right: 60,
          boxShadow: '0 -10px 40px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <img src={ICONS.whatsapp} width={45} height={45} />
            <span style={{ display: 'flex', fontSize: 36, fontWeight: '900' }}>0704 554 445</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={ICONS.location} width={30} height={30} style={{ filter: 'invert(1)', opacity: 0.7 }} />
            <span style={{ display: 'flex', fontSize: 22, color: '#AAA', fontWeight: 'bold' }}>CBD, NAIROBI</span>
          </div>
        </div>

      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
