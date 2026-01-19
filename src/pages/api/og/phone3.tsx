/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const width = 1080;
    const height = 1920;

    const device = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
    const price = searchParams.get('price') || 'TBD';
    const imageUrl = searchParams.get('image');

    const MAROON = '#800000';
    const GOLD = '#C5A059';

    return new ImageResponse(
      (
        <div style={{
          height: '100%', width: '100%',
          display: 'flex', flexDirection: 'column',
          backgroundColor: '#f8f8f8', // Slightly off-white background to make the "Image Card" pop
          fontFamily: 'sans-serif',
          alignItems: 'center',
          position: 'relative',
        }}>
          
          {/* 1. TOP MAROON HEADER BAR */}
          <div style={{ 
            display: 'flex', width: '100%', height: 400, background: MAROON, 
            flexDirection: 'column', alignItems: 'center', paddingTop: 60, position: 'relative' 
          }}>
            <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" width={300} alt="Logo" style={{ filter: 'brightness(0) invert(1)' }} />
            
            {/* Geometric Accent on Header */}
            <div style={{ position: 'absolute', bottom: -50, width: 100, height: 100, background: GOLD, transform: 'rotate(45deg)', display: 'flex' }} />
          </div>

          {/* 2. THE "CREATIVE WHITE SECTION" (Card for White-BG Images) */}
          <div style={{ 
            display: 'flex', width: '85%', height: 900, background: '#FFFFFF', 
            marginTop: -120, borderRadius: 40, boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
            justifyContent: 'center', alignItems: 'center', border: `1px solid ${GOLD}`,
            overflow: 'hidden', zIndex: 10
          }}>
             {/* Decorative Gold Inner Border */}
             <div style={{ position: 'absolute', top: 20, left: 20, right: 20, bottom: 20, border: '1px solid #
