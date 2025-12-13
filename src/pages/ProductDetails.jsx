import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productDetails } from "../config/productDetails";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [breakpoint, setBreakpoint] = useState('desktop');
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  useEffect(() => {
    if (productId && productDetails[productId]) {
      setProduct(productDetails[productId]);
    } else {
      navigate('/');
    }
  }, [productId, navigate]);

  if (!product) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  const images = product?.images || (product?.image ? [product.image] : []);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: '70px' }}>
      <Navbar />

      {/* Main Content */}
      <div
        style={{
          maxWidth: breakpoint === 'desktop' ? '1200px' : '100%',
          margin: '0 auto',
          padding: breakpoint === 'mobile' ? '20px' : '40px',
        }}
      >
        {/* Product Header Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: breakpoint === 'mobile' ? 'column' : 'row',
            gap: breakpoint === 'mobile' ? '30px' : '60px',
            marginBottom: '60px',
          }}
        >
          {/* Product Image Gallery */}
          <div
            style={{
              flex: breakpoint === 'mobile' ? '1' : '0 0 400px',
            }}
          >
            {/* Main Image */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img
                src={images[selectedImageIndex] || product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: breakpoint === 'mobile' ? 'auto' : '400px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  border: '1px solid #eee',
                }}
              />
            </div>
            
            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    style={{
                      padding: 0,
                      border: selectedImageIndex === index ? '2px solid #000' : '2px solid #ddd',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: 'transparent',
                      overflow: 'hidden',
                      width: breakpoint === 'mobile' ? '60px' : '80px',
                      height: breakpoint === 'mobile' ? '60px' : '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div style={{ flex: '1' }}>
            <h1
              style={{
                fontFamily: "'Permanent_Marker-Regular', Helvetica",
                fontSize: breakpoint === 'mobile' ? '36px' : breakpoint === 'tablet' ? '48px' : '54px',
                marginBottom: '16px',
                color: '#000',
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
                fontSize: breakpoint === 'mobile' ? '18px' : '22px',
                lineHeight: '1.5',
                marginBottom: '24px',
                color: '#333',
              }}
            >
              {product.description}
            </p>

            <div
              style={{
                marginBottom: '32px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Permanent_Marker-Regular', Helvetica",
                  fontSize: breakpoint === 'mobile' ? '32px' : '40px',
                  color: '#000',
                }}
              >
                {product.price}
              </span>
            </div>

            <button
              style={{
                padding: breakpoint === 'mobile' ? '14px 28px' : '16px 32px',
                fontFamily: "'Permanent_Marker-Regular', Helvetica",
                fontSize: breakpoint === 'mobile' ? '20px' : '24px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#45a049';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#4CAF50';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ORDER NOW
            </button>
          </div>
        </div>

        {/* Ingredients Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2
            style={{
              fontFamily: "'Permanent_Marker-Regular', Helvetica",
              fontSize: breakpoint === 'mobile' ? '32px' : '40px',
              marginBottom: '24px',
              color: '#000',
            }}
          >
            Ingredients
          </h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {product.ingredients.map((ingredient, index) => (
              <li
                key={index}
                style={{
                  fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
                  fontSize: breakpoint === 'mobile' ? '18px' : '20px',
                  padding: '12px 0',
                  borderBottom: index < product.ingredients.length - 1 ? '1px solid #eee' : 'none',
                  color: '#333',
                }}
              >
                • {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2
            style={{
              fontFamily: "'Permanent_Marker-Regular', Helvetica",
              fontSize: breakpoint === 'mobile' ? '32px' : '40px',
              marginBottom: '24px',
              color: '#000',
            }}
          >
            Benefits
          </h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {product.benefits.map((benefit, index) => (
              <li
                key={index}
                style={{
                  fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
                  fontSize: breakpoint === 'mobile' ? '18px' : '20px',
                  padding: '12px 0',
                  borderBottom: index < product.benefits.length - 1 ? '1px solid #eee' : 'none',
                  color: '#333',
                }}
              >
                ✓ {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Nutritional Information */}
        <div style={{ marginBottom: '60px' }}>
          <h2
            style={{
              fontFamily: "'Permanent_Marker-Regular', Helvetica",
              fontSize: breakpoint === 'mobile' ? '32px' : '40px',
              marginBottom: '24px',
              color: '#000',
            }}
          >
            Nutritional Information
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: breakpoint === 'mobile' ? '1fr 1fr' : 'repeat(3, 1fr)',
              gap: '16px',
            }}
          >
            {Object.entries(product.nutritionalInfo).map(([key, value]) => (
              <div
                key={key}
                style={{
                  padding: '16px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
                    fontSize: breakpoint === 'mobile' ? '14px' : '16px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    textTransform: 'capitalize',
                  }}
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div
                  style={{
                    fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
                    fontSize: breakpoint === 'mobile' ? '18px' : '20px',
                    color: '#666',
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <h2
              style={{
                fontFamily: "'Permanent_Marker-Regular', Helvetica",
                fontSize: breakpoint === 'mobile' ? '32px' : '40px',
                color: '#000',
                margin: 0,
              }}
            >
              Reviews
            </h2>
            <span
              style={{
                fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
                fontSize: breakpoint === 'mobile' ? '18px' : '22px',
                color: '#666',
              }}
            >
              {product.reviewCount}+
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: breakpoint === 'mobile' ? '1fr' : breakpoint === 'tablet' ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {product.reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  padding: '20px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '12px',
                  border: '1px solid #eee',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: '#FFD700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Permanent_Marker-Regular', Helvetica",
                      fontSize: '20px',
                      color: '#000',
                    }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Permanent_Marker-Regular', Helvetica",
                        fontSize: '18px',
                        color: '#000',
                        marginBottom: '4px',
                      }}
                    >
                      {review.name}
                    </div>
                    <div style={{ color: '#FFD700', fontSize: '16px' }}>
                      {'★'.repeat(review.rating)}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
                    fontSize: breakpoint === 'mobile' ? '16px' : '18px',
                    lineHeight: '1.5',
                    color: '#333',
                    margin: 0,
                  }}
                >
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

