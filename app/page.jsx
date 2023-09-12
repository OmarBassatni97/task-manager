'use client'
import { useState, useEffect, useContext } from 'react'
import Task from './components/Task'
import { TasksStore } from './context/Tasks'
export default function Home() {
  const [task, setTask] = useState({ id: '', message: '', done: false })

  const { tasks, setTasks } = useContext(TasksStore)
  const addTask = (e) => {
    e.preventDefault()
    const newTask = { id: e.target.value, message: e.target.value, done: false };
    setTask(newTask);

  }
  const addToLocalStorage = (e) => {
    e.preventDefault();

    // Create a new task object based on the current input value
    const newTask = { id: task.message, message: task.message, done: false };

    // Update the 'tasks' state with the new task
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Update 'localStorage' with the updated 'tasks' array
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Clear the input field
    setTask({ message: '', done: false });

  }
  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  const doneTasks = tasks.filter(task => task.done).length
  return (
    <div className="flex flex-col justify-center items-center h-screen max-w-[440px] mx-auto">
      <form className="flex flex-col gap-2">
        <label htmlFor='task'>Task:</label>
        <input id='task' type="text" className="border p-2" placeholder="task" value={task.message} onChange={e => addTask(e)} />
        <button className="border p-2 cursor-pointer hover:bg-black hover:text-white duration-300" onClick={(e) => addToLocalStorage(e)}>Add</button>
      </form>
      <div className='border p-2 mt-4 w-[350px] mx-2'>
        <span>{doneTasks} of {tasks.length} done</span>
        <div className='my-4'>
          <h1>Undone Tasks</h1>
          <ul>
            {tasks.length != 0 && tasks.filter(task => !task.done).map((t, index) => (
              <div key={index} className='flex'>
                <Task task={t} />
              </div>
            ))}
          </ul>
        </div>
        <div className='my-4'>
          <h1>Done Tasks</h1>
          <ul>
            {tasks.length != 0 && tasks.filter(task => task.done).map((t, index) => (
              <div key={index} className='flex'>
                <Task task={t} />
              </div>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );

}
