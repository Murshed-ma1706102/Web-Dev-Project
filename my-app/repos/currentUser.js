import prisma from "@/repos/prisma"


export async function get() {
    
        let user = await prisma.buyer.findFirst({
            where: {
                login: true
            }
        })
        
        if(!user) {  
            user =  await prisma.seller.findFirst({
                where: {
                    login: true
                }
            })
            
        }
        if(!user) {  
            user =  await prisma.admin.findFirst({
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
    }else if(data.type == "seller"){
        return await prisma.seller.update({
            where: {
                userId: data.userId
            },
           data: {
               login: data.login 
           }
       })
    }else {
        return await prisma.admin.update({
            where: {
                userId: data.userId
            },
           data: {
               login: data.login 
           }
       })
    }
    
}