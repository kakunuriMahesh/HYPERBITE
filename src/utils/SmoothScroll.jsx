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

    if (mobile) {
      // Mobile: Use native smooth scrolling (most reliable)
      document.body.style.overflow = "auto";
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflow = "auto";
      document.documentElement.style.overflowY = "auto";
      document.body.style.scrollBehavior = "smooth";
      document.documentElement.style.scrollBehavior = "smooth";

      const handleScroll = () => ScrollTrigger.update();
      const handleResize = () => ScrollTrigger.refresh();

      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }

    // Desktop: Use Lenis smooth scroll
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      infinite: false,
      lerp: 0.1,
    });

    lenisInstance.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
  if (isMobile()) {
    // Mobile: Use native smooth scroll
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else if (lenisInstance) {
    // Desktop: Use Lenis
    lenisInstance.scrollTo(target, options);
  }
};

