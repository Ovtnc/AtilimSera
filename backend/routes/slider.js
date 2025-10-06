const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../database/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all slider items (public)
router.get('/', (req, res) => {
  db.all('SELECT * FROM slider WHERE is_active = 1 ORDER BY sort_order ASC', (err, sliders) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ sliders });
  });
});

// Get all slider items for admin (including inactive)
router.get('/admin', authenticateToken, requireAdmin, (req, res) => {
  db.all('SELECT * FROM slider ORDER BY sort_order ASC', (err, sliders) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ sliders });
  });
});

// Create slider item (admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('title').notEmpty().withMessage('Title is required'),
  body('image').notEmpty().withMessage('Image URL is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, subtitle, description, image, image_alt, button_text, button_link, is_active = true, sort_order = 0 } = req.body;

  db.run(
    `INSERT INTO slider (title, subtitle, description, image, image_alt, button_text, button_link, is_active, sort_order) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, subtitle || '', description || '', image, image_alt || '', button_text || '', button_link || '', is_active ? 1 : 0, sort_order],
    function(err) {
      if (err) {
        console.error('Database error creating slider:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }

      res.status(201).json({
        message: 'Slider item created successfully',
        slider: {
          id: this.lastID,
          title,
          subtitle,
          description,
          image,
          image_alt,
          button_text,
          button_link,
          is_active,
          sort_order,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      });
    }
  );
});

// Update slider item (admin only)
router.put('/:id', authenticateToken, requireAdmin, [
  body('title').notEmpty().withMessage('Title is required'),
  body('image').notEmpty().withMessage('Image URL is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, subtitle, description, image, image_alt, button_text, button_link, is_active = true, sort_order = 0 } = req.body;

  db.run(
    `UPDATE slider 
     SET title = ?, subtitle = ?, description = ?, image = ?, image_alt = ?, button_text = ?, button_link = ?, is_active = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP 
     WHERE id = ?`,
    [title, subtitle || '', description || '', image, image_alt || '', button_text || '', button_link || '', is_active ? 1 : 0, sort_order, id],
    function(err) {
      if (err) {
        console.error('Database error updating slider:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Slider item not found' });
      }

      res.json({
        message: 'Slider item updated successfully',
        slider: {
          id: parseInt(id),
          title,
          subtitle,
          description,
          image,
          image_alt,
          button_text,
          button_link,
          is_active,
          sort_order,
          updated_at: new Date().toISOString()
        }
      });
    }
  );
});

// Delete slider item (admin only)
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM slider WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Database error deleting slider:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Slider item not found' });
    }

    res.json({ message: 'Slider item deleted successfully' });
  });
});

// Reorder slider items (admin only)
router.put('/reorder', authenticateToken, requireAdmin, [
  body('sliders').isArray().withMessage('Sliders must be an array')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { sliders } = req.body;

  // Update sort orders
  const updatePromises = sliders.map((slider, index) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE slider SET sort_order = ? WHERE id = ?',
        [index + 1, slider.id],
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
      res.json({ message: 'Slider items reordered successfully' });
    })
    .catch((err) => {
      console.error('Database error reordering sliders:', err);
      res.status(500).json({ error: 'Database error', details: err.message });
    });
});

// Toggle slider active status (admin only)
router.put('/:id/toggle', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;

  db.get('SELECT is_active FROM slider WHERE id = ?', [id], (err, slider) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!slider) {
      return res.status(404).json({ error: 'Slider item not found' });
    }

    const newStatus = slider.is_active ? 0 : 1;

    db.run(
      'UPDATE slider SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [newStatus, id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        res.json({
          message: 'Slider status updated successfully',
          is_active: newStatus === 1
        });
      }
    );
  });
});

module.exports = router;