import { Router } from 'express';
import { getTimetables, createTimetable, updateTimetable, deleteTimetable } from '../controllers/timetableController';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// Lấy danh sách - Ai đăng nhập cũng xem được
router.get('/', authenticateToken, getTimetables);

// Thêm, sửa, xóa - Chỉ các quyền quản lý
const managerRoles = ['ADMIN1', 'ADMIN2', 'TT_SXTM', 'LEADERSHIP'];

router.post('/', authenticateToken, requireRole(managerRoles), createTimetable);
router.put('/:id', authenticateToken, requireRole(managerRoles), updateTimetable);
router.delete('/:id', authenticateToken, requireRole(['ADMIN1']), deleteTimetable);

export default router;
