const {Type} = require("../models/models");
const ApiError = require("../error/apiError");

class TypeController {
    /**
     * Создание нового типа предмета
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async create (req, res) {
        const {name} = req.body;
        const type = await Type.create({name});
        return res.json(type);
    }

    /**
     * Получение списка всех типов предметов
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getAll (req, res) {
        const types = await Type.findAll();
        return res.json(types);
    }
}
module.exports = new TypeController();