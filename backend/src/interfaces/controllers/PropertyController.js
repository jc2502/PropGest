const asyncHandler = require("../../shared/utils/asyncHandler");
const createProperty = require("../../application/use-cases/CreateProperty");
const propertyRepository = require("../../infrastructure/repositories/PropertyRepository");
const AppError = require("../../shared/errors/AppError");

class PropertyController {
    constructor() {
        this.create = asyncHandler(this.create.bind(this));
        this.getAll = asyncHandler(this.getAll.bind(this));
    }

    async create(req, res) {
        if (!req.user) {
            throw new AppError("No autenticado", 401);
        }

        const property = await createProperty.execute(req.body, req.user);
        res.status(201).json(property);
    }

    async getAll(req, res) {
        const properties = await propertyRepository.findAll();
        res.json(properties);
    }

    async getPublic(req, res) {
        const properties = await propertyRepository.searchPublic(req.query);
        res.json(properties);
    }

    async getPublicById(req, res) {
        const property = await propertyRepository.findPublicById(req.params.id);

        if (!property) {
            throw new AppError("Propiedad no encontrada", 404);
        }

        res.json(property);
    }
}

module.exports = new PropertyController();