import prisma from "@/repos/prisma"


export async function get() {
    
    const item = await prisma.item.findFirst({
        where: {
            choosed: true
        }
    })
    
    return item;

}

export async function update(data) {
    
    
        return await prisma.item.update({
            where: {
                itemId: data.itemId
            },
           data: {
               choosed: data.choosed 
           }
       })
}
    
