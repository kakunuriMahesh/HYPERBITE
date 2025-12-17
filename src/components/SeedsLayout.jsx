// import React from "react";

// // Separate file for seeds so it can be customized independently
// const SeedsLayout = ({ productConfig, breakpoint, nutRefs, vectorRef, onOpenDetails }) => (
//   <>
//     {/* First Section Heading */}
//     <div
//       className="absolute [font-family:'Permanent_Marker-Regular',Helvetica] font-normal text-black tracking-[0] leading-[normal]"
//       style={{
//         zIndex: 10,
//         top: breakpoint === 'mobile' ? '16%' : breakpoint === 'tablet' ? '16%' : '16%',
//         left: breakpoint === 'mobile' ? '20px' : breakpoint === 'tablet' ? '50px' : '8%',
//         width: breakpoint === 'mobile' ? 'calc(100% - 40px)' : breakpoint === 'tablet' ? 'calc(100% - 100px)' : '649px',
//         fontSize: breakpoint === 'mobile' ? '24px' : breakpoint === 'tablet' ? '36px' : '54px',
//         lineHeight: '1.05',
//       }}
//     >
//       {productConfig.heading1}
//     </div>

//     {/* First Section Paragraph */}
//     <p
//       className="absolute [font-family:'Just_Me_Again_Down_Here-Regular',Helvetica] font-normal text-black tracking-[0] leading-[normal]"
//       style={{
//         zIndex: 10,
//         top: breakpoint === 'mobile' ? 'calc(16% + 80px)' : breakpoint === 'tablet' ? 'calc(16% + 80px)' : 'calc(16% + 80px)',
//         left: breakpoint === 'mobile' ? '20px' : breakpoint === 'tablet' ? '50px' : '8%',
//         width: breakpoint === 'mobile' ? 'calc(100% - 40px)' : breakpoint === 'tablet' ? 'calc(100% - 100px)' : '420px',
//         fontSize: breakpoint === 'mobile' ? '14px' : breakpoint === 'tablet' ? '18px' : '22px',
//         lineHeight: '1.1',
//         marginTop: '12px',
//       }}
//     >
//       {productConfig.paragraph1}
//     </p>

//     {/* Quote between first and second section */}
//     <div
//       className="absolute text-black text-center"
//       style={{
//         zIndex: 10,
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: breakpoint === 'mobile' ? 'calc(100% - 40px)' : breakpoint === 'tablet' ? 'calc(100% - 100px)' : '600px',
//         fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
//         fontSize: breakpoint === 'mobile' ? '18px' : breakpoint === 'tablet' ? '22px' : '28px',
//         lineHeight: '1.3',
//         fontStyle: 'italic',
//         padding: breakpoint === 'mobile' ? '40px 20px' : breakpoint === 'tablet' ? '50px 20px' : '150px 20px',
//       }}
//     >
//       "{productConfig.quote || 'Small seeds, mighty nutrition for your wellness journey'}"
//     </div>

//     {/* Product Images - Positions set by GSAP based on breakpoint */}
//     {/* Hero images - use eager loading since they're above the fold */}
//     <img ref={nutRefs.pumpkinseed1} className="absolute aspect-[0.67] object-cover scroll-animated" alt="Product" src={productConfig.images.pumpkinseed1} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, backfaceVisibility: 'hidden' }} />
//     <img ref={nutRefs.wallnut1} className="absolute aspect-[0.67] object-cover scroll-animated" alt="Product" src={productConfig.images.wallnut1} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, backfaceVisibility: 'hidden' }} />
//     <img ref={nutRefs.sunflowerseed1} className="absolute aspect-[0.67] object-cover scroll-animated" alt="Product" src={productConfig.images.sunflowerseed1} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, backfaceVisibility: 'hidden' }} />
//     <img ref={nutRefs.dateorange1} className="absolute aspect-[0.67] object-cover scroll-animated" alt="Product" src={productConfig.images.dateorange1} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, backfaceVisibility: 'hidden' }} />
//     <img ref={nutRefs.dateorange2} className="absolute aspect-[0.67] object-cover scroll-animated" alt="Product" src={productConfig.images.dateorange2} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, backfaceVisibility: 'hidden' }} />
//     <img ref={nutRefs.sunflowershell} className="absolute aspect-[0.67] object-cover scroll-animated" alt="Product" src={productConfig.images.sunflowershell} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, backfaceVisibility: 'hidden' }} />
//     <img ref={nutRefs.sunflowerseed2} className="absolute aspect-[0.67] object-cover scroll-animated" alt="Product" src={productConfig.images.sunflowerseed2} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, backfaceVisibility: 'hidden' }} />
//     <img ref={nutRefs.pumpkinseed2} className="absolute aspect-[0.67] object-cover scroll-animated" alt="Product" src={productConfig.images.pumpkinseed2} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, backfaceVisibility: 'hidden' }} />

