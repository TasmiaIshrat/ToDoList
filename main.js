var toDoListArray = [];

var doneListArray = [];

var allTodoDoneListArray = [];

function initializeIfArrayNotInitialized(){

    if (localStorage.getItem("todoTileDiv") === null) {

    var firstDivContent = document.getElementById('tile');

    localStorage.setItem('todoTileDiv',firstDivContent.innerHTML);

    }

    if (localStorage.getItem("doneListArray") === null) {

        localStorage["doneListArray"] = JSON.stringify(doneListArray);
    }

    if (localStorage.getItem("toDoListArray") === null) {

        localStorage["toDoListArray"] = JSON.stringify(toDoListArray);
    }

    if (localStorage.getItem("allTodoDoneListArray") === null) {

        localStorage["allTodoDoneListArray"] = JSON.stringify(allTodoDoneListArray);
    }
}

window.onload = function WindowLoad(event) {

    initializeIfArrayNotInitialized();

    var menuHeader = document.getElementById('menuHeader');

    var hrTags = menuHeader.getElementsByTagName('hr');

    hrTags[0].style.borderBottomColor = "#00bfff";

    toDoListArray = JSON.parse(localStorage["toDoListArray"]);

    doneListArray = JSON.parse(localStorage["doneListArray"]);

    allTodoDoneListArray = JSON.parse(localStorage["allTodoDoneListArray"]);

    toDoListArray.forEach(function (item, index) {

        addTodoTilesInMainDiv(item);

    });




}


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

        todoObject['status'] = "Todo";

        toDoListArray.push(todoObject);

        allTodoDoneListArray.push(todoObject);

        localStorage["toDoListArray"] = JSON.stringify(toDoListArray);

        localStorage["allTodoDoneListArray"] = JSON.stringify(allTodoDoneListArray);

        addTodoTilesInMainDiv(todoObject);

        document.getElementById("todoInput").value = "";


    }



}


function addTodoTilesInMainDiv(todoObjectParam) {

    var firstDivContent = localStorage.getItem("todoTileDiv");

    var newTileDiv = document.createElement("div");

    newTileDiv.innerHTML = firstDivContent;

    newTileDiv.id = todoObjectParam['id'];

    var ps = newTileDiv.getElementsByTagName('p');

    ps[0].innerText = todoObjectParam['todoContent'];

    ps[1].innerText = todoObjectParam['date'];

    ps[2].innerText = todoObjectParam['time'];

    document.getElementById("belowRight").appendChild(newTileDiv);

    var tileButtons = newTileDiv.getElementsByTagName('button');

    var dropDownButton = tileButtons[0];

    dropDownButton.innerHTML = todoObjectParam['status'];

    var deleteButtonOfTile = tileButtons[2];

    deleteButtonOfTile.onclick = function () { deleteTodoElement(todoObjectParam['id']) };

    var aTagsOfTiles = newTileDiv.getElementsByTagName('a');

    var firstATag = aTagsOfTiles[0];

    var secondATag = aTagsOfTiles[1];

    firstATag.onclick = function () { UpdateTileStatus(todoObjectParam, "Todo", dropDownButton) };

    secondATag.onclick = function () { UpdateTileStatus(todoObjectParam, "Done", dropDownButton) };




}


function deleteTodoElement(idParam) {

    toDoListArray = toDoListArray.filter(function (obj) {
        return obj.id !== idParam;
    });

    doneListArray = doneListArray.filter(function (obj) {
        return obj.id !== idParam;
    });

    allTodoDoneListArray = allTodoDoneListArray.filter(function (obj) {
        return obj.id !== idParam;
    });


    localStorage["toDoListArray"] = JSON.stringify(toDoListArray);

    localStorage["doneListArray"] = JSON.stringify(doneListArray);

    localStorage["allTodoDoneListArray"] = JSON.stringify(doneListArray);

    var childTile = document.getElementById(idParam);

    var parentOfChildTile = childTile.parentNode;

    parentOfChildTile.removeChild(childTile);


}


function UpdateTileStatus(todoObject, status, dropDownButton) {


    if (todoObject['status'] != status) {

        dropDownButton.innerHTML = status;

        todoObject['status'] = status;

        if (status === "Done") {

            toDoListArray = toDoListArray.filter(function (obj) {
                return obj.id !== todoObject['id'];
            });

            doneListArray.push(todoObject);

            localStorage["doneListArray"] = JSON.stringify(doneListArray);

            localStorage["toDoListArray"] = JSON.stringify(toDoListArray);

            PlaceTodoTiles(toDoListArray, 0, 1, 2);

        }
        else {

            doneListArray = doneListArray.filter(function (obj) {
                return obj.id !== todoObject['id'];
            });

            toDoListArray.push(todoObject);

            localStorage["toDoListArray"] = JSON.stringify(toDoListArray);

            localStorage["doneListArray"] = JSON.stringify(doneListArray);

            PlaceTodoTiles(doneListArray, 1, 0, 2);


        }


        allTodoDoneListArray = allTodoDoneListArray.filter(function (obj) {
            return obj.id !== todoObject['id'];
        });

        allTodoDoneListArray.push(todoObject);





    }




}


function PlaceTodoTiles(todoTypeObjectArray, activeId, inActiveId1, InActive2) {

    document.getElementById("belowRight").innerHTML = "";

    var menuHeader = document.getElementById('menuHeader');

    var hrTags = menuHeader.getElementsByTagName('hr');

    hrTags[activeId].style.borderBottomColor = "#00bfff";

    hrTags[inActiveId1].style.borderBottomColor = "whitesmoke";

    hrTags[InActive2].style.borderBottomColor = "whitesmoke";

    todoTypeObjectArray.forEach(function (item, index) {

        addTodoTilesInMainDiv(item);

    });


}




