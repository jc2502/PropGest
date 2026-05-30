class LogoutUser {
    async execute() {
        return { message: "Sesión cerrada exitosamente" };
    }
}

module.exports = new LogoutUser();
