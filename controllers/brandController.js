const {Brand, Type} = require("../models/models");
const ApiError = require("../error/apiError");

class BrandController {
    /**
     * Создание нового бренда
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async create (req, res) {
        const {name} = req.body;
        const brand = await Brand.create({name});
        return res.json(brand);
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