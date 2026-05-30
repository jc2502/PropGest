const UserModel = require("../database/UserModel");
const RoleModel = require("../database/RoleModel");

class UserRepository {
    async create(userData) {
        let data = { ...userData };

        if (data.role && typeof data.role === "string") {
            const role = await RoleModel.findOne({ name: data.role });
            if (role) {
                data.role = role._id;
            }
        }

        return await UserModel.create(data);
    }

    async findByEmail(email) {
        return await UserModel.findOne({ email }).populate("role");
    }

    async findById(id) {
        return await UserModel.findById(id).populate("role");
    }

    async findAll() {
        return await UserModel.find().populate("role");
    }
}

module.exports = new UserRepository();