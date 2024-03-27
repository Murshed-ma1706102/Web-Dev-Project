document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("currentUser"));
    
    const jsonTransactions = localStorage.getItem("transactions");
    const transactions = jsonTransactions ? JSON.parse(jsonTransactions) : [];

    function renderHistory() {

        const container = document.querySelector(".cards");
        container.replaceChildren();
        transactions.forEach((transaction) => {
            if(user.userId === transaction.userId) {
                container.appendChild(renderTransaction(transaction));
            }
        });

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
        
        const delImg = document.createElement("img");
        delImg.classList.add("delete");
        delImg.src = "./media/icons/trash.svg";

        card.appendChild(itemImg);
        card.appendChild(quantityDiv);
        card.appendChild(priceDiv);
        card.appendChild(delImg);

        delImg.addEventListener("click", (e) => deleteTransaction(transaction));

        return card;
    }

    function deleteTransaction(transaction) {
        const index = transactions.findIndex((t) => t === transaction);
        transactions.splice(index, 1);
        
        renderHistory();
    }

    renderHistory();
})