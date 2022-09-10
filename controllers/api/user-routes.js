const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { User, Project } = require("../../models");

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        //   req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// login route
router.post("/login", (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  User.findOne({
    individualHooks: true,
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }
    // res.json({user: dbUserData});

    //Verify user
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect Password!" });
      return;
    }

    req.session.save(() => {
      // req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.json({
        user: dbUserData,
        message: "You are now logged in!",
        sessioninfo: req.session,
      });
    });
  });
});

router.post("/logout", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/update", withAuth, (req, res) => {
  console.log("Session Username: ", req.session.username)
  User.update(

   
    { bio: req.body.bio },
    {
      where: {
        username: req.session.username,
      },
    }
  )
    .then((dbPostData) => {
      console.log("BioInfo:", dbPostData)
      if (!dbPostData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
    
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
