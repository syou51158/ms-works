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
                minHeight: '350px',
                backgroundImage: `url('${image}')`,
                backgroundColor: '#0A246A' // Fallback color
            }}
        >
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-primary/30 to-black/50" />

            <div className={`relative z-10 text-center text-white fade-in-up ${isVisible ? 'visible' : ''}`}>
                <p className="text-accent font-bold tracking-[0.2em] mb-2 uppercase text-sm md:text-base">
                    {subtitle}
                </p>
                <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wider">
                    {title}
                </h1>

                {/* Decorative line */}
                <div className="w-12 h-1 bg-accent mx-auto mt-6"></div>
            </div>
        </div>
    );
};

export default PageHeader;
