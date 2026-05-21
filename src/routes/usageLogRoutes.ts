import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const { assetCode, action, status, evidenceImage } = req.body;
    const newLog = await prisma.usageLog.create({
      data: {
        assetCode,
        userId: req.user.id,
        action,
        status,
        evidenceImage
      }
    });
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lưu log sử dụng' });
  }
});

export default router;
