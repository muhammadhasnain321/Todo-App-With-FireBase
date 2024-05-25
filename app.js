const firebaseConfig = {
    apiKey: "AIzaSyAMVcgxgZ0rRUMJ4tuFo7nrFH068oxGaks",
    authDomain: "todolist2-edb9a.firebaseapp.com",
    databaseURL: "https://todolist2-edb9a-default-rtdb.firebaseio.com",
    projectId: "todolist2-edb9a",
    storageBucket: "todolist2-edb9a.appspot.com",
    messagingSenderId: "367732662052",
    appId: "1:367732662052:web:e7fc3fb5522ec35ce81db1"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
firebase
.database()
.ref("todos")
.on("child_added", function (data) {
  var liElement = document.createElement("li");

  var liText = document.createTextNode(data.val().todoVal);

  liElement.appendChild(liText);

  list.appendChild(liElement);

  var EditBtnELement = document.createElement("button");

  var EditBtnText = document.createTextNode("Edit");

  EditBtnELement.appendChild(EditBtnText);

  var DeleteBtnELement = document.createElement("button");

  var DeleteBtnText = document.createTextNode("Delete");

  DeleteBtnELement.appendChild(DeleteBtnText);

  liElement.appendChild(EditBtnELement);

  liElement.appendChild(DeleteBtnELement);

  EditBtnELement.setAttribute("class", "Editbtn");
  // DeleteBtnELement.style.backgroundColor = "lightcoral";

  DeleteBtnELement.setAttribute("onclick", "deleteItem(this)");

  DeleteBtnELement.setAttribute("id", data.val().key);

  EditBtnELement.setAttribute("onclick", "EditItem(this)");

  EditBtnELement.setAttribute("id", data.val().key);
});

function addTOdo() {
    var input = document.getElementById("todoInput");
    
   
  var id = Date.now().toString(25);

  var todoObj = {
    todoVal: input.value,
    key: id,
  };

  firebase
    .database()
    .ref("todos/" + id)
    .set(todoObj);

    input.value= ""
  }
  
function deletAll(){
  firebase.database().ref("todos").remove();
  list.innerHTML = "";
}
  
function deleteItem(e) {
  firebase.database().ref(`todos/${e.id}`).remove();
  e.parentNode.remove();
}
  
function EditItem(e) {
  var updateValue = prompt(
    "Enter updated value",
    e.parentNode.firstChild.nodeValue
  );

  firebase.database().ref(`todos/${e.id}`).set({
    key: e.id,
    todoVal: updateValue,
  });

  e.parentNode.firstChild.nodeValue = updateValue;
}
