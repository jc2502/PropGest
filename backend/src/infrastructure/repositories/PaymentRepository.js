const PaymentModel = require("../database/PaymentModel");

class PaymentRepository {
    async create(data) {
        return await PaymentModel.create(data);
    }

    async findAll() {
        return await PaymentModel.find().populate("contract");
    }

    async findById(id) {
        return await PaymentModel.findById(id).populate("contract");
    }

    async findByContract(contractId) {
        return await PaymentModel.find({ contract: contractId });
    }
}

module.exports = new PaymentRepository();
