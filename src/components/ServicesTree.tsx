import React from 'react';
import { Link } from 'react-router-dom';
import atilimLogo from '../assets/logos/atilim-logo.png';

const ServicesTree: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Hidroponik Sistemler",
      description: "NFT, DWC ve Ebb & Flow sistemleri",
      icon: "💧"
    },
    {
      id: 2,
      title: "Sera Kurulumları",
      description: "Modern iklim kontrollü seralar",
      icon: "🏢"
    },
    {
      id: 3,
      title: "Dikey Tarım",
      description: "LED destekli dikey sistemler",
      icon: "🌱"
    },
    {
      id: 4,
      title: "Akıllı İzleme",
      description: "IoT ve sensör teknolojileri",
      icon: "📊"
    },
    {
      id: 5,
      title: "Besin Yönetimi",
      description: "pH/EC kontrolü ve dozajlama",
      icon: "⚗️"
    },
    {
      id: 6,
      title: "Danışmanlık",
      description: "Uzman destek ve eğitim",
      icon: "🎓"
    }
  ];

  return (
    <section id="services" className="py-10 md:py-24 bg-gradient-to-b from-background-light to-white dark:from-background-dark dark:to-background-dark/50 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20" data-reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Hizmetlerimiz
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Topraksız tarım çözümlerimiz, güçlü bir ağaç gibi büyüyor ve dallanıyor.
          </p>
        </div>

        {/* Desktop Tree Layout */}
        <div className="hidden lg:block relative max-w-7xl mx-auto" data-reveal>
          {/* Branches from Logo */}
          <svg 
            className="absolute left-1/2 top-1/2 w-full h-full pointer-events-none -translate-x-1/2 -translate-y-1/2" 
            viewBox="0 0 1200 700" 
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Branches from center logo to cards */}
            {/* Left Top */}
            <path d="M 600 350 Q 400 280, 200 120" stroke="#22c55e" strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" strokeDasharray="6,3"/>
            
            {/* Left Middle */}
            <path d="M 600 350 Q 380 350, 200 340" stroke="#22c55e" strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" strokeDasharray="6,3"/>
            
            {/* Left Bottom */}
            <path d="M 600 350 Q 400 420, 200 560" stroke="#22c55e" strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" strokeDasharray="6,3"/>
            
            {/* Right Top */}
            <path d="M 600 350 Q 800 280, 1000 120" stroke="#22c55e" strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" strokeDasharray="6,3"/>
            
            {/* Right Middle */}
            <path d="M 600 350 Q 820 350, 1000 340" stroke="#22c55e" strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" strokeDasharray="6,3"/>
            
            {/* Right Bottom */}
            <path d="M 600 350 Q 800 420, 1000 560" stroke="#22c55e" strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" strokeDasharray="6,3"/>
          </svg>

          {/* Service Cards */}
          <div className="relative z-10 min-h-[600px]">
            {/* Left Services */}
            <div className="absolute left-0 top-0 w-72" data-reveal>
              <div className="bg-white dark:bg-background-dark rounded-xl p-6 shadow-xl border-2 border-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full mb-4 shadow-lg">
                  <span className="text-3xl">{services[0].icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{services[0].title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{services[0].description}</p>
              </div>
            </div>

            <div className="absolute left-0 top-[220px] w-72" data-reveal>
              <div className="bg-white dark:bg-background-dark rounded-xl p-6 shadow-xl border-2 border-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full mb-4 shadow-lg">
                  <span className="text-3xl">{services[1].icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{services[1].title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{services[1].description}</p>
              </div>
            </div>

            <div className="absolute left-0 top-[440px] w-72" data-reveal>
              <div className="bg-white dark:bg-background-dark rounded-xl p-6 shadow-xl border-2 border-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full mb-4 shadow-lg">
                  <span className="text-3xl">{services[2].icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{services[2].title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{services[2].description}</p>
              </div>
            </div>

            {/* Right Services */}
            <div className="absolute right-0 top-0 w-72" data-reveal>
              <div className="bg-white dark:bg-background-dark rounded-xl p-6 shadow-xl border-2 border-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full mb-4 shadow-lg">
                  <span className="text-3xl">{services[3].icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{services[3].title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{services[3].description}</p>
              </div>
            </div>

            <div className="absolute right-0 top-[220px] w-72" data-reveal>
              <div className="bg-white dark:bg-background-dark rounded-xl p-6 shadow-xl border-2 border-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full mb-4 shadow-lg">
                  <span className="text-3xl">{services[4].icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{services[4].title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{services[4].description}</p>
              </div>
            </div>

            <div className="absolute right-0 top-[440px] w-72" data-reveal>
              <div className="bg-white dark:bg-background-dark rounded-xl p-6 shadow-xl border-2 border-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full mb-4 shadow-lg">
                  <span className="text-3xl">{services[5].icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{services[5].title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{services[5].description}</p>
              </div>
            </div>

            {/* Center Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 z-20">
              <Link 
                to="/hizmetlerimiz" 
                className="relative w-full h-full bg-white rounded-full shadow-2xl flex flex-col items-center justify-center border-8 border-white dark:border-gray-800 hover:shadow-3xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                title="Hizmetlerimizi keşfedin"
              >
                {/* Company Logo */}
                <img 
                  src={atilimLogo} 
                  alt="Atılım Mühendislik ve Sera Kurulum Sistemleri" 
                  className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                {/* Hover Text */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-semibold text-primary bg-white px-3 py-1 rounded-full shadow-lg">
                    Hizmetlerimiz
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Grid */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-background-dark rounded-xl p-6 shadow-xl border-2 border-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              data-reveal
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full mb-4 shadow-lg">
                <span className="text-3xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default ServicesTree;