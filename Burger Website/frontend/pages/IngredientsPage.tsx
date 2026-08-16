"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function IngredientsPage() {
    const sectionRef = useRef<HTMLElement>(null);
    const lettuceRef = useRef<HTMLImageElement>(null);
    const tomatoRef = useRef<HTMLImageElement>(null);
    const meatRef = useRef<HTMLImageElement>(null);
    const cheeseRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;

        // Subtle parallax effects for the ingredients
        const createParallax = (element: Element | null, yOffset: number, speed: number) => {
            if (!element) return;
            gsap.fromTo(
                element,
                { y: yOffset },
                {
                    y: -yOffset,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: speed,
                    },
                }
            );
        };

        createParallax(lettuceRef.current, 100, 1.9);
        createParallax(tomatoRef.current, -80, 0.8);
        createParallax(meatRef.current, 150, 1.5);
        createParallax(cheeseRef.current, -120, 1.1);

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section 
            ref={sectionRef} 
            className="relative bg-[#f5e3cd] w-full min-h-screen overflow-hidden flex flex-col items-center justify-center py-32"
        >
            {/* ── Content Container ── */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center w-full max-w-7xl mx-auto px-4 mt-12 sm:mt-0">
                
                {/* Curved Text: PURE QUALITY */}
                <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] h-[100px] sm:h-[120px] -mb-4 sm:-mb-8">
                    <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
                        <path id="curve" d="M 50,120 Q 250,20 450,120" fill="transparent" />
                        <text className="font-modak text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem]" fill="#f91814" style={{ WebkitTextStroke: "6px white", paintOrder: "stroke fill" }}>
                            <textPath href="#curve" startOffset="50%" textAnchor="middle">
                                PURE QUALITY
                            </textPath>
                        </text>
                    </svg>
                </div>

                {/* Giant Text */}
                <h2 
                    className="font-modak text-[#f91814] leading-[0.8] tracking-tight relative z-20 flex flex-col items-center"
                    style={{ WebkitTextStroke: "8px white", paintOrder: "stroke fill" }}
                >
                    <span className="text-[5rem] sm:text-[8rem] md:text-[11rem] lg:text-[14rem]">EVERY LAYER</span>
                    <span className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem]">PACKED WITH FLAVOUR</span>
                </h2>
            </div>

            {/* ── Floating Ingredients ── */}
            
            {/* Lettuce - Bottom Left */}
            <div className="absolute bottom-10 left-[-5%] sm:left-[5%] md:-left-[1%] w-[150px] sm:w-[250px] md:w-[350px] lg:w-[450px] z-30 drop-shadow-2xl">
                <Image 
                    ref={lettuceRef}
                    src="/images/lettuce.webp" 
                    alt="Fresh lettuce" 
                    width={500} 
                    height={500} 
                    className="w-full h-auto object-contain transform -rotate-12"
                />
            </div>

            {/* Tomato - Bottom Right */}
            <div className="absolute bottom-[-2%] right-[-5%] sm:right-[5%] md:right-[5%] w-[120px] sm:w-[200px] md:w-[280px] lg:w-[350px] z-30 drop-shadow-2xl">
                <Image 
                    ref={tomatoRef}
                    src="/images/tomato.webp" 
                    alt="Fresh tomato" 
                    width={400} 
                    height={400} 
                    className="w-full h-auto object-contain transform rotate-12"
                />
            </div>

            {/* Meat - Top Right */}
            <div className="absolute top-[10%] right-[-10%] sm:right-0 md:right-[5%] w-[130px] sm:w-[220px] md:w-[300px] lg:w-[380px] z-10 drop-shadow-2xl opacity-90">
                <Image 
                    ref={meatRef}
                    src="/images/meat.webp" 
                    alt="Juicy meat patty" 
                    width={450} 
                    height={450} 
                    className="w-full h-auto object-contain transform rotate-6"
                />
            </div>

            {/* Cheese - Top Left */}
            <div className="absolute top-[20%] left-[-5%] sm:left-[2%] md:left-[8%] w-[100px] sm:w-[180px] md:w-[250px] lg:w-[320px] z-10 drop-shadow-2xl opacity-90">
                <Image 
                    ref={cheeseRef}
                    src="/images/cheese.webp" 
                    alt="Melted cheese" 
                    width={350} 
                    height={350} 
                    className="w-full h-auto object-contain transform -rotate-6"
                />
            </div>

        </section>
    );
}