//     {/* Second Section Heading - Below grouped nuts and dates - moved down */}
//     <div
//       className="absolute [font-family:'Permanent_Marker-Regular',Helvetica] font-normal text-black tracking-[0] leading-[normal]"
//       style={{
//         zIndex: 10,
//         bottom: breakpoint === 'mobile' ? '2%' : breakpoint === 'tablet' ? '2%' : '2%', // Moved down from 6%
//         right: breakpoint === 'mobile' ? '16px' : breakpoint === 'tablet' ? '50px' : '8%',
//         width: breakpoint === 'mobile' ? '352px' : breakpoint === 'tablet' ? 'calc(100% - 100px)' : '520px',
//         fontSize: breakpoint === 'mobile' ? '24px' : breakpoint === 'tablet' ? '36px' : '54px',
//         lineHeight: '1.05',
//         textAlign: breakpoint === 'mobile' || breakpoint === 'tablet' ? 'left' : 'right',
//       }}
//     >
//       {productConfig.heading2}
//     </div>

//     {/* Second Section Paragraph - moved down */}
//     <p
//       className="absolute [font-family:'Just_Me_Again_Down_Here-Regular',Helvetica] font-normal text-black tracking-[0] leading-[normal]"
//       style={{
//         zIndex: 10,
//         bottom: breakpoint === 'mobile' ? 'calc(2% - 100px)' : breakpoint === 'tablet' ? 'calc(2% - 100px)' : 'calc(2% - 100px)', // Moved down from 6%
//         right: breakpoint === 'mobile' ? '16px' : breakpoint === 'tablet' ? '50px' : '8%',
//         width: breakpoint === 'mobile' ? '352px' : breakpoint === 'tablet' ? 'calc(100% - 100px)' : '520px',
//         fontSize: breakpoint === 'mobile' ? '14px' : breakpoint === 'tablet' ? '18px' : '22px',
//         lineHeight: '1.1',
//         marginTop: '12px',
//         textAlign: breakpoint === 'mobile' || breakpoint === 'tablet' ? 'left' : 'right',
//       }}
//     >
//       {productConfig.paragraph2}
//     </p>

//     {/* Check Details Button */}
//     {onOpenDetails && (
//       <button
//         onClick={onOpenDetails}
//         style={{
//           position: 'absolute',
//           zIndex: 10,
//           bottom: breakpoint === 'mobile' ? 'calc(6% - 180px)' : breakpoint === 'tablet' ? 'calc(6% - 180px)' : 'calc(6% - 180px)',
//           right: breakpoint === 'mobile' ? '16px' : breakpoint === 'tablet' ? '50px' : '8%',
//           padding: breakpoint === 'mobile' ? '10px 20px' : breakpoint === 'tablet' ? '12px 24px' : '14px 28px',
//           fontFamily: "'Permanent_Marker-Regular', Helvetica",
//           fontSize: breakpoint === 'mobile' ? '18px' : breakpoint === 'tablet' ? '20px' : '22px',
//           backgroundColor: '#000',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '8px',
//           cursor: 'pointer',
//           transition: 'all 0.3s ease',
//         }}
//         onMouseEnter={(e) => {
//           e.target.style.backgroundColor = '#333';
//           e.target.style.transform = 'scale(1.05)';
//         }}
//         onMouseLeave={(e) => {
//           e.target.style.backgroundColor = '#000';
//           e.target.style.transform = 'scale(1)';
//         }}
//       >
//         Check Details
//       </button>
//     )}

//     {/* Date Image */}
//     <img ref={nutRefs.date} className="absolute aspect-[0.67] object-cover scroll-animated" alt="Product" src={productConfig.images.date} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, backfaceVisibility: 'hidden' }} />

