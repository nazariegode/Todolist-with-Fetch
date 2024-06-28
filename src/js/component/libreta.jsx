import React, { useEffect, useState } from "react";

// componente
const Todolist = () => {
    //hooks
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        user();
/*         addTasks();
 */    }, [])

    //variable con fetch
    const user = () => {
        fetch('https://playground.4geeks.com/todo/users/nazariego', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp.ok);
                console.log(resp.status);
                return resp.json();
            })
            .then(data => {
                console.log(data.todos);
                setTasks(data.todos)
            })
            .catch(error => {
                console.log(error);
            });
    }

    /*     //variable con fetch
        const addTasks = () => {
            fetch('https://playground.4geeks.com/todo/users/nazariego', {
                method: "PUT",
                body: JSON.stringify(todos),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    console.log(resp.ok);
                    console.log(resp.status);
                    return resp.json();
                })
                .then(data => {
                    console.log(data.todos);
                    setTasks(data.todos)
                })
                .catch(error => {
                    console.log(error);
                });
        } */


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
                        {task.label}
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