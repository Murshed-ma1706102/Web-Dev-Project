
document.addEventListener("DOMContentLoaded", () => {

const currentUser= JSON.parse(localStorage.getItem("currentUser"))
if(currentUser) {
    const loginBtn = document.querySelector(".login");
    loginBtn.style.display = "none";
    document.querySelector("header").style.justifyContent = "unset";
}

const jsonItems = localStorage.getItem("items");
let items = jsonItems ? JSON.parse(jsonItems):[];

const search = document.querySelector("#search");
search.addEventListener("input", (e) => {
    const value = e.target.value;
    items.forEach((item) => {
        const visible = item.describtion.includes(value);
        item.visible = visible;
    })
    renderItems();
})
if(!items.length) {
       const a = async () => {
        fetch("./scripts/items.json")
        .then((res) => {
            return res.json();
        }).then((data) => {
        
            let n = 0;
            while(n < 3) {
                let id = Math.floor(Math.random() * 10);
                
                if(data[id]) {
                    if(addItem(data[id])) {
                     n++;
                    }
                }
                
            }
            renderItems(); 
        })    
    }
    a();
}

function renderItems() {
    const container = document.querySelector(".cards");
    container.replaceChildren();
    items.forEach((item) => container.appendChild(renderItem(item)));

    localStorage.setItem("items", JSON.stringify(items));
}

function renderItem(item) {
    
    const card = document.createElement("div");
    card.classList.add("card")
    
    let img = document.createElement("img");
    img.src = item.src;
   
    let desc = document.createElement("p");
    desc.innerHTML = item.describtion;
    
    let div = document.createElement("div");
    div.innerHTML = `<span>price: </span> <span id="price">${item.price}</span><span>$</span>`;

    let btn = document.createElement("button");
    btn.id = "buy";
    btn.innerText = "Buy";

    if(item.visible !== undefined) {
       card.classList.toggle("hide",!item.visible);
       
    }
    card.appendChild(img);
    card.appendChild(desc);
    card.appendChild(div);
    card.appendChild(btn);


    btn.addEventListener("click", (e) => {
        if(currentUser) {
            purchase(item.itemId);
        }
        else {
            window.location.href = "index.html";
        }
    })
    return card;
    
}

function addItem(item) {

    if(!items.find((i) => i.itemId === item.itemId)){
         items.push(item)
         return true;
      }
}

function purchase(id) {
    const item = items.find((i) => i.itemId === id);
    if(item) {
        localStorage.setItem("purchasedItem", JSON.stringify(item));
        window.location.href = "purchase.html";
    }
}

})

