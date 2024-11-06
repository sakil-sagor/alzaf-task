const cron = require("node-cron");
const User = require("../models/User");

const setupScheduler = () => {
  // in every 5 min
  cron.schedule("*/5 * * * *", async () => {
    const now = Date.now();
    try {
      const result = await User.deleteMany({
        isVerified: false,
        verificationTokenExpire: { $lt: now },
      });
    } catch (error) {
      console.error("Error removing unverified users:", error);
    }
  });
};

module.exports = setupScheduler;
