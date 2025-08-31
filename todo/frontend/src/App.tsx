import type { FormEvent } from "react";
import "./App.css";

function App() {
  function submitHandler(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <div className="wrapper">
        <header>
          <h1 className="text-center bold text-header bg-white">Todo App</h1>
        </header>
        <main className="">
          <form className="todo-form">
            <input placeholder="Add a new todo..." type="text" />
            <button
              className="submit-button"
              type="submit"
              aria-label="Add todo"
              onSubmit={submitHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-plus-icon lucide-plus"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default App;
