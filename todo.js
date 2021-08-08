const root = document.querySelector("#root");

const form = document.createElement("form");
const input = document.createElement("input");
const button = document.createElement("button");
const todos = document.createElement("div");
const footer = document.createElement("div");
const statePanel = document.createElement("div");
const footerDeleteBtn = document.createElement("button");


form.classList.add("todo-form");
input.classList.add("user-input");
button.classList.add("add-todo-btn");
todos.classList.add("todos");
footer.classList.add("footer");
statePanel.classList.add("state-panel");
footerDeleteBtn.classList.add("footer-delete-btn");

input.placeholder = "What needs to be done?";
button.innerText = "Add";
statePanel.innerText = "0 / 0 Completed";
footerDeleteBtn.innerText = "Clear Completed"

form.append(input, button);
root.append(form);
root.append(todos);
footer.append(statePanel);
footer.append(footerDeleteBtn);
root.append(footer);

let todoList = [];

function TodoItem(text) {
    this.text = text;
    this.isDone = false;
    this.id = Date.now();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value === "") {
        return;
    }

    const todoText = input.value;
    const newTodoItem = new TodoItem(todoText);
    todoList.unshift(newTodoItem);
    input.value = "";
    render(todoList);
})

footerDeleteBtn.addEventListener("click", (event) => {
    todoList = todoList.filter(todo => !todo.isDone);
    render(todoList);
})

function createTodoElement(todoItem) {
    const todo = document.createElement("div");
    const checkbox = document.createElement("input");
    const textArea = document.createElement("todoText");
    const deleteBtn = document.createElement("button");

    todo.classList.add("todo-item");
    checkbox.classList.add("checkbox");
    textArea.classList.add("todo-text");
    deleteBtn.classList.add("delete-todo");

    checkbox.type = "checkbox";
    deleteBtn.innerText = "X";

    checkbox.checked = todoItem.isDone;
    textArea.innerText = todoItem.text;
    deleteBtn.id = todoItem.id;

    todo.append(checkbox);
    todo.append(textArea);
    todo.append(deleteBtn);

    checkbox.addEventListener("change", (event) => {
        todoItem.isDone = !todoItem.isDone;
        render(todoList);
    })

    deleteBtn.addEventListener("click", (event) => {
        todoList = todoList.filter((todo) => todo.id !== Number(event.target.id));
        render(todoList);
    })

    return todo;
}

function render(todoList) {
    todos.innerHTML = "";
    todoList.forEach(todo => {
        todos.append(createTodoElement(todo));
    })
    const checkedTodos = todoList.filter((todo) => todo.isDone);
    statePanel.innerText = `${checkedTodos.length} / ${todoList.length} Completed`;
}