//     {/* Vector Background */}
//     <img
//       ref={vectorRef}
//       className="absolute scroll-animated"
//       alt="Vector"
//       src={productConfig.vector}
//       loading="eager"
//       decoding="async"
//       style={{
//         top: '0',
//         left: '0',
//         width: breakpoint === 'mobile' ? '100%' : breakpoint === 'tablet' ? '100%' : '1698px',
//         height: breakpoint === 'mobile' ? '100%' : breakpoint === 'tablet' ? '100%' : '1946px',
//         objectFit: 'cover',
//         zIndex: 1,
//         opacity: breakpoint === 'mobile' || breakpoint === 'tablet' ? 0.6 : 1,
//         backfaceVisibility: 'hidden',
//       }}
//     />

//     {/* Center */}
//     <img ref={nutRefs.wallnutCenter} className="absolute aspect-[0.67] object-cover scroll-animated" alt="Product" src={productConfig.images.wallnutCenter} loading="eager" decoding="async" style={{ transformOrigin: 'center', zIndex: 5, backfaceVisibility: 'hidden' }} />
//   </>
// );

// export default SeedsLayout;

// ⭐ fix the scrolling of vector

// import React, { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import sunflowerseed from "../../public/assets/sunflowerseed.webp";
// import vector7 from "../../public/assets/vector-7.svg"; // RIGHT
// import vector8 from "../../public/assets/vector-8.svg"; // LEFT

// gsap.registerPlugin(ScrollTrigger);

// const SeedsLayout = ({
//   productConfig,
//   breakpoint,
//   nutRefs,
//   vectorRef,
//   onOpenDetails,
// }) => {
//   const leftRef = useRef(null);
//   const rightRef = useRef(null);
//   const bitsRef = useRef([]);
//   const openedRef = useRef(false);

//   useEffect(() => {
//     // 🔒 Disable scroll initially
//     document.body.style.overflow = "hidden";

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: document.body,
//         start: "top top",
//         end: "+=600",
//         scrub: 1,
//         onUpdate: (self) => {
//           if (self.progress === 1 && !openedRef.current) {
//             openedRef.current = true;
//             document.body.style.overflow = "auto"; // 🔓 enable scroll
//           }
//         },
//       },
//     });

//     // OPEN LEFT & RIGHT (MORE DISTANCE)
//     tl.to(
//       leftRef.current,
//       {
//         x: -680,
//         ease: "power3.out",
//       },
//       0
//     );

//     tl.to(
//       rightRef.current,
//       {
//         x: 680,
//         ease: "power3.out",
//       },
//       0
//     );

//     // DROPS FLY OUTWARD
//     bitsRef.current.forEach((bit) => {
//       tl.to(
//         bit,
//         {
//           x: gsap.utils.random(-400, 400),
//           y: gsap.utils.random(-300, 300),
//           scale: gsap.utils.random(0.5, 1.2),
//           ease: "power2.out",
//         },
//         0
//       );
//     });

//     return () => {
//       ScrollTrigger.killAll();
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <>
//       {/* FIXED HERO FRAME */}
//       <div className="fixed inset-0 z-30 bg-white pointer-events-none">
//         {/* This section should fixed and animation should be in screen always and the content should go behind this section */}
//         <div className="relative w-full h-full flex top-[10%] justify-center">
//           {/* LEFT SVG */}
//           <img
//             ref={leftRef}
//             src={vector8}
//             alt="left cream"
//             className="absolute w-[15%] left-[48.2%] -translate-x-[220px] z-20"
//           />

//           {/* SEED (ALWAYS PRESENT, BEHIND) */}
//           <img
//             src={sunflowerseed}
//             alt="seed"
//             className="absolute top-[4%] w-[15%] z-10"
//           />

//           {/* RIGHT SVG */}
//           <img
//             ref={rightRef}
//             src={vector7}
//             alt="right cream"
//             className="absolute w-[16.6%] right-[48.2%] translate-x-[220px] z-20"
//           />

//           {/* CHOCOLATE DROPS */}
//           {Array.from({ length: 18 }).map((_, i) => (
//             <div
//               key={i}
//               ref={(el) => (bitsRef.current[i] = el)}
//               className="absolute rounded-full bg-[#763714] top-[10%] shadow-[10px_4px_13px_#00000066]"
//               style={{
//                 width: i % 3 === 0 ? 40 : i % 2 === 0 ? 22 : 12,
//                 height: i % 3 === 0 ? 40 : i % 2 === 0 ? 22 : 12,
//                 // top: `${gsap.utils.random(40, 60)}%`,
//                 left: `${gsap.utils.random(40, 60)}%`,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* SCROLLING CONTENT (AFTER OPEN) */}
//       <div className="relative z-0 bg-black">
//         <section className="min-h-screen flex items-end justify-center pb-24">
//           <p className="text-[64px] font-['Lemon-Regular'] text-black text-center">
//             “chocolate cream falling on head”
//           </p>
//         </section>
//       </div>

