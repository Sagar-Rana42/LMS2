import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "User not logged in",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    req.id = decoded?.userId;
    next();
    
  } catch (error) {
    console.error("Error in isAuthenticated middleware: ", error.message);
    return res.status(401).json({
      success: false,
      msg: "Authentication failed",
    });
  }
};

export default isAuthenticated;
