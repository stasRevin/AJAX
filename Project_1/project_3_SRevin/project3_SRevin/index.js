$(document).ready(function() {

    removeErrors();

    var table = $("<table id='taskList'></table>");
    $("body").append(table);



    $.get("/project3_SRevin/ToDo/allTasks.php", function(response) {

        //console.log(response.getElementsByTagName("task")[0].getElementsByTagName("id")[0].childNodes[0].nodeValue);

        $(response).find("task").each(function() {

            var id = $(this).find("id").text();
            var text = $(this).find("description").text();

            addTaskRow(id, text);

        });

        checkForNoTaskMessage();

    }, "xml");



    $("#addTask").click(function() {

        if (validateUserInput($("#taskInput").val())) {

            addTask($("#taskInput").val());
        }

    })

})

function removeErrors() {

    $(".error").remove();
}

function removeNoTasksMessage() {

    $(".noTasksMessage").remove();
}


function appendNoTasksMessage() {

    $("body").append("<p class='noTasksMessage'>You have no tasks to do. Click on the \"Add task\" button to add a task.</p>");

}

function validateUserInput(description) {

    console.log("desc: " + description);
    removeErrors();

    if (description === null || description === "" || description.length > 30) {

        $("#taskInput").before("<sup class='error'> The task cannot be blank or more than 30 characters long.<br/></sup>");
        return false;

    }
    return true;
}


function checkForNoTaskMessage() {

    console.log("tasks length: " + $(".task").length);
    if ($(".task").length === 0) {

        appendNoTasksMessage();

    } else {

        removeNoTasksMessage();
    }

}


function deleteTask(idInput) {

    var id = parseInt(idInput);

    console.log("id: " + id);

    $.ajax({
        url: "/project3_SRevin/ToDo/deleteTask.php",
        data: {"id":id},
        success: function(rowsDeleted) {

                    console.log("rows deleted: " + rowsDeleted);

                    removeTaskFromPage(id);

                 },
        error: function(request, status, error) {

                    console.log("error: " + error);
                    console.log("status: " + status);

                    displayWarning(error, id);

                }

    });

}



function addTask(description) {


    $.get("/project3_SRevin/ToDo/addTask.php", {"description":description}, function(task) {

        console.log("task added id: " + task.id);
        removeNoTasksMessage();
        addTaskRow(task.id, description);

    }, "json")

}

function addTaskRow(id, text) {

    $("#taskList").append($("<tr id='" + id + "' class='task'></tr>"));
    $("tr").last().append("<td></td>");
    $("td").last().append(text);
    $("tr").last().append("<td></td>");
    $("td").last().append("<img src='images/trashCan.png' alt='trash can icon' class='deleteButton' id='delete_" + id + "'>");

    $("#delete_" + id).click(function() {

        deleteTask(id);
      });


}

function removeTaskFromPage(id) {


    $("tr#" + id).remove();

    if ($(".task").length === 0) {

        appendNoTasksMessage();
    }

}

function displayWarning(status, id) {

    removeErrors();
    $("#" + id).append("<td class='error'> The task was not deleted. The following error has occurred: "
            + status + "</td>");

}


