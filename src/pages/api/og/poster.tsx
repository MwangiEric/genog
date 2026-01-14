import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

const CDN = 'https://ik.imagekit.io/ericmwangi';   // 1. no trailing space

// 3. preload Poppins bold
const poppinsBold = fetch(
  'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Bold.ttf'
).then((res) => res.arrayBuffer());

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const device = searchParams.get('device') || 'Smartphone';
  const price  = searchParams.get('price')  || '0';
  const img    = searchParams.get('img')    || `${CDN}/iphone.png`;
  const specsRaw = searchParams.get('specs') || '';
  const specs = specsRaw.split(',').filter(Boolean).map((s) => s.split(':'));

  const font = await poppinsBold;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#0F0A0A',
          fontFamily: 'Poppins',
          color: 'white',
          padding: '60px',
        }}
      >
        {/* Logo */}
        <img
          src={`${CDN}/tklogo.png`}
          width={400}
          height={120}
          style={{ marginTop: 40 }}
        />

        {/* Title */}
        <h1
          style={{
            fontSize: 110,
            fontWeight: 700,
            marginTop: 60,
            textAlign: 'center',
          }}
        >
          {device}
        </h1>

        {/* Phone render */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <img
            src={img}
            width={850}
            height={850}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Spec pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 20,
            marginBottom: 40,
          }}
        >
          {specs.map(([icon, val], i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#1A1A1A',
                padding: '20px 30px',
                borderRadius: 25,
                border: '1px solid #FFD700',
              }}
            >
              <img
                src={`${CDN}/${icon}.png`}
                width={40}
                height={40}
                style={{ marginRight: 15 }}
              />
              <span style={{ fontSize: 30 }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Price badge */}
        <div
          style={{
            backgroundColor: '#3EB489',
            padding: '30px 100px',
            borderRadius: 40,
            marginBottom: 60,
          }}
        >
          <span style={{ fontSize: 90, fontWeight: 700 }}>KES {price}</span>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
      emoji: 'twemoji',
      fonts: [{ name: 'Poppins', data: font, weight: 700 }],
    },
  );
}
