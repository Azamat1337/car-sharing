const {User, RefreshToken} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

function generateTokens(user) {
    const payload = { id: user.id, email: user.email, role: user.role };

    const accessToken  = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    return { accessToken, refreshToken };
}

class UserController {
    // POST /api/auth/register
    async register(req, res, next) {
        try {
            const { username, email, password, role } = req.body;
            if (!username || !email || !password) {
                throw ApiError.badRequest('Username, email and password are required');
            }

            const existing = await User.findOne({ where: { email } });
            if (existing) {
                throw ApiError.badRequest('Email already in use');
            }

            const hashed = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashed, role });

            const { accessToken, refreshToken } = generateTokens(user);


            await RefreshToken.create({
                token:     refreshToken,
                userId:    user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000)
            });

            res.status(201).json({ accessToken, refreshToken });
        } catch (err) {
            next(err);
        }
    }

    // POST /api/auth/login
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw ApiError.badRequest('Email and password are required');
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw ApiError.unauthorized('Invalid credentials');
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw ApiError.unauthorized('Invalid credentials');
            }

            const { accessToken, refreshToken } = generateTokens(user);
            await RefreshToken.create({
                token:     refreshToken,
                userId:    user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000)
            });

            res.json({ accessToken, refreshToken });
        } catch (err) {
            next(err);
        }
    }

    // POST /api/auth/refresh
    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                throw ApiError.badRequest('Refresh token is required');
            }

            const stored = await RefreshToken.findOne({ where: { token: refreshToken } });
            if (!stored) {
                throw ApiError.unauthorized('Invalid refresh token');
            }

            if (new Date() > stored.expiresAt) {
                await stored.destroy();
                throw ApiError.unauthorized('Refresh token expired');
            }

            let payload;
            try {
                payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            } catch {
                await stored.destroy();
                throw ApiError.unauthorized('Invalid refresh token');
            }

            const user = await User.findByPk(payload.id);
            const { accessToken: newAccess, refreshToken: newRefresh } = generateTokens(user);

            await stored.destroy();
            await RefreshToken.create({
                token:     newRefresh,
                userId:    user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000)
            });

            res.json({ accessToken: newAccess, refreshToken: newRefresh });
        } catch (err) {
            next(err);
        }
    }

    // POST /api/auth/logout
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (refreshToken) {
                await RefreshToken.destroy({ where: { token: refreshToken } });
            }
            res.json({ message: 'Logged out successfully' });
        } catch (err) {
            next(err);
        }
    }

    // GET /api/auth/profile
    async profile(req, res, next) {
        try {
            const { id, email, role } = req.user;
            res.json({ id, email, role });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();