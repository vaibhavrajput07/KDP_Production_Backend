// backend/middleware/auth.js
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ msg: 'admin not logged In' });
}

module.exports = { isAdmin };
