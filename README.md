# 🍔 RIMI — The Ultimate Animated Burger Experience

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger_%26_MotionPath-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-FF5D01?style=for-the-badge)](https://lenis.darkroom.engineering/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

An award-winning, immersive, and high-performance interactive burger showcase website crafted with **Next.js 16**, **React 19**, **GSAP**, and **Lenis Smooth Scroll**. Featuring scroll-driven 3D parallax physics, flight-path motion tracking, floating ingredients, and vibrant retro sticker typography.

---

## 🌟 Showstopping Animations & Features

### ✈️ 1. Global Flight Path Tracking (`TravelPage`)
- **GSAP MotionPath Integration**: An airplane navigates a custom Catmull-Rom spline SVG flight path across 300vh of vertical scroll.
- **Auto-Rotation & Physics**: The plane dynamically calculates tangent angles (`autoRotate`) along rounded curves with smooth scrub physics.
- **Dynamic Polaroid Reveals**: As the airplane approaches each turn, destination cards (**Berlin**, **London**, **New York**, **Sydney**) pop into view with springy `back.out(1.5)` elastic scaling.

### 🥬 2. Multi-Layer Ingredient Explosion (`IngredientsPage`)
- **Independent Parallax Physics**: Fresh lettuce, juicy flame-grilled meat patties, melted cheese, and ripe tomatoes float at unique parallax speeds (`scrub: 0.8` to `1.9`).
- **Curved SVG Typography**: Dynamic curved text paths with retro Modak typography and bold sticker-styled strokes.

### 🍔 3. Interactive Hero & Magnetic Controls (`HomePage`)
- **Magnetic Button Physics**: Hover-triggered GSAP elastic tweens (`back.out(3)` and `elastic.out`) with fill-up curtain effects.
- **Floating Visual Immersion**: Multi-layer smash burger floating physics synchronized with the user's viewport scroll.

### 🌊 4. Butter-Smooth Scrolling & Infinite Wave Transitions
- **Lenis Smooth Scroll**: Eliminates jerky browser scrolling for a fluid 60fps / 120fps experience.
- **Seamless Section Transitions**: Infinite SVG wave borders seamlessly connect rich color themes (warm creams, sunny yellows, deep blues, and bold reds).

---

## 🛠️ Tech Stack & Libraries

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | Modern React Server & Client architecture, image optimization with `sharp` |
| **React 19** | Ultra-fast UI engine with concurrent rendering |
| **GSAP (GreenSock)** | Timeline orchestration, `ScrollTrigger`, and `MotionPathPlugin` |
| **Lenis & Locomotive** | Smooth inertial scrolling experience |
| **Framer Motion** | Component spring transitions and layout animations |
| **Tailwind CSS v4** | Modern utility-first styling with custom font tokens |
| **TypeScript** | Type-safe development |

---

## 📁 Project Structure

```
Burger Website/
└── frontend/
    ├── app/
    │   ├── layout.tsx         # Root layout with fonts & metadata
    │   └── page.tsx           # Assembled page orchestrator
    ├── components/
    │   ├── layout/            # Navigation, Footer & Wave borders
    │   └── SmoothScroll.tsx   # Lenis smooth scroll provider
    ├── pages/
    │   ├── HomePage.tsx       # Hero section & interactive magnetic buttons
    │   ├── BurgersPage.tsx    # Menu showcase & burger carousel
    │   ├── ExperiencePage.tsx # Storytelling & scroll-triggered timelines
    │   ├── PhotoPage.tsx      # High-res photo gallery
    │   ├── IngredientsPage.tsx# Floating multi-layer parallax ingredients
    │   └── TravelPage.tsx     # Airplane GSAP flight path & city reveals
    ├── public/
    │   └── images/            # WebP optimized ingredients & assets
    └── next.config.ts         # Next.js configurations
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18.x or higher recommended)
- **npm**, **yarn**, or **pnpm**

---

### 1. Clone the Repository

```bash
git clone https://github.com/Rudra-744/AnimatedBurgersWebsite.git
cd AnimatedBurgersWebsite
```

---

### 2. Navigate to Frontend & Install Dependencies

```bash
cd frontend
npm install
```

---

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience the animations live!

---

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 🎨 Design Philosophy & Aesthetics

- **Retro-Modern Sticker Aesthetic**: Playful, vibrant colors inspired by premium fast-casual diners, combined with modern Swiss graphic layout precision.
- **Micro-Interactions**: Every button, image, and text element responds fluidly to mouse movement and scroll momentum.
- **Zero Jitter**: Hardware-accelerated CSS `will-change: transform` and GSAP context cleanup prevent memory leaks and frame drops.

---

## 👨‍💻 Author

**Rudra**  
- GitHub: [@Rudra-744](https://github.com/Rudra-744)
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/e8362a27-09ca-4ad1-b4a4-322137955188" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/f38ab38f-f2e8-4c9d-b8e5-7aa436aabe1d" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/1aebff62-4895-44b0-800f-b99a0b608a2c" />
![Uploading image.png…]()






---

⭐ *Star this repository if you love high-end web animations and creative frontend development!*
