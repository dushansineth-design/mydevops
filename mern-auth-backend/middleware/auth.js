const jwt = require('jsonwebtoken');


function verifyUser(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
}


function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token in verifyAdmin:", decoded); 
    if (decoded.role !== "admin") {
      console.warn("Access denied: role is", decoded.role);
      return res.status(403).json({ msg: "Forbidden: Admins only" });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(403).json({ msg: "Forbidden" });
  }
}


module.exports = {
  verifyUser,
  verifyAdmin
};