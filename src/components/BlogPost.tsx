import React from 'react';

interface BlogPostProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    image: string;
    readTime: string;
    tags: string[];
    meta_description?: string;
    meta_keywords?: string;
    slug?: string;
  };
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Back Button */}
      <div className="container mx-auto px-6 py-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Geri Dön
        </button>
      </div>

      {/* Article Header */}
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="bg-primary text-background-dark px-3 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-6 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-medium">
              {post.excerpt}
            </div>
            
            <div className="text-gray-800 dark:text-gray-200 leading-relaxed space-y-6" 
                 dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
            
            {/* SEO-friendly additional content based on category */}
            {post.category === 'Teknoloji' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  Tarım Teknolojilerinde Son Gelişmeler
                </h2>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  Modern tarım teknolojileri, geleneksel yöntemlere kıyasla %30-50 daha yüksek verim sağlamaktadır. 
                  IoT sensörleri, yapay zeka destekli analiz ve otomatik sulama sistemleri ile tarım sektörü 
                  dijitalleşme sürecinde büyük adımlar atmaktadır.
                </p>
              </section>
            )}
            
            {post.category === 'İnovasyon' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  Sürdürülebilir Tarım İnovasyonları
                </h2>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  Sürdürülebilir tarım uygulamaları, çevresel etkiyi minimize ederken maksimum verim elde etmeyi 
                  hedefler. Su tasarrufu, organik gübreleme ve biyolojik mücadele yöntemleri ile gelecek nesillere 
                  yaşanabilir bir dünya bırakabiliriz.
                </p>
              </section>
            )}
            
            {post.category === 'Teknik' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  Teknik Uygulamalar ve Detaylar
                </h2>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  Sera kurulumu ve bakımında dikkat edilmesi gereken teknik detaylar, üretim verimliliğini 
                  doğrudan etkiler. Doğru havalandırma, ısıtma ve sulama sistemleri kurulumu için uzman 
                  desteği almak önemlidir.
                </p>
              </section>
            )}
            
            {post.category === 'Organik Tarım' && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  Organik Tarım Uygulamaları
                </h2>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  Organik tarım, kimyasal girdi kullanmadan doğal yöntemlerle üretim yapma sanatıdır. 
                  Toprak sağlığını koruyan, biyolojik çeşitliliği destekleyen bu yöntemler, hem insan 
                  sağlığı hem de çevre için faydalıdır.
                </p>
              </section>
            )}
          </div>
        </div>
      </article>

      {/* Tags */}
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-3xl mx-auto">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Etiketler</h4>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Author Info */}
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-background-dark/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{post.author}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Tarım teknolojileri ve sürdürülebilir tarım konularında uzman. 
                  Modern tarım yöntemleri hakkında araştırmalar yapmakta ve 
                  sektördeki gelişmeleri takip etmektedir.
                </p>
                <div className="flex gap-4">
                  <button className="text-primary hover:text-primary/80 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button className="text-primary hover:text-primary/80 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">İlgili Yazılar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="İlgili yazı"
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Dikey Tarım Sistemleri</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Şehirde tarım devrimi hakkında detaylı bilgi...</p>
              </div>
            </div>
            <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="İlgili yazı"
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Hidroponik Sistemler</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Besin çözeltisi yönetimi teknikleri...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
