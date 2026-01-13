import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const CDN = "https://ik.imagekit.io/ericmwangi";

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Data from Python
  const device = searchParams.get('device') || 'Smartphone';
  const price = searchParams.get('price') || '0';
  const img = searchParams.get('img') || `${CDN}/iphone.png`;
  const specsRaw = searchParams.get('specs') || "";
  const specs = specsRaw.split(',').filter(Boolean).map(s => s.split(':'));

  return new ImageResponse(
    (
      <div style={{
        height: '1920px', width: '1080px',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#0F0A0A',
        backgroundImage: 'linear-gradient(to bottom, #0F0A0A, #250505)',
        padding: '80px', alignItems: 'center',
        fontFamily: 'sans-serif',
      }}>
        {/* Triple K Logo */}
        <img src={`${CDN}/tklogo.png`} style={{ width: '450px', marginTop: '40px' }} />

        {/* Device Name */}
        <h1 style={{ fontSize: '110px', color: 'white', fontWeight: 'bold', marginTop: '60px', textTransform: 'uppercase', textAlign: 'center' }}>
          {device}
        </h1>

        {/* Main Image */}
        <div style={{ display: 'flex', height: '850px', width: '900px', justifyContent: 'center', alignItems: 'center', margin: '40px 0' }}>
          <img src={img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        {/* Specs Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px', width: '100%' }}>
          {specs.map(([icon, val], i) => (
            <div key={i} style={{ 
              display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', 
              padding: '25px 40px', borderRadius: '30px', border: '1px solid #FFD700' 
            }}>
              <img src={`${CDN}/${icon}.png`} style={{ width: '50px', marginRight: '20px' }} />
              <span style={{ color: 'white', fontSize: '34px' }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Price Footer */}
        <div style={{ marginTop: 'auto', backgroundColor: '#3EB489', padding: '35px 120px', borderRadius: '40px', marginBottom: '40px' }}>
          <span style={{ color: 'white', fontSize: '90px', fontWeight: 'bold' }}>KES {price}</span>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
