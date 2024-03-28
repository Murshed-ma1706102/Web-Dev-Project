function getSelectedItemValue() {
  const selectedRadio = document.querySelector('input[name="item"]:checked');
  return selectedRadio ? selectedRadio.value : null; 
}

const currentUser= JSON.parse(localStorage.getItem("currentUser"));
const jsonItems = localStorage.getItem("items");
let items = jsonItems ? JSON.parse(jsonItems):[];

const jsonSoldItems = localStorage.transactions
let soldItems = jsonSoldItems ? JSON.parse(jsonSoldItems) : [];


document.addEventListener("DOMContentLoaded", () => {
  const radioButtons = document.querySelectorAll('input[name="item"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      renderItems();
    });
  });

   //for initial load
  renderAvailableItem();
  renderSoldItems();

});

function renderItems() {
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";
  if (getSelectedItemValue() == "soldItems") 
    renderSoldItems();
  else if (getSelectedItemValue() == "itemsOnSale") 
    renderAvailableItem();
  else {
    renderAvailableItem();
    renderSoldItems();
  }
}



function renderAvailableItem() {
  const container = document.querySelector(".cards");

  items.forEach((item) => {
    if (item.sellerId === currentUser.userId) {
      const card = document.createElement("div");
      card.classList.add("card");

      let img = document.createElement("img");
      img.src = item.src;

      let desc = document.createElement("p");
      desc.innerHTML = item.describtion;

      let div = document.createElement("div");
      div.innerHTML = `<span>price: </span> <span id="price">${item.price}</span><span>$</span>`;

    

      const soldStatus = document.createElement("div");
      soldStatus.classList.add("sold");
      soldStatus.classList.add("on-sale");
      const soldText = document.createElement("p")
      soldText.innerHTML = "On Sale"
      soldStatus.appendChild(soldText)

      const quantity = document.createElement("p")
      quantity.innerHTML = `Stock left: ${item.quantity}`

      let btn = document.createElement("button");
      btn.innerText = "Details";
      btn.addEventListener("click",() => {showOnSaleDetails(item)})

      card.appendChild(soldStatus);
      //card.appendChild(img);
      card.appendChild(desc);
      //card.appendChild(quantity)
      //card.appendChild(div);
      card.appendChild(btn)

      container.appendChild(card)
    }
  });
  
}

 function renderSoldItems(){

    const container = document.querySelector(".cards");

    soldItems.forEach(soldItem => {
        if (soldItem.sellerId === currentUser.userId) {
            const card = document.createElement("div");
            card.classList.add("card");

            let itemDesc = document.createElement("p");
            items.forEach(item => {
                if(item.itemId==soldItem.itemId){
                    itemDesc.innerHTML = item.describtion
                }
            })

            const soldStatus = document.createElement("div");
            soldStatus.classList.add("sold");
            const soldText = document.createElement("p")
            soldText.innerHTML = "SOLD"
            soldStatus.appendChild(soldText) 

            const buyer = document.createElement("p");
            buyer.innerHTML = `Buyer user id: ${soldItem.userId}`;
            const quantity = document.createElement("p");
            quantity.innerHTML = `Quantity: ${soldItem.quantity}`;
            const totalPrice = document.createElement("p");
            totalPrice.innerHTML = `Total Price: ${soldItem.totalPrice}`

            let btn = document.createElement("button");
            btn.id = "buy";
            btn.innerText = "Details";

            card.appendChild(soldStatus);
            card.appendChild(itemDesc);
            //card.appendChild(buyer);
           // card.appendChild(quantity);
            //card.appendChild(totalPrice)
            card.appendChild(btn)
            
            container.appendChild(card)
    }})
    

}

function showOnSaleDetails(item){
    const cards = document.querySelector(".cards")
    cards.innerHTML = ""

    const itemDetails = document.querySelector(".item-details")
    
    itemDetails.innerHTML = onSaleToHtml(item)
    document.querySelector(".go-back").addEventListener("click", () =>{
        itemDetails.innerHTML = ""
        renderItems();
    })

}

function onSaleToHtml(item) {
  return `
            
    <img src="${item.src}">

    <div class="details">
        <div class="sold on-sale">On Sale</div>
        <h1>Description: ${item.describtion}</h1>
        <h1>Quantity: ${item.quantity}</h1>
        <h1>Type: ${item.type}</h1>
        <button class="go-back">Go back</button>
    </div>`;
}

function showSoldDetails(item){

}

/*
<div class="item-details">
            
                <img src="./media/imgs/shirts/shirt-3.avif">
            
                <div class="details">
                    <div class="sold on-sale">On Sale</div>
                    <h1>Description: Black t-shirt</h1>
                    <h1>Quantity: </h1>
                    <h1>Type: </h1>
                    <button>Go back</button>
                </div>
            </div>
*/