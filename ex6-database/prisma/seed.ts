import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString: DB_URL });

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: {
      name: "john doe",
      email: "john@example.com",
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "jane doe",
      email: "jane@example.com",
    },
  });

  await prisma.book.createMany({
    data: [
      {
        title: "Books 1",
        isbn: "9780000000001",
        price: 19.99,
        stock: 10,
        userId: alice.id,
      },
      {
        title: "Books 2",
        isbn: "9780000000002",
        price: 24.5,
        stock: 7,
        userId: alice.id,
      },
      {
        title: "Books 3",
        isbn: "9780000000003",
        price: 29.0,
        stock: 5,
        userId: bob.id,
      },
    ],
  });

  console.log("Seed completed: users and books inserted.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
