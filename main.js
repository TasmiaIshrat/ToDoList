var allTodoDoneListArray = [];

var current_tab = 'Todo';

function initializeIfArrayNotInitialized(){

    if (localStorage.getItem("todoTileDiv") === null) {

    var firstDivContent = document.getElementById('tile');

    localStorage.setItem('todoTileDiv',firstDivContent.innerHTML);

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

    allTodoDoneListArray = JSON.parse(localStorage["allTodoDoneListArray"]);

    PlaceTodoTiles(allTodoDoneListArray,'Todo', 0, 1, 2);

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

        allTodoDoneListArray.push(todoObject);

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

    var dropDownButton = tileButtons[1];

    dropDownButton.innerHTML = todoObjectParam['status']+' <i class="fa fa-caret-down btn3Color"></i>';

    var editButtonOfTile = tileButtons[2];

    editButtonOfTile.onclick = function () { editTodoElement(todoObjectParam) };

    var saveEditButton = tileButtons[0];

    saveEditButton.onclick = function () { saveEditedTileContent(todoObjectParam) };

    var deleteButtonOfTile = tileButtons[3];

    deleteButtonOfTile.onclick = function () { deleteTodoElement(todoObjectParam['id']) };

    var aTagsOfTiles = newTileDiv.getElementsByTagName('a');

    var firstATag = aTagsOfTiles[0];

    var secondATag = aTagsOfTiles[1];

    firstATag.onclick = function () { UpdateTileStatus(todoObjectParam, "Todo", dropDownButton) };

    secondATag.onclick = function () { UpdateTileStatus(todoObjectParam, "Done", dropDownButton) };




}


function deleteTodoElement(idParam) {

    allTodoDoneListArray = allTodoDoneListArray.filter(function (obj) {
        return obj.id !== idParam;
    });

    localStorage["allTodoDoneListArray"] = JSON.stringify(allTodoDoneListArray);

    var childTile = document.getElementById(idParam);

    var parentOfChildTile = childTile.parentNode;

    parentOfChildTile.removeChild(childTile);


}


function editTodoElement(idParam) {

    var editTileDiv = document.getElementById(idParam['id']);

    var ps = editTileDiv.getElementsByTagName('p');

    ps[0].style.display = "none";

    var ta = editTileDiv.getElementsByTagName('textarea');

    ta[0].style.display = "block";

    var btn = editTileDiv.getElementsByTagName('button');

    btn[0].style.display = "block";

    ta[0].value = ps[0].innerHTML;




}

function saveEditedTileContent(todoObject){

    var editTileDiv = document.getElementById(todoObject['id']);

    var ta = editTileDiv.getElementsByTagName('textarea');

    var btn = editTileDiv.getElementsByTagName('button');

    var indx = allTodoDoneListArray.indexOf(todoObject);

    allTodoDoneListArray[indx]['todoContent'] =  ta[0].value;

    localStorage["allTodoDoneListArray"] = JSON.stringify(allTodoDoneListArray);

    ta[0].style.display = "block";

    btn[0].style.display = "block";

    PlaceTodoTiles(allTodoDoneListArray,current_tab, 0, 1, 2);

}


function UpdateTileStatus(todoObject, status, dropDownButton) {

    if (todoObject['status'] != status) {

        var indx = allTodoDoneListArray.indexOf(todoObject);

        if(indx>=0){

        if (status === "Done") {

            allTodoDoneListArray[indx]['status'] = "Done";

            localStorage["allTodoDoneListArray"] = JSON.stringify(allTodoDoneListArray);

            PlaceTodoTiles(allTodoDoneListArray,current_tab, 0, 1, 2);

        }

        else{

            allTodoDoneListArray[indx]['status'] = "Todo";

            localStorage["allTodoDoneListArray"] = JSON.stringify(allTodoDoneListArray);

            PlaceTodoTiles(allTodoDoneListArray,current_tab, 1, 0, 2);


        }

    }



    }


}


function PlaceTodoTiles(todoTypeObjectArray,status, activeId, inActiveId1, InActive2) {

    current_tab = status;

    document.getElementById("belowRight").innerHTML = "";

    var menuHeader = document.getElementById('menuHeader');

    var hrTags = menuHeader.getElementsByTagName('hr');

    hrTags[activeId].style.borderBottomColor = "#00bfff";

    hrTags[inActiveId1].style.borderBottomColor = "whitesmoke";

    hrTags[InActive2].style.borderBottomColor = "whitesmoke";

    todoTypeObjectArray.forEach(function (item, index) {


        if(item['status'] === status){

            addTodoTilesInMainDiv(item);
        }

        if(status === 'All'){

            addTodoTilesInMainDiv(item);

        }

       

    });


}




