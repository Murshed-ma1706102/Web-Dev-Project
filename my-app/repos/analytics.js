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

export async function top3Buyers() {
    return await prisma.transaction.groupBy({
        by:["buyerId"],
        _sum: {
            totalPrice: true,
        },
        orderBy: {
            _sum: {
                totalPrice: "desc",
            }
        },
        take: 3,
    })
}

export async function top3Sellers() {
    return await prisma.transaction.groupBy({
        by:["sellerId"],
        _sum: {
            quantity: true,
        },
        orderBy: {
            _sum: {
                quantity: "desc",
            }
        },
        take: 3,
    })
}


