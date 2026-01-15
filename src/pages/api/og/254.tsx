import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Parse the data string (Format: Name:Value,Name:Value...)
  const rawData = searchParams.get('data') || "";
  const agents = rawData.split(',').filter(x => x).map(item => {
    const [name, value] = item.split(':');
    return { name, value };
  });

  // Calculate dynamic height: Header (150) + (26 agents * 80px each) + Footer (100)
  const dynamicHeight = Math.max(630, 250 + (agents.length * 85));

  return new ImageResponse(
    (
      <div tw="flex flex-col w-[800px] bg-white border-b-[30px] border-[#116530] font-sans">
        {/* Header */}
        <div tw="flex h-40 w-full items-center justify-between bg-[#002B5B] px-12 border-b-8 border-[#FFD700]">
          <div tw="flex items-center">
            <img src="https://ik.imagekit.io/ericmwangi/254logo.jpg" tw="h-20 w-20 rounded-2xl mr-6" />
            <div tw="flex flex-col">
              <span tw="text-3xl font-black text-white uppercase tracking-tight">254 Insurance</span>
              <span tw="text-[#FFD700] text-sm font-bold uppercase tracking-[0.4em]">Full Agent Production Roster</span>
            </div>
          </div>
        </div>

        {/* The List of 26 */}
        <div tw="flex flex-col px-10 py-10 bg-white">
          {agents.map((agent, i) => (
            <div key={i} tw={`flex items-center justify-between p-5 mb-2 rounded-xl border-l-4 ${
              i < 3 ? 'bg-blue-50 border-[#FFD700]' : 'bg-slate-50 border-slate-200'
            }`}>
              <div tw="flex items-center">
                <span tw="w-10 text-xl font-black text-slate-300 italic">{i + 1}</span>
                <span tw="text-xl font-bold text-slate-800 ml-4 uppercase">{agent.name}</span>
                {i < 3 && <span tw="ml-3 text-[10px] bg-[#FFD700] px-2 py-0.5 rounded font-black">TOP TIER</span>}
              </div>
              <div tw="flex flex-col items-end">
                <span tw="text-2xl font-black text-[#116530]">KES {agent.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Summary Footer */}
        <div tw="flex bg-[#002B5B] p-8 items-center justify-center">
          <span tw="text-white text-sm font-bold uppercase tracking-widest opacity-80">
            Total Active Producers: {agents.length} | Life & Health Coverage
          </span>
        </div>
      </div>
    ),
    { width: 800, height: dynamicHeight }
  );
}
