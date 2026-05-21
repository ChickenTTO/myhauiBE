"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const register = async (req, res) => {
    try {
        const { email, password, fullName, role } = req.body;
        // Validate
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
        }
        // Check existing
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create user
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName,
                role: role || 'STUDENT',
                status: 'PENDING'
            }
        });
        res.status(201).json({ message: 'Đăng ký thành công', user: { id: newUser.id, email: newUser.email, role: newUser.role } });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu' });
        }
        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }
        // Verify password
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }
        // Check status
        if (user.status !== 'APPROVED') {
            return res.status(403).json({ message: 'Tài khoản chưa được phê duyệt' });
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({
            message: 'Đăng nhập thành công',
            token,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                status: user.status
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true, fullName: true, role: true, status: true, createdAt: true }
        });
        if (!user) {
            return res.status(404).json({ message: 'User không tồn tại' });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};
exports.getMe = getMe;
