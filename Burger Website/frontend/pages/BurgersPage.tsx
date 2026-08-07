"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once at module level — SSR-safe via window guard
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ── Static Data ──────────────────────────────────────────────────────────────
interface MenuItem {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly price: string;
    readonly tag: string;
    readonly tagColor: string;
}

const MENU_ITEMS: readonly MenuItem[] = [
    {
        id: "classic-smash",
        name: "Classic Smash",
        description:
            "Double smash patty, American cheese, shredded lettuce, pickles & our secret sauce.",
        price: "₹299",
        tag: "BESTSELLER",
        tagColor: "#f91814",
    },
    {
        id: "cheesy-loaded",
        name: "Cheesy Loaded",
        description:
            "Triple cheese blend, caramelized onions, jalapeños, crispy bacon & chipotle mayo.",
        price: "₹349",
        tag: "HOT & NEW",
        tagColor: "#f4a804",
    },
    {
        id: "crispy-bird",
        name: "Crispy Bird",
        description:
            "Golden crispy chicken thigh, honey mustard, house coleslaw & dill pickles.",
        price: "₹279",
        tag: "FAN FAVE",
        tagColor: "#1a1a1a",
    },
] as const;

// Slot Machine letter pairs: [default, hover]
const SLOT_REELS: readonly [string, string][] = [
    ["O", "\u00A0"],
    ["R", "G"],
    ["D", "R"],
    ["E", "A"],
    ["R", "B"],
    ["\u00A0", "\u00A0"],
    ["N", "I"],
    ["O", "T"],
    ["W", "!"],
] as const;

