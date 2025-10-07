import React, { useState, useEffect } from 'react';

interface DashboardStats {
  totalBlogPosts: number;
  publishedBlogPosts: number;
  draftBlogPosts: number;
  totalSliders: number;
  activeSliders: number;
  totalCategories: number;
  activeCategories: number;
  totalMessages: number;
  newMessages: number;
  readMessages: number;
  repliedMessages: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogPosts: 0,
    publishedBlogPosts: 0,
    draftBlogPosts: 0,
    totalSliders: 0,
    activeSliders: 0,
    totalCategories: 0,
    activeCategories: 0,
    totalMessages: 0,
    newMessages: 0,
    readMessages: 0,
    repliedMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Blog istatistikleri
      const blogResponse = await fetch('/api/blog?limit=100');
      const blogData = await blogResponse.json();
      
      let totalBlogPosts = 0;
      let publishedBlogPosts = 0;
      let draftBlogPosts = 0;
      
      if (blogData.posts) {
        totalBlogPosts = blogData.posts.length;
        publishedBlogPosts = blogData.posts.filter((post: any) => post.published).length;
        draftBlogPosts = totalBlogPosts - publishedBlogPosts;
      }

      // Slider istatistikleri
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const sliderResponse = await fetch('/api/slider/admin', {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      const sliderData = await sliderResponse.json();
      
      let totalSliders = 0;
      let activeSliders = 0;
      
      if (sliderData.sliders) {
        totalSliders = sliderData.sliders.length;
        activeSliders = sliderData.sliders.filter((slider: any) => slider.is_active).length;
      }

      // Kategori istatistikleri
      const categoryResponse = await fetch('/api/categories/admin/all', {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      const categoryData = await categoryResponse.json();
      
      let totalCategories = 0;
      let activeCategories = 0;
      
      if (categoryData.categories) {
        totalCategories = categoryData.categories.length;
        activeCategories = categoryData.categories.filter((category: any) => category.is_active).length;
      }

      // Mesaj istatistikleri
      const messageResponse = await fetch('/api/contact/stats', {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      const messageData = await messageResponse.json();
      
      let totalMessages = 0;
      let newMessages = 0;
      let readMessages = 0;
      let repliedMessages = 0;
      
      if (messageData) {
        totalMessages = messageData.total || 0;
        newMessages = messageData.new || 0;
        readMessages = messageData.read || 0;
        repliedMessages = messageData.replied || 0;
      }

      setStats({
        totalBlogPosts,
        publishedBlogPosts,
        draftBlogPosts,
        totalSliders,
        activeSliders,
        totalCategories,
        activeCategories,
        totalMessages,
        newMessages,
        readMessages,
        repliedMessages
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: number;
    subtitle: string;
    icon: string;
    color: string;
    trend?: string;
  }> = ({ title, value, subtitle, icon, color, trend }) => (
    <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
            {trend && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  {trend}
                </span>
              </div>
            )}
          </div>
          <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center shadow-lg`}>
            <span className="text-2xl">{icon}</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
    </div>
  );

  const QuickActionCard: React.FC<{
    title: string;
    description: string;
    icon: string;
    color: string;
    onClick?: () => void;
  }> = ({ title, description, icon, color, onClick }) => (
    <button
      onClick={onClick}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-left w-full"
    >
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-xl">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );

  const ActivityItem: React.FC<{
    title: string;
    description: string;
    icon: string;
    color: string;
    time: string;
  }> = ({ title, description, icon, color, time }) => (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
        <span className="text-sm">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      <div className="text-xs text-gray-400">{time}</div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-emerald-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="mt-4 text-lg font-medium text-gray-600">Dashboard yükleniyor...</p>
          <p className="text-sm text-gray-500">Verileriniz hazırlanıyor</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">Hoş Geldiniz! 👋</h1>
              <p className="text-xl opacity-90 mb-4">Atılım Sera Yönetim Paneline</p>
              <p className="text-lg opacity-75">Sitenizi yönetmek için gerekli tüm araçlar burada</p>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-6xl">🌱</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Blog Yazıları"
          value={stats.totalBlogPosts}
          subtitle={`${stats.publishedBlogPosts} yayında, ${stats.draftBlogPosts} taslak`}
          icon="📝"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          trend="+12% bu ay"
        />
        <StatCard
          title="Kategoriler"
          value={stats.totalCategories}
          subtitle={`${stats.activeCategories} aktif kategori`}
          icon="📂"
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          trend="Yeni eklenen"
        />
        <StatCard
          title="Slider Görselleri"
          value={stats.totalSliders}
          subtitle={`${stats.activeSliders} aktif slider`}
          icon="🖼️"
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          trend="Güncel"
        />
        <StatCard
          title="İletişim Mesajları"
          value={stats.totalMessages}
          subtitle={`${stats.newMessages} yeni, ${stats.readMessages} okundu, ${stats.repliedMessages} yanıtlandı`}
          icon="💬"
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          trend={stats.newMessages > 0 ? `${stats.newMessages} yeni mesaj` : "Güncel"}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
            <div className="space-y-4">
              <QuickActionCard
                title="Yeni Blog Yazısı"
                description="Hızlıca yeni bir blog yazısı oluşturun"
                icon="✍️"
                color="bg-gradient-to-br from-blue-500 to-blue-600"
              />
              <QuickActionCard
                title="Kategori Ekle"
                description="Yeni bir kategori oluşturun"
                icon="🏷️"
                color="bg-gradient-to-br from-emerald-500 to-emerald-600"
              />
              <QuickActionCard
                title="Slider Yönetimi"
                description="Ana sayfa slider'larını düzenleyin"
                icon="🎠"
                color="bg-gradient-to-br from-purple-500 to-purple-600"
              />
              <QuickActionCard
                title="Mesaj Yönetimi"
                description={`${stats.newMessages} yeni mesaj bekliyor`}
                icon="💬"
                color="bg-gradient-to-br from-orange-500 to-orange-600"
              />
              <QuickActionCard
                title="Siteyi Görüntüle"
                description="Ana sayfayı yeni sekmede açın"
                icon="👁️"
                color="bg-gradient-to-br from-teal-500 to-teal-600"
              />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Son Aktiviteler</h2>
            <div className="space-y-4">
              {stats.totalBlogPosts > 0 ? (
                <ActivityItem
                  title="Blog yazıları güncellendi"
                  description={`${stats.publishedBlogPosts} yayında, ${stats.draftBlogPosts} taslak yazı`}
                  icon="📝"
                  color="bg-blue-100 text-blue-600"
                  time="Şimdi"
                />
              ) : (
                <ActivityItem
                  title="İlk blog yazınızı oluşturun"
                  description="Henüz hiç blog yazısı eklenmemiş"
                  icon="📝"
                  color="bg-gray-100 text-gray-600"
                  time="Başlangıç"
                />
              )}
              
              {stats.totalCategories > 0 ? (
                <ActivityItem
                  title="Kategoriler aktif"
                  description={`${stats.activeCategories} aktif kategori yönetiliyor`}
                  icon="📂"
                  color="bg-emerald-100 text-emerald-600"
                  time="Güncel"
                />
              ) : (
                <ActivityItem
                  title="İlk kategorinizi oluşturun"
                  description="Henüz hiç kategori eklenmemiş"
                  icon="📂"
                  color="bg-gray-100 text-gray-600"
                  time="Başlangıç"
                />
              )}
              
              {stats.totalSliders > 0 ? (
                <ActivityItem
                  title="Slider görselleri aktif"
                  description={`${stats.activeSliders} slider görseli aktif durumda`}
                  icon="🖼️"
                  color="bg-purple-100 text-purple-600"
                  time="Güncel"
                />
              ) : (
                <ActivityItem
                  title="İlk slider'ınızı ekleyin"
                  description="Ana sayfa için slider görseli ekleyin"
                  icon="🖼️"
                  color="bg-gray-100 text-gray-600"
                  time="Başlangıç"
                />
              )}
              
              {stats.totalMessages > 0 ? (
                <ActivityItem
                  title="İletişim mesajları"
                  description={`${stats.newMessages} yeni mesaj, ${stats.repliedMessages} yanıtlandı`}
                  icon="💬"
                  color="bg-orange-100 text-orange-600"
                  time="Güncel"
                />
              ) : (
                <ActivityItem
                  title="İletişim mesajları bekleniyor"
                  description="Henüz hiç mesaj gelmemiş"
                  icon="💬"
                  color="bg-gray-100 text-gray-600"
                  time="Başlangıç"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Site Durumu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(stats.totalBlogPosts / 10) * 251.2} 251.2`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{stats.totalBlogPosts}</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Blog Yazıları</h3>
            <p className="text-sm text-gray-600">Toplam içerik</p>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#06b6d4"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(stats.totalCategories / 5) * 251.2} 251.2`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{stats.totalCategories}</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Kategoriler</h3>
            <p className="text-sm text-gray-600">Organize içerik</p>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#8b5cf6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(stats.totalSliders / 5) * 251.2} 251.2`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{stats.totalSliders}</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Slider Görselleri</h3>
            <p className="text-sm text-gray-600">Ana sayfa görselleri</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;