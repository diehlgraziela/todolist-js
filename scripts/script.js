//Element selection
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const editForm = document.getElementById('edit-form');
const editInput = document.getElementById('edit-input');
const cancelEditBtn = document.getElementById('cancel-edit-button');
const searchInput = document.getElementById('search-input');
const searchErase = document.getElementById('erase-button');
const filter = document.getElementById('filter');

let oldInputValue;

//Functions
const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })
}

const searchTodo = (e) => {
    //get search value
    const search = e.target.value.toLowerCase();
    //get all todos
    const todos = document.querySelectorAll(".todo");

    //array for each todo
    todos.forEach((todo) => {
        //get todo title and transform it to lower case
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        //display all todos
        todo.style.display = "flex";

        //if todo title doesn't include what the user searched
        if (!todoTitle.includes(search)) {
            //hide the todo
            todo.style.display = "none";
        }
    })
}

const filterTodo = (e) => {
    //get selected option
    const option = e.target.value;
    //get all todos
    const todos = document.querySelectorAll(".todo");

    switch (option) {
        //if selected option is "all"
        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"));
            break;

        case "done":
            todos.forEach((todo) => {
                //if todo contains "done" option
                if (todo.classList.contains("done")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            })
            break;

        case "todo":
            todos.forEach((todo) => {
                //if todo doesn't contain "done" option
                if (!todo.classList.contains("done")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            })
            break;

        default:
            break;
    }
}

//Events
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }
})

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    //add aria label on todo list for accessibility
    let finish = document.querySelectorAll('.finish-todo');
    let edit = document.querySelectorAll('.edit-todo');
    let remove = document.querySelectorAll('.remove-todo');

    for (let button of finish) {
        button.setAttribute('aria-label', "Finalizar");
    }

    for (let button of edit) {
        button.setAttribute('aria-label', "Editar");
    }

    for (let button of remove) {
        button.setAttribute('aria-label', "Remover");
    }
})

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
})

searchInput.addEventListener('keyup', searchTodo);

filter.addEventListener('change', filterTodo);

searchErase.addEventListener('click', (e) => {
    e.preventDefault();
    searchInput.value = "";
    searchInput.dispatchEvent(new Event('keyup'));
})