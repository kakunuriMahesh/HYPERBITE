// import React, { useRef, useEffect } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const SeedsLayout = ({ productConfig, breakpoint, onOpenDetails }) => {
//   const sectionRef = useRef(null);
//   const pinRef = useRef(null);

//   const leftRef = useRef(null);
//   const rightRef = useRef(null);
//   const bitsRef = useRef([]);
//   const vectorContainerRef = useRef(null);

//   const seedA = useRef(null);
//   const seedB = useRef(null);
//   const seedC = useRef(null);

//   useEffect(() => {
//     // Function to lock inset and positioning
//     const lockInset = () => {
//       if (pinRef.current) {
//         // Use requestAnimationFrame to ensure this runs after ScrollTrigger's updates
//         requestAnimationFrame(() => {
//           if (pinRef.current) {
//             pinRef.current.style.inset = "0px";
//             pinRef.current.style.top = "0px";
//             pinRef.current.style.left = "0px";
//             pinRef.current.style.right = "0px";
//             pinRef.current.style.bottom = "0px";
//           }
//         });
//       }
//     };

//     const ctx = gsap.context(() => {
//       // Force pinRef to be fixed from the very beginning with full viewport coverage
//       gsap.set(pinRef.current, {
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         width: "100%",
//         height: "100%",
//         margin: 0,
//         padding: 0,
//         inset: "0px",
//       });

//       /* PIN - Seamless with no layout shift */
//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom bottom",
//         pin: pinRef.current,
//         pinType: "fixed",
//         pinSpacing: false,
//         pinReparent: false,
//         anticipatePin: 1,
//         invalidateOnRefresh: true,
//         onEnter: lockInset,
//         onEnterBack: lockInset,
//         onLeave: lockInset,
//         onLeaveBack: lockInset,
//         onUpdate: lockInset,
//         onRefresh: lockInset,
//       });

//       /* MASTER TIMELINE */
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=300%",
//           scrub: 0.5,
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//         },
//       });

//       // Initial state: vectors closed (together) at start
//       gsap.set(vectorContainerRef.current, { gap: 0 });

//       /* VECTOR OPEN - Same behavior as desktop: separate on scroll down */
//       tl.to(
//         vectorContainerRef.current,
//         {
//           gap: breakpoint === "mobile" ? "200px" : "600px",
//           ease: "power3.out",
//         },
//         0
//       );

//       /* DOTS */
//       bitsRef.current.forEach((bit) => {
//         tl.to(
//           bit,
//           {
//             x: gsap.utils.random(-400, 400),
//             y: gsap.utils.random(-300, 300),
//             scale: gsap.utils.random(0.6, 1.2),
//             ease: "power2.out",
//           },
//           0
//         );
//       });

//       /* SEED VISIBILITY */
//       gsap.set([seedB.current, seedC.current], { opacity: 0 });

//       tl.to(seedA.current, { opacity: 0 }, 0.33);
//       tl.to(seedB.current, { opacity: 1 }, 0.33);

//       tl.to(seedB.current, { opacity: 0 }, 0.66);
//       tl.to(seedC.current, { opacity: 1 }, 0.66);

//       tl.to(seedC.current, { opacity: 0 }, 0.95);
//     }, sectionRef);

//     // Use MutationObserver as a fallback to catch any style changes
//     let observerRef = null;
//     if (pinRef.current) {
//       observerRef = new MutationObserver((mutations) => {
//         mutations.forEach((mutation) => {
//           if (mutation.type === "attributes" && mutation.attributeName === "style") {
//             lockInset();
//           }
//         });
//       });

//       observerRef.observe(pinRef.current, {
//         attributes: true,
//         attributeFilter: ["style"],
//       });
//     }

//     return () => {
//       if (observerRef) {
//         observerRef.disconnect();
//       }
//       ctx.revert();
//     };
//   }, [breakpoint]);

//   const getBitSize = (i, breakpoint) => {
//     let baseSize;
//     if (i % 3 === 0) baseSize = 24;
//     else if (i % 2 === 0) baseSize = 14;
//     else baseSize = 8;

