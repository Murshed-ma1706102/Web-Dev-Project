import prisma from "@/repos/prisma"

async function read() {
  return await prisma.transaction.findMany();
}

export async function get() {
    const transactions = await read();
    return transactions;
}

async function seed(transaction) {
      return await prisma.transaction.create({
      data: {
          sellerId: transaction.sellerId,
          buyerId: transaction.buyerId,
          itemId: transaction.itemId,
          totalPrice: parseFloat(transaction.totalPrice ),
          quantity: parseInt(transaction.quantity),
          src: transaction.src
      }
  })
}

export async function add(transaction) {

  try {
    await seed(transaction);
    await prisma.$disconnect();
    
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}