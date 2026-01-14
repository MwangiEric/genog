import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  console.log('[OG] raw url:', req.url);

  const device  = searchParams.get('device')  || 'Smartphone';
  const price   = searchParams.get('price')   || '0';
  const img     = searchParams.get('img')     || 'https://ik.imagekit.io/ericmwangi/iphone.png';
  const specsRaw= searchParams.get('specs')   || '';
  const specs   = specsRaw.split(',').filter(Boolean).map(s => s.split(':'));
  console.log('[OG] parsed:', { device, price, img, specs });

  // ---------- start JSX ----------
  console.log('[OG] building JSX...');
  const jsx = (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        color: '#fff',
        fontSize: 60,
        fontWeight: 700,
      }}
    >
      <img
        src={img}
        width={850}
        height={850}
        style={{ objectFit: 'contain' }}
      />
      <div style={{ marginTop: 40 }}>{device}</div>
      <div>KES {price}</div>
      {specs.map(([k, v], i) => (
        <div key={i} style={{ display: 'flex', gap: 10 }}>
          <span>{k}</span>
          <span>{v}</span>
        </div>
      ))}
    </div>
  );
  console.log('[OG] JSX built');

  // ---------- render ----------
  try {
    console.log('[OG] calling ImageResponse...');
    const resp = new ImageResponse(jsx, { width: 1080, height: 1920 });
    console.log('[OG] ImageResponse OK');
    return resp;
} catch (err: any) { 
    console.error('[OG] ImageResponse threw:', err);
    // fallback black square so you still see *something*
    return new ImageResponse(
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          color: '#f00',
          fontSize: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ERROR: {err.message}
      </div>,
      { width: 1080, height: 1920 }
    );
  }
}
