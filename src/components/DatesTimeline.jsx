// // ⭐

// import React, { useRef, useState, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAPContext } from "../hooks/useGSAPContext";

// gsap.registerPlugin(ScrollTrigger);

// const DOT_SIZE = 36;

// const TIMELINE_STEPS = [
//   {
//     progress: 0.28,
//     label: "1. In a large, chilled bowl, combine very cold heavy cream",
//     imageKey: "date1",
//     color: "#000",
//   },
//   {
//     progress: 0.46,
//     label: "2. In a large, chilled bowl, combine very cold heavy cream",
//     imageKey: "date2",
//     color: "#FFD93D",
//   },
//   {
//     progress: 0.68,
//     label: "3. In a large, chilled bowl, combine very cold heavy cream",
//     imageKey: "date3",
//     color: "#6BCB77",
//   },
//   {
//     progress: 0.88,
//     label: "Final",
//     imageKey: "date4",
//     color: "#4D96FF",
//     final: true,
//   },
// ];

// const DatesTimeline = ({
//   productConfig,
//   onOpenDetails,
//   breakpoint: propBreakpoint,
// }) => {
//   const wrapperRef = useRef(null);
//   const svgRef = useRef(null);
//   const pathRef = useRef(null);
//   const dotRef = useRef(null);
//   const itemRefs = useRef([]);
//   const activeStepRef = useRef(-1);

//   // 🔥 Used ONLY for velocity (not position)
//   const prevTargetRef = useRef({ x: 0, y: 0 });
//   const [breakpoint, setBreakpoint] = useState(propBreakpoint || "desktop");

//   useEffect(() => {
//     if (propBreakpoint) {
//       setBreakpoint(propBreakpoint);
//     }
//   }, [propBreakpoint]);
//   useEffect(() => {
//     const updateBreakpoint = () => {
//       const viewportWidth = window.innerWidth;
//       if (viewportWidth < 768) {
//         setBreakpoint("mobile");
//       } else if (viewportWidth < 1024) {
//         setBreakpoint("tablet");
//       } else {
//         setBreakpoint("desktop");
//       }
//     };
//     updateBreakpoint();
//     window.addEventListener("resize", updateBreakpoint);
//     return () => window.removeEventListener("resize", updateBreakpoint);
//   }, [propBreakpoint]);

//   useGSAPContext(() => {
//     const wrapper = wrapperRef.current;
//     const path = pathRef.current;
//     const svg = svgRef.current;
//     const dot = dotRef.current;

//     if (!wrapper || !path || !svg || !dot) return;

//     const pathLength = path.getTotalLength();

//     gsap.set(path, {
//       strokeDasharray: pathLength,
//       strokeDashoffset: pathLength,
//     });

//     ScrollTrigger.create({
//       trigger: wrapper,
//       start: breakpoint === "mobile" ? "top 10%" : "top 35%",
//       end: breakpoint === "mobile" ? "+=500" : "+=1600",
//       scrub: true,
//       invalidateOnRefresh: true,

//       onUpdate: (self) => {
//         const p = self.progress;
//         const rect = wrapper.getBoundingClientRect();

//         /* DRAW PATH */
//         gsap.set(path, {
//           strokeDashoffset: pathLength * (1 - p),
//         });

//         /* EXACT PATH POSITION (NO LAG) */
//         const pt = path.getPointAtLength(p * pathLength);
//         const sp = svg.createSVGPoint();
//         sp.x = pt.x;
//         sp.y = pt.y;
//         const screen = sp.matrixTransform(path.getScreenCTM());

//         const x = screen.x - rect.left - DOT_SIZE / 2;
//         const y = screen.y - rect.top - DOT_SIZE / 2;

//         /* VELOCITY (for jelly only) */
//         const dx = x - prevTargetRef.current.x;
//         const dy = y - prevTargetRef.current.y;
//         const speed = Math.sqrt(dx * dx + dy * dy);

