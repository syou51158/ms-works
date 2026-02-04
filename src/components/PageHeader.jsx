import React, { useEffect, useState } from 'react';

const PageHeader = ({ title, subtitle, image, height = '40vh' }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Ensure parallax works for these new elements if purely CSS implementation isn't enough
    // But since .parallax class does background-attachment: fixed, it should work automatically

    return (
        <div
            className="relative flex items-center justify-center overflow-hidden parallax"
            style={{
                height: height,
                minHeight: '400px',
                backgroundImage: `url('${image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#0A246A' // Fallback color
            }}
        >
            {/* Premium Dark Overlay with Sophisticated Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A246A]/50 via-[#0A246A]/30 to-black/80" />

            <div className={`relative z-10 text-center text-white px-6 py-12 fade-in-up ${isVisible ? 'visible' : ''}`}>
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
