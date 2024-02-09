let expenses = [];
let total = 0;
let selectedExpenseIndex = -1;

// Load expenses from local storage
window.addEventListener('DOMContentLoaded', () => {
  const storedExpenses = localStorage.getItem('expenses');
  if (storedExpenses) {
    expenses = JSON.parse(storedExpenses);
    renderTable();
    updateTotal();
  }
});

const categories = document.getElementById('Category');
const amount = document.getElementById('Amount');
const date = document.getElementById('Date');
const add = document.getElementById('Add');
const update = document.getElementById('Update');
const expenseTableBody = document.getElementById('Expense-Table-Body');
const totalAmount = document.getElementById('Total-Amount');

add.addEventListener('click', addExpense);
update.addEventListener('click', () => {
  const selectedRow = expenseTableBody.querySelector('.selected');
  if (selectedRow) {
    updateExpense();
    selectedRow.classList.remove('selected');
  } else {
    alert('Please select a row to edit');
  }
});

function addExpense() {
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
    resetInputFields();
  }
}

function updateExpense() {
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
    if (selectedExpenseIndex !== -1) {
      expenses[selectedExpenseIndex] = { category, amount: amountValue, date: dateValue };
      renderTable();
      updateTotal();

      localStorage.setItem('expenses', JSON.stringify(expenses));
      resetInputFields();
      update.style.display = 'none';
      add.style.display = 'inline-block';
    }
  }
}

function renderTable() {
  expenseTableBody.innerHTML = '';

  expenses.forEach((expense, index) => {
    const newRow = expenseTableBody.insertRow();
    const categoryCell = newRow.insertCell(0);
    const amountCell = newRow.insertCell(1);
    const dateCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);
    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');

    categoryCell.innerText = expense.category;
    amountCell.innerText = expense.amount;
    dateCell.innerText = expense.date;

    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => {
      selectedExpenseIndex = index;
      categories.value = expense.category;
      amount.value = expense.amount;
      date.value = expense.date;

      update.style.display = 'inline-block';
      add.style.display = 'none';

      newRow.classList.add('selected');
    });

    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      expenses.splice(index, 1);
      renderTable();
      updateTotal();

      localStorage.setItem('expenses', JSON.stringify(expenses));
    });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
  });
}

function updateTotal() {
  total = expenses.reduce((acc, expense) => acc + parseInt(expense.amount), 0);
  totalAmount.innerText = total;
}

function resetInputFields() {
  categories.value = '';
  amount.value = '';
  date.value = '';
  selectedExpenseIndex = -1;
}
