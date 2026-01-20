import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  return new ImageResponse(
    <div style={{
      background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)',
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', position: 'relative',
      fontFamily: 'Inter'
    }}>
      {/* 254 Logo - Top Right */}
      <img 
        src="https://ik.imagekit.io/ericmwangi/254logo.jpg" 
        width="140" 
        height="140"
        style={{ 
          position: 'absolute', 
          top: '30px', 
          right: '30px',
          borderRadius: '12px'
        }} 
      />
      
      {/* Animated Message Area - MoviePy overlays here */}
      <div style={{
        position: 'absolute',
        left: '60px', right: '60px', 
        top: '50%', transform: 'translateY(-50%)',
        height: '320px', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        border: '3px solid rgba(245,158,11,0.3)'
      }}>
        <div style={{
          height: '240px', width: '100%',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: 'rgba(255,255,255,0.3)',
          fontSize: '28px', fontWeight: '500', textAlign: 'center',
          padding: '0 40px'
        }}>
          [ANIMATED TEXT AREA]
        </div>
      </div>
      
      {/* Fixed Contacts - Bottom Center */}
      <div style={{
        position: 'absolute', bottom: '60px',
        left: 0, right: 0, textAlign: 'center'
      }}>
        <div style={{ 
          fontSize: '28px', 
          color: 'white', 
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          2532204685 | 8179252238
        </div>
        <div style={{ 
          fontSize: '22px', 
          color: 'rgba(255,255,255,0.9)' 
        }}>
          bilha@254insuranceservices.com
        </div>
      </div>
      
      {/* IRA Disclaimer */}
      <div style={{
        position: 'absolute', bottom: '20px',
        left: 0, right: 0, textAlign: 'center',
        color: 'rgba(255,255,255,0.7)', 
        fontSize: '16px', fontWeight: '500',
        padding: '0 60px', lineHeight: '1.4'
      }}>
        Not financial advice. Consult 254 Insurance Services. IRA licensed.
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: await fetch('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGHYcHhrib2Bg-4.ttf').then(res => res.arrayBuffer())
        }
      ]
    }
  );
}