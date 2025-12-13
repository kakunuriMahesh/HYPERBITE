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

    lenisInstance = new Lenis({
      smoothWheel: true,
      smoothTouch: true,
      lerp: isTouch ? 0.08 : 0.1,
      duration: isTouch ? 0.7 : 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1, // base multiplier
      easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2)/2,
      infinite: false,
      // Clamp scroll delta on mobile
      normalizeWheel: true,
      gestureOrientation: "vertical",
      // Intercept scroll for hard flicks
      maxDelta: isTouch ? window.innerHeight * 0.1 : null // max 15% of viewport
    });

    // Update ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

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
