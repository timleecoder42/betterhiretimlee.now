interface OgBackgroundProps {
  children: React.ReactNode;
  background?: string;
}

export function OgBackground({ children, background = '#ffffff' }: OgBackgroundProps) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: background,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
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
          display: 'flex',
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
          display: 'flex',
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
          zIndex: 3,
        }}
      >
        {children}
      </div>
    </div>
  );
}
