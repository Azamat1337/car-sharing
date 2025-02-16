const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {user} = require("pg/lib/native");

const generateJWT = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '12h'});
}

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return res.status(400).json({message: 'You should have email or password!'})
        }

        const findEmail = await User.findOne({where: {email}});
        if (findEmail) {
            return res.status(400).json({message: 'Email already exists!'});
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password: hashedPassword, role});
        const token = generateJWT(user.id, user.email, user.role);

        return res.json({token});
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(400).json({message: 'User not found!'})
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(401).json({message: 'Invalid password!'})
        }

        const token = generateJWT(user.id, user.email, user.role);
        return res.json({token});
    }

    async check(req, res) {
        const token = generateJWT(user.id, user.email, user.role);
        return res.json({token});
    }
}

module.exports = new UserController();