//       {/* Content */}
//       <div
//         style={{
//           position: "absolute",
//           top: "0",
//           left: breakpoint === "mobile" ? "0px" : "45%",
//           // padding: breakpoint === "mobile" ? "20px" : "0px",
//           width: breakpoint === "mobile" ? "100%" : "420px",
//           transform:
//             breakpoint === "mobile" ? "translateX(0%)" : "translateX(-10%)",
//           color: "#000",
//           zIndex: 4,
//         }}
//       >
//         <div
//           style={{
//             fontFamily: "'Permanent_Marker-Regular', Helvetica",
//             fontSize: breakpoint === "mobile" ? "24px" : "54px",
//             lineHeight: "1.05",
//           }}
//         >
//           {productConfig.heading1}
//         </div>
//         <p
//           style={{
//             marginTop: "12px",
//             maxWidth: breakpoint === "mobile" ? "100%" : "420px",
//             fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
//             fontSize: breakpoint === "mobile" ? "14px" : "22px",
//             lineHeight: "1.1",
//           }}
//         >
//           {productConfig.paragraph1}
//         </p>
//       </div>

//       {/* Quote between first and second section */}
//       <div
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           color: "#000",
//           zIndex: 4,
//           textAlign: "center",
//           maxWidth: breakpoint === "mobile" ? "100%" : "600px",
//           padding: "150px 20px",
//         }}
//       >
//         <div
//           style={{
//             fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
//             fontSize: breakpoint === "mobile" ? "18px" : "28px",
//             lineHeight: "1.3",
//             fontStyle: "italic",
//           }}
//         >
//           "
//           {productConfig.quote ||
//             "Nature's sweetest gift, packed with energy and tradition"}
//           "
//         </div>
//       </div>

//       <div
//         style={{
//           position: "absolute",
//           bottom: "6%",
//           left: "8%",
//           color: "#000",
//           zIndex: 4,
//         }}
//       >
//         <div
//           style={{
//             fontFamily: "'Permanent_Marker-Regular', Helvetica",
//             fontSize: breakpoint === "mobile" ? "24px" : "54px",
//             lineHeight: "1.05",
//           }}
//         >
//           {productConfig.heading2}
//         </div>
//         <p
//           style={{
//             marginTop: "12px",
//             maxWidth: breakpoint === "mobile" ? "100%" : "520px",
//             fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
//             fontSize: breakpoint === "mobile" ? "14px" : "22px",
//             lineHeight: "1.1",
//           }}
//         >
//           {productConfig.paragraph2}
//         </p>
//         {onOpenDetails && (
//           <button
//             onClick={onOpenDetails}
//             style={{
//               marginTop: "20px",
//               padding:
//                 breakpoint === "mobile"
//                   ? "5px 10px"
//                   : breakpoint === "tablet"
//                   ? "12px 24px"
//                   : "14px 28px",
//               fontFamily: "'Permanent_Marker-Regular', Helvetica",
//               fontSize:
//                 breakpoint === "mobile"
//                   ? "12px"
//                   : breakpoint === "tablet"
//                   ? "20px"
//                   : "22px",
//               backgroundColor: "#000",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               transition: "all 0.3s ease",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = "#333";
//               e.target.style.transform = "scale(1.05)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = "#000";
//               e.target.style.transform = "scale(1)";
//             }}
//           >
//             Check Details
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default SeedsLayout;

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sunflowerseed from "../../public/assets/sunflowerseed.webp";
import vector7 from "../../public/assets/vector-7.svg"; // RIGHT
import vector8 from "../../public/assets/vector-8.svg"; // LEFT

gsap.registerPlugin(ScrollTrigger);

