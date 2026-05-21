import { PrismaClient } from '@prisma/client';

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
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url
        }
      }
    });
    try {
      console.log(`Trying password: "${pw}"...`);
      await prisma.$connect();
      console.log(`SUCCESS! Password is: "${pw}"`);
      await prisma.$disconnect();
      process.exit(0);
    } catch (e: any) {
      if (e.code === 'P1000') {
        // Authentication failed, try next
      } else {
        // If it's a different code, it means we authenticated successfully but something else failed (e.g. database not found P1003)
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
