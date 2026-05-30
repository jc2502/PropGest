const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./infrastructure/database/mongo");
const seed = require("./infrastructure/database/seed");
const authRoutes = require("./interfaces/routes/authRoutes");
const propertyRoutes = require("./interfaces/routes/propertyRoutes");
const ownerRoutes = require("./interfaces/routes/ownerRoutes");
const errorHandler = require("./shared/middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/owner", ownerRoutes);

app.get("/", (req, res) => {
    res.send("PropGest API");
});

app.use(errorHandler);

const start = async () => {
    await connectDB();
    await seed();

    app.listen(process.env.PORT || 5000, () => {
        console.log("Servidor corriendo en puerto " + (process.env.PORT || 5000));
    });
};

start();