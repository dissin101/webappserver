const sequelize = require("../db");
const {DataTypes} = require("sequelize");

/**
 * Пользователь
 * @type {ModelCtor<Model>}
 */
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

/**
 * Корзина
 * @type {ModelCtor<Model>}
 */
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

/**
 * Предмет в корзине
 * @type {ModelCtor<Model>}
 */
const BasketItem = sequelize.define('basket_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

/**
 * Предмет
 * @type {ModelCtor<Model>}
 */
const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
});

/**
 * Категория предмета
 * @type {ModelCtor<Model>}
 */
const Category = sequelize.define('category', {
    /*id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},*/
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    parentId: {type: DataTypes.INTEGER, allowNull: true, defaultValue: null},
    name: {type: DataTypes.STRING, unique: true},
})

/**
 * Тип предмета
 * @type {ModelCtor<Model>}
 */
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

/**
 * Бренд автомобиля
 * @type {ModelCtor<Model>}
 */
const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
});

/**
 * Модель автомобиля
 * @type {ModelCtor<Model>}
 */
const Model = sequelize.define('model', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

/**
 * Рейтинг предмета
 * @type {ModelCtor<Model>}
 */
const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
});

/**
 * Параметры товара
 * @type {ModelCtor<Model>}
 */
const ItemInfo = sequelize.define('item_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
});

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});


User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketItem);
BasketItem.belongsTo(Basket);

Category.hasMany(Item);
Item.belongsTo(Category);

Type.hasMany(Item);
Item.belongsTo(Type);

Brand.hasMany(Item);
Item.belongsTo(Brand);

Brand.hasMany(Model);
Item.belongsTo(Model);

Item.hasMany(Rating);
Rating.belongsTo(Item);

Item.hasMany(BasketItem);
BasketItem.belongsTo(Item);

Item.hasMany(ItemInfo, {as: 'info'});
ItemInfo.belongsTo(Item);

Type.belongsToMany(Brand, {through: TypeBrand });
Brand.belongsToMany(Type, {through: TypeBrand });

module.exports = {
    User,
    Basket,
    BasketItem,
    Category,
    Item,
    Type,
    Brand,
    Rating,
    TypeBrand,
    ItemInfo,
    Model
};