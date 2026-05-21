"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const researchReportController_1 = require("../controllers/researchReportController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Lấy danh sách (Ai cũng có thể xem nếu cần, hoặc giới hạn ở frontend)
router.get('/', authMiddleware_1.authenticateToken, researchReportController_1.getReports);
// Nộp báo cáo (Ai cũng được nộp)
router.post('/', authMiddleware_1.authenticateToken, researchReportController_1.submitReport);
// Duyệt báo cáo
const managerRoles = ['ADMIN1', 'ADMIN2', 'TT_SXTM', 'LEADERSHIP', 'TEACHER'];
router.put('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(managerRoles), researchReportController_1.updateReportStatus);
exports.default = router;
