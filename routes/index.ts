import {Router} from 'express';
import itemRouter from "./itemRouter";
import modelRouter from "./modelRouter";
const router = Router();
const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/model', modelRouter)
router.use('/category', categoryRouter);
router.use('/item', itemRouter);

module.exports = router;