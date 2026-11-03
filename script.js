

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const addButton = document.getElementById("add-btn");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");
const transactionList = document.getElementById("transaction-list");


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


addButton.addEventListener("click", function() {

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    
    if (description === "" || amount <= 0 || !Number.isFinite(amount)) {
        alert("Please enter a valid description and amount!");
        return;
    }

    
    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };


    transactions.push(transaction);
    saveTransactions();
    displayTransactions();
    descriptionInput.value = "";
    amountInput.value = "";
});

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}


function displayTransactions() {
    transactionList.innerHTML = "";
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }

        const li = document.createElement("li");

        const details = document.createElement("span");
        details.textContent =
            transaction.description + " - ₹" + transaction.amount;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.width = "auto";
        deleteButton.style.padding = "6px 10px";
        deleteButton.style.marginLeft = "10px";

        deleteButton.addEventListener("click", function() {
            deleteTransaction(transaction.id);
        });

        li.appendChild(details);
        li.appendChild(deleteButton);

        if (transaction.type === "income") {
            li.style.borderLeftColor = "green";
        } else {
            li.style.borderLeftColor = "red";
        }

        transactionList.appendChild(li);
    });

    
    const totalBalance = totalIncome - totalExpense;
    incomeElement.textContent = "₹" + totalIncome.toFixed(2);
    expenseElement.textContent = "₹" + totalExpense.toFixed(2);
    balanceElement.textContent = "₹" + totalBalance.toFixed(2);
}


function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;
    });

    saveTransactions();
    displayTransactions();
}


displayTransactions();
