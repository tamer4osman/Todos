var todosApp = {
    
        // create empty TodosList
        toDosList: [],
    
        // create method to add one todo
        addToDo: function (addedText) { 
                  if(addedText!=='')
                  this.toDosList.push({ text: addedText, completed: false });
                  },
    
        // create method to change old todo to new todo
        editToDo: function (oldText, newText) {
            for (var i in this.toDosList) {
                if (this.toDosList[i].text === oldText) {
                    this.toDosList[i].text = newText;
                };
            }
        },
        // create method to delete one todo
    
        /*   deleteToDo: function (text) {
               for (var i in this.toDosList) {
                   if (this.toDosList[i].text == text) {
                       this.toDosList.splice(i, 1);
                   }
               }
           },*/
    
        // create method to toggle one completed todo 
    
        toggleToDo: function (text) {
            for (var i in this.toDosList) {
                if (this.toDosList[i].text === text) {
                    this.toDosList[i].completed = !this.toDosList[i].completed;
                }
            }
        }
        // create method to toggle all todos
    
        /*,
        toggleAll: function () {
    
            var totalToDos = this.toDosList.length;
            var completedToDos = 0;
            for (var i in this.toDosList) {
                if (this.toDosList[i].completed === true) {
                    completedToDos++;
                }
            }
            // if all completed made all uncompleted
            if (totalToDos === completedToDos) {
                for (var i in this.toDosList) {
                    this.toDosList[i].completed = false
                }
            }
            else {
                for (var i in this.toDosList) {
                    this.toDosList[i].completed = true
                }
            }
        }*/
    
    }
    // handlers methods used to interactive between the DOM and functions in javascript
    var handlers = {
    
        //  method to toggle all todos with viwe it in DOM
    
        toggleAllToDos: function () {
            //todosApp.toggleAll();
            var totalToDos = todosApp.toDosList.length;
            var completedToDos = 0;
            // get the total of completed todos
            todosApp.toDosList.forEach(function (toDo) {
                if (toDo.completed) {
                    completedToDos++;
                }
            });
    
            // if all completed made all uncompleted else made all completed
    
            todosApp.toDosList.forEach(function (toDo) {
                if (totalToDos === completedToDos) {
                    toDo.completed = false;
                }
                else {
                    toDo.completed = true;
                }
            });
    
            viwe.viweToDos();
    
        },
    
        // method to take the text from input element and pass it to method add in todosList
    
        addToDo: function () {
            var todoInputText = window.document.getElementById("addToDoInputText");
            todosApp.addToDo(todoInputText.value);
            todoInputText.value = "";
            viwe.viweToDos();
        },
    
        /* method to take old text from first input element and replace it to
         new text from second input element and pass it to method edit in todosList*/
    
        editToDo: function () {
            var oldtodoInputText = window.document.getElementById("oldToDoInputText");
            var newtodoInputText = window.document.getElementById("newToDoInputText");
            todosApp.editToDo(oldtodoInputText.value, newtodoInputText.value);
            oldtodoInputText.value = "";
            newtodoInputText.value = "";
            viwe.viweToDos();
        },
    
        // method to delete one todo by there position in todosList and viwe the result in DOM
    
        deleteToDo: function (position) {
            todosApp.toDosList.splice(position, 1);
            viwe.viweToDos();
        },
    
        /* method to take the text from input element and found this text in todosList and 
        made it completed todo and viwe the result in DOM*/
    
        completedToDo: function (position) {
            /*var completedToDoInputText = window.document.getElementById("completedToDoInputText");
            todosApp.toggleToDo(completedToDoInputText.value);
            completedToDoInputText.value = "";*/
            todosApp.toDosList[position].completed=!todosApp.toDosList[position].completed;
            viwe.viweToDos();
        },
    
        // method to Delete all completed todos
    
        deleteCompleted: function () {
            todosApp.toDosList.forEach(function (toDo, position) {
                if (toDo.completed === true) {
                    todosApp.toDosList.splice(position, 1);
                };
                viwe.viweToDos();
            })
        }
    }
    
    var viwe = {
    
        // method to represent and viwe the todosList in DOM
    
        viweToDos: function () {
    
            //select the unordered list
    
            var toDoUl = window.document.querySelector("ul");
    
            // clear he unordered list
    
            toDoUl.innerHTML = "";
    
            todosApp.toDosList.forEach(function (toDo, position) {
    
                // create new list item
    
                var toDoLi = document.createElement("li");
                var toDoSpan = document.createElement("span");
                toDoSpan.textContent = toDo.text;
    
                
                
                
    
                //add the text to this list item
    
                /*if (toDo.completed === true) {
                    toDoLi.textContent = '(X) ' + toDo.text
                    
                }
                else {
                    toDoLi.textContent = '( ) ' + toDo.text
                }*/
    
                // append the list item to unordered list
    
                
    
                toDoUl.appendChild(toDoLi);
    
                toDoLi.appendChild(this.addToggleCheckBox(position));
                toDoLi.appendChild(toDoSpan);
                // append delete button to list item
    
                toDoLi.appendChild(this.addDeleteButton());
    
                
                toDoLi.id = position;
    
                // give the list item id depend on the todo position
            }, this)
        },
    
        // method to add Delete button for each todo in DOM 
    
        addDeleteButton: function () {
            var deleteButton = window.document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'deleteButton';
            return deleteButton;
        },
    
        addToggleCheckBox: function(position){
            var toggleCheckBox = window.document.createElement('input');
            toggleCheckBox.type = 'checkbox';
            toggleCheckBox.setAttribute("checked", "checked");
            if (todosApp.toDosList[position].completed) {toggleCheckBox.checked = true;} else {toggleCheckBox.checked = false;}
            toggleCheckBox.className = 'toggleCheckBox';
            return toggleCheckBox
        } ,
    
        /* method listen to event click if any  Button Delete clicked 
        delete the todo depend on the id value of we give it to parent of this Delete Butten*/
    
        runEventListener: function () {
            var ulToDos = window.document.querySelector('ul');
            ulToDos.addEventListener('click', function (event) {
                var elementClicked = event.target;
                if (elementClicked.className === 'deleteButton') {
                    handlers.deleteToDo(window.parseInt(elementClicked.parentNode.id));
                }
                if (elementClicked.className === 'toggleCheckBox') {
                    handlers.completedToDo(window.parseInt(elementClicked.parentNode.id));
                } 
            })
        }
    };
    
    // run the event Listener
    
    viwe.runEventListener();