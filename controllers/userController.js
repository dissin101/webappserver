const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const {User, Basket} = require("../models/models");
const jwt = require("jsonwebtoken");

/**
 * Генерация JWT-тонека
 * @param id пользователя
 * @param email пользователя
 * @param role пользователя
 * @returns {*}
 */
const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    );
}

class UserController {
    /**
     * Регистрация нового пользователя
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    async registration (req, res, next) {
        const {email, password, role} = req.body;

        if (!email || !password){
            return next(ApiError.badRequest({message: "Некорректный email или пароль"}));
        }

        const candidate = await User.findOne({where: {email}});

        if (candidate){
            return next(ApiError.badRequest({message: "Пользователь с таким email уже существует"}));
        }

        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({email, role, password: hashPassword});

        const basket = await Basket.create({userId: user.id});

        const token = generateJwt(user.id, user.email, user.role);

        return res.json(token);
    }

    /**
     * Авторизация пользователя
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    async login (req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});

        if (!user){
            return next(ApiError.badRequest({message: "Пользователь не найден"}));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword){
            return next(ApiError.badRequest({message: "Указан неверный пароль"}));
        }

        const token = generateJwt(user.id, user.email, user.role);

        return res.json({token});
    }

    /**
     * Генерация нового токена пользователя
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async check (req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);

        return res.json({token});
    }
}

module.exports = new UserController();