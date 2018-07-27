Within phpMyAdmin, you should import a new file (db_setup.sql) to create the mysql database for the project

Place the ToDo application in your webserver root directory.

Please note that the php files assume the following:
server=localhost
database = ToDo
username = root
password = student

allTasks.php
    - this file will return all tasks from the database as xml

addTask.php
    - this file will add a new task to the database
    Input - querystring parameter named 'description' that is the description of the new task to be created
    Output - the new task as json

deleteTask.php
    -this file will delete a task from the database
    Input - query parameter named 'id' that is the id of the task to be deleted
    Output - the number of rows affected by the query as plain text
