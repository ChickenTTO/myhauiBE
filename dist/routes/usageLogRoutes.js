"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post('/', authMiddleware_1.authenticateToken, async (req, res) => {
    try {
        const { assetCode, action, status, evidenceImage } = req.body;
        const newLog = await prisma.usageLog.create({
            data: {
                assetCode,
                userId: req.user.id,
                action,
                status,
                evidenceImage
            }
        });
        res.status(201).json(newLog);
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi khi lưu log sử dụng' });
    }
});
exports.default = router;
