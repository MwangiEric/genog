// pages/api/poster-simple.ts - Fast, reliable version

import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

// Your API base URL
const API_BASE = 'https://your-api.vercel.app/api/v1';

const CATEGORY_MAP: Record<string, string> = {
  phones: 'smartphones',
  laptops: 'laptops',
  tvs: 'tvs',
  speakers: 'soundbars',
  headphones: 'accessories'
};

async function getProductImage(query: string, category?: string): Promise<string | null> {
  try {
    const params = new URLSearchParams({
      q: query,
      n: '3', // Fewer results = faster
      thumb_width: '600',
      w: '600'
    });
    if (category) params.append('category', category);

    const res = await fetch(`${API_BASE}/products/search?${params.toString()}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    return data.images?.[0]?.url || data.images?.[0]?.img_src || null;
  } catch {
    return null;
  }
}

export default async function handler(req: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    
    // Required params
    const device = searchParams.get('device')?.toUpperCase() || 'DEVICE';
    const price = searchParams.get('price') || 'TBD';
    
    // Optional specs
    const ram = searchParams.get('ram') || '';
    const rom = searchParams.get('rom') || '';
    const bat = searchParams.get('bat') || '';
    const scr = searchParams.get('scr') || '';
    
    // Image handling
    let imageUrl = searchParams.get('image'); // Direct URL if provided
    
    // Auto-search only if no image provided
    if (!imageUrl) {
      const searchQuery = searchParams.get('search') || searchParams.get('device') || '';
      const category = searchParams.get('category');
      const mappedCat = category ? CATEGORY_MAP[category.toLowerCase()] : undefined;
      
      // Quick timeout for OG edge function
      const timeoutPromise = new Promise<null>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 4000)
      );
      
      imageUrl = await Promise.race([
        getProductImage(searchQuery, mappedCat),
        timeoutPromise
      ]).catch(() => null);
    }

    const MAROON = '#800000';
    const GOLD = '#C5A059';
    const MINT = '#3EB489';

    // Build specs array (only show if provided)
    const specs = [
      { label: 'SCREEN', val: scr },
      { label: 'RAM', val: ram },
      { label: 'STORAGE', val: rom },
      { label: 'BATTERY', val: bat }
    ].filter(s => s.val);

    return new ImageResponse(
      (
        <div style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#050505',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '60px 50px',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', marginBottom: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ik.imagekit.io/ericmwangi/tklogo.png"
              width={280}
              height={80}
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Device Name */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
            <span style={{
              fontSize: device.length > 15 ? 70 : 100,
              fontWeight: 900,
              textAlign: 'center',
              letterSpacing: -3,
              lineHeight: 0.9
            }}>
              {device}
            </span>
            <div style={{ height: 5, width: 120, background: MAROON, marginTop: 12 }} />
          </div>

          {/* Product Image */}
          <div style={{
            display: 'flex',
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            marginVertical: 20
          }}>
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                style={{
                  maxWidth: '85%',
                  maxHeight: '75%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.4))'
                }}
              />
            ) : (
              <div style={{
                width: '50%',
                height: '50%',
                borderRadius: 30,
                border: '2px dashed #333',
                backgroundColor: '#0a0a0a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#444', fontSize: 28, fontWeight: 800 }}>NO IMAGE</span>
              </div>
            )}
          </div>

          {/* Specs */}
          {specs.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 12,
              marginBottom: 30
            }}>
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: '#111',
                    padding: '15px 20px',
                    borderRadius: 15,
                    border: '1px solid #222',
                    minWidth: '140px'
                  }}
                >
                  <span style={{ color: GOLD, fontSize: 14, fontWeight: 800, marginBottom: 4 }}>
                    {spec.label}
                  </span>
                  <span style={{ fontSize: 26, fontWeight: 900 }}>{spec.val}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <div style={{
              display: 'flex',
              backgroundColor: MINT,
              padding: '18px 70px',
              borderRadius: 20,
              boxShadow: '0 15px 40px rgba(62, 180, 137, 0.3)'
            }}>
              <span style={{ fontSize: 72, fontWeight: 900, color: '#000' }}>
                KES {price}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex',
            width: '100%',
            background: '#0a0a0a',
            padding: '25px 30px',
            borderRadius: 30,
            border: `1px solid ${MAROON}40`,
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ik.imagekit.io/ericmwangi/whatsapp.png"
                width={50}
                height={50}
                style={{ marginRight: 15 }}
              />
              <div>
                <span style={{ color: GOLD, fontSize: 14, fontWeight: 800 }}>ORDER NOW</span>
                <span style={{ fontSize: 28, fontWeight: 900, display: 'block' }}>0733 565861</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: GOLD, fontSize: 14, fontWeight: 800 }}>LOCATION</span>
              <span style={{ fontSize: 20, fontWeight: 900, display: 'block' }}>CBD OPP. MKU</span>
            </div>
          </div>

          {/* Website */}
          <div style={{ marginTop: 20 }}>
            <span style={{ fontSize: 18, color: '#333', fontWeight: 800, letterSpacing: 8 }}>
              WWW.TRIPPLEK.CO.KE
            </span>
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1920,
        headers: {
          'Cache-Control': 'public, max-age=86400' // 24 hour cache
        }
      }
    );
  } catch (e) {
    console.error('Poster failed:', e);
    return new Response('Failed to generate poster', { status: 500 });
  }
}
