// backend/middleware/auth.js

function isAdmin(req, res, next) {
  // Ensure session exists
  if (!req.session || !req.session.user) {
    return res.status(401).json({ msg: 'Not authenticated' });
  }

  // Check if user has admin role
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admins only.' });
  }

  next(); // ✅ Pass control
}

module.exports = { isAdmin };
