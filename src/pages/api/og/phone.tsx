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
  const IconRAM = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="6" y1="5" x2="6" y2="9"/><line x1="14" y1="5" x2="14" y2="9"/></svg>;
  const IconBat = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5"><rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/></svg>;
  const IconScr = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 12h10M12 7v10"/></svg>;
  const IconRom = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5"><path d="M12 2v10m0 0l-3-3m3 3l3-3"/><path d="M2 17l.6-3a2 2 0 0 1 2-1.6h14.8a2 2 0 0 1 2 1.6l.6 3a2 2 0 0 1-2 2.4H4a2 2 0 0 1-2-2.4z"/></svg>;

  return new ImageResponse(
    (
      <div style={{ 
        height: '100%', 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: '#050505', 
        color: 'white', 
        // Use system fonts to avoid loading errors
        fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' 
      }}>
        
        {/* LOGO */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 70 }}>
            <span style={{ fontSize: 60, fontWeight: 900, color: '#C5A059', letterSpacing: 8 }}>TRIPLE K</span>
        </div>

        {/* DEVICE NAME */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30, padding: '0 50px' }}>
          <span style={{ fontSize: 110, fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', letterSpacing: -4, lineHeight: 0.9 }}>
            {device}
          </span>
        </div>

        {/* PRODUCT IMAGE (Moved up) */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', width: 850, height: 850, background: 'radial-gradient(circle, rgba(62, 180, 137, 0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
          {imageUrl && <img src={imageUrl} style={{ width: 950, height: 950, objectFit: 'contain' }} />}
        </div>

        {/* SPECS ROW (Now below image) */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 30, gap: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>{IconRAM}<span style={{marginLeft:10, fontSize:24, fontWeight: 700}}>{ram.replace(/\s?RAM/i,'')}</span></div>
            <div style={{ display: 'flex', alignItems: 'center' }}>{IconRom}<span style={{marginLeft:10, fontSize:24, fontWeight: 700}}>{rom.replace(/\s?storage/i,'')}</span></div>
            <div style={{ display: 'flex', alignItems: 'center' }}>{IconBat}<span style={{marginLeft:10, fontSize:24, fontWeight: 700}}>{bat}</span></div>
            <div style={{ display: 'flex', alignItems: 'center' }}>{IconScr}<span style={{marginLeft:10, fontSize:24, fontWeight: 700}}>{scr}</span></div>
        </div>

        {/* PRICE BADGE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 50 }}>
          <div style={{ background: '#3EB489', padding: '22px 110px', borderRadius: 100, border: '5px solid #C5A059' }}>
            <span style={{ fontSize: 85, fontWeight: 900, color: '#000' }}>KSH {price}</span>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#111', margin: '0 60px 40px 60px', padding: '40px', borderRadius: 45, border: '1px solid #222' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 45 }}>📞</span>
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
