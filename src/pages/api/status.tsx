import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

const CDN = "https://ik.imagekit.io/ericmwangi";

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
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
        backgroundImage: 'linear-gradient(to bottom, #0F0A0A, #1A1A2E)',
        padding: '80px', alignItems: 'center',
        fontFamily: 'sans-serif',
      }}>
        {/* Logo */}
        <img src={`${CDN}/tklogo.png`} style={{ width: '420px', marginTop: '40px', marginBottom: '60px' }} />

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '110px', color: 'white', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>
            {device}
          </h1>
          <div style={{ height: '8px', width: '250px', backgroundColor: '#FFD700', marginTop: '15px' }} />
        </div>

        {/* Hero Image */}
        <div style={{ display: 'flex', height: '850px', width: '900px', justifyContent: 'center', alignItems: 'center' }}>
          <img src={img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        {/* Specs Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px', width: '100%', marginTop: '40px' }}>
          {specs.map(([icon, val], i) => (
            <div key={i} style={{ 
              display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', 
              padding: '28px 45px', borderRadius: '30px', border: '1px solid rgba(255,215,0,0.3)' 
            }}>
              <img src={`${CDN}/${icon}.png`} style={{ width: '55px', height: '55px', marginRight: '20px' }} />
              <span style={{ color: 'white', fontSize: '38px' }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ backgroundColor: '#3EB489', padding: '35px 120px', borderRadius: '35px', marginBottom: '40px' }}>
            <span style={{ color: 'white', fontSize: '90px', fontWeight: 'bold' }}>KES {price}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={`${CDN}/whatsapp.png`} style={{ width: '50px', marginRight: '20px' }} />
            <span style={{ color: 'white', fontSize: '35px' }}>+254 700 123 456 | CBD, Nairobi</span>
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
