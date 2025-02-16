const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define("User", {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    username: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.ENUM('USER', 'ADMIN'), defaultValue: 'USER'},
});

const Brand = sequelize.define("Brand", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
});

const Car = sequelize.define("Car", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    model: {type: DataTypes.STRING, allowNull: false},
    year: {type: DataTypes.INTEGER},
    available: {type: DataTypes.BOOLEAN, defaultValue: true},
    img: {type: DataTypes.STRING, allowNull: false},
});

const CarInfo = sequelize.define("CarInfo", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    attributeName: {type: DataTypes.STRING, allowNull: false},
    attributeValue: {type: DataTypes.STRING, allowNull: false},
});

const Rental = sequelize.define("Rental", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    startTime: {type: DataTypes.DATE, allowNull: false},
    endTime: {type: DataTypes.DATE, allowNull: false},
});

// User -> Car
User.hasMany(Car, {foreignKey: 'adminId', as: 'AddedCars'});
Car.belongsTo(User, {foreignKey: 'adminId', as: 'Admin'});

// Brand -> Car
Brand.hasMany(Car, {foreignKey: 'brandId', as: 'Cars'});
Car.belongsTo(Brand, {foreignKey: 'brandId', as: 'Brand'});

// Car -> CarInfo
Car.hasMany(CarInfo, {foreignKey: 'carId', as: 'Info'});
CarInfo.belongsTo(Car, {foreignKey: 'carId', as: 'Car'});

// User -> Rental
User.hasMany(Rental, {foreignKey: 'userId', as: 'Rentals'});
Rental.belongsTo(User, {foreignKey: 'userId', as: 'User'});

// Car -> Rental
Car.hasMany(Rental, {foreignKey: 'carId', as: 'Rentals'});
Rental.belongsTo(Car, {foreignKey: 'carId', as: 'Car'});

module.exports = {
    User,
    Brand,
    Car,
    CarInfo,
    Rental
};