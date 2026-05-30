const PropertyModel = require("../database/PropertyModel");

class PropertyRepository {
    async create(data) {
        return await PropertyModel.create(data);
    }

    async findAll() {
        return await PropertyModel.find().populate("owner", "name email");
    }

    async findById(id) {
        return await PropertyModel.findById(id).populate("owner", "name email");
    }

    async findByOwner(ownerId) {
        return await PropertyModel.find({ owner: ownerId }).populate("owner", "name email");
    }

    async update(id, data) {
        return await PropertyModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await PropertyModel.findByIdAndDelete(id);
    }

    async countByOwner(ownerId) {
        const all = await PropertyModel.find({ owner: ownerId });
        return {
            total: all.length,
            occupied: all.filter(p => p.status === "occupied").length,
            available: all.filter(p => p.status === "available").length
        };
    }

    async findPublic() {
        return await PropertyModel.find({ published: true }).populate("owner", "name email");
    }

    async findPublicById(id) {
        return await PropertyModel.findOne({ _id: id, published: true }).populate("owner", "name email");
    }

    async searchPublic(filters = {}) {
        const query = { published: true };

        if (filters.search) {
            const regex = new RegExp(filters.search, "i");
            query.$or = [
                { title: regex },
                { description: regex },
                { address: regex }
            ];
        }

        if (filters.type) {
            query.type = filters.type;
        }

        if (filters.status) {
            query.status = filters.status;
        }

        if (filters.minPrice || filters.maxPrice) {
            query.price = {};
            if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
            if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
        }

        return await PropertyModel.find(query).populate("owner", "name email");
    }
}

module.exports = new PropertyRepository();