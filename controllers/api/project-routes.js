const router = require("express").Router();
const { response } = require("express");
const sequelize = require("../../config/connection");
const { Project, User } = require("../../models");
const Axios = require('axios');

// Check if user exists in database and display projects
router.get("/:username", (req, res) => {
  User.findOne({
    where: {
      username: req.params.username,
    },
    include: [{ model: Project }],
  })
    .then((data) => {
      if (!data) {
        Axios.get(`https://gh-pinned-repos.egoist.sh/?username=${req.params.username}`)
        .then(r => {
            res.send(r.data)
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;