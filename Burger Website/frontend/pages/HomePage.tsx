"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const burgersFillRef = useRef<HTMLSpanElement>(null);
  const burgersBtnRef = useRef<HTMLButtonElement>(null);
  const burgersTextRef = useRef<HTMLSpanElement>(null);
  const menuFillRef = useRef<HTMLSpanElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const menuTextRef = useRef<HTMLSpanElement>(null);

  function handleBurgersEnter() {
    gsap.killTweensOf([burgersFillRef.current, burgersBtnRef.current, burgersTextRef.current]);
    gsap.to(burgersFillRef.current, { scaleY: 1, duration: 0.4, ease: "power3.out" });
    gsap.to(burgersBtnRef.current, { y: -6, duration: 0.35, ease: "back.out(3)" });
    gsap.to(burgersTextRef.current, { color: "#ffffff", duration: 0.2, ease: "none" });
  }

  function handleBurgersLeave() {
    gsap.killTweensOf([burgersFillRef.current, burgersBtnRef.current, burgersTextRef.current]);
    gsap.to(burgersFillRef.current, { scaleY: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(burgersBtnRef.current, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    gsap.to(burgersTextRef.current, { color: "#f91814", duration: 0.25, ease: "none", delay: 0.1 });
  }

  function handleMenuEnter() {
    gsap.killTweensOf([menuFillRef.current, menuBtnRef.current, menuTextRef.current]);
    gsap.to(menuFillRef.current, { scaleY: 1, duration: 0.4, ease: "power3.out" });
    gsap.to(menuBtnRef.current, { y: -6, duration: 0.35, ease: "back.out(3)" });
    gsap.to(menuTextRef.current, { color: "#ffffff", duration: 0.2, ease: "none" });
  }

  function handleMenuLeave() {
    gsap.killTweensOf([menuFillRef.current, menuBtnRef.current, menuTextRef.current]);
    gsap.to(menuFillRef.current, { scaleY: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(menuBtnRef.current, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    gsap.to(menuTextRef.current, { color: "#1a1a1a", duration: 0.25, ease: "none", delay: 0.1 });
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4">
      {/* Brand Logo */}
      <span
        className="font-modak select-none leading-none"
        style={{
          fontSize: "clamp(2.2rem, 5vw, 4rem)",
          color: "#f91814",
          WebkitTextStroke: "3px white",
        }}
      >
        RIMI
      </span>

      {/* Nav Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* BURGERS Button */}
        <button
          ref={burgersBtnRef}
          id="nav-btn-burgers"
          onMouseEnter={handleBurgersEnter}
          onMouseLeave={handleBurgersLeave}
          className="relative overflow-hidden border-[2px] border-[#f91814] rounded-full px-5 sm:px-7 py-2 sm:py-2.5 cursor-pointer"
        >
          <span
            ref={burgersFillRef}
            aria-hidden="true"
            className="absolute inset-0 bg-[#f91814] rounded-full origin-bottom"
            style={{ transform: "scaleY(0)" }}
          />
          <span
            ref={burgersTextRef}
            className="relative z-10 font-mouse font-bold tracking-widest uppercase"
            style={{ fontSize: "clamp(0.8rem, 1.5vw, 1rem)", color: "#f91814" }}
          >
            Burgers
          </span>
        </button>

        {/* MENU Button */}
        <button
          ref={menuBtnRef}
          id="nav-btn-menu"
          onMouseEnter={handleMenuEnter}
          onMouseLeave={handleMenuLeave}
          className="relative overflow-hidden border-[2px] border-[#1a1a1a] rounded-full px-5 sm:px-7 py-2 sm:py-2.5 cursor-pointer"
        >
          <span
            ref={menuFillRef}
            aria-hidden="true"
            className="absolute inset-0 bg-[#1a1a1a] rounded-full origin-bottom"
            style={{ transform: "scaleY(0)" }}
          />
          <span
            ref={menuTextRef}
            className="relative z-10 font-mouse font-bold tracking-widest uppercase flex items-center gap-2"
            style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)", color: "#1a1a1a" }}
          >
            Menu
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true" className="shrink-0">
              <rect width="14" height="2" rx="1" fill="currentColor" />
              <rect y="4" width="14" height="2" rx="1" fill="currentColor" />
              <rect y="8" width="14" height="2" rx="1" fill="currentColor" />
            </svg>
          </span>
        </button>

      </div>
    </nav>
  );
}


// ── HomePage ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  const burgerRef = useRef<HTMLDivElement>(null);
  const sticker1Ref = useRef<HTMLDivElement>(null);
  const sticker2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // gsap.context handles automatic cleanup for React 18 strict mode
    const ctx = gsap.context(() => {
      // 1. Floating animation for burger
      gsap.to(burgerRef.current, {
        y: 10,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        duration: 2.5,
      });

      // 2. Entrance sequence for left sticker (SMASHED FRESH)
      // Original rotation is -10deg
      const tl1 = gsap.timeline({
        onComplete: () => {
          // Endless float starts after entrance
          gsap.to(sticker1Ref.current, {
            y: 8,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            duration: 2.2,
          });
        },
      });

      tl1
        .delay(0.2)
        // Wiggle (fixing itself into place)
        .to(sticker1Ref.current, { rotation: 5, duration: 0.15, ease: "power1.inOut" })
        .to(sticker1Ref.current, { rotation: -18, duration: 0.15, ease: "power1.inOut" })
        .to(sticker1Ref.current, { rotation: -10, duration: 0.15, ease: "power1.inOut" })
        // Jump up in the air
        .to(sticker1Ref.current, { y: -35, scale: 1.05, duration: 0.3, ease: "power2.out" })
        // Hit the "jumping mat" and sink downwards
        .to(sticker1Ref.current, { y: 15, scale: 0.95, duration: 0.2, ease: "power2.in" })
        // Spring back to resting position smoothly
        .to(sticker1Ref.current, { y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" });

      // 3. Entrance sequence for right sticker (BOLD FLAVOR)
      // Original rotation is 10deg
      const tl2 = gsap.timeline({
        onComplete: () => {
          // Endless float starts after entrance
          gsap.to(sticker2Ref.current, {
            y: -10,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            duration: 2.8,
          });
        },
      });

      tl2
        .delay(0.4) // Slightly delayed after the left sticker
        // Wiggle (fixing itself into place)
        .to(sticker2Ref.current, { rotation: -5, duration: 0.15, ease: "power1.inOut" })
        .to(sticker2Ref.current, { rotation: 18, duration: 0.15, ease: "power1.inOut" })
        .to(sticker2Ref.current, { rotation: 10, duration: 0.15, ease: "power1.inOut" })
        // Jump up in the air
        .to(sticker2Ref.current, { y: -35, scale: 1.05, duration: 0.3, ease: "power2.out" })
        // Hit the "jumping mat" and sink downwards
        .to(sticker2Ref.current, { y: 15, scale: 0.95, duration: 0.2, ease: "power2.in" })
        // Spring back to resting position smoothly
        .to(sticker2Ref.current, { y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <main className="bg-[#f5e3cd] overflow-hidden">
      <Navbar />

      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center"
        aria-label="Hero section"
      >
        {/* ── Layer 1: Giant "THE BURGER" text ─────────────────────────── */}
        <div
          className="absolute inset-0 z-[1] flex items-center justify-center tracking-wider pointer-events-none select-none px-[3%]"
          style={{ transform: "translateY(-15%)" }}
          aria-hidden="true"
        >
          <span
            className="font-mouse leading-none"
            style={{
              fontSize: "clamp(5rem, 32vw, 36rem)",
              color: "#f91814",
              WebkitTextStroke: "clamp(3px, 0.65vw, 8px) white",
            }}
          >
            THE
          </span>
          <span
            className="font-mouse leading-none"
            style={{
              fontSize: "clamp(5rem, 32vw, 36rem)",
              color: "#f91814",
              WebkitTextStroke: "clamp(3px, 0.65vw, 8px) white",
            }}
          >
            BURGER
          </span>
        </div>

        {/* ── Layer 2: SMASHED FRESH sticker ───────────────────────────── */}
        <div
          ref={sticker1Ref}
          className="absolute z-[5] pointer-events-none select-none"
          style={{
            top: "20%",
            left: "6%",
            transform: "rotate(-10deg)",
          }}
          aria-hidden="true"
        >
          <span
            className="font-modak block text-center leading-[0.7]"
            style={{
              fontSize: "clamp(1.2rem, 3.8vw, 4rem)",
              color: "#f4a804",
              WebkitTextStroke: "clamp(2px, 0.4vw, 5px) white",
            }}
          >
            SMASHED
            <br />
            FRESH
          </span>
        </div>

        {/* ── Layer 2: BOLD FLAVOR sticker ─────────────────────────────── */}
        <div
          ref={sticker2Ref}
          className="absolute z-[5] pointer-events-none select-none"
          style={{
            top: "42%",
            right: "5%",
            transform: "rotate(10deg)",
          }}
          aria-hidden="true"
        >
          <span
            className="font-modak block text-center leading-[0.7]"
            style={{
              fontSize: "clamp(1.2rem, 3.8vw, 4rem)",
              color: "#f4a804",
              WebkitTextStroke: "clamp(2px, 0.4vw, 5px) white",
            }}
          >
            BOLD
            <br />
            FLAVOR
          </span>
        </div>

        {/* ── Layer 3: Burger image (center, on top of text) ───────────── */}
        <div
          ref={burgerRef}
          className="relative z-10"
          style={{
            width: "clamp(260px, 43vw, 570px)",
            height: "clamp(260px, 43vw, 570px)",
          }}
        >
          <Image
            src="/images/burgerHero.webp"
            alt="RIMI Smash Burger — Prime beef patty with melted cheddar"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 260px, (max-width: 1024px) 43vw, 570px"
          />
        </div>

        {/* ── Layer 1 (behind burger): RIMI brand bottom text ──────────── */}
        <div
          className="absolute z-[11] bottom-[5%] sm:bottom-[0%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-modak leading-none"
            style={{
              fontSize: "clamp(5rem, 19vw, 18rem)",
              color: "#f4a804",
              WebkitTextStroke: "clamp(3px, 0.5vw, 6px) white",
            }}
          >
            RIMI
          </span>
        </div>

        {/* ── Bottom left description ───────────────────────────────────── */}
        <div className="absolute z-30 bottom-5 sm:bottom-8 left-4 sm:left-8 max-w-[160px] sm:max-w-[250px]">
          <p className="font-grotesk text-[0.6rem] sm:text-[1rem] font-extrabold leading-snug text-[#1a1a1a] uppercase ">
            Smashed hot on the flat top, our prime patties lock in ultimate
            juiciness under a caramelized crust.
          </p>
        </div>

        {/* ── Bottom right description ──────────────────────────────────── */}
        <div className="absolute z-30 bottom-5 sm:bottom-8 right-4 sm:right-8 max-w-[160px] sm:max-w-[290px] text-right">
          <p className="font-grotesk text-[0.6rem] sm:text-[1rem] font-extrabold leading-snug text-[#1a1a1a] uppercase ">
            Topped with melted cheddar and our signature chili honey glaze
            crafted to satisfy your cravings since 1997.
          </p>
        </div>
      </section>
    </main>
  );
}
