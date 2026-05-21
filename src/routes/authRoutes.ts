import { Router } from 'express';
import { login, register, getMe } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);

router.get('/debug-users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        status: true
      }
    });
    res.json({ count: users.length, users });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
