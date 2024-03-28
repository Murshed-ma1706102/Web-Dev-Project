
document.addEventListener("DOMContentLoaded", () => {
   
   


   const jsonTransactions = localStorage.getItem("transactions");
   const transactions = jsonTransactions ? JSON.parse(jsonTransactions) : [];

   const items = JSON.parse(localStorage.getItem("items"));

   const item = JSON.parse(localStorage.getItem("purchasedItem"));

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
   button.addEventListener("click", (e) => {
      
       const address = document.querySelector("#address");
       const quantity = document.querySelector(".quantityDiv span").innerText;
       const errMsg = document.querySelector(".invalid");
       const user = JSON.parse(localStorage.getItem("currentUser"));

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
             
             transactions.push({ "userId": user.userId, "sellerId": item.sellerId, "itemId": item.itemId, "quantity":quantity, "totalPrice":price.innerText});
             
             let items2 = items.map((i) => {
                if(i.itemId == item.itemId) {
                    return item;
                }
                else {return i}
            })
            
             localStorage.setItem("currentUser", JSON.stringify(user));
             localStorage.setItem("items", JSON.stringify(items2));
             localStorage.setItem("transactions", JSON.stringify(transactions));
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

})