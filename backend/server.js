const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Import database to initialize
require('./database/database');

// Import routes
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const servicesRoutes = require('./routes/services');
const projectsRoutes = require('./routes/projects');
const sliderRoutes = require('./routes/slider');
const categoriesRoutes = require('./routes/categories');
const settingsRoutes = require('./routes/settings');
const uploadRoutes = require('./routes/upload');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5001;

// Security middleware with CORS-friendly settings
app.use(helmet({
  crossOriginResourcePolicy: false, // Disable CORP to allow cross-origin image loading
  crossOriginEmbedderPolicy: false
}));

// Rate limiting - More lenient for development
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  skipSuccessfulRequests: true // Don't count successful requests
});
app.use('/api/', limiter);

// CORS configuration - Allow all origins for development
app.use(cors({
  origin: '*', // Allow all origins for development
  credentials: false, // Set to false when using wildcard origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  optionsSuccessStatus: 200
}));

// Logging
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploads with comprehensive CORS
app.use('/uploads', (req, res, next) => {
  // Set CORS headers for all uploads requests
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'false'); // Changed to false for wildcard origin
  res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Type, Content-Disposition');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
}, express.static(path.join(__dirname, 'uploads'), {
  maxAge: 0, // Disable caching for uploads
  etag: false,
  lastModified: false,
  setHeaders: (res, filePath) => {
    // Additional CORS headers for static files
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'false');
    
    // Set proper MIME type for HEIC files
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.heic' || ext === '.heif') {
      res.setHeader('Content-Type', 'image/jpeg');
    }
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/slider', sliderRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contact', contactRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Atılım Modern Sera API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      blog: '/api/blog',
      services: '/api/services',
      projects: '/api/projects',
      slider: '/api/slider',
      categories: '/api/categories',
      settings: '/api/settings',
      upload: '/api/upload'
    },
    documentation: 'https://github.com/your-repo/docs'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large' });
  }
  
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📖 API docs: http://localhost:${PORT}/api`);
  console.log(`🔐 Admin login: admin / admin123`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

module.exports = app;
