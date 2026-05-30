const contractRepository = require("../../infrastructure/repositories/ContractRepository");
const propertyRepository = require("../../infrastructure/repositories/PropertyRepository");
const AppError = require("../../shared/errors/AppError");

class ApproveTenant {
    async execute(contractId, user) {
        const contract = await contractRepository.findById(contractId);

        if (!contract) {
            throw new AppError("Contrato no encontrado", 404);
        }

        const property = await propertyRepository.findById(contract.property._id);

        if (property.owner._id.toString() !== user.id) {
            throw new AppError("No tienes permiso para aprobar este contrato", 403);
        }

        contract.status = "active";
        await contract.save();

        await propertyRepository.update(property._id, { status: "occupied" });

        return contract;
    }
}

module.exports = new ApproveTenant();
