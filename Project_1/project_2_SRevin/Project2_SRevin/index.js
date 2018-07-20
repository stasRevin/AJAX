function convertToFahrenheit(temperatureCelsius) {
    "use strict";

    var temperatureFahrenheit = (9/5 * temperatureCelsius) + 32;

    return temperatureFahrenheit;
}

function clearResults() {
    "use strict";

    var weatherReport = document.getElementById("weatherReport");
    var warning = document.getElementById("warning");

    if (weatherReport) {

        weatherReport.parentNode.removeChild(weatherReport);
    }

    if (warning) {

        warning.parentNode.removeChild(warning);
    }
}

function insertWarning(zipInput, warningText) {
    "use strict";

    var sup = document.createElement("sup");
    var br = document.createElement("br");
    sup.id = "warning";
    var warning = document.createTextNode(warningText);
    sup.appendChild(warning);
    sup.appendChild(br);
    zipInput.parentNode.insertBefore(sup, zipInput);

}

function getWindDirection(directionInput) {
    "use strict";

    var windDirection = "";

    if (directionInput === "" || directionInput === undefined) {
        return "";
    }

    var direction = parseFloat(directionInput);
    console.log("direction: " + direction);

    var directionValues = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
                           "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

    var compassSegment = Math.round((direction / 22.5) + 1);

    if (compassSegment > 16) {

        compassSegment = 1;
    }

    windDirection = directionValues[compassSegment - 1];

    return windDirection;
}


function displayResults(locationName, temperature, windSpeed, windDirectionDegrees) {
    "use strict";

    clearResults();
    var weatherReport = document.createElement("div");
    weatherReport.id = "weatherReport";

    var windDirection = getWindDirection(windDirectionDegrees);

    var locationHeader = document.createElement("h2");
    var temperatureHeader = document.createElement("h2");
    var locationText = document.createTextNode(locationName);
    var temperatureText = document.createTextNode(temperature.toFixed(0)
        + "\u00B0 Fahrenheit");
    var windSpeedHeader = document.createElement("h2");


    var windSpeedText = document.createTextNode(windSpeed + " mph "
            + windDirection + " Wind");

    locationHeader.appendChild(locationText);
    weatherReport.appendChild(locationHeader);

    temperatureHeader.appendChild(temperatureText);
    weatherReport.appendChild(temperatureHeader);

    windSpeedHeader.appendChild(windSpeedText);
    weatherReport.appendChild(windSpeedHeader);

    var image;

    if (temperature >= 83) {

        image = document.createElement("img");
        image.src = "images/hot.png";
        image.alt = "hot weather";
        image.id = "temperatureImage";
        temperatureHeader.appendChild(image);

    } else if (temperature <= 34) {

        image = document.createElement("img");
        image.src = "images/cold.png";
        image.alt = "hot weather";
        image.id = "temperatureImage";
        temperatureHeader.appendChild(image);
    }

    if (windSpeed > 15) {

        var windImage = document.createElement("img");
        windImage.src = "images/windy.png";
        windImage.alt = "strong wind is blowing";
        windImage.id = "windImage";
        windSpeedHeader.appendChild(windImage);
    }
    document.body.appendChild(weatherReport);
}


function getWeatherInformation(latitude, longitude, locationName) {
    "use strict";

    var url = "http://api.geonames.org/findNearByWeatherJSON";
    var params = "?formatted=true&lat=" + latitude
            + "&lng=" + longitude + "&username=foxnova&style=full";

    var xhr = new XMLHttpRequest();

    xhr.open("get", url + params);

    xhr.onreadystatechange = function() {

        if (xhr.readyState === 4 && xhr.status === 200) {

            var result = JSON.parse(xhr.responseText);

            var temperatureCelsius = result.weatherObservation.temperature;
            var windSpeed = parseInt(result.weatherObservation.windSpeed);
            var windDirectionDegrees = result.weatherObservation.windDirection;

            var temperatureFahrenheit = convertToFahrenheit(temperatureCelsius);

            displayResults(locationName, temperatureFahrenheit,
                           windSpeed, windDirectionDegrees);
        }
    };

    xhr.send(null);
}

function getLocalityInformation() {
    "use strict";

    var zipCode = document.getElementById("zipInput").value;
    var url = "http://api.geonames.org/postalCodeSearchJSON";
    var params = "?formatted=true&postalcode=" + zipCode
        + "&maxRows=1&username=foxnova&style=full";

    var xhr = new XMLHttpRequest();

    xhr.open("get", url + params);

    xhr.onreadystatechange = function() {

        if (xhr.readyState === 4 && xhr.status === 200) {

            var result = JSON.parse(xhr.responseText);


            var latitude = result.postalCodes[0].lat;
            var longitude = result.postalCodes[0].lng;
            var locationName = result.postalCodes[0].placeName;

            getWeatherInformation(latitude, longitude, locationName);
        }

    };
    xhr.send(null);
}


function validateInput() {
    "use strict";

    var zipInput = document.getElementById("zipInput");
    var regExp = /^[0-9]{5}$/;

    if (zipInput.value === "") {

        insertWarning(zipInput, "Please enter a zip code.");
        return false;
    }

    if (!regExp.test(zipInput.value)) {

        insertWarning(zipInput, "The service is currently offered to the US customers only."
                + " Zip Code must be a valid zip code and consist of 5 digits.");

        return false;
    }
    return true;
}


function init() {
    "use strict";

    var btn = document.getElementById("btnWeather");

    btn.onclick = function() {

        clearResults();

        if (validateInput()){

            getLocalityInformation();

        }
    };
}
