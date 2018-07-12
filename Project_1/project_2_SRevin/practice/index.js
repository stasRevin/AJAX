function init() {

    var xhr = new XMLHttpRequest();
    var url = "http://api.geonames.org/postalCodeSearchJSON";
    var params = "?formatted=true&postalcode=53705&maxRows=1&username=foxnova&style=full";

    xhr.open("get", url + params);

    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && xhr.status == 200) {

            var result = JSON.parse(xhr.responseText);

            var latitude = result.postalCodes[0].lat;
            var longitude = result.postalCodes[0].lng;
            console.log(result.postalCodes[0].placeName);
            console.log(latitude);
            console.log(longitude);

            getWeatherInformation(latitude, longitude);

        }
    }
    xhr.send(null);

}


function getWeatherInformation(latitude, longitude) {

    var urlTwo = "http://api.geonames.org/findNearByWeatherJSON";
    var paramsTwo = "?formatted=true&lat=" + latitude
        + "&lng=" + longitude + "&username=foxnova&style=full";
    var xhrTwo = new XMLHttpRequest();
    xhrTwo.open("get", urlTwo + paramsTwo);

    xhrTwo.onreadystatechange = function() {

        if (xhrTwo.readyState == 4 && xhrTwo.status == 200) {

            var resultTwo = JSON.parse(xhrTwo.responseText);
            console.log(resultTwo.weatherObservation.temperature);

        }

    }

    xhrTwo.send(null);


}