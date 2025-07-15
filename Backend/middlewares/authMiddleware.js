import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {

  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log("after remove bearer",jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log("after verification",isVerified);

    const userData = await User.findOne({email: isVerified.email}).select({password: 0});
    console.log(userData);

    req.user = userData;
    req.token = token;
    req.userID = userData._id; 
    next();
  } catch (error) {
    return res.status(401).json({msg: "unauthorized, Invalid token."});
  }
};

export default protect;

// const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, JWT_SECRET);

//     // Get user from DB, exclude password
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     req.user = user;
//     next(); // continue to route
//   } catch (err) {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// export default protect;
