"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default function TravelPage() {
    const sectionRef = useRef<HTMLElement>(null);
    const planeRef = useRef<HTMLImageElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    // Photo Refs
    const berlinRef = useRef<HTMLDivElement>(null);
    const londonRef = useRef<HTMLDivElement>(null);
    const nyRef = useRef<HTMLDivElement>(null);
    const sydneyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
        }

        const ctx = gsap.context(() => {
            if (!sectionRef.current || !planeRef.current || !pathRef.current) return;

            // 1. Plane Animation along the smoothed path
            gsap.to(planeRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                },
                motionPath: {
                    path: pathRef.current,
                    align: pathRef.current,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: -90,
                    resolution: 200,
                },
                ease: "none",
            });

            // 2. Photo Reveal Animations
            const createPhotoReveal = (element: Element | null) => {
                if (!element) return;
                gsap.fromTo(
                    element,
                    { opacity: 0, scale: 0.5, y: 50 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "back.out(1.5)",
                        scrollTrigger: {
                            trigger: element,
                            start: "center 60%", // Triggers when the photo hits 60% down the viewport (right where the plane flies by!)
                            toggleActions: "play reverse play reverse",
                        }
                    }
                );
            };

            createPhotoReveal(berlinRef.current);
            createPhotoReveal(londonRef.current);
            createPhotoReveal(nyRef.current);
            createPhotoReveal(sydneyRef.current);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#ffd751] w-full min-h-[300vh] overflow-hidden"
        >
            {/* ── Top Wavy Border ── */}
            <div className="absolute top-0 left-0 w-[200vw] h-12 sm:h-20 md:h-28 z-40 pointer-events-none">
                <svg
                    viewBox="0 0 1000 100"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                    style={{ animation: "wave-scroll 7s linear infinite reverse", willChange: "transform" }}
                >
                    <path d="M 0 0 V 50 Q 125 100, 250 50 T 500 50 T 750 50 T 1000 50 V 0 Z" fill="#f5e3cd" />
                </svg>
            </div>

            {/* ── Background Flight Path (smooth, rounded turns + faint companion path) ── */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                <svg
                    viewBox="0 0 1600 3120"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                >
                    {/* Faint companion path — sits just beside the main route, same shape, offset */}
                    <path
                        d="
                M 800, -50
                C 926.7, 21.7    1686.7, 245   1560, 380
                C 1433.3, 515   40,   633.3   40,   760
                C 40,   886.7   1560, 1013.3  1560, 1140
                C 1560, 1266.7  40,   1393.3  40,   1520
                C 40,   1646.7  1560, 1773.3  1560, 1900
                C 1560, 2026.7  40,   2153.3  40,   2280
                C 40,   2406.7  1303.3, 2523.3 1560, 2660
                C 1816.7, 2796.7 1576.7, 3026.7 1580, 3100
            "
                        transform="translate(20, 0)"
                        stroke="#f2c869"
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray="6 20"
                        strokeLinecap="round"
                        opacity="0.45"
                    />

                    {/* Main flight path — smoothed with a Catmull-Rom style spline so every turn is a natural round curve, no cusps. The plane follows this one. */}
                    <path
                        ref={pathRef}
                        id="flightPath"
                        d="
                M 800, -50
                C 926.7, 21.7    1686.7, 245   1560, 380
                C 1433.3, 515   40,   633.3   40,   760
                C 40,   886.7   1560, 1013.3  1560, 1140
                C 1560, 1266.7  40,   1393.3  40,   1520
                C 40,   1646.7  1560, 1773.3  1560, 1900
                C 1560, 2026.7  40,   2153.3  40,   2280
                C 40,   2406.7  1303.3, 2523.3 1560, 2660
                C 1816.7, 2796.7 1576.7, 3026.7 1580, 3100
            "
                        stroke="#e5b324"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray="24 24"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* ── Text Content ── */}
            <div className="sticky top-[20vh] z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 pointer-events-none">
                <h3
                    className="font-modak text-white text-[2rem] sm:text-[3rem] transform -rotate-6 origin-left inline-block mb-4 drop-shadow-md"
                    style={{ WebkitTextStroke: "6px #f4a804", paintOrder: "stroke fill" }}
                >
                    TAKE AWAY
                </h3>
                <h2 className="font-modak text-white text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight drop-shadow-lg">
                    QUALITY THAT <br />
                    TRAVELS WITH YOU
                </h2>
                <p className="font-grotesk text-neutral-800 text-lg sm:text-xl max-w-xl mt-8 font-medium bg-[#ffd751]/80 p-4 rounded-xl backdrop-blur-sm">
                    Freshly packed smash burgers, ready to go wherever you crave.
                    From our flat-top to any corner of the globe, we ensure every layer stays hot and juicy.
                </p>
            </div>

            {/* ── Airplane ── */}
            <div className="absolute top-0 left-0 w-[100px] sm:w-[150px] md:w-[200px] z-30 drop-shadow-2xl pointer-events-none -translate-x-1/2 -translate-y-1/2">
                <Image
                    ref={planeRef}
                    src="/images/plane.webp"
                    alt="Travel Airplane"
                    width={300}
                    height={300}
                    className="w-full h-auto object-contain"
                />
            </div>

            {/* ── Destination Polaroids — each centered exactly on its turn of the path ── */}
            {/* top%/left% = the same viewBox turn coordinates (x/1600, y/3120) as the path above,
                so nudging the path later just means updating these two numbers to match. */}

            {/* Berlin (Turn 1: 1560, 380) */}
            <div
                ref={berlinRef}
                className="absolute w-[250px] sm:w-[300px] z-20"
                style={{ top: "12.2%", left: "97.5%", transform: "translate(-50%, -50%) rotate(6deg)" }}
            >
                <h4 className="font-modak text-[#f91814] text-[2rem] sm:text-[3rem] absolute -top-10 -left-10 transform -rotate-12" style={{ WebkitTextStroke: "4px white", paintOrder: "stroke fill" }}>BERLIN</h4>
                <div className="bg-white p-3 rounded-2xl shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop" alt="Berlin Burger" className="w-full h-auto rounded-xl object-cover aspect-[4/3] bg-gray-200" />
                </div>
            </div>

            {/* London (Turn 2: 40, 760) */}
            <div
                ref={londonRef}
                className="absolute w-[250px] sm:w-[300px] z-20"
                style={{ top: "24.4%", left: "2.5%", transform: "translate(-50%, -50%) rotate(-6deg)" }}
            >
                <h4 className="font-modak text-[#f91814] text-[2rem] sm:text-[3rem] absolute -top-10 -right-10 transform rotate-12" style={{ WebkitTextStroke: "4px white", paintOrder: "stroke fill" }}>LONDON</h4>
                <div className="bg-white p-3 rounded-2xl shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" alt="London Burger" className="w-full h-auto rounded-xl object-cover aspect-[4/3] bg-gray-200" />
                </div>
            </div>

            {/* New York (Turn 3: 1560, 1140) */}
            <div
                ref={nyRef}
                className="absolute w-[250px] sm:w-[300px] z-20"
                style={{ top: "36.5%", left: "97.5%", transform: "translate(-50%, -50%) rotate(3deg)" }}
            >
                <h4 className="font-modak text-[#f91814] text-[2rem] sm:text-[3rem] absolute -top-10 -left-10 transform -rotate-12" style={{ WebkitTextStroke: "4px white", paintOrder: "stroke fill" }}>NEW YORK</h4>
                <div className="bg-white p-3 rounded-2xl shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1594212202875-86ac519fe419?q=80&w=800&auto=format&fit=crop" alt="New York Burger" className="w-full h-auto rounded-xl object-cover aspect-[3/4] bg-gray-200" />
                </div>
            </div>

            {/* Sydney (Turn 4: 40, 1520) */}
            <div
                ref={sydneyRef}
                className="absolute w-[250px] sm:w-[300px] z-20"
                style={{ top: "48.7%", left: "2.5%", transform: "translate(-50%, -50%) rotate(-6deg)" }}
            >
                <h4 className="font-modak text-[#f91814] text-[2rem] sm:text-[3rem] absolute -top-10 -right-10 transform rotate-12" style={{ WebkitTextStroke: "4px white", paintOrder: "stroke fill" }}>SYDNEY</h4>
                <div className="bg-white p-3 rounded-2xl shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800&auto=format&fit=crop" alt="Sydney Burger" className="w-full h-auto rounded-xl object-cover aspect-square bg-gray-200" />
                </div>
            </div>

        </section>
    );
}