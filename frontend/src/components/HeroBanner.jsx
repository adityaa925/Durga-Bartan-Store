export default function HeroBanner() {
  return (
    <section className="hero" id="hero-banner">
      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__badge">✨ Trusted by 10,000+ families</div>
          <h1 className="hero__title">
            Premium Utensils &<br />
            <span>Crockery Collection</span>
          </h1>
          <p className="hero__subtitle">
            Discover handpicked steel utensils, elegant crockery sets, and traditional
            cookware for every Indian kitchen. Quality that lasts generations.
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 16px',
            background: 'rgba(37,211,102,0.1)',
            border: '1px solid rgba(37,211,102,0.3)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            marginBottom: 'var(--space-lg)',
            width: 'fit-content',
          }}>
            <span>📍</span>
            <span>Mathana, Kurukshetra — In front of Mathana Bus Stand</span>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-value">500+</div>
              <div className="hero__stat-label">Products</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value">40+</div>
              <div className="hero__stat-label">Years Legacy</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value">4.8★</div>
              <div className="hero__stat-label">Rating</div>
            </div>
          </div>
        </div>

        {/* Logo as hero visual */}
        <div className="hero__visual" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="/logo.png"
            alt="Durga Bartan Store"
            style={{
                 width: '320px',
                 height: '320px',
                 objectFit: 'cover',
                 borderRadius: '50%',
                 boxShadow: '0 8px 40px rgba(139,69,19,0.4)',
                 animation: 'floatLogo 4s ease-in-out infinite',
                 border: '4px solid rgba(255,255,255,0.2)',
                  }}
          />
        </div>
      </div>

      <style>{`
        @keyframes floatLogo {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}
