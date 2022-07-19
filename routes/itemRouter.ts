import {Router} from "express";
import itemCreate from "../controllers/itemController/itemCreate";
/*todo Edit import*/
const itemController = require("../controllers/itemController");
const checkRole = require("../middleware/checkRoleMiddleware");

const router = Router();

router.post("/add", checkRole('ADMIN'), itemCreate);
router.post("/", itemController.getAll);
router.get("/:id", itemController.getOne);

export default router;