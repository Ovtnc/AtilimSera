import React from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
}

const BlogPreview: React.FC = () => {
  const recentPosts: BlogPost[] = [
    {
      id: 1,
      title: "Topraksız Tarımın Geleceği: Sürdürülebilir Tarım Çözümleri",
      excerpt: "Modern tarım teknolojileri ile daha verimli ve çevre dostu üretim yöntemlerini keşfedin.",
      author: "Dr. Mehmet Yılmaz",
      date: "15 Aralık 2024",
      category: "Teknoloji",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "5 dk",
      tags: ["Hidroponik", "Sürdürülebilirlik", "Teknoloji"]
    },
    {
      id: 2,
      title: "Dikey Tarım Sistemleri: Şehirde Tarım Devrimi",
      excerpt: "Dikey tarım sistemleri ile şehirlerde taze ve organik ürünler yetiştirmenin yolları.",
      author: "Ziraat Müh. Ayşe Kaya",
      date: "12 Aralık 2024",
      category: "İnovasyon",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "7 dk",
      tags: ["Dikey Tarım", "Şehir Tarımı", "LED Teknolojisi"]
    },
    {
      id: 3,
      title: "Hidroponik Sistemlerde Besin Çözeltisi Yönetimi",
      excerpt: "Hidroponik sistemlerde bitki beslenmesi için optimal besin çözeltisi hazırlama teknikleri.",
      author: "Kimya Müh. Can Özkan",
      date: "10 Aralık 2024",
      category: "Teknik",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "6 dk",
      tags: ["Besin Çözeltisi", "pH Kontrolü", "EC Değeri"]
    }
  ];

  return (
    <section id="blog" className="py-16 md:py-24 bg-white dark:bg-background-dark/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12" data-reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Son Yazılarımız
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Topraksız tarım ve sürdürülebilir tarım teknolojileri hakkında en güncel içerikler.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post, index) => (
            <article 
              key={post.id} 
              className="bg-white dark:bg-background-dark/50 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              data-reveal
            >
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-background-dark px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {post.readTime}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  Devamını Oku
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center" data-reveal>
          <Link 
            to="/blog"
            className="inline-flex items-center justify-center bg-primary text-background-dark font-semibold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Tüm Yazıları Görüntüle
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
