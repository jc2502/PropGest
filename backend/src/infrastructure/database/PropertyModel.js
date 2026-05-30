const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    address: String,
    type: {
        type: String,
        enum: ["house", "apartment", "office", "land"],
        default: "house"
    },
    status: {
        type: String,
        enum: ["available", "occupied", "maintenance"],
        default: "available"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    published: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Property", PropertySchema);