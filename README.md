# Parallax Animation Test

A React project to test parallax and scroll animations using GSAP and ScrollTrigger.

## Installation

1. Install dependencies:
```bash
npm install
```

## Setup

1. **Download the packet image** (optional - a placeholder SVG is included):
   - URL: https://i.ibb.co/5G4Z6hx/protein-bar.png
   - Save it as `public/packet.png`
   - If you download the PNG, update the image sources in `HeroTest.jsx` and `RoastedTest.jsx` from `/packet.svg` to `/packet.png`
   
   **Note**: A placeholder SVG (`packet.svg`) is included and will work for testing. Replace it with the PNG when ready.

## Run

```bash
npm run dev
```

## Features

- **Hero Section**: Floating letters with parallax effect + product packet animation
- **Roasted Section**: Letters fly in from sides, gather like a mountain, then packet slides in behind

## Technologies

- React
- Vite
- GSAP (GreenSock Animation Platform)
- ScrollTrigger
- Lenis (Smooth scrolling)

