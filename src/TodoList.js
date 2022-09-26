import Todo from "./Todo";
import React from "react";
import { ReactComponent as NothingHere } from "./img/undraw_no_data_re_kwbl.svg";

// toggleTodo passed from App.js, further into Todo
function TodoList({ todos, toggleTodo }) {
    if (todos.length === 0)
        return (
            <div className="w-full h-32 flex justify-center items-center overflow-hidden">
                <h1 className="md:text-lg w-52 break-words text-sm text-center font-black tracking-tighter absolute dark:text-white z-10 duration-150">
                    It's quite empty here. Add a todo to get started.
                </h1>
                <NothingHere className="h-full pb-4 fill-slate-700 dark:fill-gray-900 dark:invert duration-150" />
            </div>
        );
    return (
        <div className="max-w-full pb-4 flex flex-col gap-2 2xl:max-h-64 max-h-32 overflow-y-scroll no-scrollbar">
            {todos.map((todo) => {
                return (
                    <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
                );
            })}
        </div>
    );
}

export default TodoList;
