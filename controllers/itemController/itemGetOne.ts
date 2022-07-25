import {NextFunction, Request, Response} from "express";
import {Item, ItemInfo} from "../../models/models";
import apiError from "../../error/apiError";

const itemGetOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;

        const item = await Item.findOne(
            {
                where: {id},
                include: [{model: ItemInfo, as: "info"}]
            }
        );

        if (item !== null){
            return res.json(item);
        } else {
            next(apiError.notFound(res))
        }
    } catch (error: any) {
        next(apiError.badRequest(res, error))
    }
}

export default itemGetOne;