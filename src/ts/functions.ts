import { IAddResponse } from "./models/IAddResult";
import { Todo } from "./models/Todo";

// If 3+ characters are used a todo is created -> if not then throw error
export function addTodo(todoText: string, todos: Todo[]): IAddResponse {
  if (todoText.length > 2) {
    let newTodo = new Todo(todoText, false);
    todos.push(newTodo);
    return { success: true, error: "" };
  } else {
    return { success: false, error: "Du måste ange minst tre bokstäver" };
  }
}

// changes todo status to completed
export function changeTodo(todo: Todo) {
  todo.done = !todo.done;
}

// Clears the array with todos
export function removeAllTodos(todos: Todo[]) {
  todos.splice(0, todos.length);
}

// Sorts todo list
export function sortTodos(todos: Todo[]) {
  todos.sort((x, y) => {
    if (x.done === y.done) {
      return 0;
    }
    return x.done ? 1 : -1;
  });
}
