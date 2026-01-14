import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler(req: Request) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',   // solid black
          color: '#fff',
          fontSize: 60,
          fontWeight: 700,
        }}
      >
        HELLO
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
