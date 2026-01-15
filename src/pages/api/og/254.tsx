import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// Primary (Google) and Secondary (JSDelivr) Fonts
const FONT_URL_1 = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFufMZhrib2Bg-4.ttf';
const FONT_URL_2 = 'https://cdn.jsdelivr.net/gh/googlefonts/inter@master/docs/font-files/Inter-Bold.ttf';

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // ✅ Sequential Font Loading with Failover
    let fontBuffer;
    try {
      const res = await fetch(FONT_URL_1);
      fontBuffer = await res.arrayBuffer();
      const check = new Uint8Array(fontBuffer.slice(0, 4));
      if (String.fromCharCode(...check) === '<htm') throw new Error('CDN_ERROR');
    } catch (e) {
      const res = await fetch(FONT_URL_2);
      fontBuffer = await res.arrayBuffer();
    }

    // Parse Roster Data (Format: Name:Value,Name:Value)
    const rawData = searchParams.get('data') || "";
    const agents = rawData.split(',').filter(Boolean).map(item => {
      const [name, value] = item.split(':');
      return { name: decodeURIComponent(name), value };
    });

    // Calculate dynamic height for all 26 agents
    // 250 (Header) + (N * 80) + 120 (Footer)
    const dynamicHeight = Math.max(800, 370 + (agents.length * 80));

    return new ImageResponse(
      (
        <div style={{ 
          height: '100%', width: '100%', display: 'flex', flexDirection: 'column', 
          backgroundColor: '#FFFFFF', color: '#002B5B', fontFamily: 'Inter' 
        }}>
          
          {/* 254 BRAND HEADER */}
          <div style={{ display: 'flex', height: 250, width: '100%', backgroundColor: '#002B5B', padding: '0 60px', alignItems: 'center', justifyContent: 'space-between', borderBottom: '12px solid #FFD700' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://ik.imagekit.io/ericmwangi/254logo.jpg" style={{ height: 130, width: 130, borderRadius: 25 }} />
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 40 }}>
                <span style={{ fontSize: 50, fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: -1 }}>254 INSURANCE</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#FFD700', textTransform: 'uppercase', letterSpacing: 8, marginTop: 5 }}>Life Production Roster</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
               <span style={{ color: 'white', fontSize: 30, fontWeight: 900, opacity: 0.8 }}>JAN 2026</span>
            </div>
          </div>

          {/* TABLE HEADERS */}
          <div style={{ display: 'flex', width: '100%', backgroundColor: '#F1F5F9', padding: '25px 60px', borderBottom: '2px solid #E2E8F0' }}>
            <span style={{ width: 100, fontSize: 16, fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase' }}>Rank</span>
            <span style={{ flex: 1, fontSize: 16, fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', marginLeft: 40 }}>Producer Name</span>
            <span style={{ width: 300, fontSize: 16, fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', textAlign: 'right' }}>Total Life (KES)</span>
          </div>

          {/* AGENT LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '30px 50px' }}>
            {agents.map((agent, i) => (
              <div key={i} style={{ 
                display: 'flex', alignItems: 'center', width: '100%', padding: '20px 25px', marginBottom: 10, borderRadius: 20,
                backgroundColor: i < 3 ? '#EFF6FF' : '#FFFFFF',
                border: i < 3 ? '2px solid #DBEAFE' : '1px solid #F1F5F9'
              }}>
                <span style={{ width: 60, fontSize: 32, fontWeight: 900, color: i < 3 ? '#002B5B' : '#CBD5E1' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ flex: 1, fontSize: 32, fontWeight: 800, color: i < 3 ? '#002B5B' : '#334155', textTransform: 'uppercase', marginLeft: 40 }}>
                  {agent.name}
                </span>
                <span style={{ width: 300, fontSize: 38, fontWeight: 900, color: i < 3 ? '#116530' : '#475569', textAlign: 'right' }}>
                  {agent.value}
                </span>
              </div>
            ))}
          </div>

          {/* FOOTER BAR */}
          <div style={{ marginTop: 'auto', display: 'flex', height: 100, width: '100%', backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center', borderTop: '2px solid #F1F5F9', borderBottom: '30px solid #116530' }}>
             <span style={{ fontSize: 14, color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 5 }}>
               Official Production Record • {agents.length} Verified Producers
             </span>
          </div>

        </div>
      ),
      {
        width: 1080,
        height: dynamicHeight,
        fonts: [{ name: 'Inter', data: fontBuffer, weight: 900, style: 'normal' }],
      }
    );
  } catch (err: any) {
    return new Response(`254 Render Error: ${err.message}`, { status: 200 });
  }
}