//         prevTargetRef.current.x = x;
//         prevTargetRef.current.y = y;

//         /* JELLY DEFORMATION */
//         const squash = gsap.utils.clamp(0, 0.45, speed / 20);

//         gsap.set(dot, {
//           x,
//           y,
//           scaleX: 1 + squash,
//           scaleY: 1 - squash * 0.7,
//           rotate: (Math.atan2(dy, dx) * 180) / Math.PI,
//           transformOrigin: "50% 50%",
//           willChange: "transform",
//         });

//         /* COLOR CHANGE */
//         TIMELINE_STEPS.forEach((step, i) => {
//           if (p >= step.progress && activeStepRef.current !== i) {
//             activeStepRef.current = i;
//             gsap.to(dot, {
//               backgroundColor: step.color,
//               duration: 0.3,
//               ease: "power2.out",
//             });
//           }
//         });

//         /* TIMELINE ITEMS */
//         TIMELINE_STEPS.forEach((step, i) => {
//           const el = itemRefs.current[i];
//           if (!el) return;

//           const active = p >= step.progress;

//           const mp = path.getPointAtLength(step.progress * pathLength);
//           const sp2 = svg.createSVGPoint();
//           sp2.x = mp.x;
//           sp2.y = mp.y;
//           const screen2 = sp2.matrixTransform(path.getScreenCTM());

//           const isLeft = i % 2 === 1;
//           const offsetX = isLeft ? -140 : 40;

//           gsap.set(el, {
//             x: screen2.x - rect.left + offsetX,
//             y: screen2.y - rect.top - 10,
//           });

//           gsap.to(el, {
//             autoAlpha: active ? 1 : 0,
//             scale: active ? 1 : 0.85,
//             duration: 0.35,
//             ease: "power3.out",
//           });
//         });
//       },
//     });
//   }, []);

//   return (
//     <section
//       ref={wrapperRef}
//       style={{
//         position: "relative",
//         height: "1700px",
//         marginTop: breakpoint === "mobile" ? "100px" : "200px",
//       }}
//     >
//       {/* SVG */}
//       <svg
//         ref={svgRef}
//         viewBox="0 0 934 1281"
//         style={{ width: "100%", height: "100%", position: "absolute" }}
//       >
//         <path
//           ref={pathRef}
//           d="M2.5 0C2.5 310.216 373 578.5 485.5 554C598 529.5 553.5 331 464 392C374.5 453 492.5 588.5 272.5 671C52.5 753.5 52.5 973 272.5 1019.5C492.5 1066 844.5 784.133 907.5 845C970.5 905.867 892 975.5 828.5 1062C765 1148.5 800.5 1279.5 800.5 1279.5"
//           stroke="#000"
//           strokeWidth="4"
//           fill="none"
//         />
//       </svg>

//       {/* JELLY DOT */}
//       <div
//         ref={dotRef}
//         style={{
//           width: DOT_SIZE,
//           height: DOT_SIZE,
//           borderRadius: "50%",
//           backgroundColor: "#000",
//           position: "absolute",
//           zIndex: 5,
//         }}
//       />

//       {/* TIMELINE ITEMS */}
//       {TIMELINE_STEPS.map((step, i) => (
//         <div
//           key={i}
//           ref={(el) => (itemRefs.current[i] = el)}
//           style={{
//             position: "absolute",
//             opacity: 0,
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             zIndex: 4,
//             pointerEvents: "none",
//           }}
//         >
//           {breakpoint === "mobile" ? (
//             <div className="flex flex-col items-start gap-2">
//               <img
//                 src={productConfig.images[step.imageKey]}
//                 width={step.final ? 48 : 80}
//                 alt=""
//               />
//               <span>{step.label}</span>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <img
//                 src={productConfig.images[step.imageKey]}
//                 width={step.final ? 48 : 80}
//                 alt=""
//               />
//               <span>{step.label}</span>
//             </div>
//           )}
//         </div>
//       ))}
//       {/* 🔒 HEADINGS / PARAGRAPH / QUOTE — UNCHANGED */}
//       {/* Headings and paragraphs to mirror the provided mock */}
//       <div
//         style={{
//           position: "absolute",
//           top: "0",
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
//     </section>
//   );
// };

