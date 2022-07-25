import {NextFunction, Request, Response} from "express";
import {Model} from "../../models/models";
import apiError from "../../error/apiError";

/**
 * Получение списка моделей
 * @param req
 * @param res
 * @param next
 */
const modelGetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {brandId} = req.params;
        let models = await Model.findAll();

        if (brandId){
            models = await Model.findAll({where: {brandId}});
        }

        return res.json(models);
    } catch (error: any){
        next(apiError.badRequest(res, error))
    }
}

export default modelGetAll;