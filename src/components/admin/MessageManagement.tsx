import React, { useState, useEffect } from 'react';

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
  updated_at: string;
}

interface MessageStats {
  total: number;
  new: number;
  read: number;
  replied: number;
  today: number;
}

const MessageManagement: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<MessageStats>({
    total: 0,
    new: 0,
    read: 0,
    replied: 0,
    today: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const statusOptions = [
    { value: 'all', label: 'Tümü', color: 'bg-gray-100 text-gray-800' },
    { value: 'new', label: 'Yeni', color: 'bg-blue-100 text-blue-800' },
    { value: 'read', label: 'Okundu', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'replied', label: 'Yanıtlandı', color: 'bg-green-100 text-green-800' },
    { value: 'archived', label: 'Arşivlendi', color: 'bg-gray-100 text-gray-800' }
  ];

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, [statusFilter, currentPage]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5001/api/contact?status=${statusFilter}&page=${currentPage}&limit=10`,
        {
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/contact/stats', {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateMessageStatus = async (messageId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/contact/${messageId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        alert('Mesaj durumu güncellendi!');
        fetchMessages();
        fetchStats();
        
        // Update selected message if it's the same
        if (selectedMessage && selectedMessage.id === messageId) {
          setSelectedMessage({ ...selectedMessage, status: newStatus as any });
        }
      } else {
        const errorData = await response.json();
        alert(`Hata: ${errorData.error || 'Durum güncellenemedi'}`);
      }
    } catch (error) {
      console.error('Error updating message status:', error);
      alert('Mesaj durumu güncellenirken hata oluştu!');
    }
  };

  const deleteMessage = async (messageId: number) => {
    if (!window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/contact/${messageId}`, {
        method: 'DELETE',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      if (response.ok) {
        alert('Mesaj silindi!');
        fetchMessages();
        fetchStats();
        
        if (selectedMessage && selectedMessage.id === messageId) {
          setSelectedMessage(null);
        }
      } else {
        const errorData = await response.json();
        alert(`Hata: ${errorData.error || 'Mesaj silinemedi'}`);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Mesaj silinirken hata oluştu!');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption?.label || status;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Mesajlar yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Mesaj Yönetimi</h2>
        <div className="flex space-x-4">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toplam</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="text-2xl">📧</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Yeni</p>
              <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
            </div>
            <div className="text-2xl">🆕</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Okundu</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.read}</p>
            </div>
            <div className="text-2xl">👁️</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Yanıtlandı</p>
              <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
            </div>
            <div className="text-2xl">✅</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bugün</p>
              <p className="text-2xl font-bold text-purple-600">{stats.today}</p>
            </div>
            <div className="text-2xl">📅</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                İletişim Mesajları ({messages.length})
              </h3>
              
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📨</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Henüz mesaj yok</h4>
                  <p className="text-gray-600">İletişim formundan gelen mesajlar burada görünecek.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedMessage?.id === message.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{message.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                              {getStatusLabel(message.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{message.email}</p>
                          {message.subject && (
                            <p className="text-sm font-medium text-gray-800 mt-1">{message.subject}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{formatDate(message.created_at)}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 line-clamp-2 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                        {message.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Önceki
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        currentPage === page
                          ? 'bg-emerald-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sonraki
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Mesaj Detayı</h3>
              
              {selectedMessage ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gönderen</label>
                    <p className="text-gray-900 font-medium">{selectedMessage.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                    <p className="text-gray-900">{selectedMessage.email}</p>
                  </div>
                  
                  {selectedMessage.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                      <p className="text-gray-900">{selectedMessage.phone}</p>
                    </div>
                  )}
                  
                  {selectedMessage.subject && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Konu</label>
                      <p className="text-gray-900">{selectedMessage.subject}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mesaj</label>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gönderim Tarihi</label>
                    <p className="text-gray-900">{formatDate(selectedMessage.created_at)}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                    <select
                      value={selectedMessage.status}
                      onChange={(e) => updateMessageStatus(selectedMessage.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      {statusOptions.slice(1).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      🗑️ Sil
                    </button>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'İletişim'}`}
                      className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-center"
                    >
                      📧 Yanıtla
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">👆</div>
                  <p className="text-gray-600">Mesaj seçin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageManagement;
