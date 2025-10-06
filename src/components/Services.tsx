import React from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
}

const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Hidroponik Sistem Kurulumu",
      description: "Profesyonel NFT, DWC ve Ebb & Flow sistemleri ile topraksız tarım altyapınızı kurun. Küçük hobiden büyük ticari projelere kadar her ölçekte çözüm sunuyoruz.",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "NFT Sistemleri",
        "DWC Kurulumu",
        "Otomatik Besleme",
        "Sistem Optimizasyonu"
      ]
    },
    {
      id: 2,
      title: "Modern Sera Kurulumları",
      description: "Yüksek teknoloji sera sistemleri ile yıl boyunca optimal üretim yapın. İklim kontrolü ve otomasyon sistemleriyle desteklenen çözümlerimiz.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "İklim Kontrol",
        "Otomatik Havalandırma",
        "Gölgeleme Sistemleri",
        "Isıtma ve Soğutma"
      ]
    },
    {
      id: 3,
      title: "Dikey Tarım Çözümleri",
      description: "Şehir içi ve sınırlı alanlarda maksimum verim için dikey tarım sistemleri. LED aydınlatma ve akıllı kontrol sistemleri.",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "LED Spektrum Kontrolü",
        "Çok Katlı Sistemler",
        "Alan Optimizasyonu",
        "Enerji Verimliliği"
      ]
    },
    {
      id: 4,
      title: "Akıllı İzleme Sistemleri",
      description: "IoT sensörleri ve uzaktan izleme teknolojileri ile seranızı akıllı hale getirin. Mobil uygulama ile her yerden kontrol edin.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "IoT Sensör Ağı",
        "Mobil Uygulama",
        "Veri Analizi",
        "Alarm Sistemleri"
      ]
    },
    {
      id: 5,
      title: "Besin ve Sulama Yönetimi",
      description: "Optimal bitki gelişimi için profesyonel besin çözeltisi yönetimi. pH, EC kontrolü ve otomatik dozaj sistemleri.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "pH/EC Kontrolü",
        "Otomatik Dozaj",
        "Besin Formülasyonu",
        "Su Arıtma"
      ]
    },
    {
      id: 6,
      title: "Danışmanlık ve Eğitim",
      description: "Sıfırdan kurulum, işletme ve sürekli gelişim için uzman danışmanlık hizmetleri. Kapsamlı eğitim programları.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Fizibilite Analizi",
        "Sistem Eğitimi",
        "7/24 Teknik Destek",
        "Proje Yönetimi"
      ]
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-white dark:bg-background-dark/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16" data-reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Hizmetlerimiz
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Modern tarım teknolojileri ile topraksız tarım altyapınızı kurun, 
            işletin ve optimize edin.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white dark:bg-background-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              data-reveal
            >
              {/* Image with Overlay */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Service Number */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-background-dark font-bold text-lg">0{service.id}</span>
                </div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-background-light dark:bg-background-dark border-2 border-primary text-primary font-semibold py-3 px-6 rounded-lg hover:bg-primary hover:text-background-dark transition-all duration-300">
                  Detaylı Bilgi Al
                </button>
              </div>

              {/* Green Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20" data-reveal>
          <div className="relative bg-gradient-to-br from-background-dark to-gray-900 rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2317cf17' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
              <h3 className="text-2xl md:text-4xl font-bold mb-4">
                Topraksız Tarımda Yolculuğunuza Bugün Başlayın
              </h3>
              <p className="text-lg text-gray-300 mb-8">
                Ücretsiz danışmanlık için hemen iletişime geçin. Uzman ekibimiz projenizdeki 
                tüm ihtiyaçlarınızı analiz ederek size özel çözümler sunacaktır.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contact"
                  className="inline-flex items-center justify-center bg-primary text-background-dark font-semibold py-4 px-8 rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Hemen Başlayın
                </a>
                <button className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white/30 font-semibold py-4 px-8 rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Katalog İndir
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;