import React, { useContext } from 'react'
import { TasksStore } from '../context/Tasks'

const Task = ({ task }) => {
    const { tasks, setTasks } = useContext(TasksStore)
    const handleDelete = (id) => {
        const filteredTasks = tasks.filter(task => task.id != id)
        setTasks(filteredTasks)
        console.log(filteredTasks);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks))
    }
    const handleToggleDone = (id) => {
        // Toggle the 'done' property of the corresponding task
        const updatedTasks = tasks.map((t) => {
            if (t.id === id) {
                return { ...t, done: !t.done };
            }
            return t;
        });

        // Update the state and localStorage with the modified tasks
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };
    return (
        <div className={`${task.done ? 'bg-green-300' : 'bg-red-400'} flex gap-2 border rounded-md p-2`}>
            <li >{task.message}</li>
            <input className='flex items-center' type="checkbox" checked={task.done} onChange={() => handleToggleDone(task.id)} />
            <span className='hover:text-red-700 duration-300 cursor-pointer flex items-center' onClick={() => handleDelete(task.id)}>X</span>
        </div>
    )
}

export default Task