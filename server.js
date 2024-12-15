const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos

let tasks = [
    { id: 1, title: 'Aprender Node.js', completed: false },
    { id: 2, title: 'Construir una API REST', completed: true }
];

app.get('/tasks', (req, res) => res.json(tasks));
app.post('/tasks', (req, res) => {
    const newTask = { id: tasks.length + 1, ...req.body };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id == id);
    if (taskIndex >= 0) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(task => task.id != req.params.id);
    res.status(204).send();
});

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));