// export default DatesTimeline;

// 

// import React, { useRef, useState, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAPContext } from "../hooks/useGSAPContext";

// gsap.registerPlugin(ScrollTrigger);

// const DOT_SIZE = 36;

// const TIMELINE_STEPS = [
//   {
//     progress: 0.28,
//     label: "1. In a large, chilled bowl, combine very cold heavy cream",
//     imageKey: "date1",
//     color: "#000",
//   },
//   {
//     progress: 0.46,
//     label: "2. In a large, chilled bowl, combine very cold heavy cream",
//     imageKey: "date2",
//     color: "#FFD93D",
//   },
//   {
//     progress: 0.68,
//     label: "3. In a large, chilled bowl, combine very cold heavy cream",
//     imageKey: "date3",
//     color: "#6BCB77",
//   },
//   {
//     progress: 0.88,
//     label: "Final",
//     imageKey: "date4",
//     color: "#4D96FF",
//     final: true,
//   },
// ];

// const DatesTimeline = ({
//   productConfig,
//   onOpenDetails,
//   breakpoint: propBreakpoint,
// }) => {
//   const wrapperRef = useRef(null);
//   const svgRef = useRef(null);
//   const pathRef = useRef(null);
//   const dotRef = useRef(null);
//   const itemRefs = useRef([]);
//   const activeStepRef = useRef(-1);

//   // 🔥 Used ONLY for velocity (not position)
//   const prevTargetRef = useRef({ x: 0, y: 0 });
//   const [breakpoint, setBreakpoint] = useState(propBreakpoint || "desktop");

//   useEffect(() => {
//     if (propBreakpoint) {
//       setBreakpoint(propBreakpoint);
//     }
//   }, [propBreakpoint]);
//   useEffect(() => {
//     const updateBreakpoint = () => {
//       const viewportWidth = window.innerWidth;
//       if (viewportWidth < 768) {
//         setBreakpoint("mobile");
//       } else if (viewportWidth < 1024) {
//         setBreakpoint("tablet");
//       } else {
//         setBreakpoint("desktop");
//       }
//     };
//     updateBreakpoint();
//     window.addEventListener("resize", updateBreakpoint);
//     return () => window.removeEventListener("resize", updateBreakpoint);
//   }, [propBreakpoint]);

//   useGSAPContext(() => {
//     const wrapper = wrapperRef.current;
//     const path = pathRef.current;
//     const svg = svgRef.current;
//     const dot = dotRef.current;

//     if (!wrapper || !path || !svg || !dot) return;

//     const pathLength = path.getTotalLength();

//     gsap.set(path, {
//       strokeDasharray: pathLength,
//       strokeDashoffset: pathLength,
//     });

//     ScrollTrigger.create({
//       trigger: wrapper,
//       start: breakpoint === "mobile" ? "top 10%" : "top 35%",
//       end: breakpoint === "mobile" ? "+=1200" : "+=1600",
//       scrub: true,
//       invalidateOnRefresh: true,

//       onUpdate: (self) => {
//         const p = self.progress;
//         const rect = wrapper.getBoundingClientRect();

//         /* DRAW PATH */
//         gsap.set(path, {
//           strokeDashoffset: pathLength * (1 - p),
//         });

//         /* EXACT PATH POSITION (NO LAG) */
//         const pt = path.getPointAtLength(p * pathLength);
//         const sp = svg.createSVGPoint();
//         sp.x = pt.x;
//         sp.y = pt.y;
//         const screen = sp.matrixTransform(path.getScreenCTM());

//         const x = screen.x - rect.left - DOT_SIZE / 2;
//         const y = screen.y - rect.top - DOT_SIZE / 2;

