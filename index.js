let expenses = [];
let total = 0;

// Load expenses from local storage
const storedExpenses = localStorage.getItem('expenses');
if (storedExpenses) {
    expenses = JSON.parse(storedExpenses);
}

const categories = document.getElementById('Category');
const amount = document.getElementById('Amount');
const date = document.getElementById('Date');
const add = document.getElementById('Add');
const expenseTableBody = document.getElementById('Expense-Table-Body');
const totalAmount = document.getElementById('Total-Amount');

add.addEventListener('click', () => {
    const category = categories.value;
    const amountValue = amount.value;
    const dateValue = date.value;

    if (!category) {
        alert('Please select a category');
        return;
    }
    if (amountValue <= 0) {
        alert('Amount must be greater than 0');
        return;
    }
    if (!dateValue) {
        alert('Please enter a date');
        return;
    }
    
    if (category && amountValue >= 0 && dateValue) {
        expenses.push({ category, amount: amountValue, date: dateValue });
        renderTable();
        updateTotal();
        
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
});

function renderTable() {
    expenseTableBody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const newRow = expenseTableBody.insertRow();
        const categoryCell = newRow.insertCell(0);
        const amountCell = newRow.insertCell(1);
        const dateCell = newRow.insertCell(2);
        const deleteCell = newRow.insertCell(3);
        const deleteButton = document.createElement('button');

        categoryCell.innerText = expense.category;
        amountCell.innerText = expense.amount;
        dateCell.innerText = expense.date;

        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            expenses.splice(index, 1);
            renderTable();
            updateTotal();
            
            localStorage.setItem('expenses', JSON.stringify(expenses));
        });

        deleteCell.appendChild(deleteButton);
    });
}

function updateTotal() {
    total = expenses.reduce((acc, expense) => acc + parseInt(expense.amount), 0);
    totalAmount.innerText = total;
}

renderTable();
updateTotal();
