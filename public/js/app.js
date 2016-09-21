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
// 	console.log(dbRefList.numChildren());
	
// 	remove comments bellow after add loading
// 	dbRefList.on('value', snap => {
// 	  var value = snap.numChildren();
// 	  if (value === 0) {
// 	    var loading = document.getElementById("loading");
// 		  loading.innerHTML = "Lista Vazia";
// 	  }
// 	});

	// Sync list changes
	dbRefList.on('child_added', snap => {
		const li = document.createElement('li');
		li.id = snap.key;
		var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id   = 'checkbox';
    if (snap.val().completed) {
		  li.classList.add("toggled");
		  cb.checked = true;
		}
    li.appendChild(cb);
    var label = document.createElement('label');
    label.innerHTML = snap.val().description;
    li.appendChild(label);
    
    
		deleteButton = document.createElement('button');
		deleteButton.id = "deleteButton";
		// deleteButton.title = "Remover tarefa";
		deleteButton.innerText = "delete";
		li.appendChild(deleteButton);
		load = false;
		ulList.appendChild(li);
		
		//loading
		// remove comments bellow
		// var loading = document.getElementById("loading");
		// loading.style.display = 'none';
		
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
	    var task = {
	      description: "",
	      completed: false
	    }
	    task.description = todoTextInput.value;
	    dbRefList.push(task);
			todoTextInput.value = '';
	   // if (todoTextInput.value === "") {
	   //   alert("Por favor digite a descrição da tarefa")
	   // } else {
	   //   task.description = todoTextInput.value;
			 // dbRefList.push(task);
			 // todoTextInput.value = '';
	   // }
	  }
	});
	var todosUl = document.querySelector('ul');
	todosUl.addEventListener('click', function (event) {
	  var elementClicked = event.target;
    if (elementClicked.id === 'deleteButton') {
      dbRefList.child(elementClicked.parentNode.id).remove();
      // result = window.confirm("Tem certeza que desja remover essa tarefa?");
      // if(result) {
      //   dbRefList.child(elementClicked.parentNode.id).remove();
      // }
    } else if (elementClicked.id === 'checkbox') {
      if (!elementClicked.parentNode.classList.value.includes("toggled")) {
        elementClicked.parentNode.classList.add("toggled");
        dbRefList.child(elementClicked.parentNode.id).update({completed: true});
      } else {
        elementClicked.parentNode.classList.remove("toggled");
        dbRefList.child(elementClicked.parentNode.id).update({completed: false});
      }
		}
	});
}());
