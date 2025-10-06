import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Topraksız tarım nedir ve nasıl çalışır?",
      answer: "Topraksız tarım, bitkilerin toprak olmadan yetiştirildiği bir tarım yöntemidir. Bitkiler, besin çözeltisi içeren suda veya inert malzemelerde (perlit, vermikülit gibi) kök salarak büyür. Bu yöntem, su ve besin maddelerinin daha verimli kullanılmasını sağlar."
    },
    {
      question: "Topraksız tarımın geleneksel tarıma göre avantajları nelerdir?",
      answer: "Topraksız tarım %90'a varan su tasarrufu sağlar, pestisit kullanımını ortadan kaldırır, yıl boyunca üretim yapılabilir, alan verimliliği 10 kata kadar artar ve iklim koşullarından bağımsız üretim mümkündür."
    },
    {
      question: "Hangi bitkiler topraksız tarımda yetiştirilebilir?",
      answer: "Marul, domates, salatalık, biber, çilek, otlar ve yeşil yapraklı sebzeler topraksız tarımda başarıyla yetiştirilebilir. Sistemin türüne göre kök bitkileri de yetiştirilebilir."
    },
    {
      question: "Sistem kurulumu ne kadar sürer?",
      answer: "Proje büyüklüğüne bağlı olarak, küçük sistemler 1-2 hafta, büyük ölçekli tesisler 2-6 ay arasında kurulabilir. Kurulum süresi, altyapı hazırlığı ve sistem karmaşıklığına göre değişir."
    },
    {
      question: "Bakım ve işletme maliyetleri nasıldır?",
      answer: "İlk yatırım maliyeti geleneksel tarıma göre yüksektir, ancak uzun vadede su tasarrufu, yüksek verim ve sürekli üretim sayesinde daha karlıdır. Elektrik ve besin maddesi maliyetleri ana işletme giderleridir."
    },
    {
      question: "Teknik destek ve eğitim sağlıyor musunuz?",
      answer: "Evet, sistem kurulumundan sonra kapsamlı eğitim programları ve 7/24 teknik destek sağlıyoruz. Ayrıca uzaktan izleme ve yönetim sistemleri ile sürekli danışmanlık hizmeti veriyoruz."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 bg-white dark:bg-background-dark/50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12" data-reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Sıkça Sorulan Sorular
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Topraksız tarım hakkında merak ettiğiniz soruların cevapları.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg overflow-hidden"
                data-reveal
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg 
                      className={`w-5 h-5 text-primary transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default FAQ;
