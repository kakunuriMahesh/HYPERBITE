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

//   const seedA = useRef(null);
//   const seedB = useRef(null);
//   const seedC = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       /* PIN */
//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom bottom",
//         pin: pinRef.current,
//         pinSpacing: false,
//       });

//       /* MASTER TIMELINE */
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=300%",
//           scrub: true,
//         },
//       });

//       /* VECTOR OPEN */
//       tl.to(
//         leftRef.current,
//         {
//           x: breakpoint === "mobile" ? -260 : -600,
//           ease: "power3.out",
//         },
//         0
//       );

//       tl.to(
//         rightRef.current,
//         {
//           x: breakpoint === "mobile" ? 260 : 600,
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

//     return () => ctx.revert();
//   }, [breakpoint]);

//   return (
//     <section
//       ref={sectionRef}
//       style={{
//         height: "1700px",
//         marginTop: "200px",
//         maxWidth: "1152px",
//         marginLeft: "auto",
//         marginRight: "auto",
//       }}
//       className="relative min-h-[400vh] bg-white"
//     >
//       {/* ================= PINNED ANIMATION ================= */}
//       <div
//         ref={pinRef}
//         className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center"
//       >
//         <div className="relative top-[250px] m-auto w-[1200px] h-[600px]">
//           {/* ===== SEEDS (BEHIND VECTORS) ===== */}
//           <div className="absolute inset-0 z-10 flex items-center justify-center">
//             <img
//               ref={seedA}
//               src={productConfig.images.sunflowerseed}
//               className="absolute"
//               style={{
//                 left: "50%",
//                 top: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: "160px",
//               }}
//               alt="Sunflower Seed"
//             />
//             <img
//               ref={seedB}
//               src={productConfig.images.date}
//               className="absolute"
//               style={{
//                 left: "50%",
//                 top: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: "160px",
//               }}
//               alt="Date"
//             />
//             <img
//               ref={seedC}
//               src={productConfig.images.pumpkinseed}
//               className="absolute"
//               style={{
//                 left: "50%",
//                 top: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: "160px",
//               }}
//               alt="Pumpkin Seed"
//             />
//           </div>

//           {/* ===== DOTS ===== */}
//           <div
//             // className="absolute inset-0 z-20 top-[-150px]"
//             style={{
//               top: breakpoint === "mobile" ? "-100px" : "-150px",
//               position: "absolute",
//               inset: 0,
//               zIndex: 20,
//               left: breakpoint === "mobile" ? "-900px" : "5.2%",
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
//                   width:
//                     breakpoint === "mobile"
//                       ? 4
//                       : i % 3 === 0
//                       ? 24
//                       : i % 2 === 0
//                       ? 14
//                       : 8,
//                   height:
//                     breakpoint === "mobile"
//                       ? 4
//                       : i % 3 === 0
//                       ? 24
//                       : i % 2 === 0
//                       ? 14
//                       : 8,
//                 }}
//               />
//             ))}
//           </div>

//           {/* ===== VECTORS (ON TOP) ===== */}
//           <img
//             ref={leftRef}
//             src={productConfig.images.vector8}
//             className="absolute z-30"
//             style={{
//               left: breakpoint === "mobile" ? "30.2%" : "60%",
//               transform: "translateX(-260px)",
//               width: breakpoint === "mobile" ? "80px" : "15%",
//             }}
//             alt=""
//           />

//           <img
//             ref={rightRef}
//             src={productConfig.images.vector7}
//             className="absolute z-30"
//             style={{
//               right: breakpoint === "mobile" ? "100.2%" : "54.2%",
//               transform: "translateX(260px)",
//               width: breakpoint === "mobile" ? "85px" : "16.5%",
//             }}
//             alt=""
//           />
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
//           <div className="max-w-[520px] pl-[10%] bg-white/80 backdrop-blur-sm p-6 rounded-xl">
//             <h2 className="text-[52px]">{title}</h2>
//             <p className="mt-4">{productConfig.paragraph1}</p>
//           </div>
//         </section>
//       ))}

//       {/* ================= FINAL CTA ================= */}
//       <section className="relative h-screen flex items-center z-50 bg-white">
//         <div className="max-w-[520px] pl-[10%]">
//           <h2 className="text-[54px]">{productConfig.heading2}</h2>
//           <p className="mt-4">{productConfig.paragraph2}</p>

//           {onOpenDetails && (
//             <button
//               onClick={onOpenDetails}
//               className="mt-6 px-6 py-3 bg-black text-white rounded-lg"
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

//   const seedA = useRef(null);
//   const seedB = useRef(null);
//   const seedC = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Pre-set the pinned container to match the exact initial layout
//       gsap.set(pinRef.current, {
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         position: "fixed",
//       });

