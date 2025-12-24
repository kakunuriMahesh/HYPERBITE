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
//           const offsetX = isLeft ? (isSmall ? -100 : -140) : isSmall ? 20 : 40;

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
//         height: breakpoint === "mobile" ? '1700px' : "400vh",
//         marginTop: breakpoint === "mobile" ? "100px" : "200px",
//         ...(breakpoint !== "mobile"
//           ? { maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }
//           : {}),
//       }}
//     >
//       {/* SVG */}
//       {/* <svg
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
//       </svg> */}
//       <svg
//         ref={svgRef}
//         style={{ width: "100%", height: "100%", position: "absolute" }}
//         viewBox="0 0 990 3930"
//         fill="none"
//         // xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           ref={pathRef}
//           d="M2.50061 2.50049L73.5006 161.5C84.5006 177 90.5006 207.5 152.001 287C249.454 412.977 359.501 517.5 382.501 550.5C405.501 583.5 398.804 594.687 409.251 623C419.697 651.314 388.834 713.834 436.001 695.5C483.167 677.167 566.401 663.7 522.001 756.5C477.601 849.3 568.374 1038.16 615.001 963C630.116 938.636 605.901 922.9 635.501 892.5C665.101 862.1 695.001 845 706.501 838.5C718.001 832 737.751 823.401 756.501 818C772.327 813.442 799.501 812 811.501 809.5C823.501 807 851.501 818 851.501 818C851.501 818 873.31 825.905 887.001 838.5C906.854 856.766 911.334 888.334 913.001 902.5C914.667 916.667 897.314 937.985 880.501 955.5C865.158 971.483 853.313 977.143 834.001 988C811.651 1000.57 798.367 1007.25 773.501 1013.5C752.525 1018.77 740.121 1020.58 718.501 1020C694.46 1019.35 679.143 1019.96 658.001 1008.5C644.11 1000.97 634.001 987 630.001 977.5C626.001 968 631.1 952.642 635.501 937.5C641.742 916.026 646.83 902.955 662.501 887C673.127 876.181 681.572 872.927 694.501 865C713.932 853.088 724.785 845.421 746.501 838.5C767.392 831.842 780.077 829.604 802.001 830C821.611 830.355 833.066 831.801 851.501 838.5C866.279 843.871 876.789 845.543 887.001 857.5C898.845 871.37 899.501 902.5 899.501 902.5L874.501 943.5C870.501 950.167 858.801 965.4 844.001 973C829.201 980.6 790.834 996.5 773.501 1003.5L718.501 1008.5C718.501 1008.5 688.425 1013.39 674.001 1003.5C653.998 989.791 654.194 967.45 658.001 943.5C660.416 928.306 665.229 920.14 674.001 907.5C686.815 889.035 698.899 881.999 718.501 871C745.354 855.933 784.501 851.5 794.501 850C804.501 848.5 835.403 841.849 851.501 857.5C865.898 871.499 866.75 887.684 863.501 907.5C857.905 941.626 849.069 903.068 819.501 921C766.139 953.362 866.061 834.75 907.501 850C936.37 860.625 943.301 884.4 950.501 916C957.701 947.6 953.501 1010.83 950.501 1038.5C947.501 1066.17 939.158 1071.21 926.501 1089C907.936 1115.1 894.767 1134.57 863.501 1141.5C821.666 1150.78 918.935 1097.3 933.501 1057C943.454 1029.46 942.001 982.5 942.001 982.5C947.001 929.5 931.001 860 919.501 886.5C908.641 911.525 949.082 955.039 926.001 940.5C922.129 938.062 921.401 937 917.001 933C912.601 929 910.805 934.403 909.001 937.5C906.706 941.439 910.22 944.509 911.001 949C911.782 953.492 911.001 966.5 911.001 966.5C911.334 968.334 910.601 971.1 905.001 967.5C899.401 963.9 899.001 971.334 899.501 975.5L905.001 988C908.501 995 913.901 1007.9 907.501 1003.5C899.501 998 889.501 983.5 880.501 975.5C873.301 969.1 853.167 984.167 844.001 992.5L819.501 1003.5V1024.5V1032.5C819.001 1033.83 816.701 1035 811.501 1029C804.501 1021.5 799.501 1016 799.001 1022.5C798.501 1029 807.501 1042 799.001 1034.5C792.201 1028.5 786.501 1024 784.501 1022.5L770.501 1020H756.501L733.001 1022.5L722.501 1032.5V1044.5L724.501 1053.5C724.501 1053.5 725.729 1056.17 726.001 1058C726.931 1064.28 714.501 1046.5 714.501 1046.5C714.667 1044.83 713.301 1040.1 706.501 1034.5C699.701 1028.9 696.667 1032.17 696.001 1034.5C695.334 1036.83 683.001 1026 683.001 1026C683.001 1026 680.866 1023.41 679.001 1022.5C673.286 1019.71 682.001 1038.5 682.001 1038.5C682.001 1038.5 688.667 1046.83 685.001 1044.5C681.334 1042.17 672.901 1035.9 668.501 1029.5C664.101 1023.1 659.667 1018.83 658.001 1017.5C656.334 1016.17 658.001 1026 658.001 1026C658.001 1026 661.38 1030.92 662.501 1034.5C665.26 1043.33 646.001 1017.5 646.001 1017.5C642.667 1015.17 634.201 1007.3 627.001 994.5C619.801 981.7 627.661 976.998 620.001 976C615.577 975.425 609.501 980.5 609.501 980.5C609.501 980.5 580.626 982.528 582.001 994.5C582.822 1001.65 588.111 1004.36 594.001 1008.5C604.662 1016 627.001 1013.5 627.001 1013.5C627.001 1013.5 611.965 1020.5 617.001 1029.5C623.314 1040.79 609.625 1048.26 622.001 1044.5C634.606 1040.67 635.001 1019.5 642.501 1024.5C650.001 1029.5 640.866 1048.51 646.001 1062.5C655.143 1087.41 696.001 1108.5 696.001 1108.5L766.501 1145.5C766.501 1145.5 801.652 1156.1 830.001 1145.5C908.041 1116.32 890.705 900.521 825.001 933C819.267 935.835 800.474 957.713 794.501 960C787.846 962.55 763.554 977.982 756.501 979C743.29 980.908 731.848 982.656 718.501 982.5C706.512 982.361 698.201 985.3 688.001 979C680.936 974.638 681.589 966.369 674.001 963C660.426 956.976 639.501 979 639.501 979L601.001 1024.5V1053.5L607.501 1089C607.501 1089 611.304 1131.93 607.501 1159C600.08 1211.81 577.535 1236.91 552.501 1284C502.948 1377.21 230.501 1494.83 392.001 1501.5C553.501 1508.17 814.201 1544.7 565.001 1637.5C315.801 1730.3 234.834 1819.33 227.501 1856.5C220.167 1893.67 373.513 1971.81 317.501 1968.5C302.371 1967.61 299.136 1967.81 284.001 1967C265.071 1965.99 236.501 1977 236.501 1977C229.167 1980 211.101 1989.1 197.501 2001.5C180.501 2017 162.501 2041.5 164.001 2053.5C165.201 2063.1 168.501 2066.83 170.001 2067.5C171.501 2068.17 183.059 2070.69 191.001 2067.5C211.679 2059.19 231.834 2049 246.001 2049.5C246.001 2049.5 292.801 2055.5 310.001 2047.5C331.501 2037.5 339.501 2027 344.501 2029C348.501 2030.6 352.834 2036.17 352.001 2041C350.834 2045 346.601 2054 339.001 2062C329.501 2072 317.001 2076.5 294.001 2088C271.201 2096.8 227.501 2098.67 208.501 2098.5L179.501 2088C179.501 2088 166.688 2083.92 164.001 2077C160.02 2066.75 172.275 2061.79 179.501 2053.5C193.951 2036.93 226.501 2022.5 226.501 2022.5L258.001 2001.5L284.001 1985.5C284.001 1985.5 328.156 1966.33 322.001 1980C320.956 1982.32 319.448 1983.14 318.501 1985.5C317.972 1986.82 317.195 1987.61 317.501 1989C317.888 1990.76 319.396 1991.18 321.001 1992C322.947 1992.99 326.501 1993 326.501 1993L339.001 1984.5L347.001 1983.5C347.001 1983.5 351.145 1989.15 352.001 1992C352.953 1995.18 352.521 1999.23 351.001 2002.18C349.159 2005.75 339.436 2016.61 334.501 2011.18C332.794 2009.3 333.997 2009.76 333.001 2006.5C332.27 2004.11 344.748 2005.44 343.501 1999.5C342.873 1996.52 346.232 1993.36 343.501 1992C337.773 1989.15 327.001 2000.5 327.001 2000.5L324.001 2001.5L318.501 2000.5C317.501 2000.5 312.801 1996.8 310.001 1994C306.801 1990.4 313.822 1988.29 312.001 1986C309.811 1983.24 309.501 1983 303.001 1985.5C300.225 1986.57 289.501 1992 289.501 1992L282.001 1997L256.001 2015C256.001 2015 244.47 2024.06 236.501 2029C227.888 2034.33 221.957 2035.42 213.501 2041C206.882 2045.37 193.765 2045.89 196.001 2053.5C198.405 2061.68 218.501 2047.5 218.501 2047.5L239.001 2033.5L262.501 2019C262.501 2019 276.312 2009.31 286.501 2006.5C295.38 2004.05 300.959 2002.74 310.001 2004.5C316.872 2005.84 326.501 2011.5 326.501 2011.5C326.501 2011.5 330.383 2016.3 331.001 2020C331.322 2021.93 330.624 2023.08 331.001 2025C332.839 2034.37 351.334 2009.67 352.001 2012.5C352.667 2015.33 355.401 2021.8 361.001 2025C368.001 2029 360.001 2020.5 380.001 2012.5C400.001 2004.5 401.001 2000.5 428.501 1998C450.501 1996 470.667 1997.17 478.001 1998C485.167 1998 500.501 1999.7 504.501 2006.5C509.501 2015 510.001 2016.5 504.501 2025C500.101 2031.8 477.001 2049.5 466.001 2057.5L440.501 2067.5C430.667 2067.17 406.601 2066.06 397.001 2062.46C387.401 2058.86 375.334 2050.83 369.501 2047.5C369.501 2047.5 361.459 2041.22 361.001 2035.5C360.191 2025.38 383.501 2022.5 383.501 2022.5L405.001 2011.5L440.501 2006.5H466.001H486.001C486.001 2006.5 495.551 2007.83 497.501 2012.5C499.473 2017.23 493.501 2025 493.501 2025L478.001 2035.5L444.501 2047.5L413.501 2044C413.501 2044 398.322 2037.34 394.001 2041C388.65 2045.53 416.501 2053.5 416.501 2053.5C416.501 2053.5 429.318 2054.76 437.001 2057.5C458.031 2065 380.001 2059.5 380.001 2059.5L348.501 2067.5C346.667 2068.33 339.301 2069.9 334.501 2075.5C329.701 2084.3 329.819 2085.5 329.501 2089C328.001 2105.5 344.534 2117.77 365.001 2133C386.501 2149 385.834 2143.67 394.001 2147.5L428.501 2158C433.667 2159.83 451.501 2162.4 463.501 2152C475.501 2141.6 481.167 2129.5 482.501 2123.5C483.834 2117.5 475.001 2103.5 463.501 2092C452.001 2080.5 450.101 2081 440.501 2077C414.101 2070.2 397.167 2071 391.001 2070.67C391.001 2070.67 346.35 2067.77 352.001 2082.67C357.413 2096.94 389.001 2083 389.001 2083C389.001 2083 412.497 2080.73 426.001 2086C437.102 2090.34 451.001 2103.5 451.001 2103.5C451.001 2103.5 469.456 2116.35 466.001 2126.5C464.566 2130.72 459.001 2135.5 459.001 2135.5C454.667 2138.5 445.701 2143.8 416.501 2133C387.301 2122.2 365.667 2108.83 358.501 2103.5C358.501 2103.5 350.839 2087.78 342.001 2088C329.635 2088.32 357.688 2110.72 348.501 2119C339.415 2127.19 330.167 2110.67 318.501 2110C306.834 2109.33 279.001 2108.4 249.001 2110C219.001 2111.6 208.501 2110 194.001 2121.5C179.501 2133 196.368 2173.99 231.501 2196C255.004 2210.73 274.578 2201.34 301.501 2208C388.227 2229.47 424.298 2274.13 504.501 2313.5C603.335 2362.01 680.035 2355.89 761.001 2430.5C915.044 2572.45 957.834 2886.17 863.501 2957C769.167 3027.83 633.201 3175.7 844.001 3200.5C1054.8 3225.3 986.834 3360.17 926.501 3424.5C866.167 3488.83 669.939 3413.95 712.001 3525C739.887 3598.62 870.256 3605.28 844.001 3679.5C818.001 3753 461.427 3380.99 485.501 3583C497.001 3679.5 569.493 3596.69 635.501 3663.5C677.686 3706.2 640.379 3791.04 691.501 3822.5C755.7 3862.01 771.108 3853.79 844.001 3873C881.236 3882.81 926.501 3927 926.501 3927"
//           stroke="black"
//           stroke-width="5"
//           stroke-linecap="round"
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

