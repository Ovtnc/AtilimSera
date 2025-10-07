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
  const [rememberMe, setRememberMe] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);

  // Check authentication on component mount
  React.useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      // Check if token is still valid by making a test request
      checkTokenValidity(token);
    }

    // Check for account lockout
    const lockout = localStorage.getItem('lockoutUntil');
    if (lockout) {
      const lockoutUntil = parseInt(lockout);
      if (Date.now() < lockoutUntil) {
        setIsLocked(true);
        setLockoutTime(lockoutUntil);
      } else {
        localStorage.removeItem('lockoutUntil');
        localStorage.removeItem('loginAttempts');
      }
    }
  }, []);

  // Lockout timer
  React.useEffect(() => {
    if (isLocked && lockoutTime) {
      const interval = setInterval(() => {
        if (Date.now() >= lockoutTime) {
          setIsLocked(false);
          setLockoutTime(null);
          setLoginAttempts(0);
          localStorage.removeItem('lockoutUntil');
          localStorage.removeItem('loginAttempts');
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLocked, lockoutTime]);

  const checkTokenValidity = async (token: string) => {
    try {
      const response = await fetch('/api/projects/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if account is locked
    if (isLocked) {
      const remainingTime = lockoutTime ? Math.ceil((lockoutTime - Date.now()) / 1000) : 0;
      alert(`Hesap kilitli! ${remainingTime} saniye sonra tekrar deneyin.`);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Store token based on "Remember Me"
        if (rememberMe) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
        
        setIsAuthenticated(true);
        setUsername('');
        setPassword('');
        setLoginAttempts(0);
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lockoutUntil');
      } else {
        // Failed login attempt
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts.toString());

        // Lock account after 5 failed attempts
        if (newAttempts >= 5) {
          const lockUntil = Date.now() + (15 * 60 * 1000); // 15 minutes
          setIsLocked(true);
          setLockoutTime(lockUntil);
          localStorage.setItem('lockoutUntil', lockUntil.toString());
          alert('Çok fazla başarısız deneme! Hesabınız 15 dakika süreyle kilitlendi.');
        } else {
          alert(`Giriş başarısız! Kalan deneme hakkı: ${5 - newAttempts}`);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Giriş yapılırken hata oluştu!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
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
    const getRemainingTime = () => {
      if (!lockoutTime) return 0;
      return Math.ceil((lockoutTime - Date.now()) / 1000);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg mb-4">
              <span className="text-white font-bold text-3xl">AS</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Admin Paneli
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Atılım Sera Yönetim Sistemi
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {isLocked && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-semibold text-red-800">Hesap Kilitlendi</h4>
                    <p className="text-sm text-red-700 mt-1">
                      Çok fazla başarısız deneme yaptınız. Lütfen {getRemainingTime()} saniye bekleyin.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleLogin}>
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Kullanıcı Adı
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  disabled={isLocked}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Kullanıcı adınızı girin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  disabled={isLocked}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Remember Me & Security Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLocked}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded disabled:cursor-not-allowed"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Beni hatırla
                  </label>
                </div>
                {loginAttempts > 0 && !isLocked && (
                  <div className="text-xs text-amber-600 font-medium">
                    {5 - loginAttempts} deneme kaldı
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLocked}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-emerald-300 group-hover:text-emerald-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {isLocked ? `Kilitli (${getRemainingTime()}s)` : 'Giriş Yap'}
              </button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start space-x-2 text-xs text-gray-500">
                <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p>
                  Güvenlik: 5 başarısız denemeden sonra hesap 15 dakika kilitlenir. 
                  {rememberMe ? ' Token 24 saat geçerlidir.' : ' Oturum tarayıcı kapanınca sonlanır.'}
                </p>
              </div>
            </div>
          </div>
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