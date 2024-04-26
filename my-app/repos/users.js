import prisma from "@/repos/prisma"

export async function get(id) {
    if(!id) {
        const users = await prisma.buyer.findMany();
        const sellers = await prisma.seller.findMany();
        sellers.forEach((s) => users.push(s));
        return users;
    }else {
        const buyer = await prisma.buyer.findUnique({
            where: {
                userId: id
            }
        })
        return buyer;
    }
}

export async function update(data) {
     
    return await prisma.buyer.update({
        where: {
            userId: data.buyerId
        },
        data: {
            balance: parseInt(data.balance) 
        }
    })
}