const ContractModel = require("../database/ContractModel");

class ContractRepository {
    async create(data) {
        return await ContractModel.create(data);
    }

    async findAll() {
        return await ContractModel.find().populate("property tenant");
    }

    async findById(id) {
        return await ContractModel.findById(id).populate("property tenant");
    }

    async findByTenant(tenantId) {
        return await ContractModel.find({ tenant: tenantId }).populate("property");
    }
}

module.exports = new ContractRepository();
