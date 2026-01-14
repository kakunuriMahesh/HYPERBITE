import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import { formatCartMessage } from '../utils/whatsapp';
import { getCookie, setCookie } from '../utils/cookies';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
  } = useCart();
  const [breakpoint, setBreakpoint] = useState('desktop');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    whatsapp: '',
    pincode: '',
    country: '',
    landmark: '',
  });

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

  // Load saved user details from cookies
  useEffect(() => {
    const savedDetails = getCookie('userDetails');
    if (savedDetails) {
      setFormData(savedDetails);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Save user details to cookies (30 days)
    setCookie('userDetails', formData, 30);
    
    // Format and send WhatsApp message
    const message = formatCartMessage(cartItems, formData);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/9985875017?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after order
    clearCart();
    
    // Show success message
    alert('Order placed successfully! Please complete your order on WhatsApp.');
    
    // Navigate to home
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: '70px' }}>
        <Navbar />
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: breakpoint === 'mobile' ? '40px 20px' : '60px 40px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily:"Nunito Sans",
              fontSize: breakpoint === 'mobile' ? '28px' : '36px',
              marginBottom: '18px',
              color: '#111',
              fontWeight: 700,
            }}
          >
            Your Cart is Empty
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: breakpoint === 'mobile' ? '14px' : '16px',
              marginBottom: '30px',
              color: '#666',
            }}
          >
            Add some products to your cart to get started!
          </p>
          <button
            onClick={() => navigate('/products')}
            style={{
              padding: breakpoint === 'mobile' ? '14px 28px' : '16px 32px',
              fontFamily: "'Inter', sans-serif",
              fontSize: breakpoint === 'mobile' ? '14px' : '16px',
              backgroundColor: '#000',
              color: '#fff',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#333';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#000';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: '70px' }}>
      <Navbar />
      <div
        style={{
          maxWidth: '1200px',
          margin: breakpoint === 'mobile' ? '10px auto' : '100px auto',
          padding: breakpoint === 'mobile' ? '20px' : '40px',
        }}
      >
        <h1
          style={{
            fontFamily:"Nunito Sans",
            fontSize: breakpoint === 'mobile' ? '28px' : '36px',
            marginBottom: '24px',
            color: '#111',
            fontWeight: 700,
          }}
        >
          Your Cart
        </h1>

        {/* Cart Items */}
        <div style={{ marginBottom: '40px' }}>
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${item.variation || 'default'}-${index}`}
              style={{
                display: 'flex',
                flexDirection: breakpoint === 'mobile' ? 'column' : 'row',
                gap: '20px',
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                border: '1px solid #eee',
              }}
            >
              {/* Product Image */}
              <div
                style={{
                  width: breakpoint === 'mobile' ? '100%' : '150px',
                  height: '150px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={item.image || item.images?.[0]}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '8px',
                  }}
                />
              </div>

              {/* Product Info */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "'Permanent_Marker-Regular', Helvetica",
                    fontSize: breakpoint === 'mobile' ? '24px' : '28px',
                    marginBottom: '8px',
                    color: '#000',
                  }}
                >
                  {item.name}
                </h3>
                {item.variation && item.variation !== 'default' && (
                  <p
                    style={{
                      fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
                      fontSize: '16px',
                      color: '#666',
                      marginBottom: '8px',
                    }}
                  >
                    Variation: {item.variation}
                  </p>
                )}
                <p
                  style={{
                    fontFamily: "'Permanent_Marker-Regular', Helvetica",
                    fontSize: breakpoint === 'mobile' ? '20px' : '24px',
                    color: '#000',
                    marginBottom: '12px',
                  }}
                >
                  {item.price}
                </p>

                {/* Quantity Controls */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.variation || 'default',
                        item.quantity - 1
                      )
                    }
                    style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#fff',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: '#000',
                    }}
                  >
                    <FaMinus size={14} />
                  </button>
                  <span
                    style={{
                      fontFamily: "'Permanent_Marker-Regular', Helvetica",
                      fontSize: '20px',
                      minWidth: '40px',
                      textAlign: 'center',
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.variation || 'default',
                        item.quantity + 1
                      )
                    }
                    style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#fff',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: '#000',
                    }}
                  >
                    <FaPlus size={14} />
                  </button>
                  <button
                    onClick={() =>
                      removeFromCart(item.id, item.variation || 'default')
                    }
                    style={{
                      marginLeft: 'auto',
                      padding: '8px 16px',
                      backgroundColor: '#ff4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
                      fontSize: '16px',
                    }}
                  >
                    <FaTrash size={14} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div
          style={{
            backgroundColor: '#f9f9f9',
            padding: '30px',
            borderRadius: '12px',
            marginBottom: '30px',
            border: '1px solid #eee',
          }}
        >
          <h2
            style={{
              fontFamily:"Nunito Sans",
              fontSize: breakpoint === 'mobile' ? '20px' : '22px',
              marginBottom: '16px',
              color: '#111',
              fontWeight: 600,
            }}
          >
            Order Summary
          </h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 0',
              borderTop: '1px solid #ddd',
              borderBottom: '1px solid #ddd',
              marginTop: '20px',
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: breakpoint === 'mobile' ? '16px' : '18px',
                color: '#666',
                fontWeight: 600,
              }}
            >
              Total:
            </span>
            <span
              style={{
                fontFamily:"Nunito Sans",
                fontSize: breakpoint === 'mobile' ? '18px' : '22px',
                color: '#111',
                fontWeight: 700,
              }}
            >
              {getCartTotal().toFixed(2)} RS
            </span>
          </div>
        </div>

        {/* Place Order Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              width: '100%',
              padding: breakpoint === 'mobile' ? '14px' : '18px',
              fontFamily: "'Inter', sans-serif",
              fontSize: breakpoint === 'mobile' ? '14px' : '16px',
              backgroundColor: '#25D366',
              color: '#fff',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#20BA5A';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#25D366';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginRight: '8px' }}
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Place Order
          </button>
        )}

        {/* Order Form */}
        {showForm && (
          <form
            onSubmit={handlePlaceOrder}
            style={{
              backgroundColor: '#f9f9f9',
              padding: '30px',
              borderRadius: '12px',
              marginTop: '30px',
              border: '1px solid #eee',
            }}
          >
            <h2
              style={{
                fontFamily:"Nunito Sans",
                fontSize: breakpoint === 'mobile' ? '20px' : '22px',
                marginBottom: '18px',
                color: '#111',
                fontWeight: 600,
              }}
            >
              Delivery Information
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  breakpoint === 'mobile' ? '1fr' : 'repeat(2, 1fr)',
                gap: '20px',
                marginBottom: '20px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 600,
                  }}
                >
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 600,
                  }}
                >
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 600,
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 600,
                  }}
                >
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 600,
                  }}
                >
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
                    fontSize: '18px',
                    marginBottom: '8px',
                    color: '#333',
                  }}
                >
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
                    fontSize: '16px',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  marginBottom: '8px',
                  color: '#333',
                  fontWeight: 600,
                }}
              >
                Landmark *
              </label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: breakpoint === 'mobile' ? '14px' : '18px',
                fontFamily: "'Inter', sans-serif",
                fontSize: breakpoint === 'mobile' ? '14px' : '16px',
                backgroundColor: '#25D366',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#20BA5A';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#25D366';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Place Order via WhatsApp
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Cart;

