function init() {
    "use strict";

    var students = [
                        {
                             "id":111,
                             "name":"Emily",
                             "email":"emily@student.edu"
                        },

                        {
                            "id":112,
                            "name:":"Janis",
                            "email":"janis@student.edu"
                        },

                        {
                            "id":113,
                            "name":"Samantha",
                            "email":"samantha@student.edu"
                        },

                        {
                            "id":114,
                            "name":"Miguel",
                            "email":"miguel@student.edu"

                        },

                        {
                            "id":115,
                            "name":"Phillip",
                            "email":"phillip@student.edu"
                        }
                    ];

    var table = document.createElement("table");
    var tableHeadColumnOne = document.createElement("th");
    var tableHeadColumnTwo = document.createElement("th");
    var headTextColumnOne = document.createTextNode("Student ID");
    var headTextColumnTwo = document.createTextNode("Email");

    tableHeadColumnOne.appendChild(headTextColumnOne);
    tableHeadColumnTwo.appendChild(headTextColumnTwo);
    table.appendChild(tableHeadColumnOne);
    table.appendChild(tableHeadColumnTwo);
    document.body.appendChild(table);

    var row;
    var columnOne;
    var columnTwo;
    var columnOneText;
    var columnTwoText;

    for (var index = 0; index < students.length; index += 1) {

        row = document.createElement("tr");
        columnOne = document.createElement("td");
        columnTwo = document.createElement("td");
        columnOneText = document.createTextNode(students[index].id);
        columnTwoText = document.createTextNode(students[index].email);
        columnOne.appendChild(columnOneText);
        columnTwo.appendChild(columnTwoText);
        row.appendChild(columnOne);
        row.appendChild(columnTwo);
        table.appendChild(row);

        console.log("Student ID: " + students[index].id);
        console.log("Student email: " + students[index].email);

    }

}