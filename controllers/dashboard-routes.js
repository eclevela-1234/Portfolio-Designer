const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User } = require('../models');
const Axios = require('axios');
const withAuth = require('../utils/auth');

// router.get("/", withAuth, (req, res) => {
//   console.log(req.session)
//   res.render("dashboard", { loggedIn: true });
// });

router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  Project.findAll({
      where: {
          user_id: req.session.user_id
      },
    // //Query configuration
    // attributes: [
    //   "id",
    //   "post_url",
    //   "title",
    //   "created_at",
    //   [
    //     sequelize.literal(
    //       "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
    //     ),
    //     "vote_count",
    //   ],
    // ],
    // order: [["created_at", "DESC"]],
    // include: [
    //   {
    //     model: Comment,
    //     attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
    //     include: {
    //       model: User,
    //       attributes: ["username"],
    //     },
    //   },
    //   {
    //     model: User,
    //     attributes: ["username"],
    //   },
    // ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render('dashboard');
      // res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;