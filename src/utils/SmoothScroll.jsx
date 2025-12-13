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

    // Lenis config
    lenisInstance = new Lenis({
      smoothWheel: true, // Desktop smooth
      smoothTouch: true, // Mobile smooth
      lerp: isTouch ? 0.06 : 0.1,       // Mobile lighter smoothing
      duration: isTouch ? 0.6 : 0.1,    // Mobile slightly slower for natural feel
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
    });

    // Update ScrollTrigger on scroll
    lenisInstance.on("scroll", ScrollTrigger.update);

    // GSAP ticker
    const ticker = (time) => lenisInstance.raf(time * 1000);
    gsap.ticker.add(ticker);

    // Refresh ScrollTrigger after Lenis initializes
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(ticker);
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
    };
  }, []);

  return null;
};

export const getLenis = () => lenisInstance;

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
