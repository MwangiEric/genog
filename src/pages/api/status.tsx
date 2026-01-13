import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

// Your Asset CDN
const ICON_BASE = "https://ik.imagekit.io/ericmwangi";

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  // Data from your Python tool
  const device = searchParams.get('device') || 'Smartphone';
  const price = searchParams.get('price') || 'N/A';
  const phoneImg = searchParams.get('img') || `${ICON_BASE}/iphone.png`;
  
  // Specs should be passed as icon:value pairs, e.g., "processor:A17 Pro,battery:5000 mAh"
  const specsRaw = searchParams.get('specs') || "";
  const specs = specsRaw.split(',').map(s => s.split(':'));

  return new ImageResponse(
    (
      <div style={{
        height: '1920px',
        width: '1080px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0F0A0A',
        backgroundImage: 'linear-gradient(to bottom, #0F0A0A, #1A1A2E)',
        padding: '60px 80px',
        alignItems: 'center',
        fontFamily: 'sans-serif',
      }}>
        {/* 1. Header: Logo */}
        <img 
          src={`${ICON_BASE}/tklogo.png`} 
          style={{ width: '450px', marginTop: '40px', marginBottom: '40px' }} 
        />

        {/* 2. Title Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '110px', color: 'white', margin: 0, fontWeight: 'bold', textAlign: 'center' }}>
            {device.toUpperCase()}
          </h1>
          <div style={{ height: '8px', width: '240px', backgroundColor: '#C5A059', marginTop: '10px' }} />
        </div>

        {/* 3. Main Phone Image (The Focal Point) */}
        <div style={{ display: 'flex', width: '900px', height: '850px', justifyContent: 'center', alignItems: 'center' }}>
          <img src={phoneImg} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        {/* 4. Specs Grid (Using your icons) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center', gap: '30px', marginTop: '40px' }}>
          {specs.map(([icon, value], i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: 'rgba(255,255,255,0.05)', 
              padding: '20px 35px', 
              borderRadius: '20px',
              border: '1px solid rgba(197, 160, 89, 0.3)' 
            }}>
              <img src={`${ICON_BASE}/${icon}.png`} style={{ width: '50px', height: '50px', marginRight: '20px' }} />
              <span style={{ color: 'white', fontSize: '32px' }}>{value}</span>
            </div>
          ))}
        </div>

        {/* 5. Price & CTA Footer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#3EB489', padding: '30px 100px', borderRadius: '25px', marginBottom: '30px', display: 'flex' }}>
            <span style={{ color: 'white', fontSize: '85px', fontWeight: 'bold' }}>KES {price}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={`${ICON_BASE}/whatsapp.png`} style={{ width: '40px', marginRight: '15px' }} />
                <span style={{ color: 'white', fontSize: '28px' }}>+254 700 123 456</span>
            </div>
            <span style={{ color: '#C5A059', fontSize: '28px' }}>CBD, NAIROBI</span>
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
