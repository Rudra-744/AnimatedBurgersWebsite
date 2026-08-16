"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ExperiencePage() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const friesWrapRef = useRef<HTMLDivElement>(null);
    const friesRef = useRef<HTMLDivElement>(null);
    const burgerWrapRef = useRef<HTMLDivElement>(null);
    const burgerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const ctx = gsap.context(() => {
            // 🛑 PREFERS-REDUCED-MOTION HATA DIYA HAI (Ye animation kill kar raha tha)

            // ── 1. FRIES STICKER - FOOLPROOF 2-STAGE ROLL ──
            if (friesRef.current && friesWrapRef.current) {
                const tlFries = gsap.timeline({
                    scrollTrigger: {
                        trigger: friesWrapRef.current,
                        start: "top 85%",
                        end: "top 35%",
                        scrub: 1.2,
                    }
                });

                // fromTo use kiya hai taaki React render me state hamesha lock rahe
                tlFries
                    .fromTo(friesRef.current, 
                        { "--peel-amount": 0.85, "--peel-angle": 160 },
                        { "--peel-amount": 0.1, ease: "none", duration: 0.7 }
                    )
                    .to(friesRef.current, {
                        "--peel-amount": 0,
                        "--peel-angle": 0,
                        ease: "power2.inOut",
                        duration: 0.3,
                    });
            }

            // ── 2. BURGER STICKER - FOOLPROOF 2-STAGE ROLL ──
            if (burgerRef.current && burgerWrapRef.current) {
                const tlBurger = gsap.timeline({
                    scrollTrigger: {
                        trigger: burgerWrapRef.current,
                        start: "top 80%", // Thoda alag trigger taaki dono ek sath start na ho
                        end: "top 30%",
                        scrub: 1.2,
                    }
                });

                tlBurger
                    .fromTo(burgerRef.current,
                        { "--peel-amount": 0.85, "--peel-angle": 160 },
                        { "--peel-amount": 0.1, ease: "none", duration: 0.7 }
                    )
                    .to(burgerRef.current, {
                        "--peel-amount": 0,
                        "--peel-angle": 0,
                        ease: "power2.inOut",
                        duration: 0.3,
                    });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        // 🛑 overflow-hidden HATA DIYA HAI SECTION SE
        <section 
            ref={sectionRef} 
            // 🛑 FIX 1: pt-24 ko hata kar pt-32 sm:pt-48 md:pt-64 lg:pt-72 kiya hai taaki wave ke neeche gap bane
            className="relative bg-[#f91814] w-full min-h-screen overflow-hidden flex flex-col items-center pt-32 sm:pt-48 md:pt-64 lg:pt-72 pb-48"
        >
            <style>{`
                @keyframes wave-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>

            {/* ── Top Wavy Border (DEEP & ORGANIC BEZIER CURVE) ── */}
            {/* 🛑 FIX 2: h-12 ko badha kar h-24 se h-64 tak kiya hai taaki wave ka dip ekdum deep jaaye */}
            <div className="absolute top-0 left-0 w-[200vw] h-24 sm:h-32 md:h-48 lg:h-64 z-10 pointer-events-none">
                <svg 
                    viewBox="0 0 2000 300" 
                    preserveAspectRatio="none" 
                    className="w-full h-full"
                    // 🛑 FIX 3: Animation ko 15s kiya hai taaki wo heavy liquid ki tarah slowly aur smoothly flow kare
                    style={{ animation: "wave-scroll 15s linear infinite", willChange: "transform" }}
                >
                    {/* Ye naya path hai jo ekdum deep gaddha (dip) aur steep rise banata hai */}
                    <path 
                        d="M 0 0 V 150 C 350 400, 650 -100, 1000 150 C 1350 400, 1650 -100, 2000 150 V 0 Z" 
                        fill="#f5e3cd" 
                    />
                </svg>
            </div>

            {/* ── Typography Section ── */}
            <div className="relative z-20 flex flex-col items-center w-full px-4">
                <div className="relative mb-2 sm:mb-4 inline-block" style={{ transform: "rotate(-4deg)" }}>
                    <span 
                        className="font-modak absolute left-0 top-0 w-full leading-none text-center pointer-events-none select-none"
                        style={{
                            fontSize: "clamp(2rem, 5vw, 4rem)",
                            WebkitTextStroke: "clamp(6px, 1.5vw, 10px) white",
                            color: "transparent",
                        }}
                        aria-hidden="true"
                    >
                        EXPERIENCE
                    </span>
                    <span 
                        className="font-modak relative leading-none block text-[#f91814] text-center"
                        style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                    >
                        EXPERIENCE
                    </span>
                </div>

                <h2 
                    className="font-mouse text-[#f5e3cd] text-center leading-[0.85] tracking-tighter uppercase"
                    style={{ fontSize: "clamp(4.5rem, 15vw, 16rem)" }}
                >
                    FOOD THAT <br /> FEELS GOOD
                </h2>
            </div>
            {/* ── Floating Stickers ── */}
            
            {/* Fries Sticker (Left) */}
            <div 
                ref={friesWrapRef}
                className="absolute z-30 left-[-2%] sm:left-[5%] md:left-[10%] top-[15%] sm:top-[25%]"
                style={{ 
                    width: "clamp(120px, 20vw, 250px)", 
                    perspective: "1000px",
                    transform: "rotate(-15deg)" 
                }}
            >
                <div 
                    ref={friesRef} 
                    className="relative w-full aspect-square will-change-transform" 
                    style={{ '--peel-amount': 1 } as any}
                >
                    {/* Base Stuck Layer */}
                    <div 
                        className="absolute inset-0"
                        style={{
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent calc(var(--peel-amount) * 100%), black calc(var(--peel-amount) * 100%))',
                            maskImage: 'linear-gradient(to bottom, transparent calc(var(--peel-amount) * 100%), black calc(var(--peel-amount) * 100%))',
                        }}
                    >
                        <Image src="/images/fries.webp" alt="Fries sticker" fill className="object-contain drop-shadow-2xl" />
                    </div>

                    {/* Flap Peeling Layer */}
                    <div 
                        className="absolute inset-0 z-20"
                        style={{
                            transformOrigin: 'center calc(var(--peel-amount) * 100%)',
                            transform: 'rotateX(calc(var(--peel-angle) * 1deg))',
                            WebkitMaskImage: 'linear-gradient(to bottom, black calc(var(--peel-amount) * 100%), transparent calc(var(--peel-amount) * 100%))',
                            maskImage: 'linear-gradient(to bottom, black calc(var(--peel-amount) * 100%), transparent calc(var(--peel-amount) * 100%))',
                        }}
                    >
                        <Image src="/images/fries.webp" alt="Fries sticker flap" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Burger Sticker (Right) */}
            <div 
                ref={burgerWrapRef}
                className="absolute z-30 right-[-2%] sm:right-[5%] md:right-[10%] top-[35%] sm:top-[45%]"
                style={{ 
                    width: "clamp(120px, 18vw, 220px)", 
                    perspective: "1000px",
                    transform: "rotate(10deg)" 
                }}
            >
                <div 
                    ref={burgerRef} 
                    className="relative w-full aspect-square will-change-transform" 
                    style={{ '--peel-amount': 1 } as any}
                >
                    {/* Base Stuck Layer */}
                    <div 
                        className="absolute inset-0"
                        style={{
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent calc(var(--peel-amount) * 100%), black calc(var(--peel-amount) * 100%))',
                            maskImage: 'linear-gradient(to bottom, transparent calc(var(--peel-amount) * 100%), black calc(var(--peel-amount) * 100%))',
                        }}
                    >
                        <Image src="/images/burger.webp" alt="Burger character sticker" fill className="object-contain drop-shadow-2xl" />
                    </div>

                    {/* Flap Peeling Layer */}
                    <div 
                        className="absolute inset-0 z-20"
                        style={{
                            transformOrigin: 'center calc(var(--peel-amount) * 100%)',
                            transform: 'rotateX(calc(var(--peel-angle) * 1deg))',
                            WebkitMaskImage: 'linear-gradient(to bottom, black calc(var(--peel-amount) * 100%), transparent calc(var(--peel-amount) * 100%))',
                            maskImage: 'linear-gradient(to bottom, black calc(var(--peel-amount) * 100%), transparent calc(var(--peel-amount) * 100%))',
                        }}
                    >
                        <Image src="/images/burger.webp" alt="Burger character sticker flap" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* ── Giant Central Burger ── */}
            <div className="relative z-20 mt-10 w-full flex items-center justify-center">
                
                {/* Left Text */}
                <div className="absolute left-6 lg:left-5 bottom-12 lg:bottom-12 z-30 hidden sm:block text-left text-[#f5e3cd] font-mouse leading-[1.1] text-2xl lg:text-[2rem]">
                    450 KCAL <br/>
                    HIGH PROTEIN <br/>
                    FRESH INGREDIENTS
                </div>

                <div className="relative w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] mx-auto z-20 drop-shadow-2xl">
                    <Image 
                        src="/images/burgerwithhands.webp" 
                        alt="Giant burger with hands" 
                        width={1200}
                        height={900}
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 60vw"
                        className="w-full h-auto object-contain"
                    />

                    {/* ── Facial Features (Eyes, Eyebrows, Blush) ── */}
                    <div className="absolute inset-0 pointer-events-none z-30">
                        {/* Left Eye */}
                        <div className="absolute top-[10%] left-[37%] w-[7%] h-[15%] bg-white rounded-[50%] shadow-lg">
                            {/* Pupil */}
                            <div className="absolute bottom-[20%] right-[15%] w-[45%] h-[50%] bg-black rounded-[50%]">
                                {/* Highlight */}
                                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-white rounded-full"></div>
                            </div>
                            {/* Eyebrow */}
                            <svg viewBox="0 0 100 50" className="absolute -top-[70%] left-[-20%] w-[140%] h-[80%] overflow-visible drop-shadow-md">
                                <path d="M 10,40 Q 50,-15 90,40" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round" />
                            </svg>
                            {/* Blush */}
                            <svg viewBox="0 0 100 50" className="absolute -bottom-[30%] left-[10%] w-[120%] h-[60%] overflow-visible opacity-80">
                                <path d="M 10,25 Q 25,5 40,25 T 70,25 T 100,25" stroke="#f91814" strokeWidth="8" fill="none" strokeLinecap="round" />
                            </svg>
                        </div>

                        {/* Right Eye */}
                        <div className="absolute top-[10%] right-[37%] w-[7%] h-[15%] bg-white rounded-[50%]  shadow-lg">
                            {/* Pupil */}
                            <div className="absolute bottom-[20%] right-[35%] w-[45%] h-[50%] bg-black rounded-[50%]">
                                {/* Highlight */}
                                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-white rounded-full"></div>
                            </div>
                            {/* Eyebrow */}
                            <svg viewBox="0 0 100 50" className="absolute -top-[70%] left-[-20%] w-[140%] h-[80%] overflow-visible drop-shadow-md">
                                <path d="M 10,40 Q 50,-15 90,40" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round" />
                            </svg>
                            {/* Blush */}
                            <svg viewBox="0 0 100 50" className="absolute -bottom-[30%] right-[10%] w-[120%] h-[60%] overflow-visible opacity-80" style={{ transform: 'scaleX(-1)' }}>
                                <path d="M 10,25 Q 25,5 40,25 T 70,25 T 100,25" stroke="#f91814" strokeWidth="8" fill="none" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    {/* BOLD FLAVOUR Sticker */}
                    <div 
                        className="absolute bottom-[10%] right-[10%] lg:right-[5%] z-30 transform rotate-12"
                        style={{ width: "clamp(100px, 15vw, 180px)" }}
                    >
                        <span 
                            className="font-modak absolute left-0 top-0 w-full leading-[0.8] text-center pointer-events-none select-none"
                            style={{
                                fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                                WebkitTextStroke: "clamp(4px, 1vw, 8px) white",
                                color: "transparent",
                            }}
                            aria-hidden="true"
                        >
                            BOLD<br/>FLAVOUR
                        </span>
                        <span 
                            className="font-modak relative leading-[0.8] block text-[#f4a804] text-center drop-shadow-sm"
                            style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
                        >
                            BOLD<br/>FLAVOUR
                        </span>
                    </div>
                </div>

                {/* Right Text */}
                <div className="absolute right-6 lg:right-5 bottom-12 lg:bottom-12 z-30 hidden sm:block text-right text-[#f5e3cd] font-mouse leading-[1.1] text-2xl lg:text-[2rem]">
                    100% ORGANIC <br/>
                    ZERO GUILT <br/>
                    TRUE TASTE
                </div>
            </div>

            {/* ── Bottom Wavy Border ── */}
            <div className="absolute bottom-0 left-0 w-[200vw] h-12 sm:h-20 md:h-28 z-40 pointer-events-none translate-y-full">
                <svg 
                    viewBox="0 0 1000 100" 
                    preserveAspectRatio="none" 
                    className="w-full h-full"
                    style={{ animation: "wave-scroll 7s linear infinite reverse", willChange: "transform" }}
                >
                    <path d="M 0 0 V 50 Q 125 100, 250 50 T 500 50 T 750 50 T 1000 50 V 0 Z" fill="#f91814" />
                </svg>
            </div>
        </section>
    );
}