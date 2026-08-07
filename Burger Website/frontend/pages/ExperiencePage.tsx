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
            className="relative bg-[#f91814] w-full min-h-screen flex flex-col items-center pt-24 pb-48"
        >
            <style>{`
                @keyframes wave-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>

            {/* ── Top Wavy Border ── */}
            <div className="absolute top-0 left-0 w-[200vw] h-12 sm:h-20 md:h-28 z-10 pointer-events-none">
                <svg 
                    viewBox="0 0 1000 100" 
                    preserveAspectRatio="none" 
                    className="w-full h-full"
                    style={{ animation: "wave-scroll 8s linear infinite", willChange: "transform" }}
                >
                    <path d="M 0 0 V 50 Q 125 100, 250 50 T 500 50 T 750 50 T 1000 50 V 0 Z" fill="#f5e3cd" />
                </svg>
            </div>

            {/* ── Typography Section ── */}
            <div className="relative z-20 flex flex-col items-center mt-12 sm:mt-16 w-full px-4">
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
            <div className="relative z-20 mt-10 w-full max-w-7xl mx-auto flex items-center justify-center">
                <div className="absolute left-6 lg:left-12 bottom-12 lg:bottom-32 z-30 hidden sm:block text-left text-[#f5e3cd] font-mouse tracking-widest leading-none text-2xl lg:text-4xl">
                    450 KCAL <br/>
                    HIGH PROTEIN <br/>
                    FRESH INGREDIENTS
                </div>

                <div className="relative w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] aspect-square lg:aspect-[4/3] mx-auto z-20 drop-shadow-2xl">
                    <Image 
                        src="/images/burgerwithhands.webp" 
                        alt="Giant burger with hands" 
                        fill 
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 60vw"
                        className="object-contain object-bottom"
                    />

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

                <div className="absolute right-6 lg:right-12 bottom-12 lg:bottom-32 z-30 hidden sm:block text-right text-[#f5e3cd] font-mouse tracking-widest leading-none text-2xl lg:text-4xl">
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
            
            <div className="w-full h-[60vh] absolute top-full left-0 bg-neutral-900 -z-10 flex items-center justify-center">
                <p className="text-white/50 font-grotesk text-xl">Photo Background Section Goes Here</p>
            </div>
        </section>
    );
}