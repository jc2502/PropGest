const asyncHandler = require("../../shared/utils/asyncHandler");
const registerUser = require("../../application/use-cases/RegisterUser");
const loginUser = require("../../application/use-cases/LoginUser");
const logoutUser = require("../../application/use-cases/LogoutUser");
const AppError = require("../../shared/errors/AppError");

class AuthController {
    constructor() {
        this.register = asyncHandler(this.register.bind(this));
        this.login = asyncHandler(this.login.bind(this));
        this.logout = asyncHandler(this.logout.bind(this));
    }

    async register(req, res) {
        const user = await registerUser.execute(req.body);
        res.status(201).json(user);
    }

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError("Email y contraseña requeridos", 400);
        }

        const result = await loginUser.execute({ email, password });
        res.json(result);
    }

    async logout(req, res) {
        const result = await logoutUser.execute();
        res.json(result);
    }
}

module.exports = new AuthController();