// ── BurgersPage ──────────────────────────────────────────────────────────────
export default function BurgersPage(): React.JSX.Element {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const bodyTextRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLButtonElement>(null);
    const ctaFillRef = useRef<HTMLSpanElement>(null);
    const ctaWrapRef = useRef<HTMLDivElement>(null);
    const menuGridRef = useRef<HTMLUListElement>(null);
    const stickerWrapRef = useRef<HTMLDivElement>(null);
    const stickerRef = useRef<HTMLDivElement>(null);

    // ── CTA hover handlers — same proven pattern as Navbar ──
    function handleCtaEnter() {
        gsap.killTweensOf([ctaFillRef.current, ctaRef.current]);
        gsap.to(ctaFillRef.current, { scaleY: 1, duration: 0.4, ease: "power3.out" });
        gsap.to(ctaRef.current, { y: -6, duration: 0.35, ease: "back.out(3)" });
        const reels = ctaRef.current?.querySelectorAll(".slot-reel");
        if (reels && reels.length > 0) {
            gsap.to(reels, { yPercent: -50, duration: 0.35, stagger: 0.04, ease: "back.out(2)" });
        }
    }

    function handleCtaLeave() {
        gsap.killTweensOf([ctaFillRef.current, ctaRef.current]);
        gsap.to(ctaFillRef.current, { scaleY: 0, duration: 0.3, ease: "power2.in" });
        gsap.to(ctaRef.current, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
        const reels = ctaRef.current?.querySelectorAll(".slot-reel");
        if (reels && reels.length > 0) {
            gsap.to(reels, { yPercent: 0, duration: 0.35, stagger: 0.04, ease: "back.out(2)" });
        }
    }

    useEffect(() => {

        const ctx = gsap.context(() => {
            const scrollOnce = { start: "top 88%", once: true } as const;

            // Sub-label fade-up
            gsap.from(labelRef.current, {
                opacity: 0,
                y: 22,
                duration: 0.55,
                ease: "power2.out",
                scrollTrigger: { trigger: labelRef.current, ...scrollOnce },
            });

            // Heading slide-up
            gsap.from(headingRef.current, {
                opacity: 0,
                y: 48,
                duration: 0.75,
                ease: "power3.out",
                delay: 0.08,
                scrollTrigger: { trigger: headingRef.current, ...scrollOnce },
            });

            // Body text fade-up
            gsap.from(bodyTextRef.current, {
                opacity: 0,
                y: 28,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: { trigger: bodyTextRef.current, ...scrollOnce },
            });

            // CTA wrapper fade-up (separate from button to avoid hover conflicts)
            gsap.from(ctaWrapRef.current, {
                opacity: 0,
                y: 28,
                duration: 0.6,
                delay: 0.12,
                ease: "power2.out",
                scrollTrigger: { trigger: ctaWrapRef.current, ...scrollOnce },
            });

            // Menu card stagger reveal
            if (menuGridRef.current) {
                gsap.fromTo(
                    menuGridRef.current.querySelectorAll("li"),
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.65,
                        stagger: 0.14,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: menuGridRef.current,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // ── Sticker Peel Animation (separate lifecycle) ──────────────────────
    useEffect(() => {
        const el = stickerRef.current;
        const trigger = stickerWrapRef.current;
        if (!el || !trigger) return;

        // REAL STICKER PEEL EFFECT (Rolling Curl)
        // Set initial state: mostly peeled off (80%) and folded sharply (160deg)
        gsap.set(el, {
            "--peel-amount": 0.8,
            "--peel-angle": 160,
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: "top 65%",
                end: "bottom 40%",
                scrub: 1.5,
            }
        });

        // Stage 1: Roll down (peel amount decreases, but angle stays sharp like a curl)
        tl.to(el, {
            "--peel-amount": 0.1,
            ease: "none",
            duration: 0.7, // Takes 70% of the scroll
        })
            // Stage 2: Snap flat (angle flattens out to 0 as it finishes sticking)
            .to(el, {
                "--peel-amount": 0,
                "--peel-angle": 0,
                ease: "power2.inOut",
                duration: 0.3, // Takes the last 30% of scroll
            });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="burgers-page-heading"
            className="relative bg-[#f5e3cd]"
        >
            {/* ── 1. Headline Block ─────────────────────────────────────────────── */}
            <div className="relative flex flex-col items-center text-center px-5 sm:px-8 pt-20 sm:pt-20 pb-16 sm:pb-20">

                {/* Sub-label — Modak sticker style with double-layer crisp stroke */}
                <div
                    ref={labelRef}
                    className="relative inline-block text-center mb-2 sm:mb-4"
                    style={{ transform: "rotate(-5deg)" }}
                >
                    {/* Background stroke layer */}
                    <span
                        className="font-modak absolute left-0 top-0 w-full leading-none uppercase z-0 pointer-events-none select-none"
                        style={{
                            fontSize: "clamp(1.5rem, 3vw, 3rem)",
                            WebkitTextStroke: "clamp(6px, 1.5vw, 8px) white",
                            color: "white",
                        }}
                        aria-hidden="true"
                    >
                        Top Classic
                    </span>
                    {/* Foreground text layer */}
                    <span
                        className="font-modak relative leading-none uppercase z-10 block"
                        style={{
                            fontSize: "clamp(1.5rem, 3vw, 3rem)",
                            color: "#f91814",
                        }}
                        aria-label="Category: Top Classic"
                    >
                        Top Classic
                    </span>
                </div>

                {/* Primary heading — Mouse Memoirs, red with crisp white stroke */}
                <div
                    ref={headingRef}
                    className="relative mb-7 sm:mb-9 text-center w-full"
                >
                    {/* Background stroke layer */}
                    <h1
                        className="font-mouse absolute left-0 top-0 w-full text-white uppercase leading-[0.92] tracking-tighter z-0 pointer-events-none select-none"
                        style={{
                            fontSize: "clamp(3.5rem, 14vw, 15rem)",
                            WebkitTextStroke: "clamp(8px, 1.6vw, 18px) white",
                        }}
                        aria-hidden="true"
                    >
                        Juicy Cheesy
                        <br />
                        Fully Loaded
                    </h1>
                    {/* Foreground text layer */}
                    <h1
                        id="burgers-page-heading"
                        className="font-mouse relative text-[#f91814] uppercase leading-[0.92] tracking-tighter z-10"
                        style={{
                            fontSize: "clamp(3.5rem, 14vw, 15rem)",
                        }}
                    >
                        Juicy Cheesy
                        <br />
                        Fully Loaded
                    </h1>
                </div>

                {/* Tagline paragraph */}
                <p
                    ref={bodyTextRef}
                    className="font-grotesk text-[#2a1a0e] text-sm sm:text-lg font-bold leading-relaxed max-w-[42ch] mb-8 sm:mb-10"
                >
                    RIMI is back and bolder than ever. Honoring our rich roots, we bring
                    you the ultimate smashed experience — fully loaded, hot, and crafted
                    fresh.
                </p>

                {/* CTA wrapper — scroll animation targets this div, hover targets button */}
                <div ref={ctaWrapRef}>
                    <button
                        ref={ctaRef}
                        id="burgers-cta-order-now"
                        type="button"
                        className="relative overflow-hidden font-mouse text-white text-3xl sm:text-4xl tracking-widest uppercase px-14 sm:px-16 py-3 sm:py-4 bg-[#f91814] border-[3px] border-white active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f91814]"
                        style={{ borderRadius: "50%" }}
                        onMouseEnter={handleCtaEnter}
                        onMouseLeave={handleCtaLeave}
                        aria-label="Browse our burger menu and order now"
                    >
                        {/* White fill background */}
                        <span
                            ref={ctaFillRef}
                            aria-hidden="true"
                            className="absolute inset-0 bg-white origin-bottom"
                            style={{ transform: "scaleY(0)", borderRadius: "inherit" }}
                        />

                        {/* Slot Machine Letter Reels */}
                        <span className="relative z-10 flex items-center justify-center" aria-hidden="true">
                            {SLOT_REELS.map(([top, bottom], i) => (
                                <span
                                    key={i}
                                    className="inline-block overflow-hidden"
                                    style={{ lineHeight: "1.2em", height: "1.2em" }}
                                >
                                    <span
                                        className="slot-reel block will-change-transform"
                                    >
                                        <span className="block h-[1.2em] text-white">{top}</span>
                                        <span className="block h-[1.2em] text-[#f91814]">{bottom}</span>
                                    </span>
                                </span>
                            ))}
                        </span>

                        {/* SR-only accessible text */}
                        <span className="sr-only">Order Now</span>
                    </button>
                </div>

                {/* Decorative Selfie Sticker (REAL 3D Peel Effect) */}
                <div
                    ref={stickerWrapRef}
                    className="hidden lg:block absolute left-4 xl:left-12 bottom-32 xl:bottom-50 z-20"
                    style={{
                        perspective: '1000px',
                        transform: 'rotate(-30deg)', // Rotate the entire peel setup so it looks natural
                    }}
                >
                    <div
                        ref={stickerRef}
                        className="relative w-64 h-64 xl:w-[22rem] xl:h-[22rem]"
                        style={{ '--peel-amount': 1 } as any}
                    >
                        {/* 1. Sticker Main (The bottom part stuck to the page) */}
                        <div
                            className="absolute inset-0"
                            style={{
                                WebkitMaskImage: 'linear-gradient(to bottom, transparent calc(var(--peel-amount) * 100%), black calc(var(--peel-amount) * 100%))',
                                maskImage: 'linear-gradient(to bottom, transparent calc(var(--peel-amount) * 100%), black calc(var(--peel-amount) * 100%))',
                            }}
                        >
                            <Image
                                src="/images/burgerselfie.png"
                                alt="Burger taking selfie sticker"
                                fill
                                sizes="(max-width: 1024px) 0px, (max-width: 1280px) 16rem, 22rem"
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>

                        {/* 2. Flap (The top part peeling off and folding down) */}
                        <div
                            className="absolute inset-0 z-20"
                            style={{
                                transformOrigin: 'center calc(var(--peel-amount) * 100%)',
                                transform: 'rotateX(calc(var(--peel-angle) * 1deg))',
                                WebkitMaskImage: 'linear-gradient(to bottom, black calc(var(--peel-amount) * 100%), transparent calc(var(--peel-amount) * 100%))',
                                maskImage: 'linear-gradient(to bottom, black calc(var(--peel-amount) * 100%), transparent calc(var(--peel-amount) * 100%))',
                            }}
                        >
                            {/* The Flap Image */}
                            <Image src="/images/burgerselfie.png" fill sizes="(max-width: 1024px) 0px, (max-width: 1280px) 16rem, 22rem" className="object-contain" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 2. Menu Strip ─────────────────────────────────────────────────── */}
            <div className="relative">
                {/* Menu grid */}
                <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-20 sm:pb-28">
                    <ul
                        ref={menuGridRef}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                        role="list"
                        aria-label="Featured menu items"
                    >
                        {MENU_ITEMS.map((item) => (
                            <li
                                key={item.id}
                                className="group flex flex-col bg-[#f5e3cd] rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[0.93] hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)] focus-within:ring-4 focus-within:ring-red-500/40"
                            >
                                {/* Burger image */}
                                <div className="relative w-full aspect-[5/4] mt-4 z-10">
                                    <Image
                                        src="/images/burgerHero.webp"
                                        alt={`${item.name} — RIMI signature smash burger`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-contain p-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-110 group-hover:scale-[1.3] group-hover:-translate-y-10 drop-shadow-2xl"
                                        loading="lazy"
                                        decoding="async"
                                    />

                                    {/* Tag badge */}
                                    <span
                                        className="absolute top-4 left-4 font-grotesk font-extrabold text-white text-[0.65rem] px-3 py-1.5 rounded-full uppercase tracking-widest select-none shadow-sm"
                                        style={{ backgroundColor: item.tagColor }}
                                        aria-label={`Label: ${item.tag}`}
                                    >
                                        {item.tag}
                                    </span>
                                </div>

                                {/* Card content */}
                                <div className="flex flex-col gap-2 p-5 flex-1">
                                    <h2 className="font-mouse text-[#f91814] text-3xl sm:text-4xl leading-none uppercase tracking-wider">
                                        {item.name}
                                    </h2>

                                    <p className="font-grotesk text-[#3a2a1a] text-xs sm:text-sm leading-relaxed flex-1 font-semibold">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-4">
                                        <span
                                            className="font-grotesk font-black text-[#1a1a1a] text-xl sm:text-2xl"
                                            aria-label={`Price: ${item.price}`}
                                        >
                                            {item.price}
                                        </span>

                                        <button
                                            id={`add-to-cart-${item.id}`}
                                            type="button"
                                            className="font-grotesk bg-[#f91814] text-white font-bold text-[0.65rem] tracking-widest px-5 py-2 rounded-full uppercase transition-all duration-200 hover:bg-[#c01010] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f91814]"
                                            aria-label={`Add ${item.name} to your cart`}
                                        >
                                            Add +
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
