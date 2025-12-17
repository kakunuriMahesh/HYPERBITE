import React, { forwardRef, useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { productConfigs, getAnimationPositions } from "../config/productConfig";
import DatesTimeline from "./DatesTimeline";
import NutsLayout from "./NutsLayout";
import SeedsLayout from "./SeedsLayout";
import { useGSAPContext } from "../hooks/useGSAPContext";

gsap.registerPlugin(ScrollTrigger);

const HeroBanner = forwardRef(
  ({ productType = "nuts", onOpenDetails }, ref) => {
    const [scale, setScale] = useState(1);
    const [breakpoint, setBreakpoint] = useState("desktop"); // 'mobile', 'tablet', 'desktop'
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

    const isDates = productType === "dates";

    useEffect(() => {
      const updateScale = () => {
        const viewportWidth = window.innerWidth;
        let newBreakpoint = "desktop";
        let baseWidth = 1698;

        if (viewportWidth < 768) {
          newBreakpoint = "mobile";
          baseWidth = 375; // Mobile base width
        } else if (viewportWidth < 1024) {
          newBreakpoint = "tablet";
          baseWidth = 768; // Tablet base width
        } else {
          newBreakpoint = "desktop";
          baseWidth = 1698;
        }

        setBreakpoint(newBreakpoint);

        if (newBreakpoint === "desktop") {
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
      window.addEventListener("resize", resizeHandler);
      return () => window.removeEventListener("resize", resizeHandler);
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
      const animationData = getAnimationPositions(
        productType,
        breakpoint,
        currentViewportHeight
      );
      const initialPositions = animationData.initial;
      const finalPositions = animationData.final;

      // Get product-specific rotation speeds and animation settings
      const rotationSpeeds = productConfig.animations.rotationSpeeds;
      const dateSpeedMultiplier =
        productConfig.animations.dateSpeedMultiplier || 1.5;

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

        // Add GPU acceleration hints (will-change moved to CSS)
        gsap.set(nutRef, {
          force3D: true,
          transformOrigin: "center center",
          backfaceVisibility: "hidden",
        });

        // Calculate scale instead of width/height for better performance
        // Set base width/height once (no animation), then animate only scale
        const initialScale = 1;
        const finalScale = final.width / initial.width; // Use width ratio for scale

        // Set initial position and base size using transforms for GPU acceleration
        // Base width/height set once (not animated) - only scale animates
        gsap.set(nutRef, {
          x: initial.x,
          y: initial.y,
          rotation: initial.rotation,
          width: initial.width, // Set base size once
          height: initial.height, // Set base size once
          scale: initialScale,
          left: "auto",
          top: "auto",
        });

        const rotationSpeed = rotationSpeeds[key];
        const isDate =
          key === "dateorange1" || key === "dateorange2" || key === "date";

        nutElements.push({
          element: nutRef,
          initial: {
            ...initial,
            scale: initialScale,
          },
          final: {
            ...final,
            scale: finalScale,
            // Final rotation includes continuous rotation (rotationSpeed degrees total)
            rotation: final.rotation + rotationSpeed,
          },
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
          backfaceVisibility: "hidden",
        });

        if (viewportWidth >= 1024) {
          // Desktop: Scale and position vector
          const targetCenterX = -150;
          const targetCenterY = 450;

          vectorInitial = { x: 0, y: 0, scale: 1 };
          vectorFinal = {
            scale: 0.35,
            x: targetCenterX,
            y: targetCenterY,
          };

          gsap.set(vectorRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            left: "auto",
            top: "auto",
          });
        } else if (viewportWidth < 768) {
          // Mobile: Vector animation - convert width/height to scale
          const vectorStartWidth = 402;
          const vectorStartHeight = 874;
          const vectorEndWidth = 88 * 0.351;
          const vectorEndHeight = 193 * 0.351;
          const vectorEndX = 150 - vectorEndWidth / 2;
          const vectorEndY = 869 - vectorEndHeight - 20;
          const vectorScale = vectorEndWidth / vectorStartWidth;

          vectorInitial = {
            x: 0,
            y: 0,
            scale: 1,
          };
          vectorFinal = {
            x: vectorEndX,
            y: vectorEndY,
            scale: vectorScale,
          };

          gsap.set(vectorRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            width: vectorStartWidth,
            height: vectorStartHeight,
            left: "auto",
            top: "auto",
          });
        } else {
          // Tablet - convert width/height to scale
          const containerWidth = 768;
          const containerHeight = 1900;
          const clusterCenterX = 360;
          const clusterTopY = 1275;
          const endScale = 0.35;

          vectorInitial = {
            x: 0,
            y: 0,
            scale: 1,
          };
          vectorFinal = {
            x: clusterCenterX - (containerWidth * endScale) / 2,
            y: clusterTopY - 60 - (containerHeight * endScale) / 2,
            scale: endScale,
          };

          gsap.set(vectorRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            width: containerWidth,
            height: containerHeight,
            left: "auto",
            top: "auto",
          });
        }
      }

      // Ensure we have nut elements before creating ScrollTrigger
      if (nutElements.length === 0) {
        console.warn("No nut elements found for animation");
        return;
      }

      // Create GSAP timeline with ScrollTrigger scrub (GOLD STANDARD - no onUpdate)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${Math.round(animationEndPoint)}`,
          scrub: 1.2, // Smooth inertia for touch scroll
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Only update z-index for vector (lightweight operation)
            if (vectorRef.current) {
              vectorRef.current.style.zIndex = self.progress > 0.3 ? "6" : "1";
            }
          },
        },
      });

      // Add all nut animations to timeline (all animate together at position 0)
      nutElements.forEach(({ element, initial, final }) => {
        tl.fromTo(
          element,
          {
            x: initial.x,
            y: initial.y,
            rotation: initial.rotation,
            scale: initial.scale,
          },
          {
            x: final.x,
            y: final.y,
            rotation: final.rotation, // Includes continuous rotation
            scale: final.scale,
            ease: "none", // Scroll controls easing, don't double-ease
          },
          0 // All animations start together
        );
      });

      // Add vector animation to timeline
      if (vectorRef.current && vectorInitial && vectorFinal) {
        tl.fromTo(
          vectorRef.current,
          vectorInitial,
          {
            ...vectorFinal,
            ease: "none",
          },
          0
        );
      }

      // Refresh ScrollTrigger after setup
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, [
      scale,
      breakpoint,
      productType,
      isDates,
      containerRef,
      vectorRef,
      nutRefs,
      productConfig,
    ]);

    // Calculate container dimensions based on breakpoint
    // All breakpoints now use 3 viewport heights (300vh) to match section2Start positions
    const getContainerDimensions = () => {
      const viewportHeight =
        typeof window !== "undefined"
          ? window.innerHeight
          : breakpoint === "mobile"
          ? 750
          : breakpoint === "tablet"
          ? 1024
          : 1080;

      if (breakpoint === "mobile") {
        return {
          width: "100%",
          height: "auto",
          minHeight: `${viewportHeight * 3}px`, // 300vh - 3 sections
          baseWidth: 375,
          baseHeight: viewportHeight * 3,
        };
      } else if (breakpoint === "tablet") {
        return {
          width: "100%",
          height: "auto",
          minHeight: `${viewportHeight * 3}px`, // 300vh - 3 sections
          baseWidth: 768,
          baseHeight: viewportHeight * 3,
        };
      } else {
        // Desktop: Use 300vh (3 sections) - consistent with mobile/tablet
        return {
          width: `${1698 * scale}px`,
          height: "auto",
          minHeight: `${viewportHeight * 3}px`, // 350vh - extra height for lower final positions
          baseWidth: 1698,
          baseHeight: viewportHeight * 3,
        };
      }
    };

    const containerDims = getContainerDimensions();

    return (
      <div
        ref={ref}
        className="bg-white w-full relative"
        style={{ overflowX: "hidden", overflowY: "auto", paddingTop: "70px" }}
      >
        {/* {isDates ? (
          <DatesTimeline
            productConfig={productConfig}
            onOpenDetails={onOpenDetails}
            breakpoint={breakpoint}
          />
        ) : (
          <div
            className="relative bg-white"
            style={{
              width: containerDims.width,
              minHeight: containerDims.minHeight,
              height: containerDims.height,
              margin: "0 auto",
              maxWidth: breakpoint === "desktop" ? "none" : "100%",
              paddingBottom:
                breakpoint === "mobile"
                  ? "120px"
                  : breakpoint === "tablet"
                  ? "150px"
                  : `${150 * scale}px`,
            }}
          >
            <div
              ref={containerRef}
              className="relative bg-white"
              style={{
                width: breakpoint === "desktop" ? "1698px" : "100%",
                minHeight: containerDims.minHeight, // Use consistent viewport-based height for all breakpoints
                height: containerDims.minHeight, // Use consistent viewport-based height for all breakpoints
                transform:
                  breakpoint === "desktop" ? `scale(${scale})` : "none",
                transformOrigin: "top left",
              }}
            >
              {productType === "seeds" ? (
                <SeedsLayout
                  productConfig={productConfig}
                  breakpoint={breakpoint}
                  nutRefs={nutRefs}
                  vectorRef={vectorRef}
                  onOpenDetails={onOpenDetails}
                />
              ) : (
                <NutsLayout
                  productConfig={productConfig}
                  breakpoint={breakpoint}
                  nutRefs={nutRefs}
                  vectorRef={vectorRef}
                  onOpenDetails={onOpenDetails}
                />
              )}
            </div>
          </div>
        )} */}
        {isDates ? (
          <DatesTimeline
            productConfig={productConfig}
            onOpenDetails={onOpenDetails}
            breakpoint={breakpoint}
          />
        ) : productType === "seeds" ? (
          <div
            className="relative bg-white"
            style={{
              width: containerDims.width,
              minHeight: containerDims.minHeight,
              height: containerDims.height,
              margin: "0 auto",
              maxWidth: breakpoint === "desktop" ? "none" : "100%",
              paddingBottom:
                breakpoint === "mobile"
                  ? "120px"
                  : breakpoint === "tablet"
                  ? "150px"
                  : `${150 * scale}px`,
            }}
          >
            <div
              ref={containerRef}
              className="relative bg-white"
              style={{
                width: breakpoint === "desktop" ? "1698px" : "100%",
                minHeight: containerDims.minHeight,
                height: containerDims.minHeight,
                transform:
                  breakpoint === "desktop" ? `scale(${scale})` : "none",
                transformOrigin: "top left",
              }}
            >
            <SeedsLayout
              productConfig={productConfig}
              breakpoint={breakpoint}
              nutRefs={nutRefs}
              vectorRef={vectorRef}
              onOpenDetails={onOpenDetails}
            />
            </div>
          </div>
        ) : (
          <div
            className="relative bg-white"
            style={{
              width: containerDims.width,
              minHeight: containerDims.minHeight,
              height: containerDims.height,
              margin: "0 auto",
              maxWidth: breakpoint === "desktop" ? "none" : "100%",
              paddingBottom:
                breakpoint === "mobile"
                  ? "120px"
                  : breakpoint === "tablet"
                  ? "150px"
                  : `${150 * scale}px`,
            }}
          >
            <div
              ref={containerRef}
              className="relative bg-white"
              style={{
                width: breakpoint === "desktop" ? "1698px" : "100%",
                minHeight: containerDims.minHeight,
                height: containerDims.minHeight,
                transform:
                  breakpoint === "desktop" ? `scale(${scale})` : "none",
                transformOrigin: "top left",
              }}
            >
              <NutsLayout
                productConfig={productConfig}
                breakpoint={breakpoint}
                nutRefs={nutRefs}
                vectorRef={vectorRef}
                onOpenDetails={onOpenDetails}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

HeroBanner.displayName = "HeroBanner";

export default HeroBanner;
