function removeErrors() {
    "use strict";

    $(".error").remove();
}

function appendNoTasksMessage() {
    "use strict";

    $("body").append("<p class='noTasksMessage'>You have no tasks to do."
            + " Click on the \"Add task\" button to add a task.</p>");
}

function removeTaskFromPage(id) {
    "use strict";

    $("tr#" + id).remove();

    if ($(".task").length === 0) {

        appendNoTasksMessage();
    }
}

function removeNoTasksMessage() {
    "use strict";

    $(".noTasksMessage").remove();
}

function displayWarning(status, id) {
    "use strict";

    removeErrors();

    $("#" + id).append("<td class='error'> The task was not deleted. "
            + " The following error has occurred: " + status + "</td>");
}

function validateUserInput(description) {
    "use strict";

    removeErrors();
    description = description.trim();

    if (description === null || description === "" || description.length > 30) {

        $("#taskInput").before("<sup class='error'> The task cannot be blank "
                + "or more than 30 characters long.<br/></sup>");
        return false;
    }
    return true;
}

function checkForNoTaskMessage() {
    "use strict";

    if ($(".task").length === 0) {

        appendNoTasksMessage();
    } else {

        removeNoTasksMessage();
    }
}

function deleteTask(idInput) {
    "use strict";

    var id = parseInt(idInput);

    $.ajax({
        url: "/project3_SRevin/ToDo/deleteTask.php",
        data: {"id":id},
        success: function(rowsDeleted) {

                    removeTaskFromPage(id);
                 },
        error: function(request, status, error) {

                    displayWarning(error, id);
                }
    });
}

function addTaskRow(id, text) {
    "use strict";

    $("#taskList").append($("<tr id='" + id + "' class='task'></tr>"));
    $("tr").last().append("<td></td>");
    $("td").last().append(text);
    $("tr").last().append("<td></td>");
    $("td").last().append("<img src='images/trashCan.png' alt='trash can icon' "
            + " class='deleteButton' id='delete_" + id + "'>");

    $("#delete_" + id).click(function() {

        $("#delete_" + id).hide("explode", {pieces: 16}, 300);
        deleteTask(id);
      });
}

function addTask(description) {
    "use strict";

    $.get("/project3_SRevin/ToDo/addTask.php", {"description":description},
            function(task) {

        removeNoTasksMessage();
        addTaskRow(task.id, description);

    }, "json");
}

function addJellyButtonEffect() {
    "use strict";

    var $button = document.querySelector('.button');
    $button.addEventListener('click', function() {

        var duration = 0.3;
        var delay = 0.08;
        TweenMax.to($button, duration, {scaleY: 1.6, ease: Expo.easeOut});
        TweenMax.to($button, duration, {scaleX: 1.2, scaleY: 1, ease:
                Back.easeOut, easeParams: [3], delay: delay});
        TweenMax.to($button, duration * 1.25, {scaleX: 1, scaleY: 1, ease:
                Back.easeOut, easeParams: [6], delay: delay * 3 });
    });
}

function addTaskButtonOnClickEvent() {
    "use strict";

     $("#addTask").click(function() {

         if (validateUserInput($("#taskInput").val())) {

                addTask($("#taskInput").val());
         }
     });
}

function sendAJAXRequestToGetUsersTasks() {
    "use strict";

    $.get("/project3_SRevin/ToDo/allTasks.php", function(response) {

        $(response).find("task").each(function() {

            var id = $(this).find("id").text();
            var text = $(this).find("description").text();

            addTaskRow(id, text);
        });
        checkForNoTaskMessage();

    }, "xml");
}

function outputTasksTable() {
    "use strict";

    var table = $("<table id='taskList'></table>");
    $("body").append(table);
}

$(document).ready(function() {
    "use strict";

    removeErrors();
    outputTasksTable();
    sendAJAXRequestToGetUsersTasks();
    addTaskButtonOnClickEvent();
    addJellyButtonEffect();
});
