var todoList = {
	items: [],
	addTodo: function (description) {
		this.items.push({
			description: description,
			completed: false
		});
	},
	changeTodo: function (position, description) {
		this.items[position].description = description;
	},
	deleteTodo: function(position) {
		this.items.splice(position, 1);
	},
	toggleCompleted: function (position) {
		var todo = this.items[position];
		todo.completed = !todo.completed;
	},
	toggleAll: function () {
		var totalTodos = this.items.length;
		var completedTodos = 0;

	
		this.items.forEach(function (todo) {
			if (todo.completed) {
				completedTodos++;
			}
		});

		this.items.forEach(function (item) {
			if (completedTodos === totalTodos) {
				item.completed = false;
			} else {
				item.completed = true;
			}
		});
	}
};

var handler = {
	displayTodos: function () {
		view.displayTodos();
	},
	toggleAll: function () {
		todoList.toggleAll();
		view.displayTodos();
	},
	addTodo: function () {
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = '';
		view.displayTodos();
	},
	changeTodo: function () {
		var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
		var changeTodoTextInput = document.getElementById('changeTodoTextInput');
		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
		changeTodoPositionInput.value = '';
		changeTodoTextInput.value = '';
		view.displayTodos();
	},
	deleteTodo: function (position) {
		todoList.deleteTodo(position);
		view.displayTodos();
	},
	toggleCompleted: function (position) {
		todoList.toggleCompleted(position);
		view.displayTodos();
	}
};

var view = {
	displayTodos: function () {
		var todosUl = document.querySelector('ul');
		todosUl.innerHTML = '';
		todoList.items.forEach(function (item, position) {
			var todoLi = document.createElement('li');
			var todoTextWithcompletion = '';

			if (item.completed) {
				todoTextWithcompletion = '(x) ' + item.description;
			} else {
				todoTextWithcompletion = '( ) ' + item.description;
			}

			todoLi.id = position;
			todoLi.textContent = todoTextWithcompletion;
			todoLi.appendChild(this.createCheckbox(position, item.completed));
			todoLi.appendChild(this.createButton('delete'));
			todosUl.appendChild(todoLi);

		}, this);
	},
	createCheckbox: function (position, completed) {
	  var checkbox = document.createElement('input');
	  checkbox.type = 'checkbox';
	  checkbox.id = 'checkbox';
	  checkbox.value = position;
	  
	  if (completed) {
	    checkbox.checked = "true";
	  }
	  return checkbox;
	},
	createButton: function (buttonType) {
	  var button = document.createElement('button');
	  button.textContent = buttonType;
	  button.className = buttonType + 'Button';
	  return button;
	},
	setupEventListeners: function () {
		var todosUl = document.querySelector('ul');
		todosUl.addEventListener('click', function (event) {
			var elementClicked = event.target;
			if (elementClicked.className === 'deleteButton') {
				handler.deleteTodo(elementClicked.parentNode.id);
			} else if (elementClicked.id === 'checkbox') {
			  console.log(elementClicked);
			  handler.toggleCompleted(elementClicked.parentNode.id);
			  elementClicked.setAttribute("checked", "true");
			  console.log(elementClicked);
			}
		});
		
		// listener for enter key for insert task
		var todoTextInput = document.getElementById('addTodoTextInput');
		todoTextInput.addEventListener('keypress', function (event) {
		  var key = event.which || event.keyCode;
		  if (key === 13) { // 13 is enter
        handler.addTodo();
      }
		});
	}
};

view.setupEventListeners();