//     if (breakpoint === "mobile") return baseSize * 0.5;
//     if (breakpoint === "tablet") return baseSize * 0.75;
//     return baseSize;
//   };

//   return (
//     <section
//       ref={sectionRef}
//       style={{
//         height: "1700px",
//         // marginTop: "200px",
//         maxWidth: "1152px",
//         marginLeft: "auto",
//         marginRight: "auto",
//       }}
//       className="relative min-h-[500vh] bg-white"
//     >
//       {/* ================= PINNED ANIMATION (Full Viewport Fixed Layer) ================= */}
//       <div
//         ref={pinRef}
//         className="z-10 pointer-events-none flex items-center justify-center"
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           width: "100vw",
//           height: "100vh",
//           margin: 0,
//           padding: 0,
//           inset: "0px",
//         }}
//       >
//         {/* Centered animation container */}
//         <div
//           className="relative"
//           style={{
//             // top: breakpoint === "mobile" ? "120px" : "250px",
//             width: breakpoint === "mobile" ? "100%" : "1200px",
//             maxWidth: "100vw",
//             height: breakpoint === "mobile" ? "400px" : "600px",
//             margin: "0 auto",
//           }}
//         >
//           {/* ===== SEEDS (CENTERED) ===== */}
//           <div className="absolute inset-0 z-10 flex items-center justify-center">
//             <img
//               ref={seedA}
//               src={productConfig.images.badham}
//               className="absolute"
//               style={{
//                 width: breakpoint === "mobile" ? "120px" : "160px",
//               }}
//               alt="Sunflower Seed"
//             />
//             <img
//               ref={seedB}
//               src={productConfig.images.date}
//               className="absolute"
//               style={{
//                 width: breakpoint === "mobile" ? "120px" : "160px",
//               }}
//               alt="Date"
//             />
//             <img
//               ref={seedC}
//               src={productConfig.images.kaju}
//               className="absolute"
//               style={{
//                 width: breakpoint === "mobile" ? "120px" : "160px",
//               }}
//               alt="Pumpkin Seed"
//             />
//           </div>

//           {/* ===== DOTS ===== */}
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               top: breakpoint === "mobile" ? "30%" : "-150px",
//               zIndex: 20,
//               left: breakpoint === "mobile" ? "0" : "5.2%",
//               width: breakpoint === "mobile" ? "100%" : "auto",
//             }}
//           >
//             {Array.from({ length: 18 }).map((_, i) => (
//               <div
//                 key={i}
//                 ref={(el) => (bitsRef.current[i] = el)}
//                 className="absolute rounded-full bg-[#763714]"
//                 style={{
//                   left: "50%",
//                   top: breakpoint === "mobile" ? "20%" : "50%",
//                   transform: `translate(${gsap.utils.random(
//                     -120,
//                     120
//                   )}px, ${gsap.utils.random(-120, 120)}px)`,
//                   width: getBitSize(i, breakpoint),
//                   height: getBitSize(i, breakpoint),
//                 }}
//               />
//             ))}
//           </div>

//           {/* ===== VECTORS CONTAINER (Flex for controlled separation) ===== */}
//           <div
//             ref={vectorContainerRef}
//             className="absolute inset-0 z-30 flex justify-center items-center"
//             style={{
//               gap: 0, // Initial gap (overridden by GSAP)
//             }}
//           >
//             <img
//               ref={leftRef}
//               src={productConfig.images.vector8}
//               style={{
//                 width: breakpoint === "mobile" ? "80px" : "15%",
//               }}
//               alt=""
//             />
//             <img
//               ref={rightRef}
//               src={productConfig.images.vector7}
//               style={{
//                 width: breakpoint === "mobile" ? "85px" : "16.5%",
//               }}
//               alt=""
//             />
//           </div>
//           <video
//             src="../../public/assets/seedCream.mp4"
//             autoPlay
//             loop
//             muted
//             playsInline
//             style={{
//               width: breakpoint === "mobile" ? "1200px" : "100%",
//               height: breakpoint === "mobile" ? "1200px" : "100%",
//               objectFit: "cover",
//               objectPosition: "center",
//               borderRadius: "10px",
//             }}
//             alt=""
//           >
//             <source src="../../public/assets/seedCream.mp4" type="video/mp4" />
//           </video>
//         </div>
//       </div>

