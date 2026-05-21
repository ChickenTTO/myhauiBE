"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Chỉ ADMIN1 và ADMIN2 mới có quyền quản lý users
const adminRoles = ['ADMIN1', 'ADMIN2'];
router.get('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(adminRoles), userController_1.getUsers);
router.put('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(adminRoles), userController_1.updateUserStatus);
router.delete('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(adminRoles), userController_1.deleteUser);
exports.default = router;
