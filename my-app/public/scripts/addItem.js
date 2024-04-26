document.addEventListener("DOMContentLoaded", async () => {

    // get the current user and the items stored in local storage
    const currentUser =  JSON.parse(localStorage.getItem("currentUser"));
    
    let res   = await fetch("/api/items")
    let items = []
    if(res.ok) {
         items = await res.json();
    }


    const menu = document.querySelector(".menu");
    const typeDiv = document.querySelector(".menu div");
    const options = document.querySelectorAll(".option");
    const type = document.querySelector(".menu div span");

    // show of hide the menu options when the user click the menu
    typeDiv.addEventListener("click", (e) => {
        document.querySelector(".options").classList.toggle("active");
        typeDiv.querySelector("img").classList.toggle("rotate");
    })

    options.forEach((option) => {
        option.addEventListener("click", (e) => {
            type.innerHTML = option.textContent;
            document.querySelector(".options").classList.remove("active");
            typeDiv.querySelector("img").classList.toggle("rotate");
            
            renderItems(option.textContent);
        })
    })


    // show the items with the same type that the user shose
    const renderItems =  async(type2) => {
        
        document.querySelector("section").classList.remove("hide");
        document.querySelector("section h2").innerText = type2;
        const container = document.querySelector("section .cards");
        container.replaceChildren();

        const t = type2=="Shirts" ? "shirt" : type2=="Hoodies" ? "hoodie": "pant";
        
        const res = await fetch("./scripts/items.json");
        let data;
        if (res.ok) {
          data = await res.json();
        }
        data.forEach((item) => {
            if(item.type == t && item.sellerId == currentUser.userId) {
                container.appendChild(renderItem(item));
            }
        })
    }

    function renderItem(item) {
        
        const card = document.createElement("div");
        card.classList.add("card")
    
        let img = document.createElement("img");
        img.src = item.src;
   
        let desc = document.createElement("p");
        desc.innerText = item.describtion;

        let btn = document.createElement("button");
        btn.innerText = "Add Item";

        card.appendChild(img);
        card.appendChild(desc);
        card.appendChild(btn);
   
        btn.addEventListener("click", (e) => {

            document.querySelector(".menu").classList.add("hide");
            document.querySelector("section").classList.add("hide");
            document.querySelector(".button").classList.remove("hide");
            addItem(item);
        })
        return card;
    }

    // create the card for the item that the seller shose to add
    function addItem(item) {

        const card = document.querySelector(".selected-card");
   
        const itemPic = document.createElement("img");
        itemPic.src = item.src;

        const desc = document.createElement("p");
        desc.innerText = item.describtion;

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
        card.appendChild(desc);
        card.appendChild(quantityDiv);

        // increase the quantity if the user click the + img
        addImg.addEventListener("click", (e) => {
      
            const quantity = document.querySelector(".quantityDiv span");
            quantity.innerText = Number(quantity.textContent) + 1;
            if(Number(quantity.textContent) > 1) {
               decImg.src = "./media/icons/minus.svg";
            }
         })

         // decrease the quantity if the user click the - img 
         decImg.addEventListener("click", (e) => {
      
            const quantity = document.querySelector(".quantityDiv span");
            
            // return the user to the previous page if he clicked the trash image that means he dont want to add this item
            if(Number(quantity.textContent) == 1) {
                window.location.reload(true);
            }
        
            quantity.innerText = Number(quantity.textContent) - 1;
            
    
            if(Number(quantity.textContent) == 1) {
                decImg.src = "./media/icons/trash.svg";
            }
           })
        
        document.querySelector("#add-item").addEventListener("click", async (e) => {
         
            // get the quantity
            const quantity = Number(document.querySelector(".quantityDiv span").innerText);
            // see if the item is exist in local storage
            let index = items.findIndex((i) => i.itemId == item.itemId);
            
            const res1 = await fetch("/api/items", {
                method: "PUT",
                body: JSON.stringify({itemId: String(item.itemId) ,"quantity": item.quantity})
            });
            
            successMsg();
        })
    }

    function successMsg() {
       
        document.querySelector(".selected-card").classList.add("hide");
        document.querySelector(".button").classList.add("hide");
   
        const popup = document.querySelector(".popup");
        popup.classList.add("open");
        let img = document.createElement("img");
        img.src = "./media/icons/check.svg";
        let h2 = document.createElement("h2");
        h2.innerText = "Item Added Succesfully!"
        let btn = document.createElement("button");
        btn.innerText = "ok";
        popup.appendChild(img);
        popup.appendChild(h2);
        popup.appendChild(btn);
   
        
        btn.addEventListener("click", (e) => {
           window.location.reload(true);
        })
      }


    
    

    document.querySelector("header div").addEventListener("click", (e) => {
        window.location.href = "seller.html";
    })
})