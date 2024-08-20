// El evento 'DOMContentLoaded' asegura que el código JavaScript se ejecute solo después de que todo el HTML se haya cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Aquí se seleccionan los elementos del menú principal usando su ID. Estos son los botones para cambiar entre secciones.
    const gastosBtn = document.getElementById('gastos-btn');
    const inventarioBtn = document.getElementById('inventario-btn');
    const explorarBtn = document.getElementById('explorar-btn');
    const proveedoresBtn = document.getElementById('proveedores-btn');

    // Aquí se seleccionan las diferentes secciones del documento, que están ocultas inicialmente.
    const mainMenu = document.getElementById('main-menu');
    const gastosSection = document.getElementById('gastos-section');
    const inventarioSection = document.getElementById('inventario-section');
    const explorarSection = document.getElementById('explorar-section');
    const proveedoresSection = document.getElementById('proveedores-section');

    // Se seleccionan los botones que permiten volver al menú principal desde cada sección.
    const volverGastosBtn = document.getElementById('volver-gastos');
    const volverInventarioBtn = document.getElementById('volver-inventario');
    const volverExplorarBtn = document.getElementById('volver-explorar');
    const volverProveedoresBtn = document.getElementById('volver-proveedores');

    // Esta función se usa para mostrar una sección específica y ocultar las demás.
    function mostrarSeccion(seccionAMostrar) {
        // Oculta todas las secciones y el menú principal.
        mainMenu.classList.add('hidden');
        gastosSection.classList.add('hidden');
        inventarioSection.classList.add('hidden');
        explorarSection.classList.add('hidden');
        proveedoresSection.classList.add('hidden');
        // Muestra la sección que se pasó como parámetro.
        seccionAMostrar.classList.remove('hidden');
    }

    // Estos eventos se activan cuando el usuario hace clic en los botones del menú principal.
    // Cada evento muestra la sección correspondiente.
    gastosBtn.addEventListener('click', () => {
        mostrarSeccion(gastosSection);
    });

    inventarioBtn.addEventListener('click', () => {
        mostrarSeccion(inventarioSection);
    });

    explorarBtn.addEventListener('click', () => {
        mostrarSeccion(explorarSection);
        cargarFiltrosExplorar(); // Carga los filtros cuando se muestra la sección de explorar.
    });

    proveedoresBtn.addEventListener('click', () => {
        mostrarSeccion(proveedoresSection);
    });

    // Estos eventos permiten volver al menú principal desde cualquier sección.
    volverGastosBtn.addEventListener('click', () => {
        mostrarSeccion(mainMenu);
    });

    volverInventarioBtn.addEventListener('click', () => {
        mostrarSeccion(mainMenu);
    });

    volverExplorarBtn.addEventListener('click', () => {
        mostrarSeccion(mainMenu);
    });

    volverProveedoresBtn.addEventListener('click', () => {
        mostrarSeccion(mainMenu);
    });

    // Aquí se llenan los selectores de categoría y ubicación con los datos definidos en 'categories.js'.
    categories.forEach(category => {
        const option = document.createElement('option'); // Crea un elemento <option> para el selector.
        option.value = category; // Asigna el valor de la categoría al atributo 'value' del <option>.
        option.textContent = category; // Asigna el texto visible del <option>.
        document.getElementById('expense-category').appendChild(option); // Añade el <option> al selector de categoría en la sección de gastos.
        document.getElementById('inventory-category').appendChild(option.cloneNode(true)); // Añade el <option> al selector de categoría en la sección de inventario.
    });

    // Similar al bloque anterior, se llenan los selectores de ubicación.
    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        document.getElementById('expense-location').appendChild(option);
        document.getElementById('inventory-location').appendChild(option.cloneNode(true));
    });

    // Esta función carga los filtros en la sección de explorar, como las categorías y las ubicaciones.
    function cargarFiltrosExplorar() {
        const categoryFilter = document.getElementById('explorar-categoria'); // Selector de categoría en explorar.
        const locationFilter = document.getElementById('explorar-sede'); // Selector de ubicación en explorar.

        // Resetea los selectores para mostrar la opción predeterminada.
        categoryFilter.innerHTML = '<option value="todos">Todos</option>';
        locationFilter.innerHTML = '<option value="todas">Todas</option>';

        // Llena el selector de categoría en explorar.
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        // Llena el selector de ubicación en explorar.
        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option);
        });
    }

    // Formulario de agregar gasto.
    const expenseForm = document.getElementById('add-expense-form');
    const expenseTableBody = document.getElementById('expenses-table').querySelector('tbody');

    // Maneja el evento de envío del formulario de gastos.
    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene que la página se recargue al enviar el formulario.

        // Obtiene los valores ingresados por el usuario.
        const category = document.getElementById('expense-category').value;
        const location = document.getElementById('expense-location').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const type = document.getElementById('expense-type').value;
        const details = document.getElementById('expense-details').value;
        const date = new Date().toLocaleString(); // Obtiene la fecha y hora actual.

        // Crea un objeto 'expense' con los valores del formulario.
        const expense = { category, location, amount, type, details, date };
        addExpense(expense); // Añade el gasto al arreglo en 'expenses.js'.
        addExpenseToTable(expense); // Añade el gasto a la tabla visible en la página.

        expenseForm.reset(); // Resetea el formulario para que esté vacío nuevamente.
    });

    // Añade un nuevo gasto a la tabla en la página.
    function addExpenseToTable(expense) {
        const row = document.createElement('tr'); // Crea una nueva fila de tabla.
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.location}</td>
            <td>${expense.type}</td>
            <td>${expense.amount}</td>
            <td>${expense.details}</td>
            <td>${expense.date}</td>
        `;
        expenseTableBody.appendChild(row); // Añade la fila a la tabla de gastos.
    }

    // Formulario de agregar ítem al inventario.
    const inventoryForm = document.getElementById('add-inventory-form');
    const inventoryTableBody = document.getElementById('inventory-table').querySelector('tbody');

    // Maneja el evento de envío del formulario de inventario.
    inventoryForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene la recarga de la página.

        // Obtiene los valores ingresados por el usuario.
        const name = document.getElementById('inventory-name').value;
        const category = document.getElementById('inventory-category').value;
        const location = document.getElementById('inventory-location').value;
        const quantity = parseInt(document.getElementById('inventory-quantity').value);
        const date = new Date().toLocaleString(); // Obtiene la fecha y hora actual.

        // Crea un objeto 'item' con los valores del formulario.
        const item = { name, category, location, quantity, date };
        addItemToInventory(item); // Añade el ítem al arreglo en 'inventory.js'.
        addInventoryItemToTable(item); // Añade el ítem a la tabla visible en la página.

        inventoryForm.reset(); // Resetea el formulario para que esté vacío nuevamente.
    });

    // Añade un nuevo ítem del inventario a la tabla en la página.
    function addInventoryItemToTable(item) {
        const row = document.createElement('tr'); // Crea una nueva fila de tabla.
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.location}</td>
            <td>${item.quantity}</td>
            <td>${item.date}</td>
        `;
        inventoryTableBody.appendChild(row); // Añade la fila a la tabla de inventario.
    }

    // Formulario de agregar proveedor.
    const providerForm = document.getElementById('add-provider-form');
    const providersTableBody = document.getElementById('providers-table').querySelector('tbody');

    // Maneja el evento de envío del formulario de proveedores.
    providerForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene la recarga de la página.

        // Obtiene los valores ingresados por el usuario.
        const name = document.getElementById('provider-name').value;
        const contact = document.getElementById('provider-contact').value;
        const location = document.getElementById('provider-location').value;

        // Crea un objeto 'provider' con los valores del formulario.
        const provider = { name, contact, location };
        addProvider(provider); // Añade el proveedor al arreglo en 'providers.js'.
        addProviderToTable(provider); // Añade el proveedor a la tabla visible en la página.

        providerForm.reset(); // Resetea el formulario para que esté vacío nuevamente.
    });

    // Añade un nuevo proveedor a la tabla en la página.
    function addProviderToTable(provider) {
        const row = document.createElement('tr'); // Crea una nueva fila de tabla.
        row.innerHTML = `
            <td>${provider.name}</td>
            <td>${provider.contact}</td>
            <td>${provider.location}</td>
        `;
        providersTableBody.appendChild(row); // Añade la fila a la tabla de proveedores.
    }

    // Muestra los datos en la tabla de explorar cuando se cambia el filtro.
    document.getElementById('explorar-tipo').addEventListener('change', () => {
        const tipo = document.getElementById('explorar-tipo').value; // Obtiene el valor seleccionado en el filtro de tipo.
        cargarExplorarTabla(tipo); // Carga la tabla con los datos correspondientes.
    });

    // Esta función carga la tabla de explorar con los datos filtrados.
    function cargarExplorarTabla(tipo) {
        const explorarTableBody = document.getElementById('explorar-table').querySelector('tbody');
        explorarTableBody.innerHTML = ''; // Limpia la tabla antes de llenarla.

        if (tipo === 'gastos') { // Si el tipo seleccionado es 'gastos'.
            getExpenses().forEach(expense => { // Obtiene los gastos y los añade a la tabla.
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${expense.type}</td>
                    <td>${expense.category}</td>
                    <td>${expense.location}</td>
                    <td>${expense.amount}</td>
                    <td>${expense.date}</td>
                `;
                explorarTableBody.appendChild(row);
            });
        } else if (tipo === 'inventario') { // Si el tipo seleccionado es 'inventario'.
            getInventory().forEach(item => { // Obtiene los ítems del inventario y los añade a la tabla.
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.location}</td>
                    <td>${item.quantity}</td>
                    <td>${item.date}</td>
                `;
                explorarTableBody.appendChild(row);
            });
        }
    }
});
