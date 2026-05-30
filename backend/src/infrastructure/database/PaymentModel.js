const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract",
        required: true
    },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    method: {
        type: String,
        enum: ["cash", "transfer", "credit_card", "check"],
        default: "transfer"
    },
    status: {
        type: String,
        enum: ["pending", "paid", "overdue", "cancelled"],
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