//       {/* ================= FOREGROUND CONTENT ================= */}
//       {[
//         productConfig.heading1,
//         "Power-packed nutrition for everyday energy",
//         "Naturally sourced, perfectly balanced",
//       ].map((title, i) => (
//         <section
//           key={i}
//           className="relative h-screen flex items-center z-40 pointer-events-auto"
//         >
//           <div className="max-w-[100%] px-[10%] bg-white/80 backdrop-blur-sm p-6 rounded-xl">
//             <h2
//               style={{
//                 fontSize:
//                   breakpoint === "mobile"
//                     ? "24px"
//                     : breakpoint === "tablet"
//                     ? "36px"
//                     : "54px",
//                 fontFamily:
//                   "'Montserrat', 'Oswald', 'Permanent Marker', Arial, sans-serif",
//                 lineHeight: "1.05",
//               }}
//             >
//               {title}
//             </h2>
//             <p
//               className="mt-4"
//               style={{
//                 fontSize:
//                   breakpoint === "mobile"
//                     ? "14px"
//                     : breakpoint === "tablet"
//                     ? "18px"
//                     : "24px",
//                 lineHeight: "1.1",
//                 fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
//               }}
//             >
//               {productConfig.paragraph1}
//             </p>
//           </div>
//         </section>
//       ))}

//       {/* ================= FINAL CTA ================= */}
//       <section className="relative h-screen flex items-center z-50 bg-white">
//         <div className="max-w-[90%] pl-[10%]">
//           <h2
//             style={{
//               fontSize:
//                 breakpoint === "mobile"
//                   ? "24px"
//                   : breakpoint === "tablet"
//                   ? "36px"
//                   : "54px",
//               fontFamily:
//                 "'Montserrat', 'Oswald', 'Permanent Marker', Arial, sans-serif",
//               lineHeight: "1.05",
//             }}
//           >
//             {productConfig.heading2}
//           </h2>
//           <p
//             className="mt-4"
//             style={{
//               fontSize:
//                 breakpoint === "mobile"
//                   ? "14px"
//                   : breakpoint === "tablet"
//                   ? "18px"
//                   : "24px",
//               lineHeight: "1.1",
//               fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
//             }}
//           >
//             {productConfig.paragraph2}
//           </p>

//           {onOpenDetails && (
//             <button
//               onClick={onOpenDetails}
//               className="mt-6 px-6 py-3 bg-black text-white rounded-lg"
//               style={{
//                 fontSize:
//                   breakpoint === "mobile"
//                     ? "18px"
//                     : breakpoint === "tablet"
//                     ? "20px"
//                     : "22px",
//                 fontFamily: "'Permanent_Marker-Regular', Helvetica",
//               }}
//             >
//               Check Details
//             </button>
//           )}
//         </div>
//       </section>
//     </section>
//   );
// };

// export default SeedsLayout;


