"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assetController_1 = require("../controllers/assetController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Lấy danh sách tài sản - Yêu cầu đăng nhập
router.get('/', authMiddleware_1.authenticateToken, assetController_1.getAssets);
router.get('/:id', authMiddleware_1.authenticateToken, assetController_1.getAssetById);
// Thêm, Sửa, Xóa tài sản - Yêu cầu quyền
// Theo cấu trúc RBAC: ADMIN1, ADMIN2, TT_SXTM, LEADERSHIP có quyền quản lý. 
// Riêng thao tác Xóa thì chỉ ADMIN1 được quyền.
const managerRoles = ['ADMIN1', 'ADMIN2', 'TT_SXTM', 'LEADERSHIP'];
router.post('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(managerRoles), assetController_1.createAsset);
router.put('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(managerRoles), assetController_1.updateAsset);
router.delete('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.requireRole)(['ADMIN1']), assetController_1.deleteAsset);
exports.default = router;
