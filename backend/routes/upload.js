const express = require('express');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const convert = require('heic-convert');
const { upload, handleUploadError } = require('../middleware/upload');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Upload image endpoint (admin only)
router.post('/', authenticateToken, requireAdmin, upload, handleUploadError, async (req, res) => {
  try {
    console.log('Upload request received:', req.body);
    console.log('Upload file:', req.file);
    
    if (!req.file) {
      return res.status(400).json({ error: 'Görsel dosyası seçilmedi' });
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalExt = path.extname(req.file.originalname).toLowerCase();
    
    // Process file based on type
    let finalExt = originalExt;
    let processedBuffer = req.file.buffer;
    
    // Only process images, leave videos as-is
    if (req.file.mimetype.startsWith('image/')) {
      // Optimize all images for web
      try {
        processedBuffer = await sharp(req.file.buffer)
          .resize(1920, 1080, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .jpeg({ 
            quality: 85,
            progressive: true,
            mozjpeg: true
          })
          .toBuffer();
        finalExt = '.jpg';
        console.log('Image optimization successful');
      } catch (sharpError) {
        console.error('Image optimization failed, using original:', sharpError);
        processedBuffer = req.file.buffer;
      }
      
      // Convert HEIC/HEIF to JPEG for better browser compatibility
      if (originalExt === '.heic' || originalExt === '.heif') {
        try {
          console.log('Converting HEIC/HEIF to JPEG using heic-convert...');
          const jpegBuffer = await convert({
            buffer: req.file.buffer,
            format: 'JPEG',
            quality: 0.8
          });
          processedBuffer = jpegBuffer;
          finalExt = '.jpg';
          console.log('HEIC conversion successful');
        } catch (conversionError) {
          console.error('HEIC conversion failed, trying Sharp:', conversionError);
          try {
            // Fallback to Sharp with optimization
            processedBuffer = await sharp(req.file.buffer)
              .resize(1920, 1080, { 
                fit: 'inside',
                withoutEnlargement: true 
              })
              .jpeg({ 
                quality: 80,
                progressive: true,
                mozjpeg: true
              })
              .toBuffer();
            finalExt = '.jpg';
            console.log('Sharp conversion successful');
          } catch (sharpError) {
            console.error('Both conversions failed, using original:', sharpError);
            // If both conversions fail, use original file
            processedBuffer = req.file.buffer;
          }
        }
      }
    } else if (req.file.mimetype.startsWith('video/')) {
      // For videos, use original file without processing
      console.log('Video file detected, no processing needed');
      processedBuffer = req.file.buffer;
    }
    
    const filePrefix = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
    const filename = `${filePrefix}-${uniqueSuffix}${finalExt}`;
    
    // Save to both uploads and assets folders
    const uploadsPath = path.join(__dirname, '../uploads/images', filename);
    const assetsPath = path.join(__dirname, '../../src/assets/images', filename);

    // Ensure assets/images directory exists
    const assetsDir = path.dirname(assetsPath);
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    // Write file to both locations
    try {
      fs.writeFileSync(uploadsPath, processedBuffer);
      fs.writeFileSync(assetsPath, processedBuffer);
      console.log('File written to uploads:', uploadsPath);
      console.log('File written to assets:', assetsPath);
      console.log('Uploads file exists:', fs.existsSync(uploadsPath));
      console.log('Assets file exists:', fs.existsSync(assetsPath));
    } catch (writeError) {
      console.error('File write error:', writeError);
      throw writeError;
    }

    // Generate public URL for the uploaded image (use uploads for serving)
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = `${baseUrl}/uploads/images/${filename}`;

    res.json({
      message: 'Görsel başarıyla yüklendi',
      imageUrl: imageUrl,
      filename: filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Görsel yükleme sırasında hata oluştu' });
  }
});

// Get uploaded image (public)
router.get('/images/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../uploads/images', filename);
    
    // Check if file exists
    const fs = require('fs');
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'Görsel bulunamadı' });
    }

    // Set proper MIME type based on file extension
    const ext = path.extname(filename).toLowerCase();
    let mimeType = 'application/octet-stream';
    
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        mimeType = 'image/jpeg';
        break;
      case '.png':
        mimeType = 'image/png';
        break;
      case '.gif':
        mimeType = 'image/gif';
        break;
      case '.webp':
        mimeType = 'image/webp';
        break;
      case '.heic':
      case '.heif':
        // HEIC files - set as JPEG for better browser compatibility
        mimeType = 'image/jpeg';
        break;
      case '.bmp':
        mimeType = 'image/bmp';
        break;
      case '.svg':
        mimeType = 'image/svg+xml';
        break;
      case '.mp4':
        mimeType = 'video/mp4';
        break;
      case '.mov':
        mimeType = 'video/quicktime';
        break;
      case '.avi':
        mimeType = 'video/x-msvideo';
        break;
      case '.wmv':
        mimeType = 'video/x-ms-wmv';
        break;
      case '.webm':
        mimeType = 'video/webm';
        break;
    }

    // Set headers for proper image serving
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'public, max-age=0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.sendFile(imagePath);
  } catch (error) {
    console.error('Image serve error:', error);
    res.status(500).json({ error: 'Görsel yüklenirken hata oluştu' });
  }
});

// Delete image endpoint (admin only)
router.delete('/images/:filename', authenticateToken, requireAdmin, (req, res) => {
  try {
    const filename = req.params.filename;
    const uploadsPath = path.join(__dirname, '../uploads/images', filename);
    const assetsPath = path.join(__dirname, '../../src/assets/images', filename);
    
    const fs = require('fs');
    let deleted = false;
    
    // Delete from uploads folder
    if (fs.existsSync(uploadsPath)) {
      fs.unlinkSync(uploadsPath);
      deleted = true;
    }
    
    // Delete from assets folder
    if (fs.existsSync(assetsPath)) {
      fs.unlinkSync(assetsPath);
      deleted = true;
    }
    
    if (deleted) {
      res.json({ message: 'Görsel başarıyla silindi' });
    } else {
      res.status(404).json({ error: 'Görsel bulunamadı' });
    }
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ error: 'Görsel silinirken hata oluştu' });
  }
});

// List uploaded images (admin only)
router.get('/list', authenticateToken, requireAdmin, (req, res) => {
  try {
    const fs = require('fs');
    const uploadsDir = path.join(__dirname, '../uploads/images');
    
    if (!fs.existsSync(uploadsDir)) {
      return res.json({ images: [] });
    }

    const files = fs.readdirSync(uploadsDir);
    const images = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .map(file => {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        
        return {
          filename: file,
          url: `${baseUrl}/uploads/images/${file}`,
          size: stats.size,
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ images });
  } catch (error) {
    console.error('List images error:', error);
    res.status(500).json({ error: 'Görseller listelenirken hata oluştu' });
  }
});

module.exports = router;
