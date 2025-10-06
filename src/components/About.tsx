import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-background-dark/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div data-reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Neden Biz?</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Atılım Modern Sera olarak, topraksız tarım alanında sadece teknoloji sunmuyor, 
                aynı zamanda sürdürülebilir bir gelecek için tutkuyla çalışıyoruz. Bizi farklı kılanlar:
              </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M7.86 7.86a2 2 0 11-2.83 2.83A2 2 0 017.86 7.86zm11.14 8.28a2 2 0 11-2.83-2.83 2 2 0 012.83 2.83z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">İnovasyon ve Ar-Ge</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Sektördeki en son gelişmeleri takip ederek, sürekli olarak daha verimli ve etkili sistemler geliştirmek için Ar-Ge'ye yatırım yapıyoruz.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0117.657 18.657z" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M9.879 14.121A3 3 0 1014.12 9.88l-4.242 4.242z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Uçtan Uca Çözümler</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Proje danışmanlığından, sistem kurulumuna ve operasyonel desteğe kadar her aşamada yanınızdayız. Başarınız, bizim başarımızdır.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Kanıtlanmış Başarı</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Gerçekleştirdiğimiz projeler ve memnun müşteri portföyümüz, teknolojimizin ve yaklaşımımızın gücünü kanıtlamaktadır.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative h-96 lg:h-full rounded-xl overflow-hidden shadow-2xl" data-reveal>
            <img 
              alt="Modern dikey tarım tesisi" 
              className="absolute w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8v1v8iJgU9xU-E_q_C8zV4R3K-u7lF-Z1YgJ-p1fM8W9-f0h-f-Y-X9k-y-Q_G3n-O_uF-n_Q-R-g-X-I_V-S-c-G-K-U-t-F_y-L_z-H_k-A-w-X-I_j-Y-z"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h4 className="text-2xl font-bold text-shadow">Şehirdeki Vaha Projesi</h4>
              <p className="mt-2 text-shadow">
                İstanbul'un merkezinde kurduğumuz dikey tarım tesisi ile yerel restoranlara taze ve organik ürünler sağlıyoruz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
