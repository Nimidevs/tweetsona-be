

exports.protectRoute = async (req, res, next) => {
  const token = req.cookies.x_token;
  const user_id = req.cookies.user_id
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorised" });
  }
  req.x_token = token;
  req.user_id = user_id
  next();
};
