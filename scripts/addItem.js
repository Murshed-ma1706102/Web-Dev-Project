document.addEventListener("DOMContentLoaded", () => {

    const currentUser =  JSON.parse(localStorage.getItem("currentUser"));

    const menu = document.querySelector(".menu");
    const typeDiv = document.querySelector(".menu div");
    const options = document.querySelectorAll(".option");
    const type = document.querySelector(".menu div span");

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

    
    const renderItems =  async(type2) => {
        
        document.querySelector("section").classList.remove("hide");
        document.querySelector("section h2").innerText = type2;
        const container = document.querySelector("section .cards");
        container.replaceChildren();
        
        const t = type2=="Shirts" ? "shirt" : "pant";
        
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
        btn.id = "add";
        btn.innerText = "Add Item";

        card.appendChild(img);
        card.appendChild(desc);
        card.appendChild(btn);
   
        return card;
    }







    

    document.querySelector("header div").addEventListener("click", (e) => {
        window.location.href = "seller.html";
    })
})