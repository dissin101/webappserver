const {Model} = require("../models/models");
const ApiError = require("../error/apiError");

class ModelController {
    /**
     * Создание нового бренда
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async create (req, res, next) {
        try {
            const {name, brandId} = req.body;
            const model = await Model.create({name, brandId});
            return res.json(model);
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
        const {brandId} = req.params;
        let models = await Model.findAll();

        console.log(req.params)

        if (brandId){
            console.log(brandId)
            models = await Model.findAll({where: {brandId}});
        }

        return res.json(models);
    }
}

module.exports = new ModelController();