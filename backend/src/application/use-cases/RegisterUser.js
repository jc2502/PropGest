const bcrypt = require("bcryptjs");
const userRepository = require("../../infrastructure/repositories/UserRepository");
const AppError = require("../../shared/errors/AppError");

const ALLOWED_ROLES = ["tenant", "owner"];

class RegisterUser {
    async execute(data) {
        if (!ALLOWED_ROLES.includes(data.role)) {
            throw new AppError("Rol no permitido para registro público", 403);
        }

        if (!data.name || !data.email || !data.password) {
            throw new AppError("Todos los campos son requeridos", 400);
        }

        const existing = await userRepository.findByEmail(data.email);

        if (existing) {
            throw new AppError("El correo ya está registrado", 409);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        return await userRepository.create({
            ...data,
            password: hashedPassword
        });
    }
}

module.exports = new RegisterUser();