import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Command } from 'lucide-react';
import gsap from 'gsap';

// --- content definitions ---
const heroContent = [
    {
        text: "Reflections on the water",
        images: [
            // Slot 1: Far Left (Landscape) -> Moved down
            { src: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=400&auto=format&fit=crop", className: "absolute left-[3%] top-[45%] w-64 h-64 rounded-2xl object-cover overflow-hidden" },
            // Slot 2: Top Left (Square) -> Moved down
            { src: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=400&q=80", className: "absolute left-[18%] top-[20%] w-48 h-48 rounded-xl object-cover overflow-hidden" },
            // Slot 4: Top Center (Main) -> Moved down
            { src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=600&q=80", className: "absolute left-[48%] top-[26%] w-72 h-64 rounded-2xl object-cover overflow-hidden" },
            // Slot 6: Far Right (Tall) -> Moved down
            { src: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=400&q=80", className: "absolute right-[-2%] top-[40%] w-72 h-[32rem] rounded-l-3xl object-cover overflow-hidden" },
            // Slot 7: Bottom Left (Large) -> Adjusted
            { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80", className: "absolute left-[6%] top-[85%] w-80 h-96 rounded-t-3xl object-cover overflow-hidden" },
            // Slot 8: Bottom Right (Square) -> Adjusted
            { src: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=500&q=80", className: "absolute right-[18%] top-[78%] w-72 h-72 rounded-t-3xl object-cover overflow-hidden" }
        ]
    },
    {
        text: "Quiet Place",
        images: [
            // Slot 1
            { src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80", className: "absolute left-[0%] top-[60%] w-64 h-40 rounded-2xl object-cover overflow-hidden" },
            // Slot 2
            { src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=400&q=80", className: "absolute left-[18%] top-[35%] w-48 h-48 rounded-xl object-cover overflow-hidden" },
            // Slot 3: Center Left (Tiny) -> Moved down
            { src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?auto=format&fit=crop&w=300&q=80", className: "absolute left-[33%] top-[58%] w-24 h-24 rounded-lg object-cover overflow-hidden" },
            // Slot 4
            { src: "https://images.unsplash.com/photo-1499750310159-5b5f336a6133?auto=format&fit=crop&w=600&q=80", className: "absolute left-[48%] top-[40%] w-96 h-64 rounded-2xl object-cover overflow-hidden" },
            // Slot 6
            { src: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=400&q=80", className: "absolute right-[-2%] top-[40%] w-72 h-[32rem] rounded-l-3xl object-cover overflow-hidden" },
            // Slot 7
            { src: "https://images.unsplash.com/photo-1517604931442-71053e3e2c3c?auto=format&fit=crop&w=600&q=80", className: "absolute left-[5%] top-[85%] w-72 h-80 rounded-t-3xl object-cover overflow-hidden" },
            // Slot 8
            { src: "https://images.unsplash.com/photo-1542466500-dccb2789cbbb?auto=format&fit=crop&w=500&q=80", className: "absolute right-[24%] top-[78%] w-60 h-60 rounded-t-3xl object-cover overflow-hidden" }
        ]
    },
    {
        text: "Black and White Videos",
        images: [
            // Slot 1
            { src: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=400&q=80", className: "absolute left-[0%] top-[60%] w-64 h-40 rounded-2xl object-cover grayscale overflow-hidden" },
            // Slot 2
            { src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80", className: "absolute left-[18%] top-[28%] w-48 h-48 rounded-xl object-cover grayscale overflow-hidden" },
            // Slot 3
            { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80", className: "absolute left-[33%] top-[58%] w-28 h-18 rounded-lg object-cover grayscale overflow-hidden" },
            // Slot 4
            { src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=600&q=80", className: "absolute left-[48%] top-[29%] w-72 h-64 rounded-2xl object-cover grayscale overflow-hidden" },
            // Slot 5: Center Right (Tiny) -> Moved down
            { src: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=300&q=80", className: "absolute right-[23%] top-[55%] w-28 h-18 rounded-lg object-cover grayscale overflow-hidden" },
            // Slot 6
            { src: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=400&q=80", className: "absolute right-[-2%] top-[50%] w-72 h-96 rounded-l-3xl object-cover grayscale overflow-hidden" },
            // Slot 7
            { src: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&w=600&q=80", className: "absolute left-[6%] top-[85%] w-80 h-96 rounded-t-3xl object-cover grayscale overflow-hidden" },
            // Slot 8
            { src: "https://images.unsplash.com/photo-1542466500-dccb2789cbbb?auto=format&fit=crop&w=500&q=80", className: "absolute right-[18%] top-[85%] w-64 h-72 rounded-t-3xl object-cover grayscale overflow-hidden" }
        ]
    }
];

const Hero = () => {
    // Animation Sequence State: 'grid' -> 'white-enter' -> 'final'
    const [animationStage, setAnimationStage] = useState('grid');
    const [placeholder, setPlaceholder] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const imagesRef = useRef([]);

    // Mouse position for parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    const handleMouseMove = (e) => {
        const { clientX, clientY, innerWidth, innerHeight } = e;
        mouseX.set((clientX / innerWidth) - 0.5);
        mouseY.set((clientY / innerHeight) - 0.5);
    };

    // GSAP Sequence
    useEffect(() => {
        if (animationStage !== 'final') return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1 });

            // Ensure initial state
            setPlaceholder("");
            gsap.set(imagesRef.current, { scale: 0, opacity: 0 });

            // REBUILD TIMELINE WITH NUMERIC TWEEN
            const masterTl = gsap.timeline({ repeat: -1 });

            heroContent.forEach((item, index) => {
                masterTl.call(() => setActiveIndex(index));

                // Type IN
                const proxy = { len: 0 };
                masterTl.to(proxy, {
                    len: item.text.length,
                    duration: 1.5,
                    ease: "none",
                    onUpdate: () => setPlaceholder(item.text.substring(0, Math.round(proxy.len)))
                });

                // Images Pop Out (Start slightly after typing starts)
                masterTl.to(`.image-group-${index} .parallax-target`, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }, "-=1.0");

                // Wait
                masterTl.to({}, { duration: 2 });

                // Images Pop In (Disappear)
                masterTl.to(`.image-group-${index} .parallax-target`, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "back.in(1.7)"
                });

                // Type OUT
                masterTl.to(proxy, {
                    len: 0,
                    duration: 1,
                    ease: "none",
                    onUpdate: () => setPlaceholder(item.text.substring(0, Math.round(proxy.len)))
                }, "<");
            });

            return () => masterTl.kill(); // Cleanup
        });

        return () => ctx.revert();
    }, [animationStage]); // Run once final stage is reached

    useEffect(() => {
        // Sequence Timings
        const startSequence = async () => {
            // 0.0s: Grid is visible (initial state)

            // 1.0s: White Background Appears (Stage 2)
            await new Promise(r => setTimeout(r, 1000));
            setAnimationStage('white-enter');

            // 2.5s: Zoom Out / Reveal (Stage 3)
            await new Promise(r => setTimeout(r, 1500));
            setAnimationStage('final');
        };

        startSequence();
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // ... variants ... (headerVariants, logoVariants) ...
    const headerVariants = {
        grid: { height: "100vh", opacity: 0, borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px" },
        'white-enter': { height: "100vh", opacity: 1, borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px" },
        final: { height: "auto", opacity: 1, borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
    };

    const logoVariants = {
        grid: { scale: 15, y: 0, x: 0, opacity: 0 },
        'white-enter': {
            scale: 2.4,
            y: "-25vh",
            x: "-2vw",
            opacity: 1,
            transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
        },
        final: {
            scale: 1,
            y: 0,
            x: 0,
            opacity: 1,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } }
    };

    return (
        <div className="relative w-full min-h-screen bg-[#FDFBF7] font-sans text-gray-900 selection:bg-black selection:text-white flex flex-col overflow-hidden">

            {/* --- TOP SECTION: WHITE BACKGROUND (Animated) --- */}
            <motion.div
                className="relative z-30 bg-white w-full flex flex-col justify-end shadow-sm"
                initial="grid"
                animate={animationStage}
                variants={headerVariants}
            >
                {/* LOGO & HERO TEXT CONTAINER */}
                <div className="w-full max-w-[1800px] mx-auto px-8 md:px-12 flex flex-col md:flex-row items-stretch gap-16 md:gap-96 pt-20 md:pt-26 pb-8 md:pb-12">

                    {/* LEFT: TRACE LOGO */}
                    <div className="flex-1 flex items-start">
                        <motion.div variants={logoVariants} className="origin-top-left">
                            <h1 className="text-[13rem] md:text-[17rem] leading-[0.75] font-bold tracking-tighter -ml-2 select-none whitespace-nowrap">
                                Trace
                            </h1>
                        </motion.div>
                    </div>

                    {/* RIGHT: TEXT & BUTTON */}
                    <motion.div
                        className="flex-1 flex flex-col justify-between items-start"
                        variants={contentVariants}
                        initial="hidden"
                        animate={animationStage === 'final' ? "visible" : "hidden"}
                    >
                        {/* Top Text */}
                        <h2 className="text-3xl md:text-3.5xl font-movatif font-medium leading-[1.1] tracking-tight pt-6 md:pt-0">
                            The Creative Sidekick<br />
                            <RotatingText words={["Made for Designers.", "Made for Agencies.", "Made for Storytellers."]} />
                            <br />
                            Built for Storytellers.
                        </h2>

                        {/* Bottom Button */}
                        {/* Bottom Button */}
                        <button className="group flex items-center gap-3 bg-black p-2 pr-5 rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300">
                            <div className="w-12 h-12 bg-[#FCD34D] rounded-lg flex items-center justify-center overflow-hidden relative">
                                <img
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                                    alt="User"
                                    className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-500 grayscale contrast-125"
                                />
                            </div>
                            <span className="font-ikicompressedlight text-xs md:text-sm tracking-wide relative">
                                <span className="text-white">Start Creating</span>
                            </span>
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            {/* --- BOTTOM SECTION: FLOATING IMAGES & GRID (Parallax) --- */}
            <div className="absolute inset-0 z-0 pt-[40vh]">
                {/* Simple Grid Background */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(#E5E5E5 1px, transparent 1px), linear-gradient(90deg, #E5E5E5 1px, transparent 1px), radial-gradient(circle at 1px 1px, #D4D4D4 3px, transparent 3px)`,
                        backgroundSize: '60px 60px',
                        opacity: 0.6
                    }}
                ></div>

                {/* --- DYNAMIC PARALLAX IMAGES --- */}
                <AnimatePresence>
                    {animationStage === 'final' && (
                        <>
                            {heroContent.map((group, groupIndex) => (
                                <div key={groupIndex} className={`image-group-${groupIndex} ${groupIndex === activeIndex ? 'block' : 'hidden'}`}>
                                    {group.images.map((img, imgIndex) => (
                                        <ParallaxImage
                                            key={imgIndex}
                                            x={smoothX}
                                            y={smoothY}
                                            speed={(imgIndex + 1) * 5} // Vary speeds
                                            className={`${img.className} parallax-target opacity-0 scale-0`} // Helper classes for GSAP
                                        >
                                            <div className="w-full h-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                                                <img src={img.src} className="w-full h-full object-cover" alt="Visual" />
                                            </div>
                                        </ParallaxImage>
                                    ))}
                                </div>
                            ))}
                        </>
                    )}
                </AnimatePresence>

                {/* --- SEARCH BAR --- */}
                {animationStage === 'final' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="absolute left-0 right-0 top-[73%] flex justify-center pointer-events-auto z-50">
                            <div className="bg-[#DFDFDF] w-full max-w-[850px] mx-4 rounded-full p-1.5 pl-6 flex items-center shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-opacity-95">
                                <input
                                    type="text"
                                    placeholder={placeholder}
                                    className="flex-1 bg-transparent border-none outline-none font-ikiCondensedThin font-regular text-base md:text-[16px] text-[#000000] placeholder-black tracking-wider h-14 px-2 uppercase"
                                />
                                <button className="bg-white h-14 px-6 rounded-full text-sm font-ppneue font-regular tracking-widest flex text-[#000000] items-center gap-2 border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
                                    SEARCH
                                    <div className="flex items-center text-lg text-gray-400 gap-0.5">
                                        <Command size={17} />
                                        <span>/</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    );
};

/* --- Subcomponents --- */

const RotatingText = ({ words }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <span className="inline-block relative h-[1.2em] w-full overflow-hidden align-top text-gray-400">
            <AnimatePresence mode='popLayout'>
                <motion.span
                    key={index}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-110%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="absolute left-0 top-0 whitespace-nowrap"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

// Wrapper for Parallax
const ParallaxImage = ({ className, x, y, speed, children }) => {
    const moveX = useTransform(x, value => value * speed);
    const moveY = useTransform(y, value => value * speed);

    return (
        <motion.div
            style={{ x: moveX, y: moveY }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default Hero;
