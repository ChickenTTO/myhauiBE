"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.get('/me', authMiddleware_1.authenticateToken, authController_1.getMe);
router.get('/debug-users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                status: true
            }
        });
        res.json({ count: users.length, users });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
