import { Router } from 'express';
import { getUsers, updateUserStatus, deleteUser } from '../controllers/userController';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// Chỉ ADMIN1 và ADMIN2 mới có quyền quản lý users
const adminRoles = ['ADMIN1', 'ADMIN2'];

router.get('/', authenticateToken, requireRole(adminRoles), getUsers);
router.put('/:id', authenticateToken, requireRole(adminRoles), updateUserStatus);
router.delete('/:id', authenticateToken, requireRole(adminRoles), deleteUser);

export default router;
