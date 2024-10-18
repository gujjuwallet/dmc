const jwt = require('jsonwebtoken');

// Middleware for role-based access control
// Middleware for role-based access control
const authMiddleware = (roles = []) => (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded token's role matches any of the allowed roles
    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
    }

    // Attach the decoded token info (like user id and role) to the request
    req.user = decoded;

    // Continue to the next middleware or controller
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = authMiddleware;