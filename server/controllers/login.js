const jwt = require("jsonwebtoken");
const models = require("../models");

const login = async (req, res, next) => {
  try {
    const { passcode } = req.body;
    const { User, Room } = models;
    const user = await User.findOne({
      where: { accesscode: passcode },
      attributes: ["roomname", "username", "accesscode"],
    });

    if (user) {
      const userdata = {
        username: user.username,
        accesscode: user.accesscode,
      };
      const token = jwt.sign(userdata, process.env.AUTH_TOKEN_SECRET, {
        expiresIn: "24h",
      });

      res.send(token);
    } else {
      res.status(404).json({
        error: "User new found",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: new Error("Invalid request"),
    });
  }
};

module.exports = login;
