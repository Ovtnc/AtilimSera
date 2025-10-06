# Atılım Modern Sera - Corporate Website

Modern sera kurulum sistemleri için profesyonel kurumsal web sitesi ve yönetim paneli.

## 🚀 Özellikler

### Frontend (React + TypeScript)
- ✅ **Modern Tasarım**: Tailwind CSS ile responsive ve modern arayüz
- ✅ **Hero Slider**: Dinamik resim slider'ı (admin panelinden yönetilebilir)
- ✅ **Hizmetler**: Sera ve topraksız tarım hizmetleri
- ✅ **Projeler**: Tamamlanan projeler galerisi
- ✅ **Blog**: SEO dostu blog sistemi
- ✅ **İletişim**: Google Maps entegrasyonu ve iletişim formu
- ✅ **FAQ**: Sık sorulan sorular bölümü

### Backend (Node.js + Express.js + SQLite)
- ✅ **RESTful API**: Tam CRUD operasyonları
- ✅ **JWT Authentication**: Güvenli admin girişi
- ✅ **SQLite Database**: Hafif ve hızlı veritabanı
- ✅ **Rate Limiting**: API güvenliği
- ✅ **CORS Support**: Cross-origin istekler
- ✅ **Input Validation**: Veri doğrulama

### Admin Panel
- ✅ **Dashboard**: Site istatistikleri
- ✅ **Blog Yönetimi**: Blog yazıları ekleme/düzenleme/silme
- ✅ **Hizmet Yönetimi**: Hizmetler ekleme/düzenleme/silme
- ✅ **Proje Yönetimi**: Projeler ekleme/düzenleme/silme
- ✅ **Slider Yönetimi**: Ana sayfa slider resimlerini yönetme
- ✅ **Site Ayarları**: Genel site ayarları

## 🛠️ Kurulum

### Gereksinimler
- Node.js 16+
- npm veya yarn

### Backend Kurulumu

```bash
# Backend dizinine git
cd backend

# Bağımlılıkları yükle
npm install

# Sunucuyu başlat
npm run dev
# veya
node server.js
```

Backend server `http://localhost:5001` adresinde çalışacaktır.

### Frontend Kurulumu

```bash
# Ana dizine git
cd ..

# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm start

# Production build
npm run build
```

Frontend `http://localhost:3000` adresinde çalışacaktır.

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin girişi
- `GET /api/auth/me` - Kullanıcı bilgileri
- `POST /api/auth/logout` - Çıkış

### Blog
- `GET /api/blog` - Tüm blog yazıları
- `GET /api/blog/:id` - Tekil blog yazısı
- `POST /api/blog` - Yeni blog yazısı (Admin)
- `PUT /api/blog/:id` - Blog yazısı güncelle (Admin)
- `DELETE /api/blog/:id` - Blog yazısı sil (Admin)

### Services
- `GET /api/services` - Tüm hizmetler
- `GET /api/services/:slug` - Tekil hizmet
- `POST /api/services` - Yeni hizmet (Admin)
- `PUT /api/services/:id` - Hizmet güncelle (Admin)
- `DELETE /api/services/:id` - Hizmet sil (Admin)

### Projects
- `GET /api/projects` - Tüm projeler
- `GET /api/projects/:id` - Tekil proje
- `POST /api/projects` - Yeni proje (Admin)
- `PUT /api/projects/:id` - Proje güncelle (Admin)
- `DELETE /api/projects/:id` - Proje sil (Admin)

### Slider
- `GET /api/slider` - Aktif slider resimleri
- `GET /api/slider/admin` - Tüm slider resimleri (Admin)
- `POST /api/slider` - Yeni slider resmi (Admin)
- `PUT /api/slider/:id` - Slider resmi güncelle (Admin)
- `DELETE /api/slider/:id` - Slider resmi sil (Admin)

### Settings
- `GET /api/settings` - Genel site ayarları
- `GET /api/settings/admin` - Tüm ayarlar (Admin)
- `GET /api/settings/stats` - Site istatistikleri (Admin)
- `PUT /api/settings` - Ayarları güncelle (Admin)

## 🔐 Admin Girişi

Admin paneline erişim için:
- **URL**: `http://localhost:3000/admin`
- **Kullanıcı Adı**: `admin`
- **Şifre**: `admin123`

## 📁 Proje Yapısı

```
corporate-ui/
├── backend/                 # Node.js backend
│   ├── database/           # SQLite veritabanı
│   ├── middleware/         # Middleware fonksiyonları
│   ├── routes/            # API route'ları
│   ├── server.js          # Ana server dosyası
│   └── package.json       # Backend bağımlılıkları
├── src/                   # React frontend
│   ├── components/        # React component'leri
│   ├── pages/            # Sayfa component'leri
│   ├── assets/           # Statik dosyalar
│   └── App.tsx           # Ana uygulama
├── public/               # Public dosyalar
└── package.json          # Frontend bağımlılıkları
```

## 🎨 Teknolojiler

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **React Hooks** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **SQLite3** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security
- **CORS** - Cross-origin support
- **Morgan** - Logging

## 🔧 Geliştirme

### Backend Geliştirme
```bash
cd backend
npm run dev  # Nodemon ile otomatik restart
```

### Frontend Geliştirme
```bash
npm start    # Development server
npm run build  # Production build
npm test     # Test çalıştır
```

## 📈 Özellikler

### Admin Panel Özellikleri
- 📊 **Dashboard**: Gerçek zamanlı site istatistikleri
- 📝 **Blog Yönetimi**: Tam CRUD operasyonları
- 🔧 **Hizmet Yönetimi**: Kategori bazlı hizmet yönetimi
- 🏗️ **Proje Yönetimi**: Öne çıkan proje işaretleme
- 🖼️ **Slider Yönetimi**: Sıralama ve aktif/pasif durumu
- ⚙️ **Site Ayarları**: SEO ve iletişim bilgileri

### Frontend Özellikleri
- 📱 **Responsive Design**: Tüm cihazlarda uyumlu
- 🎨 **Modern UI**: Tailwind CSS ile şık tasarım
- 🔍 **SEO Optimized**: Meta tags ve structured data
- 🚀 **Performance**: Optimized images ve lazy loading
- 🌐 **Multi-language Ready**: Türkçe içerik desteği

## 🚀 Deployment

### Production Build
```bash
# Frontend build
npm run build

# Backend production
cd backend
NODE_ENV=production node server.js
```

### Environment Variables
Backend için `.env` dosyası oluşturun:
```
PORT=5000
JWT_SECRET=your_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
NODE_ENV=production
```

## 📞 İletişim

- **Website**: [Atılım Modern Sera](http://localhost:3000)
- **Admin Panel**: [Admin Dashboard](http://localhost:3000/admin)
- **API Docs**: [API Documentation](http://localhost:5001/api)

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**Not**: Bu proje geliştirme amaçlıdır. Production kullanımı için güvenlik ayarlarını gözden geçirin.