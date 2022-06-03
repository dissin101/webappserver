const {Brand} = require("../models/models");
const ApiError = require("../error/apiError");
const uuid = require("uuid");
const path = require("path");

class BrandController {
    /**
     * Создание нового бренда
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async create (req, res, next) {
        try {
            const {name} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", fileName));
            const brand = await Brand.create({name, img: 'https://car-part.herokuapp.com/' + fileName});
            //const brand = await Brand.create({name, img: 'http://localhost:' + process.env.PORT + "/" + fileName});
            return res.json(brand);
        } catch (e){
            next(ApiError.badRequest(e.message));
        }
    }

    /**
     * Получение списка всех брендов
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getAll (req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }
}

module.exports = new BrandController();