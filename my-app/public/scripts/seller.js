


document.addEventListener("DOMContentLoaded", async () => {
  // reading from localStorage
  let response   = await fetch("/api/currentUser")
  let currentUser;
  if(response.ok) {
      currentUser = await response.json();
  }
  
  if(!currentUser) {
    window.location.href="index.html";
  }
  // if the user logged out the current user in local storage will set to be null
  document.querySelector(".logout").addEventListener("click", (e)=> {
    localStorage.setItem("currentUser", null);
  })

    let res   = await fetch("/api/transactions")
    let soldItems = []
    if(res.ok) {
         soldItems = await res.json();
    }

    let res1   = await fetch("/api/items")
    let items = []
    if(res1.ok) {
         items = await res1.json();
    }
  
    //for initial load
  renderAvailableItem();
  renderSoldItems();

  //for filtering
  const radioButtons = document.querySelectorAll('input[name="item"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      renderItems();
    });
  });

  //for filtering
  function getSelectedItemValue() {
    const selectedRadio = document.querySelector('input[name="item"]:checked');
    return selectedRadio ? selectedRadio.value : null; 
  }

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
        desc.innerHTML = `description:${item.describtion}`;
  
        let div = document.createElement("div");
        div.innerHTML = `<span>price: </span> <span id="price">${item.price}</span><span>$</span>`;
  
      
  
        const soldStatus = document.createElement("div");
        soldStatus.classList.add("sold");
        soldStatus.classList.add("on-sale");
        const soldText = document.createElement("p")
        if(item.quantity > 0) {
          soldText.innerHTML = "On Sale"
          soldStatus.appendChild(soldText)
        }
        else {
          soldText.innerHTML = "out of stock"
          soldStatus.appendChild(soldText);
          soldStatus.style.backgroundColor = "red";
        }
        
  
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
  
              
              const quantity = document.createElement("p");
              quantity.innerHTML = `Quantity: ${soldItem.quantity}`;
              const totalPrice = document.createElement("p");
              totalPrice.innerHTML = `Total Price: ${soldItem.totalPrice}`
  
              let btn = document.createElement("button");
              btn.innerText = "Details";
              btn.addEventListener("click",async () => {
                  let res   = await fetch(`/api/users/${soldItem.buyerId}`)
                  if(res.ok) {
                       const buyer = await res.json();
                       showSoldDetails(soldItem, buyer)
                  }
                  
              })
  
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
  
  function showSoldDetails(item, buyer){
      
      const cards = document.querySelector(".cards")
      cards.innerHTML = ""
  
      const soldItemDetails = document.querySelector(".item-details")
      
      soldItemDetails.innerHTML = soldToHtml(item, buyer)
      document.querySelector(".go-back").addEventListener("click", () =>{
          soldItemDetails.innerHTML = ""
          renderItems();
      })
  }
  
  function onSaleToHtml(item) {
  
      
    return `
              
      <img src="${item.src}">
  
      <div class="details">
          <div class="sold on-sale">On Sale</div>
          <h1>Description: ${item.describtion}</h1>
          <h1>Quantity Left: ${item.quantity}</h1>
          <h1>Type: ${item.type}</h1>
          <button class="go-back">Go back</button>
      </div>`;
  }
  
  function soldToHtml(item, buyer){
      const item2 = items.find(i => i.itemId == item.itemId)
      return `
              
      <img src="${item2.src}">
  
      <div class="details">
          <div class="sold">SOLD</div>
          <h1>Description: ${item2.describtion}</h1>
          <h1>Quantity Sold: ${item.quantity}</h1>
          <h1>Buyer name: ${buyer.username}</h1>
          <button class="go-back">Go back</button>
      </div>`;
  }

  document.querySelector("#add-item").addEventListener("click", (e) => {
    
    window.location.href = "addItem.html";
    e.preventDefault();
  })

});





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