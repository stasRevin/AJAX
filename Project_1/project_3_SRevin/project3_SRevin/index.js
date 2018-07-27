$(document).ready(function() {

    var ul = $("<table id='taskList'></table>");
    $("body").append(ul);

    $.get("/project3_SRevin/ToDo/allTasks.php", function(response) {

        //console.log(response.getElementsByTagName("task")[0].getElementsByTagName("id")[0].childNodes[0].nodeValue);

        $(response).find("task").each(function() {

            var id = $(this).find("id").text();
            var text = $(this).find("description").text();

            addTaskRow(id, text);

        })

    }, "xml");


    function deleteTask(idInput) {

        var id = parseInt(idInput);

        console.log("id: " + id);

        $.get("/project3_SRevin/ToDo/deleteTask.php", {"id":id}, function(rowsDeleted) {

            console.log("rows deleted: " + rowsDeleted);

        });

    }


    $("#addTask").click(function() {

        addTask($("#taskInput").val());

    })


    function addTask(description) {

        $.get("/project3_SRevin/ToDo/addTask.php", {"description":description}, function(task) {

            console.log("task added id: " + task.id);

            addTaskRow(task.id, description);

        }, "json")

    }

    function addTaskRow(id, text) {

        $("#taskList").append($("<tr id='" + id + "'></tr>"));
        $("tr").last().append("<td></td>");
        $("td").last().append(text);
        $("tr").last().append("<td></td>");
        $("td").last().append("<input type='button' id='delete_" + id + "' value='delete'/>");

        $("#delete_" + id).click(function() {

            $("tr#" + id).remove();
            deleteTask(id);

        });

    }






})

