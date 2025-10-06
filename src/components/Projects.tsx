import React from 'react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-16 md:py-24 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12" data-reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Projelerimiz</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Başarılı topraksız tarım projelerimizle müşterilerimizin verimliliğini artırdık.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group" data-reveal>
            <div 
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden transition-transform duration-500 group-hover:scale-105" 
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAzv89EkkECdBQKQpVFr8kWYwzS16x8C7At1nekvysFY3Mbqi8YvAzBuvgPakxrjpIoFnzKGGRsKfkAaa3mbbV7wR9lwthOaH29iZkRrgOz2kZRIE-2FZWgkF894pW1sXyw4_FbA_3pDLF-Kig3fETFn9vv9eZfTKOvkdo43NLr-w5Cp30mfr7XxmzJ40-muxsNDIG9MupeBsRuthtMBAetkA2CUdIv9xIesBHB8wIDlRYY0cwuo99eTHjHxWZctaHvgnlye0P_Fcs")'
              }}
            ></div>
            <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
              Büyük Ölçekli Sera Projesi
            </p>
          </div>
          
          <div className="group" data-reveal>
            <div 
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden transition-transform duration-500 group-hover:scale-105" 
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCsFgjZ7tnh2h6nOyufllcSJYTVP1LzBxCLHD8JPxFmBvv9K36QB4NcCF1XJmw98jQKJ4OwDwkX68WD-fXvCFHVcpu9oPfzKTMLOfISZjaHRFmrfy5xo2ivKtApB1nreGRBkJlC7khwkiEPKIF93QEuFCU3ha_9MUYSzFDQacjRyEic0-c5G7XX15evBUiIoc4AXOP4SDcTE2fDhhaVwR3fFYsx_qulMSiKIsu0xUJlU4kRXmCiTISmccLbLsARVSnchCwoFK7QF7Q")'
              }}
            ></div>
            <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
              Kentsel Dikey Tarım Uygulaması
            </p>
          </div>
          
          <div className="group" data-reveal>
            <div 
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden transition-transform duration-500 group-hover:scale-105" 
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAaEsQKkScDOgGEJd_EMznYAb-UOGzQmH05nka2MO6tHhGXRAr1ZZrjYXx3f84jaRqzVY8SBle39q36WhT_YDVHL4552a7J4xY_iJiQX06kjobfi94RWWC5IYgrVGFmuzDMDzceB424Nr4zbSASr8UHm2eJD3Tx4YqME7VT7vQyUN3ZvHcHK-_Kx1APrREwXZRUfgBS9OfQPiAL6mk0Z4PAM9HbTG_KaPwSr1JuHRd0KgdbaRLjwTQbPqmRuEnmZcptkd17TmlJkww")'
              }}
            ></div>
            <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
              Organik Bitki Üretim Tesisi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
