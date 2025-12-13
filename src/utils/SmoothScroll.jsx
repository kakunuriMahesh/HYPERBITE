// import { useEffect } from "react";
// import Lenis from "@studio-freight/lenis";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// let lenisInstance = null;

// export const SmoothScroll = () => {
//   useEffect(() => {
//     if (lenisInstance) return;

//     const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

//     lenisInstance = new Lenis({
//       smoothWheel: true,
//       smoothTouch: true,
//       lerp: isTouch ? 0.08 : 0.1,
//       duration: isTouch ? 0.6 : 0.1,
//       wheelMultiplier: 1,
//       touchMultiplier: 1.2, // responsive flick
//       easing: (t) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2)/2,
//       normalizeWheel: true,       // normalize scroll delta
//       infinite: false,
//       gestureOrientation: "vertical",
//     });

//     lenisInstance.on("scroll", ScrollTrigger.update);

//     const raf = (time) => {
//       lenisInstance.raf(time);
//       requestAnimationFrame(raf);
//     };
//     requestAnimationFrame(raf);

//     requestAnimationFrame(() => ScrollTrigger.refresh());

//     const handleResize = () => ScrollTrigger.refresh();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       if (lenisInstance) {
//         lenisInstance.destroy();
//         lenisInstance = null;
//       }
//     };
//   }, []);

//   return null;
// };

// export const getLenis = () => lenisInstance;

// export const scrollTo = (target, options = {}) => {
//   if (lenisInstance) {
//     lenisInstance.scrollTo(target, options);
//   } else {
//     if (typeof target === "number") {
//       window.scrollTo({ top: target, behavior: "smooth" });
//     } else {
//       const el = typeof target === "string" ? document.querySelector(target) : target;
//       if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }
// };


import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export const SmoothScroll = () => {
  useEffect(() => {
    if (lenisInstance) return;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Lenis configuration
    lenisInstance = new Lenis({
      smoothWheel: true,
      smoothTouch: true,
      lerp: 0.08,
      duration: isTouch ? 0.6 : 0.1,
      wheelMultiplier: 0.1,      // Limit desktop scroll speed
      touchMultiplier: 0.1,      // Limit mobile scroll speed
      normalizeWheel: true,
      infinite: false,
      easing: (t) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2)/2,
    });

    // Sync ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Cap scroll delta manually for section-based scroll
    const capDelta = (event) => {
      const maxScroll = window.innerHeight * 0.1; // max 15% per gesture
      if (event.deltaY > maxScroll) event.deltaY = maxScroll;
      if (event.deltaY < -maxScroll) event.deltaY = -maxScroll;
    };

    // Intercept wheel events
    window.addEventListener("wheel", capDelta, { passive: false });
    window.addEventListener("touchmove", capDelta, { passive: false });

    // RAF loop
    const raf = (time) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", capDelta);
      window.removeEventListener("touchmove", capDelta);
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
    };
  }, []);

  return null;
};

// Getter for Lenis
export const getLenis = () => lenisInstance;

// Unified scrollTo
export const scrollTo = (target, options = {}) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options);
  } else {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};
