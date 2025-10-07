import React, { useState, useEffect } from 'react';
import ImageUpload from '../ImageUpload';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  image_alt: string;
  category: string;
  author: string;
  published: boolean;
  slug: string;
  meta_description: string;
  meta_keywords: string;
  tags: string;
  created_at: string;
  updated_at: string;
}

const BlogManagement: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    image_alt: '',
    category: '',
    published: false,
    slug: '',
    meta_description: '',
    meta_keywords: '',
    tags: '',
    author: 'Atılım Modern Sera'
  });

  useEffect(() => {
    fetchBlogPosts();
    fetchCategories();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog?limit=50');
      const data = await response.json();
      if (data.posts) {
        setBlogPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/categories/admin/all', {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      const data = await response.json();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const generateMetaDescription = (content: string, excerpt: string) => {
    const text = excerpt || content.replace(/<[^>]*>/g, '');
    return text.length > 160 ? text.substring(0, 157) + '...' : text;
  };

  const generateKeywords = (title: string, category: string, tags: string) => {
    const keywords = [title, category];
    if (tags) {
      keywords.push(...tags.split(',').map(tag => tag.trim()));
    }
    return keywords.join(', ');
  };

  const savePost = async () => {
    try {
      const postData = {
        ...newPost,
        slug: newPost.slug || generateSlug(newPost.title),
        meta_description: newPost.meta_description || generateMetaDescription(newPost.content, newPost.excerpt),
        meta_keywords: newPost.meta_keywords || generateKeywords(newPost.title, newPost.category, newPost.tags)
      };

      const token = localStorage.getItem('token');
      const url = editingPost 
        ? `/api/blog/${editingPost.id}`
        : '/api/blog';
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        alert(editingPost ? 'Blog yazısı güncellendi!' : 'Blog yazısı kaydedildi!');
        setNewPost({
          title: '',
          content: '',
          excerpt: '',
          image: '',
          image_alt: '',
          category: '',
          published: false,
          slug: '',
          meta_description: '',
          meta_keywords: '',
          tags: '',
          author: 'Atılım Modern Sera'
        });
        setShowForm(false);
        setEditingPost(null);
        fetchBlogPosts();
      } else {
        const errorData = await response.json();
        alert(`Hata: ${errorData.error || 'Blog yazısı kaydedilemedi'}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Blog yazısı kaydedilirken hata oluştu!');
    }
  };

  const updatePost = async () => {
    if (!editingPost) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/blog/${editingPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(editingPost)
      });

      if (response.ok) {
        alert('Blog yazısı güncellendi!');
        setEditingPost(null);
        fetchBlogPosts();
      } else {
        const errorData = await response.json();
        alert(`Hata: ${errorData.error || 'Blog yazısı güncellenemedi'}`);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Blog yazısı güncellenirken hata oluştu!');
    }
  };

  const deletePost = async (id: number) => {
    if (window.confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/blog/${id}`, {
          method: 'DELETE',
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });

        if (response.ok) {
          alert('Blog yazısı silindi!');
          fetchBlogPosts();
        } else {
          const errorData = await response.json();
          alert(`Hata: ${errorData.error || 'Blog yazısı silinemedi'}`);
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Blog yazısı silinirken hata oluştu!');
      }
    }
  };

  const startEdit = (post: BlogPost) => {
    setEditingPost(post);
    setNewPost({
      title: post.title || '',
      content: post.content || '',
      excerpt: post.excerpt || '',
      image: post.image || '',
      image_alt: post.image_alt || '',
      category: post.category || '',
      published: post.published,
      slug: post.slug || '',
      meta_description: post.meta_description || '',
      meta_keywords: post.meta_keywords || '',
      tags: post.tags || '',
      author: post.author || 'Atılım Modern Sera'
    });
    fetchCategories(); // Kategorileri yenile
    setShowForm(true);
  };

  const handleImageUpload = (imageUrl: string) => {
    setNewPost({ ...newPost, image: imageUrl });
  };

  // Rich Text Editor Component
  const RichTextEditor: React.FC<{ content: string; onChange: (content: string) => void }> = ({ content, onChange }) => {
    const [isPreview, setIsPreview] = useState(false);

    const execCommand = (command: string, value?: string) => {
      document.execCommand(command, false, value);
    };

    const insertLink = () => {
      const url = prompt('Link URL:');
      if (url) {
        execCommand('createLink', url);
      }
    };

    return (
      <div className="border border-gray-300 rounded-lg">
        <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => execCommand('bold')}
              className="px-3 py-1 text-sm font-bold border border-gray-300 rounded hover:bg-gray-100"
              title="Kalın"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => execCommand('italic')}
              className="px-3 py-1 text-sm italic border border-gray-300 rounded hover:bg-gray-100"
              title="İtalik"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => execCommand('underline')}
              className="px-3 py-1 text-sm underline border border-gray-300 rounded hover:bg-gray-100"
              title="Altı Çizili"
            >
              U
            </button>
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <button
              type="button"
              onClick={insertLink}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
              title="Link Ekle"
            >
              🔗
            </button>
            <button
              type="button"
              onClick={() => execCommand('insertUnorderedList')}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
              title="Liste"
            >
              • Liste
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isPreview ? 'Düzenle' : 'Önizle'}
          </button>
        </div>
        <div className="p-4 min-h-[400px]">
          {isPreview ? (
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div
              contentEditable
              className="min-h-[400px] focus:outline-none"
              onInput={(e) => onChange(e.currentTarget.innerHTML)}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Yönetimi</h2>
        <button
          onClick={() => {
            setEditingPost(null);
            setNewPost({
              title: '',
              content: '',
              excerpt: '',
              image: '',
              image_alt: '',
              category: '',
              published: false,
              slug: '',
              meta_description: '',
              meta_keywords: '',
              tags: '',
              author: 'Atılım Modern Sera'
            });
            fetchCategories(); // Kategorileri yenile
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Yeni Blog Yazısı
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-6">
            {editingPost ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
          </h3>
          
          <div className="space-y-6">
            {/* Temel Bilgiler */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-semibold mb-4 text-gray-700">Temel Bilgiler</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Başlık *</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Blog yazısı başlığı"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug</label>
                  <input
                    type="text"
                    value={newPost.slug}
                    onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="url-slug"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Kategori Seçin</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Yazar</label>
                  <input
                    type="text"
                    value={newPost.author}
                    onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Yazar adı"
                  />
                </div>
              </div>
            </div>

            {/* İçerik */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-semibold mb-4 text-gray-700">İçerik</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Özet</label>
                  <textarea
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Blog yazısı özeti"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İçerik *</label>
                  <RichTextEditor
                    content={newPost.content}
                    onChange={(content) => setNewPost({ ...newPost, content })}
                  />
                </div>
              </div>
            </div>

            {/* Görsel */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-semibold mb-4 text-gray-700">Görsel</h4>
              <div className="space-y-4">
                <ImageUpload
                  onImageUpload={handleImageUpload}
                  currentImage={newPost.image}
                  placeholder="Blog yazısı için ana görsel seçin"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Görsel Alt Metni</label>
                  <input
                    type="text"
                    value={newPost.image_alt}
                    onChange={(e) => setNewPost({ ...newPost, image_alt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Görsel alt metni"
                  />
                </div>
              </div>
            </div>

            {/* SEO Ayarları */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-semibold mb-4 text-gray-700">SEO Ayarları</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Açıklama</label>
                  <textarea
                    value={newPost.meta_description}
                    onChange={(e) => setNewPost({ ...newPost, meta_description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="SEO için meta açıklama"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Anahtar Kelimeler</label>
                  <input
                    type="text"
                    value={newPost.meta_keywords}
                    onChange={(e) => setNewPost({ ...newPost, meta_keywords: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="anahtar, kelimeler, virgülle, ayrılmış"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Etiketler</label>
                  <input
                    type="text"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="etiket1, etiket2, etiket3"
                  />
                </div>
              </div>
            </div>

            {/* Yayın Ayarları */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-semibold mb-4 text-gray-700">Yayın Ayarları</h4>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={newPost.published}
                  onChange={(e) => setNewPost({ ...newPost, published: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">
                  Yayınla
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-8">
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              onClick={savePost}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingPost ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Blog Yazıları</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Yükleniyor...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{post.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${
                          post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.published ? '✅ Yayında' : '⏸️ Taslak'}
                        </span>
                        {post.category && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {post.category}
                          </span>
                        )}
                      </div>
                      {post.excerpt && (
                        <p className="text-gray-600 mb-2">{post.excerpt}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Yazar: {post.author}</span>
                        <span>Oluşturulma: {new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                        {post.updated_at !== post.created_at && (
                          <span>Güncellenme: {new Date(post.updated_at).toLocaleDateString('tr-TR')}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button 
                        onClick={() => startEdit(post)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                      >
                        ✏️ Düzenle
                      </button>
                      <button 
                        onClick={() => deletePost(post.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                      >
                        🗑️ Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
