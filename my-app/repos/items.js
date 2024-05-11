import prisma from "@/repos/prisma"

async function read() {
    return await prisma.item.findMany();
}
  111
export async function get(type) {
    if(!type) {
        const items = await read();
        return items;
    }
    else {
        const items = await prisma.item.findMany({
            where: {
                type: type
            }
        })
        return items;
    }
}

export async function add(data) {
    return await prisma.item.create({
        data: {
            sellerId: data.sellerId,
            type: data.type,
            src: data.src,
            describtion: data.describtion,
            quantity: parseInt(data.quantity),
            price: parseFloat(data.price)
        }
    })
}

export async function update(data) {
     
    return await prisma.item.update({
        where: {
            itemId: data.itemId
        },
        data: {
            quantity:  parseInt(data.quantity)
        }
    })
}