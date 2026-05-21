import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all reports
export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await prisma.researchReport.findMany({
      include: { User: { select: { email: true, fullName: true, role: true } } },
      orderBy: { submittedAt: 'desc' }
    });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tải danh sách báo cáo' });
  }
};

// Create a report
export const submitReport = async (req: any, res: Response) => {
  try {
    const { content, fileUrl } = req.body;
    const newReport = await prisma.researchReport.create({
      data: {
        userId: req.user.id,
        content,
        fileUrl,
        status: 'SUBMITTED'
      }
    });
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi nộp báo cáo' });
  }
};

// Update report status (Teacher/Admin)
export const updateReportStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await prisma.researchReport.update({
      where: { id: Number(id) },
      data: { status }
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi duyệt báo cáo' });
  }
};
