"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auditLogController_1 = require("../controllers/auditLogController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Log system activity (Any authenticated user can trigger this via frontend actions, or we can use it internally in backend controllers. We'll expose a POST route for frontend if needed)
router.post('/', authMiddleware_1.authenticateToken, auditLogController_1.createAuditLog);
// Admin logs
router.get('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(['ADMIN1', 'ADMIN2']), auditLogController_1.getAuditLogs);
router.delete('/clear', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(['ADMIN1']), auditLogController_1.clearAuditLogs);
exports.default = router;
