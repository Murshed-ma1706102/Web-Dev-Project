
document.addEventListener("DOMContentLoaded", () => {

 
const user = localStorage.getItem("currentUser");
const currentUser = user ? JSON.parse(user): "";
// if there is a currentUser in the local storage  we will remove the login btn
if(currentUser) {
    const loginBtn = document.querySelector(".login");
    loginBtn.style.display = "none";
    document.querySelector("header").style.justifyContent = "unset";

    const menu = document.querySelector(".menu");
    menu.classList.remove("hide");
}

const jsonItems = localStorage.getItem("items");
let items = jsonItems ? JSON.parse(jsonItems):[];


const search = document.querySelector("#search");
// when the user input any thing in the search bar we will see if there is an item with the same desc
search.addEventListener("input", (e) => {
    const value = String( e.target.value).toLowerCase()
    
    // add a attr visible for every item and make it value true if the desc of the item contains the value on the search
    items.forEach((item) => {
        let describtion = String(item.describtion).toLowerCase();
        const visible = describtion.includes(value);
        item.visible = visible;
    })
    renderItems();
});

document.querySelector("#history").addEventListener("click", (e) => window.location.href = "history.html");
document.querySelector("#logout").addEventListener("click", (e) => {
    localStorage.setItem("currentUser", "");
    window.location.reload(true);
});

// if there is no items in the local storage we will add 4 items for each item categorie
if(!items.length) {
       const a = async () => {
        fetch("./scripts/items.json")
        .then((res) => {
            return res.json();
        }).then((data) => {
        
            let n = 4;
            while(n < 12) {
                items.push(data[n]);
                n++;
            }
            n = 17;
            while(n <= 20) {
                items.push(data[n]);
                n++;
            }
            renderItems(); 
        })    
    }
    a();
}


function renderItems() {
    
    const hoodiesContainer = document.querySelector("#hoodies .cards");
    const shirtsContainer = document.querySelector("#shirts .cards");
    const trousersContainer = document.querySelector("#trousers .cards");
   
    shirtsContainer.replaceChildren();
    trousersContainer.replaceChildren();
    hoodiesContainer.replaceChildren();

    items.forEach((item) => {
        if(item.type === "shirt") {
            shirtsContainer.appendChild(renderItem(item));
        }else if (item.type === "hoodie") {
            hoodiesContainer.appendChild(renderItem(item));
        }else {
            trousersContainer.appendChild(renderItem(item));
        }
    });

    localStorage.setItem("items", JSON.stringify(items));
}

function renderItem(item) {
    
    const card = document.createElement("div");
    card.classList.add("card")
    
    let img = document.createElement("img");
    img.src = item.src;
   
    let desc = document.createElement("p");
    // set the desc of the item to sold out if there is no quantity left
    if(item.quantity == 0) {
        desc.innerHTML = "Sold Out!"
    }
    else {
        desc.innerHTML = item.describtion;
    }
    
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
            
            if(item.quantity == 0) {
                e.preventDefault();
            }
            else {
                purchase(item.itemId);
            }
        }
        // if the user tried to buy an item and he is not logged he will be returned to the login page
        else {
            window.location.href = "index.html";
        }
    })
    return card;
    
}


function purchase(id) {
    const item = items.find((i) => i.itemId === id);
    if(item) {
        localStorage.setItem("purchasedItem", JSON.stringify(item));
        window.location.href = "purchase.html";
    }
}

renderItems();

})

