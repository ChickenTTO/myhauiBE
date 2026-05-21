import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Lấy danh sách thời khóa biểu
export const getTimetables = async (req: Request, res: Response) => {
  try {
    const timetables = await prisma.timetable.findMany();
    res.status(200).json(timetables);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách thời khóa biểu' });
  }
};

// Tạo mới thời khóa biểu (Hỗ trợ Bulk)
export const createTimetable = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    if (Array.isArray(data)) {
       const mappedData = data.map(item => ({
          ...item,
          tietHoc: Array.isArray(item.tietHoc) ? JSON.stringify(item.tietHoc) : item.tietHoc
       }));
       const newTimetables = await prisma.timetable.createMany({
         data: mappedData
       });
       return res.status(201).json({ message: `Đã thêm ${newTimetables.count} tiết học` });
    }

    // Chuyển mảng tietHoc thành JSON string
    if (Array.isArray(data.tietHoc)) {
      data.tietHoc = JSON.stringify(data.tietHoc);
    }
    const newTimetable = await prisma.timetable.create({ data });
    res.status(201).json(newTimetable);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo thời khóa biểu' });
  }
};

// Cập nhật
export const updateTimetable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (Array.isArray(data.tietHoc)) {
      data.tietHoc = JSON.stringify(data.tietHoc);
    }
    const updatedTimetable = await prisma.timetable.update({
      where: { id: Number(id) },
      data
    });
    res.status(200).json(updatedTimetable);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật' });
  }
};

// Xóa (Hỗ trợ xóa theo tuần hoặc id)
export const deleteTimetable = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id as string;
    
    // Nếu truyền id là chuỗi dạng "Tuần X", xóa toàn bộ tuần đó
    if (isNaN(Number(idParam))) {
       await prisma.timetable.deleteMany({
          where: { tuanHoc: idParam }
       });
       return res.status(200).json({ message: `Đã xóa thành công ${idParam}` });
    }

    await prisma.timetable.delete({ where: { id: Number(idParam) } });
    res.status(200).json({ message: 'Xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa' });
  }
};
