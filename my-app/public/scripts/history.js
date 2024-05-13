document.addEventListener("DOMContentLoaded", async () => {


     // get the current user and the transactions stored in local storage
     let response   = await fetch("/api/currentUser")
     let user;
     if(response.ok) {
         user = await response.json();
     }
    
    let res   = await fetch("/api/transactions")
    let transactions = []
    if(res.ok) {
         transactions = await res.json();
    }

    function renderHistory() {

        const container = document.querySelector(".cards");
        container.replaceChildren();
        // to let the last transaction to be appeared in the top
        let transactions2 = transactions.reverse();
        transactions2.forEach((transaction) => {
            if(user.userId === transaction.buyerId) {
                container.appendChild(renderTransaction(transaction));
            }
        });
    }

    
    function renderTransaction(transaction) {

        const card = document.createElement("div");
        card.classList.add("card");

        const itemImg = document.createElement("img");
        itemImg.classList.add("itemImg");
        itemImg.src = transaction.src; // get img from items storage

        const quantityDiv = document.createElement("div");
        quantityDiv.innerHTML = `quantity: <span>${transaction.quantity}</span>`;

        const priceDiv = document.createElement("div");
        priceDiv.innerHTML = ` <span>total price: </span><span class="price">${transaction.totalPrice}</span><span>$</span>`;
        
        

        card.appendChild(itemImg);
        card.appendChild(quantityDiv);
        card.appendChild(priceDiv);
        

        return card;
    }

    
    document.querySelector("header div").addEventListener("click", (e) => {
        window.location.href = "mainPage.html";
    })
    

    renderHistory();
})