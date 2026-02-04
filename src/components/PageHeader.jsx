import React, { useEffect, useState } from 'react';

const PageHeader = ({ title, subtitle, image, height = '40vh' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setIsVisible(true);

        const handleScroll = () => {
            setOffset(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{
                height: height,
                minHeight: '400px',
                backgroundColor: '#0A246A' // Fallback
            }}
        >
            {/* Parallax Background Image */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '110%', // Slightly taller to ensure coverage
                    backgroundImage: `url('${image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateY(${offset * 0.4}px)`, // Parallax speed
                    willChange: 'transform',
                    zIndex: 0
                }}
            />

            {/* Premium Dark Overlay with Sophisticated Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A246A]/50 via-[#0A246A]/30 to-black/80 z-10" />

            <div className={`relative z-20 text-center text-white px-6 py-12 fade-in-up ${isVisible ? 'visible' : ''}`}>
                <p
                    className="text-accent font-bold tracking-[0.4em] mb-4 uppercase text-xs md:text-sm"
                    style={{
                        textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                        fontFamily: 'var(--font-sans)'
                    }}
                >
                    {subtitle}
                </p>
                <h1
                    className="text-5xl md:text-7xl font-serif font-bold tracking-wider leading-tight mb-8"
                    style={{
                        textShadow: '0 4px 16px rgba(0,0,0,0.7)',
                        letterSpacing: '0.15em'
                    }}
                >
                    {title}
                </h1>

                {/* Decorative line with glow effect */}
                <div
                    className="w-20 h-[3px] bg-accent mx-auto"
                    style={{ boxShadow: '0 0 10px rgba(197, 160, 89, 0.6)' }}
                ></div>
            </div>
        </div>
    );
};

export default PageHeader;
