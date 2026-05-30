class Payment {
    constructor({ contract, amount, date, method, status }) {
        this.contract = contract;
        this.amount = amount;
        this.date = date || new Date();
        this.method = method;
        this.status = status || "pending";
    }
}

module.exports = Payment;
