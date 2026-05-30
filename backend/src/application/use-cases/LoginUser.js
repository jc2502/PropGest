const bcrypt = require("bcryptjs");
const userRepository = require("../../infrastructure/repositories/UserRepository");
const generateToken = require("../../shared/utils/jwt");
const AppError = require("../../shared/errors/AppError");

class LoginUser {
    async execute({ email, password }) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Credenciales inválidas", 401);
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new AppError("Credenciales inválidas", 401);
        }

        const roleName = user.role?.name || user.role;
        const token = generateToken({ ...user.toObject(), role: roleName });

        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                role: roleName
            }
        };
    }
}

module.exports = new LoginUser();