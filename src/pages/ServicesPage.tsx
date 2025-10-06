import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  features: string[];
  benefits: string[];
  price: string;
  slug: string;
}

const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [services, setServices] = useState<Service[]>([]);
  
  const defaultServices = useMemo(() => [
    // Sera Hizmetleri
    {
      id: 1,
      title: "Modern Sera Kurulumları",
      description: "Yüksek teknoloji sera sistemleri ile yıl boyunca optimal üretim yapın. İklim kontrolü ve otomasyon sistemleriyle desteklenen çözümlerimiz.",
      
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "sera",
      features: [
        "Gotik Sera Sistemleri",
        "Venlo Sera Sistemleri", 
        "Tünel Sera Sistemleri",
        "Çok Katlı Sera Sistemleri"
      ],
      benefits: [
        "Otomatik iklim kontrolü",
        "Havalandırma sistemleri",
        "Gölgeleme teknolojisi",
        "Isıtma ve soğutma"
      ],
      price: "Projeye göre değişir",
      slug: "modern-sera-kurulumlari"
    },
    {
      id: 2,
      title: "Sera İklim Kontrol Sistemleri",
      description: "Tam otomatik iklim kontrolü ile sıcaklık, nem, havalandırma ve CO2 seviyelerini optimal seviyede tutun.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "sera",
      features: [
        "Sıcaklık Kontrolü",
        "Nem Kontrolü",
        "CO2 Enjeksiyon",
        "Havalandırma Otomasyonu"
      ],
      benefits: [
        "Enerji tasarrufu %40",
        "Verim artışı %25",
        "Otomatik kontrol",
        "Uzaktan izleme"
      ],
      price: "Projeye göre değişir",
      slug: "sera-iklim-kontrol-sistemleri"
    },
    {
      id: 3,
      title: "Sera Gölgeleme Sistemleri",
      description: "Otomatik gölgeleme sistemleri ile güneş ışığını kontrol edin ve bitkilerinizi koruyun.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "sera",
      features: [
        "Otomatik Gölgeleme",
        "Alüminyum Gölgeleme",
        "Termal Gölgeleme",
        "Kış Gölgelemesi"
      ],
      benefits: [
        "Sıcaklık kontrolü",
        "Enerji tasarrufu",
        "Bitki koruması",
        "Otomatik çalışma"
      ],
      price: "Projeye göre değişir",
      slug: "sera-golgeleme-sistemleri"
    },
    {
      id: 4,
      title: "Sera Isıtma ve Soğutma",
      description: "Yıl boyunca optimal sıcaklık için gelişmiş ısıtma ve soğutma sistemleri.",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "sera",
      features: [
        "Jeotermal Isıtma",
        "Hava Isıtma Sistemleri",
        "Soğutma Sistemleri",
        "Isı Pompaları"
      ],
      benefits: [
        "Enerji verimliliği",
        "Yıl boyu üretim",
        "Otomatik kontrol",
        "Düşük işletme maliyeti"
      ],
      price: "Projeye göre değişir",
      slug: "sera-isitma-ve-sogutma"
    },
    
    // Topraksız Tarım Hizmetleri
    {
      id: 5,
      title: "Hidroponik Sistemler",
      description: "Topraksız tarım teknolojisi ile %90 daha az su kullanarak %300 daha fazla verim elde edin.",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "topraksiz",
      features: [
        "NFT (Nutrient Film Technique) Sistemleri",
        "DWC (Deep Water Culture) Sistemleri", 
        "Ebb & Flow Sistemleri",
        "Aeroponik Sistemler"
      ],
      benefits: [
        "Su tasarrufu %90",
        "Verim artışı %300",
        "Yıl boyu üretim",
        "Hastalık riski minimum"
      ],
      price: "Projeye göre değişir",
      slug: "hidroponik-sistemler"
    },
    {
      id: 6,
      title: "Dikey Tarım Sistemleri",
      description: "Şehir içi ve sınırlı alanlarda maksimum verim için dikey tarım sistemleri. LED aydınlatma ve akıllı kontrol sistemleri.",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "topraksiz",
      features: [
        "LED Spektrum Kontrolü",
        "Çok Katlı Sistemler",
        "Alan Optimizasyonu",
        "Enerji Verimliliği"
      ],
      benefits: [
        "Alan tasarrufu %90",
        "Yüksek verimlilik",
        "Şehir içi üretim",
        "Yıl boyu hasat"
      ],
      price: "Projeye göre değişir",
      slug: "dikey-tarim-sistemleri"
    },
    {
      id: 7,
      title: "Besin ve Sulama Yönetimi",
      description: "Optimal bitki gelişimi için profesyonel besin çözeltisi yönetimi. pH, EC kontrolü ve otomatik dozaj sistemleri.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "topraksiz",
      features: [
        "pH/EC Kontrolü",
        "Otomatik Dozaj",
        "Besin Formülasyonu",
        "Su Arıtma"
      ],
      benefits: [
        "Optimal beslenme",
        "Otomatik kontrol",
        "Su tasarrufu",
        "Hastalık önleme"
      ],
      price: "Projeye göre değişir",
      slug: "besin-ve-sulama-yonetimi"
    },
    {
      id: 8,
      title: "Aeroponik Sistemler",
      description: "Hava ve su karışımı ile bitki köklerini besleyen en gelişmiş topraksız tarım teknolojisi.",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "topraksiz",
      features: [
        "Hava Besleme Sistemi",
        "Mikro Damlacık Teknolojisi",
        "Kök Gelişim Optimizasyonu",
        "Su Tasarrufu"
      ],
      benefits: [
        "Su tasarrufu %95",
        "Hızlı büyüme",
        "Yüksek oksijen",
        "Hastalık riski minimum"
      ],
      price: "Projeye göre değişir",
      slug: "aeroponik-sistemler"
    },
    {
      id: 9,
      title: "Akıllı İzleme Sistemleri",
      description: "IoT sensörleri ve uzaktan izleme teknolojileri ile seranızı akıllı hale getirin. Mobil uygulama ile her yerden kontrol edin.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "teknoloji",
      features: [
        "IoT Sensör Ağı",
        "Mobil Uygulama",
        "Veri Analizi",
        "Alarm Sistemleri"
      ],
      benefits: [
        "Uzaktan kontrol",
        "Gerçek zamanlı veri",
        "Otomatik alarmlar",
        "Performans takibi"
      ],
      price: "Projeye göre değişir",
      slug: "akilli-izleme-sistemleri"
    },
    {
      id: 10,
      title: "Danışmanlık ve Eğitim",
      description: "Sıfırdan kurulum, işletme ve sürekli gelişim için uzman danışmanlık hizmetleri. Kapsamlı eğitim programları.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "danismanlik",
      features: [
        "Fizibilite Analizi",
        "Sistem Eğitimi",
        "7/24 Teknik Destek",
        "Proje Yönetimi"
      ],
      benefits: [
        "Uzman rehberlik",
        "Kapsamlı eğitim",
        "Sürekli destek",
        "Başarı garantisi"
      ],
      price: "Projeye göre değişir",
      slug: "danismanlik-ve-egitim"
    }
  ], []);

  useEffect(() => {
    // Load services from backend API
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        
        if (data.services && data.services.length > 0) {
          setServices(data.services);
        } else {
          // Fallback to default services if API fails or returns empty
          setServices(defaultServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback to default services if API fails
        setServices(defaultServices);
      }
    };

    fetchServices();
  }, [defaultServices]);

  return (
    <div className="min-h-screen bg-background-light">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background-light dark:to-background-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center" data-reveal>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Hizmetlerimiz
              </h1>
              <p className="text-text-secondary max-w-2xl mx-auto">
              Modern tarım teknolojileri ile geleceğin tarımını bugün hayata geçirin. 
              Uzman ekibimizle birlikte en uygun çözümleri sunuyoruz.
              </p>
            </div>
          </div>
          <div className="container mx-auto max-w-6xl">
            
            
            <div className="mt-10 flex flex-wrap justify-center gap-4 mb-12">
              {[
                { key: 'all', label: 'Tüm Hizmetler', icon: '🌟' },
                { key: 'sera', label: 'Sera Hizmetleri', icon: '🏢' },
                { key: 'topraksiz', label: 'Topraksız Tarım', icon: '🌱' },
                { key: 'teknoloji', label: 'Teknoloji', icon: '📱' },
                { key: 'danismanlik', label: 'Danışmanlık', icon: '🎓' }
              ].map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.key
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-text-secondary hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        

        {/* Services Grid */}
        <section className="pb-10 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {services
                .filter(service => selectedCategory === 'all' || service.category === selectedCategory)
                .map((service) => (
                <div key={service.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  {/* Service Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-white/90 text-sm">{service.description}</p>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-8">
                    {/* Features */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-100">
                      <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Özellikler
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-text-secondary">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-100">
                      <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Faydalar
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center text-sm text-text-secondary">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <span className="text-sm text-text-light">Başlangıç Fiyatı</span>
                          <p className="text-xl font-bold text-text-primary">{service.price}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-text-light">Proje Süresi</span>
                          <p className="text-lg font-semibold text-text-primary">2-4 Hafta</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Link 
                          to={`/hizmet/${service.slug}`}
                          className="flex-1 inline-flex items-center justify-center bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Detayları Gör</span>
                        </Link>
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-6 bg-background-section">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-text-primary mb-6">Çalışma Sürecimiz</h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Projelerinizi adım adım hayata geçiriyoruz. Her aşamada sizinle birlikte çalışıyoruz.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "İlk Görüşme",
                  description: "İhtiyaçlarınızı dinliyor, projenizi planlıyoruz.",
                  icon: "💬"
                },
                {
                  step: "02", 
                  title: "Teknik Analiz",
                  description: "Alanınızı inceliyor, en uygun çözümü belirliyoruz.",
                  icon: "🔍"
                },
                {
                  step: "03",
                  title: "Proje Tasarımı",
                  description: "Detaylı planlar ve 3D görselleştirmeler hazırlıyoruz.",
                  icon: "📐"
                },
                {
                  step: "04",
                  title: "Kurulum & Eğitim",
                  description: "Sistemi kuruyor, kullanım eğitimi veriyoruz.",
                  icon: "🚀"
                }
              ].map((process, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-green-500 rounded-2xl mx-auto flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                      {process.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center text-sm font-bold">
                      {process.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{process.title}</h3>
                  <p className="text-text-secondary">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-text-primary mb-6">Neden Bizi Seçmelisiniz?</h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                15 yıllık deneyimimiz ve 500+ başarılı projemizle güvenilir çözümler sunuyoruz.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🏆",
                  title: "15+ Yıl Deneyim",
                  description: "Sektörde uzun yılların getirdiği bilgi ve deneyim"
                },
                {
                  icon: "📈",
                  title: "500+ Başarılı Proje",
                  description: "Farklı ölçeklerde tamamlanmış başarılı projeler"
                },
                {
                  icon: "🔧",
                  title: "7/24 Destek",
                  description: "Kurulum sonrası sürekli teknik destek ve bakım"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-primary/10 to-green-500/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Projenizi Hayata Geçirmeye Hazır mısınız?
            </h2>
            <p className="text-xl text-text-secondary mb-12">
              Uzman ekibimizle iletişime geçin ve size özel çözümler sunalım.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/iletisim"
                className="inline-flex items-center justify-center bg-primary text-white font-bold py-4 px-8 rounded-2xl hover:bg-primary/90 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-lg min-w-[200px]"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Ücretsiz Danışmanlık</span>
              </a>
              
              <a 
                href="tel:+905551234567"
                className="inline-flex items-center justify-center bg-transparent border-2 border-primary text-primary font-bold py-4 px-8 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-lg min-w-[200px]"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Hemen Ara</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;

