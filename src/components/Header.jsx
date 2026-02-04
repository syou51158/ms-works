import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className="header">
                <Link to="/" className="logo" onClick={closeMobileMenu}>
                    M'S<span>works</span>
                </Link>

                <nav className="nav-menu">
                    <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>ホーム</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>会社情報</NavLink>
                    <NavLink to="/service" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>事業案内</NavLink>
                    <NavLink to="/works" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>施工実績</NavLink>
                    <NavLink to="/news" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>お知らせ</NavLink>
                    <NavLink to="/recruit" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>採用情報</NavLink>
                    <Link to="/contact" className="nav-contact-btn">お問い合わせ</Link>
                </nav>

                <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <NavLink to="/" className="mobile-nav-link" onClick={closeMobileMenu}>ホーム</NavLink>
                    <NavLink to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>会社情報</NavLink>
                    <NavLink to="/service" className="mobile-nav-link" onClick={closeMobileMenu}>事業案内</NavLink>
                    <NavLink to="/works" className="mobile-nav-link" onClick={closeMobileMenu}>施工実績</NavLink>
                    <NavLink to="/news" className="mobile-nav-link" onClick={closeMobileMenu}>お知らせ</NavLink>
                    <NavLink to="/recruit" className="mobile-nav-link" onClick={closeMobileMenu}>採用情報</NavLink>
                    <Link to="/contact" className="btn btn-accent text-center" onClick={closeMobileMenu} style={{ marginTop: '20px' }}>お問い合わせ</Link>
                </nav>
            </div>
        </>
    );
}
