import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

import { OgBackground } from '@/components/og/og-background';
import { OgContentBlog } from '@/components/og/og-content-blog';
import { OgContentSite } from '@/components/og/og-content-site';
import { OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '@/constants/og';

// Force edge runtime for OG image generation
export const runtime = 'edge';

const getContent = (type: string, params: URLSearchParams, origin: string) => {
  switch (type) {
    case 'blog': {
      const title = params.get('title');
      if (!title) throw new Error('Missing title parameter');
      return {
        component: (
          <OgContentBlog
            title={title}
            date={params.get('date') || undefined}
            excerpt={params.get('excerpt') || undefined}
            author={{
              name: 'Tim Lee',
              avatar: `${origin}/timleecoder42.jpg`,
            }}
          />
        ),
      };
    }
    default: {
      const title = decodeURIComponent(params.get('title') || 'Tim Lee');
      const subtitle = decodeURIComponent(
        params.get('subtitle') || 'Web Developer & AI Enthusiast'
      );
      return {
        component: (
          <OgContentSite
            title={title}
            subtitle={subtitle}
            imageUrl={`${origin}/timleecoder42.jpg`}
          />
        ),
      };
    }
  }
};

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url.replace(/&amp%3B/g, '&').replace(/&amp;/g, '&'));
    const { component } = getContent(
      url.searchParams.get('type') || 'site',
      url.searchParams,
      req.nextUrl.origin
    );

    return new ImageResponse(<OgBackground>{component}</OgBackground>, {
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
    });
  } catch (error: unknown) {
    console.log(`${error instanceof Error ? error.message : 'Failed to generate image'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
