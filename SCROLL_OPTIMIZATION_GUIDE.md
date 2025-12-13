# Scroll Optimization Guide

This document outlines all the optimizations implemented for buttery-smooth, premium scroll experiences.

## ✅ Implemented Optimizations

### 1. **Lenis Smooth Scroll with Inertia**

**File**: `src/utils/SmoothScroll.jsx`

- Full Lenis integration with inertia-based scrolling
- Custom easing function for premium feel: `Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- Proper RAF (RequestAnimationFrame) loop
- Integrated with GSAP ScrollTrigger via `lenisInstance.on("scroll", ScrollTrigger.update)`
- Disabled default browser scroll behavior

**Key Settings**:
```javascript
{
  duration: 1.2,          // Smooth scroll duration
  lerp: 0.1,              // Lower = smoother (interpolation factor)
  smoothTouch: false,     // Prevents momentum issues on mobile
  touchMultiplier: 2,     // Control touch sensitivity
}
```

### 2. **GSAP ScrollTrigger Integration**

**Files**: 
- `src/components/HeroBanner.jsx`
- `src/components/DatesTimeline.jsx`
- `src/hooks/useGSAPContext.js`

**Optimizations**:
- ✅ GSAP Context for automatic cleanup (prevents memory leaks)
- ✅ Proper `scrub` values (0.5 = smooth, responsive)
- ✅ `invalidateOnRefresh: true` for resize handling
- ✅ `anticipatePin: 1` for better performance
- ✅ Single `onUpdate` callback for all animations (batch updates)

### 3. **GPU Acceleration**

**All animated elements now use**:
- `transform: translate3d()` via GSAP `x`, `y` properties
- `force3D: true` for GPU rendering
- `willChange: "transform"` CSS hint
- `backfaceVisibility: "hidden"` for smoother transforms
- No `left`/`top` positioning (uses transforms only)

**Before** (causes layout shifts):
```javascript
gsap.to(element, { left: "100px", top: "200px" });
```

**After** (GPU accelerated):
```javascript
gsap.set(element, {
  x: 100,  // Uses transform: translate3d()
  y: 200,
  force3D: true,
  willChange: "transform"
});
```

### 4. **Optimized Animation Patterns**

**HeroBanner.jsx**:
- Single ScrollTrigger with batched updates
- Uses `gsap.set()` in `onUpdate` for immediate updates (no tween overhead)
- Calculates all positions once per frame
- Proper handling of date speed multipliers

**DatesTimeline.jsx**:
- Cached path length for performance
- Direct transform updates (no unnecessary tweens)
- Smooth dot following with optimized calculations

### 5. **Image Optimization**

**Files**: `src/components/NutsLayout.jsx`, `src/components/DatesTimeline.jsx`

**Implemented**:
- `loading="eager"` for above-the-fold hero images
- `loading="lazy"` for below-the-fold images
- `decoding="async"` for non-blocking image decoding
- GPU acceleration hints on images (`willChange: "transform"`)

**Recommended Image Sizes**:
- **Hero Images**: 1920x1080 (desktop), 768x1024 (tablet), 375x667 (mobile)
- **Product Images**: 800x800 (desktop), 600x600 (tablet), 400x400 (mobile)
- **Icons**: 64x64 (desktop), 48x48 (tablet), 32x32 (mobile)

**WebP Conversion** (Manual step):
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.png" alt="Description">
</picture>
```

### 6. **Mobile Optimizations**

- `smoothTouch: false` in Lenis (prevents momentum issues)
- Proper touch multiplier settings
- Responsive animation calculations
- Breakpoint-based animation end points

### 7. **Performance Settings**

**Scrub Values**:
- `scrub: 0.5` - Smooth, responsive (recommended)
- `scrub: true` - No lag, instant updates
- `scrub: 1.5+` - More laggy, less smooth (avoid)

**Easing**:
- Scroll-based animations: `ease: "none"` (linear)
- UI animations: `ease: "power2.inOut"` (smooth)

### 8. **Clean Architecture**

**Structure**:
```
src/
├── utils/
│   ├── SmoothScroll.jsx      # Lenis initialization & integration
│   └── imageOptimization.js  # Image utility functions
├── hooks/
│   └── useGSAPContext.js     # GSAP context hook for cleanup
└── components/
    ├── HeroBanner.jsx        # Optimized scroll animations
    └── DatesTimeline.jsx     # Optimized timeline animations
```

## 🎯 Best Practices Applied

### GSAP ScrollTrigger Patterns

1. **Use GSAP Context**:
```javascript
useGSAPContext(() => {
  // All animations here
  // Auto-cleanup on unmount
}, [deps]);
```

2. **Batch Updates in onUpdate**:
```javascript
ScrollTrigger.create({
  onUpdate: (self) => {
    const progress = self.progress;
    // Calculate once, update all elements
    elements.forEach(el => {
      gsap.set(el, { x: ..., y: ... });
    });
  }
});
```

3. **Use Transforms, Not Position**:
```javascript
// ❌ Bad (causes layout shifts)
gsap.to(el, { left: "100px", top: "200px" });

// ✅ Good (GPU accelerated)
gsap.set(el, { x: 100, y: 200, force3D: true });
```

### Scroll Performance Tips

1. **Avoid** `gsap.to()` in `onUpdate` - use `gsap.set()` instead
2. **Cache** calculations (path lengths, dimensions)
3. **Batch** DOM updates in single `onUpdate` callback
4. **Use** `willChange` CSS hint for animated elements
5. **Disable** default scroll: `html { overflow-y: hidden; }`

## 📊 Performance Checklist

- ✅ Lenis smooth scroll with inertia
- ✅ GSAP ScrollTrigger integration
- ✅ RAF loop for Lenis
- ✅ GPU acceleration (transforms)
- ✅ Proper cleanup (GSAP context)
- ✅ Optimized scrub values (0.5)
- ✅ Image lazy loading
- ✅ Mobile touch optimization
- ✅ No layout shifts
- ✅ Batch animation updates

## 🔧 Troubleshooting

### Issue: Animations feel laggy
**Solution**: 
- Lower scrub value (try `0.5` or `true`)
- Ensure using transforms (`x`, `y`) not `left`/`top`
- Check GPU acceleration hints are set

### Issue: Scroll feels too fast
**Solution**:
- Increase Lenis `lerp` value (try `0.15`)
- Increase `duration` in Lenis config
- Adjust ScrollTrigger `end` point

### Issue: Animations stutter on mobile
**Solution**:
- Ensure `smoothTouch: false` in Lenis
- Reduce animation complexity
- Use `willChange` sparingly (remove when not animating)

### Issue: Images causing jank
**Solution**:
- Use `loading="lazy"` for below-fold images
- Preload critical images
- Convert to WebP format
- Add `decoding="async"`

## 📝 Notes

- All scroll behavior is now handled by Lenis
- Use `scrollTo()` utility instead of `window.scrollTo()`
- GSAP Context automatically cleans up on unmount
- Mobile touch scrolling is optimized but may feel different from native

## 🚀 Next Steps (Optional)

1. **Convert PNGs to WebP** for smaller file sizes
2. **Add IntersectionObserver** for more advanced lazy loading
3. **Implement progressive image loading** (blur-up technique)
4. **Add scroll performance monitoring** (FPS tracking)
5. **Optimize image sizes** per breakpoint

