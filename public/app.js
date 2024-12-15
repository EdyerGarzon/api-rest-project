const taskList = document.getElementById('taskList');
const filterSelect = document.getElementById('filter');
let tasks = [
    { id: 1, title: 'Universidad', completed: false },
    { id: 2, title: 'Trabajo', completed: false },
    { id: 3, title: 'Gastos', completed: false },
    { id: 4, title: 'Mascota', completed: false }
];

let editingTaskId = null;

// Cargar tareas con filtro
const loadTasks = () => {
    const filterValue = filterSelect.value;
    const filteredTasks = tasks.filter(task => {
        if (filterValue === 'completed') return task.completed;
        if (filterValue === 'incomplete') return !task.completed;
        return true; // 'all'
    });

    // Limpiar la lista
    taskList.innerHTML = ''; 
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        taskItem.innerHTML = `
            ${task.title} ${task.completed ? '(Completada)' : '(Pendiente)'}
            <div>
                <button class="btn btn-success btn-sm me-2" onclick="updateTask(${task.id})">Completar</button>
                <button class="btn btn-warning btn-sm me-2" onclick="editTask(${task.id}, '${task.title}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Eliminar</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
};

// Agregar una nueva tarea
document.getElementById('saveNewTask').addEventListener('click', () => {
    const newTaskTitle = document.getElementById('newTaskTitle').value;
    if (!newTaskTitle) return;

    const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        completed: false
    };
    tasks.push(newTask);
    loadTasks(); 
    // Recargar tareas
    document.getElementById('newTaskTitle').value = ''; // Limpiar campo
    bootstrap.Modal.getInstance(document.getElementById('addModal')).hide(); // Cerrar modal
});

// Actualizar el estado de una tarea (completar)
const updateTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = true;
        loadTasks(); // Recargar tareas
    }
};

// Abrir el modal de edición
const editTask = (id, title) => {
    editingTaskId = id;
    document.getElementById('editTitle').value = title;
    new bootstrap.Modal(document.getElementById('editModal')).show();
};

// Guardar la tarea editada
document.getElementById('saveEdit').addEventListener('click', () => {
    const newTitle = document.getElementById('editTitle').value;
    if (!newTitle) return;

    const task = tasks.find(t => t.id === editingTaskId);
    if (task) {
        task.title = newTitle;
        loadTasks(); // Recargar tareas
        editingTaskId = null; // Limpiar ID
        document.getElementById('editTitle').value = ''; // Limpiar campo
        bootstrap.Modal.getInstance(document.getElementById('editModal')).hide(); // Cerrar modal
    }
});

// Eliminar una tarea
const deleteTask = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
        tasks = tasks.filter(task => task.id !== id);
        loadTasks(); // Recargar tareas
    }
};

// Escuchar el cambio en el filtro
filterSelect.addEventListener('change', loadTasks);

// Cargar tareas al iniciar
loadTasks();

