import { OG_IMAGE_FONT_FAMILY } from '@/constants/og';

type OgContentBlogProps = {
  title: string;
  date?: string;
  excerpt?: string;
  author?: {
    name: string;
    avatar: string;
  };
};

export function OgContentBlog({ title, date, excerpt, author }: OgContentBlogProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '80px',
        gap: '32px',
      }}
    >
      {/* Title Section */}
      <div
        style={{
          fontSize: 72,
          fontFamily: OG_IMAGE_FONT_FAMILY,
          letterSpacing: '-0.02em',
          fontWeight: 700,
          color: '#0f172a',
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>

      {/* Excerpt Section */}
      {excerpt && (
        <div
          style={{
            fontSize: 32,
            fontFamily: OG_IMAGE_FONT_FAMILY,
            color: '#475569',
            lineHeight: 1.4,
            paddingTop: '32px',
            paddingBottom: '32px',
          }}
        >
          {excerpt}
        </div>
      )}

      {/* Author and Date Section */}
      {(author || date) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {author && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={author.avatar}
                alt={author.name}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  fontSize: 24,
                  fontFamily: OG_IMAGE_FONT_FAMILY,
                  color: '#0f172a',
                }}
              >
                {author.name}
              </div>
            </div>
          )}
          {date && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  background: '#94a3b8',
                  borderRadius: '50%',
                }}
              />
              <div
                style={{
                  fontSize: 24,
                  fontFamily: OG_IMAGE_FONT_FAMILY,
                  color: '#64748b',
                }}
              >
                {date}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
