import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const BRANDS = [
  {
    id: 'milton',
    name: 'Milton',
    tagline: 'Premium Insulated Cookware',
    logo: 'https://www.miltonindia.com/pub/static/version1/frontend/Milton/miltonstore/en_US/images/logo.svg',
    logoBg: '#fff',
    bg: 'linear-gradient(135deg, #1565C0, #42A5F5)',
    shadow: 'rgba(21,101,192,0.5)',
    description: 'Trusted by millions for insulated cookware & lunch boxes.',
    founded: '1972',
    products: '500+',
    emoji: '🍳',
  },
  {
    id: 'prestige',
    name: 'Prestige',
    tagline: "India's No.1 Pressure Cooker",
    logo: 'https://www.prestigesmartchef.com/pub/static/version1/frontend/Prestige/default/en_US/images/logo.png',
    logoBg: '#fff',
    bg: 'linear-gradient(135deg, #B71C1C, #EF5350)',
    shadow: 'rgba(183,28,28,0.5)',
    description: 'Premium pressure cookers & cookware since 1955.',
    founded: '1955',
    products: '1000+',
    emoji: '🥘',
  },
  {
    id: 'hawkins',
    name: 'Hawkins',
    tagline: 'Better Cooking. Better Living.',
    logo: 'https://www.hawkinscookers.com/images/hawkins-logo.png',
    logoBg: '#fff',
    bg: 'linear-gradient(135deg, #1B5E20, #66BB6A)',
    shadow: 'rgba(27,94,32,0.5)',
    description: 'Iconic pressure cookers loved by Indian families.',
    founded: '1959',
    products: '200+',
    emoji: '🫕',
  },
  {
    id: 'cello',
    name: 'Cello',
    tagline: 'Quality You Can Trust',
    logo: 'https://www.celloworld.com/pub/static/version1/frontend/Cello/default/en_US/images/logo.png',
    logoBg: '#fff',
    bg: 'linear-gradient(135deg, #4A148C, #AB47BC)',
    shadow: 'rgba(74,20,140,0.5)',
    description: 'Household products — cookware, storage & more.',
    founded: '1986',
    products: '800+',
    emoji: '🧊',
  },
  {
    id: 'vinod',
    name: 'Vinod Cookware',
    tagline: 'Steel That Lasts a Lifetime',
    logo: 'https://vinodcookware.com/cdn/shop/files/Vinod_Logo_Black.png',
    logoBg: '#fff',
    bg: 'linear-gradient(135deg, #3E2723, #8D6E63)',
    shadow: 'rgba(62,39,35,0.5)',
    description: 'Premium stainless steel utensils & cookware.',
    founded: '1962',
    products: '400+',
    emoji: '🥄',
  },
  {
    id: 'richlife',
    name: 'Richlife',
    tagline: 'Rich Quality. Rich Life.',
    logo: '',
    logoBg: '#FFF8E1',
    bg: 'linear-gradient(135deg, #E65100, #FFB300)',
    shadow: 'rgba(230,81,0,0.5)',
    description: 'Quality steel utensils for every Indian kitchen.',
    founded: '2000',
    products: '150+',
    emoji: '✨',
  },
  {
    id: 'borosil',
    name: 'Borosil',
    tagline: 'Pure. Safe. Healthy.',
    logo: 'https://www.borosil.com/cdn/shop/files/borosil-logo.png',
    logoBg: '#fff',
    bg: 'linear-gradient(135deg, #006064, #00BCD4)',
    shadow: 'rgba(0,96,100,0.5)',
    description: 'Premium borosilicate glass — safe & elegant.',
    founded: '1962',
    products: '300+',
    emoji: '🥛',
  },
];

