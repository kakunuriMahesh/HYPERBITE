import React, { useState, useEffect } from "react";

const ProductSelector = ({ selectedProduct, onProductSelect }) => {
  const [breakpoint, setBreakpoint] = useState('desktop');
  const [hoveredProduct, setHoveredProduct] = useState(null);

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

  // Product data - you can update images, names, and descriptions here
  const products = [
    {
      id: 'nuts',
      name: 'Nuts Mix',
      image: '/assets/wallnut.webp', // Default product image for nuts
      description: 'Premium mixed nuts'
    },
    {
      id: 'dates',
      name: 'Dates',
      image: '/assets/date.webp',
      description: 'Fresh organic dates'
    },
    {
      id: 'seeds',
      name: 'Seeds',
      image: '/assets/sunflowerseed.webp',
      description: 'Nutritious seeds collection'
    }
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        top: breakpoint === 'mobile' ? '120px' : breakpoint === 'tablet' ? '130px' : '140px',
        right: breakpoint === 'mobile' ? '20px' : breakpoint === 'tablet' ? '30px' : '40px',
        zIndex: 1000,
        display: 'flex',
        gap: breakpoint === 'mobile' ? '12px' : breakpoint === 'tablet' ? '16px' : '20px',
        flexDirection: breakpoint === 'mobile' ? 'column' : 'row',
        alignItems: 'center',
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onProductSelect(product.id)}
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
          style={{
            position: 'relative',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: selectedProduct === product.id ? 'scale(1.1)' : hoveredProduct === product.id ? 'scale(1.05)' : 'scale(1)',
            opacity: selectedProduct === product.id ? 1 : hoveredProduct === product.id ? 0.9 : 0.7,
          }}
        >
          {/* Product Image Tab */}
          <div
            style={{
              width: breakpoint === 'mobile' ? '60px' : breakpoint === 'tablet' ? '70px' : '80px',
              height: breakpoint === 'mobile' ? '60px' : breakpoint === 'tablet' ? '70px' : '80px',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#fff',
              border: selectedProduct === product.id ? '3px solid #000' : '2px solid #e5e7eb',
              boxShadow: selectedProduct === product.id 
                ? '0 4px 12px rgba(0,0,0,0.15)' 
                : hoveredProduct === product.id 
                ? '0 2px 8px rgba(0,0,0,0.1)' 
                : '0 1px 4px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              transition: 'all 0.3s ease',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Product Name Tooltip - Shows on hover */}
          {hoveredProduct === product.id && (
            <div
              style={{
                position: 'absolute',
                top: breakpoint === 'mobile' ? 'auto' : '50%',
                bottom: breakpoint === 'mobile' ? '100%' : 'auto',
                left: breakpoint === 'mobile' ? '50%' : 'calc(100% + 12px)',
                transform: breakpoint === 'mobile' 
                  ? 'translateX(-50%) translateY(-8px)' 
                  : 'translateY(-50%)',
                backgroundColor: '#000',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: breakpoint === 'mobile' ? '12px' : '14px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                zIndex: 1001,
                pointerEvents: 'none',
                animation: 'fadeIn 0.2s ease',
                marginBottom: breakpoint === 'mobile' ? '8px' : '0',
                marginLeft: breakpoint === 'mobile' ? '0' : '0',
              }}
            >
              {product.name}
              {/* Arrow */}
              <div
                style={{
                  position: 'absolute',
                  [breakpoint === 'mobile' ? 'top' : 'left']: '100%',
                  [breakpoint === 'mobile' ? 'left' : 'top']: '50%',
                  transform: breakpoint === 'mobile' 
                    ? 'translateX(-50%) translateY(0)' 
                    : 'translateY(-50%)',
                  width: '0',
                  height: '0',
                  borderStyle: 'solid',
                  ...(breakpoint === 'mobile' 
                    ? {
                        borderTop: '6px solid #000',
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderBottom: 'none',
                        marginTop: '2px',
                      }
                    : {
                        borderLeft: '6px solid #000',
                        borderTop: '6px solid transparent',
                        borderBottom: '6px solid transparent',
                        borderRight: 'none',
                        marginLeft: '2px',
                      }
                  ),
                }}
              />
            </div>
          )}

          {/* Active Indicator */}
          {selectedProduct === product.id && (
            <div
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#000',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
          )}
        </div>
      ))}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: ${breakpoint === 'mobile' 
              ? 'translateX(-50%) translateY(-4px)' 
              : 'translateY(-50%) translateX(-4px)'};
          }
          to {
            opacity: 1;
            transform: ${breakpoint === 'mobile' 
              ? 'translateX(-50%) translateY(-8px)' 
              : 'translateY(-50%) translateX(0)'};
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translateX(-50%) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductSelector;

