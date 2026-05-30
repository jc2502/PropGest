const express = require("express");
const router = express.Router();

const auth = require("../../shared/middlewares/authMiddleware");
const role = require("../../shared/middlewares/roleMiddleware");

const propertyCtrl = require("../controllers/OwnerPropertyController");
const contractCtrl = require("../controllers/OwnerContractController");
const ticketCtrl = require("../controllers/OwnerTicketController");
const reportCtrl = require("../controllers/OwnerReportController");

router.use(auth, role("owner"));

router.get("/properties", propertyCtrl.list);
router.get("/properties/:id", propertyCtrl.getOne);
router.post("/properties", propertyCtrl.create);
router.put("/properties/:id", propertyCtrl.update);
router.delete("/properties/:id", propertyCtrl.delete);
router.patch("/properties/:id/publish", propertyCtrl.togglePublish);

router.get("/contracts", contractCtrl.list);
router.post("/contracts", contractCtrl.create);
router.patch("/contracts/:id/approve", contractCtrl.approve);

router.get("/tickets", ticketCtrl.list);
router.patch("/tickets/:id/status", ticketCtrl.updateStatus);

router.get("/reports/overview", reportCtrl.overview);
router.get("/reports/financial", reportCtrl.financial);

module.exports = router;
