const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'atilim_sera.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeTables();
  }
});

// Initialize database tables
function initializeTables() {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Blog posts table
  db.run(`CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image TEXT,
    category TEXT,
    published BOOLEAN DEFAULT 0,
    author_id INTEGER,
    meta_description TEXT,
    meta_keywords TEXT,
    slug TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users (id)
  )`);

  // Services table
  db.run(`CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    features TEXT, -- JSON string
    benefits TEXT, -- JSON string
    price TEXT,
    duration TEXT,
    slug TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Projects table
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    cover_image TEXT,
    category TEXT NOT NULL,
    location TEXT,
    completed_date DATE,
    order_position INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Project media table
  db.run(`CREATE TABLE IF NOT EXISTS project_media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    media_url TEXT NOT NULL,
    media_type TEXT NOT NULL, -- 'image' or 'video'
    alt_text TEXT,
    title TEXT,
    description TEXT,
    order_position INTEGER DEFAULT 0,
    is_cover BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
  )`);

  // Slider images table
  db.run(`CREATE TABLE IF NOT EXISTS slider_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    title TEXT,
    description TEXT,
    order_position INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Add title and description columns to existing slider_images table if they don't exist
  db.run(`ALTER TABLE slider_images ADD COLUMN title TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Error adding title column:', err.message);
    }
  });
  
  db.run(`ALTER TABLE slider_images ADD COLUMN description TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Error adding description column:', err.message);
    }
  });

  // Add duration column to services if it doesn't exist
  db.run(`ALTER TABLE services ADD COLUMN duration TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Error adding duration column:', err.message);
    }
  });

  // Add image_alt column to blog_posts if it doesn't exist
  db.run(`ALTER TABLE blog_posts ADD COLUMN image_alt TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Error adding image_alt column:', err.message);
    }
  });

  // Add cover_image column to projects if it doesn't exist
  db.run(`ALTER TABLE projects ADD COLUMN cover_image TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Error adding cover_image column:', err.message);
    }
  });

  // Add order_position column to projects if it doesn't exist
  db.run(`ALTER TABLE projects ADD COLUMN order_position INTEGER DEFAULT 0`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Error adding order_position column:', err.message);
    }
  });

  // Site settings table
  db.run(`CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Contact messages table
  db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert default admin user
  db.get("SELECT id FROM users WHERE username = 'admin'", (err, row) => {
    if (err) {
      console.error('Error checking admin user:', err.message);
    } else if (!row) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = bcrypt.hashSync('admin123', 10);
      
      db.run(`INSERT INTO users (username, password, email, role) 
              VALUES ('admin', ?, 'admin@atilimsera.com', 'admin')`, 
              [hashedPassword], function(err) {
        if (err) {
          console.error('Error creating admin user:', err.message);
        } else {
          console.log('Default admin user created');
        }
      });
    }
  });

  // Insert default services
  db.get("SELECT id FROM services WHERE id = 1", (err, row) => {
    if (err) {
      console.error('Error checking services:', err.message);
    } else if (!row) {
      const defaultServices = [
        // Sera Hizmetleri
        {
          title: "Modern Sera Kurulumları",
          description: "Yüksek teknoloji sera sistemleri ile yıl boyunca optimal üretim yapın. İklim kontrolü ve otomasyon sistemleriyle desteklenen çözümlerimiz.",
          image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "sera",
          features: JSON.stringify(["Gotik Sera Sistemleri", "Venlo Sera Sistemleri", "Tünel Sera Sistemleri", "Çok Katlı Sera Sistemleri"]),
          benefits: JSON.stringify(["Otomatik iklim kontrolü", "Havalandırma sistemleri", "Gölgeleme teknolojisi", "Isıtma ve soğutma"]),
          price: "Projeye göre değişir",
          duration: "2-4 ay",
          slug: "modern-sera-kurulumlari"
        },
        {
          title: "Sera İklim Kontrol Sistemleri",
          description: "Tam otomatik iklim kontrolü ile sıcaklık, nem, havalandırma ve CO2 seviyelerini optimal seviyede tutun.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "sera",
          features: JSON.stringify(["Sıcaklık Kontrolü", "Nem Kontrolü", "CO2 Enjeksiyon", "Havalandırma Otomasyonu"]),
          benefits: JSON.stringify(["Enerji tasarrufu %40", "Verim artışı %25", "Otomatik kontrol", "Uzaktan izleme"]),
          price: "Projeye göre değişir",
          duration: "3-6 hafta",
          slug: "sera-iklim-kontrol-sistemleri"
        },
        {
          title: "Sera Gölgeleme Sistemleri",
          description: "Otomatik gölgeleme teknolojileri ile bitkilerinizi aşırı güneş ışığından koruyun ve optimal büyüme sağlayın.",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "sera",
          features: JSON.stringify(["Alüminyum Gölgeleme", "Plastik Gölgeleme", "Otomatik Açılma/Kapanma", "Uzaktan Kontrol"]),
          benefits: JSON.stringify(["%60 gölgeleme oranı", "Otomatik kontrol", "Uzun ömürlü", "Kolay montaj"]),
          price: "Projeye göre değişir",
          duration: "2-3 hafta",
          slug: "sera-golgeleme-sistemleri"
        },
        {
          title: "Sera Isıtma Sistemleri",
          description: "Yıl boyunca optimum sıcaklık kontrolü için gelişmiş ısıtma çözümleri. Enerji verimli ve çevre dostu sistemler.",
          image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "sera",
          features: JSON.stringify(["Doğalgaz Isıtma", "Elektrikli Isıtma", "Güneş Enerjili Sistem", "Jeotermal Isıtma"]),
          benefits: JSON.stringify(["Enerji tasarrufu", "Çevre dostu", "Otomatik kontrol", "Uzun ömürlü"]),
          price: "Projeye göre değişir",
          duration: "3-5 hafta",
          slug: "sera-isitma-sistemleri"
        },
        // Topraksız Tarım Hizmetleri
        {
          title: "Hidroponik Sistemler",
          description: "Topraksız tarım teknolojisi ile su ve gübre tasarrufu sağlayan, yüksek verimli üretim sistemleri.",
          image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "topraksiz",
          features: JSON.stringify(["NFT Sistemleri", "DWC Sistemleri", "Ebb & Flow", "Aeroponik Sistemler"]),
          benefits: JSON.stringify(["%90 su tasarrufu", "Hızlı büyüme", "Yıl boyu üretim", "Daha az hastalık"]),
          price: "Projeye göre değişir",
          duration: "4-8 hafta",
          slug: "hidroponik-sistemler"
        },
        {
          title: "Dikey Tarım Çözümleri",
          description: "Sınırlı alanlarda maksimum verim için dikey tarım sistemleri. Şehir içi tarım için ideal çözümler.",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "topraksiz",
          features: JSON.stringify(["Dikey Kule Sistemleri", "Duvar Bahçeleri", "Mobil Sistemler", "LED Aydınlatma"]),
          benefits: JSON.stringify(["10x daha fazla verim", "Su tasarrufu", "Yıl boyu üretim", "Şehir içi tarım"]),
          price: "Projeye göre değişir",
          duration: "6-10 hafta",
          slug: "dikey-tarim-cozumleri"
        },
        {
          title: "Topraksız Çilek Yetiştiriciliği",
          description: "Hidroponik sistemlerle çilek üretimi. Yıl boyunca taze, kaliteli çilek yetiştirin.",
          image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "topraksiz",
          features: JSON.stringify(["Özel Çilek Sistemleri", "Besin Çözeltisi", "pH Kontrolü", "Sıcaklık Kontrolü"]),
          benefits: JSON.stringify(["Yıl boyu üretim", "Yüksek kalite", "Hastalık kontrolü", "Su tasarrufu"]),
          price: "Projeye göre değişir",
          duration: "3-6 hafta",
          slug: "topraksiz-cilek-yetistiriciligi"
        },
        {
          title: "Aeroponik Sistemler",
          description: "Hava ile tarım yapın. Köklerin havada asılı olduğu, en gelişmiş topraksız tarım teknolojisi.",
          image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "topraksiz",
          features: JSON.stringify(["Hava Asılı Sistem", "Sis Püskürtme", "Otomatik Beslenme", "Kök Gelişimi"]),
          benefits: JSON.stringify(["%95 su tasarrufu", "Hızlı büyüme", "Temiz üretim", "Yüksek verim"]),
          price: "Projeye göre değişir",
          duration: "5-8 hafta",
          slug: "aeroponik-sistemler"
        },
        // Teknoloji Hizmetleri
        {
          title: "Akıllı İzleme Sistemleri",
          description: "IoT sensörleri ve uzaktan izleme teknolojileri ile seranızı akıllı hale getirin. Mobil uygulama ile her yerden kontrol edin.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "teknoloji",
          features: JSON.stringify(["IoT Sensör Ağı", "Mobil Uygulama", "Veri Analizi", "Alarm Sistemleri"]),
          benefits: JSON.stringify(["Uzaktan kontrol", "Gerçek zamanlı veri", "Otomatik alarmlar", "Performans takibi"]),
          price: "Projeye göre değişir",
          duration: "2-4 hafta",
          slug: "akilli-izleme-sistemleri"
        },
        {
          title: "Otomasyon Sistemleri",
          description: "Sera işletmenizi tamamen otomatik hale getirin. Sulama, havalandırma, ısıtma ve gölgeleme sistemlerini tek noktadan kontrol edin.",
          image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "teknoloji",
          features: JSON.stringify(["Sulama Otomasyonu", "Havalandırma Kontrolü", "Isıtma Sistemi", "Gölgeleme Kontrolü"]),
          benefits: JSON.stringify(["%30 işçilik tasarrufu", "Otomatik kontrol", "Enerji verimliliği", "Uzaktan yönetim"]),
          price: "Projeye göre değişir",
          duration: "4-6 hafta",
          slug: "otomasyon-sistemleri"
        },
        // Danışmanlık Hizmetleri
        {
          title: "Danışmanlık ve Eğitim",
          description: "Sıfırdan kurulum, işletme ve sürekli gelişim için uzman danışmanlık hizmetleri. Kapsamlı eğitim programları.",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "danismanlik",
          features: JSON.stringify(["Fizibilite Analizi", "Sistem Eğitimi", "7/24 Teknik Destek", "Proje Yönetimi"]),
          benefits: JSON.stringify(["Uzman rehberlik", "Kapsamlı eğitim", "Sürekli destek", "Başarı garantisi"]),
          price: "Projeye göre değişir",
          duration: "Devam eden",
          slug: "danismanlik-ve-egitim"
        }
      ];

      defaultServices.forEach((service) => {
        db.run(`INSERT INTO services (title, description, image, category, features, benefits, price, duration, slug) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [service.title, service.description, service.image, service.category, service.features, service.benefits, service.price, service.duration, service.slug]);
      });
      console.log('Default services inserted');
    }
  });

  // Insert default projects
  db.get("SELECT id FROM projects WHERE id = 1", (err, row) => {
    if (err) {
      console.error('Error checking projects:', err.message);
    } else if (!row) {
      const defaultProjects = [
        {
          title: "Topraksız Çilek Serası",
          description: "İstanbul'da kurulan modern topraksız çilek üretim tesisi. NFT sistemi ile yıl boyunca yüksek kaliteli çilek üretimi.",
          image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "topraksiz",
          location: "İstanbul, Türkiye",
          completed_date: "2024-03-15",
          featured: true
        },
        {
          title: "Dikey Tarım Tesisi",
          description: "Şehir merkezinde kurulan dikey tarım sistemi. Sınırlı alanda maksimum verim elde edilen modern tarım çözümü.",
          image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "hidroponik",
          location: "Ankara, Türkiye",
          completed_date: "2024-01-20",
          featured: true
        },
        {
          title: "Modern Sera Kompleksi",
          description: "Tam otomatik iklim kontrolü ile donatılmış modern sera kompleksi. Yıl boyunca optimal üretim koşulları.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "sera",
          location: "Antalya, Türkiye",
          completed_date: "2023-11-10",
          featured: false
        },
        {
          title: "Aeroponik Sistem Kurulumu",
          description: "Hava ile tarım yapılan gelişmiş aeroponik sistem. %95 su tasarrufu ile yüksek verimli üretim.",
          image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "aeroponik",
          location: "İzmir, Türkiye",
          completed_date: "2024-02-28",
          featured: false
        }
      ];

      defaultProjects.forEach((project) => {
        db.run(`INSERT INTO projects (title, description, image, category, location, completed_date, featured) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                [project.title, project.description, project.image, project.category, project.location, project.completed_date, project.featured ? 1 : 0]);
      });
      console.log('Default projects inserted');
    }
  });

  // Insert default blog posts
  db.get("SELECT id FROM blog_posts WHERE id = 1", (err, row) => {
    if (err) {
      console.error('Error checking blog posts:', err.message);
    } else if (!row) {
      const defaultBlogPosts = [
        {
          title: "Topraksız Tarımın Geleceği: Hidroponik Sistemler",
          content: `
            <h2>Modern Tarımın Yeni Çağı</h2>
            <p>Topraksız tarım, geleneksel tarım yöntemlerine alternatif olarak geliştirilen modern bir üretim sistemidir. Bu sistemde bitkiler, toprak yerine besin çözeltisi içinde yetiştirilir.</p>
            
            <h3>Hidroponik Sistemlerin Avantajları</h3>
            <ul>
              <li><strong>Su Tasarrufu:</strong> %90'a kadar daha az su kullanımı</li>
              <li><strong>Yüksek Verim:</strong> Geleneksel yöntemlere göre 3-5 kat daha fazla ürün</li>
              <li><strong>Yıl Boyu Üretim:</strong> İklim koşullarından bağımsız üretim</li>
              <li><strong>Hastalık Kontrolü:</strong> Toprak kaynaklı hastalıkların önlenmesi</li>
              <li><strong>Alan Verimliliği:</strong> Sınırlı alanda maksimum üretim</li>
            </ul>

            <h3>NFT (Nutrient Film Technique) Sistemi</h3>
            <p>NFT sistemi, köklerin sürekli olarak besin çözeltisi ile temas halinde olduğu bir hidroponik yöntemidir. Bu sistem özellikle marul, roka ve otlar gibi yeşil yapraklı sebzeler için idealdir.</p>

            <h3>DWC (Deep Water Culture) Sistemi</h3>
            <p>DWC sisteminde bitkiler, kökleri sürekli olarak besin çözeltisi içinde kalacak şekilde yerleştirilir. Bu yöntem domates, biber ve salatalık gibi büyük bitkiler için uygundur.</p>

            <h3>Gelecekteki Potansiyel</h3>
            <p>Nüfus artışı ve iklim değişikliği nedeniyle topraksız tarım sistemleri gelecekte daha da önemli hale gelecektir. Şehir içi tarım, dikey çiftlikler ve uzay tarımı gibi alanlarda bu teknolojiler kullanılmaktadır.</p>
          `,
          excerpt: "Topraksız tarım sistemleri ile %90 su tasarrufu sağlayarak yıl boyunca yüksek verimli üretim yapabilirsiniz. Hidroponik sistemlerin avantajları ve gelecekteki potansiyeli hakkında detaylı bilgiler.",
          category: "Teknoloji",
          image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          published: true,
          meta_description: "Topraksız tarım, hidroponik sistemler, NFT, DWC, su tasarrufu, yüksek verim, modern tarım teknolojileri",
          meta_keywords: "topraksız tarım, hidroponik, NFT sistemi, DWC sistemi, su tasarrufu, modern tarım, sera teknolojisi"
        },
        {
          title: "Akıllı Sera Sistemleri ile Otomatik İklim Kontrolü",
          content: `
            <h2>IoT Destekli Sera Yönetimi</h2>
            <p>Modern sera sistemleri, IoT (Nesnelerin İnterneti) teknolojisi ile entegre edilerek tam otomatik iklim kontrolü sağlar. Bu sistemler sayesinde bitki gelişimi için optimal koşullar 7/24 korunur.</p>
            
            <h3>Sensör Teknolojileri</h3>
            <ul>
              <li><strong>Sıcaklık Sensörleri:</strong> Hassas sıcaklık ölçümü ve kontrolü</li>
              <li><strong>Nem Sensörleri:</strong> Hava ve toprak nem seviyesi takibi</li>
              <li><strong>CO2 Sensörleri:</strong> Karbondioksit seviyesi optimizasyonu</li>
              <li><strong>Işık Sensörleri:</strong> Doğal ve yapay ışık kontrolü</li>
              <li><strong>pH Sensörleri:</strong> Besin çözeltisi asitlik kontrolü</li>
            </ul>

            <h3>Otomatik Sistemler</h3>
            <p>Sensörlerden gelen veriler doğrultusunda sistem otomatik olarak:</p>
            <ul>
              <li>Havalandırma sistemlerini açar/kapatır</li>
              <li>Isıtma/soğutma sistemlerini kontrol eder</li>
              <li>Gölgeleme perdelerini ayarlar</li>
              <li>Sulama sistemlerini devreye alır</li>
              <li>LED aydınlatma sistemlerini yönetir</li>
            </ul>

            <h3>Mobil Uygulama ile Kontrol</h3>
            <p>Seranızı akıllı telefon veya tablet üzerinden uzaktan kontrol edebilir, gerçek zamanlı verileri takip edebilir ve alarmları yönetebilirsiniz.</p>

            <h3>Veri Analizi ve Raporlama</h3>
            <p>Sistem, toplanan verileri analiz ederek üretim verimliliğini artırmak için öneriler sunar ve detaylı raporlar hazırlar.</p>
          `,
          excerpt: "IoT destekli akıllı sera sistemleri ile otomatik iklim kontrolü yapın. Sensör teknolojileri, mobil uygulama kontrolü ve veri analizi ile maksimum verim elde edin.",
          category: "İnovasyon",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          published: true,
          meta_description: "Akıllı sera, IoT teknolojisi, otomatik iklim kontrolü, sensör sistemleri, mobil uygulama, veri analizi, sera yönetimi",
          meta_keywords: "akıllı sera, IoT, sensör teknolojisi, iklim kontrolü, mobil uygulama, veri analizi, otomatik sistemler"
        },
        {
          title: "Organik Hidroponik: Doğal Besin Kaynakları ile Üretim",
          content: `
            <h2>Organik Hidroponik Üretim</h2>
            <p>Organik hidroponik, sentetik gübreler yerine doğal besin kaynakları kullanarak topraksız tarım yapılmasıdır. Bu yöntem ile hem organik sertifikasyon alabilir hem de yüksek verim elde edebilirsiniz.</p>
            
            <h3>Organik Besin Kaynakları</h3>
            <ul>
              <li><strong>Balık Emülsiyonu:</strong> Protein ve amino asit kaynağı</li>
              <li><strong>Deniz Yosunu Ekstraktı:</strong> Mikro elementler ve büyüme hormonları</li>
              <li><strong>Kompost Çayı:</strong> Faydalı mikroorganizmalar</li>
              <li><strong>Kemik Unu:</strong> Fosfor ve kalsiyum kaynağı</li>
              <li><strong>Kan Unu:</strong> Azot kaynağı</li>
            </ul>

            <h3>Organik Hidroponik Sistemleri</h3>
            <p>Organik hidroponik için özel olarak tasarlanmış sistemler:</p>
            <ul>
              <li><strong>Biyofiltreli Sistemler:</strong> Mikroorganizma filtreleme</li>
              <li><strong>Media Kültürü:</strong> Kompost ve organik materyaller</li>
              <li><strong>Aquaponik Sistemler:</strong> Balık ve bitki birlikte üretimi</li>
            </ul>

            <h3>Avantajları</h3>
            <ul>
              <li>Organik sertifikasyon alabilme</li>
              <li>Doğal besin kaynakları kullanımı</li>
              <li>Çevre dostu üretim</li>
              <li>Yüksek besin değeri</li>
              <li>Pazar değeri yüksek ürünler</li>
            </ul>

            <h3>Dikkat Edilmesi Gerekenler</h3>
            <p>Organik hidroponik üretimde pH ve EC değerlerinin düzenli takibi, besin çözeltisinin sık değiştirilmesi ve temizlik kurallarına uyulması önemlidir.</p>
          `,
          excerpt: "Organik hidroponik sistemler ile doğal besin kaynakları kullanarak topraksız tarım yapın. Organik sertifikasyon alabilir ve yüksek kaliteli ürünler elde edin.",
          category: "Organik Tarım",
          image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          published: true,
          meta_description: "Organik hidroponik, doğal besin kaynakları, organik sertifikasyon, biyofiltre, aquaponik, çevre dostu üretim",
          meta_keywords: "organik hidroponik, doğal besin, organik sertifikasyon, biyofiltre, aquaponik, çevre dostu"
        }
      ];

      defaultBlogPosts.forEach((post) => {
        const slug = post.title.toLowerCase()
          .replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();

        db.run(`INSERT INTO blog_posts (title, content, excerpt, category, image, published, meta_description, meta_keywords, slug) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [post.title, post.content, post.excerpt, post.category, post.image, post.published ? 1 : 0, post.meta_description, post.meta_keywords, slug]);
      });
      console.log('Default blog posts inserted');
    }
  });

  // Insert default slider images
  db.get("SELECT id FROM slider_images WHERE id = 1", (err, row) => {
    if (err) {
      console.error('Error checking slider images:', err.message);
    } else if (!row) {
      const defaultImages = [
        {
          image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt_text: 'Hidroponik Sistemler',
          order_position: 1,
          active: 1
        },
        {
          image_url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt_text: 'Dikey Tarım',
          order_position: 2,
          active: 1
        },
        {
          image_url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt_text: 'Modern Seralar',
          order_position: 3,
          active: 1
        }
      ];

      defaultImages.forEach((image, index) => {
        db.run(`INSERT INTO slider_images (image_url, alt_text, order_position, active) 
                VALUES (?, ?, ?, ?)`, 
                [image.image_url, image.alt_text, image.order_position, image.active]);
      });
      console.log('Default slider images inserted');
    }
  });

  // Insert default site settings
  db.get("SELECT id FROM site_settings WHERE setting_key = 'site_title'", (err, row) => {
    if (err) {
      console.error('Error checking site settings:', err.message);
    } else if (!row) {
      const defaultSettings = [
        ['site_title', 'Atılım Modern Sera'],
        ['site_description', 'Modern sera kurulum sistemleri'],
        ['contact_phone', '+90 555 123 45 67'],
        ['contact_email', 'info@atilimsera.com'],
        ['contact_address', 'Sahrayı Cedit, Mengi Sk. No:10, 34734 Kadıköy/İstanbul'],
        ['meta_keywords', 'sera, hidroponik, topraksız tarım, modern sera'],
        ['google_analytics', ''],
        ['total_visitors', '12543'],
        ['total_projects', '156'],
        ['total_services', '10'],
        ['total_blog_posts', '24'],
        ['monthly_visitors', '3241'],
        ['conversion_rate', '3.2']
      ];

      defaultSettings.forEach(([key, value]) => {
        db.run(`INSERT INTO site_settings (setting_key, setting_value) 
                VALUES (?, ?)`, [key, value]);
      });
      console.log('Default site settings inserted');
    }
  });

  // Insert default projects
  db.get("SELECT id FROM projects WHERE title = 'Akıllı Sera Kurulumu'", (err, row) => {
    if (err) {
      console.error('Error checking projects:', err.message);
    } else if (!row) {
      const defaultProjects = [
        {
          title: 'Akıllı Sera Kurulumu',
          description: 'IoT tabanlı akıllı sera sistemi ile otomatik sulama, havalandırma ve iklim kontrolü sağlayan modern sera kurulumu. Sensörler ve mobil uygulama ile uzaktan kontrol imkanı.',
          cover_image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Akıllı Sera',
          location: 'Antalya, Türkiye',
          completed_date: '2024-01-15',
          order_position: 1
        },
        {
          title: 'Hidroponik Domates Üretimi',
          description: 'Topraksız tarım tekniği ile yüksek verimli domates üretimi. Su ve gübre tasarrufu sağlayan modern hidroponik sistem kurulumu.',
          cover_image: 'https://images.unsplash.com/photo-1546470427-e8e4c3f8a3c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Hidroponik Sistem',
          location: 'İzmir, Türkiye',
          completed_date: '2023-11-20',
          order_position: 2
        },
        {
          title: 'Dikey Tarım Araştırma Merkezi',
          description: 'Kentsel tarım için dikey tarım sistemleri araştırma ve geliştirme merkezi. LED aydınlatma ve otomatik besin takviyesi ile maksimum verim.',
          cover_image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Dikey Tarım',
          location: 'İstanbul, Türkiye',
          completed_date: '2024-02-10',
          order_position: 3
        },
        {
          title: 'Organik Yeşillik Üretim Tesisi',
          description: 'Sürdürülebilir tarım prensipleri ile organik yeşillik üretimi. Doğal gübreleme ve biyolojik zararlı kontrolü ile çevre dostu üretim.',
          cover_image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Sürdürülebilir Tarım',
          location: 'Bursa, Türkiye',
          completed_date: '2023-09-30',
          order_position: 4
        },
        {
          title: 'Araştırma Sera Kompleksi',
          description: 'Üniversite-sanayi işbirliği kapsamında kurulan araştırma sera kompleksi. Yeni tarım teknolojileri test ve geliştirme merkezi.',
          cover_image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Araştırma & Geliştirme',
          location: 'Ankara, Türkiye',
          completed_date: '2024-03-05',
          order_position: 5
        },
        {
          title: 'Eğitim Sera Merkezi',
          description: 'Tarım öğrencileri ve çiftçiler için eğitim amaçlı kurulan modern sera kompleksi. Pratik eğitim ve demonstrasyon alanları.',
          cover_image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Eğitim Projesi',
          location: 'Konya, Türkiye',
          completed_date: '2023-12-15',
          order_position: 6
        }
      ];

      defaultProjects.forEach((project) => {
        db.run(`INSERT INTO projects (title, description, cover_image, category, location, completed_date, order_position) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                [project.title, project.description, project.cover_image, project.category, project.location, project.completed_date, project.order_position]);
      });
      console.log('Default projects inserted');
    }
  });
}

module.exports = db;
