const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../database/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all projects (public)
router.get('/', (req, res) => {
  const { category, featured, page = 1, limit = 3 } = req.query;
  
  let query = 'SELECT * FROM projects';
  let params = [];
  let conditions = [];

  if (category && category !== 'all') {
    conditions.push('category = ?');
    params.push(category);
  }

  if (featured === 'true') {
    conditions.push('featured = 1');
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY order_position ASC, created_at DESC';

  // Add pagination
  const offset = (page - 1) * limit;
  query += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  db.all(query, params, (err, projects) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM projects';
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
        projects,
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

// Get single project (public)
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM projects WHERE id = ?', [id], (err, project) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ project });
  });
});

// Create project (admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('location').notEmpty().withMessage('Location is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, cover_image, category, location, completedDate, order_position = 0 } = req.body;

  db.run(
    `INSERT INTO projects (title, description, cover_image, category, location, completed_date, order_position) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, description, cover_image || '', category, location, completedDate || null, order_position],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.status(201).json({
        message: 'Project created successfully',
        project: {
          id: this.lastID,
          title,
          description,
          cover_image,
          category,
          location,
          completed_date: completedDate,
          order_position,
          created_at: new Date().toISOString()
        }
      });
    }
  );
});

// Update project (admin only)
router.put('/:id', authenticateToken, requireAdmin, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('location').notEmpty().withMessage('Location is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, description, cover_image, category, location, completedDate, order_position = 0 } = req.body;

  db.run(
    `UPDATE projects 
     SET title = ?, description = ?, cover_image = ?, category = ?, location = ?, completed_date = ?, order_position = ?, updated_at = CURRENT_TIMESTAMP 
     WHERE id = ?`,
    [title, description, cover_image || '', category, location, completedDate || null, order_position, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.json({
        message: 'Project updated successfully',
        project: {
          id: parseInt(id),
          title,
          description,
          cover_image,
          category,
          location,
          completed_date: completedDate,
          order_position,
          updated_at: new Date().toISOString()
        }
      });
    }
  );
});

// Delete project (admin only)
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  });
});

// Get all projects for admin (no pagination)
router.get('/admin/all', authenticateToken, requireAdmin, (req, res) => {
  db.all('SELECT * FROM projects ORDER BY order_position ASC, created_at DESC', [], (err, projects) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json({ projects });
  });
});

// Reorder projects (admin only) - MUST be before /:id routes
router.put('/admin/reorder', authenticateToken, requireAdmin, (req, res) => {
  const { projectIds } = req.body; // Array of project IDs in new order

  if (!Array.isArray(projectIds)) {
    return res.status(400).json({ error: 'projectIds must be an array' });
  }

  const updates = projectIds.map((projectId, index) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE projects SET order_position = ? WHERE id = ?', 
        [index, projectId], 
        function(err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  });

  Promise.all(updates)
    .then(() => {
      res.json({ message: 'Projects reordered successfully' });
    })
    .catch((err) => {
      console.error('Reorder error:', err);
      res.status(500).json({ error: 'Database error' });
    });
});


// Update project order position (admin only)
router.put('/:id/order', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { order_position } = req.body;

  if (typeof order_position !== 'number') {
    return res.status(400).json({ error: 'order_position must be a number' });
  }

  db.run(
    'UPDATE projects SET order_position = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [order_position, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.json({
        message: 'Project order updated successfully',
        order_position
      });
    }
  );
});

// Get project with media
router.get('/admin/:id/media', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  
  // Get project details
  db.get('SELECT * FROM projects WHERE id = ?', [id], (err, project) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Get project media
    db.all('SELECT * FROM project_media WHERE project_id = ? ORDER BY order_position ASC', [id], (err, media) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.json({ project, media });
    });
  });
});

// Add media to project
router.post('/:id/media', authenticateToken, requireAdmin, [
  body('media_url').notEmpty().withMessage('Media URL is required'),
  body('media_type').isIn(['image', 'video']).withMessage('Media type must be image or video')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { media_url, media_type, alt_text, title, description, order_position = 0, is_cover = false } = req.body;

  // If this is a cover image, unset other cover images for this project
  if (is_cover) {
    db.run('UPDATE project_media SET is_cover = 0 WHERE project_id = ?', [id]);
  }

  db.run(
    `INSERT INTO project_media (project_id, media_url, media_type, alt_text, title, description, order_position, is_cover) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, media_url, media_type, alt_text || '', title || '', description || '', order_position, is_cover ? 1 : 0],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.status(201).json({
        message: 'Media added successfully',
        media: {
          id: this.lastID,
          project_id: parseInt(id),
          media_url,
          media_type,
          alt_text,
          title,
          description,
          order_position,
          is_cover,
          created_at: new Date().toISOString()
        }
      });
    }
  );
});

// Update media
router.put('/:id/media/:mediaId', authenticateToken, requireAdmin, (req, res) => {
  const { id, mediaId } = req.params;
  const { media_url, media_type, alt_text, title, description, order_position, is_cover } = req.body;

  // If this is a cover image, unset other cover images for this project
  if (is_cover) {
    db.run('UPDATE project_media SET is_cover = 0 WHERE project_id = ? AND id != ?', [id, mediaId]);
  }

  db.run(
    `UPDATE project_media 
     SET media_url = ?, media_type = ?, alt_text = ?, title = ?, description = ?, order_position = ?, is_cover = ?
     WHERE id = ? AND project_id = ?`,
    [media_url, media_type, alt_text || '', title || '', description || '', order_position || 0, is_cover ? 1 : 0, mediaId, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Media not found' });
      }

      res.json({
        message: 'Media updated successfully',
        media: {
          id: parseInt(mediaId),
          project_id: parseInt(id),
          media_url,
          media_type,
          alt_text,
          title,
          description,
          order_position,
          is_cover,
          updated_at: new Date().toISOString()
        }
      });
    }
  );
});

// Delete media
router.delete('/:id/media/:mediaId', authenticateToken, requireAdmin, (req, res) => {
  const { id, mediaId } = req.params;

  db.run('DELETE FROM project_media WHERE id = ? AND project_id = ?', [mediaId, id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Media not found' });
    }

    res.json({ message: 'Media deleted successfully' });
  });
});

// Reorder media
router.put('/:id/media/reorder', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { mediaIds } = req.body; // Array of media IDs in new order

  if (!Array.isArray(mediaIds)) {
    return res.status(400).json({ error: 'mediaIds must be an array' });
  }

  const updates = mediaIds.map((mediaId, index) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE project_media SET order_position = ? WHERE id = ? AND project_id = ?', 
        [index, mediaId, id], 
        function(err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  });

  Promise.all(updates)
    .then(() => {
      res.json({ message: 'Media reordered successfully' });
    })
    .catch((err) => {
      console.error('Reorder error:', err);
      res.status(500).json({ error: 'Database error' });
    });
});


module.exports = router;
