const uuid = require("uuid");
const path = require("path");
const {Item, ItemInfo} = require("../models/models");
const ApiError = require("../error/apiError");

class ItemController {
    /**
     * Создание нового предмета
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    async create (req, res, next) {
        try {
            let {name, price, typeId, brandId, modelId, categoryId, info} = req.body;

            console.log(req.body)

            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            // for Heroku
            img.mv(path.join(__dirname, "..", "public", fileName));
            //img.mv(path.resolve(__dirname, "..", "static", fileName));
            const item = await Item.create({name, price, typeId, brandId, modelId, categoryId, img: fileName});

            if (info){
                info = JSON.parse(info);

                info.forEach(i =>
                    ItemInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: item.id
                    })
                );
            }

            return res.json(item);
        } catch (e){
            next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Получение списка всех предметов
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getAll (req, res) {
        let {limit, page} = req.query;
        const params = req.body;

        page = page || 1;
        limit = limit || 9;
        const offset = page * limit - limit;

        const devices = await Item.findAndCountAll({where: params, limit, offset});

        return res.json(devices);
    }

    /**
     * Получение предмета по id
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getOne (req, res) {
        const {id} = req.params;
        const item = await  Item.findOne(
            {
                where: {id},
                include: [{model: ItemInfo, as: "info"}]
            }
        );

        return res.json(item);
    }
}

module.exports = new ItemController();