const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User } = require('../models');
const Axios = require('axios');
const withAuth = require('../utils/auth');


router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  User.findAll({
      where: {
          username: req.session.username
      },
  })
    .then((dbProjectData) => {
      const userInfo = dbProjectData.map((post) => post.get({ plain: true }));
      // res.send(userInfo);
      res.render('dashboard', { userInfo, loggedIn: req.session.loggedIn });
      // res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;