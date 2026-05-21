"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthController_1 = require("../controllers/healthController");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const assetRoutes_1 = __importDefault(require("./assetRoutes"));
const timetableRoutes_1 = __importDefault(require("./timetableRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const auditLogRoutes_1 = __importDefault(require("./auditLogRoutes"));
const borrowRequestRoutes_1 = __importDefault(require("./borrowRequestRoutes"));
const researchReportRoutes_1 = __importDefault(require("./researchReportRoutes"));
const usageLogRoutes_1 = __importDefault(require("./usageLogRoutes"));
const router = (0, express_1.Router)();
// Health check route
router.get('/health', healthController_1.checkHealth);
// Thêm các routes khác ở đây
router.use('/auth', authRoutes_1.default);
router.use('/assets', assetRoutes_1.default);
router.use('/timetables', timetableRoutes_1.default);
router.use('/users', userRoutes_1.default);
router.use('/audit-logs', auditLogRoutes_1.default);
router.use('/borrow-requests', borrowRequestRoutes_1.default);
router.use('/research-reports', researchReportRoutes_1.default);
router.use('/usage-logs', usageLogRoutes_1.default);
exports.default = router;
