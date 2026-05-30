class Contract {
    constructor({ property, tenant, startDate, endDate, rentAmount, status }) {
        this.property = property;
        this.tenant = tenant;
        this.startDate = startDate;
        this.endDate = endDate;
        this.rentAmount = rentAmount;
        this.status = status || "active";
    }
}

module.exports = Contract;
