const router = require("express").Router();

router.get("/user", (req, res) => {
  res.send("Hello");
});

module.exports = router;
