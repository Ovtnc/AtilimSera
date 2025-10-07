import React, { useState, useEffect } from 'react';
import ImageUpload from '../ImageUpload';

interface Project {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  category: string;
  location: string;
  completed_date: string;
  order_position: number;
  created_at: string;
  updated_at: string;
}

interface ProjectMedia {
  id: number;
  project_id: number;
  media_url: string;
  media_type: 'image' | 'video';
  alt_text: string;
  title: string;
  description: string;
  order_position: number;
  is_cover: boolean;
  created_at: string;
}

const ProjectManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showMediaManager, setShowMediaManager] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectMedia, setProjectMedia] = useState<ProjectMedia[]>([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    cover_image: '',
    category: '',
    location: '',
    completed_date: '',
    order_position: 0
  });
  const [newMedia, setNewMedia] = useState({
    media_url: '',
    media_type: 'image' as 'image' | 'video',
    alt_text: '',
    title: '',
    description: '',
    is_cover: false,
    file: null as File | null
  });

  const projectCategories = [
    'Hidroponik Sistem',
    'Dikey Tarım',
    'Akıllı Sera',
    'Sürdürülebilir Tarım',
    'Modern Teknoloji',
    'Araştırma & Geliştirme',
    'Eğitim Projesi',
    'Pilot Proje'
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  // Debug: Log projects state changes
  useEffect(() => {
    console.log('🔄 Projects state updated:', projects.length, 'projects');
  }, [projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('🔍 Fetching projects with token:', token ? 'Present' : 'Missing');
      
      const response = await fetch('/api/projects/admin/all', {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      
      console.log('📡 Response status:', response.status);
      const data = await response.json();
      console.log('📊 Projects data:', data);
      
      if (data.projects) {
        // Sort projects by order_position (ascending) and then by id
        const sortedProjects = data.projects.sort((a: Project, b: Project) => {
          if (a.order_position !== b.order_position) {
            return a.order_position - b.order_position;
          }
          return a.id - b.id;
        });
        
        setProjects(sortedProjects);
        console.log('✅ Projects set successfully:', sortedProjects.length, 'projects');
        console.log('📊 Admin project order:', sortedProjects.map((p: Project) => `${p.title} (#${p.order_position})`));
      } else {
        console.log('❌ No projects in response');
      }
    } catch (error) {
      console.error('❌ Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = editingProject 
        ? `/api/projects/${editingProject.id}`
        : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      console.log('💾 Saving project:', { method, url, project: newProject });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(newProject)
      });

      console.log('📡 Save response status:', response.status);
      const responseData = await response.json();
      console.log('📊 Save response data:', responseData);

      if (response.ok) {
        alert(editingProject ? 'Proje güncellendi!' : 'Proje eklendi!');
        setNewProject({
          title: '',
          description: '',
          cover_image: '',
          category: '',
          location: '',
          completed_date: '',
          order_position: 0
        });
        setShowForm(false);
        setEditingProject(null);
        console.log('🔄 Refreshing projects list...');
        fetchProjects();
      } else {
        console.error('❌ Save failed:', responseData);
        alert(`Hata: ${responseData.error || 'Proje kaydedilemedi'}`);
      }
    } catch (error) {
      console.error('❌ Save error:', error);
      alert('Proje kaydedilirken hata oluştu!');
    }
  };

  const deleteProject = async (id: number) => {
    if (window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });

        if (response.ok) {
          alert('Proje silindi!');
          fetchProjects();
        } else {
          const errorData = await response.json();
          alert(`Hata: ${errorData.error || 'Proje silinemedi'}`);
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Proje silinirken hata oluştu!');
      }
    }
  };

  const updateProjectOrder = async (id: number, newPosition: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/projects/${id}/order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ order_position: newPosition })
      });

      if (response.ok) {
        alert('Proje sırası güncellendi!');
        fetchProjects();
      } else {
        const errorData = await response.json();
        alert(`Hata: ${errorData.error || 'Sıra güncellenemedi'}`);
      }
    } catch (error) {
      console.error('Update order error:', error);
      alert('Proje sırası güncellenirken hata oluştu!');
    }
  };

  const reorderProjects = async (projectIds: number[]) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/projects/admin/reorder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ projectIds })
      });

      if (response.ok) {
        alert('Projeler yeniden sıralandı!');
        fetchProjects();
      } else {
        const errorData = await response.json();
        alert(`Hata: ${errorData.error || 'Sıralama güncellenemedi'}`);
      }
    } catch (error) {
      console.error('Reorder error:', error);
      alert('Projeler sıralanırken hata oluştu!');
    }
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title || '',
      description: project.description || '',
      cover_image: project.cover_image || '',
      category: project.category || '',
      location: project.location || '',
      completed_date: project.completed_date || '',
      order_position: project.order_position || 0
    });
    setShowForm(true);
  };

  const openMediaManager = (project: Project) => {
    setEditingProject(project);
    fetchProjectMedia(project.id);
    setShowMediaManager(true);
  };

  const handleImageUpload = (imageUrl: string) => {
    setNewProject({ ...newProject, cover_image: imageUrl });
  };

  const handleMediaUpload = (imageUrl: string) => {
    // Check if uploaded file is video based on URL
    const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.webm'];
    const isVideo = videoExtensions.some(ext => imageUrl.toLowerCase().includes(ext));
    
    setNewMedia({ 
      ...newMedia, 
      media_url: imageUrl,
      media_type: isVideo ? 'video' : 'image'
    });
  };

  const fetchProjectMedia = async (projectId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/projects/admin/${projectId}/media`, {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      const data = await response.json();
      if (data.media) {
        setProjectMedia(data.media);
      }
    } catch (error) {
      console.error('Error fetching project media:', error);
    }
  };

  const addMediaToProject = async (projectId: number) => {
    try {
      if (!newMedia.media_url) {
        alert('Lütfen bir medya yükleyin!');
        return;
      }

      const token = localStorage.getItem('token');

      // Medyayı projeye ekle
      const response = await fetch(`/api/projects/${projectId}/media`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          media_url: newMedia.media_url,
          media_type: newMedia.media_type,
          alt_text: newMedia.alt_text,
          title: newMedia.title,
          description: newMedia.description,
          is_cover: newMedia.is_cover
        })
      });

      if (response.ok) {
        alert('Medya eklendi!');
        setNewMedia({
          media_url: '',
          media_type: 'image',
          alt_text: '',
          title: '',
          description: '',
          is_cover: false,
          file: null
        });
        fetchProjectMedia(projectId);
      } else {
        const errorData = await response.json();
        alert(`Hata: ${errorData.error || 'Medya eklenemedi'}`);
      }
    } catch (error) {
      console.error('Add media error:', error);
      alert('Medya eklenirken hata oluştu!');
    }
  };

  const deleteProjectMedia = async (projectId: number, mediaId: number) => {
    if (window.confirm('Bu medyayı silmek istediğinizden emin misiniz?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/projects/${projectId}/media/${mediaId}`, {
          method: 'DELETE',
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });

        if (response.ok) {
          alert('Medya silindi!');
          fetchProjectMedia(projectId);
        } else {
          const errorData = await response.json();
          alert(`Hata: ${errorData.error || 'Medya silinemedi'}`);
        }
      } catch (error) {
        console.error('Delete media error:', error);
        alert('Medya silinirken hata oluştu!');
      }
    }
  };

  const setCoverImage = async (projectId: number, mediaId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/projects/${projectId}/media/${mediaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ is_cover: true })
      });

      if (response.ok) {
        alert('Kapak fotoğrafı güncellendi!');
        fetchProjectMedia(projectId);
        fetchProjects(); // Refresh projects list
      } else {
        const errorData = await response.json();
        alert(`Hata: ${errorData.error || 'Kapak fotoğrafı güncellenemedi'}`);
      }
    } catch (error) {
      console.error('Set cover error:', error);
      alert('Kapak fotoğrafı güncellenirken hata oluştu!');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Belirtilmemiş';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Proje Yönetimi</h2>
        <button
          onClick={() => {
            setEditingProject(null);
            setNewProject({
              title: '',
              description: '',
              cover_image: '',
              category: '',
              location: '',
              completed_date: '',
              order_position: 0
            });
            setShowForm(true);
          }}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          + Yeni Proje
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-6">
            {editingProject ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
          </h3>
          
          <div className="space-y-6">
            {/* Temel Bilgiler */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-semibold text-gray-800 mb-4">Temel Bilgiler</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Proje Adı *</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Proje adını girin"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Kategori Seçin</option>
                    {projectCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lokasyon *</label>
                  <input
                    type="text"
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Proje lokasyonu"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tamamlanma Tarihi</label>
                  <input
                    type="date"
                    value={newProject.completed_date}
                    onChange={(e) => setNewProject({ ...newProject, completed_date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            {/* Açıklama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Proje Açıklaması *</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows={6}
                placeholder="Proje detaylarını açıklayın..."
              />
            </div>
            
            {/* Proje Görseli */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Proje Görseli</label>
              <ImageUpload
                onImageUpload={handleImageUpload}
                currentImage={newProject.cover_image}
                placeholder="Proje için görsel seçin"
              />
            </div>
            
            {/* Sıralama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sıralama</label>
              <input
                type="number"
                min="0"
                value={newProject.order_position}
                onChange={(e) => setNewProject({ ...newProject, order_position: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Sıra numarası (0 = en üstte)"
              />
              <p className="text-xs text-gray-500 mt-1">Düşük sayılar üstte görünür (0, 1, 2, ...)</p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              onClick={saveProject}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {editingProject ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Mevcut Projeler</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Projeler yükleniyor...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Henüz Proje Yok</h4>
              <p className="text-gray-600 mb-4">İlk projenizi ekleyerek başlayın.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  {project.cover_image && (
                    <div className="h-48 bg-gray-200">
                      <img 
                        src={project.cover_image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-gray-900 line-clamp-2">{project.title}</h4>
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                        #{project.order_position}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-2">Kategori:</span>
                        <span>{project.category}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-2">Lokasyon:</span>
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-2">Tamamlanma:</span>
                        <span>{formatDate(project.completed_date)}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {new Date(project.created_at).toLocaleDateString('tr-TR')}
                      </span>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => updateProjectOrder(project.id, Math.max(0, project.order_position - 1))}
                          className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs hover:bg-blue-200 transition-colors"
                          title="Yukarı taşı"
                        >
                          ⬆️
                        </button>
                        <button 
                          onClick={() => updateProjectOrder(project.id, project.order_position + 1)}
                          className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs hover:bg-blue-200 transition-colors"
                          title="Aşağı taşı"
                        >
                          ⬇️
                        </button>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          #{project.order_position}
                        </span>
                        <button 
                          onClick={() => openMediaManager(project)}
                          className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-xs"
                          title="Medya Yönetimi"
                        >
                          🖼️
                        </button>
                        <button 
                          onClick={() => startEdit(project)}
                          className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => deleteProject(project.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Media Manager Modal */}
      {showMediaManager && editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  Medya Yönetimi - {editingProject.title}
                </h3>
                <button
                  onClick={() => {
                    setShowMediaManager(false);
                    setEditingProject(null);
                    setProjectMedia([]);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Add New Media Form */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="text-lg font-semibold mb-4">Yeni Medya Ekle</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medya Dosyası</label>
                    <ImageUpload
                      onImageUpload={handleMediaUpload}
                      currentImage={newMedia.media_url}
                      placeholder="Görsel veya video seçin"
                      acceptVideo={true}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Tür: {newMedia.media_type === 'image' ? '📷 Resim' : newMedia.media_type === 'video' ? '🎥 Video' : 'Dosya seçilmedi'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                    <input
                      type="text"
                      value={newMedia.title}
                      onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Medya başlığı"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alt Metin</label>
                    <input
                      type="text"
                      value={newMedia.alt_text}
                      onChange={(e) => setNewMedia({ ...newMedia, alt_text: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Alt metin"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                    <textarea
                      value={newMedia.description}
                      onChange={(e) => setNewMedia({ ...newMedia, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      rows={3}
                      placeholder="Medya açıklaması"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newMedia.is_cover}
                      onChange={(e) => setNewMedia({ ...newMedia, is_cover: e.target.checked })}
                      className="mr-2 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Kapak Fotoğrafı Olarak Ayarla</span>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => addMediaToProject(editingProject.id)}
                    disabled={!newMedia.media_url}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      newMedia.media_url 
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {newMedia.media_url ? 'Medya Ekle' : 'Dosya Yükleyin'}
                  </button>
                </div>
              </div>

              {/* Media Gallery */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Mevcut Medya ({projectMedia.length})</h4>
                {projectMedia.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📷</div>
                    <p>Henüz medya eklenmemiş.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projectMedia.map((media) => (
                      <div key={media.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        {media.media_type === 'image' ? (
                          <div className="h-32 bg-gray-200">
                            <img
                              src={media.media_url}
                              alt={media.alt_text || media.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-32 bg-gray-200 flex items-center justify-center">
                            <video
                              src={media.media_url}
                              className="w-full h-full object-cover"
                              controls
                            />
                          </div>
                        )}
                        
                        <div className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              media.media_type === 'image' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {media.media_type === 'image' ? '📷 Resim' : '🎥 Video'}
                            </span>
                            {media.is_cover && (
                              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                                ⭐ Kapak
                              </span>
                            )}
                          </div>
                          
                          {media.title && (
                            <h5 className="text-sm font-medium text-gray-900 mb-1 truncate">
                              {media.title}
                            </h5>
                          )}
                          
                          <div className="flex space-x-1">
                            {!media.is_cover && (
                              <button
                                onClick={() => setCoverImage(editingProject.id, media.id)}
                                className="px-2 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700 transition-colors"
                                title="Kapak Olarak Ayarla"
                              >
                                ⭐
                              </button>
                            )}
                            <button
                              onClick={() => deleteProjectMedia(editingProject.id, media.id)}
                              className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                              title="Sil"
                            >
                              🗑️
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
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;