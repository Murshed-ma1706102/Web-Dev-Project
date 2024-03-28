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
  
    const cards = document.querySelector(".cards")
    const radioButtons = document.querySelectorAll('input[name="item"]');
    radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
    cards.innerHTML = ""
      if(getSelectedItemValue() == "soldItems")
        renderSoldItems()
      
      else if(getSelectedItemValue() == "itemsOnSale")
        renderAvailableItem()
    
    else{
        renderAvailableItem()
        renderSoldItems()
        console.log("changed");
    }
    });

  });
    renderAvailableItem()
    renderSoldItems()

});

function renderItems() {
 
  
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

      card.appendChild(soldStatus);
      card.appendChild(img);
      card.appendChild(desc);
      card.appendChild(quantity)
      card.appendChild(div);

      container.appendChild(card)
    }
  });
  
}

 function renderSoldItems(){

    const container = document.querySelector(".cards");

    soldItems.forEach(item => {
        if (item.sellerId === currentUser.userId) {
            const card = document.createElement("div");
            card.classList.add("card");

            let img = document.createElement("img");
            img.src = item.item;

            const soldStatus = document.createElement("div");
            soldStatus.classList.add("sold");
            const soldText = document.createElement("p")
            soldText.innerHTML = "SOLD"
            soldStatus.appendChild(soldText) 

            const buyer = document.createElement("p");
            buyer.innerHTML = `Buyer user id: ${item.userId}`;
            const quantity = document.createElement("p");
            quantity.innerHTML = `Quantity: ${item.quantity}`;
            const totalPrice = document.createElement("p");
            totalPrice.innerHTML = `Total Price: ${item.totalPrice}`

            card.appendChild(soldStatus);
            card.appendChild(img);
            card.appendChild(buyer);
            card.appendChild(quantity);
            card.appendChild(totalPrice)
            
            container.appendChild(card)
    }})
    

}

