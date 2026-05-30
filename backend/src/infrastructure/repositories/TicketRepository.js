const TicketModel = require("../database/TicketModel");

class TicketRepository {
    async create(data) {
        return await TicketModel.create(data);
    }

    async findAll() {
        return await TicketModel.find().populate("property createdBy");
    }

    async findById(id) {
        return await TicketModel.findById(id).populate("property createdBy");
    }

    async findByProperty(propertyId) {
        return await TicketModel.find({ property: propertyId }).populate("createdBy");
    }

    async findByProperties(propertyIds) {
        return await TicketModel.find({ property: { $in: propertyIds } }).populate("property createdBy");
    }

    async updateStatus(id, status) {
        return await TicketModel.findByIdAndUpdate(id, { status }, { new: true });
    }
}

module.exports = new TicketRepository();
