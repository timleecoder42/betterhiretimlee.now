interface OgContentSiteProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export function OgContentSite({ title, subtitle, imageUrl }: OgContentSiteProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        gap: '20px',
      }}
    >
      <div style={{ display: 'flex' }}>
        <img
          src={imageUrl}
          alt={title}
          width="180"
          height="180"
          style={{
            borderRadius: '50%',
            border: '4px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          }}
        />
      </div>
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
        {subtitle}
      </div>
    </div>
  );
}
