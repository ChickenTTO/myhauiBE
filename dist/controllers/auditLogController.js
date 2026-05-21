"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuditLogs = exports.createAuditLog = exports.getAuditLogs = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all audit logs
const getAuditLogs = async (req, res) => {
    try {
        const logs = await prisma.auditLog.findMany({
            include: { User: { select: { email: true, fullName: true, role: true } } },
            orderBy: { timestamp: 'desc' },
            take: 200 // Limit to last 200 logs for performance
        });
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi tải nhật ký hệ thống' });
    }
};
exports.getAuditLogs = getAuditLogs;
// Create an audit log
const createAuditLog = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo nhật ký' });
    }
};
exports.createAuditLog = createAuditLog;
// Delete all logs (ADMIN1 only)
const clearAuditLogs = async (req, res) => {
    try {
        await prisma.auditLog.deleteMany({});
        res.status(200).json({ message: 'Đã xóa toàn bộ lịch sử hệ thống' });
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa nhật ký' });
    }
};
exports.clearAuditLogs = clearAuditLogs;
