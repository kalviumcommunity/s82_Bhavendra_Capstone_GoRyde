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
    token, // ✅ This is what you want in Postman
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    }
  });
};

module.exports = sendToken;
