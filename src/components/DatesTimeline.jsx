import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPContext } from "../hooks/useGSAPContext";

gsap.registerPlugin(ScrollTrigger);

// Adjust these to control when each date image appears along the path (0-1 progress)
const STOP_PROGRESS = [0.18, 0.4, 0.66, 0.88];
// Offset to lower the path/dot start position relative to the top of the section
const PATH_TOP_OFFSET = 300; // px
const DOT_W = 34;
const DOT_H = 50;
// Fine-tune dot alignment to the stroke if minor offset appears
const DOT_NUDGE_X = 0;
const DOT_NUDGE_Y = 0;

const DatesTimeline = ({ productConfig, onOpenDetails, breakpoint: propBreakpoint }) => {
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const stopRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [breakpoint, setBreakpoint] = useState(propBreakpoint || 'desktop');

  useEffect(() => {
    if (propBreakpoint) {
      setBreakpoint(propBreakpoint);
      return;
    }
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
  }, [propBreakpoint]);

  // Use GSAP context for proper cleanup
  useGSAPContext(() => {
    if (!wrapperRef.current || !pathRef.current || !dotRef.current || !svgRef.current) return;

    const path = pathRef.current;
    const svg = svgRef.current;
    const dot = dotRef.current;
    const wrapper = wrapperRef.current;

    // Add GPU acceleration hints
    gsap.set(dot, {
      force3D: true,
      transformOrigin: "center center",
      willChange: "transform",
      backfaceVisibility: "hidden",
      x: 0,
      y: 0,
      left: "auto",
      top: "auto",
    });

    // Cache path length for performance
    const totalLength = path.getTotalLength();

    // Create ScrollTrigger with optimized onUpdate
    ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "+=1400", // roughly matches the SVG height; tweak if needed
      scrub: 0.5, // Smoother, more responsive scrub
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Get point along path
        const point = path.getPointAtLength(progress * totalLength);

        // Convert to screen coords then to wrapper-local coords
        const svgPoint = svg.createSVGPoint();
        svgPoint.x = point.x;
        svgPoint.y = point.y;
        const ctm = path.getScreenCTM();
        
        if (ctm) {
          const screenPoint = svgPoint.matrixTransform(ctm);
          const wrapperRect = wrapper.getBoundingClientRect();
          const localX = screenPoint.x - wrapperRect.left;
          const localY = screenPoint.y - wrapperRect.top;

          // Use gsap.set for immediate updates (no animation tween)
          gsap.set(dot, {
            x: localX - DOT_W / 2 + DOT_NUDGE_X,
            y: localY - DOT_H / 2 + DOT_NUDGE_Y,
          });
        }

        // Reveal each date when the dot crosses its threshold
        stopRefs.forEach((ref, idx) => {
          if (ref.current) {
            const targetAlpha = progress >= STOP_PROGRESS[idx] ? 1 : 0;
            gsap.set(ref.current, {
              autoAlpha: targetAlpha,
            });
          }
        });
      },
      onEnter: () => {
        // Set initial state
        gsap.set(dot, { autoAlpha: 1 });
      },
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        height: "1600px",
        overflow: "visible", // keep dot visible even if it goes slightly outside
      }}
    >
      <svg
        ref={svgRef}
        width="934"
        height="1281"
        viewBox="0 0 934 1281"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: `${PATH_TOP_OFFSET}px`,
          left: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M2.5 0C2.5 310.216 373 578.5 485.5 554C598 529.5 553.5 331 464 392C374.5 453 492.5 588.5 272.5 671C52.4996 753.5 52.5003 973 272.5 1019.5C492.5 1066 844.499 784.133 907.5 845C970.501 905.867 892.001 975.5 828.501 1062C765.001 1148.5 800.501 1279.5 800.501 1279.5"
          stroke="black"
          strokeWidth="5"
          fill="none"
        />
      </svg>

      {/* Dot following the path */}
      <img
        ref={dotRef}
        src={productConfig.images.dot}
        alt="dot"
        loading="eager"
        decoding="async"
        style={{
          position: "absolute",
          width: "34px",
          height: "50px",
          left: 0,
          top: 0,
          zIndex: 3,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Date stops */}
      <div
        ref={stopRefs[0]}
        style={{
          position: "absolute",
          left: "55%",
          top: "26%",
          opacity: 0,
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <img src={productConfig.images.date1} alt="date 1" loading="lazy" decoding="async" style={{ width: "64px", height: "96px" }} />
        <div>When dot comes here this date should display</div>
      </div>

      <div
        ref={stopRefs[1]}
        style={{
          position: "absolute",
          left: "15%",
          top: "55%",
          opacity: 0,
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <img src={productConfig.images.date2} alt="date 2" loading="lazy" decoding="async" style={{ width: "64px", height: "96px" }} />
        <div>When dot comes here this date should display</div>
      </div>

      <div
        ref={stopRefs[2]}
        style={{
          position: "absolute",
          left: "80%",
          top: "63%",
          opacity: 0,
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <img src={productConfig.images.date3} alt="date 3" loading="lazy" decoding="async" style={{ width: "64px", height: "96px" }} />
        <div>When dot comes here this date should display</div>
      </div>

      <div
        ref={stopRefs[3]}
        style={{
          position: "absolute",
          left: "72%",
          top: "88%",
          opacity: 0,
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <img src={productConfig.images.date4} alt="date 4" loading="lazy" decoding="async" style={{ width: "64px", height: "96px" }} />
        <div>When dot comes here this date should display</div>
      </div>

      {/* Headings and paragraphs to mirror the provided mock */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: "45%",
          transform: "translateX(-10%)",
          color: "#000",
          zIndex: 4,
        }}
      >
        <div style={{ fontFamily: "'Permanent_Marker-Regular', Helvetica", fontSize: "54px", lineHeight: "1.05" }}>
          {productConfig.heading1}
        </div>
        <p
          style={{
            marginTop: "12px",
            maxWidth: "420px",
            fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
            fontSize: "22px",
            lineHeight: "1.1",
          }}
        >
          {productConfig.paragraph1}
        </p>
      </div>

      {/* Quote between first and second section */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#000",
          zIndex: 4,
          textAlign: "center",
          maxWidth: "600px",
          padding: "150px 20px",
        }}
      >
        <div
          style={{
            fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
            fontSize: "28px",
            lineHeight: "1.3",
            fontStyle: "italic",
          }}
        >
          "{productConfig.quote || 'Nature\'s sweetest gift, packed with energy and tradition'}"
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "6%",
          left: "8%",
          color: "#000",
          zIndex: 4,
        }}
      >
        <div style={{ fontFamily: "'Permanent_Marker-Regular', Helvetica", fontSize: "54px", lineHeight: "1.05" }}>
          {productConfig.heading2}
        </div>
        <p
          style={{
            marginTop: "12px",
            maxWidth: "520px",
            fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
            fontSize: "22px",
            lineHeight: "1.1",
          }}
        >
          {productConfig.paragraph2}
        </p>
        {onOpenDetails && (
          <button
            onClick={onOpenDetails}
            style={{
              marginTop: "20px",
              padding: breakpoint === 'mobile' ? '10px 20px' : breakpoint === 'tablet' ? '12px 24px' : '14px 28px',
              fontFamily: "'Permanent_Marker-Regular', Helvetica",
              fontSize: breakpoint === 'mobile' ? '18px' : breakpoint === 'tablet' ? '20px' : '22px',
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#333";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#000";
              e.target.style.transform = "scale(1)";
            }}
          >
            Check Details
          </button>
        )}
      </div>
    </div>
  );
};

export default DatesTimeline;

