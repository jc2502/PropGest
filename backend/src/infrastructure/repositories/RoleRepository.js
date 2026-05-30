const RoleModel = require("../database/RoleModel");

class RoleRepository {
    async create(data) {
        return await RoleModel.create(data);
    }

    async findByName(name) {
        return await RoleModel.findOne({ name });
    }

    async findAll() {
        return await RoleModel.find();
    }
}

module.exports = new RoleRepository();
