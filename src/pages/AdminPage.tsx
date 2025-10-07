import React, { useState } from 'react';
import Dashboard from '../components/admin/Dashboard';
import BlogManagement from '../components/admin/BlogManagement';
import SliderManagement from '../components/admin/SliderManagement';
import CategoryManagement from '../components/admin/CategoryManagement';
import ProjectManagement from '../components/admin/ProjectManagement';
import ServiceManagement from '../components/admin/ServiceManagement';
import MessageManagement from '../components/admin/MessageManagement';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Check authentication on component mount
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Check if token is still valid by making a test request
      checkTokenValidity(token);
    }
  }, []);

  const checkTokenValidity = async (token: string) => {
    try {
      const response = await fetch('http://localhost:5001/api/projects/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        setUsername('');
        setPassword('');
      } else {
        alert('Giriş başarısız! Kullanıcı adı veya şifre hatalı.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Giriş yapılırken hata oluştu!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'blog', label: 'Blog Yönetimi', icon: '📝' },
    { id: 'slider', label: 'Slider Yönetimi', icon: '🖼️' },
    { id: 'categories', label: 'Kategori Yönetimi', icon: '📂' },
    { id: 'projects', label: 'Proje Yönetimi', icon: '🚀' },
    { id: 'services', label: 'Hizmet Yönetimi', icon: '⚙️' },
    { id: 'messages', label: 'Mesaj Yönetimi', icon: '📨' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'blog':
        return <BlogManagement />;
      case 'slider':
        return <SliderManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'projects':
        return <ProjectManagement />;
      case 'services':
        return <ServiceManagement />;
      case 'messages':
        return <MessageManagement />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Paneli
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Devam etmek için giriş yapın
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Kullanıcı Adı
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Kullanıcı adı"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Şifre"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Giriş Yap
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Varsayılan giriş: <span className="font-medium">admin</span> / <span className="font-medium">admin123</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AS</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Atılım Sera</span>
          </div>
        </div>
        
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-sm transition-all duration-200"
          >
            <span className="mr-3 text-lg">🚪</span>
            Çıkış Yap
          </button>
        </nav>
        
        
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {activeTab === 'dashboard' && 'Sistem genel durumu ve istatistikler'}
                  {activeTab === 'blog' && 'Blog yazılarını yönetin ve düzenleyin'}
                  {activeTab === 'slider' && 'Ana sayfa slider görsellerini yönetin'}
                  {activeTab === 'categories' && 'Blog kategorilerini organize edin'}
                  {activeTab === 'projects' && 'Projelerinizi yönetin ve takip edin'}
                  {activeTab === 'services' && 'Hizmetlerinizi düzenleyin'}
                  {activeTab === 'messages' && 'İletişim mesajlarını görüntüleyin'}
                </p>
              </div>
              
             
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;