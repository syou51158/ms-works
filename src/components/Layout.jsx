import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import SeoHead from './SeoHead';

export default function Layout() {
    const { pathname } = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <SeoHead />
            <Header />
            <main style={{ paddingTop: 'var(--header-height)' }}>
                <Outlet />
            </main>
            
            {/* Global Floating LINE Button */}
            <a 
                href="https://lin.ee/958ABOg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-full shadow-2xl hover:shadow-[0_10px_25px_rgba(6,199,85,0.4)] transition-all duration-300 transform hover:-translate-y-2 group"
                aria-label="LINE公式アカウント"
            >
                <div className="absolute -top-12 -right-2 bg-white text-gray-800 text-sm font-bold px-4 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gray-100">
                    LINEで気軽に相談
                    <span className="absolute -bottom-1 right-6 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45"></span>
                </div>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
                    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.978 8.885 9.444 9.617 1.25.168 1.488.513 1.341 1.482-.149.972-.511 2.373-.511 2.373 0 0-.083.473.684.093s4.116-2.424 7.218-5.267c2.62-2.399 3.824-4.8 3.824-8.298z"/>
                </svg>
            </a>
            
            <Footer />
        </>
    );
}
