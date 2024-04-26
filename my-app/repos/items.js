import prisma from "@/repos/prisma"

async function read() {
    return await prisma.item.findMany();
}

export async function get() {
    const items = await read();
    return items;
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