"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBorrowRequestStatus = exports.createBorrowRequest = exports.getMyBorrowRequests = exports.getBorrowRequests = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Lấy danh sách phiếu mượn
const getBorrowRequests = async (req, res) => {
    try {
        const requests = await prisma.borrowRequest.findMany({
            include: {
                User: { select: { email: true, fullName: true } },
                Asset: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(requests);
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi tải danh sách phiếu mượn' });
    }
};
exports.getBorrowRequests = getBorrowRequests;
// Lấy danh sách phiếu mượn của cá nhân
const getMyBorrowRequests = async (req, res) => {
    try {
        const requests = await prisma.borrowRequest.findMany({
            where: { userId: req.user.id },
            include: { Asset: true },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(requests);
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi tải danh sách phiếu mượn' });
    }
};
exports.getMyBorrowRequests = getMyBorrowRequests;
// Tạo phiếu mượn mới
const createBorrowRequest = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo phiếu mượn' });
    }
};
exports.createBorrowRequest = createBorrowRequest;
// Phê duyệt phiếu mượn (Dành cho Quản lý)
const updateBorrowRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await prisma.borrowRequest.update({
            where: { id: Number(id) },
            data: { status }
        });
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật phiếu mượn' });
    }
};
exports.updateBorrowRequestStatus = updateBorrowRequestStatus;
