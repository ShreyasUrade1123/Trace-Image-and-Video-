import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="fixed top-0 left-0 w-full z-50 py-5 px-8 md:px-12 bg-white/95 backdrop-blur-sm">
            <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between">

                {/* Left Side: HOME / PRICING */}
                <div className="flex items-center gap-12 text-sm md:text-base font-iki tracking-wide font-regular">
                    <a href="/" className="flex items-center hover:opacity-100 transition-opacity">
                        {isActive('/') && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#467A53]">
                                <path d="M3 21V3L21 12L3 21Z" fill="currentColor" />
                            </svg>
                        )}
                        <span className={isActive('/') ? "opacity-100" : "opacity-60 hover:opacity-100"}>HOME</span>
                    </a>
                    <a href="#" className="flex items-center hover:opacity-100 transition-opacity uppercase">
                        {isActive('/pricing') && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#467A53]">
                                <path d="M3 21V3L21 12L3 21Z" fill="currentColor" />
                            </svg>
                        )}
                        <span className={isActive('/pricing') ? "opacity-100" : "opacity-60 hover:opacity-100"}>Pricing</span>
                    </a>
                </div>

                {/* Right Side: LOG-IN / SIGN-UP / Status */}
                <div className="flex items-center gap-8 text-sm md:text-base font-iki font-regular tracking-wide">
                    <button
                        onClick={() => navigate('/login')}
                        className="hover:opacity-60 transition-opacity uppercase"
                    >
                        Log-in
                    </button>

                    <button
                        onClick={() => navigate('/login')}
                        className="bg-black text-white px-3 py-0 rounded-[4px] hover:bg-gray-800 transition-colors uppercase"
                    >
                        Sign-up
                    </button>

                    {/* Green Status Dot */}
                    <div className="w-3 h-3 rounded-full bg-green-700"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
