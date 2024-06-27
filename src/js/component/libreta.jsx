import React, { useState } from "react";

// inicio de la funcion
const Todolist = () => {

    // variables con hooks para actualizar el estado
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // funcion para actualizar la info del input 
    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    // funcion para agregar una tarea a la listra
    const handleAddTask = (e) => {
        if (e.key === 'Enter' && newTask.trim() !== '') {
            setTasks([...tasks, newTask.trim()]);
            setNewTask('');
        }
    };

    // funcion para eliminar una tarea de la lista
    const handleDeleteTask = (index) => {
        const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        setTasks(newTasks);
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
                {tasks.map((task, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                        {task}
                        <i
                            className="bi bi-x"
                            onClick={() => handleDeleteTask(index)}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </li>
                ))}
                <li className="list-group-count">{tasks.length} tasks pending</li>
                <button className="btn text-white">Delete all</button>
            </ul>
        </div>
    );
};

// exportar el componente
export default Todolist;