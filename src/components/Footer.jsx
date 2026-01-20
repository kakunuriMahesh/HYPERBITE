import React, { useState, useEffect } from "react";

const Footer = () => {
  const [breakpoint, setBreakpoint] = useState('desktop'); // 'mobile', 'tablet', 'desktop'

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

  const currentYear = new Date().getFullYear();

  // Social media links - update these with your actual social media URLs
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ];

  return (
    <footer 
      className="bg-white w-full border-t border-gray-200"
      style={{
        paddingTop: breakpoint === 'mobile' ? '40px' : breakpoint === 'tablet' ? '50px' : '60px',
        paddingBottom: breakpoint === 'mobile' ? '30px' : breakpoint === 'tablet' ? '40px' : '50px',
        paddingLeft: breakpoint === 'mobile' ? '20px' : breakpoint === 'tablet' ? '50px' : '80px',
        paddingRight: breakpoint === 'mobile' ? '20px' : breakpoint === 'tablet' ? '50px' : '80px',
      }}
    >
      <div 
        style={{
          maxWidth: breakpoint === 'desktop' ? '1200px' : '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: breakpoint === 'mobile' ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: breakpoint === 'mobile' ? 'center' : 'flex-start',
          gap: breakpoint === 'mobile' ? '30px' : breakpoint === 'tablet' ? '40px' : '60px',
        }}
      >
        {/* Company Name */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: breakpoint === 'mobile' ? 'center' : 'flex-start',
            gap: '20px',
          }}
        >
          <div 
            className="[font-family:'Playfair Display',Inter,sans-serif] font-normal text-black tracking-[0] leading-[normal]"
            style={{
              fontSize: breakpoint === 'mobile' ? '24px' : breakpoint === 'tablet' ? '28px' : '34px',
              fontWeight: 700,
            }}
          >
            Hyper Bite
          </div>
        </div>

        {/* Social Media Links */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: breakpoint === 'mobile' ? 'center' : 'flex-start',
            gap: '20px',
          }}
        >
          <div 
            style={{
              fontSize: breakpoint === 'mobile' ? '14px' : breakpoint === 'tablet' ? '16px' : '18px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '10px',
            }}
          >
            Follow Us
          </div>
          <div 
            style={{
              display: 'flex',
              gap: breakpoint === 'mobile' ? '20px' : '24px',
              alignItems: 'center',
            }}
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                style={{
                  color: '#333',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: breakpoint === 'mobile' ? '36px' : '40px',
                  height: breakpoint === 'mobile' ? '36px' : '40px',
                  borderRadius: '50%',
                  border: '1px solid #e5e7eb',
                  backgroundColor: '#f9fafb',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#333';
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div 
        style={{
          marginTop: breakpoint === 'mobile' ? '30px' : breakpoint === 'tablet' ? '40px' : '50px',
          paddingTop: breakpoint === 'mobile' ? '20px' : breakpoint === 'tablet' ? '25px' : '30px',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center',
        }}
      >
        <p 
          className="[font-family:'Inter',sans-serif] font-normal text-gray-600 tracking-[0] leading-[normal]"
          style={{
            fontSize: breakpoint === 'mobile' ? '13px' : breakpoint === 'tablet' ? '14px' : '16px',
          }}
        >
          © {currentYear} Hyper Bite. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

