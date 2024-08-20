// Este archivo gestiona los datos de gastos.

let expenses = []; // Aquí se almacenan todos los gastos agregados.

// Esta función agrega un nuevo gasto al arreglo 'expenses'.
function addExpense(expense) {
    expenses.push(expense);
}

// Esta función devuelve todos los gastos almacenados.
function getExpenses() {
    return expenses;
}
