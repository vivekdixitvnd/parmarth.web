import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(401).json({ error: "Not Authenticated" });
    }
    const token = req.get("Authorization").split(" ")[1];
    let decodedToken;
    
    decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (!decodedToken) {
      return res.status(401).json({ error: "Not Authenticated" });
    }
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
