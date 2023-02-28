// search history variables, use at top because javaScript reads top down
var searchInput = $("#search-input");
var searchBtn = $("#.btn");
var searchHistory = $("#search-history");

// make sure strings => arrays
// prompt JSON to load saved search history
var citiesArray = JSON.parse(localStorage.getItem("searchedCity")) || [];

function searchedCity() {
    // code to pull in searched citys and not empty page
    event.preventDefault();
    // creates the searched cities array which will appear under search bar
    searchInput = $("#search-input").val();
    citiesArray.push(searchInput);

    localStorage.setItem("searchedCity", JSON.stringify(citiesArray));
    searchHistory.empty();
    
    searchedCitiesList();
    currentWeather();
    
}

function searchedCitiesList() {
    for (var i = 0; i < citiesArray.length; i++) {
        var citiesList = $("<li>").addClass("list-item").text(citiesArray[i]);
        searchHistory.append(citiesList);
    }
}
searchedCitiesList();
searchBtn.click(searchedCity);
// first link displays current weather at a specified city
function currentWeather() {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=708cb7baf448d9112288a0b832bdcb8b";

    fetch(currentUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                showWeather(data);
                getForecast(data);
            });
        } else {
            alert("City not found");
        }
    })
    .catch(function (error) {
        alert("cannot connect to Openweather API");
    });
    
}

//call 5 day forecast api
var getForecast = function (data) {
    var lon = data.coord.lon;
    var lat = data.coord.lat;
    var forecastUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=708cb7baf448d9112288a0b832bdcb8b";

    fetch(forecastUrl).then(function (response) {
        response.json().then(function (data) {
            renderForecast(data);
            //console.log(data);
        });
    });
};
// render the current weather
var date = $("#date");
var city = $("#city");
var currentWeatherEl = $("#current-weather");

var showWeather = function (data) {
    currentWeatherEl.empty();
    city.text(data.name);
    date.text(" (" + moment().format("MM/DD/YYYY") + ") ");
    var weatherIcon = (
        // icon code, have to find it want to see if working first
    )
    //humidity 
    //wind speed
}

// display forecast to page 
var forecast 