//       /* PIN - Now perfectly smooth because initial state already matches pinned state */
//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom bottom",
//         pin: pinRef.current,
//         pinSpacing: false,
//         anticipatePin: 1, // Maximum anticipation for zero jump
//         invalidateOnRefresh: true,
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

//       /* VECTOR OPEN */
//       tl.to(
//         leftRef.current,
//         {
//           x: breakpoint === "mobile" ? -260 : -600,
//           ease: "power3.out",
//         },
//         0
//       );

//       tl.to(
//         rightRef.current,
//         {
//           x: breakpoint === "mobile" ? 260 : 600,
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

//     return () => ctx.revert();
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
//         marginTop: "200px",
//         maxWidth: "1152px",
//         marginLeft: "auto",
//         marginRight: "auto",
//       }}
//       className="relative min-h-[500vh] bg-white"
//     >
//       {/* ================= PINNED ANIMATION ================= */}
//       <div
//         ref={pinRef}
//         className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center"
//       >
//         <div className="relative top-[250px] m-auto w-[1200px] h-[600px]">
//           {/* ===== SEEDS (BEHIND VECTORS) ===== */}
//           <div className="absolute inset-0 z-10 flex items-center justify-center">
//             <img
//               ref={seedA}
//               src={productConfig.images.sunflowerseed}
//               className="absolute"
//               style={{
//                 left: "50%",
//                 top: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: "160px",
//               }}
//               alt="Sunflower Seed"
//             />
//             <img
//               ref={seedB}
//               src={productConfig.images.date}
//               className="absolute"
//               style={{
//                 left: "50%",
//                 top: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: "160px",
//               }}
//               alt="Date"
//             />
//             <img
//               ref={seedC}
//               src={productConfig.images.pumpkinseed}
//               className="absolute"
//               style={{
//                 left: "50%",
//                 top: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: "160px",
//               }}
//               alt="Pumpkin Seed"
//             />
//           </div>

//           {/* ===== DOTS ===== */}
//           <div
//             style={{
//               top: breakpoint === "mobile" ? "-100px" : "-150px",
//               position: "absolute",
//               inset: 0,
//               zIndex: 20,
//               left: breakpoint === "mobile" ? "-900px" : "5.2%",
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

//           {/* ===== VECTORS (ON TOP) ===== */}
//           <img
//             ref={leftRef}
//             src={productConfig.images.vector8}
//             className="absolute z-30"
//             style={{
//               left: breakpoint === "mobile" ? "30.2%" : "60%",
//               transform: "translateX(-260px)",
//               width: breakpoint === "mobile" ? "80px" : "15%",
//             }}
//             alt=""
//           />

//           <img
//             ref={rightRef}
//             src={productConfig.images.vector7}
//             className="absolute z-30"
//             style={{
//               right: breakpoint === "mobile" ? "100.2%" : "54.2%",
//               transform: "translateX(260px)",
//               width: breakpoint === "mobile" ? "85px" : "16.5%",
//             }}
//             alt=""
//           />
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
//           <div className="max-w-[520px] pl-[10%] bg-white/80 backdrop-blur-sm p-6 rounded-xl">
//             <h2 className="text-[52px]">{title}</h2>
//             <p className="mt-4">{productConfig.paragraph1}</p>
//           </div>
//         </section>
//       ))}

//       {/* ================= FINAL CTA ================= */}
//       <section className="relative h-screen flex items-center z-50 bg-white">
//         <div className="max-w-[520px] pl-[10%]">
//           <h2 className="text-[54px]">{productConfig.heading2}</h2>
//           <p className="mt-4">{productConfig.paragraph2}</p>

//           {onOpenDetails && (
//             <button
//               onClick={onOpenDetails}
//               className="mt-6 px-6 py-3 bg-black text-white rounded-lg"
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

//   const seedA = useRef(null);
//   const seedB = useRef(null);
//   const seedC = useRef(null);

//   useEffect(() => {
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
//       });

//       /* PIN - Seamless with no layout shift */
//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom bottom",
//         pin: pinRef.current,
//         pinSpacing: false,
//         anticipatePin: 1,
//         invalidateOnRefresh: true,
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

//       /* VECTOR OPEN */
//       tl.to(
//         leftRef.current,
//         {
//           x: breakpoint === "mobile" ? -10 : -600,
//           ease: "power3.out",
//         },
//         0
//       );

//       tl.to(
//         rightRef.current,
//         {
//           x: breakpoint === "mobile" ? 10 : 600,
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