//         /* VELOCITY (for jelly only) */
//         const dx = x - prevTargetRef.current.x;
//         const dy = y - prevTargetRef.current.y;
//         const speed = Math.sqrt(dx * dx + dy * dy);

//         prevTargetRef.current.x = x;
//         prevTargetRef.current.y = y;

//         /* JELLY DEFORMATION */
//         const squash = gsap.utils.clamp(0, 0.45, speed / 20);

//         gsap.set(dot, {
//           x,
//           y,
//           scaleX: 1 + squash,
//           scaleY: 1 - squash * 0.7,
//           rotate: (Math.atan2(dy, dx) * 180) / Math.PI,
//           transformOrigin: "50% 50%",
//           willChange: "transform",
//         });

//         /* COLOR CHANGE */
//         TIMELINE_STEPS.forEach((step, i) => {
//           if (p >= step.progress && activeStepRef.current !== i) {
//             activeStepRef.current = i;
//             gsap.to(dot, {
//               backgroundColor: step.color,
//               duration: 0.3,
//               ease: "power2.out",
//             });
//           }
//         });

//         /* TIMELINE ITEMS */
//         TIMELINE_STEPS.forEach((step, i) => {
//           const el = itemRefs.current[i];
//           if (!el) return;

//           const active = p >= step.progress;

//           const mp = path.getPointAtLength(step.progress * pathLength);
//           const sp2 = svg.createSVGPoint();
//           sp2.x = mp.x;
//           sp2.y = mp.y;
//           const screen2 = sp2.matrixTransform(path.getScreenCTM());

//           const isLeft = i % 2 === 1;
//           const isSmall = breakpoint !== "desktop";
//           const offsetX = isLeft ? (isSmall ? -100 : -140) : (isSmall ? 20 : 40);

//           gsap.set(el, {
//             x: screen2.x - rect.left + offsetX,
//             y: screen2.y - rect.top - 10,
//           });

//           gsap.to(el, {
//             autoAlpha: active ? 1 : 0,
//             scale: active ? 1 : 0.85,
//             duration: 0.35,
//             ease: "power3.out",
//           });
//         });
//       },
//     });
//   }, []);

//   return (
//     <section
//       ref={wrapperRef}
//       style={{
//         position: "relative",
//         height: "1700px",
//         marginTop: breakpoint === "mobile" ? "100px" : "200px",
//       }}
//     >
//       {/* SVG */}
//       <svg
//         ref={svgRef}
//         viewBox="0 0 934 1281"
//         preserveAspectRatio={breakpoint === "desktop" ? "xMidYMid meet" : "none"}
//         style={{ width: "100%", height: "100%", position: "absolute"}}
//       >
//         <path
//           ref={pathRef}
//           d="M2.5 0C2.5 310.216 373 578.5 485.5 554C598 529.5 553.5 331 464 392C374.5 453 492.5 588.5 272.5 671C52.5 753.5 52.5 973 272.5 1019.5C492.5 1066 844.5 784.133 907.5 845C970.5 905.867 892 975.5 828.5 1062C765 1148.5 800.5 1279.5 800.5 1279.5"
//           stroke="#000"
//           strokeWidth="4"
//           fill="none"
//         />
//       </svg>

//       {/* JELLY DOT */}
//       <div
//         ref={dotRef}
//         style={{
//           width: DOT_SIZE,
//           height: DOT_SIZE,
//           borderRadius: "50%",
//           backgroundColor: "#000",
//           position: "absolute",
//           zIndex: 5,
//         }}
//       />

