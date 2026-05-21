import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Lấy danh sách users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
       select: { id: true, email: true, fullName: true, role: true, status: true, createdAt: true }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Phê duyệt hoặc đổi quyền user
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, role } = req.body;
    const updated = await prisma.user.update({
      where: { id: Number(id) },
      data: { status, role }
    });
    res.status(200).json({ message: 'Cập nhật thành công', user: updated });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Xóa user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: 'Đã xóa người dùng' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};
