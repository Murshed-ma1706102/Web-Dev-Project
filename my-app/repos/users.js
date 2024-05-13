import prisma from "@/repos/prisma"

export async function get(id) {
    if(!id) {
        const users = await prisma.buyer.findMany();
        const sellers = await prisma.seller.findMany();
        const admins = await prisma.admin.findMany();
        sellers.forEach((s) => users.push(s));
        admins.forEach((admin) => users.push(admin));
        return users;
    }else {
        const buyer = await prisma.buyer.findUnique({
            where: {
                userId: id
            }
        })
        if(!buyer) {
            return await prisma.seller.findUnique({
                where: {
                    userId: id,
                }
            })
        }
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