import React from 'react';

const Products: React.FC = () => {
  const products = [
    {
      name: "Akıllı Sulama Sistemi",
      description: "IoT sensörler ile otomatik sulama ve su tasarrufu",
      price: "₺15.000",
      features: ["Otomatik sulama", "Su tasarrufu", "Mobil kontrol", "Hava durumu entegrasyonu"],
      image: "🌱"
    },
    {
      name: "Toprak Analiz Cihazı",
      description: "Gerçek zamanlı toprak analizi ve öneriler",
      price: "₺8.500",
      features: ["pH ölçümü", "Nem sensörü", "Besin analizi", "Mobil raporlama"],
      image: "🔬"
    },
    {
      name: "Hastalık Tespit Sistemi",
      description: "Yapay zeka ile bitki hastalıklarını erken tespit",
      price: "₺12.000",
      features: ["Görüntü analizi", "Erken uyarı", "Tedavi önerileri", "Veri saklama"],
      image: "🔍"
    },
    {
      name: "Verim Takip Sistemi",
      description: "Mahsul verimini takip ve analiz",
      price: "₺10.000",
      features: ["Verim ölçümü", "Tarihsel analiz", "Karşılaştırma", "Raporlama"],
      image: "📊"
    }
  ];

  return (
    <section id="products" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ürünlerimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Modern tarım teknolojileri ile donatılmış ürünlerimiz ile 
            tarımınızı dijitalleştirin ve verimliliğinizi artırın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="card group hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{product.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
                <div className="text-2xl font-bold text-primary-600 mb-4">
                  {product.price}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <button className="btn-primary w-full">
                  Detayları Gör
                </button>
                
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Özel Çözümler
            </h3>
            <p className="text-secondary-100 text-lg mb-8 max-w-2xl mx-auto">
              İhtiyaçlarınıza özel çözümler geliştiriyoruz. 
              Uzman ekibimiz size en uygun sistemi tasarlar.
            </p>
            <button className="bg-white text-secondary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Özel Teklif Al
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
