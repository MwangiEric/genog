import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // 1. Get data from your Python app
  const device = searchParams.get('device') || 'Smartphone';
  const price = searchParams.get('price') || 'N/A';
  const img = searchParams.get('img') || 'https://ik.imagekit.io/ericmwangi/iphone.png';
  const specs = searchParams.get('specs')?.split(',') || [];

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#0F0A0A', // bg_top from your config
          backgroundImage: 'linear-gradient(to bottom, #0F0A0A, #1A1A2E)',
          padding: '40px',
          alignItems: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Left: Phone Image with Gold Border Card */}
        <div
          style={{
            display: 'flex',
            width: '450px',
            height: '550px',
            backgroundColor: 'white',
            borderRadius: '30px',
            border: '6px solid #C5A059', // gold from your config
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <img src={img} style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
        </div>

        {/* Right: Content Section */}
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '60px', flex: 1 }}>
          {/* Logo */}
          <img 
            src="https://ik.imagekit.io/ericmwangi/tklogo.png" 
            style={{ width: '250px', marginBottom: '30px' }} 
          />

          <h1 style={{ fontSize: '65px', color: 'white', margin: '0 0 10px 0', fontWeight: 'bold' }}>
            {device.toUpperCase()}
          </h1>

          {/* Specs List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
            {specs.map((spec, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3EB489', marginRight: '15px' }} />
                <span style={{ color: '#E0E0E0', fontSize: '28px' }}>{spec}</span>
              </div>
            ))}
          </div>

          {/* Price Badge */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#3EB489', // mint from your config
              padding: '15px 40px',
              borderRadius: '15px',
              width: 'fit-content',
            }}
          >
            <span style={{ color: 'white', fontSize: '45px', fontWeight: 'bold' }}>
              KES {price}
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
