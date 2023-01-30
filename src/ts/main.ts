import { addTodo, changeTodo, removeAllTodos } from "./functions";
import { Todo } from "./models/Todo";

// Creates a variable called todos that parses the json data to local storage, if no data it creates and empty array.
let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

// Clears todos from localstorage with the click of a button
document.getElementById("clearTodos")?.addEventListener("click", () => {
  clearTodos(todos);
});

// Takes the text from input and creates a new Todo with the value.
(document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
  "submit",
  (e: SubmitEvent) => {
    e.preventDefault();

    let todoText: string = (
      document.getElementById("newTodoText") as HTMLInputElement
    ).value;
    // Creates todo with data from todoText and puts it into todos []
    createNewTodo(todoText, todos);
  }
);
// Creates todo and if failed it throws an
export function createNewTodo(todoText: string, todos: Todo[]) {
  let result = addTodo(todoText, todos);

  if (result.success) {
    exports.createHtml(todos);
  } else {
    displayError(result.error, true);
  }
}

// Stores current state in localStorage -> Selects <ul> with id "todos" -> Gives it the variable todosContainer -> sets inner html to an empty string
// and clears it of all it's children -> Loops throught the array and for each todo -> checks if todos are done and gives it a class ->
// adds event listener when clicking a list item that makes the todo done | not done -> Writes out the list element

// TLDR  The function creates an HTML list of todo items based on the provided "todos" array, and updates the local storage.
export function createHtml(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));

  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement;

  todosContainer.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    let li: HTMLLIElement = document.createElement("li");

    if (todos[i].done) {
      li.classList.add("todo__text--done");
    }

    li.classList.add("todo__text");
    li.innerHTML = todos[i].text;
    li.addEventListener("click", () => {
      toggleTodo(todos[i]);
    });

    todosContainer.appendChild(li);
  }
}

// Changes todo status Done | Not Done -> updates the list with new value
export function toggleTodo(todo: Todo) {
  changeTodo(todo);
  exports.createHtml(todos);
}

// If less than 3 symbols are used in input -> shows an error div -> If 3+ are used it hides the error div in the DOM
export function displayError(error: string, show: boolean) {
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement;

  errorContainer.innerHTML = error;

  if (show) {
    errorContainer.classList.add("show");
  } else {
    errorContainer.classList.remove("show");
  }
}

// Clears the todo array/list of all todo tasks.
export function clearTodos(todos: Todo[]) {
  removeAllTodos(todos);
  exports.createHtml(todos);
}

// kommentera bort när jag ska göra test!!!
// createHtml(todos);
