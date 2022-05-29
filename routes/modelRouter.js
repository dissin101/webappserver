const Router = require("express");
const router = new Router();
const modelController = require("../controllers/modelController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole('ADMIN'), modelController.create);
router.get("/", modelController.getAll);
router.get("/:brandId", modelController.getAll);

module.exports = router;