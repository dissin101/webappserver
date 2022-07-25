import {NextFunction, Request, Response} from "express";
import {Model} from "../../models/models";
import apiError from "../../error/apiError";

/**
 * Создание модели товара
 * @param req
 * @param res
 * @param next
 */
const modelCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, brandId} = req.body;

        const model = await Model.create({name, brandId});
        return res.json(model);
    } catch (error){
        next(apiError.badRequest(res, error))
    }
}

export default modelCreate;