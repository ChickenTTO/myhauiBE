"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReportStatus = exports.submitReport = exports.getReports = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all reports
const getReports = async (req, res) => {
    try {
        const reports = await prisma.researchReport.findMany({
            include: { User: { select: { email: true, fullName: true, role: true } } },
            orderBy: { submittedAt: 'desc' }
        });
        res.status(200).json(reports);
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi tải danh sách báo cáo' });
    }
};
exports.getReports = getReports;
// Create a report
const submitReport = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi nộp báo cáo' });
    }
};
exports.submitReport = submitReport;
// Update report status (Teacher/Admin)
const updateReportStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await prisma.researchReport.update({
            where: { id: Number(id) },
            data: { status }
        });
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi duyệt báo cáo' });
    }
};
exports.updateReportStatus = updateReportStatus;