function BrandCard({ brand, index }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05,1.05,1.05)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={() => navigate('/')}
      style={{
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        cursor: 'pointer',
        transform: transform || 'perspective(1000px) rotateX(0) rotateY(0)',
        transition: isHovered ? 'none' : 'transform 0.5s ease, box-shadow 0.5s ease',
        boxShadow: isHovered
          ? `0 30px 60px ${brand.shadow}, 0 0 40px ${brand.shadow}`
          : `0 10px 30px ${brand.shadow}`,
        animation: `cardEntrance 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* Glow effect */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          zIndex: 2,
          pointerEvents: 'none',
          borderRadius: 24,
        }} />
      )}

      {/* Card background */}
      <div style={{
        background: brand.bg,
        padding: '32px 24px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -30, right: -30,
          width: 120, height: 120,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />
        <div style={{
          position: 'absolute', bottom: -20, left: -20,
          width: 80, height: 80,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />

        {/* Logo */}
        <div style={{
          width: 100, height: 100,
          borderRadius: 20,
          background: 'rgba(255,255,255,0.95)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          position: 'relative', zIndex: 1,
          overflow: 'hidden',
          flexDirection: 'column', gap: 2,
        }}>
          {brand.logo ? (
            <img
              src={brand.logo}
              alt={brand.name}
              style={{ width: '75%', height: '75%', objectFit: 'contain' }}
              onError={e => {
                e.target.style.display = 'none';
                const fallback = e.target.nextSibling;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          <div style={{
            display: brand.logo ? 'none' : 'flex',
            flexDirection: 'column', alignItems: 'center',
          }}>
            <span style={{ fontSize: '2.8rem', lineHeight: 1 }}>{brand.emoji}</span>
            <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#5C4A32', marginTop: 2 }}>{brand.name}</span>
          </div>
        </div>

        {/* Brand name */}
        <h3 style={{
          fontSize: '1.4rem', fontWeight: 800,
          color: 'white', fontFamily: 'Outfit, sans-serif',
          marginBottom: 4, position: 'relative', zIndex: 1,
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}>
          {brand.name}
        </h3>
        <p style={{
          fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)',
          fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: '0.06em', position: 'relative', zIndex: 1,
        }}>
          {brand.tagline}
        </p>
      </div>

      {/* Card body */}
      <div style={{
        background: 'white',
        padding: '20px 24px',
      }}>
        <p style={{
          fontSize: '0.85rem', color: '#5C4A32',
          lineHeight: 1.6, marginBottom: 16,
        }}>
          {brand.description}
        </p>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 10, marginBottom: 16,
        }}>
          {[
            { label: 'Est.', value: brand.founded },
            { label: 'Products', value: brand.products },
          ].map((stat, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '10px',
              background: '#FFF8F0',
              borderRadius: 12,
              border: '1px solid #F0E0D0',
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#E65100', fontFamily: 'Outfit, sans-serif' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Shop button */}
        <button style={{
          width: '100%', padding: '12px',
          background: brand.bg,
          color: 'white', border: 'none',
          borderRadius: 12, fontSize: '0.9rem',
          fontWeight: 700, cursor: 'pointer',
          transition: '0.2s', fontFamily: 'Outfit, sans-serif',
          letterSpacing: '0.02em',
          boxShadow: `0 4px 15px ${brand.shadow}`,
        }}
          onMouseEnter={e => e.target.style.opacity = '0.9'}
          onMouseLeave={e => e.target.style.opacity = '1'}
          onClick={e => { e.stopPropagation(); navigate('/'); }}
        >
          Shop {brand.name} →
        </button>
      </div>
    </div>
  );
}

export default function BrandsPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <main style={{ paddingTop: 'var(--navbar-height)', minHeight: '100vh', overflow: 'hidden' }}>

        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #1A0A00 0%, #3E1500 40%, #5C2200 70%, #1A0A00 100%)',
          padding: '60px 20px 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Animated background particles */}
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              borderRadius: '50%',
              background: `rgba(255,179,0,${0.03 + i * 0.01})`,
              top: `${10 + i * 15}%`,
              left: `${i % 2 === 0 ? 5 + i * 8 : 60 + i * 5}%`,
              animation: `float ${3 + i}s ease-in-out infinite alternate`,
            }} />
          ))}

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 20px',
              background: 'rgba(255,179,0,0.15)',
              border: '1px solid rgba(255,179,0,0.3)',
              borderRadius: 999, fontSize: '0.75rem',
              fontWeight: 700, color: '#FFB300',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              marginBottom: 20,
            }}>
              🏆 Our Trusted Brand Partners
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 900, color: 'white',
              fontFamily: 'Outfit, sans-serif',
              lineHeight: 1.1, marginBottom: 16,
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}>
              Premium Brands at<br />
              <span style={{
                background: 'linear-gradient(135deg, #FFB300, #FF6D00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Durga Bartan Store
              </span>
            </h1>

            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1.05rem', maxWidth: 500,
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}>
              We stock only the most trusted brands in India — quality you can rely on for generations!
            </p>

            {/* Brand count */}
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { value: '7', label: 'Top Brands' },
                { value: '3000+', label: 'Products' },
                { value: '40+', label: 'Years Legacy' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFB300', fontFamily: 'Outfit, sans-serif' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div style={{ marginTop: -2, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#FFF8F0"/>
          </svg>
        </div>

        {/* Brands Grid */}
        <div style={{ background: '#FFF8F0', padding: '40px 20px 60px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}>
              {BRANDS.map((brand, i) => (
                <BrandCard key={brand.id} brand={brand} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #1A0A00, #3E1500)',
          padding: '48px 20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🏪</div>
          <h2 style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            fontWeight: 800, color: 'white',
            fontFamily: 'Outfit, sans-serif', marginBottom: 8,
          }}>
            Visit Our Store for All Brands!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24, fontSize: '0.9rem' }}>
            📍 Mathana, Kurukshetra — In front of Mathana Bus Stand
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:7056328380" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #E65100, #AC1900)',
              color: 'white', borderRadius: 999,
              fontSize: '0.9rem', fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(230,81,0,0.4)',
            }}>
              📞 70563 28380
            </a>
            <a href="https://wa.me/917056328380" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 24px',
              background: '#25D366', color: 'white',
              borderRadius: 999, fontSize: '0.9rem',
              fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
            }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>

      </main>
      <Footer />

      <style>{`
        @keyframes cardEntrance {
          from { opacity: 0; transform: perspective(1000px) translateY(40px) rotateX(10deg); }
          to { opacity: 1; transform: perspective(1000px) translateY(0) rotateX(0); }
        }
        @keyframes float {
          from { transform: translateY(0) scale(1); }
          to { transform: translateY(-20px) scale(1.1); }
        }
        @media (max-width: 768px) {
          .brand-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

