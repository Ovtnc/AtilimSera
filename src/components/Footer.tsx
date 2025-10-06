import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import atilimLogo from '../assets/logos/atilim-logo.png';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={atilimLogo} 
                alt="Atılım Mühendislik ve Sera Kurulum Sistemleri" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-bold text-white">
                Atılım Modern Sera
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Sera sektöründe profesyonel kalite anlayışıyla tarım sektörüne hizmet veren, 
              modern teknoloji ve uzman ekibiyle güvenilir çözümler sunan firmayız.
            </p>
            <div className="flex space-x-4">
              <a href="tel:+905551234567" className="text-gray-300 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <a href="mailto:info@atilimsera.com" className="text-gray-300 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Hızlı Linkler</h3>
            <div className="space-y-3">
              {isHomePage ? (
                <>
                  <a className="block text-gray-300 hover:text-primary transition-colors" href="#services">
                    Hizmetlerimiz
                  </a>
                  <a className="block text-gray-300 hover:text-primary transition-colors" href="#projects">
                    Projelerimiz
                  </a>
                  <a className="block text-gray-300 hover:text-primary transition-colors" href="#about">
                    Hakkımızda
                  </a>
                  <Link className="block text-gray-300 hover:text-primary transition-colors" to="/blog">
                    Blog
                  </Link>
                  <a className="block text-gray-300 hover:text-primary transition-colors" href="#contact">
                    İletişim
                  </a>
                </>
              ) : (
                <>
                  <Link className="block text-gray-300 hover:text-primary transition-colors" to="/#services">
                    Hizmetlerimiz
                  </Link>
                  <Link className="block text-gray-300 hover:text-primary transition-colors" to="/#projects">
                    Projelerimiz
                  </Link>
                  <Link className="block text-gray-300 hover:text-primary transition-colors" to="/#about">
                    Hakkımızda
                  </Link>
                  <Link className="block text-gray-300 hover:text-primary transition-colors" to="/blog">
                    Blog
                  </Link>
                  <Link className="block text-gray-300 hover:text-primary transition-colors" to="/#contact">
                    İletişim
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">İletişim</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">
                  Sahrayı Cedit, Mengi Sk. No:10<br />
                  34734 Kadıköy/İstanbul
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+905551234567" className="text-sm hover:text-primary transition-colors">
                  +90 555 123 45 67
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@atilimsera.com" className="text-sm hover:text-primary transition-colors">
                  info@atilimsera.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Çizgi */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Atılım Mühendislik ve Sera Kurulum Sistemleri. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <button className="hover:text-primary transition-colors cursor-pointer">Gizlilik Politikası</button>
              <button className="hover:text-primary transition-colors cursor-pointer">Kullanım Şartları</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
