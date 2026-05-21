import { Router } from 'express';
import { getBorrowRequests, getMyBorrowRequests, createBorrowRequest, updateBorrowRequestStatus } from '../controllers/borrowRequestController';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// Lấy danh sách cá nhân & tạo phiếu mới (Mọi role đều được)
router.get('/my-requests', authenticateToken, getMyBorrowRequests);
router.post('/', authenticateToken, createBorrowRequest);

// Quản lý phiếu mượn (Chỉ cấp quản lý)
const managerRoles = ['ADMIN1', 'ADMIN2', 'TT_SXTM', 'LEADERSHIP', 'TEACHER'];
router.get('/', authenticateToken, requireRole(managerRoles), getBorrowRequests);
router.put('/:id', authenticateToken, requireRole(managerRoles), updateBorrowRequestStatus);

export default router;
