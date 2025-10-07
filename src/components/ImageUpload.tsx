import React, { useState, useRef, useEffect } from 'react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  placeholder?: string;
  className?: string;
  showPreview?: boolean;
  acceptVideo?: boolean;
}

const API_BASE_URL = '/api';

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  currentImage,
  placeholder = "Görsel seçmek için tıklayın",
  className = "",
  showPreview = true,
  acceptVideo = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when currentImage changes
  useEffect(() => {
    console.log('ImageUpload useEffect triggered, currentImage:', currentImage);
    if (currentImage && currentImage.trim() !== '') {
      // Check if it's a video
      const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.webm'];
      const isVideoFile = videoExtensions.some(ext => currentImage.toLowerCase().includes(ext));
      setIsVideo(isVideoFile);
      
      // Always add cache-busting to ensure fresh media loading
      const mediaUrlWithCache = currentImage.includes('?t=') 
        ? currentImage 
        : `${currentImage}?t=${Date.now()}`;
      console.log('Setting preview:', mediaUrlWithCache, 'isVideo:', isVideoFile);
      setPreview(mediaUrlWithCache);
    } else {
      console.log('Setting preview to null');
      setPreview(null);
      setIsVideo(false);
    }
  }, [currentImage]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    const isImageFile = file.type.startsWith('image/');
    const isVideoFile = file.type.startsWith('video/');
    
    if (!isImageFile && !isVideoFile) {
      setError('Sadece görsel ve video dosyaları yüklenebilir');
      return;
    }
    
    if (isVideoFile && !acceptVideo) {
      setError('Bu alan sadece görsel dosyaları kabul eder');
      return;
    }

    // Validate file size (200MB for videos, 10MB for images)
    const maxSize = isVideoFile ? 200 * 1024 * 1024 : 10 * 1024 * 1024;
    const maxSizeText = isVideoFile ? '200MB' : '10MB';
    
    if (file.size > maxSize) {
      setError(`Dosya boyutu ${maxSizeText}'dan küçük olmalıdır`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', file);

      // Get token from localStorage or sessionStorage
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        throw new Error('Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
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
      
      // Check if uploaded file is video
      const uploadedIsVideo = file.type.startsWith('video/');
      setIsVideo(uploadedIsVideo);
      
      // Add cache-busting parameter to media URL
      const mediaUrlWithCache = `${data.imageUrl}?t=${Date.now()}`;
      console.log('Setting preview to:', mediaUrlWithCache, 'isVideo:', uploadedIsVideo);
      
      // Set preview immediately
      setPreview(mediaUrlWithCache);
      
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
    setIsVideo(false);
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
        accept={acceptVideo ? "image/*,video/*" : "image/*"}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {preview && showPreview ? (
        <div className="relative group">
          {isVideo ? (
            <video
              src={preview}
              controls
              className="w-full h-48 object-cover rounded-lg border border-gray-300"
              onLoadedData={() => {
                console.log('Video loaded successfully:', preview);
                setError(null);
              }}
              onError={(e) => {
                console.error('Video load error:', preview, e);
                setError('Video yüklenemedi: ' + preview);
              }}
            >
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
          ) : (
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
          )}
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
              <div className="text-4xl text-gray-400 mb-2">{acceptVideo ? '🎬' : '📷'}</div>
              <p className="text-sm text-gray-600">{placeholder}</p>
              <p className="text-xs text-gray-500 mt-1">
                {acceptVideo 
                  ? 'Görsel: JPG, PNG, GIF, WebP (Max 10MB) | Video: MP4, MOV, AVI, WebM (Max 200MB)' 
                  : 'JPG, PNG, GIF, WebP (Max 10MB)'}
              </p>
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
          <p>{isVideo ? 'Video' : 'Görsel'} URL: <span className="font-mono break-all">{preview}</span></p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
