const router = require("express").Router();
const teamsController = require("../../controllers/teamControllers");

// Matches with "/api/books"
router.route("/").get(teamsController.findAll).post(teamsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(teamsController.findById)
  .put(teamsController.update)
  .delete(teamsController.remove);

module.exports = router;
