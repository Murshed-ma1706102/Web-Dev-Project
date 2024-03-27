document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("currentUser"));
    
    const jsonTransactions = localStorage.getItem("transactions");
    const transactions = jsonTransactions ? JSON.parse(jsonTransactions) : [];

    function renderHistory() {

        const container = document.querySelector(".cards");
        container.replaceChildren();
        // to let the last transaction to be appeared in the top
        let transactions2 = transactions.reverse();
        transactions2.forEach((transaction) => {
            if(user.userId === transaction.userId) {
                container.appendChild(renderTransaction(transaction));
            }
        });
        // to let the transactions arr return like it was in the first place
        transactions.reverse();
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    function renderTransaction(transaction) {

        const card = document.createElement("div");
        card.classList.add("card");

        const itemImg = document.createElement("img");
        itemImg.classList.add("itemImg");
        itemImg.src = transaction.item;

        const quantityDiv = document.createElement("div");
        quantityDiv.innerHTML = `quantity: <span>${transaction.quantity}</span>`;

        const priceDiv = document.createElement("div");
        priceDiv.innerHTML = ` <span>total price: </span><span class="price">${transaction.totalPrice}</span><span>$</span>`;
        
        

        card.appendChild(itemImg);
        card.appendChild(quantityDiv);
        card.appendChild(priceDiv);
        

        return card;
    }

    

    renderHistory();
})