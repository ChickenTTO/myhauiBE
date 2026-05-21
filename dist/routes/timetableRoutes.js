"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timetableController_1 = require("../controllers/timetableController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Lấy danh sách - Ai đăng nhập cũng xem được
router.get('/', authMiddleware_1.authenticateToken, timetableController_1.getTimetables);
// Thêm, sửa, xóa - Chỉ các quyền quản lý
const managerRoles = ['ADMIN1', 'ADMIN2', 'TT_SXTM', 'LEADERSHIP'];
router.post('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(managerRoles), timetableController_1.createTimetable);
router.put('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(managerRoles), timetableController_1.updateTimetable);
router.delete('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(['ADMIN1']), timetableController_1.deleteTimetable);
exports.default = router;
