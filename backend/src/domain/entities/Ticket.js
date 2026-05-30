class Ticket {
    constructor({ title, description, status, priority, property, createdBy }) {
        this.title = title;
        this.description = description;
        this.status = status || "open";
        this.priority = priority || "medium";
        this.property = property;
        this.createdBy = createdBy;
    }
}

module.exports = Ticket;
