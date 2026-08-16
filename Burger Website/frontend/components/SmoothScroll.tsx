"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://easings.net
            direction: "vertical",
            gestureDirection: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame (raf) to GSAP's ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable GSAP's lag smoothing to avoid conflicting with Lenis
        gsap.ticker.lagSmoothing(0);

        return () => {
            // Cleanup on unmount
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return <>{children}</>;
}
