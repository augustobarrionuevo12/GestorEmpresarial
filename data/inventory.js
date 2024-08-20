// Este archivo gestiona los datos del inventario.

let inventory = []; // Aquí se almacenan todos los ítems del inventario.

// Esta función agrega un nuevo ítem al arreglo 'inventory'.
function addItemToInventory(item) {
    inventory.push(item);
}

// Esta función devuelve todos los ítems almacenados en el inventario.
function getInventory() {
    return inventory;
}
