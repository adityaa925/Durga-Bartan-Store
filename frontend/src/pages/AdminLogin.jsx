import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (password === 'durga@1985') {
        localStorage.setItem('admin_auth', 'true');
        onLogin();
      } else {
        setError('Wrong password! Try again.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A0A00 0%, #3E1500 50%, #1A0A00 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 20,
        padding: '40px',
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/logo.png" alt="Logo" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#E65100' }}>Admin Panel</h1>
          <p style={{ color: '#8B7355', fontSize: '0.85rem' }}>Durga Bartan Store</p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#5C4A32', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#8B7355' }} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Enter admin password"
              style={{
                width: '100%', padding: '12px 44px',
                border: `1.5px solid ${error ? '#C62828' : '#E8D5C0'}`,
                borderRadius: 12, fontSize: '0.95rem',
                outline: 'none', fontFamily: 'Inter, sans-serif',
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#8B7355' }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p style={{ color: '#C62828', fontSize: '0.78rem', marginTop: 6 }}>{error}</p>}
        </div>

        <button
          onClick={handleLogin}
          disabled={loading || !password}
          style={{
            width: '100%', padding: '14px',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #E65100, #AC1900)',
            color: 'white', border: 'none', borderRadius: 12,
            fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
            transition: '0.2s',
          }}
        >
          {loading ? '⏳ Checking...' : '🔐 Login to Admin'}
        </button>
      </div>
    </div>
  );
}
