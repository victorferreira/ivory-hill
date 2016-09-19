// var todoList = {
// 	items: [],
// 	addTodo: function (description) {
// 		this.items.push({
// 			description: description,
// 			completed: false
// 		});
// 	},
// 	changeTodo: function (position, description) {
// 		this.items[position].description = description;
// 	},
// 	deleteTodo: function(position) {
// 		this.items.splice(position, 1);
// 	},
// 	toggleCompleted: function (position) {
// 		var todo = this.items[position];
// 		todo.completed = !todo.completed;
// 	},
// 	toggleAll: function () {
// 		var totalTodos = this.items.length;
// 		var completedTodos = 0;


// 		this.items.forEach(function (todo) {
// 			if (todo.completed) {
// 				completedTodos++;
// 			}
// 		});

// 		this.items.forEach(function (item) {
// 			if (completedTodos === totalTodos) {
// 				item.completed = false;
// 			} else {
// 				item.completed = true;
// 			}
// 		});
// 	}
// };

// var handler = {
// 	displayTodos: function () {
// 		view.displayTodos();
// 	},
// 	toggleAll: function () {
// 		todoList.toggleAll();
// 		view.displayTodos();
// 	},
// 	addTodo: function () {
// 		var addTodoTextInput = document.getElementById('addTodoTextInput');
// 		todoList.addTodo(addTodoTextInput.value);
// 		addTodoTextInput.value = '';
// 		view.displayTodos();
// 	},
// 	changeTodo: function () {
// 		var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
// 		var changeTodoTextInput = document.getElementById('changeTodoTextInput');
// 		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
// 		changeTodoPositionInput.value = '';
// 		changeTodoTextInput.value = '';
// 		view.displayTodos();
// 	},
// 	deleteTodo: function (position) {
// 		todoList.deleteTodo(position);
// 		view.displayTodos();
// 	},
// 	toggleCompleted: function (position) {
// 		todoList.toggleCompleted(position);
// 		view.displayTodos();
// 	}
// };

// var view = {
// 	displayTodos: function () {
// 		var todosUl = document.querySelector('ul');
// 		todosUl.innerHTML = '';
// 		todoList.items.forEach(function (item, position) {
// 			var todoLi = document.createElement('li');

// 			todoLi.id = position;
// 			todoLi.appendChild(this.createCheckbox(position, item.completed));
// 			var label = document.createElement('label');
// 			label.innerHTML = item.description;
// 			todoLi.appendChild(label);
// 			todoLi.classList.add("mdl-list__item");
// 			if(item.completed){
// 			  todoLi.childNodes[1].classList.add("toggled");
// 			} else {
// 			  todoLi.childNodes[1].classList.remove("toggled");
// 			}
// 			todoLi.appendChild(this.createButton('delete'));
// 			todosUl.appendChild(todoLi);

// 		}, this);
// 	},
// 	createCheckbox: function (position, completed) {
// 	  var checkbox = document.createElement('input');
// 	  checkbox.type = 'checkbox';
// 	  checkbox.id = 'checkbox';
// 	  checkbox.value = position;

// 	  if (completed) {
// 	    checkbox.checked = "true";
// 	  }
// 	  return checkbox;
// 	},
// 	createButton: function (buttonType) {
// 	  var button = document.createElement('button');
// 	  button.textContent = buttonType;
// 	  button.id = buttonType + 'Button';
// 	  button.className += " mdl-button mdl-js-button mdl-button--raised";
// 	  return button;
// 	},
// 	setupEventListeners: function () {
// 		var todosUl = document.querySelector('ul');
// 		todosUl.addEventListener('click', function (event) {
// 			var elementClicked = event.target;
// 			if (elementClicked.id === 'deleteButton') {
// 				handler.deleteTodo(elementClicked.parentNode.id);
// 			} else if (elementClicked.id === 'checkbox') {
// 			  handler.toggleCompleted(elementClicked.parentNode.id);
// 			}
// 		});

// 		// listener for enter key for insert task
// 		var todoTextInput = document.getElementById('addTodoTextInput');
// 		todoTextInput.addEventListener('keypress', function (event) {
// 		  var key = event.which || event.keyCode;
// 		  if (key === 13) { // 13 is enter
//         handler.addTodo();
// 		  }
// 		});
// 	}
// };
// view.setupEventListeners();

(function(){
	var config = {
    apiKey: "AIzaSyD1y59bi2QVyM_IohEZc8_pZrc9uBLKIxE",
    authDomain: "ivory-hill.firebaseapp.com",
    databaseURL: "https://ivory-hill.firebaseio.com",
    storageBucket: "ivory-hill.appspot.com",
  };
  firebase.initializeApp(config);

  // Get elements
  // const preObject = document.getElementById('object');
	const ulList = document.getElementById('list')

  // Create Reference
  const dbRefObject = firebase.database().ref().child('inbox');
	const dbRefList = dbRefObject.child('taks');

	// Sync list changes
	dbRefList.on('child_added', snap => {
		const li = document.createElement('li');
		li.id = snap.key;
		var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id   = 'checkbox';
    li.appendChild(cb);
    var label = document.createElement('label');
    label.innerHTML = snap.val();
    li.appendChild(label);
		deleteButton = document.createElement('button');
		deleteButton.id = "deleteButton";
		deleteButton.innerText = "delete";
		li.appendChild(deleteButton);
		ulList.appendChild(li);
	});

	dbRefList.on('child_changed', snap => {
		const liChanged = document.getElementById(snap.key);
		liChanged.innerText = snap.val();
	});

	dbRefList.on('child_removed', snap => {
		const liToRemove = document.getElementById(snap.key);
		liToRemove.remove();
	});

	// listener for enter key for insert task
	var todoTextInput = document.getElementById('addTodoTextInput');
	todoTextInput.addEventListener('keypress', function (event) {
	  var key = event.which || event.keyCode;
	  if (key === 13) { // 13 is enter
			dbRefList.push(todoTextInput.value);
			todoTextInput.value = '';
	  }
	});
	var todosUl = document.querySelector('ul');
	todosUl.addEventListener('click', function (event) {
	  var elementClicked = event.target;
    if (elementClicked.id === 'deleteButton') {
      dbRefList.child(elementClicked.parentNode.id).remove();
    } else if (elementClicked.id === 'checkbox') {
      if (!elementClicked.parentNode.classList.value.includes("toggled")) {
        elementClicked.parentNode.classList.add("toggled");
      } else {
        elementClicked.parentNode.classList.remove("toggled");
      }
		}
	});
}());
