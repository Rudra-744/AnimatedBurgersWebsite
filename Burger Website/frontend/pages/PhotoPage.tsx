export default function PhotoPage() {
    return (
        <section className="relative w-full h-[60vh] sm:h-[80vh] md:h-screen flex items-center justify-center bg-black overflow-x-hidden overflow-y-clip">
            
            {/* Top Red Wave from Experience Page */}
            <div className="absolute top-0 left-0 w-[200vw] h-12 sm:h-20 md:h-28 z-40 pointer-events-none">
                <svg 
                    viewBox="0 0 1000 100" 
                    preserveAspectRatio="none" 
                    className="w-full h-full"
                    style={{ animation: "wave-scroll 7s linear infinite reverse", willChange: "transform" }}
                >
                    <path d="M 0 0 V 50 Q 125 100, 250 50 T 500 50 T 750 50 T 1000 50 V 0 Z" fill="#f91814" />
                </svg>
            </div>

            {/* Note: In your screenshot, there's a specific photo of hands holding a bacon burger. 
                Since that specific asset isn't in public/images, I am using a placeholder image link here. 
                Just replace the src with your actual image path when you have it! */}
            <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2000&auto=format&fit=crop" 
                alt="Delicious Burger" 
                className="w-full h-full object-cover object-center opacity-90"
                loading="lazy"
            />

            {/* Bottom Beige Wave (Transitions into Ingredients Page) */}
            <div className="absolute bottom-0 left-0 w-[200vw] h-12 sm:h-20 md:h-28 z-40 pointer-events-none">
                <svg 
                    viewBox="0 0 1000 100" 
                    preserveAspectRatio="none" 
                    className="w-full h-full"
                    style={{ animation: "wave-scroll 7s linear infinite", willChange: "transform" }}
                >
                    <path d="M 0 100 V 50 Q 125 0, 250 50 T 500 50 T 750 50 T 1000 50 V 100 Z" fill="#f5e3cd" />
                </svg>
            </div>
        </section>
    );
}
