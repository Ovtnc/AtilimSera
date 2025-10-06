const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../database/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const nodemailer = require('nodemailer');

const router = express.Router();

// Email configuration
const createTransporter = () => {
  // Gmail SMTP configuration
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

// Send contact message
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, subject, message } = req.body;

  try {
    // Save message to database
    const result = db.run(
      `INSERT INTO contact_messages (name, email, phone, subject, message) 
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone || '', subject || '', message],
      function(err) {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Failed to save message' });
        }

        const messageId = this.lastID;

        // Send email notification (disabled for now)
        console.log('New message received:', { messageId, name, email, subject });
        
        // TODO: Enable email sending later
        // const transporter = createTransporter();
        // ... email code ...

        res.json({ 
          message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
          messageId 
        });
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Mesaj gönderilirken bir hata oluştu' });
  }
});

// Get all messages (admin only)
router.get('/', authenticateToken, requireAdmin, (req, res) => {
  const { status, page = 1, limit = 3 } = req.query;
  
  let query = 'SELECT * FROM contact_messages';
  let params = [];
  
  if (status && status !== 'all') {
    query += ' WHERE status = ?';
    params.push(status);
  }
  
  query += ' ORDER BY created_at DESC';
  
  // Add pagination
  const offset = (page - 1) * limit;
  query += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);
  
  db.all(query, params, (err, messages) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM contact_messages';
    let countParams = [];
    
    if (status && status !== 'all') {
      countQuery += ' WHERE status = ?';
      countParams.push(status);
    }
    
    db.get(countQuery, countParams, (err, countResult) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.json({
        messages,
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

// Update message status (admin only)
router.put('/:id/status', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['new', 'read', 'replied', 'archived'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  db.run(
    'UPDATE contact_messages SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Message not found' });
      }
      
      res.json({ message: 'Message status updated successfully' });
    }
  );
});

// Delete message (admin only)
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM contact_messages WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json({ message: 'Message deleted successfully' });
  });
});

// Get message statistics (admin only)
router.get('/stats', authenticateToken, requireAdmin, (req, res) => {
  const queries = [
    { key: 'total', query: 'SELECT COUNT(*) as count FROM contact_messages' },
    { key: 'new', query: 'SELECT COUNT(*) as count FROM contact_messages WHERE status = "new"' },
    { key: 'read', query: 'SELECT COUNT(*) as count FROM contact_messages WHERE status = "read"' },
    { key: 'replied', query: 'SELECT COUNT(*) as count FROM contact_messages WHERE status = "replied"' },
    { key: 'today', query: 'SELECT COUNT(*) as count FROM contact_messages WHERE DATE(created_at) = DATE("now")' }
  ];

  const getStats = () => {
    return new Promise((resolve, reject) => {
      let completed = 0;
      const results = {};

      queries.forEach(({ key, query }) => {
        db.get(query, (err, row) => {
          if (err) {
            reject(err);
            return;
          }

          results[key] = row.count;
          completed++;

          if (completed === queries.length) {
            resolve(results);
          }
        });
      });
    });
  };

  getStats()
    .then(stats => {
      res.json(stats);
    })
    .catch(err => {
      res.status(500).json({ error: 'Database error' });
    });
});

module.exports = router;
