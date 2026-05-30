const asyncHandler = require("../../shared/utils/asyncHandler");
const contractRepository = require("../../infrastructure/repositories/ContractRepository");
const propertyRepository = require("../../infrastructure/repositories/PropertyRepository");
const generateContract = require("../../application/use-cases/owner/GenerateContract");
const approveTenant = require("../../application/use-cases/owner/ApproveTenant");
const AppError = require("../../shared/errors/AppError");

class OwnerContractController {
    constructor() {
        this.list = asyncHandler(this.list.bind(this));
        this.create = asyncHandler(this.create.bind(this));
        this.approve = asyncHandler(this.approve.bind(this));
    }

    async list(req, res) {
        const properties = await propertyRepository.findByOwner(req.user.id);
        const propertyIds = properties.map(p => p._id);

        const contracts = await contractRepository.findAll();
        const ownerContracts = contracts.filter(c => {
            const cPropId = c.property?._id || c.property;
            return propertyIds.some(pid => pid.toString() === cPropId.toString());
        });

        res.json(ownerContracts);
    }

    async create(req, res) {
        const contract = await generateContract.execute(req.body, req.user);
        res.status(201).json(contract);
    }

    async approve(req, res) {
        const contract = await approveTenant.execute(req.params.id, req.user);
        res.json(contract);
    }
}

module.exports = new OwnerContractController();
