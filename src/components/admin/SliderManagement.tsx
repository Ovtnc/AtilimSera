import React, { useState, useEffect } from 'react';
import ImageUpload from '../ImageUpload';

interface Slider {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  image_alt?: string;
  button_text?: string;
  button_link?: string;
  is_active: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const SliderManagement: React.FC = () => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  const [newSlider, setNewSlider] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    image_alt: '',
    button_text: '',
    button_link: '',
    is_active: true,
    sort_order: 0
  });

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/slider/admin', {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      const data = await response.json();
      if (data.sliders) {
        setSliders(data.sliders);
      }
    } catch (error) {
      console.error('Error fetching sliders:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSlider = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = editingSlider 
        ? `/api/slider/${editingSlider.id}`
        : '/api/slider';
      const method = editingSlider ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(newSlider)
      });

      if (response.ok) {
        alert(editingSlider ? 'Slider güncellendi!' : 'Slider eklendi!');
        setNewSlider({
          title: '',
          subtitle: '',
          description: '',
          image: '',
          image_alt: '',
          button_text: '',
          button_link: '',
          is_active: true,
          sort_order: 0
        });
        setShowForm(false);
        setEditingSlider(null);
        fetchSliders();
      } else {
        const errorData = await response.json();
        alert(`Hata: ${errorData.error || 'Slider kaydedilemedi'}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Slider kaydedilirken hata oluştu!');
    }
  };

  const deleteSlider = async (id: number) => {
    if (window.confirm('Bu slider\'ı silmek istediğinizden emin misiniz?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/slider/${id}`, {
          method: 'DELETE',
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });

        if (response.ok) {
          alert('Slider silindi!');
          fetchSliders();
        } else {
          const errorData = await response.json();
          alert(`Hata: ${errorData.error || 'Slider silinemedi'}`);
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Slider silinirken hata oluştu!');
      }
    }
  };

  const toggleSlider = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/slider/${id}/toggle`, {
        method: 'PUT',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      if (response.ok) {
        fetchSliders();
      } else {
        const errorData = await response.json();
        alert(`Hata: ${errorData.error || 'Slider durumu güncellenemedi'}`);
      }
    } catch (error) {
      console.error('Toggle error:', error);
      alert('Slider durumu güncellenirken hata oluştu!');
    }
  };

  const startEdit = (slider: Slider) => {
    setEditingSlider(slider);
    setNewSlider({
      title: slider.title || '',
      subtitle: slider.subtitle || '',
      description: slider.description || '',
      image: slider.image || '',
      image_alt: slider.image_alt || '',
      button_text: slider.button_text || '',
      button_link: slider.button_link || '',
      is_active: slider.is_active === 1,
      sort_order: slider.sort_order || 0
    });
    setShowForm(true);
  };

  const handleImageUpload = (imageUrl: string) => {
    setNewSlider({ ...newSlider, image: imageUrl });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Slider Yönetimi</h2>
        <button
          onClick={() => {
            setEditingSlider(null);
            setNewSlider({
              title: '',
              subtitle: '',
              description: '',
              image: '',
              image_alt: '',
              button_text: '',
              button_link: '',
              is_active: true,
              sort_order: 0
            });
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          + Yeni Slider
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingSlider ? 'Slider Düzenle' : 'Yeni Slider Ekle'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Başlık *</label>
              <input
                type="text"
                value={newSlider.title}
                onChange={(e) => setNewSlider({ ...newSlider, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Slider başlığı"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
              <input
                type="text"
                value={newSlider.subtitle}
                onChange={(e) => setNewSlider({ ...newSlider, subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Alt başlık"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
              <textarea
                value={newSlider.description}
                onChange={(e) => setNewSlider({ ...newSlider, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Slider açıklaması"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Ana Görsel *</label>
              <ImageUpload
                onImageUpload={handleImageUpload}
                currentImage={newSlider.image}
                placeholder="Slider için ana görsel seçin"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Görsel Alt Metni</label>
              <input
                type="text"
                value={newSlider.image_alt}
                onChange={(e) => setNewSlider({ ...newSlider, image_alt: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Görsel alt metni"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sıralama</label>
              <input
                type="number"
                value={newSlider.sort_order}
                onChange={(e) => setNewSlider({ ...newSlider, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buton Metni</label>
              <input
                type="text"
                value={newSlider.button_text}
                onChange={(e) => setNewSlider({ ...newSlider, button_text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Buton metni"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buton Linki</label>
              <input
                type="text"
                value={newSlider.button_link}
                onChange={(e) => setNewSlider({ ...newSlider, button_link: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="/services"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newSlider.is_active}
                  onChange={(e) => setNewSlider({ ...newSlider, is_active: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Aktif</span>
              </label>
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
              onClick={saveSlider}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingSlider ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Mevcut Slider'lar</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Yükleniyor...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sliders.map((slider) => (
                <div key={slider.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{slider.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${
                          slider.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {slider.is_active ? '✅ Aktif' : '❌ Pasif'}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          #{slider.sort_order}
                        </span>
                      </div>
                      {slider.subtitle && (
                        <p className="text-gray-600 mb-1 font-medium">{slider.subtitle}</p>
                      )}
                      {slider.description && (
                        <p className="text-gray-600 mb-2">{slider.description}</p>
                      )}
                      {slider.button_text && (
                        <p className="text-sm text-gray-500">
                          Buton: "{slider.button_text}" → {slider.button_link}
                        </p>
                      )}
                      {slider.image && (
                        <div className="mt-2">
                          <img 
                            src={slider.image} 
                            alt={slider.image_alt || slider.title}
                            className="w-32 h-20 object-cover rounded border border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button 
                        onClick={() => toggleSlider(slider.id)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          slider.is_active 
                            ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {slider.is_active ? '⏸️ Pasifleştir' : '▶️ Aktifleştir'}
                      </button>
                      <button 
                        onClick={() => startEdit(slider)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                      >
                        ✏️ Düzenle
                      </button>
                      <button 
                        onClick={() => deleteSlider(slider.id)}
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

export default SliderManagement;