// 

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SeedsLayout = ({ productConfig, breakpoint, onOpenDetails }) => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bitsRef = useRef([]);
  const vectorContainerRef = useRef(null);

  // Only two seeds now: badham (A) and kaju (C)
  const seedA = useRef(null); // badham
  const seedC = useRef(null); // kaju

  useEffect(() => {
    // Function to lock inset and positioning
    const lockInset = () => {
      if (pinRef.current) {
        requestAnimationFrame(() => {
          if (pinRef.current) {
            pinRef.current.style.inset = "0px";
            pinRef.current.style.top = "0px";
            pinRef.current.style.left = "0px";
            pinRef.current.style.right = "0px";
            pinRef.current.style.bottom = "0px";
          }
        });
      }
    };

    const ctx = gsap.context(() => {
      // Force pinRef to be fixed from the very beginning with full viewport coverage
      gsap.set(pinRef.current, {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        inset: "0px",
      });

      /* PIN - Seamless with no layout shift */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinType: "fixed",
        pinSpacing: false,
        pinReparent: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: lockInset,
        onEnterBack: lockInset,
        onLeave: lockInset,
        onLeaveBack: lockInset,
        onUpdate: lockInset,
        onRefresh: lockInset,
      });

      /* MASTER TIMELINE */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial state: vectors closed (together) at start
      gsap.set(vectorContainerRef.current, { gap: 0 });

      /* VECTOR OPEN - Separate on scroll down */
      tl.to(
        vectorContainerRef.current,
        {
          gap: breakpoint === "mobile" ? "200px" : "600px",
          ease: "power3.out",
        },
        0
      );

      /* DOTS */
      bitsRef.current.forEach((bit) => {
        tl.to(
          bit,
          {
            x: gsap.utils.random(-400, 400),
            y: gsap.utils.random(-300, 300),
            scale: gsap.utils.random(0.6, 1.2),
            ease: "power2.out",
          },
          0
        );
      });

      /* SEED VISIBILITY - Only badham → kaju (long, smooth transition) 🚀 */
      gsap.set(seedC.current, { opacity: 0 }); // Hide kaju initially
      gsap.set(seedA.current, { opacity: 1 }); // Show badham from start

      // Slow fade out badham over first ~40% of scroll
      tl.to(seedA.current, { opacity: 0, duration: 1 }, 0);

      // Slow fade in kaju starting a bit later, lasting longer
      tl.to(seedC.current, { opacity: 1, duration: 1.5 }, 0.3);

      // Kaju stays fully visible until the end (no fade out)
    }, sectionRef);

    // MutationObserver fallback
    let observerRef = null;
    if (pinRef.current) {
      observerRef = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "attributes" && mutation.attributeName === "style") {
            lockInset();
          }
        });
      });

      observerRef.observe(pinRef.current, {
        attributes: true,
        attributeFilter: ["style"],
      });
    }

    return () => {
      if (observerRef) observerRef.disconnect();
      ctx.revert();
    };
  }, [breakpoint]);

  const getBitSize = (i, breakpoint) => {
    let baseSize;
    if (i % 3 === 0) baseSize = 24;
    else if (i % 2 === 0) baseSize = 14;
    else baseSize = 8;

    if (breakpoint === "mobile") return baseSize * 0.5;
    if (breakpoint === "tablet") return baseSize * 0.75;
    return baseSize;
  };

  return (
    <section
      ref={sectionRef}
      style={{
        height: "1700px",
        maxWidth: "1152px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      className="relative min-h-[500vh] bg-white"
    >
      {/* ================= PINNED ANIMATION (Full Viewport Fixed Layer) ================= */}
      <div
        ref={pinRef}
        className="z-10 pointer-events-none flex items-center justify-center"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: 0,
          inset: "0px",
        }}
      >
        {/* Centered animation container */}
        <div
          className="relative"
          style={{
            width: breakpoint === "mobile" ? "100%" : "1200px",
            maxWidth: "100vw",
            height: breakpoint === "mobile" ? "400px" : "600px",
            margin: "0 auto",
          }}
        >
          {/* ===== SEEDS (CENTERED) ===== */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            {/* Badham (Almond) - starts visible */}
            <img
              ref={seedA}
              src={productConfig.images.badham}
              className="absolute"
              style={{
                width: breakpoint === "mobile" ? "120px" : "160px",
              }}
              alt="Badham (Almond)"
            />

            {/* Kaju (Cashew) - fades in later */}
            <img
              ref={seedC}
              src={productConfig.images.kaju}
              className="absolute"
              style={{
                width: breakpoint === "mobile" ? "120px" : "160px",
              }}
              alt="Kaju (Cashew)"
            />
          </div>

          {/* ===== DOTS ===== */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              top: breakpoint === "mobile" ? "30%" : "-150px",
              zIndex: 20,
              left: breakpoint === "mobile" ? "0" : "5.2%",
              width: breakpoint === "mobile" ? "100%" : "auto",
            }}
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                ref={(el) => (bitsRef.current[i] = el)}
                className="absolute rounded-full bg-[#763714]"
                style={{
                  left: "50%",
                  top: breakpoint === "mobile" ? "20%" : "50%",
                  transform: `translate(${gsap.utils.random(-120, 120)}px, ${gsap.utils.random(-120, 120)}px)`,
                  width: getBitSize(i, breakpoint),
                  height: getBitSize(i, breakpoint),
                }}
              />
            ))}
          </div>

          {/* ===== VECTORS CONTAINER ===== */}
          <div
            ref={vectorContainerRef}
            className="absolute inset-0 z-10 flex justify-center items-center"
            style={{ gap: 0 }}
          >
            <img
              ref={leftRef}
              src={productConfig.images.vector8}
              style={{
                width: breakpoint === "mobile" ? "80px" : "15%",
              }}
              alt=""
            />
            <img
              ref={rightRef}
              src={productConfig.images.vector7}
              style={{
                width: breakpoint === "mobile" ? "85px" : "16.5%",
              }}
              alt=""
            />
          </div>

          <video
            src="../../public/assets/seedCream.mp4"
            autoPlay
            // loop
            muted
            playsInline
            style={{
              width: breakpoint === "mobile" ? "1200px" : "100%",
              height: breakpoint === "mobile" ? "1200px" : "100%",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "10px",
              transform: "rotateX(180deg)",
              marginLeft: breakpoint === "desktop" ? '20px' : '0px',
              marginTop: breakpoint === "mobile" ? '0px' : '90px',
              zIndex:'50',
            }}
            alt=""
          >
            <source src="../../public/assets/seedCream.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* ================= FOREGROUND CONTENT ================= */}
      {[
        productConfig.heading1,
        "Power-packed nutrition for everyday energy",
        "Naturally sourced, perfectly balanced",
      ].map((title, i) => (
        <section
          key={i}
          className="relative h-screen flex items-center z-40 pointer-events-auto"
        >
          <div className="max-w-[100%] px-[10%] bg-white/80 backdrop-blur-sm p-6 rounded-xl">
            <h2
              style={{
                fontSize:
                  breakpoint === "mobile"
                    ? "24px"
                    : breakpoint === "tablet"
                    ? "36px"
                    : "54px",
                fontFamily:
                  "'Montserrat', 'Oswald', 'Permanent Marker', Arial, sans-serif",
                lineHeight: "1.05",
              }}
            >
              {title}
            </h2>
            <p
              className="mt-4"
              style={{
                fontSize:
                  breakpoint === "mobile"
                    ? "14px"
                    : breakpoint === "tablet"
                    ? "18px"
                    : "24px",
                lineHeight: "1.1",
                fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
              }}
            >
              {productConfig.paragraph1}
            </p>
          </div>
        </section>
      ))}

      {/* ================= FINAL CTA ================= */}
      <section className="relative h-screen flex items-center z-50 bg-white">
        <div className="max-w-[90%] pl-[10%]">
          <h2
            style={{
              fontSize:
                breakpoint === "mobile"
                  ? "24px"
                  : breakpoint === "tablet"
                  ? "36px"
                  : "54px",
              fontFamily:
                "'Montserrat', 'Oswald', 'Permanent Marker', Arial, sans-serif",
              lineHeight: "1.05",
            }}
          >
            {productConfig.heading2}
          </h2>
          <p
            className="mt-4"
            style={{
              fontSize:
                breakpoint === "mobile"
                  ? "14px"
                  : breakpoint === "tablet"
                  ? "18px"
                  : "24px",
              lineHeight: "1.1",
              fontFamily: "'Just_Me_Again_Down_Here-Regular', Helvetica",
            }}
          >
            {productConfig.paragraph2}
          </p>

          {onOpenDetails && (
            <button
              onClick={onOpenDetails}
              className="mt-6 px-6 py-3 bg-black text-white rounded-lg"
              style={{
                fontSize:
                  breakpoint === "mobile"
                    ? "18px"
                    : breakpoint === "tablet"
                    ? "20px"
                    : "22px",
                fontFamily: "'Permanent_Marker-Regular', Helvetica",
              }}
            >
              Check Details
            </button>
          )}
        </div>
      </section>
    </section>
  );
};

export default SeedsLayout;

