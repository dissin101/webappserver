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
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", fileName));
            const item = await Item.create({name, price, brandId, typeId, img: fileName});

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
        let {brandId, typeId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let devices;
        if (!brandId && !typeId){
            devices = await Item.findAndCountAll({limit, offset});
        }

        if (brandId && !typeId){
            devices = await Item.findAndCountAll({where: {brandId}, limit, offset});
        }

        if (!brandId && typeId){
            devices = await Item.findAndCountAll({where: {typeId}, limit, offset});
        }

        if (brandId && typeId){
            devices = await Item.findAndCountAll({where: {brandId, typeId}, limit, offset});
        }

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