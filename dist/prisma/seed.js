"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const usersToSeed = [
    { email: 'admin1@myhaui.com', fullName: 'Quản trị viên 1', role: 'ADMIN1' },
    { email: 'admin2@myhaui.com', fullName: 'Quản trị viên 2', role: 'ADMIN2' },
    { email: 'tt_sxtm@myhaui.com', fullName: 'Trung tâm SXTM', role: 'TT_SXTM' },
    { email: 'leadership@myhaui.com', fullName: 'Ban giám hiệu', role: 'LEADERSHIP' },
    { email: 'teacher@myhaui.com', fullName: 'Giảng viên Test', role: 'TEACHER' },
    { email: 'student@myhaui.com', fullName: 'Sinh viên Test', role: 'STUDENT' },
    { email: 'guest@myhaui.com', fullName: 'Khách Test', role: 'GUEST' }
];
async function main() {
    console.log('Bắt đầu seeding tài khoản các vai trò (roles)...');
    const defaultPassword = 'password123';
    const hashedPassword = await bcrypt_1.default.hash(defaultPassword, 10);
    for (const u of usersToSeed) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {
                fullName: u.fullName,
                role: u.role,
                status: 'APPROVED',
                password: hashedPassword
            },
            create: {
                email: u.email,
                fullName: u.fullName,
                role: u.role,
                status: 'APPROVED',
                password: hashedPassword
            }
        });
        console.log(`[OK] Đã seed tài khoản: ${user.email} | Mật khẩu: ${defaultPassword} | Quyền: ${user.role} | Trạng thái: ${user.status}`);
    }
    console.log('Hoàn thành seeding cơ sở dữ liệu!');
}
main()
    .catch((e) => {
    console.error('Lỗi khi seed dữ liệu:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
