const router = require("express").Router();
const sequelize = require("../config/connection");
const { Project, User } = require("../models");

// get all posts for homepage
router.get("/", (req, res) => {
  console.log("======================");
  User.findAll({
    attributes: ["username", "email", "name", "social"],
    //   { exclude: ['password'] }],
    // include: [{ model: Project }],
  })
    .then((dbUserData) => {
      const users = dbUserData.map((user) => user.get({ plain: true }));

      res.render("homepage", {
        users,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/:username", (req, res) => {
  Project.findAll({
    where: {
      owner: req.params.username,
    },
    include: [{ model: User,
    attributes: ["name", "bio", "social"] }],
  })
    .then((data) => {
      if (!data.length) {
        res.redirect("/login");
      }

      const projects = data.map((project) => project.get({ plain: true }));
        // res.send(projects);
      res.render("portfolio", { projects, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
