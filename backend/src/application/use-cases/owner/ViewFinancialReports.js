const propertyRepository = require("../../../infrastructure/repositories/PropertyRepository");
const contractRepository = require("../../../infrastructure/repositories/ContractRepository");
const paymentRepository = require("../../../infrastructure/repositories/PaymentRepository");

class ViewFinancialReports {
    async execute(user) {
        const properties = await propertyRepository.findByOwner(user.id);
        const propertyIds = properties.map(p => p._id);

        const contracts = await contractRepository.findAll();
        const ownerContracts = contracts.filter(c =>
            propertyIds.some(pid => pid.toString() === (c.property?._id || c.property)?.toString())
        );

        const contractIds = ownerContracts.map(c => c._id);
        const allPayments = [];
        for (const cid of contractIds) {
            const payments = await paymentRepository.findByContract(cid);
            allPayments.push(...payments);
        }

        const totalIncome = allPayments
            .filter(p => p.status === "paid")
            .reduce((sum, p) => sum + p.amount, 0);

        const overdue = allPayments.filter(p => p.status === "overdue" || p.status === "pending");

        return {
            totalProperties: properties.length,
            totalContracts: ownerContracts.length,
            totalIncome,
            overdueAmount: overdue.reduce((sum, p) => sum + p.amount, 0),
            overdueCount: overdue.length,
            recentPayments: allPayments.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)
        };
    }
}

module.exports = new ViewFinancialReports();
