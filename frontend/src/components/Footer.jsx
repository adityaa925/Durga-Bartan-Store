export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__grid">
        <div className="footer__about">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-sm)' }}>
            <img
              src="/logo.png"
              alt="Durga Bartan Store"
              style={{ width: 56, height: 56, objectFit: 'contain', borderRadius: '50%' }}
            />
            <div className="footer__brand-name">Durga Bartan Store</div>
          </div>
          <p className="footer__brand-desc">
            Serving quality utensils and crockery to Indian families since 1985.
            From everyday steel thalis to premium bone china dinner sets —
            we have everything for your kitchen and dining needs.
          </p>
        </div>
        <div>
          <h4 className="footer__heading">Categories</h4>
          <ul className="footer__links">
            <li><a href="#/">Steel Utensils</a></li>
            <li><a href="#/">Cookware</a></li>
            <li><a href="#/">Crockery Sets</a></li>
            <li><a href="#/">Glassware</a></li>
            <li><a href="#/">Cutlery</a></li>
            <li><a href="#/">Decorative Items</a></li>
          </ul>
        </div>
        <div>
          <h4 className="footer__heading">Customer Help</h4>
          <ul className="footer__links">
            <li><a href="#/">Track Order</a></li>
            <li><a href="#/">Return Policy</a></li>
            <li><a href="#/">Bulk Orders</a></li>
            <li><a href="#/">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="footer__heading">Visit Our Store</h4>
          <ul className="footer__links">
            <li>📍 Mathana, Kurukshetra</li>
            <li>🏪 In front of Mathana Bus Stand</li>
            <li>📞 <a href="tel:7056328380">70563 28380</a></li>
            <li>
              <a
                href="https://wa.me/917056328380"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#25D366' }}
              >
                💬 WhatsApp Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Durga Bartan Store. All rights reserved.</span>
        <span>Made with ❤ in India</span>
      </div>
    </footer>
  );
}
