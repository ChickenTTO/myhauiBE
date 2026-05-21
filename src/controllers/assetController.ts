import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all assets
export const getAssets = async (req: Request, res: Response) => {
  try {
    const assets = await prisma.asset.findMany();
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách tài sản' });
  }
};

// Get asset by ID
export const getAssetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const asset = await prisma.asset.findUnique({ where: { id: Number(id) } });
    if (!asset) {
      return res.status(404).json({ message: 'Không tìm thấy tài sản' });
    }
    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin tài sản' });
  }
};

// Create new asset(s)
export const createAsset = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    // Support bulk create if data is array
    if (Array.isArray(data)) {
      let count = 0;
      for (const item of data) {
        try {
          await prisma.asset.create({ data: item });
          count++;
        } catch (error) {
          // Bỏ qua lỗi trùng mã tài sản hoặc lỗi khác nếu có
        }
      }
      return res.status(201).json({ message: `Đã thêm ${count} tài sản` });
    }

    // Single create
    const newAsset = await prisma.asset.create({ data });
    res.status(201).json(newAsset);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo tài sản mới' });
  }
};

// Update asset
export const updateAsset = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedAsset = await prisma.asset.update({
      where: { id: Number(id) },
      data
    });
    res.status(200).json(updatedAsset);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật tài sản' });
  }
};

// Delete asset or Delete All
export const deleteAsset = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (id === 'all') {
      await prisma.asset.deleteMany({});
      return res.status(200).json({ message: 'Đã xóa toàn bộ tài sản' });
    }

    await prisma.asset.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: 'Xóa tài sản thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa tài sản' });
  }
};