//       {/* TIMELINE ITEMS */}
//       {TIMELINE_STEPS.map((step, i) => (
//         <div
//           key={i}
//           ref={(el) => (itemRefs.current[i] = el)}
//           style={{
//             position: "absolute",
//             opacity: 0,
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             zIndex: 4,
//             pointerEvents: "none",
//           }}
//         >
//           {breakpoint === "mobile" ? (
//             <div className="flex flex-col items-start gap-2">
//               <img
//                 src={productConfig.images[step.imageKey]}
//                 width={step.final ? 48 : 80}
//                 alt=""
//               />
//               <span>{step.label}</span>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <img
//                 src={productConfig.images[step.imageKey]}
//                 width={step.final ? 48 : 80}
//                 alt=""
//               />
//               <span>{step.label}</span>
//             </div>
//           )}
//         </div>
//       ))}
//       {/* 🔒 HEADINGS / PARAGRAPH / QUOTE — UNCHANGED */}
//       {/* Headings and paragraphs to mirror the provided mock */}
//       <div
//         style={{
//           position: "absolute",
//           top: "0",
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
//           padding: breakpoint !== "desktop" ? "80px 20px" : "150px 20px",
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
//     </section>
//   );
// };

// export default DatesTimeline;


// 

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPContext } from "../hooks/useGSAPContext";

gsap.registerPlugin(ScrollTrigger);

const DOT_SIZE = 36;

const TIMELINE_STEPS = [
  {
    progress: 0.28,
    label: "1. In a large, chilled bowl, combine very cold heavy cream",
    imageKey: "date1",
    color: "#000",
  },
  {
    progress: 0.46,
    label: "2. In a large, chilled bowl, combine very cold heavy cream",
    imageKey: "date2",
    color: "#FFD93D",
  },
  {
    progress: 0.68,
    label: "3. In a large, chilled bowl, combine very cold heavy cream",
    imageKey: "date3",
    color: "#6BCB77",
  },
  {
    progress: 0.88,
    label: "Final",
    imageKey: "date4",
    color: "#4D96FF",
    final: true,
  },
];

