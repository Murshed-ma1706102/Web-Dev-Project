
document.addEventListener("DOMContentLoaded", async () => {
   
   
   let response   = await fetch("/api/purchasedItem")
   let item;
   if(response.ok) {
      item = await response.json();
   }

   const card = document.querySelector(".card");
   
   const itemPic = document.createElement("img");
   itemPic.src = item.src;

   const price = document.createElement("div");
   price.classList.add("price");
   price.innerHTML = `<p>total price: <span>${item.price}</span>$</p>`;

   const quantityDiv = document.createElement("div");
   quantityDiv.classList.add("quantityDiv");

   const decImg = document.createElement("img");
   decImg.src = "./media/icons/trash.svg";

   const quantity = document.createElement("span");
   quantity.innerText = 1;

   const addImg = document.createElement("img");
   addImg.src = "media/icons/plus.svg";
   
   quantityDiv.appendChild(decImg);
   quantityDiv.appendChild(quantity);
   quantityDiv.appendChild(addImg);

   card.appendChild(itemPic);
   card.appendChild(price);
   card.appendChild(quantityDiv);
   
   addImg.addEventListener("click", (e) => {
      
      const quantity = document.querySelector(".quantityDiv span");
      quantity.innerText = Number(quantity.textContent) + 1;
      const price = document.querySelector(".price span");
      price.innerText = Number(quantity.textContent) * item.price;
      if(Number(quantity.textContent) > 1) {
         decImg.src = "./media/icons/minus.svg";
      }
   })

   decImg.addEventListener("click", (e) => {
      
    const quantity = document.querySelector(".quantityDiv span");
    
    // if he decrease the quantity to be 0 he will be returned to the main page
    if(Number(quantity.textContent) == 1) {
        window.location.href = "mainPage.html";
    }

    quantity.innerText = Number(quantity.textContent) - 1;
    const price = document.querySelector(".price span");
    price.innerText = Number(quantity.textContent) * item.price;
    
    if(Number(quantity.textContent) == 1) {
        decImg.src = "./media/icons/trash.svg";
    }
   })

   const button = document.querySelector(".button");
   button.addEventListener("click", async (e) => {
      
       const address = document.querySelector("#address");
       const quantity = document.querySelector(".quantityDiv span").innerText;
       const errMsg = document.querySelector(".invalid");
       let response   = await fetch("/api/currentUser")
       let user;
       if(response.ok) {
           user = await response.json();
       }

       if(address.value === "") {
          document.querySelector(".empty").classList.remove("hide");
          e.preventDefault();
       }
       
       else if(Number(quantity) > item.quantity) {
        document.querySelector(".empty").classList.add("hide");
        
        errMsg.innerHTML = `*The Availabe Quantity for this item is ${item.quantity}!!`;
        errMsg.classList.remove("hide");
        e.preventDefault();
       }
       else {
          
          let price = document.querySelector(".price span");

          if(user.balance >= Number(price.innerText)) {
             errMsg.classList.add("hide");
             user.balance -= Number(price.innerText);
             item.quantity -= Number(quantity);
             
             const res = await fetch("/api/transactions", {
               method: "POST",
                 body: JSON.stringify({sellerId: item.sellerId, buyerId: user.userId, itemId: item.itemId, totalPrice: price.innerText, quantity: quantity, src: item.src})
             });
              
              const res1 = await fetch("/api/items", {
               method: "PUT",
               body: JSON.stringify({itemId: item.itemId ,"quantity": item.quantity})
             });
             
             const res2 = await fetch("/api/users", {
               method: "PUT",
               body: JSON.stringify({buyerId: user.userId ,balance: user.balance})
             });
             
             const res3 = await fetch("/api/purchasedItem", {
               method: "PUT",
               body: JSON.stringify({itemId: item.itemId , choosed: false})
            });
             
             successMsg();
          }
          else if(user.balance < Number(price.innerText)) {
            
            errMsg.innerHTML = `*You don't have a suffecient balance, your balance is: ${user.balance}`;
            errMsg.classList.remove("hide");
          }
       }
   })
   
   function successMsg() {
     card.classList.add("hide");
     document.querySelector(".address-container").classList.add("hide");
     document.querySelector(".button").classList.add("hide");

     const popup = document.querySelector(".popup");
     popup.classList.add("open");
     let img = document.createElement("img");
     img.src = "./media/icons/check.svg";
     let h2 = document.createElement("h2");
     h2.innerText = "Thank You!"
     let p = document.createElement("p");
     p.innerText = "Thank you for choosing our store, Your order is successfully completed!";
     let btn = document.createElement("button");
     btn.innerText = "ok";
     popup.appendChild(img);
     popup.appendChild(h2);
     popup.appendChild(p);
     popup.appendChild(btn);

     
     btn.addEventListener("click", (e) => {
        window.location.href = "mainPage.html";
     })
   }
   
   // if the user click on the logo it will return him to the main page
   document.querySelector("header div").addEventListener("click", async (e) => {
      const res2 = await fetch("/api/purchasedItem", {
         method: "PUT",
         body: JSON.stringify({itemId: item.itemId , choosed: false})
     });
      window.location.href = "mainPage.html";
    })

})