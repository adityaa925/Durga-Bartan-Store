import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categoryLabels = {
  cookware: '🍳 Cookware',
  steel: '🥘 Steel Utensils',
  glassware: '🥛 Glassware',
  crockery: '🍽 Crockery',
  cutlery: '🍴 Cutlery',
  decorative: '🪔 Decorative',
};

export default function SearchBar({ searchTerm, onSearch }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [products, setProducts] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Load all products once
  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter suggestions based on search term
  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const q = searchTerm.toLowerCase().trim();

    // Match products
    const matchedProducts = products
      .filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.material?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      )
      .slice(0, 6);

    // Match categories
    const matchedCategories = Object.entries(categoryLabels)
      .filter(([id, label]) => label.toLowerCase().includes(q) || id.toLowerCase().includes(q))
      .slice(0, 2)
      .map(([id, label]) => ({ type: 'category', id, label }));

    const results = [
      ...matchedCategories.map(c => ({ type: 'category', ...c })),
      ...matchedProducts.map(p => ({ type: 'product', ...p })),
    ];

    setSuggestions(results);
    setShowSuggestions(results.length > 0);
    setActiveSuggestion(-1);
  }, [searchTerm, products]);

  const handleSelect = (suggestion) => {
    if (suggestion.type === 'category') {
      onSearch('');
      navigate('/');
      // Small delay to let navigation happen, then scroll to category
      setTimeout(() => {
        const el = document.getElementById('category-' + suggestion.id);
        if (el) el.click();
      }, 100);
    } else {
      onSearch(suggestion.name);
      navigate('/product/' + suggestion.id);
    }
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      if (activeSuggestion >= 0) {
        handleSelect(suggestions[activeSuggestion]);
      } else {
        setShowSuggestions(false);
        navigate('/');
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    onSearch('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', flex: 1, maxWidth: 440 }}>
      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <Search
          size={18}
          style={{
            position: 'absolute', left: 14, top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)', pointerEvents: 'none',
          }}
        />
        <input
          ref={inputRef}
          type="text"
          className="navbar__search-input"
          placeholder="Search utensils, crockery, cookware..."
          value={searchTerm || ''}
          onChange={(e) => {
            onSearch(e.target.value);
            if (window.location.hash !== '#/') navigate('/');
          }}
          onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
          onKeyDown={handleKeyDown}
          id="search-input"
          style={{ paddingRight: searchTerm ? 36 : 16 }}
          autoComplete="off"
        />
        {/* Clear button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            style={{
              position: 'absolute', right: 10, top: '50%',
              transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', padding: 2,
              display: 'flex', alignItems: 'center',
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0, right: 0,
          background: 'white',
          borderRadius: 14,
          boxShadow: '0 8px 32px rgba(26,18,7,0.15)',
          border: '1px solid var(--border)',
          zIndex: 9999,
          overflow: 'hidden',
          maxHeight: 360,
          overflowY: 'auto',
        }}>

          {/* Header */}
          <div style={{
            padding: '8px 14px',
            fontSize: '0.7rem', fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
          }}>
            Search Results
          </div>

          {suggestions.map((s, i) => (
            <div
              key={i}
              onClick={() => handleSelect(s)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px',
                cursor: 'pointer',
                background: activeSuggestion === i ? 'var(--bg-secondary)' : 'white',
                borderBottom: i < suggestions.length - 1 ? '1px solid var(--border)' : 'none',
                transition: '0.15s',
              }}
              onMouseEnter={() => setActiveSuggestion(i)}
            >
              {s.type === 'category' ? (
                <>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', flexShrink: 0,
                  }}>
                    {s.label.split(' ')[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {s.label.split(' ').slice(1).join(' ')}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 500 }}>
                      Browse category
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={s.image}
                    alt={s.name}
                    style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                    onError={e => { e.target.src = 'https://placehold.co/36x36?text=?'; }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.875rem', fontWeight: 500,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {s.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {categoryLabels[s.category]?.split(' ').slice(1).join(' ')} · {s.material}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>
                    ₹{s.price?.toLocaleString()}
                  </div>
                </>
              )}
            </div>
          ))}

          {/* View all */}
          <div
            onClick={() => { setShowSuggestions(false); navigate('/'); }}
            style={{
              padding: '10px 14px',
              textAlign: 'center',
              fontSize: '0.8rem', fontWeight: 600,
              color: 'var(--primary)',
              cursor: 'pointer',
              background: 'var(--bg-secondary)',
              borderTop: '1px solid var(--border)',
            }}
          >
            View all results for "{searchTerm}" →
          </div>
        </div>
      )}
    </div>
  );
}
