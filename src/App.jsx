import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import HeroBanner from "./components/HeroBanner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import ProductSelector from "./components/ProductSelector";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import { SmoothScroll, scrollTo } from "./utils/SmoothScroll";
import SeedsLayout from "./components/SeedsLayout";
import { CartProvider } from "./context/CartContext";
import WhatsAppFloat from "./components/WhatsAppFloat";

function HomePage() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState('nuts'); // Default to nuts
  const [breakpoint, setBreakpoint] = useState('desktop');

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

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
    // Scroll to top when product changes using Lenis
    scrollTo(0, { duration: 0.8 });
  };

  const handleOpenDetails = () => {
    navigate(`/product/${selectedProduct}`);
  };

  return (
    <>
      <Navbar />
      <ProductSelector 
        selectedProduct={selectedProduct} 
        onProductSelect={handleProductSelect} 
      />
      <HeroBanner 
        key={selectedProduct} 
        productType={selectedProduct} 
        onOpenDetails={handleOpenDetails}
      />
      {selectedProduct === 'nuts' && 
        <div className="max-w-6xl mx-auto">
          <picture>
            <source srcSet="/assets/Comic_nuts.png" media="(min-width: 768px)" />
            <source srcSet="/assets/Comic_nuts_mobile.png" media="(max-width: 767px)" />
            <img src="/assets/Comic_nuts.png" alt="Comic nuts" />
          </picture>
        </div>
      }
      <WhatsAppFloat breakpoint={breakpoint} />
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Preload critical images
    const imageUrls = [
      '/assets/wallnut.webp',
      '/assets/date.webp',
      '/assets/sunflowerseed.webp',
      '/assets/pumpkinseed.webp',
      '/assets/dateorange.webp',
      '/assets/sunflowershell.webp',
      '/assets/dot.svg',
      '/assets/Vector 2.png'
    ];

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const loadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.src = url;
      });
    };

    imageUrls.forEach(loadImage);
  }, []);

  useEffect(() => {
    // Only hide loading screen when both animation and images are ready
    if (animationComplete && imagesLoaded) {
      setIsLoading(false);
    }
  }, [animationComplete, imagesLoaded]);

  const handleLoadingComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <CartProvider>
      <Router>
        {/* Initialize smooth scroll - runs once on mount */}
        {!isLoading && <SmoothScroll />}
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
        {!isLoading && (
          <>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </>
        )}
      </Router>
    </CartProvider>
  );
}

