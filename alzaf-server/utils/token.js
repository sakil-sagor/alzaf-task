const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
  const payload = {
    email: userInfo.email,
    role: userInfo.role,
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "30days",
  });
  return token;
};

// MONGO_USER=tendertradinginc9
// MONGO_PASS=qR8z478vExp4xIVA
// PORT=5000

// TOKEN_SECRET=ec7358b8dae1636356ca084d7e6f8614f1f892761d484e1997793617255cc9a0c10925350cc6598a0f109e62c679dc743ba4f5af1ba3106fd9816107f51ce9c1

// JWT_SECRET=ec7358b8dae1636356ca084d7e6f8614f1f892761d484e1997793617255cc9a0c10925350cc6598a0f109e62c679dc743ba4f5af1ba3106fd9816107f51ce9c1
// JWT_EXPIRE=30d
// EMAIL_HOST=mail.tendertradinginc.com
// EMAIL_PORT=465
// EMAIL_USER=verify@tendertradinginc.com
// EMAIL_PASS=Tradinginc@12
