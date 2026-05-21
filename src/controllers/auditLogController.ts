import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all audit logs
export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const logs = await prisma.auditLog.findMany({
      include: { User: { select: { email: true, fullName: true, role: true } } },
      orderBy: { timestamp: 'desc' },
      take: 200 // Limit to last 200 logs for performance
    });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tải nhật ký hệ thống' });
  }
};

// Create an audit log
export const createAuditLog = async (req: Request, res: Response) => {
  try {
    const { userId, action, details } = req.body;
    const newLog = await prisma.auditLog.create({
      data: {
        userId: Number(userId),
        action,
        details: details || ''
      }
    });
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo nhật ký' });
  }
};

// Delete all logs (ADMIN1 only)
export const clearAuditLogs = async (req: Request, res: Response) => {
  try {
    await prisma.auditLog.deleteMany({});
    res.status(200).json({ message: 'Đã xóa toàn bộ lịch sử hệ thống' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa nhật ký' });
  }
};
