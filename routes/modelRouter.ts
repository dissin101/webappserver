import {Router} from "express";
import modelCreate from "../controllers/modelController/modelCreate";
import modelGetAll from "../controllers/modelController/modelGetAll";

const checkRole = require("../middleware/checkRoleMiddleware");

const router = Router();

router.post("/", checkRole('ADMIN'), modelCreate);
router.get("/", modelGetAll);
router.get("/:brandId", modelGetAll);

export default router;