const DatesTimeline = ({
  productConfig,
  onOpenDetails,
  breakpoint: propBreakpoint,
}) => {
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const itemRefs = useRef([]);
  const activeStepRef = useRef(-1);

  // 🔥 Used ONLY for velocity (not position)
  const prevTargetRef = useRef({ x: 0, y: 0 });
  const [breakpoint, setBreakpoint] = useState(propBreakpoint || "desktop");

  useEffect(() => {
    if (propBreakpoint) {
      setBreakpoint(propBreakpoint);
    }
  }, [propBreakpoint]);
  useEffect(() => {
    const updateBreakpoint = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 768) {
        setBreakpoint("mobile");
      } else if (viewportWidth < 1024) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, [propBreakpoint]);

  useGSAPContext(() => {
    const wrapper = wrapperRef.current;
    const path = pathRef.current;
    const svg = svgRef.current;
    const dot = dotRef.current;

    if (!wrapper || !path || !svg || !dot) return;

    const pathLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    ScrollTrigger.create({
      trigger: wrapper,
      start: breakpoint === "mobile" ? "top 10%" : "top 35%",
      end: breakpoint === "mobile" ? "+=1200" : "+=1600",
      scrub: true,
      invalidateOnRefresh: true,

      onUpdate: (self) => {
        const p = self.progress;
        const rect = wrapper.getBoundingClientRect();

        /* DRAW PATH */
        gsap.set(path, {
          strokeDashoffset: pathLength * (1 - p),
        });

        /* EXACT PATH POSITION (NO LAG) */
        const pt = path.getPointAtLength(p * pathLength);
        const sp = svg.createSVGPoint();
        sp.x = pt.x;
        sp.y = pt.y;
        const screen = sp.matrixTransform(path.getScreenCTM());

        const x = screen.x - rect.left - DOT_SIZE / 2;
        const y = screen.y - rect.top - DOT_SIZE / 2;

        /* VELOCITY (for jelly only) */
        const dx = x - prevTargetRef.current.x;
        const dy = y - prevTargetRef.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);

        prevTargetRef.current.x = x;
        prevTargetRef.current.y = y;

        /* JELLY DEFORMATION */
        const squash = gsap.utils.clamp(0, 0.45, speed / 20);

        gsap.set(dot, {
          x,
          y,
          scaleX: 1 + squash,
          scaleY: 1 - squash * 0.7,
          rotate: (Math.atan2(dy, dx) * 180) / Math.PI,
          transformOrigin: "50% 50%",
          willChange: "transform",
        });

        /* COLOR CHANGE */
        TIMELINE_STEPS.forEach((step, i) => {
          if (p >= step.progress && activeStepRef.current !== i) {
            activeStepRef.current = i;
            gsap.to(dot, {
              backgroundColor: step.color,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });

        /* TIMELINE ITEMS */
        TIMELINE_STEPS.forEach((step, i) => {
          const el = itemRefs.current[i];
          if (!el) return;

          const active = p >= step.progress;

          const mp = path.getPointAtLength(step.progress * pathLength);
          const sp2 = svg.createSVGPoint();
          sp2.x = mp.x;
          sp2.y = mp.y;
          const screen2 = sp2.matrixTransform(path.getScreenCTM());

          const isLeft = i % 2 === 1;
          const isSmall = breakpoint !== "desktop";
          const offsetX = isLeft ? (isSmall ? -100 : -140) : (isSmall ? 20 : 40);

          gsap.set(el, {
            x: screen2.x - rect.left + offsetX,
            y: screen2.y - rect.top - 10,
          });

          gsap.to(el, {
            autoAlpha: active ? 1 : 0,
            scale: active ? 1 : 0.85,
            duration: 0.35,
            ease: "power3.out",
          });
        });
      },
    });
  }, []);

  return (
    <section
      ref={wrapperRef}
      style={{
        position: "relative",
        height: "1700px",
        marginTop: breakpoint === "mobile" ? "100px" : "200px",
        ...(breakpoint !== 'mobile' ? { maxWidth: '1152px', marginLeft: 'auto', marginRight: 'auto' } : {}),
      }}
    >
      {/* SVG */}
      <svg
        ref={svgRef}
        viewBox="0 0 934 1281"
        preserveAspectRatio={breakpoint === "desktop" ? "xMidYMid meet" : "none"}
        style={{ width: "100%", height: "100%", position: "absolute"}}
      >
        <path
          ref={pathRef}
          d="M2.5 0C2.5 310.216 373 578.5 485.5 554C598 529.5 553.5 331 464 392C374.5 453 492.5 588.5 272.5 671C52.5 753.5 52.5 973 272.5 1019.5C492.5 1066 844.5 784.133 907.5 845C970.5 905.867 892 975.5 828.5 1062C765 1148.5 800.5 1279.5 800.5 1279.5"
          stroke="#000"
          strokeWidth="4"
          fill="none"
        />
      </svg>

      {/* JELLY DOT */}
      <div
        ref={dotRef}
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: "50%",
          backgroundColor: "#000",
          position: "absolute",
          zIndex: 5,
        }}
      />

      {/* TIMELINE ITEMS */}
      {TIMELINE_STEPS.map((step, i) => (
        <div
          key={i}
          ref={(el) => (itemRefs.current[i] = el)}
          style={{
            position: "absolute",
            opacity: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: 4,
            pointerEvents: "none",
          }}
        >
          {breakpoint === "mobile" ? (
            <div className="flex flex-col items-start gap-2">
              <img
                src={productConfig.images[step.imageKey]}
                width={step.final ? 48 : 80}
                alt=""
              />
              <span>{step.label}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <img
                src={productConfig.images[step.imageKey]}
                width={step.final ? 48 : 80}
                alt=""
              />
              <span>{step.label}</span>
            </div>
          )}
        </div>
      ))}
      {/* 🔒 HEADINGS / PARAGRAPH / QUOTE — UNCHANGED */}
      {/* Headings and paragraphs to mirror the provided mock */}
      <div
        style={{
          position: "absolute",
          top: "0",
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
          padding: breakpoint !== "desktop" ? "80px 20px" : "150px 20px",
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
    </section>
  );
};

export default DatesTimeline;