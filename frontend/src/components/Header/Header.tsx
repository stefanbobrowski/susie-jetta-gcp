import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import instagram from '../../assets/icons/instagram.svg';
import youTube from '../../assets/icons/youtube.svg';
import './Header.scss';

const Header: React.FC = () => {
  const location = useLocation();
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Close nav when window resizes above mobile width
  useEffect(() => {
    const resizeListener = () => {
      if (window.innerWidth > 767) setShowMobileNav(false);
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setShowMobileNav(false);
  }, [location]);

  // Disable background scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflowY = showMobileNav ? 'hidden' : 'auto';
  }, [showMobileNav]);

  return (
    <header>
      <Link to="/" className="home-link">
        susie jetta
      </Link>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        {['I', 'II', 'III'].map((album) => (
          <NavLink
            key={album}
            to={`/${album}`}
            end
            className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
          >
            {album === 'III' ? 'denn boca' : album}
          </NavLink>
        ))}

        <NavLink to="/book" className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
          book now
        </NavLink>
        <NavLink
          to="/packages"
          className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
        >
          packages
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
        >
          about
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
        >
          contact
        </NavLink>

        <a
          className="instagram"
          href="https://www.instagram.com/susiejetta/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagram} alt="Instagram" title="Instagram" />
        </a>
        <a
          className="youtube"
          href="https://www.youtube.com/channel/UCiV7zs_StQ6yv03WnLKy0vg"
          target="_blank"
          rel="noreferrer"
        >
          <img src={youTube} alt="YouTube" title="YouTube" />
        </a>

        <button
          className={`mobile-nav-button ${showMobileNav ? 'close' : 'open'}`}
          onClick={() => setShowMobileNav(!showMobileNav)}
        >
          <div className="line-1"></div>
          <div className="line-2"></div>
        </button>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${showMobileNav ? 'show' : ''}`}>
        {['I', 'II', 'III'].map((album) => (
          <NavLink
            key={album}
            to={`/${album}`}
            end
            className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            onClick={() => setShowMobileNav(false)}
          >
            {album === 'III' ? 'denn boca' : album}
          </NavLink>
        ))}
        <NavLink to="/book" className="nav-link" onClick={() => setShowMobileNav(false)}>
          book now
        </NavLink>
        <NavLink to="/packages" className="nav-link" onClick={() => setShowMobileNav(false)}>
          packages
        </NavLink>
        <NavLink to="/about" className="nav-link" onClick={() => setShowMobileNav(false)}>
          about
        </NavLink>
        <NavLink to="/contact" className="nav-link" onClick={() => setShowMobileNav(false)}>
          contact
        </NavLink>

        <a
          className="mobile-instagram"
          href="https://www.instagram.com/susiejetta/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagram} alt="instagram" title="Instagram" />
        </a>
        <a
          className="mobile-youtube"
          href="https://www.youtube.com/channel/UCiV7zs_StQ6yv03WnLKy0vg"
          target="_blank"
          rel="noreferrer"
        >
          <img src={youTube} alt="YouTube" title="YouTube" />
        </a>
      </nav>
    </header>
  );
};

export default Header;
