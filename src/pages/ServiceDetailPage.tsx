import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Hizmet verilerini burada tanımlıyoruz (gerçek uygulamada API'den gelecek)
  const servicesData: { [key: string]: any } = {
    'modern-sera-kurulumlari': {
      id: 1,
      title: "Modern Sera Kurulumları",
      description: "Yüksek teknoloji sera sistemleri ile yıl boyunca optimal üretim yapın. İklim kontrolü ve otomasyon sistemleriyle desteklenen çözümlerimiz.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      detailedDescription: "Modern sera kurulumları, gelişmiş teknoloji ve mühendislik bilgisi gerektiren karmaşık projelerdir. Sera yapıları, iklim kontrolü, otomasyon sistemleri ve enerji verimliliği konularında uzman ekibimizle birlikte en uygun çözümleri sunuyoruz. Projelerimizde kullandığımız malzemeler ve teknolojiler, uzun ömürlü ve verimli üretim sağlamak için özenle seçilmiştir.",
      images: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      specifications: {
        "Malzeme": "Galvanizli çelik, polikarbonat",
        "Ömür": "25+ yıl",
        "Garanti": "5 yıl",
        "Kurulum Süresi": "2-4 hafta"
      }
    },
    'sera-iklim-kontrol-sistemleri': {
      id: 2,
      title: "Sera İklim Kontrol Sistemleri",
      description: "Tam otomatik iklim kontrolü ile sıcaklık, nem, havalandırma ve CO2 seviyelerini optimal seviyede tutun.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      detailedDescription: "İklim kontrol sistemleri, sera içindeki çevresel faktörleri sürekli olarak izleyen ve kontrol eden akıllı sistemlerdir. Bu sistemler sayesinde bitkilerin en optimal koşullarda büyümesi sağlanır ve enerji tüketimi minimize edilir. Sensörler, otomatik kontrolcüler ve havalandırma sistemleri ile entegre çalışan bu teknoloji, modern seracılığın vazgeçilmez parçasıdır.",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      specifications: {
        "Kontrol Hassasiyeti": "±0.5°C",
        "Sensör Sayısı": "8-16 adet",
        "Kontrol Alanı": "2000m²'ye kadar",
        "Enerji Tasarrufu": "%40"
      }
    },
    'hidroponik-sistemler': {
      id: 5,
      title: "Hidroponik Sistemler",
      description: "Topraksız tarım teknolojisi ile %90 daha az su kullanarak %300 daha fazla verim elde edin.",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      detailedDescription: "Hidroponik sistemler, bitkilerin toprak olmadan besin çözeltisi içinde yetiştirilmesini sağlayan modern tarım teknolojisidir. Bu sistemler sayesinde su kullanımı %90 azalırken, verim %300 artabilir. NFT, DWC, Ebb & Flow ve Aeroponik gibi farklı tekniklerle her türlü bitki yetiştirilebilir. Sistemlerimiz tam otomatik besin dozajı, pH kontrolü ve sulama yönetimi içerir.",
      images: [
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      specifications: {
        "Su Tasarrufu": "%90",
        "Verim Artışı": "%300",
        "Sistem Kapasitesi": "50-5000 bitki",
        "Otomasyon": "Tam otomatik"
      }
    },
    'sera-golgeleme-sistemleri': {
      id: 3,
      title: "Sera Gölgeleme Sistemleri",
      description: "Otomatik gölgeleme sistemleri ile güneş ışığını kontrol edin ve bitkilerinizi koruyun.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      detailedDescription: "Gölgeleme sistemleri, sera içindeki sıcaklığı kontrol etmek ve bitkileri aşırı güneş ışığından korumak için kullanılan önemli bir teknolojidir. Alüminyum gölgeleme perdeleri, termal gölgeleme sistemleri ve kış gölgelemesi gibi farklı seçeneklerle her türlü iklim koşuluna uygun çözümler sunuyoruz. Sistemlerimiz otomatik olarak çalışır ve enerji tasarrufu sağlar.",
      images: [
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      specifications: {
        "Gölgeleme Oranı": "%30-80",
        "Kontrol Sistemi": "Otomatik",
        "Enerji Tasarrufu": "%25",
        "Kurulum Alanı": "Sınırsız"
      }
    },
    'sera-isitma-ve-sogutma': {
      id: 4,
      title: "Sera Isıtma ve Soğutma",
      description: "Yıl boyunca optimal sıcaklık için gelişmiş ısıtma ve soğutma sistemleri.",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      detailedDescription: "Isıtma ve soğutma sistemleri, serada yıl boyunca optimal sıcaklık koşullarını sağlamak için kritik öneme sahiptir. Jeotermal ısıtma sistemleri, hava ısıtma üniteleri, soğutma sistemleri ve ısı pompaları gibi farklı teknolojilerle enerji verimli çözümler sunuyoruz. Sistemlerimiz otomatik kontrol ile çalışır ve düşük işletme maliyeti sağlar.",
      images: [
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      specifications: {
        "Sıcaklık Kontrolü": "±1°C",
        "Enerji Verimliliği": "%85",
        "Kontrol Alanı": "5000m²'ye kadar",
        "İşletme Maliyeti": "%40 düşük"
      }
    },
    'dikey-tarim-sistemleri': {
      id: 6,
      title: "Dikey Tarım Sistemleri",
      description: "Şehir içi ve sınırlı alanlarda maksimum verim için dikey tarım sistemleri. LED aydınlatma ve akıllı kontrol sistemleri.",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      detailedDescription: "Dikey tarım sistemleri, sınırlı alanlarda maksimum verim elde etmek için tasarlanmış devrim niteliğinde bir teknolojidir. LED spektrum kontrolü, çok katlı sistemler ve alan optimizasyonu ile şehir içinde bile tarım yapılabilir. Sistemlerimiz %90 alan tasarrufu sağlarken, yıl boyu hasat imkanı sunar. Enerji verimli LED aydınlatma ve akıllı kontrol sistemleri ile en optimal büyüme koşulları sağlanır.",
      images: [
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      specifications: {
        "Alan Tasarrufu": "%90",
        "Kat Sayısı": "5-15 kat",
        "LED Güç": "50-200W/m²",
        "Üretim Kapasitesi": "10x daha fazla"
      }
    },
    'besin-ve-sulama-yonetimi': {
      id: 7,
      title: "Besin ve Sulama Yönetimi",
      description: "Optimal bitki gelişimi için profesyonel besin çözeltisi yönetimi. pH, EC kontrolü ve otomatik dozaj sistemleri.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      detailedDescription: "Besin ve sulama yönetimi, topraksız tarım sistemlerinin kalbi niteliğindedir. pH ve EC kontrolü, otomatik besin dozajı, özel besin formülasyonları ve su arıtma sistemleri ile bitkilerin en optimal koşullarda beslenmesi sağlanır. Sistemlerimiz sürekli izleme yaparak otomatik olarak ayarlama yapar ve su tasarrufu sağlar. Bu sayede hastalık riski minimize edilir ve verim maksimize edilir.",
      images: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      specifications: {
        "pH Kontrolü": "5.5-6.5",
        "EC Kontrolü": "0.5-3.0 mS/cm",
        "Dozaj Hassasiyeti": "±0.1ml",
        "Su Tasarrufu": "%85"
      }
    },
    'aeroponik-sistemler': {
      id: 8,
      title: "Aeroponik Sistemler",
      description: "Hava ve su karışımı ile bitki köklerini besleyen en gelişmiş topraksız tarım teknolojisi.",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      detailedDescription: "Aeroponik sistemler, topraksız tarımın en gelişmiş formudur. Bitki kökleri havada asılı durur ve mikro damlacıklar halinde besin çözeltisi ile beslenir. Bu sistem %95 su tasarrufu sağlarken, köklerin maksimum oksijen almasını sağlar. Mikro damlacık teknolojisi ile besinler doğrudan köklere ulaşır ve hastalık riski minimum seviyeye iner. En hızlı büyüme oranları aeroponik sistemlerde elde edilir.",
      images: [
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      specifications: {
        "Su Tasarrufu": "%95",
        "Büyüme Hızı": "3x daha hızlı",
        "Oksijen Seviyesi": "Maksimum",
        "Hastalık Riski": "Minimum"
      }
    },
    'akilli-izleme-sistemleri': {
      id: 9,
      title: "Akıllı İzleme Sistemleri",
      description: "IoT sensörleri ve uzaktan izleme teknolojileri ile seranızı akıllı hale getirin. Mobil uygulama ile her yerden kontrol edin.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      detailedDescription: "Akıllı izleme sistemleri, modern seracılığın vazgeçilmez parçasıdır. IoT sensör ağı ile sıcaklık, nem, ışık, pH, EC ve diğer tüm parametreler sürekli izlenir. Mobil uygulama ile dünyanın her yerinden seranızı kontrol edebilirsiniz. Veri analizi ve raporlama sistemi ile performansınızı takip edebilir, otomatik alarmlar ile sorunları önceden tespit edebilirsiniz. Sistem tamamen otomatik çalışır ve müdahale gerektirmez.",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      specifications: {
        "Sensör Sayısı": "50+ parametre",
        "Veri Güncelleme": "Her 30 saniye",
        "Mobil Uygulama": "iOS & Android",
        "Veri Saklama": "2 yıl"
      }
    },
    'danismanlik-ve-egitim': {
      id: 10,
      title: "Danışmanlık ve Eğitim",
      description: "Sıfırdan kurulum, işletme ve sürekli gelişim için uzman danışmanlık hizmetleri. Kapsamlı eğitim programları.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      detailedDescription: "Danışmanlık ve eğitim hizmetlerimiz, projenizin başarısı için kritik öneme sahiptir. Fizibilite analizi ile projenizin uygulanabilirliğini değerlendirir, sistem eğitimi ile ekibinizi hazırlarız. 7/24 teknik destek ile her zaman yanınızdayız. Proje yönetimi hizmetimiz ile kurulumdan işletmeye kadar tüm süreçleri yönetiriz. Uzman rehberliğimiz, kapsamlı eğitim programlarımız ve sürekli desteğimiz ile başarı garantisi sunuyoruz.",
      images: [
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      specifications: {
        "Eğitim Süresi": "1-4 hafta",
        "Destek Saatleri": "7/24",
        "Başarı Oranı": "%95",
        "Müşteri Memnuniyeti": "%98"
      }
    }
  };

  const service = servicesData[slug || ''];

  if (!service) {
    return (
      <div className="min-h-screen bg-background-dark">
        <Header />
        <main className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Hizmet Bulunamadı</h1>
            <p className="text-xl mb-8">Aradığınız hizmet mevcut değil.</p>
            <Link 
              to="/hizmetlerimiz"
              className="inline-flex items-center bg-primary text-background-dark font-bold py-3 px-6 rounded-xl hover:bg-opacity-90 transition-all duration-300"
            >
              Hizmetlerimize Dön
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-background-section to-background-light">
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-text-primary">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {service.category === 'sera' ? 'Sera Hizmetleri' : 
                     service.category === 'topraksiz' ? 'Topraksız Tarım' : 
                     service.category === 'teknoloji' ? 'Teknoloji' : 'Danışmanlık'}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {service.title}
                </h1>
                <p className="text-xl mb-8 text-text-secondary leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/iletisim"
                    className="inline-flex items-center justify-center bg-primary text-white font-bold py-4 px-8 rounded-2xl hover:bg-primary/90 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-lg min-w-[200px]"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Teklif Al</span>
                  </a>
                  <Link 
                    to="/hizmetlerimiz"
                    className="inline-flex items-center justify-center bg-transparent border-2 border-primary text-primary font-bold py-4 px-8 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-lg min-w-[200px]"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Geri Dön</span>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </section>

        {/* Detailed Description */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-text-primary mb-8">Detaylı Açıklama</h2>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-lg mb-8">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-text-secondary text-lg leading-relaxed">
                      {service.detailedDescription}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-lg mb-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-6">Özellikler</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-lg">
                  <h3 className="text-2xl font-bold text-text-primary mb-6">Faydalar</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-text-secondary">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Specifications */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
                  <h3 className="text-xl font-bold text-text-primary mb-6">Teknik Özellikler</h3>
                  <div className="space-y-4">
                    {Object.entries(service.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-text-secondary">{key}:</span>
                        <span className="text-text-primary font-semibold">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
                  <h3 className="text-xl font-bold text-text-primary mb-4">Fiyat Bilgisi</h3>
                  <p className="text-2xl font-bold text-primary mb-4">{service.price}</p>
                  <p className="text-text-secondary text-sm mb-6">
                    Detaylı fiyat bilgisi için iletişime geçin.
                  </p>
                  <a 
                    href="/iletisim"
                    className="w-full inline-flex items-center justify-center bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-primary/90 transition-all duration-300"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>İletişime Geç</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="py-20 px-6 bg-background-section">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">Görseller</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.images.map((image: string, index: number) => (
                <div key={index} className="group">
                  <img 
                    src={image} 
                    alt={`${service.title} - ${index + 1}`}
                    className="w-full h-64 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-primary/10 to-green-500/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Bu Hizmetle İlgileniyor musunuz?
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

export default ServiceDetailPage;
