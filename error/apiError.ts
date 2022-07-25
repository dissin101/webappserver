import {Response} from "express";

/*class ApiError extends Error{
    constructor(status: any, message: any) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message){
        return new ApiError(404, message);
    }

    static internal(message){
        return new ApiError(500, message);
    }

    static forbidden(message){
        return new ApiError(403, message);
    }
}

module.exports = ApiError*/

const apiError = {
    badRequest: (res: Response, error: any) => {
        return res.status(400).json({
            message: error.message
        })
    },
    notFound: (res: Response) => {
        return res.status(404).json({
            message: "Страница не найдена"
        })
    },
    internal: () => {

    },
    forbidden: () => {

    }
}

export default apiError