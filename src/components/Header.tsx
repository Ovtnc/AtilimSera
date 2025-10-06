import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import atilimLogo from '../assets/logos/atilim-logo.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      id="header"
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={atilimLogo} 
            alt="Atılım Mühendislik ve Sera Kurulum Sistemleri" 
            className="h-10 w-auto object-contain"
          />

        </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link className={`text-sm font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-primary' 
                  : 'text-white hover:text-primary text-shadow'
              }`} to="/">
                Anasayfa
              </Link>
              <Link className={`text-sm font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-primary' 
                  : 'text-white hover:text-primary text-shadow'
              }`} to="/hakkimizda">
                Hakkımızda
              </Link>
              <Link className={`text-sm font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-primary' 
                  : 'text-white hover:text-primary text-shadow'
              }`} to="/hizmetlerimiz">
                Hizmetlerimiz
              </Link>
              <Link className={`text-sm font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-primary' 
                  : 'text-white hover:text-primary text-shadow'
              }`} to="/projelerimiz">
                Projelerimiz
              </Link>
            
              <Link className={`text-sm font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-primary' 
                  : 'text-white hover:text-primary text-shadow'
              }`} to="/blog">
                Blog
              </Link>
              <Link className={`text-sm font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-primary' 
                  : 'text-white hover:text-primary text-shadow'
              }`} to="/iletisim">
                İletişim
              </Link>
            </nav>

        <Link to="/iletisim" className="hidden md:flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-background-dark text-sm font-bold hover:bg-opacity-90 transition-transform duration-300 hover:scale-105">
          <span>Teklif Al</span>
        </Link>

        <button 
          className={`md:hidden transition-colors ${
            isScrolled ? 'text-gray-700' : 'text-white'
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </button>
      </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200">
              <div className="px-6 py-4 space-y-4">
                <Link to="/" className="block text-gray-700 hover:text-primary transition-colors">
                  Anasayfa
                </Link>
                <Link to="/hizmetlerimiz" className="block text-gray-700 hover:text-primary transition-colors">
                  Hizmetlerimiz
                </Link>
                <Link to="/projelerimiz" className="block text-gray-700 hover:text-primary transition-colors">
                  Projelerimiz
                </Link>
                <Link to="/hakkimizda" className="block text-gray-700 hover:text-primary transition-colors">
                  Hakkımızda
                </Link>
                <Link to="/blog" className="block text-gray-700 hover:text-primary transition-colors">
                  Blog
                </Link>
                <Link to="/iletisim" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-primary transition-colors cursor-pointer">
                  İletişim
                </Link>
                <Link to="/iletisim" onClick={() => setIsMenuOpen(false)} className="block w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-center">
                  Teklif Al
                </Link>
              </div>
            </div>
          )}
    </header>
  );
};

export default Header;