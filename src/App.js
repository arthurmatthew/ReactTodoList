import { useRef, useState, useEffect } from "react"; // ReactJS
import TodoList from "./TodoList"; // TodoList component
import { v4 as uuidv4 } from "uuid"; // For unique ID
import { motion } from "framer-motion"; // For animating buttons

const LOCAL_STORAGE_KEY = "todoApp.todos"; // Storage key for todolist

function App() {

    const [todos, setTodos] = useState([]); // Handle the todo list itself
    const [dark, setDark] = useState(false); // Handle dark mode toggle
    const todoNameRef = useRef(); // Reference the entered todo name in the textbox

    // Runs once on render, loads todo list stored in local browser storage
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedTodos) setTodos(storedTodos);
    }, []);

    // Makes copy of todo list, sets given todo as checked, sets copy as active todo list
    function toggleTodo(id) {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.complete = !todo.complete;
        setTodos(newTodos);
    }

    // Runs every time todo list is updated, saves todo list to browser storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    // Adds new item with unique UUID and given name to copy of list, sets copy as active todo list
    function handleAddTodo(e) {
        const name = todoNameRef.current.value;
        if (name === "") return;
        setTodos((prevTodos) => {
            return [
                ...prevTodos,
                { id: uuidv4(), name: name, complete: false },
            ];
        });
        todoNameRef.current.value = null;
    }

    // Filters copy of todo list of completed items, sets copy as active todo list
    function handleClearTodos() {
        const newTodos = todos.filter((todo) => !todo.complete);
        setTodos(newTodos);
    }

    // Sets active todo list to a blank array
    function handleClearAllTodos() {
        setTodos([]);
    }

    // Sets dark boolean to opposite of itself
    // Dark mode is handled by TailwindCSS by adding a 'dark' class to the topmost parent element
    // Class is added conditionally inline by the [dark, setDark] useState hook  
    function toggleDark() {
        setDark(!dark)
    }

    // Dark mode switch component
    function DarkSwitch() {
        return (
            <div className="sm:absolute bottom-0 sm:pb-4 pb-1">
                <motion.button
                    className="bg-white dark:bg-slate-900 p-3 rounded-full"
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleDark}
                >
                    <p className="text-sm font-extralight dark:text-white">
                        Toggle {dark ? "Light" : "Dark"} Mode { /* Example of changing conditionally using dark hook. Same thing but inside a className */}
                    </p>
                </motion.button>
            </div>
        );
    }

    // Title component. Contains Title, Subtitle, Author
    function Title() {
        return (
            <div className="flex flex-col justify-center items-center sm:absolute top-0 2xl:pt-8 pt-2">
                <h1 className="2xl:text-7xl xl:text-5xl text-2xl font-black tracking-tighter dark:text-white duration-75">
                    Todo List
                </h1>
                <h3 className="2xl:text-2xl xl:text-xl text-lg font-normal tracking-tighter dark:text-white duration-75">
                    Beginner React Project
                </h3>
                <h5 className="2xl:text-lg xl:text-lg text-sm font-extralight tracking-tighter dark:text-white duration-75">
                    Made by Matthew Arthur
                </h5>
            </div>
        );
    }

    // Main Frame containing the todolist and its controls
    function TodoListFrame() {
        return (
            <div className="bg-white dark:bg-slate-900 p-6  rounded-3xl duration-150 shadow-2xl dark:shadow-slate-700 w-full sm:w-min">
                <TodoList todos={todos} toggleTodo={toggleTodo} />
                <div className="w-full p-2 pt-4 relative flex justify-center items-center pb-6">
                    <p className="font-thin absolute text-center pl-2 pr-2 bg-white dark:bg-slate-900 dark:text-white duration-150 z-10">
                        {todos.filter((todo) => !todo.complete).length} left to
                        do
                    </p>
                    <div className="w-full h-[1px] bg-black absolute bg-gradient-to-r from-white via-gray-300 to-white dark:from-slate-900 dark:via-slate-700 dark:to-slate-900 duration-150"></div>
                </div>
                <div className="flex flex-col gap-1">
                    <input
                        ref={todoNameRef}
                        type="text"
                        placeholder="Type your todo item here"
                        className="bg-gray-200 dark:text-white dark:bg-slate-500 dark:border-slate-500 font-extralight rounded-md p-2 outline-none focus:border-gray-500 dark:focus:border-slate-400 border-[1px] duration-200"
                    />
                    <motion.button
                        className="bg-slate-200 dark:bg-slate-700 dark:text-white tracking-tighter font-bold rounded-lg p-1 hover:bg-slate-300 dark:hover:bg-slate-600 duration-75"
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddTodo}
                    >
                        Add Todo
                    </motion.button>
                    <motion.button
                        className="bg-slate-200 dark:bg-slate-700 dark:text-white tracking-tighter font-bold rounded-lg p-1 hover:bg-slate-300 dark:hover:bg-slate-600 duration-75"
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClearTodos}
                    >
                        Clear Completed
                    </motion.button>
                    <motion.button
                        className="bg-slate-400 dark:bg-slate-800 dark:text-white tracking-tighter font-bold rounded-lg p-1 hover:bg-slate-500 dark:hover:bg-slate-600 hover:text-white duration-75"
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClearAllTodos}
                    >
                        Clear All
                    </motion.button>
                </div>
            </div>
        );
    }

    // Finally, return app 
    return (
        <div className={dark ? "dark overflow-hidden" : "overflow-hidden"}>
            <div className="bg-slate-300 dark:bg-slate-800 w-screen h-screen flex flex-col gap-2 items-center justify-between sm:justify-center sm:items-center duration-500 sm:p-0 p-3">
                <Title />
                <TodoListFrame />
                <DarkSwitch />
            </div>
        </div>
    );
}

export default App;