//     return () => ctx.revert();
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
//         marginTop: "200px",
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
//         // No longer using Tailwind's "fixed inset-0" because it conflicts with gsap.set
//         style={{
//           // These are overridden by gsap.set above, but kept for clarity
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//         }}
//       >
//         {/* Centered animation container - responsive and always centered */}
//         <div
//           className="relative"
//           style={{
//             top: breakpoint === "mobile" ? "120px" : "250px",
//             width: breakpoint === "mobile" ? "100%" : "1200px",
//             maxWidth: "95vw",
//             height: breakpoint === "mobile" ? "400px" : "600px",
//             margin: "0 auto",
//           }}
//         >
//           {/* ===== SEEDS (CENTERED) ===== */}
//           <div className="absolute inset-0 z-10 flex items-center justify-center">
//             <img
//               ref={seedA}
//               src={productConfig.images.sunflowerseed}
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
//               src={productConfig.images.pumpkinseed}
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
//               top: breakpoint === "mobile" ? "-80px" : "-150px",
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
//                   transform: `translate(${gsap.utils.random(-120, 120)}px, ${gsap.utils.random(-120, 120)}px)`,
//                   width: getBitSize(i, breakpoint),
//                   height: getBitSize(i, breakpoint),
//                 }}
//               />
//             ))}
//           </div>

//           {/* ===== VECTORS (ON TOP) ===== */}
//           <img
//             ref={leftRef}
//             src={productConfig.images.vector8}
//             className="absolute z-30"
//             style={{
//               left: breakpoint === "mobile" ? "50%" : "60%",
//               top: breakpoint === "mobile" ? "50%" : "auto",
//               transform: breakpoint === "mobile" 
//                 ? "translateX(-20px)" 
//                 : "translateX(-260px)",
//               width: breakpoint === "mobile" ? "80px" : "15%",
//             }}
//             alt=""
//           />

//           <img
//             ref={rightRef}
//             src={productConfig.images.vector7}
//             className="absolute z-30"
//             style={{
//               right: breakpoint === "mobile" ? "50%" : "54.2%",
//               top: breakpoint === "mobile" ? "50%" : "auto",
//               transform: breakpoint === "mobile" 
//                 ? "translateX(10px)" 
//                 : "translateX(260px)",
//               width: breakpoint === "mobile" ? "85px" : "16.5%",
//             }}
//             alt=""
//           />
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
//           <div className="max-w-[520px] pl-[10%] bg-white/80 backdrop-blur-sm p-6 rounded-xl">
//             <h2 className="text-[52px]">{title}</h2>
//             <p className="mt-4">{productConfig.paragraph1}</p>
//           </div>
//         </section>
//       ))}

//       {/* ================= FINAL CTA ================= */}
//       <section className="relative h-screen flex items-center z-50 bg-white">
//         <div className="max-w-[520px] pl-[10%]">
//           <h2 className="text-[54px]">{productConfig.heading2}</h2>
//           <p className="mt-4">{productConfig.paragraph2}</p>

//           {onOpenDetails && (
//             <button
//               onClick={onOpenDetails}
//               className="mt-6 px-6 py-3 bg-black text-white rounded-lg"
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

//   const seedA = useRef(null);
//   const seedB = useRef(null);
//   const seedC = useRef(null);

//   useEffect(() => {
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
//       });

//       /* PIN - Seamless with no layout shift */
//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom bottom",
//         pin: pinRef.current,
//         pinSpacing: false,
//         anticipatePin: 1,
//         invalidateOnRefresh: true,
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
//       gsap.set(leftRef.current, { x: 0 });
//       gsap.set(rightRef.current, { x: 0 });

//       /* VECTOR OPEN - Same behavior as desktop: separate on scroll down */
//       tl.to(
//         leftRef.current,
//         {
//           x: breakpoint === "mobile" ? -120 : -600, // Good separation on mobile without going off-screen
//           ease: "power3.out",
//         },
//         0
//       );

//       tl.to(
//         rightRef.current,
//         {
//           x: breakpoint === "mobile" ? 120 : 600,
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

//     return () => ctx.revert();
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
//         marginTop: "200px",
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
//           width: "100vw",
//           height: "100vh",
//         }}
//       >
//         {/* Centered animation container */}
//         <div
//           className="relative"
//           style={{
//             top: breakpoint === "mobile" ? "120px" : "250px",
//             width: breakpoint === "mobile" ? "100%" : "1200px",
//             maxWidth: "95vw",
//             height: breakpoint === "mobile" ? "400px" : "600px",
//             margin: "0 auto",
//           }}
//         >
//           {/* ===== SEEDS (CENTERED) ===== */}
//           <div className="absolute inset-0 z-10 flex items-center justify-center">
//             <img
//               ref={seedA}
//               src={productConfig.images.sunflowerseed}
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
//               src={productConfig.images.pumpkinseed}
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
//                   transform: `translate(${gsap.utils.random(-120, 120)}px, ${gsap.utils.random(-120, 120)}px)`,
//                   width: getBitSize(i, breakpoint),
//                   height: getBitSize(i, breakpoint),
//                 }}
//               />
//             ))}
//           </div>

