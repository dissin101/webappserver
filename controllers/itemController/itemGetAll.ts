import {NextFunction, Request, Response} from "express";
import {Item} from "../../models/models";
import apiError from "../../error/apiError";

const itemGetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {limit, page} = req.query;
        const params = req.body;

        const currentPage = Number(page) || 1;
        const currentLimit = Number(limit) || 9;
        const offset = currentPage * currentLimit - currentLimit;

        const devices = await Item.findAndCountAll({where: params, limit, offset});

        return res.json(devices);
    } catch (error: any){
        next(apiError.badRequest(res, error))
    }
}

export default itemGetAll;