const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('USER', 'ADMIN'), allowNull: false, defaultValue: 'USER' },
});

const RefreshToken = sequelize.define("RefreshToken", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: { type: DataTypes.STRING, allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
});

const Brand = sequelize.define("Brand", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Car = sequelize.define("Car", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    model: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    available: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    img: { type: DataTypes.STRING, allowNull: false },
    rentalType: {
        type: DataTypes.ENUM('DAILY', 'HOURLY', 'BOTH'),
        allowNull: false,
        defaultValue: 'DAILY',
    },
});

const CarInfo = sequelize.define("CarInfo", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    attributeName: { type: DataTypes.STRING, allowNull: false },
    attributeValue: { type: DataTypes.STRING, allowNull: false },
});

const Booking = sequelize.define("Booking", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'), allowNull: false, defaultValue: 'PENDING' },
});

const Post = sequelize.define("Post", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    excerpt: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    publishedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
});

const Conversation = sequelize.define('Conversation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    subject: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.ENUM('ACTIVE', 'CLOSED'), allowNull: false, defaultValue: 'ACTIVE' },
})

const Message = sequelize.define("Message", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    conversationId: { type: DataTypes.INTEGER, allowNull: false },
    senderId: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
})

const Ride = sequelize.define('Ride', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    fromLocation: { type: DataTypes.STRING, allowNull: false },
    toLocation: { type: DataTypes.STRING, allowNull: false },
    startTime: { type: DataTypes.DATE, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.ENUM('PENDING', 'APPROVED', 'CANCELLED', 'COMPLETED'), allowNull: false, defaultValue: 'PENDING' },
    seatsAvailable: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 4 },
});

const RideParticipant = sequelize.define('RideParticipant', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rideId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    joinedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

// Ассоциации
// RefreshToken -> User (N:1)
User.hasMany(RefreshToken, { foreignKey: 'userId', as: 'refreshTokens' });
RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Бренд -> Автомобиль (1:N)
Brand.hasMany(Car, { foreignKey: 'brandId', as: 'cars' });
Car.belongsTo(Brand, { foreignKey: 'brandId', as: 'brand' });

// Автомобиль -> CarInfo (1:N)
Car.hasMany(CarInfo, { foreignKey: 'carId', as: 'info' });
CarInfo.belongsTo(Car, { foreignKey: 'carId', as: 'car' });

// Пользователь -> Бронирования (1:N)
User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Автомобиль -> Бронирования (1:N)
Car.hasMany(Booking, { foreignKey: 'carId', as: 'bookings' });
Booking.belongsTo(Car, { foreignKey: 'carId', as: 'car' });

// Пользователь -> Посты (1:N)
User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Conversation.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Conversation, { foreignKey: 'userId', as: 'conversations' });

Message.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'conversation' });
Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'messages' });

Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });

User.hasMany(Ride, { foreignKey: 'userId', as: 'rides' });
Ride.belongsTo(User, { foreignKey: 'userId', as: 'creator' });

Ride.hasMany(RideParticipant, { foreignKey: 'rideId', as: 'participants' });
RideParticipant.belongsTo(Ride, { foreignKey: 'rideId', as: 'ride' });

User.hasMany(RideParticipant, { foreignKey: 'userId', as: 'rideBookings' });
RideParticipant.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
    User,
    RefreshToken,
    Brand,
    Car,
    CarInfo,
    Booking,
    Post,
    Ride,
    RideParticipant,
    Conversation,
    Message,
};
