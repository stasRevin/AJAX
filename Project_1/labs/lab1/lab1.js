function verify() {

    var existingMessage = document.getElementById("messageHeading");

    if (existingMessage) {

        existingMessage.parentNode.removeChild(existingMessage);

    }

    var enteredValue = document.getElementById("username").value;
    var message = enteredValue;
    var h3 = document.createElement("h3");
    h3.id = "messageHeading";
    enteredValue = enteredValue.trim();

    if (enteredValue === "" || enteredValue === null) {

        message = document.createTextNode("username is a required field.");

    } else {

        message = document.createTextNode(enteredValue);

    }

    h3.appendChild(message);
    document.getElementById("main").appendChild(h3);

}