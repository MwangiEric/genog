/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

/* ----------  build-time font files (official repo pattern) ---------- */
const inter400 = fetch(new URL('../../../assets/Inter-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer());
const inter500 = fetch(new URL('../../../assets/Inter-Medium.ttf', import.meta.url)).then((res) => res.arrayBuffer());

export const config = { runtime: 'experimental-edge' };

export default async function handler(req: NextRequest) {
  const interRegular = await inter400;
  const interMedium  = await inter500;

  const { searchParams } = new URL(req.url);

  const device   = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
  const price    = searchParams.get('price')  || 'Contact for Price';
  const imageUrl = searchParams.get('image');
  const glowHex  = /^[0-9A-F]{6}$/i.test(searchParams.get('glow') || '') ? searchParams.get('glow') : 'C5A059';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          fontFamily: 'Inter',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(14,17,17,1)',
        }}
      >
        {/* 1.  GOLD TOP BAR  */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#C5A059', padding: '20px 40px', borderRadius: 18, marginBottom: 40, width: '90%' }}>
          <span style={{ fontSize: 32, fontWeight: 500, color: '#000' }}>TRIPLE K</span>
          <span style={{ fontSize: 24, fontWeight: 500, color: '#000' }}>PREMIUM PHONES</span>
        </div>

        {/* 2.  DEVICE TITLE  */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: device.length > 20 ? 80 : 105, fontWeight: 500, textAlign: 'center', textTransform: 'uppercase', letterSpacing: -4, lineHeight: 1, color: '#fff' }}>
            {device}
          </span>
        </div>

        {/* 3.  HERO – glow + glass + phone  */}
        <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          {/* back glow */}
          <div style={{ position: 'absolute', width: 900, height: 900, background: `radial-gradient(circle, #${glowHex}33 0%, transparent 70%)`, borderRadius: '50%' }} />
          {/* glass plate */}
          <div style={{ position: 'absolute', width: 980, height: 980, backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 48 }} />
          {/* phone image */}
          <div style={{ position: 'absolute', width: 950, height: 950, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            {imageUrl
              ? <img src={imageUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              : <div style={{ width: '100%', height: '100%', background: 'rgba(0,0,0,.3)', border: '2px dashed #333', borderRadius: 24, fontSize: 40, color: '#555' }}>DEVICE IMAGE</div>
            }
          </div>
        </div>

        {/* 4.  PRICE BADGE  */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <div style={{ display: 'flex', background: '#3EB489', padding: '20px 80px', borderRadius: 25, boxShadow: '0 25px 50px rgba(62, 180, 137, 0.3)' }}>
            <span style={{ fontSize: 85, fontWeight: 500, color: '#000' }}>KES {price}</span>
          </div>
        </div>

        {/* 5.  FOOTER – static text + icons  */}
        <div style={{ display: 'flex', width: '90%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', marginTop: 40, padding: '30px 40px', borderRadius: 30, justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21zm9-11a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1-.9-2-2-2z"/></svg>
            <span style={{ fontSize: 32, fontWeight: 500, color: '#fff' }}>0704 554 445</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span style={{ fontSize: 24, fontWeight: 500, color: '#C5A059' }}>CBD, NAIROBI</span>
          </div>
        </div>

        {/* 6.  GOLD CTA BAR  */}
        <div style={{ display: 'flex', background: '#C5A059', height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginTop: 30, boxShadow: '0 20px 40px rgba(197,160,89,0.4)', width: '90%' }}>
          <span style={{ fontSize: 38, fontWeight: 500, letterSpacing: 6, color: '#000' }}>SHOP NOW ❯</span>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400 },
        { name: 'Inter', data: interMedium, weight: 500 },
      ],
    }
  );
}
