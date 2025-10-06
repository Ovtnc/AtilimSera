import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_BASE_URL = 'http://localhost:5001/api';

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
  meta_description?: string;
  meta_keywords?: string;
  slug?: string;
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/blog/${id}`);
        const data = await response.json();
        
        if (data.post) {
          // Convert API post to blog format
          const apiPost = {
            id: data.post.id,
            title: data.post.title,
            excerpt: data.post.excerpt,
            content: data.post.content,
            author: data.post.author || "Atılım Modern Sera",
            date: new Date(data.post.created_at).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            category: data.post.category || "Genel",
            image: data.post.image || "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "5 dk",
            tags: data.post.tags ? data.post.tags.split(',').map((tag: string) => tag.trim()) : ["Tarım", "Teknoloji"],
            meta_description: data.post.meta_description || data.post.excerpt,
            meta_keywords: data.post.meta_keywords || data.post.category,
            slug: data.post.slug || `blog-${data.post.id}`
          };
          setPost(apiPost);
          
          // Fetch related posts
          await fetchRelatedPosts(data.post.category, data.post.id);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  const fetchRelatedPosts = async (category: string, currentId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog?published=true&category=${encodeURIComponent(category)}&limit=3`);
      const data = await response.json();
      
      if (data.posts) {
        const related = data.posts
          .filter((p: any) => p.id !== currentId)
          .slice(0, 2)
          .map((p: any) => ({
            id: p.id,
            title: p.title,
            excerpt: p.excerpt,
            author: p.author || "Atılım Modern Sera",
            date: new Date(p.created_at).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            category: p.category || "Genel",
            image: p.image || "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            readTime: "5 dk",
            tags: p.tags ? p.tags.split(',').map((tag: string) => tag.trim()) : ["Tarım", "Teknoloji"],
            slug: p.slug || `blog-${p.id}`
          }));
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  const handleBack = () => {
    navigate('/blog');
  };

  const handleRelatedPostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  // Update document title and meta tags for SEO
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Atılım Modern Sera Blog`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.meta_description || post.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = post.meta_description || post.excerpt;
        document.head.appendChild(meta);
      }
      
      // Update meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', post.meta_keywords || post.tags.join(', '));
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = post.meta_keywords || post.tags.join(', ');
        document.head.appendChild(meta);
      }
    }
  }, [post]);

  if (loading) {
    return (
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Yazı yükleniyor...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Yazı Bulunamadı
            </h1>
            <button
              onClick={handleBack}
              className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              Blog'a Dön
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="pt-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={handleBack}
              className="hover:text-green-600 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Blog
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{post.category}</span>
          </nav>
        </div>
      </div>

      <main className="min-h-screen">
        <article className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-12">
              <div className="mb-6">
                <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Excerpt */}
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                {post.excerpt}
              </p>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg prose-green max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  lineHeight: '1.8',
                  fontSize: '18px'
                }}
              />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiketler</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-green-100 hover:text-green-800 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{post.author}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Modern ve sürdürülebilir tarım teknolojileri konusunda uzman ekibimiz, 
                    topraksız tarım sistemleri, akıllı sera çözümleri ve yenilikçi tarım 
                    uygulamaları hakkında kapsamlı bilgiler paylaşmaktadır.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">İlgili Yazılar</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <article
                      key={relatedPost.id}
                      onClick={() => handleRelatedPostClick(relatedPost.slug || relatedPost.id.toString())}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{relatedPost.date}</span>
                          <span className="mx-2">•</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;