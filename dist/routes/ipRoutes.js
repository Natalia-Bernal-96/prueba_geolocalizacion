"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IpController_1 = require("../controllers/IpController");
const router = (0, express_1.Router)();
const ipController = new IpController_1.IpController();
router.get('/:ip', (req, res) => ipController.getIpData(req, res));
exports.default = router;
