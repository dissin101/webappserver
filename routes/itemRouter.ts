import {Router} from "express";
import itemCreate from "../controllers/itemController/itemCreate";
import itemGetOne from "../controllers/itemController/itemGetOne";
import itemGetAll from "../controllers/itemController/itemGetAll";

const checkRole = require("../middleware/checkRoleMiddleware");

const router = Router();

router.post("/add", checkRole('ADMIN'), itemCreate);
router.post("/", itemGetAll);
router.get("/:id", itemGetOne);

export default router;