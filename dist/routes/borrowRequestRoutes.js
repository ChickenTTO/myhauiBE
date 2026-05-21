"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrowRequestController_1 = require("../controllers/borrowRequestController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Lấy danh sách cá nhân & tạo phiếu mới (Mọi role đều được)
router.get('/my-requests', authMiddleware_1.authenticateToken, borrowRequestController_1.getMyBorrowRequests);
router.post('/', authMiddleware_1.authenticateToken, borrowRequestController_1.createBorrowRequest);
// Quản lý phiếu mượn (Chỉ cấp quản lý)
const managerRoles = ['ADMIN1', 'ADMIN2', 'TT_SXTM', 'LEADERSHIP', 'TEACHER'];
router.get('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(managerRoles), borrowRequestController_1.getBorrowRequests);
router.put('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(managerRoles), borrowRequestController_1.updateBorrowRequestStatus);
exports.default = router;
