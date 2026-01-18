import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// 1. CONSTANTS (Your Branding & New Contact Info)
const BRAND = {
  maroon: '#800000',
  gold: '#C5A059',
  mint: '#3EB489',
  dark: '#050505',
  whatsapp: '0733 565861',
  call: '0715 130013',
  location: 'CBD OPP. MKU'
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // 2. DATA FALLBACKS
    const device = searchParams.get('device')?.toUpperCase() || 'PREMIUM DEVICE';
    const price = searchParams.get('price') || 'TBD';
    const ram = searchParams.get('ram') || '---';
    const rom = searchParams.get('rom') || '---';
    const bat = searchParams.get('bat') || '---';
    const scr = searchParams.get('scr') || '---';
    const imageUrl = searchParams.get('image');

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full bg-[#050505] text-white p-[60px] items-center">
          
          {/* TOP LOGO */}
          <img src="https://ik.imagekit.io/ericmwangi/tklogo.png" tw="w-[320px] h-[90px] mb-6" />

          {/* DEVICE NAME */}
          <div tw="flex flex-col items-center mb-4">
            <span tw="text-[110px] font-black text-center leading-none tracking-tighter">
              {device}
            </span>
            <div tw={`h-2 w-40 bg-[${BRAND.maroon}] mt-4`} />
          </div>

          {/* HERO AREA (White Spotlight) */}
          <div tw="flex flex-1 w-full justify-center items-center relative">
            <div tw="absolute w-[850px] h-[850px] rounded-full" 
                 style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)' }} />
            
            {imageUrl ? (
              <img src={imageUrl} tw="w-[90%] h-[80%] object-contain z-10" />
            ) : (
              <div tw="w-[60%] h-[65%] border-4 border-dashed border-gray-800 rounded-[40px] flex items-center justify-center z-10">
                <span tw="text-gray-700 text-4xl font-bold">IMAGE PENDING</span>
              </div>
            )}
          </div>

          {/* SPECS GRID (4 Specs) */}
          <div tw="flex flex-wrap justify-center mb-10 w-full">
            {[
              { label: 'SCREEN', val: scr },
              { label: 'RAM', val: ram },
              { label: 'STORAGE', val: rom },
              { label: 'BATTERY', val: bat }
            ].map((spec) => (
              <div key={spec.label} tw="flex flex-col items-center bg-[#111] p-6 m-2 rounded-2xl border border-gray-900 min-w-[220px]">
                <span tw={`text-[${BRAND.gold}] text-lg font-extrabold mb-1`}>{spec.label}</span>
                <span tw="text-3xl font-black">{spec.val}</span>
              </div>
            ))}
          </div>

          {/* PRICE SECTION */}
          <div tw={`flex bg-[${BRAND.mint}] px-24 py-6 rounded-[30px] mb-10`}>
            <span tw="text-8xl font-black text-black">KES {price}</span>
          </div>

          {/* FOOTER: WHATSAPP & LOCATION */}
          <div tw={`flex w-full bg-[#0a0a0a] p-8 rounded-[40px] border border-[${BRAND.maroon}]40 justify-between items-center`}>
             {/* Left: Call & WhatsApp */}
             <div tw="flex items-center">
                <img src="https://ik.imagekit.io/ericmwangi/whatsapp.png" tw="w-16 h-16 mr-4" />
                <div tw="flex flex-col">
                  <span tw={`text-[${BRAND.gold}] text-sm font-bold`}>CALL/WHATSAPP</span>
                  <span tw="text-3xl font-black">{BRAND.whatsapp}</span>
                  <span tw="text-xl font-bold opacity-70">{BRAND.call}</span>
                </div>
             </div>

             {/* Right: Location */}
             <div tw="flex items-center">
                <div tw="flex flex-col items-end mr-4">
                  <span tw={`text-[${BRAND.gold}] text-sm font-bold`}>LOCATION</span>
                  <span tw="text-2xl font-black">{BRAND.location}</span>
                </div>
                <img src="https://ik.imagekit.io/ericmwangi/location.png" tw="w-14 h-14" />
             </div>
          </div>

          {/* BOTTOM URL (Simple text, no icon) */}
          <div tw="flex mt-8">
            <span tw="text-2xl text-gray-700 font-bold tracking-[10px]">WWW.TRIPPLEK.CO.KE</span>
          </div>

        </div>
      ),
      { width: 1080, height: 1920 }
    );
  } catch (e: any) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
