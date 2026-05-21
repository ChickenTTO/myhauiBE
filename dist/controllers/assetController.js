"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAsset = exports.updateAsset = exports.createAsset = exports.getAssetById = exports.getAssets = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all assets
const getAssets = async (req, res) => {
    try {
        const assets = await prisma.asset.findMany();
        res.status(200).json(assets);
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách tài sản' });
    }
};
exports.getAssets = getAssets;
// Get asset by ID
const getAssetById = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await prisma.asset.findUnique({ where: { id: Number(id) } });
        if (!asset) {
            return res.status(404).json({ message: 'Không tìm thấy tài sản' });
        }
        res.status(200).json(asset);
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin tài sản' });
    }
};
exports.getAssetById = getAssetById;
// Create new asset(s)
const createAsset = async (req, res) => {
    try {
        const data = req.body;
        // Support bulk create if data is array
        if (Array.isArray(data)) {
            const newAssets = await prisma.asset.createMany({
                data,
                skipDuplicates: true // bỏ qua lỗi trùng mã tài sản nếu có
            });
            return res.status(201).json({ message: `Đã thêm ${newAssets.count} tài sản` });
        }
        // Single create
        const newAsset = await prisma.asset.create({ data });
        res.status(201).json(newAsset);
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo tài sản mới' });
    }
};
exports.createAsset = createAsset;
// Update asset
const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedAsset = await prisma.asset.update({
            where: { id: Number(id) },
            data
        });
        res.status(200).json(updatedAsset);
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật tài sản' });
    }
};
exports.updateAsset = updateAsset;
// Delete asset or Delete All
const deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;
        if (id === 'all') {
            await prisma.asset.deleteMany({});
            return res.status(200).json({ message: 'Đã xóa toàn bộ tài sản' });
        }
        await prisma.asset.delete({ where: { id: Number(id) } });
        res.status(200).json({ message: 'Xóa tài sản thành công' });
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa tài sản' });
    }
};
exports.deleteAsset = deleteAsset;
