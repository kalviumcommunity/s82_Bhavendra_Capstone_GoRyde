const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id }, 
    process.env.JWT_SECRET, 
    { expiresIn: "7d" }
  );

  res.status(statusCode).json({
    success: true,
    message: "Login successful",
    token, 
    user: {
      id: user._id,
      Fullname: user.Fullname,
      Email: user.Email,
    }
  });
};

module.exports = sendToken;
