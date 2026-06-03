const CATEGORY_ICONS = {
  cookware: '🍳',
  steel: '🥘',
  glassware: '🥛',
  crockery: '🍽',
  cutlery: '🍴',
  decorative: '🪔',
  all: '🛒',
};

export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <section className="categories container" id="categories">
      <h2 className="categories__title">Shop by Category</h2>
      <div className="categories__grid">
        <button
          className={`category-pill ${!activeCategory ? 'active' : ''}`}
          onClick={() => onSelect(null)}
          id="category-all"
        >
          <img
            src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f6d2.png`}
            width="20" height="20"
            alt="all"
            style={{ objectFit: 'contain' }}
          />
          All Items
        </button>
        {categories.map((cat) => {
          const twemojiMap = {
            cookware: '1f373',
            steel: '1f958',
            glassware: '1f95b',
            crockery: '1f37d',
            cutlery: '1f374',
            decorative: '1fa94',
          };
          return (
            <button
              key={cat.id}
              className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => onSelect(cat.id)}
              id={`category-${cat.id}`}
            >
              <img
                src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${twemojiMap[cat.id] || '1f6d2'}.png`}
                width="20" height="20"
                alt={cat.label}
                style={{ objectFit: 'contain' }}
              />
              {cat.label}
              <span className="category-pill__count">{cat.count}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}