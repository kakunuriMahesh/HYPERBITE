import React, { forwardRef, useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { productConfigs, getAnimationPositions } from "../config/productConfig";
import DatesTimeline from "./DatesTimeline";
import NutsLayout from "./NutsLayout";
import SeedsLayout from "./SeedsLayout";
import { useGSAPContext } from "../hooks/useGSAPContext";

gsap.registerPlugin(ScrollTrigger);

const HeroBanner = forwardRef(({ productType = 'nuts', onOpenDetails }, ref) => {
  const [scale, setScale] = useState(1);
  const [breakpoint, setBreakpoint] = useState('desktop'); // 'mobile', 'tablet', 'desktop'
  const containerRef = useRef(null);
  const vectorRef = useRef(null);
  
  // Get product configuration
  const productConfig = productConfigs[productType] || productConfigs.nuts;
  

  // Navbar is now handled by shared Navbar component in App.jsx

  // Refs for all nuts/seeds
  const nutRefs = {
    pumpkinseed1: useRef(null),
    wallnut1: useRef(null),
    sunflowerseed1: useRef(null),
    dateorange1: useRef(null),
    dateorange2: useRef(null),
    sunflowershell: useRef(null),
    sunflowerseed2: useRef(null),
    pumpkinseed2: useRef(null),
    date: useRef(null),
    wallnutCenter: useRef(null),
  };

  const isDates = productType === 'dates';

  useEffect(() => {
    const updateScale = () => {
      const viewportWidth = window.innerWidth;
      let newBreakpoint = 'desktop';
      let baseWidth = 1698;
      
      if (viewportWidth < 768) {
        newBreakpoint = 'mobile';
        baseWidth = 375; // Mobile base width
      } else if (viewportWidth < 1024) {
        newBreakpoint = 'tablet';
        baseWidth = 768; // Tablet base width
      } else {
        newBreakpoint = 'desktop';
        baseWidth = 1698;
      }
      
      setBreakpoint(newBreakpoint);
      
      if (newBreakpoint === 'desktop') {
        // Desktop: scale to fit
        const newScale = Math.min((viewportWidth * 0.96) / 1698, 1);
        setScale(newScale);
      } else {
        // Mobile/Tablet: use 1:1 scale (we'll use responsive units)
        setScale(1);
      }
    };

    updateScale();
    const resizeHandler = () => {
      updateScale();
      // Refresh ScrollTrigger after resize
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  // All breakpoints now use viewport-based calculations, so container height is consistently 3 * viewport height
  // No need to calculate maxFinalY since we use consistent viewport-based positioning

  // Use GSAP context for proper cleanup
  useGSAPContext(() => {
    if (!containerRef.current || isDates) return;

    const container = containerRef.current;
    const viewportWidth = window.innerWidth;
    const currentViewportHeight = window.innerHeight;

    // Get product-specific animation positions based on current breakpoint
    // Pass viewport height for mobile/tablet calculations (section2Start uses vh * 2)
    const animationData = getAnimationPositions(productType, breakpoint, currentViewportHeight);
    const initialPositions = animationData.initial;
    const finalPositions = animationData.final;

    // Get product-specific rotation speeds and animation settings
    const rotationSpeeds = productConfig.animations.rotationSpeeds;
    const dateSpeedMultiplier = productConfig.animations.dateSpeedMultiplier || 1.5;

    // Create ScrollTrigger for the entire page
    const isMobileOrTablet = viewportWidth < 1024;
    
    // All breakpoints now use viewport-based calculations (3 sections of 100vh each)
    // Section 1: 0-100vh, Quote: 100vh-200vh, Section 2: 200vh-300vh
    // For desktop: Final positions use section2Start = vh * 3, so need extra container height
    const containerHeight = isMobileOrTablet 
      ? currentViewportHeight * 3 // 300vh - 3 sections for mobile/tablet
      : currentViewportHeight * 3; // 350vh - extra height for desktop to accommodate lower final positions
    
    // Animation completes at 200vh (when second section becomes visible) for all breakpoints
    // This ensures rotation stops and nuts settle when second section is visible, no more animation
    // Even though desktop final positions are at vh * 3, animation reaches 100% progress at 200vh
    const animationEndPoint = currentViewportHeight * 2; // 200vh - when second section becomes visible (same for all)

    // Prepare all nut elements with GPU acceleration and initial positions
    const nutElements = [];
    Object.keys(nutRefs).forEach((key) => {
      const nutRef = nutRefs[key].current;
      if (!nutRef) return;

      const initial = initialPositions[key];
      const final = finalPositions[key];
      if (!initial || !final) return;

      // Add GPU acceleration hints
      gsap.set(nutRef, {
        force3D: true,
        transformOrigin: "center center",
        willChange: "transform",
        backfaceVisibility: "hidden",
      });

      // Set initial position using transforms for GPU acceleration
      gsap.set(nutRef, {
        x: initial.x,
        y: initial.y,
        rotation: initial.rotation,
        width: initial.width,
        height: initial.height,
        left: "auto",
        top: "auto",
      });

      const rotationSpeed = rotationSpeeds[key];
      const isDate = key === 'dateorange1' || key === 'dateorange2' || key === 'date';

      nutElements.push({
        element: nutRef,
        initial,
        final,
        rotationSpeed,
        isDate,
        key,
      });
    });

    // Prepare vector animation data
    let vectorInitial = null;
    let vectorFinal = null;
    if (vectorRef.current) {
      gsap.set(vectorRef.current, {
        force3D: true,
        transformOrigin: "center center",
        willChange: "transform",
        backfaceVisibility: "hidden",
      });

      if (viewportWidth >= 1024) {
        // Desktop: Scale and position vector
        const baseWidth = 1698;
        const baseHeight = 1946;
        const targetCenterX = -150;
        const targetCenterY = 450;

        vectorInitial = { x: 0, y: 0, scale: 1 };
        vectorFinal = { 
          scale: 0.35, 
          x: targetCenterX, 
          y: targetCenterY 
        };

        gsap.set(vectorRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          left: "auto",
          top: "auto",
        });
      } else if (viewportWidth < 768) {
        // Mobile: Vector animation
        const vectorStartWidth = 402;
        const vectorStartHeight = 874;
        const vectorEndWidth = 88 * 0.351;
        const vectorEndHeight = 193 * 0.351;
        const vectorEndX = 150 - vectorEndWidth / 2;
        const vectorEndY = 869 - vectorEndHeight - 20;

        vectorInitial = { 
          x: 0, 
          y: 0, 
          width: vectorStartWidth, 
          height: vectorStartHeight 
        };
        vectorFinal = { 
          x: vectorEndX, 
          y: vectorEndY, 
          width: vectorEndWidth, 
          height: vectorEndHeight 
        };

        gsap.set(vectorRef.current, {
          x: 0,
          y: 0,
          width: vectorStartWidth,
          height: vectorStartHeight,
          left: "auto",
          top: "auto",
        });
      } else {
        // Tablet
        const containerWidth = 768;
        const containerHeight = 1900;
        const clusterCenterX = 360;
        const clusterTopY = 1275;
        const endScale = 0.35;

        vectorInitial = { 
          x: 0, 
          y: 0, 
          width: containerWidth, 
          height: containerHeight 
        };
        vectorFinal = { 
          x: clusterCenterX - (containerWidth * endScale) / 2, 
          y: clusterTopY - 60 - (containerHeight * endScale) / 2, 
          width: containerWidth * endScale, 
          height: containerHeight * endScale 
        };

        gsap.set(vectorRef.current, {
          x: 0,
          y: 0,
          width: containerWidth,
          height: containerHeight,
          left: "auto",
          top: "auto",
        });
      }
    }

    // Ensure we have nut elements before creating ScrollTrigger
    if (nutElements.length === 0) {
      console.warn('No nut elements found for animation');
      return;
    }

    // Create ScrollTrigger with optimized onUpdate (single callback for all animations)
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${Math.round(animationEndPoint)}`, // Animation completes at section2Start
      scrub: 1.2, // Higher scrub for smoother, more gradual animation (higher = smoother lag)
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const rawProgress = self.progress;
        
        // Use smooth easing for premium feel - smooth step provides gentle easing at start/end
        // This creates a more natural, premium animation feel with smooth acceleration/deceleration
        const smoothStep = (t) => {
          return t * t * (3 - 2 * t);
        };
        
        // Apply smooth step easing for smoother animation progression
        const progress = smoothStep(rawProgress);
        
        // Animate all nut elements - all seeds move at the same speed for consistency
        nutElements.forEach(({ element, initial, final, rotationSpeed, isDate }) => {
          // Use same progress for all seeds - dates no longer move faster
          // This ensures all seeds stay visible and move at consistent speed
          const animProgress = progress;

          // Interpolate position - ensure values are valid numbers
          const currentX = initial.x + (final.x - initial.x) * animProgress;
          const currentY = initial.y + (final.y - initial.y) * animProgress;
          
          // Fix rotation calculation - interpolate base rotation, then add continuous rotation
          const rotationDelta = final.rotation - initial.rotation;
          const baseRotation = initial.rotation + (rotationDelta * animProgress);
          
          // Stop continuous rotation when animation completes (progress >= 1.0)
          // This ensures rotation stops when second section is visible and nuts are settled
          const continuousRotation = animProgress >= 1.0 
            ? baseRotation 
            : baseRotation + (rotationSpeed * animProgress);

          // Interpolate size
          const currentWidth = initial.width + (final.width - initial.width) * animProgress;
          const currentHeight = initial.height + (final.height - initial.height) * animProgress;

          // Use gsap.set for immediate updates (no animation, just set values)
          // Ensure all values are valid numbers before setting
          if (!isNaN(currentX) && !isNaN(currentY) && !isNaN(continuousRotation)) {
            gsap.set(element, {
              x: currentX,
              y: currentY,
              rotation: continuousRotation,
              width: currentWidth,
              height: currentHeight,
            });
          }
        });

        // Animate vector background with progress
        if (vectorRef.current && vectorInitial && vectorFinal) {
          if (viewportWidth >= 1024) {
            gsap.set(vectorRef.current, {
              x: vectorInitial.x + (vectorFinal.x - vectorInitial.x) * progress,
              y: vectorInitial.y + (vectorFinal.y - vectorInitial.y) * progress,
              scale: vectorInitial.scale + (vectorFinal.scale - vectorInitial.scale) * progress,
            });
          } else {
            gsap.set(vectorRef.current, {
              x: vectorInitial.x + (vectorFinal.x - vectorInitial.x) * progress,
              y: vectorInitial.y + (vectorFinal.y - vectorInitial.y) * progress,
              width: vectorInitial.width + (vectorFinal.width - vectorInitial.width) * progress,
              height: vectorInitial.height + (vectorFinal.height - vectorInitial.height) * progress,
            });
          }
          
          // Update z-index based on raw progress
          vectorRef.current.style.zIndex = rawProgress > 0.3 ? "6" : "1";
        }
      },
    });

    // Refresh ScrollTrigger after setup to ensure correct calculations
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      // Force initial update to trigger animation
      if (scrollTrigger) {
        scrollTrigger.update();
      }
    });
  }, [scale, breakpoint, productType, isDates, containerRef, vectorRef, nutRefs, productConfig]);

  // Calculate container dimensions based on breakpoint
  // All breakpoints now use 3 viewport heights (300vh) to match section2Start positions
  const getContainerDimensions = () => {
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : (breakpoint === 'mobile' ? 750 : breakpoint === 'tablet' ? 1024 : 1080);
    
    if (breakpoint === 'mobile') {
      return {
        width: '100%',
        height: 'auto',
        minHeight: `${viewportHeight * 3}px`, // 300vh - 3 sections
        baseWidth: 375,
        baseHeight: viewportHeight * 3,
      };
    } else if (breakpoint === 'tablet') {
      return {
        width: '100%',
        height: 'auto',
        minHeight: `${viewportHeight * 3}px`, // 300vh - 3 sections
        baseWidth: 768,
        baseHeight: viewportHeight * 3,
      };
    } else {
        // Desktop: Use 300vh (3 sections) - consistent with mobile/tablet
        return {
          width: `${1698 * scale}px`,
          height: 'auto',
          minHeight: `${viewportHeight * 3}px`, // 350vh - extra height for lower final positions
          baseWidth: 1698,
          baseHeight: viewportHeight * 3,
        };
    }
  };

  const containerDims = getContainerDimensions();

  return (
    <div ref={ref} className="bg-white w-full relative" style={{ overflowX: 'hidden', overflowY: 'auto', paddingTop: '70px' }}>
      {isDates ? (
        <DatesTimeline productConfig={productConfig} onOpenDetails={onOpenDetails} breakpoint={breakpoint} />
      ) : (
        <div 
          className="relative bg-white"
          style={{ 
            width: containerDims.width,
            minHeight: containerDims.minHeight,
            height: containerDims.height,
            margin: '0 auto',
            maxWidth: breakpoint === 'desktop' ? 'none' : '100%',
            paddingBottom: breakpoint === 'mobile' ? '120px' : breakpoint === 'tablet' ? '150px' : `${150 * scale}px`
          }}
        >
          <div 
            ref={containerRef}
            className="relative bg-white"
            style={{ 
              width: breakpoint === 'desktop' ? '1698px' : '100%',
              minHeight: containerDims.minHeight, // Use consistent viewport-based height for all breakpoints
              height: containerDims.minHeight, // Use consistent viewport-based height for all breakpoints
              transform: breakpoint === 'desktop' ? `scale(${scale})` : 'none',
              transformOrigin: 'top left'
            }}
          >
            {productType === 'seeds' ? (
              <SeedsLayout productConfig={productConfig} breakpoint={breakpoint} nutRefs={nutRefs} vectorRef={vectorRef} onOpenDetails={onOpenDetails} />
            ) : (
              <NutsLayout productConfig={productConfig} breakpoint={breakpoint} nutRefs={nutRefs} vectorRef={vectorRef} onOpenDetails={onOpenDetails} />
            )}
          </div>
        </div>
      )}
    </div>
  );
});

HeroBanner.displayName = "HeroBanner";

export default HeroBanner;

