import React, { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  image_alt?: string;
  color: string;
  is_active: number;
  sort_order: number;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    is_active: true,
    sort_order: 0,
    meta_title: '',
    meta_description: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
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
    } finally {
      setLoading(false);
    }
  };

  const saveCategory = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const url = editingCategory 
        ? `/api/categories/${editingCategory.id}`
        : '/api/categories';
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(newCategory)
      });

      if (response.ok) {
        alert(editingCategory ? 'Kategori güncellendi!' : 'Kategori eklendi!');
        setNewCategory({
          name: '',
          description: '',
          color: '#3B82F6',
          is_active: true,
          sort_order: 0,
          meta_title: '',
          meta_description: ''
        });
        setShowForm(false);
        setEditingCategory(null);
        fetchCategories();
      } else {
        const errorData = await response.json();
        alert(`Hata: ${errorData.error || 'Kategori kaydedilemedi'}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Kategori kaydedilirken hata oluştu!');
    }
  };

  const deleteCategory = async (id: number) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await fetch(`/api/categories/${id}`, {
          method: 'DELETE',
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });

        if (response.ok) {
          alert('Kategori silindi!');
          fetchCategories();
        } else {
          const errorData = await response.json();
          alert(`Hata: ${errorData.error || 'Kategori silinemedi'}`);
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Kategori silinirken hata oluştu!');
      }
    }
  };

  const toggleCategory = async (id: number) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(`/api/categories/${id}/toggle`, {
        method: 'PUT',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      if (response.ok) {
        fetchCategories();
      } else {
        const errorData = await response.json();
        alert(`Hata: ${errorData.error || 'Kategori durumu güncellenemedi'}`);
      }
    } catch (error) {
      console.error('Toggle error:', error);
      alert('Kategori durumu güncellenirken hata oluştu!');
    }
  };

  const startEdit = (category: Category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name || '',
      description: category.description || '',
      color: category.color || '#3B82F6',
      is_active: category.is_active === 1,
      sort_order: category.sort_order || 0,
      meta_title: category.meta_title || '',
      meta_description: category.meta_description || ''
    });
    setShowForm(true);
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Kategori Yönetimi</h2>
        <button
          onClick={() => {
            setEditingCategory(null);
            setNewCategory({
              name: '',
              description: '',
              color: '#3B82F6',
              is_active: true,
              sort_order: 0,
              meta_title: '',
              meta_description: ''
            });
            setShowForm(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          + Yeni Kategori
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Adı *</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Kategori adı"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Renk</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="w-12 h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="#3B82F6"
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
                placeholder="Kategori açıklaması"
              />
            </div>
            
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sıralama</label>
              <input
                type="number"
                value={newCategory.sort_order}
                onChange={(e) => setNewCategory({ ...newCategory, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Başlık</label>
              <input
                type="text"
                value={newCategory.meta_title}
                onChange={(e) => setNewCategory({ ...newCategory, meta_title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="SEO için meta başlık"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Açıklama</label>
              <input
                type="text"
                value={newCategory.meta_description}
                onChange={(e) => setNewCategory({ ...newCategory, meta_description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="SEO için meta açıklama"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newCategory.is_active}
                  onChange={(e) => setNewCategory({ ...newCategory, is_active: e.target.checked })}
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
              onClick={saveCategory}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {editingCategory ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Mevcut Kategoriler</h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Yükleniyor...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      category.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {category.is_active ? '✅ Aktif' : '❌ Pasif'}
                    </span>
                  </div>
                  
                  {category.description && (
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                  )}
                  
                  
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      #{category.sort_order}
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => toggleCategory(category.id)}
                        className={`px-2 py-1 rounded text-xs transition-colors ${
                          category.is_active 
                            ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {category.is_active ? '⏸️' : '▶️'}
                      </button>
                      <button 
                        onClick={() => startEdit(category)}
                        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => deleteCategory(category.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
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
  );
};

export default CategoryManagement;
