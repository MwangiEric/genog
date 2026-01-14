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
        padding: '80px 60px', fontFamily: 'sans-serif',
        position: 'relative', color: 'white'
      }}>
        
        {/* TOP BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <img src={ICONS.logo} width={300} height={90} style={{ objectFit: 'contain' }} />
          <div style={{ 
            display: 'flex', 
            background: 'rgba(197, 160, 89, 0.1)', 
            border: `1.5px solid ${COLORS.gold}`, 
            padding: '10px 25px', borderRadius: 15 
          }}>
            <span style={{ display: 'flex', color: COLORS.gold, fontSize: 24, fontWeight: 'bold' }}>
                {brand.toUpperCase()} CERTIFIED
            </span>
          </div>
        </div>

        {/* DEVICE HEADER */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
          <span style={{ display: 'flex', fontSize: 100, fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', letterSpacing: -3 }}>
            {device}
          </span>
          <div style={{ display: 'flex', background: COLORS.mint, padding: '15px 50px', borderRadius: 20, marginTop: 25 }}>
            <span style={{ display: 'flex', fontSize: 55, fontWeight: 700 }}>KES {price}</span>
          </div>
        </div>

        {/* MIDDLE PIL ZONE */}
        <div style={{ 
          display: 'flex', flex: 1, width: '100%', 
          justifyContent: 'center', alignItems: 'center',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex', 
            width: 750, height: 750,
            background: `radial-gradient(circle, ${COLORS.gold}15 0%, transparent 75%)`,
            borderRadius: '50%',
          }} />
        </div>

        {/* SPECS SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 100 }}>
          {specs.map(([label, value], i) => {
            const icon = ICONS[label.toLowerCase()] || ICONS.processor;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center',
                background: '#151515', padding: '25px 35px',
                borderRadius: 30, border: '1px solid #252525', width: '100%'
              }}>
                <img src={icon} width={55} height={55} style={{ marginRight: 25 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ display: 'flex', color: COLORS.gold, fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {label}
                  </span>
                  <span style={{ display: 'flex', fontSize: 32, fontWeight: 'bold' }}>{value}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#1A1A1A', padding: '35px 45px', borderRadius: 40,
          border: '1px solid #333'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <img src={ICONS.whatsapp} width={45} height={45} />
            <span style={{ display: 'flex', fontSize: 34, fontWeight: 'bold' }}>+254 704 554 445</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={ICONS.location} width={30} height={30} style={{ filter: 'invert(1)', opacity: 0.6 }} />
            <span style={{ display: 'flex', fontSize: 24, color: '#888' }}>CBD, Nairobi</span>
          </div>
        </div>

      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
