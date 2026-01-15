import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Parse Roster Data (Format: Name:Value,Name:Value)
    const rawData = searchParams.get('data') || "";
    const agents = rawData.split(',').filter(Boolean).map(item => {
      const [name, value] = item.split(':');
      return { name: decodeURIComponent(name), value };
    });

    // Dynamic height calculation
    const dynamicHeight = Math.max(800, 370 + (agents.length * 85));

    return new ImageResponse(
      (
        <div style={{ 
          height: '100%', width: '100%', display: 'flex', flexDirection: 'column', 
          backgroundColor: '#FFFFFF', color: '#002B5B', 
          fontFamily: 'sans-serif' // Using system sans-serif
        }}>
          
          {/* BRAND HEADER */}
          <div style={{ display: 'flex', height: 250, width: '100%', backgroundColor: '#002B5B', padding: '0 60px', alignItems: 'center', justifyContent: 'space-between', borderBottom: '12px solid #FFD700' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Logo from ImageKit (Internal CDN) */}
              <img src="https://ik.imagekit.io/ericmwangi/254logo.jpg" style={{ height: 130, width: 130, borderRadius: 25 }} />
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 40 }}>
                <span style={{ fontSize: 55, fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-2px' }}>254 INSURANCE</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#FFD700', textTransform: 'uppercase', letterSpacing: '6px', marginTop: 5 }}>Life Production Roster</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
               <span style={{ color: 'white', fontSize: 32, fontWeight: 800, opacity: 0.9 }}>JAN 2026</span>
            </div>
          </div>

          {/* TABLE HEADERS */}
          <div style={{ display: 'flex', width: '100%', backgroundColor: '#F8FAFC', padding: '25px 60px', borderBottom: '2px solid #E2E8F0' }}>
            <span style={{ width: 100, fontSize: 18, fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Rank</span>
            <span style={{ flex: 1, fontSize: 18, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginLeft: 40 }}>Producer Name</span>
            <span style={{ width: 300, fontSize: 18, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', textAlign: 'right' }}>Total Life (KES)</span>
          </div>

          {/* AGENT LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '20px 50px' }}>
            {agents.map((agent, i) => (
              <div key={i} style={{ 
                display: 'flex', alignItems: 'center', width: '100%', padding: '22px 25px', marginBottom: 12, borderRadius: 20,
                backgroundColor: i < 3 ? '#F0F9FF' : '#FFFFFF',
                border: i < 3 ? '2px solid #BAE6FD' : '1px solid #F1F5F9'
              }}>
                <span style={{ width: 60, fontSize: 34, fontWeight: 900, color: i < 3 ? '#002B5B' : '#CBD5E1' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ flex: 1, fontSize: 32, fontWeight: 700, color: i < 3 ? '#002B5B' : '#334155', textTransform: 'uppercase', marginLeft: 40 }}>
                  {agent.name}
                </span>
                <span style={{ width: 300, fontSize: 40, fontWeight: 900, color: i < 3 ? '#116530' : '#475569', textAlign: 'right' }}>
                  {agent.value}
                </span>
              </div>
            ))}
          </div>

          {/* FOOTER BAR */}
          <div style={{ marginTop: 'auto', display: 'flex', height: 120, width: '100%', backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center', borderTop: '2px solid #F1F5F9', borderBottom: '40px solid #116530' }}>
             <span style={{ fontSize: 16, color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '4px' }}>
               Official Record • {agents.length} Verified Producers • 254 Insurance Services
             </span>
          </div>

        </div>
      ),
      {
        width: 1080,
        height: dynamicHeight,
        // No fonts array needed here as we use system fonts
      }
    );
  } catch (err: any) {
    return new Response(`Render Error: ${err.message}`, { status: 200 });
  }
}
