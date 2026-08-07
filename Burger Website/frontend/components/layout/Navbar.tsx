"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        delay: 1.4,
        ease: "back.out(1.7)",
      });

      // Stagger nav items
      gsap.from("[data-nav-item]", {
        y: -30,
        opacity: 0,
        duration: 0.5,
        delay: 1.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-6"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link
        href="/"
        data-nav-item
        className="crav-text font-crav text-4xl sm:text-5xl tracking-wide select-none hover:scale-105 transition-transform"
        data-text="CRAV"
        style={{
          "--text-fill": "var(--brand-red)",
          "--stroke-width": "8px",
        } as React.CSSProperties}
      >
        RIMI
      </Link>

      {/* Nav Buttons */}
      <div className="flex items-center gap-3" data-nav-item>
        <Link
          href="#menu"
          className="hidden sm:flex items-center gap-2 bg-brand-red text-white px-6 py-2.5 rounded-full font-crav text-lg tracking-wider hover:bg-brand-red-dark transition-colors hover:scale-105 active:scale-95 shadow-md"
        >
          BURGERS
        </Link>
        <button
          className="flex items-center gap-2 border-[3px] border-foreground/20 px-5 py-2 rounded-full font-crav text-lg tracking-wider hover:bg-foreground/5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open menu"
        >
          <span className="hidden sm:inline pt-1">MENU</span>
          <svg
            width="20"
            height="16"
            viewBox="0 0 18 14"
            fill="none"
            className="stroke-current"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="1" y1="2" x2="17" y2="2" />
            <line x1="1" y1="7" x2="17" y2="7" />
            <line x1="1" y1="12" x2="17" y2="12" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