const DOT_SIZE_DESKTOP = 36;
const DOT_SIZE_MOBILE = 24;

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
  const [dotSize, setDotSize] = useState(DOT_SIZE_DESKTOP);

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
        setDotSize(DOT_SIZE_MOBILE);
      } else if (viewportWidth < 1024) {
        setBreakpoint("tablet");
        setDotSize(DOT_SIZE_MOBILE); // Similar for tablet
      } else {
        setBreakpoint("desktop");
        setDotSize(DOT_SIZE_DESKTOP);
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
      end: breakpoint === "mobile" ? "+=3000" : "+=4000", // Increased for slower animation
      scrub: 1, // Smoother scrub for fluid feel
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

        const x = screen.x - rect.left - dotSize / 2;
        const y = screen.y - rect.top - dotSize / 2;

        /* VELOCITY (for jelly only) */
        const dx = x - prevTargetRef.current.x;
        const dy = y - prevTargetRef.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);

        prevTargetRef.current.x = x;
        prevTargetRef.current.y = y;

        /* ENHANCED JELLY DEFORMATION - More fluid/liquid feel */
        const squash = gsap.utils.clamp(0, 0.6, speed / 15); // Increased max squash and sensitivity for more liquid effect

        gsap.set(dot, {
          x,
          y,
          scaleX: 1 + squash * 1.2, // More horizontal stretch
          scaleY: 1 - squash * 0.8, // More vertical squash
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
          const offsetX = isLeft ? (isSmall ? -80 : -140) : isSmall ? 16 : 40; // Adjusted for better mobile fit

          gsap.set(el, {
            x: screen2.x - rect.left + offsetX,
            y: screen2.y - rect.top - (isSmall ? 8 : 10),
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
  }, [breakpoint, dotSize]);

  return (
    <section
      ref={wrapperRef}
      style={{
        position: "relative",
        height: "400vh", // Consistent tall height for slow scroll
        marginTop: breakpoint === "mobile" ? "100px" : "200px",
        ...(breakpoint !== "mobile"
          ? { maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }
          : {}),
      }}
    >
      {/* SVG */}
      <svg
        ref={svgRef}
        viewBox="0 0 990 3930"
        preserveAspectRatio={breakpoint === "desktop" ? "xMidYMid meet" : "none"}
        style={{ width: "100%", height: "100%", position: "absolute"}}
        fill="none"
      >
        <path
          ref={pathRef}
          d="M2.00049 2.00049L73.0005 161C84.0005 176.5 90.0005 207 151.5 286.5C248.954 412.477 359 517 382 550C405 583 398.304 594.187 408.75 622.5C419.197 650.814 388.334 713.334 435.5 695C482.667 676.667 565.9 663.2 521.5 756C477.1 848.8 567.874 1037.66 614.5 962.5C629.616 938.136 605.4 922.4 635 892C664.6 861.6 694.5 844.5 706 838C717.5 831.5 737.251 822.901 756 817.5C771.826 812.942 799 811.5 811 809C823 806.5 851 817.5 851 817.5C851 817.5 872.81 825.405 886.5 838C906.354 856.266 910.834 887.834 912.5 902C914.167 916.167 896.814 937.485 880 955C864.658 970.983 852.813 976.643 833.5 987.5C811.151 1000.07 797.867 1006.75 773 1013C752.025 1018.27 739.621 1020.08 718 1019.5C693.959 1018.85 678.643 1019.46 657.5 1008C643.61 1000.47 633.5 986.5 629.5 977C625.5 967.5 630.6 952.142 635 937C641.242 915.526 646.33 902.455 662 886.5C672.627 875.681 681.072 872.427 694 864.5C713.432 852.588 724.284 844.921 746 838C766.892 831.342 779.577 829.104 801.5 829.5C821.111 829.855 832.566 831.301 851 838C865.779 843.371 876.289 845.043 886.5 857C898.345 870.87 899 902 899 902L874 943C870 949.667 858.3 964.9 843.5 972.5C828.7 980.1 790.334 996 773 1003L718 1008C718 1008 687.925 1012.89 673.5 1003C653.497 989.291 653.694 966.95 657.5 943C659.915 927.806 664.729 919.64 673.5 907C686.315 888.535 698.399 881.499 718 870.5C744.854 855.433 784 851 794 849.5C804 848 834.903 841.349 851 857C865.398 870.999 866.249 887.184 863 907C857.405 941.126 848.569 902.568 819 920.5C765.639 952.862 865.561 834.25 907 849.5C935.87 860.125 942.8 883.9 950 915.5C957.2 947.1 953 1010.33 950 1038C947 1065.67 938.658 1070.71 926 1088.5C907.436 1114.6 894.267 1134.07 863 1141C821.166 1150.28 918.435 1096.8 933 1056.5C942.954 1028.96 941.5 982 941.5 982C946.5 929 930.5 859.5 919 886C908.141 911.025 948.582 954.539 925.5 940C921.629 937.562 920.9 936.5 916.5 932.5C912.1 928.5 910.305 933.903 908.5 937C906.206 940.939 909.719 944.009 910.5 948.5C911.282 952.992 910.5 966 910.5 966C910.834 967.834 910.1 970.6 904.5 967C898.9 963.4 898.5 970.834 899 975L904.5 987.5C908 994.5 913.4 1007.4 907 1003C899 997.5 889 983 880 975C872.8 968.6 852.667 983.667 843.5 992L819 1003V1024V1032C818.5 1033.33 816.2 1034.5 811 1028.5C804 1021 799 1015.5 798.5 1022C798 1028.5 807 1041.5 798.5 1034C791.7 1028 786 1023.5 784 1022L770 1019.5H756L732.5 1022L722 1032V1044L724 1053C724 1053 725.229 1055.67 725.5 1057.5C726.431 1063.78 714 1046 714 1046C714.167 1044.33 712.8 1039.6 706 1034C699.2 1028.4 696.167 1031.67 695.5 1034C694.834 1036.33 682.5 1025.5 682.5 1025.5C682.5 1025.5 680.366 1022.91 678.5 1022C672.786 1019.21 681.5 1038 681.5 1038C681.5 1038 688.167 1046.33 684.5 1044C680.834 1041.67 672.4 1035.4 668 1029C663.6 1022.6 659.167 1018.33 657.5 1017C655.834 1015.67 657.5 1025.5 657.5 1025.5C657.5 1025.5 660.88 1030.42 662 1034C664.76 1042.83 645.5 1017 645.5 1017C642.167 1014.67 633.7 1006.8 626.5 994C619.3 981.2 627.16 976.498 619.5 975.5C615.077 974.925 609 980 609 980C609 980 580.126 982.028 581.5 994C582.322 1001.15 587.611 1003.86 593.5 1008C604.161 1015.5 626.5 1013 626.5 1013C626.5 1013 611.465 1020 616.5 1029C622.814 1040.29 609.125 1047.76 621.5 1044C634.106 1040.17 634.5 1019 642 1024C649.5 1029 640.366 1048.01 645.5 1062C654.643 1086.91 695.5 1108 695.5 1108L766 1145C766 1145 801.152 1155.6 829.5 1145C907.541 1115.82 890.205 900.021 824.5 932.5C818.767 935.335 799.973 957.213 794 959.5C787.346 962.05 763.054 977.482 756 978.5C742.789 980.408 731.348 982.156 718 982C706.012 981.861 697.701 984.8 687.5 978.5C680.436 974.138 681.089 965.869 673.5 962.5C659.926 956.476 639 978.5 639 978.5L600.5 1024V1053L607 1088.5V1158.5L552 1283.5L391.5 1501C553 1507.67 813.7 1544.2 564.5 1637C315.3 1729.8 238.334 1827.33 231 1864.5L321 1976.5L283.5 1966.5L236 1976.5C228.667 1979.5 210.6 1988.6 197 2001C180 2016.5 162 2041 163.5 2053C164.7 2062.6 168 2066.33 169.5 2067L189 2057L245.5 2049C259.667 2049.5 292.3 2048.5 309.5 2040.5C331 2030.5 340.5 2016.5 345.5 2018.5C349.5 2020.1 348.834 2030.17 348 2035C346.834 2039 342.6 2049 335 2057C325.5 2067 316.5 2076 293.5 2087.5C270.7 2096.3 227 2098.17 208 2098L179 2087.5L163.5 2076.5L179 2053L226 2022L257.5 2001L283.5 1985L321.5 1979.5L318 1985L313.5 1989.5L317 1992.5H326L335.5 1995L341.5 1999.5L345.5 2006V2014.5L336.5 2019.5L338.5 2011L334.5 2006L330.5 2002L326.5 2000L323.5 1997.5L318 1996.5C317 1996.5 314.3 1995.8 311.5 1993C308.3 1989.4 310.167 1986.5 311.5 1985.5L308 1984L301 1987L281.5 1996.5L255.5 2014.5L236 2028.5L213 2040.5L197 2053L218 2047L238.5 2033L262 2018.5L286 2006L309.5 2004L326 2011L330.5 2019.5V2024.5L351.5 2012C352.167 2014.83 354.9 2021.3 360.5 2024.5C367.5 2028.5 359.5 2020 379.5 2012C399.5 2004 400.5 2000 428 1997.5C450 1995.5 470.167 1996.67 477.5 1997.5C484.667 1997.5 500 1999.2 504 2006C509 2014.5 509.5 2016 504 2024.5C499.6 2031.3 476.5 2049 465.5 2057L440 2067C430.167 2066.67 408.1 2065.1 398.5 2061.5C388.9 2057.9 374.834 2050.33 369 2047L360.5 2035L383 2022L404.5 2011L440 2006H465.5H485.5L497 2012L493 2024.5L477.5 2035L444 2047L413 2049H398.5L416 2053L436.5 2057L379.5 2061.5L348 2067C346.167 2067.83 341.3 2070.9 336.5 2076.5C331.7 2085.3 334.5 2094.5 336.5 2098C333.334 2094.5 331.2 2092.3 348 2111.5C364.8 2130.7 385.334 2143.17 393.5 2147L428 2157.5C433.167 2159.33 446.5 2160.4 458.5 2150C470.5 2139.6 476.167 2125 477.5 2119L458.5 2093C456.334 2089.17 449.6 2080.5 440 2076.5C413.6 2069.7 394.667 2067.33 388.5 2067L349.5 2079L388.5 2076.5L425.5 2085.5L450.5 2103L465.5 2126V2137C461.167 2140 445.2 2143.3 416 2132.5C386.8 2121.7 365.167 2108.33 358 2103L341.5 2087.5L348 2118.5L318 2109.5C306.334 2108.83 275.5 2107.9 245.5 2109.5C215.5 2111.1 195.334 2102.5 189 2098L231 2195.5L301 2207.5L504 2313L760.5 2430L863 2956.5C768.667 3027.33 632.7 3175.2 843.5 3200C1054.3 3224.8 986.334 3359.67 926 3424L666.5 3582.5L843.5 3679L379.5 3803H620L666.5 3949.5L843.5 3872.5L926 3926.5"
          stroke="black"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>

      {/* JELLY DOT */}
      <div
        ref={dotRef}
        style={{
          width: dotSize,
          height: dotSize,
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
