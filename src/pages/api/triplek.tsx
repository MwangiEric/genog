import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge', // This is the magic line that makes it an OG route
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get parameters
    const device = searchParams.get('device') || 'Smartphone';
    const price = searchParams.get('price') || '0';
    const img = searchParams.get('img') || 'https://ik.imagekit.io/ericmwangi/iphone.png';
    const specsRaw = searchParams.get('specs') || "";
    const specs = specsRaw.split(',').filter(Boolean).map(s => s.split(':'));

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0F0A0A',
            color: 'white',
            fontFamily: 'sans-serif',
          }}
        >
          <h1 style={{ fontSize: 100 }}>{device}</h1>
          <h2 style={{ fontSize: 60, color: '#3EB489' }}>KES {price}</h2>
        </div>
      ),
      {
        width: 1080,
        height: 1920,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
