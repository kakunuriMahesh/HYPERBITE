import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { scrollTo } from "../utils/SmoothScroll";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [breakpoint, setBreakpoint] = useState('desktop');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ENG');

  useEffect(() => {
    const updateBreakpoint = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 768) {
        setBreakpoint('mobile');
      } else if (viewportWidth < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const languages = [
    { code: 'ENG', label: 'ENG' },
    { code: 'JPN', label: '日本語' },
    { code: 'ITA', label: 'ITA' },
    { code: 'FRA', label: 'FRA' },
    { code: 'ESP', label: 'ESP' },
    { code: 'KOR', label: '한글' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    // Use Lenis smooth scroll instead of window.scrollTo
    scrollTo(0, { duration: 0.8 });
  };

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    // Add language change logic here if needed
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: breakpoint === 'mobile' ? '12px 16px' : '82px 120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <div
          onClick={() => handleNavClick('/')}
          style={{
            cursor: 'pointer',
            fontFamily: "'Permanent_Marker-Regular', Helvetica",
            fontSize: breakpoint === 'mobile' ? '20px' : '24px',
            color: '#000',
          }}
        >
          <img src="/assets/Logo.png" alt="Hyper bite" style={{ height: breakpoint === 'mobile' ? '50px' : '60px', }} />
        </div>

        {/* Menu/Close Button - Always visible with animation */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#000',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '48px',
            height: '48px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              opacity: isMenuOpen ? 0 : 1,
              transform: isMenuOpen ? 'rotate(-90deg) scale(0.8)' : 'rotate(0deg) scale(1)',
            }}
          >
            <IoMenu className="rotate-90 text-6xl" />
          </div>
          <div
            style={{
              position: 'absolute',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.8)',
            }}
          >
            <IoClose className="text-6xl" />
          </div>
        </button>
      </nav>

      {/* Menu Content - No overlay, directly below navbar */}
      <div
        style={{
          position: 'fixed',
          top: breakpoint === 'mobile' ? '0px' : '40px',
          left: 0,
          width: '100%',
          zIndex: 999,
          padding: breakpoint === 'mobile' ? '15px 16px' : '40px 50px',
          backgroundColor: '#fff',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none',
        }}
      >
        {/* Content Container - Always in row layout */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: breakpoint === 'mobile' ? '24px' : '48px',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Side - Brand and Navigation */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              flex: 1,
            }}
          >
            {/* Brand Name */}
            <div
              style={{
                fontFamily: "'Permanent_Marker-Regular', Helvetica",
                fontSize: breakpoint === 'mobile' ? '28px' : '36px',
                color: '#000',
                marginBottom: '8px',
                paddingLeft: breakpoint === 'mobile' ? '0px' : '120px',
                textAlign: breakpoint === 'mobile' ? 'right' : 'left',
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease 0.1s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s`,
              }}
            >
              Hyper bite
            </div>

            {/* Navigation Links */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: breakpoint === 'mobile' ? '16px' : '20px',
              }}
            >
              {navItems.map((item, index) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
                    fontSize: breakpoint === 'mobile' ? '18px' : '20px',
                    color: isActive(item.path) ? '#000' : '#999',
                    cursor: 'pointer',
                    padding: '8px 0',
                    paddingLeft: breakpoint === 'mobile' ? '0px' : '120px',
                    textAlign: 'left',
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                    transition: `color 0.2s ease, opacity 0.4s ease ${isMenuOpen ? 0.15 + index * 0.05 : 0}s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${isMenuOpen ? 0.15 + index * 0.05 : 0}s`,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.color = '#333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.color = '#999';
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Instagram Icon */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                marginTop: 'auto',
                paddingTop: '16px',
                paddingLeft: breakpoint === 'mobile' ? '0px' : '120px',
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${0.15 + navItems.length * 0.05}s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.15 + navItems.length * 0.05}s`,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ cursor: 'pointer' }}
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

          {/* Right Side - Language Selection */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              flex: 1,
            }}
          >
            {/* Circular Overlay Background */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                zIndex: 0,
              }}
            />

            {/* Language Options */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: breakpoint === 'mobile' ? '12px' : '16px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {languages.map((lang, index) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
                    fontSize: breakpoint === 'mobile' ? '18px' : '20px',
                    color: selectedLanguage === lang.code ? '#000' : '#999',
                    fontWeight: selectedLanguage === lang.code ? '600' : '400',
                    cursor: 'pointer',
                    padding: '8px 0',
                    textAlign: 'left',
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                    transition: `color 0.2s ease, font-weight 0.2s ease, opacity 0.4s ease ${isMenuOpen ? 0.2 + index * 0.05 : 0}s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${isMenuOpen ? 0.2 + index * 0.05 : 0}s`,
                  }}
                  onMouseEnter={(e) => {
                    if (selectedLanguage !== lang.code) {
                      e.target.style.color = '#333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedLanguage !== lang.code) {
                      e.target.style.color = '#999';
                    }
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

