function test() {

    var userSelectionIds = ["listStories", "listColors", "listVehicleNumber",
                            "listExteriorMaterials", "squareFootage"];

    var selectionTypes = ["storySelection", "colorSelection", "garageSelection",
                          "exteriorSelection", "footageSelection"];

    var messageTexts = ["number of stories", "color", "number of vehicles",
                        "type of exterior", "square footage"];

    var userEnteredValues = [];
    var currentSelection = "";
    var currentValue = "";
    var message = "";
    var messageLocation = "";
    var currentErrors = document.getElementsByClassName("error");


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
        userEnteredValues[index] = currentValue;

        if (!currentValue || currentValue === "none") {


            message = document.createTextNode("You must indicate "
                                            + messageTexts[index] + ".");

            messageLocation = document.getElementById(selectionTypes[index]);

            h3.appendChild(message);

            messageLocation.parentNode.insertBefore(h3, messageLocation);

        }

    }

    var squareFootage = document.getElementById("squareFootage").value;

    if (isNaN(squareFootage)) {

        message = document.createTextNode("Square footage must be a number.");
        messageLocation = document.getElementById("footageSelection");
        h3.appendChild(message);
        messageLocation.parentNode.insertBefore(h3, messageLocation);

    }

    if (currentErrors.length == 0) {

        calculateTotalPrice(userEnteredValues);
    }


}

function calculateTotalPrice(userEnteredValues) {

    var numberOfStories = parseInt(userEnteredValues[0]);
    var numberOfVehicles = parseInt(userEnteredValues[2]);
    var exteriorMaterial = userEnteredValues[3];
    var squareFootage = parseInt(userEnteredValues[4]);
    var pricePerSquareFoot = 0;
    var additionalCost = 0;
    var totalPrice = 0;

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

    totalPrice = squareFootage * pricePerSquareFoot;
    totalPrice += additionalCost;

    console.log("total price: " + totalPrice);

    return totalPrice;

}
























