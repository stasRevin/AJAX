function test() {

    var userSelectionIds = ["listStories", "listColors", "listVehicleNumber",
                            "listExteriorMaterials", "squareFootage"];

    var selectionTypes = ["storySelection", "colorSelection", "garageSelection",
                          "exteriorSelection", "footageSelection"];

    var messageTexts = ["number of stories", "color", "number of vehicles",
                        "type of exterior", "square footage"];

    var currentSelection = "";
    var currentValue = "";
    var message = "";
    var messageLocation = "";
    var currentErrors = document.getElementsByClassName("error");

    console.log("length: " + currentErrors.length);

    while (currentErrors.length > 0) {

        currentErrors[0].parentNode.removeChild(currentErrors[0]);

    }


    for (var index = 0; index < userSelectionIds.length; index += 1) {

        var h3 = document.createElement("h3");
        h3.className = "error";
        currentSelection = userSelectionIds[index];
        currentValue = document.getElementById(currentSelection).value;
        message = "";
        messageLocation = "";

        if (!currentValue || currentValue === "none") {


            message = document.createTextNode("You must indicate "
                                            + messageTexts[index] + ".");

            messageLocation = document.getElementById(selectionTypes[index]);

            h3.appendChild(message);

            messageLocation.parentNode.insertBefore(h3, messageLocation);

        }

    }

    return false;

}