const e = require('express');
const ApiError = require('../error/ApiError');
const { Company, Car } = require('../models/models');

class CompanyController {
    async create(req, res, next) {
        try {
            const { name, description, foundedYear } = req.body;
            if (!name) {
                return next(ApiError.badRequest('Company name is required'));
            }

            const existringCompany = await Company.findOne({ where: { name } });
            if (existringCompany) {
                return next(ApiError.badRequest('Company with this name already exists'));
            }

            const company = await Company.create({ name, description, foundedYear });

            return res.json(company);
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const companies = await Company.findAll({
                include: [
                    {
                        model: Car,
                        as: 'cars',
                        attributes: ['id', 'model', 'year', 'available']
                    }
                ],
                order: [['name', 'ASC']]
            });

            return res.json(companies);
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const company = await Company.findByPk(id, {
                include: [
                    {
                        model: Car,
                        as: 'cars',
                        attributes: ['id', 'model', 'year', 'available']
                    }
                ]
            });

            if (!company) {
                return next(ApiError.notFound('Company not found'));
            }

            return res.json(company);
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }


    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, description, foundedYear } = req.body;

            const company = await Company.findByPk(id);
            if (!company) {
                return next(ApiError.notFound('Company not found'));
            }

            if (name) company.name = name;
            if (description) company.description = description;
            if (foundedYear) company.foundedYear = foundedYear;

            await company.save();

            return res.json(company);
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const company = await Company.findByPk(id);
            if (!company) {
                return next(ApiError.notFound('Company not found'));
            }

            const carsCount = await Car.count({ where: { companyId: id } });
            if (carsCount > 0) {
                return next(ApiError.badRequest('Cannot delete company with associated cars'));
            }

            await company.destroy();
            return res.json({ message: 'Company deleted successfully' });
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }

    }
}

module.exports = new CompanyController();