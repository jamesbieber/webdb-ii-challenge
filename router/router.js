const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true
};

const db = knex(knexConfig);

router.get("/", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .first()
    .then(Zoo => {
      if (Zoo) {
        res.status(200).json(Zoo);
      } else {
        res.status(404).json({ message: "Zoo not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  try {
    db("zoos")
      .insert(req.body, "id")
      .then(results => {
        return db("zoos")
          .where({ id: results[0] })
          .first()
          .then(zoo => {
            if (zoo) {
              res.status(200).json(zoo);
            } else {
              res.status(404).json({ message: "Zoo not found" });
            }
          });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} zoo updated` });
      } else {
        res.status(404).json({ message: "Zoo does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} zoo updated` });
      } else {
        res.status(404).json({ message: "Zoo does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
