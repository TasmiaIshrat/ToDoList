var toDoListArray = [];


function getIdForTodoElement() {

    let nowInMs = Date.now();

    let nowInSecond = Math.round(nowInMs / 1000);

    return nowInSecond;


}

function addTodoElement() {

    var todoInput = document.getElementById("todoInput").value;

    if (todoInput != '') {

        var todoObject = {};

        var today = new Date();

        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        todoObject['todoContent'] = todoInput;

        todoObject['date'] = date;

        todoObject['time'] = time;

        todoObject['id'] = getIdForTodoElement();

        toDoListArray.push(todoObject);

        addTodoTilesInMainDiv(todoObject);


    }



}


function addTodoTilesInMainDiv(todoObjectParam) {

    var firstDivContent = document.getElementById('tile');

    var newTileDiv = document.createElement("div");

    newTileDiv.innerHTML = firstDivContent.innerHTML;

    var ps = newTileDiv.getElementsByTagName('p');

    var contenPTag = ps[0];

    var datePTag = ps[1];

    var timePTag = ps[2];

    contenPTag.innerText = todoObjectParam['todoContent'];

    datePTag.innerText = todoObjectParam['date'];

    timePTag.innerText = todoObjectParam['time'];

    document.getElementById("belowRight").appendChild(newTileDiv);

    var tileButtons = newTileDiv.getElementsByTagName('button');

    var deleteButtonOfTile = tileButtons[2];

    deleteButtonOfTile.onclick = function(){deleteTodoElement(todoObjectParam['id'])};



}


function deleteTodoElement(idParam){

    // alert(idParam);

    toDoListArray = toDoListArray.filter(function( obj ) {
        return obj.id !== idParam;
    });

    updateMainDivTiles();


}


function updateMainDivTiles(){

    toDoListArray.forEach(function (item, index) {
        console.log(item, index);
      });
}

