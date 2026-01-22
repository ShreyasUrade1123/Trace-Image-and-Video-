import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../sections/Hero';
import TextScroll from '../sections/TextScroll';
import SearchBar from '../components/SearchBar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
    const [isHeroReady, setIsHeroReady] = useState(false);

    const [currentTheme, setCurrentTheme] = useState("SAMBA");

    const searchBarRef = useRef(null);
    const heroRef = useRef(null);

    // Theme styles configuration
    const themeStyles = {
        SAMBA: {
            bg: "bg-[#FDFBF7]",
            text: "text-black",
            gridOpacity: 0.6,
            gridColor: "#E5E5E5",
            radialColor: "#D4D4D4"
        },
        NOIR: {
            bg: "bg-[#2D2D2D]",
            text: "text-white",
            gridOpacity: 0.3,
            gridColor: "#4f4f4fff",
            radialColor: "#4f4f4fff"
        },
        // Fallbacks for other themes (default to light for now)
        PSYCHOLOGICAL: { bg: "bg-[#FDFBF7]", text: "text-black", gridOpacity: 0.6 },
        GIALLO: { bg: "bg-[#FDFBF7]", text: "text-black", gridOpacity: 0.6 },
        "SCI-FI": { bg: "bg-[#FDFBF7]", text: "text-black", gridOpacity: 0.6 }
    };

    const activeStyle = themeStyles[currentTheme] || themeStyles["SAMBA"];

    // Initial Search Bar State (Mirroring Hero's original position)
    // absolute left-0 right-0 top-[73%]

    useEffect(() => {
        if (!searchBarRef.current || !heroRef.current) return;
        // ... (GSAP code remains same)
        const sb = searchBarRef.current;
        gsap.set(sb, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            display: "none"
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "bottom bottom",
                end: "bottom top",
                scrub: true,
                onEnter: () => {
                    gsap.fromTo(sb,
                        { y: 100, opacity: 0, display: 'flex' },
                        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
                    );
                },
                onLeaveBack: () => {
                    gsap.to(sb, {
                        y: 100,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power3.in",
                        onComplete: () => gsap.set(sb, { display: "none" })
                    });
                }
            }
        });

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };

    }, []);

    return (
        <div className={`min-h-screen ${activeStyle.bg} ${activeStyle.text} font-sans relative overflow-hidden flex flex-col transition-colors duration-500`}>
            {/* Grid Pattern Background */}
            <div
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(${activeStyle.gridColor || '#E5E5E5'} 1px, transparent 1px), linear-gradient(90deg, ${activeStyle.gridColor || '#E5E5E5'} 1px, transparent 1px), radial-gradient(circle at 1px 1px, ${activeStyle.radialColor || '#D4D4D4'} 3px, transparent 3px)`,
                    backgroundSize: '60px 60px',
                    opacity: activeStyle.gridOpacity
                }}
            ></div>

            <Header currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />

            {/* Main Content */}
            <main className="relative z-10 flex-1 w-full">
                <div ref={heroRef} className="relative">
                    <Hero onIntroComplete={() => setIsHeroReady(true)} currentTheme={currentTheme} />

                    {/* Persistent Search Bar (Sticky) */}
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-[600px]">
                        <SearchBar
                            ref={searchBarRef}
                            placeholder="Search anything"
                            containerClass="bg-white/30 backdrop-blur-xl border-white/20 shadow-2xl"
                            currentTheme={currentTheme}
                        />
                    </div>
                </div>

                <TextScroll currentTheme={currentTheme} />

                {/* Placeholder for more content to allow scrolling */}
                <div className="h-screen bg-transparent"></div>
            </main>
        </div>
    );
};

export default LandingPage;
