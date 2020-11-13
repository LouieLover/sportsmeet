const router = require("express").Router();
const teamRoutes = require("./teams");

// Team routes
router.use("/teams", teamRoutes);

module.exports = router;
