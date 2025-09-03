import { useState, type FormEvent } from "react";
import "./App.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { InsertTodo, SelectTodo } from "@/db/schema";
import { queryClient } from "./main";
import TodoCardList from "./components/TodoCardList";

import axios from "axios";

function App() {
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  const getTodos = async (): Promise<SelectTodo[]> => {
    const response = await axios.get<SelectTodo[]>("/api/todos");
    return response.data;
  };

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const mutation = useMutation({
    mutationFn: (newTodo: InsertTodo) => {
      return axios.post("/api/todos", newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  function submitHandler(e: FormEvent) {
    e.preventDefault();
    mutation.mutate({
      content,
      dueDate: new Date(),
      userId: 2,
    });
  }

  const todos: SelectTodo[] = todosQuery.data ?? [];

  return (
    <>
      <div className="wrapper">
        <header>
          <h1 className="text-center bold text-header bg-white">Todo App</h1>
        </header>
        <main className="">
          <div className="form-wrapper">
            <form onSubmit={submitHandler} className="todo-form">
              <input
                placeholder="Add a new todo..."
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <input
                type="date"
                value={dueDate.toISOString().split("T")[0]}
                onChange={(e) => setDueDate(new Date(e.target.value))}
              />
              <button
                className="submit-button"
                type="submit"
                aria-label="Add todo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-plus-icon lucide-plus"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </button>
            </form>
          </div>

          <TodoCardList todos={todos} />
        </main>
      </div>
    </>
  );
}

export default App;
