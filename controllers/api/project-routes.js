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

router.post('/', (req, res) => {
  Project.create({
    owner: req.body.owner,
    repo: req.body.repo,
    link: req.body.link,
    language: req.body.language,
    languageColor: req.body.languageColor,
    stars: req.body.stars,
  })
  .then(dbProjectData => res.json(dbProjectData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

// FOR A GIVEN USERNAME, fetch the data from the API, Update db data.
router.post("/update", async (req, res) => {
  const axiosResponse = await Axios.get(
    // hardcoded username param
    `https://gh-pinned-repos.egoist.sh/?username=danielcnow`
  );
  const projects = axiosResponse.data;
console.log(await User.findAll())
  const statements = [];
// hardcoded username param
// destroys project upon post /update query
 Project.destroy({where:
  {owner: "danielcnow"} 
})
// for loop to create
  for (let i = 0; i < projects.length; i++) {
    projectdata = projects[i]
    statements.push(
    Project.create(
      {
        owner: projectdata.owner ?? "",
        link: projectdata.link ?? "http://www.google.com/",
        language: projectdata.language ?? "",
        languageColor: projectdata.languageColor ?? "",
        stars: projectdata.stars ?? 0,
        forks: projectdata.forks ?? 0,
        image: projectdata.image ?? "",
        repo: projectdata.repo ?? "",
        description: projectdata.description ?? "n/a",
      }

    ));
  }
  const result = await Promise.all(statements);
 const projState = Project.findAll();
console.log(projState);
  return res.send(200);
});
// end

module.exports = router;