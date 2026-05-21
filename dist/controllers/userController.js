"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserStatus = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Lấy danh sách users
const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, email: true, fullName: true, role: true, status: true, createdAt: true }
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};
exports.getUsers = getUsers;
// Phê duyệt hoặc đổi quyền user
const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, role } = req.body;
        const updated = await prisma.user.update({
            where: { id: Number(id) },
            data: { status, role }
        });
        res.status(200).json({ message: 'Cập nhật thành công', user: updated });
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};
exports.updateUserStatus = updateUserStatus;
// Xóa user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({ where: { id: Number(id) } });
        res.status(200).json({ message: 'Đã xóa người dùng' });
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};
exports.deleteUser = deleteUser;
