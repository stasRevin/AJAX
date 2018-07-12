function init() {
    "use strict";

    var submitButton = document.getElementById("submitButton");

    submitButton.onclick = validate;

}


function validate() {
    "use strict";

    var userSelectionIds = ["listStories", "listColors", "listVehicleNumber",
                            "listExteriorMaterials", "squareFootage"];

    var selectionTypes = ["storySelection", "colorSelection", "garageSelection",
                          "exteriorSelection", "footageSelection"];

    var messageTexts = ["number of stories", "color", "number of vehicles",
                        "type of exterior", "square footage"];

    var userEnteredValues = [];
    var currentErrors = document.getElementsByClassName("error");
    var totalCost = 0;

    removeErrors(currentErrors);
    userEnteredValues = checkIfInputPresent(userSelectionIds, selectionTypes,
                                            messageTexts);
    checkIfInputIsNumber();


    if (currentErrors.length === 0) {

        totalCost = calculateTotalPrice(userEnteredValues);

        if (document.getElementById("resultBlock")) {

            removeResults();

        }

        displayResults(totalCost, userEnteredValues, userSelectionIds);
    }


}

function calculateTotalPrice(userEnteredValues) {
    "use strict";

    var numberOfStories = parseInt(userEnteredValues[0]);
    var numberOfVehicles = parseInt(userEnteredValues[2]);
    var exteriorMaterial = userEnteredValues[3];
    var squareFootage = parseInt(userEnteredValues[4]);
    var pricePerSquareFoot = 0;
    var additionalCost = 0;
    var totalCost = 0;

    if (numberOfStories === 2) {

        pricePerSquareFoot = 135;

    } else if (numberOfStories === 1) {

        pricePerSquareFoot = 175;

    }

    if (exteriorMaterial === "wood") {

        pricePerSquareFoot += 10;
        additionalCost = 5000;

    } else if (exteriorMaterial === "brick") {

        pricePerSquareFoot += 10;
        additionalCost = 8000;

    } else if (exteriorMaterial === "stucco") {

        additionalCost = 6000;

    } else if (exteriorMaterial === "stone") {

        additionalCost = 16000;

    }

    additionalCost += numberOfVehicles * 15000;

    totalCost = squareFootage * pricePerSquareFoot;
    totalCost += additionalCost;

    return totalCost;

}

function displayResults(totalCost, userEnteredValues, userSelectionIds) {
    "use strict";

    var results = userEnteredValues;
    var labels = ["Number of stories: ", "Color: ", "Garage size (# of vehicles): ",
                  "Exterior: ", "Square footage: ", "Total cost: $"];

    var clearButton = document.createElement("button");
    var buttonValue = document.createTextNode("Clear");
    clearButton.appendChild(buttonValue);
    clearButton.onclick = function() {clearContents(userSelectionIds)};

    results.push(totalCost.toFixed(2));
    var resultBlock = document.createElement("div");
    var resultParagraph = "";
    var displayText = "";
    resultBlock.id = "resultBlock";


    for (var index = 0; index < results.length; index += 1) {


        displayText = document.createTextNode(labels[index] + results[index]);
        resultParagraph = document.createElement("p");

        resultParagraph.appendChild(displayText);
        resultBlock.appendChild(resultParagraph);
    }

    resultBlock.appendChild(clearButton);
    document.body.appendChild(resultBlock);

}


function removeErrors(currentErrors) {
    "use strict";

    while (currentErrors.length > 0) {

        currentErrors[0].parentNode.removeChild(currentErrors[0]);

    }

}


function checkIfInputPresent(userSelectionIds, selectionTypes, messageTexts) {
    "use strict";

    var message = "";
    var messageLocation = "";
    var currentSelection = "";
    var currentValue = "";
    var userEnteredValues = [];
    var sup;

    for (var index = 0; index < userSelectionIds.length; index += 1) {

        sup = document.createElement("sup");
        sup.className = "error";
        currentSelection = userSelectionIds[index];
        currentValue = document.getElementById(currentSelection).value;
        message = "";
        messageLocation = "";
        userEnteredValues[index] = currentValue;

        if (!currentValue || currentValue === "none") {


            message = document.createTextNode("You must indicate "
                                            + messageTexts[index] + ".");

            messageLocation = document.getElementById(selectionTypes[index]);

            sup.appendChild(message);

            messageLocation.parentNode.insertBefore(sup, messageLocation);

        }

    }

    return userEnteredValues;

}

function checkIfInputIsNumber() {
    "use strict";

    var squareFootage = document.getElementById("squareFootage").value;


    if (isNaN(squareFootage)) {

        var sup = document.createElement("sup");
        sup.className = "error";
        var message = document.createTextNode(" Square footage must be a number.");
        var messageLocation = document.getElementById("footageSelection");
        sup.appendChild(message);
        messageLocation.parentNode.insertBefore(sup, messageLocation);

    }

}


function clearContents(userSelectionIds) {
    "use strict";

    removeResults();

    for (var index = 0; index < userSelectionIds.length; index += 1) {

        document.getElementById(userSelectionIds[index]).value = "";

    }
}

function removeResults() {
    "use strict";

    var resultBlock = document.getElementById("resultBlock");
    resultBlock.parentNode.removeChild(resultBlock);

}




















