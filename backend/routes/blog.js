const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../database/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all blog posts (public)
router.get('/', (req, res) => {
  const { published, category, page = 1, limit = 3 } = req.query;
  
  let query = 'SELECT * FROM blog_posts';
  let params = [];
  let conditions = [];

  if (published === 'true') {
    conditions.push('published = 1');
  }

  if (category && category !== 'all') {
    conditions.push('category = ?');
    params.push(category);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY created_at DESC';

  // Add pagination
  const offset = (page - 1) * limit;
  query += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  db.all(query, params, (err, posts) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM blog_posts';
    let countParams = [];
    
    if (conditions.length > 0) {
      countQuery += ' WHERE ' + conditions.join(' AND ');
      countParams = params.slice(0, -2); // Remove limit and offset
    }
    
    db.get(countQuery, countParams, (err, countResult) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.json({
        posts,
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

// Get single blog post (public)
router.get('/:id', (req, res) => {
  const { id } = req.params;

  // Try to find by slug first, then by ID
  let query = 'SELECT * FROM blog_posts WHERE slug = ? OR id = ?';
  let params = [id, id];

  db.get(query, params, (err, post) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ post });
  });
});

// Create blog post (admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').notEmpty().withMessage('Excerpt is required'),
  body('category').notEmpty().withMessage('Category is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, excerpt, image, image_alt, category, published = false, meta_description, meta_keywords, slug } = req.body;

  db.run(
    `INSERT INTO blog_posts (title, content, excerpt, image, image_alt, category, published, author_id, meta_description, meta_keywords, slug) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, content, excerpt, image || '', image_alt || '', category, published ? 1 : 0, req.user.id, meta_description || '', meta_keywords || '', slug || ''],
    function(err) {
      if (err) {
        console.error('Database error creating blog post:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }

      res.status(201).json({
        message: 'Blog post created successfully',
        post: {
          id: this.lastID,
          title,
          content,
          excerpt,
          image,
          image_alt,
          category,
          published,
          author_id: req.user.id,
          created_at: new Date().toISOString()
        }
      });
    }
  );
});

// Update blog post (admin only)
router.put('/:id', authenticateToken, requireAdmin, [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').notEmpty().withMessage('Excerpt is required'),
  body('category').notEmpty().withMessage('Category is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, content, excerpt, image, image_alt, category, published = false, meta_description, meta_keywords, slug } = req.body;

  db.run(
    `UPDATE blog_posts 
     SET title = ?, content = ?, excerpt = ?, image = ?, image_alt = ?, category = ?, published = ?, meta_description = ?, meta_keywords = ?, slug = ?, updated_at = CURRENT_TIMESTAMP 
     WHERE id = ?`,
    [title, content, excerpt, image || '', image_alt || '', category, published ? 1 : 0, meta_description || '', meta_keywords || '', slug || '', id],
    function(err) {
      if (err) {
        console.error('Database error updating blog post:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      res.json({
        message: 'Blog post updated successfully',
        post: {
          id: parseInt(id),
          title,
          content,
          excerpt,
          image,
          image_alt,
          category,
          published,
          updated_at: new Date().toISOString()
        }
      });
    }
  );
});

// Delete blog post (admin only)
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM blog_posts WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted successfully' });
  });
});

module.exports = router;
