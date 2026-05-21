import { Router } from 'express';
import { getAssets, getAssetById, createAsset, updateAsset, deleteAsset } from '../controllers/assetController';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// Lấy danh sách tài sản - Yêu cầu đăng nhập
router.get('/', authenticateToken, getAssets);
router.get('/:id', authenticateToken, getAssetById);

// Thêm, Sửa, Xóa tài sản - Yêu cầu quyền
// Theo cấu trúc RBAC: ADMIN1, ADMIN2, TT_SXTM, LEADERSHIP có quyền quản lý. 
// Riêng thao tác Xóa thì chỉ ADMIN1 được quyền.
const managerRoles = ['ADMIN1', 'ADMIN2', 'TT_SXTM', 'LEADERSHIP'];

router.post('/', authenticateToken, requireRole(managerRoles), createAsset);
router.put('/:id', authenticateToken, requireRole(managerRoles), updateAsset);
router.delete('/:id', authenticateToken, requireRole(['ADMIN1']), deleteAsset);

export default router;
