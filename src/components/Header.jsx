import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/features', label: 'Features' },
    { path: '/technology', label: 'Technology' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/contact', label: 'Contact' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="sticky top-0 z-50">
            {/* Government Top Bar */}
            <div className="bg-primary text-white text-xs py-2 px-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="hidden sm:inline">भारत सरकार |</span>
                        <span>Government of India</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                        <span className="hidden md:inline">Advisory Decision Support System</span>
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-govt-saffron"></span>
                            <span className="w-3 h-3 rounded-full bg-white"></span>
                            <span className="w-3 h-3 rounded-full bg-govt-green"></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                                <span className="text-white font-bold text-lg">ज</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-heading font-bold text-gray-800">JanAvlokan</span>
                                <span className="text-xs text-gray-500 -mt-1 hidden sm:block">जनावलोकन</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation - Capsule Style */}
                        <div className="hidden md:flex items-center bg-gray-100 rounded-full p-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${location.pathname === link.path
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 border-t border-gray-200">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === link.path
                                            ? 'bg-primary text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
