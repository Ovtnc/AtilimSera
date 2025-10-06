import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16" data-reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Teknolojimizle Tanışın
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Topraksız tarımın çevresel ve ekonomik faydalarını interaktif verilerle keşfedin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white dark:bg-background-dark/50 p-8 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300" data-reveal>
            <div className="relative w-40 h-40 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-gray-200 dark:text-gray-700" d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
                <path className="text-primary" d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831" fill="none" strokeDasharray="90, 100" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">%90</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Daha Az</span>
              </div>
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Su Tasarrufu</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Geleneksel tarıma kıyasla %90'a varan su verimliliği sağlıyoruz.</p>
          </div>
          
          <div className="bg-white dark:bg-background-dark/50 p-8 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300" data-reveal>
            <div className="relative w-40 h-40 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-gray-200 dark:text-gray-700" d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
                <path className="text-primary" d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831" fill="none" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">10x</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Daha Fazla</span>
              </div>
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Alan Verimliliği</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Dikey tarım sistemlerimizle birim alandan 10 kata kadar daha fazla ürün elde ediyoruz.</p>
          </div>
          
          <div className="bg-white dark:bg-background-dark/50 p-8 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300" data-reveal>
            <div className="relative w-40 h-40 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-gray-200 dark:text-gray-700" d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831
                                      a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
                <path className="text-primary" d="M18 2.0845
                                      a 15.9155 15.9155 0 0 1 0 31.831" fill="none" strokeDasharray="100, 100" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">%100</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Kontrol</span>
              </div>
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Sıfır Pestisit</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Kontrollü ortamlarımızda pestisit kullanmadan, tamamen doğal ürünler yetiştiriyoruz.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;