import { Router } from 'express';
import { getAuditLogs, createAuditLog, clearAuditLogs } from '../controllers/auditLogController';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// Log system activity (Any authenticated user can trigger this via frontend actions, or we can use it internally in backend controllers. We'll expose a POST route for frontend if needed)
router.post('/', authenticateToken, createAuditLog);

// Admin logs
router.get('/', authenticateToken, requireRole(['ADMIN1', 'ADMIN2']), getAuditLogs);
router.delete('/clear', authenticateToken, requireRole(['ADMIN1']), clearAuditLogs);

export default router;
