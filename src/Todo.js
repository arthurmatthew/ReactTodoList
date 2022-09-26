import { useRef } from "react";

// toggleTodo is passed into this component from App.js. 
// This allows this component to 'remotely access' the hooks which are
// private to App.js
function Todo({ todo, toggleTodo }) {
    const labelRef = useRef();

    function handleTodoClick(e) {
        toggleTodo(todo.id);
    }

    return (
        <div>
            <label
                ref={labelRef}
                className="flex gap-2 bg-gray-100 dark:bg-slate-800 p-2 rounded-md duration-100 w-full"
            >
                <input
                    type="checkbox"
                    checked={todo.complete}
                    onChange={handleTodoClick}
                />
                <p className="font-black tracking-tighter text-xl dark:text-gray-100 break-all">
                    {todo.name}
                </p>
            </label>
        </div>
    );
}

export default Todo;
