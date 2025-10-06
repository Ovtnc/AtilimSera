import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface BlogPostType {
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
  published?: boolean;
  createdAt?: string;
  slug?: string;
}

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5001/api/blog?published=true&limit=6');
        const data = await response.json();
        
        if (data.posts && data.posts.length > 0) {
          const apiPosts = data.posts.map((post: any) => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author: "Atılım Modern Sera",
            date: new Date(post.created_at).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            category: post.category || "Genel",
            image: post.image || "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "5 dk",
            tags: post.meta_keywords ? post.meta_keywords.split(',').map((tag: string) => tag.trim()) : [post.category],
            published: post.published,
            createdAt: post.created_at,
            slug: post.slug
          }));
          
          setBlogPosts(apiPosts);
        } else {
          setBlogPosts([]);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const categories = ["Tümü", "Sera Teknolojileri", "Hidroponik Tarım", "Tarım İpuçları", "Haberler", "Teknoloji"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleReadMore = (post: BlogPostType) => {
    navigate(`/blog/${post.slug || post.id}`);
  };

  if (loading) {
    return (
      <section id="blog-list" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Blog yazıları yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog-list" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tarım Teknolojileri
            <span className="block text-green-600">Blog & Haberler</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Modern tarım, topraksız tarım ve sürdürülebilir tarım teknolojileri hakkında 
            güncel bilgiler ve uzman görüşleri.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Blog yazılarında ara..."
              className="w-full px-6 py-4 pl-14 pr-4 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-white shadow-lg"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-green-100 hover:text-green-700 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="text-center mb-8">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{filteredPosts.length}</span> blog yazısı bulundu
            </p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 && !loading ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Blog yazısı bulunamadı</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Arama kriterlerinize uygun yazı bulunamadı.' : 'Henüz yayınlanmış blog yazısı bulunmuyor.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                onClick={() => handleReadMore(post)}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>{post.author}</span>
                    <span>•</span>
                    <time dateTime={post.createdAt}>
                      {post.date}
                    </time>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <button className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Devamını Oku
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* View All Button */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/blog')}
              className="bg-white text-green-600 border-2 border-green-600 font-semibold py-3 px-8 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg"
            >
              Tüm Blog Yazılarını Görüntüle
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Blog Güncellemelerini Kaçırmayın
            </h3>
            <p className="text-green-100 mb-6">
              En son tarım teknolojileri ve yenilikler hakkındaki güncellemeleri 
              e-posta ile almak için abone olun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 border-0 rounded-lg focus:outline-none focus:ring-4 focus:ring-white/30 bg-white text-gray-900"
              />
              <button className="bg-white text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;