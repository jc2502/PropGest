const asyncHandler = require("../../shared/utils/asyncHandler");
const ticketRepository = require("../../infrastructure/repositories/TicketRepository");
const propertyRepository = require("../../infrastructure/repositories/PropertyRepository");
const AppError = require("../../shared/errors/AppError");

class OwnerTicketController {
    constructor() {
        this.list = asyncHandler(this.list.bind(this));
        this.updateStatus = asyncHandler(this.updateStatus.bind(this));
    }

    async list(req, res) {
        const properties = await propertyRepository.findByOwner(req.user.id);
        const propertyIds = properties.map(p => p._id);

        const tickets = await ticketRepository.findByProperties(propertyIds);
        res.json(tickets);
    }

    async updateStatus(req, res) {
        const { status } = req.body;

        if (!["open", "in_progress", "resolved", "closed"].includes(status)) {
            throw new AppError("Estado inválido", 400);
        }

        const ticket = await ticketRepository.findById(req.params.id);

        if (!ticket) {
            throw new AppError("Ticket no encontrado", 404);
        }

        const properties = await propertyRepository.findByOwner(req.user.id);
        const propertyIds = properties.map(p => p._id.toString());
        const ticketPropId = ticket.property?._id?.toString() || ticket.property?.toString();

        if (!propertyIds.includes(ticketPropId)) {
            throw new AppError("No tienes permiso para modificar este ticket", 403);
        }

        const updated = await ticketRepository.updateStatus(req.params.id, status);
        res.json(updated);
    }
}

module.exports = new OwnerTicketController();
