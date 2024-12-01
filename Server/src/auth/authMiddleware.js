
const { verifyToken } = require('./jwtUtils');

const authenticate = (req, res, next) => {
  const token = req.cookies.jwt; // Read JWT from cookies

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const user = verifyToken(token);
    req.user = user; // Attach user information to the request object
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

module.exports = { authenticate };
