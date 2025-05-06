const { checkAdminOrStaff } = require('./auth');

module.exports = (pool) => {
  const router = require('express').Router();

  router.get('/', checkAdminOrStaff, async (req, res) => {
    try {
      const { branch_id } = req.query;
      let query = `
        SELECT s.*, b.name as branch_name
        FROM hostel_students s
        LEFT JOIN hostel_branches b ON s.branch_id = b.id
      `;
      const params = [];
      if (branch_id) {
        query += ' WHERE s.branch_id = $1';
        params.push(parseInt(branch_id));
      }
      query += ' ORDER BY s.name';
      const result = await pool.query(query, params);
      console.log('GET /hostel/students - Fetched students:', result.rows);
      res.json({ students: result.rows });
    } catch (err) {
      console.error('Error in hostel students GET route:', err.stack);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  router.get('/:id', checkAdminOrStaff, async (req, res) => {
    try {
      const { id } = req.params;
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        console.error('Invalid student ID:', id);
        return res.status(400).json({ message: 'Invalid student ID' });
      }
      const result = await pool.query(
        `SELECT s.*, b.name as branch_name
         FROM hostel_students s
         LEFT JOIN hostel_branches b ON s.branch_id = b.id
         WHERE s.id = $1`,
        [parsedId]
      );
      if (result.rows.length === 0) {
        console.warn('Student not found for ID:', parsedId);
        return res.status(404).json({ message: 'Student not found' });
      }
      console.log('GET /hostel/students/:id - Fetched student:', result.rows[0]);
      res.json({ student: result.rows[0] });
    } catch (err) {
      console.error('Error in hostel students GET /:id route:', err.stack);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  router.post('/', checkAdminOrStaff, async (req, res) => {
    try {
      const {
        branch_id,
        name,
        address,
        father_name,
        mother_name,
        aadhar_number,
        phone_number,
        profile_image_url,
        aadhar_image_url,
        religion,
        food_preference,
        gender,
        fee,
      } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
      if (!branch_id) {
        return res.status(400).json({ message: 'Branch is required' });
      }

      const parsedBranchId = parseInt(branch_id);
      if (isNaN(parsedBranchId)) {
        console.error('Invalid branch ID:', branch_id);
        return res.status(400).json({ message: 'Invalid branch ID' });
      }

      const result = await pool.query(
        `INSERT INTO hostel_students (
          branch_id, name, address, father_name, mother_name, aadhar_number, phone_number, profile_image_url, aadhar_image_url, religion, food_preference, gender, fee
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
        [
          parsedBranchId,
          name,
          address || null,
          father_name || null,
          mother_name || null,
          aadhar_number || null,
          phone_number || null,
          profile_image_url || null,
          aadhar_image_url || null,
          religion || null,
          food_preference || null,
          gender || null,
          fee || 0.0,
        ]
      );
      console.log('POST /hostel/students - Created student:', result.rows[0]);
      res.status(201).json({ student: result.rows[0] });
    } catch (err) {
      console.error('Error in hostel students POST route:', err.stack);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  router.put('/:id', checkAdminOrStaff, async (req, res) => {
    try {
      const { id } = req.params;
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        console.error('Invalid student ID:', id);
        return res.status(400).json({ message: 'Invalid student ID' });
      }

      const {
        branch_id,
        name,
        address,
        father_name,
        mother_name,
        aadhar_number,
        phone_number,
        profile_image_url,
        aadhar_image_url,
        religion,
        food_preference,
        gender,
        fee,
      } = req.body;

      const parsedBranchId = branch_id ? parseInt(branch_id) : undefined;
      if (branch_id && isNaN(parsedBranchId)) {
        console.error('Invalid branch ID:', branch_id);
        return res.status(400).json({ message: 'Invalid branch ID' });
      }

      const result = await pool.query(
        `UPDATE hostel_students SET
          branch_id = COALESCE($1, branch_id),
          name = COALESCE($2, name),
          address = COALESCE($3, address),
          father_name = COALESCE($4, father_name),
          mother_name = COALESCE($5, mother_name),
          aadhar_number = COALESCE($6, aadhar_number),
          phone_number = COALESCE($7, phone_number),
          profile_image_url = COALESCE($8, profile_image_url),
          aadhar_image_url = COALESCE($9, aadhar_image_url),
          religion = COALESCE($10, religion),
          food_preference = COALESCE($11, food_preference),
          gender = COALESCE($12, gender),
          fee = COALESCE($13, fee),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $14 RETURNING *`,
        [
          parsedBranchId,
          name,
          address,
          father_name,
          mother_name,
          aadhar_number,
          phone_number,
          profile_image_url,
          aadhar_image_url,
          religion,
          food_preference,
          gender,
          fee,
          parsedId,
        ]
      );
      if (result.rows.length === 0) {
        console.warn('Student not found for update, ID:', parsedId);
        return res.status(404).json({ message: 'Student not found' });
      }
      console.log('PUT /hostel/students/:id - Updated student:', result.rows[0]);
      res.json({ student: result.rows[0] });
    } catch (err) {
      console.error('Error in hostel students PUT route:', err.stack);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  router.delete('/:id', checkAdminOrStaff, async (req, res) => {
    try {
      const { id } = req.params;
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        console.error('Invalid student ID:', id);
        return res.status(400).json({ message: 'Invalid student ID' });
      }

      const result = await pool.query('DELETE FROM hostel_students WHERE id = $1 RETURNING *', [parsedId]);
      if (result.rows.length === 0) {
        console.warn('Student not found for deletion, ID:', parsedId);
        return res.status(404).json({ message: 'Student not found' });
      }
      console.log('DELETE /hostel/students/:id - Deleted student:', result.rows[0]);
      res.json({ message: 'Student deleted successfully' });
    } catch (err) {
      console.error('Error in hostel students DELETE route:', err.stack);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  return router;
};