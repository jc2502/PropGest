const propertyRepository = require("../../infrastructure/repositories/PropertyRepository");

class CreateProperty {
    async execute(data, user) {
        return await propertyRepository.create({
            ...data,
            owner: user.id
        });
    }
}

module.exports = new CreateProperty();