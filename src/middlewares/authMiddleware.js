const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let token = null
  if (req.header('Authorization')){
    token = req.header('Authorization').replace('Bearer ', '');
  }
  
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
