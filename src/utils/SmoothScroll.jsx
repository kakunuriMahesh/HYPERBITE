import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let rafId = null;

const isMobile = () => {
  return window.innerWidth <= 768 || "ontouchstart" in window;
};

export const SmoothScroll = () => {
  useEffect(() => {
    if (lenisInstance) return;

    const mobile = isMobile();

    // Use Lenis for both mobile and desktop with optimized settings
    lenisInstance = new Lenis({
      duration: mobile ? 1.5 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: mobile ? true : false, // Enable smooth touch animation on mobile
      infinite: false,
      lerp: mobile ? 0.08 : 0.1, // Smoother animation on mobile
      wheelMultiplier: 1,
      touchMultiplier: mobile ? 1.5 : 2,
      touchInertiaMultiplier: mobile ? 30 : 50,
    });

    // Throttle ScrollTrigger updates on mobile for better performance
    let scrollUpdateRaf = null;
    const handleScroll = () => {
      if (mobile) {
        if (scrollUpdateRaf === null) {
          scrollUpdateRaf = requestAnimationFrame(() => {
            ScrollTrigger.update();
            scrollUpdateRaf = null;
          });
        }
      } else {
        ScrollTrigger.update();
      }
    };

    lenisInstance.on("scroll", handleScroll);

    const raf = (time) => {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    
    // Hide overflow after Lenis is initialized
    requestAnimationFrame(() => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      ScrollTrigger.refresh();
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollUpdateRaf !== null) {
        cancelAnimationFrame(scrollUpdateRaf);
        scrollUpdateRaf = null;
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return null;
};

export const getLenis = () => lenisInstance;

export const scrollTo = (target, options = {}) => {
  if (lenisInstance) {
    // Use Lenis for smooth animation on both mobile and desktop
    lenisInstance.scrollTo(target, options);
  } else {
    // Fallback to native smooth scroll
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

