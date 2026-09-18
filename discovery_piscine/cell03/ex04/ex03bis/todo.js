$(function () {
  const $todoList = $("#ft_list");
  const $newTodoButton = $("#new-todo");
  const $emptyState = $("#empty-state");
  const cookieName = "ft_list";
  let todos = loadTodos();

  function loadTodos() {
    let cookieString;

    try {
      cookieString = document.cookie;
    } catch {
      return [];
    }

    const cookiePrefix = `${cookieName}=`;
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
    return $("<div>")
      .addClass("todo-item")
      .attr("tabindex", 0)
      .text(todo);
  }

  function renderTodos() {
    $todoList.empty();

    $.each(todos, function (_index, todo) {
      $todoList.append(createTodoElement(todo));
    });

    $emptyState.prop("hidden", todos.length > 0);
  }

  $newTodoButton.on("click", function () {
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

  $todoList.on("click", ".todo-item", function (event) {
    const $item = $(event.target).closest(".todo-item");

    if (!$item.length || !$item.parent().is($todoList)) {
      return;
    }

    if (!window.confirm(`Remove this task?\n\n${$item.text()}`)) {
      return;
    }

    const todoIndex = $todoList.children(".todo-item").index($item);
    todos.splice(todoIndex, 1);
    $item.remove();
    $emptyState.prop("hidden", todos.length > 0);
    saveTodos();
  });

  $todoList.on("keydown", ".todo-item", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      $(this).trigger("click");
    }
  });

  renderTodos();

  window.setInterval(function () {
    window.alert("Please, use me...");
  }, 30000);
});
