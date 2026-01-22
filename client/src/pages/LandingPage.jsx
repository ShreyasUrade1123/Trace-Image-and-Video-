import React from 'react';
import Header from '../components/Header';
import Hero from '../sections/Hero';

const LandingPage = () => {

    return (
        <div className="min-h-screen bg-white text-black font-sans relative overflow-hidden flex flex-col">
            {/* Grid Pattern Background */}
            <div
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            ></div>

            <Header />

            {/* Main Content Placeholder */}
            <main className="relative z-10 flex-1 w-full">
                <Hero />
            </main>
        </div>
    );
};

export default LandingPage;
