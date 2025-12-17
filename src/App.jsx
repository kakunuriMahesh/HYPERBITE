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
import { SmoothScroll, scrollTo } from "./utils/SmoothScroll";
import SeedsLayout from "./components/SeedsLayout";

function HomePage() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState('nuts'); // Default to nuts

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
        <>
          <img
            src="/assets/Comic_nuts.png"
            alt="Comic nuts desktop"
            className="hidden md:block w-full h-auto"
          />

          <img
            src="/assets/Comic_nuts_mobile.png"
            alt="Comic nuts mobile"
            className="block md:hidden w-full h-auto"
          />
        </>
      }
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
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

