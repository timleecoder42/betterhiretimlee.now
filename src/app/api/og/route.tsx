import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Tim Lee';

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
            backgroundColor: '#f8fafc',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
              zIndex: 0,
            }}
          />

          {/* Decorative blobs */}
          <div
            style={{
              position: 'absolute',
              top: '-160px',
              right: '-160px',
              width: '480px',
              height: '480px',
              background: 'rgba(168, 85, 247, 0.2)',
              borderRadius: '100%',
              filter: 'blur(32px)',
              opacity: 0.8,
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-160px',
              left: '-160px',
              width: '480px',
              height: '480px',
              background: 'rgba(59, 130, 246, 0.2)',
              borderRadius: '100%',
              filter: 'blur(32px)',
              opacity: 0.8,
              zIndex: 1,
            }}
          />

          {/* Content */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              gap: '20px',
              zIndex: 3,
            }}
          >
            {/* Using img instead of next/image because this is an edge runtime API route */}
            <img
              src={`${req.nextUrl.origin}/timleecoder42.jpg`}
              alt="Tim Lee"
              width="180"
              height="180"
              style={{
                borderRadius: '50%',
                border: '4px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              }}
            />
            <div
              style={{
                display: 'flex',
                fontSize: 72,
                fontWeight: 'bold',
                color: '#0f172a',
                textAlign: 'center',
                lineHeight: 1.2,
                marginTop: '20px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 36,
                color: '#334155',
                textAlign: 'center',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
              }}
            >
              Software Engineer & AI Enthusiast
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error: unknown) {
    console.log(`${error instanceof Error ? error.message : 'Failed to generate image'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
