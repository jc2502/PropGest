const RoleModel = require("./RoleModel");
const UserModel = require("./UserModel");
const bcrypt = require("bcryptjs");

const roles = [
    { name: "guest", description: "Guest user with limited access" },
    { name: "tenant", description: "Property tenant" },
    { name: "owner", description: "Property owner" },
    { name: "admin", description: "System administrator" }
];

const seed = async () => {
    for (const role of roles) {
        const exists = await RoleModel.findOne({ name: role.name });
        if (!exists) {
            await RoleModel.create(role);
            console.log(`Role '${role.name}' created`);
        }
    }

    const adminRole = await RoleModel.findOne({ name: "admin" });
    if (adminRole) {
        const adminExists = await UserModel.findOne({ email: "admin@propgest.com" });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            await UserModel.create({
                name: "Admin",
                email: "admin@propgest.com",
                password: hashedPassword,
                role: adminRole._id
            });
            console.log("Admin user created (admin@propgest.com / admin123)");
        }
    }

    console.log("Seed completed");
};

module.exports = seed;
