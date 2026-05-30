const asyncHandler = require("../../shared/utils/asyncHandler");
const viewFinancialReports = require("../../application/use-cases/owner/ViewFinancialReports");
const propertyRepository = require("../../infrastructure/repositories/PropertyRepository");
const ticketRepository = require("../../infrastructure/repositories/TicketRepository");

class OwnerReportController {
    constructor() {
        this.financial = asyncHandler(this.financial.bind(this));
        this.overview = asyncHandler(this.overview.bind(this));
    }

    async overview(req, res) {
        const properties = await propertyRepository.findByOwner(req.user.id);
        const propertyIds = properties.map(p => p._id);

        const tickets = await ticketRepository.findByProperties(propertyIds);
        const activeTickets = tickets.filter(t => t.status === "open" || t.status === "in_progress");
        const counts = await propertyRepository.countByOwner(req.user.id);

        res.json({
            ...counts,
            activeTickets: activeTickets.length,
            totalTickets: tickets.length
        });
    }

    async financial(req, res) {
        const report = await viewFinancialReports.execute(req.user);
        res.json(report);
    }
}

module.exports = new OwnerReportController();
