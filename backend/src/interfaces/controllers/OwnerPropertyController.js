const asyncHandler = require("../../shared/utils/asyncHandler");
const propertyRepository = require("../../infrastructure/repositories/PropertyRepository");
const createProperty = require("../../application/use-cases/CreateProperty");
const updateProperty = require("../../application/use-cases/owner/UpdateProperty");
const deleteProperty = require("../../application/use-cases/owner/DeleteProperty");
const AppError = require("../../shared/errors/AppError");

class OwnerPropertyController {
    constructor() {
        this.list = asyncHandler(this.list.bind(this));
        this.getOne = asyncHandler(this.getOne.bind(this));
        this.create = asyncHandler(this.create.bind(this));
        this.update = asyncHandler(this.update.bind(this));
        this.delete = asyncHandler(this.delete.bind(this));
        this.togglePublish = asyncHandler(this.togglePublish.bind(this));
    }

    async list(req, res) {
        const properties = await propertyRepository.findByOwner(req.user.id);
        res.json(properties);
    }

    async getOne(req, res) {
        const property = await propertyRepository.findById(req.params.id);

        if (!property || property.owner._id.toString() !== req.user.id) {
            throw new AppError("Propiedad no encontrada", 404);
        }

        res.json(property);
    }

    async create(req, res) {
        const property = await createProperty.execute(req.body, req.user);
        res.status(201).json(property);
    }

    async update(req, res) {
        const property = await updateProperty.execute(req.params.id, req.body, req.user);
        res.json(property);
    }

    async delete(req, res) {
        const result = await deleteProperty.execute(req.params.id, req.user);
        res.json(result);
    }

    async togglePublish(req, res) {
        const property = await propertyRepository.findById(req.params.id);

        if (!property || property.owner._id.toString() !== req.user.id) {
            throw new AppError("Propiedad no encontrada", 404);
        }

        const updated = await propertyRepository.update(req.params.id, {
            published: !property.published
        });

        res.json(updated);
    }
}

module.exports = new OwnerPropertyController();
