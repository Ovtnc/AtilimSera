import React, { useState, useRef, useEffect } from 'react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  placeholder?: string;
  className?: string;
  showPreview?: boolean;
}

const API_BASE_URL = 'http://localhost:5001/api';

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  currentImage,
  placeholder = "Görsel seçmek için tıklayın",
  className = "",
  showPreview = true
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when currentImage changes
  useEffect(() => {
    console.log('ImageUpload useEffect triggered, currentImage:', currentImage);
    if (currentImage && currentImage.trim() !== '') {
      // Always add cache-busting to ensure fresh image loading
      const imageUrlWithCache = currentImage.includes('?t=') 
        ? currentImage 
        : `${currentImage}?t=${Date.now()}`;
      console.log('Setting preview:', imageUrlWithCache);
      setPreview(imageUrlWithCache);
    } else {
      console.log('Setting preview to null');
      setPreview(null);
    }
  }, [currentImage]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Sadece görsel dosyaları yüklenebilir');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Dosya boyutu 5MB\'dan küçük olmalıdır');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', file);

      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Oturum süresi dolmuş');
      }

      // Upload image
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Görsel yükleme başarısız');
      }

      const data = await response.json();
      console.log('Upload successful, data:', data);
      
      // Add cache-busting parameter to image URL
      const imageUrlWithCache = `${data.imageUrl}?t=${Date.now()}`;
      console.log('Setting preview to:', imageUrlWithCache);
      
      // Set preview immediately
      setPreview(imageUrlWithCache);
      
      // Call parent callback to update parent state
      onImageUpload(data.imageUrl);
      console.log('Called onImageUpload with:', data.imageUrl);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Görsel yükleme sırasında hata oluştu');
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {preview && showPreview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
            onLoad={() => {
              console.log('Image loaded successfully:', preview);
              setError(null);
            }}
            onError={(e) => {
              console.error('Image load error:', preview, e);
              setError('Görsel yüklenemedi: ' + preview);
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
            <div className="flex gap-2">
              <button
                onClick={handleClick}
                disabled={uploading}
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {uploading ? 'Yükleniyor...' : 'Değiştir'}
              </button>
              <button
                onClick={handleRemove}
                disabled={uploading}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                Kaldır
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className={`w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors ${
            uploading ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          {uploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Görsel yükleniyor...</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-4xl text-gray-400 mb-2">📷</div>
              <p className="text-sm text-gray-600">{placeholder}</p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF, WebP (Max 5MB)</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {preview && (
        <div className="text-xs text-gray-500">
          <p>Görsel URL: <span className="font-mono break-all">{preview}</span></p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
