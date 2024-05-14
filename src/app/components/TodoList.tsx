"use client";
import React, { useState } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa"; // Importing icons

interface TodoItem {
  id: number;
  text: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: "Make Todo" },
    { id: 2, text: "Learn React" },
  ]);

  //State Declarations
  const [inputValue, setInputValue] = useState<string>(""); // State for the input field value
  const [editingId, setEditingId] = useState<number | null>(null); // State to track the id of the todo currently being edited.
  const [editText, setEditText] = useState<string>(""); // 

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: todos.length + 1,
        text: inputValue,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const startEdit = (todo: TodoItem) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row mb-4">
        <input
          type="text"
          className="mb-2 sm:mb-0 sm:mr-2 p-2 border border-purple-500 rounded flex-grow"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your task"
        />
        <button
          onClick={addTodo}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-100 p-4 mb-2"
          >
            {editingId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-0 sm:flex-grow rounded p-1 sm:p-2"
              />
            ) : (
              <span>{todo.text}</span>
            )}

            <div className="flex gap-2">
              {editingId === todo.id ? (
                <button
                  className=" text-green-500 hover:text-green-600 mx-1 sm:mx-2"
                  onClick={saveEdit}
                >
                  <FaSave />
                </button>
              ) : (
                <button
                  className=" text-purple-500 hover:text-purple-600 mx-2"
                  onClick={() => startEdit(todo)}
                >
                  <FaEdit />
                </button>
              )}

              <button
                className=" text-red-500 hover:text-red-600"
                onClick={() => removeTodo(todo.id)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
