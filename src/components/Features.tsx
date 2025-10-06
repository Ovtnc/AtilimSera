import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      icon: "🌱",
      title: "Akıllı Tarım",
      description: "IoT sensörler ve yapay zeka ile toprak, hava ve bitki sağlığını sürekli izleyin."
    },
    {
      icon: "📊",
      title: "Veri Analizi",
      description: "Gelişmiş analitik araçlarla tarım verilerinizi analiz edin ve kararlarınızı optimize edin."
    },
    {
      icon: "🌍",
      title: "Sürdürülebilirlik",
      description: "Çevre dostu tarım uygulamaları ile doğal kaynakları koruyun ve verimliliği artırın."
    },
    {
      icon: "📱",
      title: "Mobil Erişim",
      description: "Her yerden erişilebilir mobil uygulama ile tarlanızı 7/24 takip edin."
    },
    {
      icon: "🤖",
      title: "Otomasyon",
      description: "Sulama, gübreleme ve ilaçlama işlemlerini otomatik olarak yönetin."
    },
    {
      icon: "📈",
      title: "ROI Takibi",
      description: "Yatırım getirisi ve maliyet analizi ile işletmenizin karlılığını artırın."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Neden AgriTech?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Modern teknoloji ile tarım sektöründe devrim yaratıyoruz. 
            Verimliliği artırırken çevreyi koruyan sürdürülebilir çözümler sunuyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
