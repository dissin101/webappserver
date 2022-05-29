const {Category} = require("../models/models");
const ApiError = require("../error/apiError");

class CategoryController {
    /**
     * Создание новой категории
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async create (req, res) {
        const {name, parentId} = req.body;
        const category = await Category.create({name, parentId});
        return res.json(category);
    }

    /**
     * Получение списка всех типов предметов
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getAll (req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }
}
module.exports = new CategoryController();