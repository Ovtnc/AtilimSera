import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';

interface BlogPost {
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

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    document.title = "Blog & Haberler | Atılım Modern Sera - Tarım Teknolojileri";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Topraksız tarım, sürdürülebilir tarım ve modern tarım teknolojileri hakkında güncel bilgiler ve uzman görüşleri. Sera kurulumu, hidroponik sistemler ve dikey tarım konularında kapsamlı blog yazıları.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Topraksız tarım, sürdürülebilir tarım ve modern tarım teknolojileri hakkında güncel bilgiler ve uzman görüşleri. Sera kurulumu, hidroponik sistemler ve dikey tarım konularında kapsamlı blog yazıları.';
      document.head.appendChild(meta);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'tarım blog, topraksız tarım, hidroponik, sera teknolojileri, sürdürülebilir tarım, dikey tarım, organik tarım, tarım haberleri');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'tarım blog, topraksız tarım, hidroponik, sera teknolojileri, sürdürülebilir tarım, dikey tarım, organik tarım, tarım haberleri';
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog?published=true&limit=20');
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

  const categories = ["Tümü", ...Array.from(new Set(blogPosts.map(post => post.category).filter(Boolean)))];
  
  const filteredAndSortedPosts = blogPosts
    .filter(post => {
      const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        case 'oldest':
          return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime();
        case 'popular':
          // For now, just sort by newest. In a real app, you'd have view counts
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        default:
          return 0;
      }
    });

  const handleReadMore = (post: BlogPost) => {
    navigate(`/blog/${post.slug || post.id}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the filter
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPosts = filteredAndSortedPosts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <Header />
        <main className="pt-20">
          <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Blog yazıları yükleniyor...</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="absolute inset-0 bg-white/60"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Tarım Teknolojileri
                <span className="block text-green-600">Blog & Haberler</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Modern tarım, topraksız tarım ve sürdürülebilir tarım teknolojileri hakkında 
                güncel bilgiler, uzman görüşleri ve pratik ipuçları.
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
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
              </form>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sırala:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'popular')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="newest">En Yeni</option>
                  <option value="oldest">En Eski</option>
                  <option value="popular">En Popüler</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            {filteredAndSortedPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Blog yazısı bulunamadı</h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Arama kriterlerinize uygun yazı bulunamadı.' : 'Henüz yayınlanmış blog yazısı bulunmuyor.'}
                </p>
              </div>
            ) : (
              <>
                {/* Results Count */}
                <div className="mb-8">
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">{filteredAndSortedPosts.length}</span> blog yazısı bulundu
                  </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedPosts.map((post, index) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                      onClick={() => handleReadMore(post)}
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

                        <button className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors group-hover:bg-green-700">
                          Devamını Oku
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </section>

     
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;