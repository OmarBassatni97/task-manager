'use client'
import { createContext, useState } from "react";

const TasksStore = createContext()

const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    return (
        <TasksStore.Provider value={{ tasks, setTasks }}>{children}</TasksStore.Provider>
    )
}

export { TasksProvider, TasksStore }