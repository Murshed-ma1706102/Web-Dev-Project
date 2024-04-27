import prisma from "@/repos/prisma"


export async function get() {
    
        let user = await prisma.buyer.findFirst({
            where: {
                login: true
            }
        })
        
        if(!user) {
            
            return await prisma.seller.findFirst({
                where: {
                    login: true
                }
            })
            
        }
        return user;
    
}

export async function update(data) {
    
    if(data.type === "customer") {
        return await prisma.buyer.update({
            where: {
                userId: data.userId
            },
           data: {
               login: data.login 
           }
       })
    }else {
        return await prisma.seller.update({
            where: {
                userId: data.userId
            },
           data: {
               login: data.login 
           }
       })
    }
    
}