const SeedsLayout = ({ productConfig, breakpoint, onOpenDetails }) => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bitsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // LEFT VECTOR OPEN
      tl.to(
        leftRef.current,
        { x: breakpoint === "mobile" ? -340 : -680, ease: "power3.out" },
        0
      );

      // RIGHT VECTOR OPEN
      tl.to(
        rightRef.current,
        { x: breakpoint === "mobile" ? 340 : 680, ease: "power3.out" },
        0
      );

      // DOTS MOVE
      bitsRef.current.forEach((bit) => {
        tl.to(
          bit,
          {
            x: breakpoint === "mobile" ? gsap.utils.random(-200, 200) : gsap.utils.random(-400, 400),
            y: breakpoint === "mobile" ? gsap.utils.random(-150, 150) : gsap.utils.random(-300, 300),
            scale: gsap.utils.random(0.6, 1.2),
            ease: "power2.out",
          },
          0
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[200vh] bg-white">
      {/* ================= STICKY HERO (ALWAYS VISIBLE) ================= */}
      <div
        style={{
          position: "sticky",
          top: breakpoint === "mobile" ? "9%" : "10%",
          height: "100vh",
          zIndex: 30,
          pointerEvents: "none",
        }}
        //  className="sticky h-screen z-30 pointer-events-none"
      >
        <div className="relative w-full h-full flex top-[20%] justify-center">
          {/* LEFT SVG */}
          <img
            ref={leftRef}
            src={vector8}
            alt="left cream"
            style={{
              left: breakpoint === "mobile" ? "94%" : "48.2%",
            }}
            className="absolute w-[15%]  -translate-x-[220px] z-20"
          />

          {/* SEED */}
          <img
            src={sunflowerseed}
            alt="seed"
            className="absolute top-[4%] w-[15%] z-10"
          />

          {/* RIGHT SVG */}
          <img
            ref={rightRef}
            src={vector7}
            alt="right cream"
            style={{
              right: breakpoint === "mobile" ? "94%" : "48.2%",
            }}
            className="absolute w-[16.6%]  translate-x-[220px] z-20"
          />

          {/* DOTS */}
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              ref={(el) => (bitsRef.current[i] = el)}
              className="absolute rounded-full bg-[#763714] shadow-[10px_4px_13px_#00000066]"
              style={{
                top: breakpoint === "mobile" ? "10%" : "20%",
                width:
                  breakpoint === "mobile"
                    ? 15
                    : i % 3 === 0
                    ? 40
                    : i % 2 === 0
                    ? 22
                    : 12,
                height:
                  breakpoint === "mobile"
                    ? 15
                    : i % 3 === 0
                    ? 40
                    : i % 2 === 0
                    ? 22
                    : 12,
                left:
                  breakpoint === "mobile"
                    ? `${gsap.utils.random(40, 60)}%`
                    : `${gsap.utils.random(40, 60)}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ================= SCROLLING CONTENT ================= */}
      <div className="relative top-0 z-10">
        {/* Content */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: breakpoint === "mobile" ? "0px" : "45%",
            // padding: breakpoint === "mobile" ? "20px" : "0px",
            width: breakpoint === "mobile" ? "100%" : "420px",
            transform:
              breakpoint === "mobile" ? "translateX(0%)" : "translateX(-10%)",
            color: "#000",
            zIndex: 4,
          }}
        >
          <div
            style={{
              fontFamily: "'Permanent_Marker-Regular', Helvetica",
              fontSize: breakpoint === "mobile" ? "24px" : "54px",
              lineHeight: "1.05",
            }}
          >
            {productConfig.heading1}
          </div>
          <p
            style={{
              marginTop: "12px",
              maxWidth: breakpoint === "mobile" ? "100%" : "420px",
              fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
              fontSize: breakpoint === "mobile" ? "14px" : "22px",
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
            maxWidth: breakpoint === "mobile" ? "100%" : "600px",
            padding: "150px 20px",
          }}
        >
          <div
            style={{
              fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
              fontSize: breakpoint === "mobile" ? "18px" : "28px",
              lineHeight: "1.3",
              fontStyle: "italic",
            }}
          >
            "
            {productConfig.quote ||
              "Nature's sweetest gift, packed with energy and tradition"}
            "
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
          <div
            style={{
              fontFamily: "'Permanent_Marker-Regular', Helvetica",
              fontSize: breakpoint === "mobile" ? "24px" : "54px",
              lineHeight: "1.05",
            }}
          >
            {productConfig.heading2}
          </div>
          <p
            style={{
              marginTop: "12px",
              maxWidth: breakpoint === "mobile" ? "100%" : "520px",
              fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
              fontSize: breakpoint === "mobile" ? "14px" : "22px",
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
                padding:
                  breakpoint === "mobile"
                    ? "5px 10px"
                    : breakpoint === "tablet"
                    ? "12px 24px"
                    : "14px 28px",
                fontFamily: "'Permanent_Marker-Regular', Helvetica",
                fontSize:
                  breakpoint === "mobile"
                    ? "12px"
                    : breakpoint === "tablet"
                    ? "20px"
                    : "22px",
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
    </section>
  );
};

export default SeedsLayout;
