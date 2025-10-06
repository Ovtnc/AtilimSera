import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => {
  const stats = [
    {
      number: "500+",
      label: "Tamamlanan Proje",
      description: "Başarıyla tamamladığımız sera projeleri"
    },
    {
      number: "15+",
      label: "Yıllık Deneyim",
      description: "Sera sektöründeki deneyimimiz"
    },
    {
      number: "50",
      label: "Dönüm/Yıl Kapasite",
      description: "Yıllık üretim ve montaj kapasitemiz"
    },
    {
      number: "%98",
      label: "Müşteri Memnuniyeti",
      description: "Müşterilerimizin memnuniyet oranı"
    }
  ];

  return (
    <div className="min-h-screen bg-background-light">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
      

        <section className="py-16 md:py-24 from-primary/10 to-background-light dark:to-background-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center" data-reveal>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Hakkımızda
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
              Atılım Mühendislik ve Sera Kurulum Sistemleri olarak sera sektöründe profesyonel kalite anlayışıyla tarım sektörüne hizmet vermekteyiz. </p>
            </div>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">Firmamız Hakkında</h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">
                    Atılım Mühendislik ve Sera Kurulum Sistemleri olarak sera sektöründe profesyonel kalite anlayışıyla tarım sektörüne hizmet vermekteyiz. Firmamız yılda ortalama <strong className="text-primary font-semibold">50 dönüm</strong> üretim ve montaj kapasitesine sahip olup, gün geçtikçe kapasitesini arttırmaktadır.
                  </p>
                  <p className="text-lg">
                    Sera sektöründe standardı yükseltmek ve sektörün mühendislik deneyimlerinden uzak olmaması sebebi ile bünyesinde <strong className="text-primary font-semibold">Ziraat Mühendisi</strong>, <strong className="text-primary font-semibold">Makine mühendisi</strong> ve <strong className="text-primary font-semibold">Su Ürünleri Mühendisi</strong> çalıştırmaktadır.
                  </p>
                  <p className="text-lg">
                    Firmamız projelendirme aşamasından anahtar teslim sera kurulumu, kurulum sonrası ürün yetiştirme ve pazarlama da dahil olmak üzere <strong className="text-primary font-semibold">Türkiye genelinde</strong> hizmet vermektedir.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Sera Kurulumu"
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Misyonumuz</h2>
                <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Seracılık sektöründe üretim, montaj ve tesliminden sonraki karşılaşılabilecek her türlü sorunda 
                  yatırımcımızın yanında olan sağlam ve güvenilir ekonominin ancak üretim ile gerçekleşebileceğini 
                  benimseyen firmamız, üretmek ve üretmeye yön vermek adına ülkemizde tarıma yatırım yapanların 
                  yanında olacaktır.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Vizyonumuz</h2>
                <div className="w-20 h-1 bg-green-500 rounded-full mb-6"></div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Kaynaklarımızı ve iş gücümüzü verimli kullanarak, sektörün ve toplumun beklentilerine uygun, 
                  kaliteli, modern işler yapmak. Bilgi birikimimizle sağladığımız İstihdam ve kazanç olanakları 
                  ile hem ülke ekonomisine katkıda bulunmak hem de yeni nesillere ışık tutmak.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Policy */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Kalite Politikamız</h2>
              <div className="w-20 h-1 bg-primary rounded-full mb-8 mx-auto"></div>
              <p className="text-gray-600 leading-relaxed text-lg text-center">
                Kalite politikamız, Tüm süreçlerde sağladığımız hizmet ve ürün ile; müşterinin memnuniyetini 
                beklentilerini en üst düzeyde tutmak, müşterinin geri bildirimlerini etkin bir şekilde yönetmek 
                zamanında teslimat yapmak ve sürekli iyileştirmeyi amaçlayan, bir anlayış içinde güvenilir ve 
                aranan firma olarak maliyetleri düşürmek karlılığı arttırmak için teknolojik gelişmeleri yakından 
                takip eden ve uygulayan kurumsal yapıda olmaktır.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Approach */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Teknik Yaklaşımımız</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Seralar, iklim, topografya, ısıtma, sulama, altyapı ve tüm parametreler dikkate alınarak kurulmalıdır.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">İklim Analizi</h3>
                  <p className="text-gray-600">
                    Sera kurulacak bölgenin tüm iklim değerleri, ışık, sıcaklık, rüzgar, kar yükü ve altyapı 
                    faktörlerini deneyimli teknik ekibimiz ile hesaplıyoruz.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Modern Teknoloji</h3>
                  <p className="text-gray-600">
                    Bitkilerin istemiş olduğu hava, ısı, ışık ve nem dengesi ancak iklimlendirme kontrolü ve 
                    teknolojik modern seralar ile mümkündür.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Yüksek Üretim</h3>
                  <p className="text-gray-600">
                    Bölgeye uygun sera tipi ile yüksek üretim potansiyelini sağlamaya çalışmaktayız.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Teknik Analiz"
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Çalışmalarımızdan Görüntüler</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sera kurulum süreçlerimizi ve teknolojilerimizi yakından inceleyin
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/XGogbi4xVjI"
                  title="Atılım Modern Sera - Çalışmalarımızdan Görüntüler"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Rakamlarla Atılım</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Başarılarımızı rakamlarla gösteriyoruz
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-primary">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Projenizde Birlikte Çalışalım
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Uzman ekibimizle iletişime geçin ve size özel sera çözümleri sunalım.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/iletisim"
                className="inline-flex items-center justify-center bg-white text-primary font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-lg min-w-[200px]"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Ücretsiz Danışmanlık</span>
              </a>
              
              <a 
                href="tel:+905551234567"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-2xl hover:bg-white hover:text-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-lg min-w-[200px]"
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

export default AboutPage;