let expenses = [];
let total = 0;

const categories = document.getElementById('Category');
const amount = document.getElementById('Amount');
const date = document .getElementById('Date');
const add = document .getElementById('Add');
const expenseTableBody = document.getElementById('Expense-Table-Body');
const totalAmount = document.getElementById('Total-Amount');

add.addEventListener('click', () => {
    const category = categories.value;
    const amountValue = amount.value;
    const dateValue = date.value;


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
        total += parseInt(amountValue);
        totalAmount.innerText = total;
        renderTable();
    }
});