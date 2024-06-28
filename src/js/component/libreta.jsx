import React, { useEffect, useState } from "react";

// inicio de componente
const Todolist = () => {
    // hooks
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetchUserTasks();
    }, []);

    // función para obtener las tareas del usuario
    const fetchUserTasks = () => {
        fetch('https://playground.4geeks.com/todo/users/nazariego', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setTasks(data.todos);
            })
            .catch(error => {
                console.error(error);
            });
    }

    // función para actualizar la info del input 
    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    // función para agregar una tarea a la lista
    const handleAddTask = (e) => {
        if (e.key === 'Enter' && newTask.trim() !== '') {
            const newTaskObj = { label: newTask.trim(), done: false };

            fetch('https://playground.4geeks.com/todo/todos/nazariego', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTaskObj)
            })
                .then(resp => {
                    if (resp.ok) {
                        return resp.json();
                    } else {
                        throw new Error('Failed to add task');
                    }
                })
                .then(data => {
                    setTasks([...tasks, { ...newTaskObj, id: data.id }]);
                    setNewTask('');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    // función para eliminar una tarea de la lista
    const handleDeleteTask = (taskId) => {
        const taskToDelete = tasks.find(task => task.id === taskId);
        const resp = confirm(`Desea eliminar la tarea "${taskToDelete.label}"?`);
        if (resp) {
            fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        setTasks(tasks.filter(task => task.id !== taskId));
                        alert('Tarea eliminada correctamente');
                    } else {
                        alert('Error al eliminar la tarea');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };


    // renderizado del componente listado
    return (
        <div className="container">
            <ul className="list-group list-group-flush">
                <li className="list-group-title">to do list</li>
                <input
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={handleAddTask}
                    placeholder="Insert here your new task ..."
                />
                {tasks.map((task) => (
                    <li key={task.id} className="list-group-item d-flex justify-content-between">
                        {task.label}
                        <i
                            className="bi bi-x"
                            onClick={() => handleDeleteTask(task.id)}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </li>
                ))}
                <li className="list-group-count">{tasks.length} tasks pending</li>
            </ul>
        </div>
    );
};

// exportar el componente
export default Todolist;
