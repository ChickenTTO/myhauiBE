import { Router } from 'express';
import { getReports, submitReport, updateReportStatus } from '../controllers/researchReportController';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// Lấy danh sách (Ai cũng có thể xem nếu cần, hoặc giới hạn ở frontend)
router.get('/', authenticateToken, getReports);

// Nộp báo cáo (Ai cũng được nộp)
router.post('/', authenticateToken, submitReport);

// Duyệt báo cáo
const managerRoles = ['ADMIN1', 'ADMIN2', 'TT_SXTM', 'LEADERSHIP', 'TEACHER'];
router.put('/:id', authenticateToken, requireRole(managerRoles), updateReportStatus);

export default router;
