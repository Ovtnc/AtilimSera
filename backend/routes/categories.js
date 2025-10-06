const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../database/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Slug oluşturma fonksiyonu
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

// Get all categories (public)
router.get('/', (req, res) => {
  db.all('SELECT * FROM categories WHERE is_active = 1 ORDER BY sort_order ASC', (err, categories) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ categories });
  });
});

// Get single category by slug (public)
router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  
  db.get('SELECT * FROM categories WHERE slug = ? AND is_active = 1', [slug], (err, category) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json({ category });
  });
});

// Get all categories for admin (including inactive)
router.get('/admin/all', authenticateToken, requireAdmin, (req, res) => {
  db.all('SELECT * FROM categories ORDER BY sort_order ASC', (err, categories) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ categories });
  });
});

// Create category (admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('name').notEmpty().withMessage('Category name is required'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description too long')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { 
    name, 
    description, 
    image, 
    image_alt, 
    color = '#3B82F6', 
    is_active = true, 
    sort_order = 0,
    meta_title,
    meta_description
  } = req.body;

  const slug = generateSlug(name);

  // Check if slug already exists
  db.get('SELECT id FROM categories WHERE slug = ?', [slug], (err, existingCategory) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (existingCategory) {
      return res.status(400).json({ error: 'Category with this name already exists' });
    }

    db.run(
      `INSERT INTO categories (name, slug, description, image, image_alt, color, is_active, sort_order, meta_title, meta_description) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, slug, description || '', image || '', image_alt || '', color, is_active ? 1 : 0, sort_order, meta_title || '', meta_description || ''],
      function(err) {
        if (err) {
          console.error('Database error creating category:', err);
          return res.status(500).json({ error: 'Database error', details: err.message });
        }

        res.status(201).json({
          message: 'Category created successfully',
          category: {
            id: this.lastID,
            name,
            slug,
            description,
            image,
            image_alt,
            color,
            is_active,
            sort_order,
            meta_title,
            meta_description,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        });
      }
    );
  });
});

// Update category (admin only)
router.put('/:id', authenticateToken, requireAdmin, [
  body('name').notEmpty().withMessage('Category name is required'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description too long')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { 
    name, 
    description, 
    image, 
    image_alt, 
    color, 
    is_active, 
    sort_order,
    meta_title,
    meta_description
  } = req.body;

  const slug = generateSlug(name);

  // Check if slug already exists for other categories
  db.get('SELECT id FROM categories WHERE slug = ? AND id != ?', [slug, id], (err, existingCategory) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (existingCategory) {
      return res.status(400).json({ error: 'Category with this name already exists' });
    }

    db.run(
      `UPDATE categories 
       SET name = ?, slug = ?, description = ?, image = ?, image_alt = ?, color = ?, is_active = ?, sort_order = ?, meta_title = ?, meta_description = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [name, slug, description || '', image || '', image_alt || '', color || '#3B82F6', is_active ? 1 : 0, sort_order || 0, meta_title || '', meta_description || '', id],
      function(err) {
        if (err) {
          console.error('Database error updating category:', err);
          return res.status(500).json({ error: 'Database error', details: err.message });
        }

        if (this.changes === 0) {
          return res.status(404).json({ error: 'Category not found' });
        }

        res.json({
          message: 'Category updated successfully',
          category: {
            id: parseInt(id),
            name,
            slug,
            description,
            image,
            image_alt,
            color,
            is_active,
            sort_order,
            meta_title,
            meta_description,
            updated_at: new Date().toISOString()
          }
        });
      }
    );
  });
});

// Delete category (admin only)
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  // Check if category is used in blog posts
  db.get('SELECT id FROM blog_posts WHERE category = (SELECT name FROM categories WHERE id = ?)', [id], (err, blogPost) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (blogPost) {
      return res.status(400).json({ error: 'Cannot delete category that is used in blog posts' });
    }

    db.run('DELETE FROM categories WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Database error deleting category:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.json({ message: 'Category deleted successfully' });
    });
  });
});

// Reorder categories (admin only)
router.put('/reorder', authenticateToken, requireAdmin, [
  body('categories').isArray().withMessage('Categories must be an array')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { categories } = req.body;

  // Update sort orders
  const updatePromises = categories.map((category, index) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE categories SET sort_order = ? WHERE id = ?',
        [index + 1, category.id],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  });

  Promise.all(updatePromises)
    .then(() => {
      res.json({ message: 'Categories reordered successfully' });
    })
    .catch((err) => {
      console.error('Database error reordering categories:', err);
      res.status(500).json({ error: 'Database error', details: err.message });
    });
});

// Toggle category active status (admin only)
router.put('/:id/toggle', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  db.get('SELECT is_active FROM categories WHERE id = ?', [id], (err, category) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const newStatus = category.is_active ? 0 : 1;

    db.run(
      'UPDATE categories SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [newStatus, id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        res.json({
          message: 'Category status updated successfully',
          is_active: newStatus === 1
        });
      }
    );
  });
});

// Get category statistics (admin only)
router.get('/admin/stats', authenticateToken, requireAdmin, (req, res) => {
  const stats = {};

  // Get total categories
  db.get('SELECT COUNT(*) as total FROM categories', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    stats.total = result.total;

    // Get active categories
    db.get('SELECT COUNT(*) as active FROM categories WHERE is_active = 1', (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      stats.active = result.active;
      stats.inactive = stats.total - stats.active;

      res.json({ stats });
    });
  });
});

module.exports = router;
