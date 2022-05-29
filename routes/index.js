const Router = require("express");
const router = new Router();
const itemRouter = require("./itemRouter");
const brandRouter = require("./brandRouter");
const modelRouter = require("./modelRouter");
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