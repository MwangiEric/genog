import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  // 1. Data Parsing
  const device = searchParams.get('device') || 'Smartphone';
  const price = searchParams.get('price') || '0';
  // Specs format: "Processor:Snapdragon G3,Battery:5000mAh,Camera:108MP"
  const specsRaw = searchParams.get('specs') || "";
  const specs = specsRaw.split(',').filter(Boolean).map(s => s.split(':'));

  // 2. CONFIG Mapping
  const COLORS = {
    bg_top: "#0F0A0A",
    mint: "#3EB489",
    gold: "#C5A059",
    white: "#FFFFFF"
  };

  const ICONS = {
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
        
        {/* TOP BAR: Logo & Certified Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={250} height={80} style={{ objectFit: 'contain' }} />
          <div style={{ display: 'flex', background: 'rgba(197, 160, 89, 0.1)', border: `1px solid ${COLORS.gold}`, padding: '8px 20px', borderRadius: 12 }}>
            <span style={{ color: COLORS.gold, fontSize: 22, fontWeight: 'bold' }}>SAMSUNG CERTIFIED</span>
          </div>
        </div>

        {/* TITLE SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
          <span style={{ fontSize: 90, fontWeight: 900, textTransform: 'uppercase', letterSpacing: -2 }}>{device}</span>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 15 }}>
            <div style={{ background: COLORS.mint, padding: '12px 45px', borderRadius: 15 }}>
              <span style={{ fontSize: 45, fontWeight: 'bold' }}>KES {price}</span>
            </div>
          </div>
        </div>

        {/* CENTER HOLE: PIL will paste the phone image here */}
        <div style={{ 
          display: 'flex', flex: 1, width: '100%', 
          justifyContent: 'center', alignItems: 'center', 
          margin: '40px 0' 
        }}>
          {/* Subtle Glow beneath where the phone will be */}
          <div style={{
            width: 700, height: 700,
            background: `radial-gradient(circle, ${COLORS.gold}15 0%, transparent 70%)`,
            borderRadius: '50%',
          }} />
        </div>

        {/* SPECS GRID (Icon + Label + Value) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginBottom: 120 }}>
          {specs.map(([key, val], i) => {
            const iconUrl = ICONS[key.toLowerCase() as keyof typeof ICONS] || ICONS.processor;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center',
                background: '#151515', padding: '20px 30px',
                borderRadius: 25, border: '1px solid #222', width: '100%'
              }}>
                <img src={iconUrl} width={45} height={45} style={{ marginRight: 20 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: COLORS.gold, fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' }}>{key}</span>
                  <span style={{ fontSize: 28, fontWeight: 'bold' }}>{val}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER BAR */}
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#1A1A1A', padding: '30px 40px', borderRadius: 30,
          border: '1px solid #333'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <img src={ICONS.whatsapp} width={40} height={40} />
            <span style={{ fontSize: 32, fontWeight: 'bold' }}>+254 700 123 456</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={ICONS.location} width={30} height={30} style={{ filter: 'invert(1)' }} />
            <span style={{ fontSize: 22, color: '#888' }}>CBD, Nairobi</span>
          </div>
        </div>

      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
