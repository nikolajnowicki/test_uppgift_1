import {
  changeTodo,
  removeAllTodos,
  sortTodos,
  addTodo,
} from "../ts/functions";
import { Todo } from "../ts/models/Todo";

test("Should remove allTodos", () => {
  // Arrange
  let Todos: Todo[] = [
    {
      text: "test",
      done: true,
    },
  ];

  // Act
  removeAllTodos(Todos);

  // Assert
  expect(Todos.length).toBe(0);
});

//------------------------------------------//
// Own Todo Sort function
//------------------------------------------//

test("Done todos at the bottom", () => {
  //Arrange
  let todos = [
    { text: "test", done: true },
    { text: "false", done: false },
  ];

  let output = [
    { text: "false", done: false },
    { text: "test", done: true },
  ];

  //Act
  sortTodos(todos);

  //Assert
  expect(todos).toEqual(output);
});
