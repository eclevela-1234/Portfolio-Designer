const router = require("express").Router();
const sequelize = require("../config/connection");
const { Project, User } = require("../models");

// get all posts for homepage
router.get("/", (req, res) => {
  console.log("======================");
  User.findAll({
    attributes: [
      "username",
      "email",]
    //   { exclude: ['password'] }],
    // include: [{ model: Project }],
  })
    .then((dbUserData) => {
      const users = dbUserData.map((user) => user.get({ plain: true }));

      res.render("homepage", {
        users,
        // loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:username", (req, res) => {
  User.findOne({
    where: {
      username: req.params.username,
    },
    include: [{ model: Project }],
  })
    .then((data) => {
      if (!data) {
        res.redirect("/login");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
