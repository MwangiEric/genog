import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const device = searchParams.get('device') || 'DEVICE';
  const price = searchParams.get('price') || '0';
  const imageUrl = searchParams.get('image');
  
  const ram = searchParams.get('ram') || '';
  const rom = searchParams.get('rom') || '';
  const bat = searchParams.get('bat') || '';
  const scr = searchParams.get('scr') || '';

  // HAND-DRAWN SVGS
  const IconRAM = <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="6" y1="5" x2="6" y2="9"/><line x1="14" y1="5" x2="14" y2="9"/></svg>;
  const IconBat = <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5"><rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/></svg>;
  const IconScr = <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 12h10M12 7v10"/></svg>;
  const IconRom = <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5"><path d="M12 2v10m0 0l-3-3m3 3l3-3"/><path d="M2 17l.6-3a2 2 0 0 1 2-1.6h14.8a2 2 0 0 1 2 1.6l.6 3a2 2 0 0 1-2 2.4H4a2 2 0 0 1-2-2.4z"/></svg>;
  const IconWA = <svg width="50" height="50" viewBox="0 0 24 24" fill="#25D366"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-1.557-.599-2.654-1.576-1.128-1.003-1.83-2.19-2.039-2.541-.208-.353-.016-.544.161-.721.159-.16.353-.415.529-.623.176-.208.236-.353.353-.588.118-.235.059-.441-.03-.617-.088-.176-.793-1.912-1.087-2.617-.285-.688-.577-.594-.793-.605l-.676-.013c-.235 0-.618.088-.941.441-.324.353-1.234 1.206-1.234 2.941 0 1.735 1.265 3.412 1.441 3.647.176.235 2.487 3.798 6.025 5.325.842.364 1.499.581 2.011.744.846.269 1.615.231 2.223.141.678-.099 2.083-.852 2.377-1.676.294-.824.294-1.53.206-1.677-.089-.147-.324-.235-.618-.382z"/></svg>;

  return new ImageResponse(
    (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#050505', color: 'white', fontFamily: 'sans-serif', position: 'relative' }}>
        
        {/* TOP BRANDING */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 70 }}>
            <span style={{ fontSize: 60, fontWeight: 900, color: '#C5A059', letterSpacing: 8 }}>TRIPLE K</span>
        </div>

        {/* DEVICE NAME */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30, padding: '0 50px' }}>
          <span style={{ fontSize: 105, fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', letterSpacing: -4, lineHeight: 0.9 }}>{device}</span>
        </div>

        {/* SPECIFICATION GRID */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30, gap: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>{IconRAM}<span style={{marginLeft:10, fontSize:24, fontWeight:700}}>{ram.replace(/\s?RAM/i,'')}</span></div>
            <div style={{ display: 'flex', alignItems: 'center' }}>{IconRom}<span style={{marginLeft:10, fontSize:24, fontWeight:700}}>{rom.replace(/\s?storage/i,'')}</span></div>
            <div style={{ display: 'flex', alignItems: 'center' }}>{IconBat}<span style={{marginLeft:10, fontSize:24, fontWeight:700}}>{bat}</span></div>
            <div style={{ display: 'flex', alignItems: 'center' }}>{IconScr}<span style={{marginLeft:10, fontSize:24, fontWeight:700}}>{scr}</span></div>
        </div>

        {/* PRODUCT IMAGE */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'absolute', width: 850, height: 850, background: 'radial-gradient(circle, rgba(62, 180, 137, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
          {imageUrl && <img src={imageUrl} style={{ width: 950, height: 950, objectFit: 'contain' }} />}
        </div>

        {/* PRICE BADGE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 50 }}>
          <div style={{ background: '#3EB489', padding: '20px 110px', borderRadius: 100, border: '5px solid #C5A059', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
            <span style={{ fontSize: 85, fontWeight: 900, color: '#000' }}>KSH {price}</span>
          </div>
        </div>

        {/* CONTACT FOOTER */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#111', margin: '0 60px 40px 60px', padding: '40px', borderRadius: 45, border: '1px solid #222' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {IconWA}
                <span style={{ fontSize: 45, fontWeight: 900, marginLeft: 15 }}>0715 130013</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#C5A059' }}>CBD, NAIROBI</span>
                <span style={{ fontSize: 16, color: '#777' }}>OPPOSITE MOI AVENUE</span>
            </div>
          </div>
        </div>

        {/* MAROON CTA BAR */}
        <div style={{ display: 'flex', background: '#800000', height: 130, justifyContent: 'center', alignItems: 'center', borderTop: '4px solid #C5A059' }}>
          <span style={{ fontSize: 45, fontWeight: 900, letterSpacing: 10, color: '#C5A059' }}>SHOP NOW ❯</span>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