//           {/* ===== VECTORS (ON TOP) - Centered properly on mobile ===== */}
//           <img
//             ref={leftRef}
//             src={productConfig.images.vector8}
//             className="absolute z-30"
//             style={{
//               left: breakpoint === "mobile" ? "30.2%" : "50%",
//               top: breakpoint === "mobile" ? "30%" : "50%",
//               transform: "translate(-50%, -50%)", // Base centering
//               width: breakpoint === "mobile" ? "80px" : "15%",
//             }}
//             alt=""
//           />

//           <img
//             ref={rightRef}
//             src={productConfig.images.vector7}
//             className="absolute z-30"
//             style={{
//               left: breakpoint === "mobile" ? "50%" : "50%",
//               top: breakpoint === "mobile" ? "30%" : "50%",
//               transform: "translate(-50%, -50%)", // Base centering
//               width: breakpoint === "mobile" ? "85px" : "16.5%",
//             }}
//             alt=""
//           />
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
//           <div className="max-w-[520px] pl-[10%] bg-white/80 backdrop-blur-sm p-6 rounded-xl">
//             <h2 className="text-[52px]">{title}</h2>
//             <p className="mt-4">{productConfig.paragraph1}</p>
//           </div>
//         </section>
//       ))}

//       {/* ================= FINAL CTA ================= */}
//       <section className="relative h-screen flex items-center z-50 bg-white">
//         <div className="max-w-[520px] pl-[10%]">
//           <h2 className="text-[54px]">{productConfig.heading2}</h2>
//           <p className="mt-4">{productConfig.paragraph2}</p>

//           {onOpenDetails && (
//             <button
//               onClick={onOpenDetails}
//               className="mt-6 px-6 py-3 bg-black text-white rounded-lg"
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

  const seedA = useRef(null);
  const seedB = useRef(null);
  const seedC = useRef(null);

  useEffect(() => {
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
      });

      /* PIN - Seamless with no layout shift */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
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

      /* VECTOR OPEN - Same behavior as desktop: separate on scroll down */
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

      /* SEED VISIBILITY */
      gsap.set([seedB.current, seedC.current], { opacity: 0 });

      tl.to(seedA.current, { opacity: 0 }, 0.33);
      tl.to(seedB.current, { opacity: 1 }, 0.33);

      tl.to(seedB.current, { opacity: 0 }, 0.66);
      tl.to(seedC.current, { opacity: 1 }, 0.66);

      tl.to(seedC.current, { opacity: 0 }, 0.95);
    }, sectionRef);

    return () => ctx.revert();
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
        marginTop: "200px",
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
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* Centered animation container */}
        <div
          className="relative"
          style={{
            top: breakpoint === "mobile" ? "120px" : "250px",
            width: breakpoint === "mobile" ? "100%" : "1200px",
            maxWidth: "95vw",
            height: breakpoint === "mobile" ? "400px" : "600px",
            margin: "0 auto",
          }}
        >
          {/* ===== SEEDS (CENTERED) ===== */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <img
              ref={seedA}
              src={productConfig.images.sunflowerseed}
              className="absolute"
              style={{
                width: breakpoint === "mobile" ? "120px" : "160px",
              }}
              alt="Sunflower Seed"
            />
            <img
              ref={seedB}
              src={productConfig.images.date}
              className="absolute"
              style={{
                width: breakpoint === "mobile" ? "120px" : "160px",
              }}
              alt="Date"
            />
            <img
              ref={seedC}
              src={productConfig.images.pumpkinseed}
              className="absolute"
              style={{
                width: breakpoint === "mobile" ? "120px" : "160px",
              }}
              alt="Pumpkin Seed"
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

          {/* ===== VECTORS CONTAINER (Flex for controlled separation) ===== */}
          <div
            ref={vectorContainerRef}
            className="absolute inset-0 z-30 flex justify-center items-center"
            style={{
              gap: 0, // Initial gap (overridden by GSAP)
            }}
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
          <div className="max-w-[520px] pl-[10%] bg-white/80 backdrop-blur-sm p-6 rounded-xl">
            <h2 className="text-[52px]">{title}</h2>
            <p className="mt-4">{productConfig.paragraph1}</p>
          </div>
        </section>
      ))}

      {/* ================= FINAL CTA ================= */}
      <section className="relative h-screen flex items-center z-50 bg-white">
        <div className="max-w-[520px] pl-[10%]">
          <h2 className="text-[54px]">{productConfig.heading2}</h2>
          <p className="mt-4">{productConfig.paragraph2}</p>

          {onOpenDetails && (
            <button
              onClick={onOpenDetails}
              className="mt-6 px-6 py-3 bg-black text-white rounded-lg"
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

