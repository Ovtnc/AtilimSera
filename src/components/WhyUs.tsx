import React from 'react';

const WhyUs: React.FC = () => {
  const features = [
    {
      icon: "🏆",
      title: "15+ Yıllık Deneyim",
      description: "Sera kurulumunda uzman ekibimizle 15 yılı aşkın deneyimimiz"
    },
    {
      icon: "🌱",
      title: "Sürdürülebilir Çözümler",
      description: "Çevre dostu teknolojilerle gelecek nesillere temiz bir dünya"
    },
    {
      icon: "⚡",
      title: "Yüksek Verimlilik",
      description: "Geleneksel tarıma göre %90 daha az su, %300 daha fazla verim"
    },
    {
      icon: "🔧",
      title: "7/24 Teknik Destek",
      description: "Kurulum sonrası sürekli destek ve bakım hizmetleri"
    },
    {
      icon: "💰",
      title: "Uygun Fiyat Garantisi",
      description: "En kaliteli malzemelerle en uygun fiyat garantisi"
    },
    {
      icon: "📈",
      title: "ROI Analizi",
      description: "Yatırımınızın geri dönüş süresini hesaplayan özel yazılım"
    }
  ];

  return (
    <section id="why-us" className="py-10  bg-gradient-to-b from-white to-background-light dark:from-background-dark dark:to-background-dark/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16" data-reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Neden Atılım Modern Sera?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Türkiye'nin önde gelen sera kurulum firması olarak, müşterilerimize en iyi hizmeti sunuyoruz.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-background-dark rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              data-reveal
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full mb-4 shadow-lg">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyUs;

