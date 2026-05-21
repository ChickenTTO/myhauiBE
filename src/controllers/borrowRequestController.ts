import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Lấy danh sách phiếu mượn
export const getBorrowRequests = async (req: Request, res: Response) => {
  try {
    const requests = await prisma.borrowRequest.findMany({
      include: {
        User: { select: { email: true, fullName: true } },
        Asset: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tải danh sách phiếu mượn' });
  }
};

// Lấy danh sách phiếu mượn của cá nhân
export const getMyBorrowRequests = async (req: any, res: Response) => {
  try {
    const requests = await prisma.borrowRequest.findMany({
      where: { userId: req.user.id },
      include: { Asset: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tải danh sách phiếu mượn' });
  }
};

// Tạo phiếu mượn mới
export const createBorrowRequest = async (req: any, res: Response) => {
  try {
    const { assetId, purpose, projectDetails, advisorId, advisorName, startTime, endTime, initialStatus } = req.body;
    
    // Check if asset exists
    const asset = await prisma.asset.findUnique({ where: { id: Number(assetId) } });
    if (!asset) {
       return res.status(404).json({ message: 'Tài sản không tồn tại' });
    }

    const newRequest = await prisma.borrowRequest.create({
      data: {
        userId: req.user.id,
        assetId: Number(assetId),
        purpose,
        projectDetails,
        advisorId,
        advisorName,
        startTime: startTime ? new Date(startTime) : null,
        endTime: endTime ? new Date(endTime) : null,
        status: initialStatus || 'PENDING'
      }
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo phiếu mượn' });
  }
};

// Phê duyệt phiếu mượn (Dành cho Quản lý)
export const updateBorrowRequestStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await prisma.borrowRequest.update({
      where: { id: Number(id) },
      data: { status }
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật phiếu mượn' });
  }
};
