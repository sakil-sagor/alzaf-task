const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
  const payload = {
    name: userInfo?.name,
    email: userInfo?.email,
    role: userInfo?.role,
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "30days",
  });
  return token;
};
