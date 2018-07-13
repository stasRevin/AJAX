function init() {

    var btn = document.getElementById("btnWeather");

    btn.onclick = function() {

        getLocalityInformation();
    }

}

function getLocalityInformation() {

    var zipCode = document.getElementById("zipInput").value;
    var url = "http://api.geonames.org/postalCodeSearchJSON";
    var params = "?formatted=true&postalcode=" + zipCode
        + "&maxRows=1&username=foxnova&style=full";

    var xhr = new XMLHttpRequest();

    xhr.open("get", url + params);

    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && xhr.status == 200) {

            var result = JSON.parse(xhr.responseText);

            var latitude = result.postalCodes[0].lat;
            var longitude = result.postalCodes[0].lng;
            var locationName = result.postalCodes[0].placeName;

            console.log(latitude);
            console.log(longitude);
            console.log(locationName);

            getWeatherInformation(latitude, longitude, locationName);

        }

    }

    xhr.send(null);
}


function getWeatherInformation(latitude, longitude, locationName) {

    var url = "http://api.geonames.org/findNearByWeatherJSON";
    var params = "?formatted=true&lat=" + latitude
            + "&lng=" + longitude + "&username=foxnova&style=full";

    var xhr = new XMLHttpRequest();

    xhr.open("get", url + params);

    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && xhr.status == 200) {

            var result = JSON.parse(xhr.responseText);

            var temperatureCelsius = result.weatherObservation.temperature;
            var windSpeed = result.weatherObservation.windSpeed;

            var temperatureFahrenheit = convertToFahrenheit(temperatureCelsius);

            console.log(temperatureFahrenheit.toFixed(1));
            console.log(windSpeed);

            displayResults(locationName, temperatureFahrenheit, windSpeed);

        }

    }

    xhr.send(null);

}

function convertToFahrenheit(temperatureCelsius) {

    var temperatureFahrenheit = (9/5 * temperatureCelsius) + 32;

    return temperatureFahrenheit;

}

function displayResults(locationName, temperature, windSpeed) {

    clearResults();
    var weatherReport = document.createElement("div");
    weatherReport.id = "weatherReport";

    var locationHeader = document.createElement("h2");
    var temperatureHeader = document.createElement("h2");
    var locationText = document.createTextNode(locationName);
    var temperatureText = document.createTextNode(temperature.toFixed(0)
        + "\u00B0 Fahrenheit");
    var windSpeedHeader = document.createElement("h2");
    var windSpeedText = document.createTextNode(windSpeed + " mph");

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

        windSpeedHeader.id = "windy";
    }
    document.body.appendChild(weatherReport);

}


function clearResults() {

    var weatherReport = document.getElementById("weatherReport");

    if (weatherReport) {

        weatherReport.parentNode.removeChild(weatherReport);

    }

}