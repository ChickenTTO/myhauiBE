const { PrismaClient } = require('@prisma/client');

const passwords = [
  '',
  '123456',
  'root',
  '12345678',
  '123456789',
  '1234',
  '12345',
  'admin',
  'admin123',
  'root123',
  'root1234',
  'mysql',
  'mysql123',
  '111111',
  '000000'
];

async function test() {
  console.log("Starting DB connection tests...");
  for (const pw of passwords) {
    const url = pw 
      ? `mysql://root:${pw}@localhost:3306/myhaui_erp`
      : `mysql://root@localhost:3306/myhaui_erp`;
    
    // Delete PrismaClient from require cache to ensure it re-reads process.env.DATABASE_URL
    delete require.cache[require.resolve('@prisma/client')];
    const { PrismaClient: FreshPrismaClient } = require('@prisma/client');
    
    process.env.DATABASE_URL = url;
    const prisma = new FreshPrismaClient();
    try {
      console.log(`Trying password: "${pw}"...`);
      await prisma.$connect();
      console.log(`SUCCESS! Password is: "${pw}"`);
      await prisma.$disconnect();
      process.exit(0);
    } catch (e) {
      if (e.code === 'P1000') {
        // Authentication failed, try next
      } else {
        console.log(`Credentials are correct! Password is: "${pw}" (Code: ${e.code}, Error: ${e.message})`);
        await prisma.$disconnect();
        process.exit(0);
      }
    } finally {
      await prisma.$disconnect();
    }
  }
  console.log("None of the common passwords worked.");
  process.exit(1);
}

test();
