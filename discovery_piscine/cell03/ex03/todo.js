const todoList = document.getElementById("ft_list");
const newTodoButton = document.getElementById("new-todo");
const emptyState = document.getElementById("empty-state");
const cookieName = "ft_list";
let todos = loadTodos();

function loadTodos() {
  const cookiePrefix = `${cookieName}=`;
  let cookieString;

  try {
    cookieString = document.cookie;
  } catch {
    return [];
  }

  const cookie = cookieString
    .split(";")
    .map(function (entry) {
      return entry.trim();
    })
    .find(function (entry) {
      return entry.startsWith(cookiePrefix);
    });

  if (!cookie) {
    return [];
  }

  try {
    const savedTodos = JSON.parse(decodeURIComponent(cookie.slice(cookiePrefix.length)));
    return Array.isArray(savedTodos)
      ? savedTodos.filter(function (todo) {
          return typeof todo === "string" && todo.trim() !== "";
        })
      : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  try {
    if (todos.length === 0) {
      document.cookie = `${cookieName}=; max-age=0; path=/`;
      return;
    }

    const encodedTodos = encodeURIComponent(JSON.stringify(todos));
    document.cookie = `${cookieName}=${encodedTodos}; max-age=31536000; path=/; SameSite=Lax`;
  } catch {
    // Keep the task usable for this session if the browser blocks cookies.
  }
}

function createTodoElement(todo) {
  const item = document.createElement("div");
  item.className = "todo-item";
  item.tabIndex = 0;
  item.textContent = todo;
  return item;
}

function renderTodos() {
  todoList.replaceChildren();

  todos.forEach(function (todo) {
    todoList.appendChild(createTodoElement(todo));
  });

  emptyState.hidden = todos.length > 0;
}

newTodoButton.addEventListener("click", function () {
  const answer = window.prompt("Enter a new task:");

  if (answer === null) {
    return;
  }

  const todo = answer.trim();

  if (todo === "") {
    window.alert("Please enter a task.");
    return;
  }

  todos.unshift(todo);
  renderTodos();
  saveTodos();
});

todoList.addEventListener("click", function (event) {
  const item = event.target.closest(".todo-item");

  if (!item || !todoList.contains(item)) {
    return;
  }

  if (!window.confirm(`Remove this task?\n\n${item.textContent}`)) {
    return;
  }

  const todoIndex = Array.from(todoList.children).indexOf(item);
  todos.splice(todoIndex, 1);
  item.remove();
  emptyState.hidden = todos.length > 0;
  saveTodos();
});

todoList.addEventListener("keydown", function (event) {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".todo-item")) {
    event.preventDefault();
    event.target.click();
  }
});

renderTodos();

window.setInterval(function () {
  window.alert("Please, use me...");
}, 30000);
