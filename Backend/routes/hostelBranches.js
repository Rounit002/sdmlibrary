const { checkAdminOrStaff } = require('./auth');

module.exports = (pool) => {
  const router = require('express').Router();

  router.get('/', checkAdminOrStaff, async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT b.id, b.name, COUNT(s.id) as student_count
        FROM hostel_branches b
        LEFT JOIN hostel_students s ON b.id = s.branch_id
        GROUP BY b.id
      `);
      console.log('GET /hostel/branches - Fetched branches:', result.rows);
      res.json({ branches: result.rows });
    } catch (err) {
      console.error('Error in hostel branches GET route:', err.stack);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  router.post('/', checkAdminOrStaff, async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'Branch name is required' });
      }
      const result = await pool.query(
        'INSERT INTO hostel_branches (name) VALUES ($1) RETURNING *',
        [name]
      );
      console.log('POST /hostel/branches - Created branch:', result.rows[0]);
      res.status(201).json({ branch: result.rows[0] });
    } catch (err) {
      console.error('Error in hostel branches POST route:', err.stack);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  return router;
};