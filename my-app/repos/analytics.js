import prisma from "@/repos/prisma";

export async function totalUsers() {
    return {
        buyers: await prisma.buyer.count(),
        sellers: await prisma.seller.count()
    }
}

export async function totalSales() {
    return await prisma.transaction.aggregate({
        _sum: {
            quantity: true,
        }
    });
}

export async function totalEarning() {
      return await prisma.transaction.aggregate({
        _sum: {
            totalPrice: true,
        }
      })
}

export async function bestSeller() {
    return await prisma.transaction.groupBy({
       by: ["itemId","src"],
       _sum: {
        quantity: true,
       },
       orderBy:{
        _sum: {
          quantity: "desc",
        },
      },
       take: 1,
    })
}


