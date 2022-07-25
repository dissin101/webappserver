import {NextFunction, Response} from "express";
import {IRequest} from "../../interfaces/IRequest";
import { v4 as uuid } from 'uuid';
import path from "path";
import {Item, ItemInfo} from "../../models/models";
import apiError from "../../error/apiError";

/**
 * Создание нового товара
 * @param req
 * @param res
 * @param next
 * @constructor
 */
const itemCreate = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const params = req.body;

        const {img} = req.files;

        let fileName = uuid() + ".jpg";

        img.mv(path.join(__dirname, "../..", "public", fileName));

        const item = await Item.create({...params, img: fileName});

        if (params.info){
            params.info = JSON.parse(params.info);

            params.info.forEach((title: string) =>
                ItemInfo.create({
                    title,
                    description: item.description,
                    deviceId: item.id
                })
            );
        }

        return res.json(item);
    } catch (error: any) {
        next(apiError.badRequest(res, error))
    }
}

export default itemCreate;