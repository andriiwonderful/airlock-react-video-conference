const express = require("express");
const router = express.Router();
const login = require("../controllers/login");
const auth = require("../middleware/auth");
const roomControl = require("../controllers/roomControl");
const models = require("../models");

//testing route
router.get("/test", async function (req, res, nex) {
  const users = await models.User.findAll({
    attributes: ["roomname", "username", "accesscode"],
  });
  res.send(JSON.stringify(users));
});

router.post("/login", login);
router.post("/create_room", auth, roomControl.createRoom);
module.exports = router;
