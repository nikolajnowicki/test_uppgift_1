/**
 * @jest-environment jsdom
 */

// import { displayError } from "../ts/main";
import * as main from "../ts/main";
import * as functions from "../ts/functions";
import { Todo } from "../ts/models/Todo";

//------------------------------------------//
// Error Div Test
//------------------------------------------//

describe("Should add or remove css div class depending on argument value", () => {
  test("Will remove class 'show' if argument is true", () => {
    // Arrange

    let errorText = "An error has occured";
    document.body.innerHTML = `<div id="error" class="error"></div>
    `;

    // Act

    main.displayError(errorText, true);

    // Assert

    let result = document.getElementById("error") as HTMLDivElement;
    expect(result.classList.contains("show")).toBe(true);
  });

  test("should remove class 'show' if argument is false", () => {
    // Arrange

    let errorText = "An error has occured";
    document.body.innerHTML = `<div id="error" class="error"></div>
    `;

    // Act

    main.displayError(errorText, false);

    // Assert

    let result = document.getElementById("error") as HTMLDivElement;
    expect(result.classList.contains("show3")).toBe(false);
  });
});

//------------------------------------------//
// My Todo Tests
//------------------------------------------//

describe("Todo List Tests", () => {
  test("should call 'removeAllTodos' correctly", () => {
    // Arrange

    let spyOnRemoveAllTodos = jest
      .spyOn(functions, "removeAllTodos")
      .mockReturnValue();
    let spyOnCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();

    // Act

    main.clearTodos([]);

    // Assert

    expect(spyOnRemoveAllTodos).toHaveBeenCalled();
    expect(spyOnRemoveAllTodos).toBeCalledTimes(1);
    spyOnCreateHtml.mockRestore();
  });

  test("should call 'createHtml' correctly", () => {
    // Arrange

    let spyOnCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();

    // Act

    main.clearTodos([]);

    // Assert

    expect(spyOnCreateHtml).toHaveBeenCalled();
    expect(spyOnCreateHtml).toBeCalledTimes(1);
    spyOnCreateHtml.mockRestore();
  });

  test("Should toggle Todo", () => {
    // Arrange

    document.body.innerHTML = ` <ul id="todos" class="todo">
    <li class="Todo 1</li>
    <li class="Todo 2</li>
    </ul>`;

    const todos: Todo[] = [
      { text: "Todo 1", done: false },
      { text: "Todo 2", done: false },
    ];

    const spyTodoStatus = jest.spyOn(functions, "changeTodo");

    // Act

    main.toggleTodo(todos[0]);

    // Assert
    expect(spyTodoStatus).toHaveBeenCalled();
    expect(spyTodoStatus).toBeCalledTimes(1);
    spyTodoStatus.mockRestore();
  });

  test("Create a new todo and add it to DOM", () => {
    // Arrange
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    let text: string = "String of text";
    let todos: Todo[] = [];

    // Act
    main.createNewTodo(text, todos);

    let structure = document.querySelector("#todos")?.innerHTML;
    let createLi = `<li class="todo__text">String of text</li>`;
    let output = document.querySelector(".todo__text")?.innerHTML;

    // Assert
    expect(output).toBe("String of text");
    expect(structure).toBe(createLi);
  });

  test("Should not create a new todo", () => {
    //Arrange
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let text: string = "A";
    let todos: Todo[] = [];

    //Act
    main.createNewTodo(text, todos);

    let output = document.querySelector("#error")?.classList.contains("show");

    //Assert
    expect(output).toBe(true);
  });
});
