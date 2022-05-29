const Router = require("express");
const router = new Router();
const itemController = require("../controllers/itemController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/add", checkRole('ADMIN'), itemController.create);
router.post("/", itemController.getAll);
router.get("/:id", itemController.getOne);

module.exports = router;