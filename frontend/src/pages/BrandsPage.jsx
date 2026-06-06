import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const BRANDS = [
  {
    id: 'milton',
    name: 'Milton',
    tagline: 'Premium Insulated Cookware',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milton_logo.svg/1200px-Milton_logo.svg.png',
    bg: '#E3F2FD',
    color: '#1565C0',
    emoji: '🍳',
    description: 'Indias most trusted brand for insulated cookware, lunch boxes and water bottles.',
  },
  {
    id: 'prestige',
    name: 'Prestige',
    tagline: 'Indias No.1 Pressure Cooker',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Prestige_Cookers_logo.svg/1200px-Prestige_Cookers_logo.svg.png',
    bg: '#FFF3E0',
    color: '#E65100',
    emoji: '🥘',
    description: 'Premium pressure cookers, cookware and kitchen appliances since 1955.',
  },
  {
    id: 'hawkins',
    name: 'Hawkins',
    tagline: 'Better Cooking. Better Living.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Hawkins_Cookers_logo.png',
    bg: '#E8F5E9',
    color: '#2E7D32',
    emoji: '🫕',
    description: 'Iconic pressure cookers and cookware trusted by Indian families for generations.',
  },
  {
    id: 'cello',
    name: 'Cello',
    tagline: 'Quality You Can Trust',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Cello_World_logo.svg/1200px-Cello_World_logo.svg.png',
    bg: '#F3E5F5',
    color: '#6A1B9A',
    emoji: '🧊',
    description: 'Wide range of household products including cookware, storage and water bottles.',
  },
  {
    id: 'vinod',
    name: 'Vinod Cookware',
    tagline: 'Steel That Lasts a Lifetime',
    logo: 'https://vinodcookware.com/cdn/shop/files/Vinod_Logo_Black.png',
    bg: '#EFEBE9',
    color: '#4E342E',
    emoji: '🥄',
    description: 'Premium stainless steel cookware and utensils made with highest quality standards.',
  },
  {
    id: 'richlife',
    name: 'Richlife',
    tagline: 'Rich Quality. Rich Life.',
    logo: '',
    bg: '#FFF8E1',
    color: '#F57F17',
    emoji: '✨',
    description: 'Quality steel utensils and kitchen accessories for every Indian home.',
  },
  {
    id: 'borosil',
    name: 'Borosil',
    tagline: 'Pure. Safe. Healthy.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Borosil_logo.svg/1200px-Borosil_logo.svg.png',
    bg: '#E0F7FA',
    color: '#006064',
    emoji: '🥛',
    description: 'Premium borosilicate glass products — microwave safe, durable and elegant.',
  },
];

export default function BrandsPage() {
  const navigate = useNavigate();

  return (
    <>
      <main style={{ paddingTop: 'calc(var(--navbar-height) + 24px)', paddingBottom: 64, minHeight: '100vh' }}>
        <div className="container">

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px',
              background: 'rgba(230,81,0,0.08)',
              border: '1px solid rgba(230,81,0,0.2)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem', fontWeight: 700,
              color: 'var(--primary)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: 12,
            }}>
              🏆 Our Brand Partners
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 10, fontFamily: 'Outfit, sans-serif' }}>
              Top Brands at Durga Bartan Store
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>
              We stock only the most trusted brands in India — quality you can rely on!
            </p>
          </div>

          {/* Brands Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {BRANDS.map((brand) => (
              <div
                key={brand.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  transition: 'var(--transition-base)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  e.currentTarget.style.borderColor = 'var(--border-strong)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
                onClick={() => navigate(`/?brand=${brand.id}`)}
              >
                {/* Brand Logo Area */}
                <div style={{
                  height: 140,
                  background: brand.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                }}>
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      style={{ maxHeight: 80, maxWidth: '80%', objectFit: 'contain' }}
                      onError={e => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div style={{
                    display: brand.logo ? 'none' : 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                    <span style={{ fontSize: '3rem' }}>{brand.emoji}</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: brand.color, fontFamily: 'Outfit, sans-serif' }}>
                      {brand.name}
                    </span>
                  </div>
                </div>

                {/* Brand Info */}
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
                      {brand.name}
                    </h3>
                    <span style={{ fontSize: '1.4rem' }}>{brand.emoji}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: brand.color, marginBottom: 8 }}>
                    {brand.tagline}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 14 }}>
                    {brand.description}
                  </p>
                  <button
                    style={{
                      width: '100%', padding: '10px',
                      background: `linear-gradient(135deg, ${brand.color}, ${brand.color}CC)`,
                      color: 'white', border: 'none',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.85rem', fontWeight: 600,
                      cursor: 'pointer', transition: '0.2s',
                    }}
                    onClick={e => { e.stopPropagation(); navigate('/'); }}
                  >
                    Shop {brand.name} →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{
            marginTop: 48, textAlign: 'center',
            padding: '32px 24px',
            background: 'linear-gradient(135deg, rgba(230,81,0,0.06), rgba(255,179,0,0.06))',
            border: '1px solid rgba(230,81,0,0.12)',
            borderRadius: 'var(--radius-xl)',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: 10 }}>🏪</div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>
              Visit Our Store for More Brands!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 16 }}>
              📍 Mathana, Kurukshetra — In front of Mathana Bus Stand
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:7056328380" style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px',
                background: 'var(--primary)', color: 'white',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem', fontWeight: 600,
                textDecoration: 'none',
              }}>
                📞 70563 28380
              </a>
              <a href="https://wa.me/917056328380" target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px',
                background: '#25D366', color: 'white',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem', fontWeight: 600,
                textDecoration: 'none',
              }}>
                💬 WhatsApp
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
