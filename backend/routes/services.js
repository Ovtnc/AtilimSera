const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../database/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all services (public)
router.get('/', (req, res) => {
  const { category, page = 1, limit = 3 } = req.query;
  
  let query = 'SELECT * FROM services';
  let params = [];

  if (category && category !== 'all') {
    query += ' WHERE category = ?';
    params.push(category);
  }

  query += ' ORDER BY created_at DESC';

  // Add pagination
  const offset = (page - 1) * limit;
  query += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  db.all(query, params, (err, services) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    // Parse JSON strings for features and benefits
    const parsedServices = services.map(service => ({
      ...service,
      features: service.features ? JSON.parse(service.features) : [],
      benefits: service.benefits ? JSON.parse(service.benefits) : []
    }));

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM services';
    let countParams = [];
    
    if (category && category !== 'all') {
      countQuery += ' WHERE category = ?';
      countParams.push(category);
    }
    
    db.get(countQuery, countParams, (err, countResult) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.json({
        services: parsedServices,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countResult.total,
          pages: Math.ceil(countResult.total / limit)
        }
      });
    });
  });
});

// Get single service (public)
router.get('/:slug', (req, res) => {
  const { slug } = req.params;

  db.get('SELECT * FROM services WHERE slug = ?', [slug], (err, service) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Parse JSON strings for features and benefits
    const parsedService = {
      ...service,
      features: service.features ? JSON.parse(service.features) : [],
      benefits: service.benefits ? JSON.parse(service.benefits) : []
    };

    res.json({ service: parsedService });
  });
});

// Create service (admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('features').isArray().withMessage('Features must be an array'),
  body('benefits').isArray().withMessage('Benefits must be an array')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, image, category, features, benefits, price, duration } = req.body;

  // Generate slug from title
  const slug = title.toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');

  db.run(
    `INSERT INTO services (title, description, image, category, features, benefits, price, duration, slug) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title, 
      description, 
      image || '', 
      category, 
      JSON.stringify(features), 
      JSON.stringify(benefits), 
      price || 'Projeye göre değişir',
      duration || '1-3 ay',
      slug
    ],
    function(err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          return res.status(400).json({ error: 'Service with this title already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }

      res.status(201).json({
        message: 'Service created successfully',
        service: {
          id: this.lastID,
          title,
          description,
          image,
          category,
          features,
          benefits,
          price,
          slug,
          created_at: new Date().toISOString()
        }
      });
    }
  );
});

// Update service (admin only)
router.put('/:id', authenticateToken, requireAdmin, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('features').isArray().withMessage('Features must be an array'),
  body('benefits').isArray().withMessage('Benefits must be an array')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, description, image, category, features, benefits, price, duration } = req.body;

  // Generate new slug from title
  const slug = title.toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');

  db.run(
    `UPDATE services 
     SET title = ?, description = ?, image = ?, category = ?, features = ?, benefits = ?, price = ?, duration = ?, slug = ?, updated_at = CURRENT_TIMESTAMP 
     WHERE id = ?`,
    [
      title, 
      description, 
      image || '', 
      category, 
      JSON.stringify(features), 
      JSON.stringify(benefits), 
      price || 'Projeye göre değişir',
      duration || '1-3 ay',
      slug,
      id
    ],
    function(err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          return res.status(400).json({ error: 'Service with this title already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Service not found' });
      }

      res.json({
        message: 'Service updated successfully',
        service: {
          id: parseInt(id),
          title,
          description,
          image,
          category,
          features,
          benefits,
          price,
          slug,
          updated_at: new Date().toISOString()
        }
      });
    }
  );
});

// Delete service (admin only)
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM services WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  });
});

module.exports = router;
