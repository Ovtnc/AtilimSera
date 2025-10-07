import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  type: string;
  location: string;
  size: string;
  features: string[];
  details: string;
  gallery: string[];
  category?: string;
  completedDate?: string;
  featured?: boolean;
  order_position: number;
}

const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const defaultProjects: Project[] = [
    {
      id: 1,
      title: "Topraksız Çilek Serası",
      description: "İstanbul'da kurulan modern topraksız çilek üretim tesisi",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      type: "Gotik Sera",
      location: "İstanbul, Türkiye",
      size: "2,500 m²",
      features: ["NFT Sistem", "LED Aydınlatma", "Otomatik İklimlendirme", "IoT Kontrol"],
      details: "Bu projede, geleneksel toprak tabanlı üretim yerine NFT (Nutrient Film Technique) sistemi kullanılarak çilek üretimi gerçekleştirilmektedir. Sistem, %90 daha az su tüketimi sağlarken, geleneksel yöntemlere göre %300 daha fazla verim elde etmektedir. LED aydınlatma sistemi ile yıl boyunca üretim yapılabilmektedir.",
      gallery: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1518837695005-2083293ca6ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      order_position: 0
    },
    {
      id: 2,
      title: "Dikey Tarım Tesisi",
      description: "Ankara'da kurulan LED destekli dikey tarım sistemi",
      image: "https://images.unsplash.com/photo-1518837695005-2083293ca6ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      type: "Dikey Tarım",
      location: "Ankara, Türkiye",
      size: "1,200 m²",
      features: ["Dikey Sistem", "LED Aydınlatma", "Otomatik Sulama", "Besin Yönetimi"],
      details: "Bu projede, sınırlı alanda maksimum verim elde etmek için dikey tarım teknolojisi kullanılmıştır. 12 katlı sistem ile 1,200 m² alanda 14,400 m² eşdeğer üretim alanı elde edilmiştir. LED aydınlatma ile bitkilerin fotosentez süreçleri optimize edilmiştir.",
      gallery: [
        "https://images.unsplash.com/photo-1518837695005-2083293ca6ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      order_position: 1
    },
    {
      id: 3,
      title: "Venlo Sera Kompleksi",
      description: "Antalya'da kurulan modern Venlo tipi sera kompleksi",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      type: "Venlo Sera",
      location: "Antalya, Türkiye",
      size: "5,000 m²",
      features: ["Venlo Yapı", "Çift Cam", "Otomatik Havalandırma", "Gölgeleme Sistemi"],
      details: "Bu projede, Hollanda teknolojisi Venlo tipi sera yapısı kullanılmıştır. Çift cam yapısı ile enerji tasarrufu sağlanırken, otomatik havalandırma sistemi ile ideal iklim koşulları korunmaktadır. Gölgeleme sistemi ile yaz aylarında sıcaklık kontrolü yapılmaktadır.",
      gallery: [
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1518837695005-2083293ca6ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      order_position: 2
    },
    {
      id: 4,
      title: "Tünel Sera Projesi",
      description: "Bursa'da kurulan ekonomik tünel sera sistemi",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      type: "Tünel Sera",
      location: "Bursa, Türkiye",
      size: "3,000 m²",
      features: ["Tünel Yapı", "PE Örtü", "Manuel Havalandırma", "Ekonomik Çözüm"],
      details: "Bu projede, ekonomik tünel sera yapısı kullanılarak düşük maliyetli üretim sağlanmıştır. PE örtü malzemesi ile UV koruması sağlanırken, manuel havalandırma sistemi ile temel iklim kontrolü yapılmaktadır. Küçük ve orta ölçekli üreticiler için ideal çözümdür.",
      gallery: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1518837695005-2083293ca6ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      order_position: 3
    }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Fetching projects from API...');
      
      const response = await fetch('/api/projects?limit=50');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📊 API Response:', data);
      
      if (data.projects && data.projects.length > 0) {
        // Convert API projects to component format
        const convertedProjects = data.projects.map((project: any) => {
          // Build gallery from project media
          const gallery: string[] = [];
          
          // Add cover image first
          if (project.cover_image) {
            gallery.push(project.cover_image);
          }
          
          // Add all media (images and videos)
          if (project.media && Array.isArray(project.media)) {
            project.media.forEach((media: any) => {
              if (media.media_url) {
                gallery.push(media.media_url);
              }
            });
          }
          
          // Fallback if no images
          if (gallery.length === 0) {
            gallery.push('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');
          }
          
          return {
            id: project.id,
            title: project.title,
            description: project.description,
            image: gallery[0], // Use first image as main image
            type: project.category || 'Sera',
            location: project.location || 'Belirtilmemiş',
            size: 'Projeye göre değişir',
            features: ['Modern Tasarım', 'Kaliteli Malzeme', 'Uzman Ekip'],
            details: project.description,
            gallery: gallery,
            category: project.category,
            completedDate: project.completed_date,
            order_position: project.order_position
          };
        });
        
        // Sort projects by order_position (ascending) and then by id
        const sortedProjects = convertedProjects.sort((a: Project, b: Project) => {
          if (a.order_position !== b.order_position) {
            return a.order_position - b.order_position;
          }
          return a.id - b.id;
        });
        
        console.log('✅ Converted and sorted projects:', sortedProjects.length);
        console.log('📊 Project order:', sortedProjects.map((p: Project) => `${p.title} (#${p.order_position})`));
        setProjects(sortedProjects);
      } else {
        console.log('⚠️ No projects from API, using defaults');
        setProjects(defaultProjects);
      }
    } catch (error) {
      console.error('❌ Error fetching projects:', error);
      setError('Projeler yüklenirken hata oluştu. Varsayılan projeler gösteriliyor.');
      console.log('🔄 Falling back to default projects');
      setProjects(defaultProjects);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Calculate pagination
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = projects.slice(startIndex, endIndex);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 from-primary/10 to-background-light dark:to-background-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center" data-reveal>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Projelerimiz
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Başarıyla tamamladığımız sera kurulum projelerimizi keşfedin.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 md:py-24 bg-background-light dark:bg-background-dark">
          <div className="container mx-auto px-6">
            {error && (
              <div className="mb-8 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                <p className="text-center">{error}</p>
              </div>
            )}
            
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-lg text-gray-600 dark:text-gray-300">Projeler yükleniyor...</p>
              </div>
            ) : (
              <>
                {/* Results Count */}
                <div className="mb-8 text-center">
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-white">{projects.length}</span> proje bulundu
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedProjects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-white dark:bg-background-dark rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  onClick={() => openModal(project)}
                  data-reveal
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {project.type}
                      </span>
                      <span className="text-gray-500 text-sm">{project.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>📏 {project.size}</span>
                      <span className="text-primary font-medium">Detayları Gör →</span>
                    </div>
                  </div>
                </div>
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

        {/* Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-background-dark rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {selectedProject.type}
                      </span>
                      <span className="text-gray-500 text-sm">{selectedProject.location}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedProject.description}
                    </p>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    {/* Ana görsel/video */}
                    {(() => {
                      const isVideo = ['.mp4', '.mov', '.avi', '.wmv', '.webm'].some(ext => 
                        selectedProject.image.toLowerCase().includes(ext)
                      );
                      return isVideo ? (
                        <video
                          src={selectedProject.image}
                          controls
                          className="w-full h-64 object-cover rounded-lg mb-4"
                        >
                          Tarayıcınız video oynatmayı desteklemiyor.
                        </video>
                      ) : (
                        <img 
                          src={selectedProject.image} 
                          alt={selectedProject.title}
                          className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                      );
                    })()}
                    
                    {/* Galeri */}
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.gallery.slice(1).map((mediaUrl, index) => {
                        const isVideo = ['.mp4', '.mov', '.avi', '.wmv', '.webm'].some(ext => 
                          mediaUrl.toLowerCase().includes(ext)
                        );
                        return isVideo ? (
                          <video
                            key={index}
                            src={mediaUrl}
                            controls
                            className="w-full h-32 object-cover rounded-lg"
                          >
                            Video desteklenmiyor.
                          </video>
                        ) : (
                          <img 
                            key={index}
                            src={mediaUrl} 
                            alt={`${selectedProject.title} ${index + 2}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Proje Detayları
                    </h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">Alan:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">{selectedProject.size}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">Konum:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">{selectedProject.location}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">Sera Tipi:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">{selectedProject.type}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Özellikler:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Açıklama:</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedProject.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;

