import { PrismaClient } from "@prisma/client";
import fs from 'fs';
const prisma = new PrismaClient();

const seed = async () => {
    
    let data = fs.readFileSync("./public/scripts/users.json", 'utf-8');
    const users =  JSON.parse(data);
    
    users.forEach(async (user) => {
       if(user.type == "customer") {
          const buyer = await prisma.buyer.create({
              data: {
                  userId: String(user.userId),
                  username: user.username,
                  password: user.password,
                  balance: parseFloat(user.balance),
                  type: user.type
              }
          })
          console.log("buyer")
       }
       else if(user.type == "seller") {
          const seller = await prisma.seller.create({
              data: {
                  userId: String(user.userId),
                  username: user.username,
                  password: user.password,
                  type: user.type
              }
          })
          console.log("seller")
       }
    })
  
    let data2 = fs.readFileSync("./public/scripts/items.json", 'utf-8');
    const items =  JSON.parse(data2);
    items.forEach(async (item) => {
       await prisma.item.create({
          data: {
              itemId: String(item.itemId),
              type: item.type,
              price: item.price,
              sellerId: String(item.sellerId),
              quantity: item.quantity,
              src: item.src,
              describtion: item.describtion
          }
       })
    })
  


  
};

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}