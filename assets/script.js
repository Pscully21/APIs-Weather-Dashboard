// search history variables, use at top because javaScript reads top down
var searchInput = $("#search-input");
var searchBtn = $(".btn");
var searchHistory = $(".search-history");

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
        var citiesList = $("<li>").addClass("search-history-item").text(citiesArray[i]);
        searchHistory.append(citiesList);
    }
}
searchedCitiesList();
searchBtn.click(searchedCity);

// first link displays current weather at a specified city
function currentWeather() {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=708cb7baf448d9112288a0b832bdcb8b";

    fetch(weatherUrl)
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

//call 5 day forecast api (currently having issues with 5 day forecast keep getting error in colsole that says cannot read properties of undefined, on line 99 i guess its reading i as 1 which is causing render forecast to not display properly)
var getForecast = function (data) {
    var longitude = data.coord.lon;
    var latitude = data.coord.lat;
    var forecastUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly&appid=708cb7baf448d9112288a0b832bdcb8b";

    fetch(forecastUrl).then(function (response) {
        response.json().then(function (data) {
            renderForecast(data);
            console.log(data);
        });
    });
};
// render the current weather
var today = $("#today");
var city = $("#city");
var currentWeatherEl = $("#current-weather");

var showWeather = function (data) {
    currentWeatherEl.empty();
    city.text(data.name);
    today.text(" (" + moment().format("MM/DD/YYYY") + ") ");
    var todayIcon = $("<img src=http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png>"
    ).addClass("icon");
    var todayTemp = $("<p>").text(
        "Temperature: " + ((data.main.temp - 273.15) * 1.8 + 32).toFixed() + "degrees F"
    );
    var todayHumidity = $("<p>").text("Humidity: " + data.main.humidity + "%");
    var todayWind = $("<p>").text("Wind speed: " + data.wind.speed + "MPH");
    $("#today-tab").addClass("today-card");
    city.append(today, todayIcon);
    currentWeatherEl.append(city, todayTemp, todayHumidity, todayWind);
};

// display forecast to page 
var forecast = $("#forecast");

var renderForecast = function (data) {
    var forecastName = $("#future-dates");
    forecastName.text("Forecast:");
    forecast.empty();

    for (var i = 1; i < 6; i++) {
        var date = $("<p>").text(
            moment(data.daily[i].dt * 1000).format("MM/DD/YYYY")
        );
        var forIcon = $("<img src=http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png>"
        ).addClass("icon");
        var forTemp = $("<p>").text(
            "Temperature: " + ((data.daily[i].temp.day - 273.15) * 1.8 + 32).toFixed() + "degrees F"
        );
        var forHumidity = $("<p>").text(
            "Humidity: " + data.daily[i].humidity + "%"
        );
        var forWind = $("<p>").text(
            "Wind speed: " + data.daily[i].wind_speed + "MPH"
        );
        var forecastCard = $("<div>").addClass("card col-md-auto");

        forecastCard.append(
            date,
            forIcon,
            forTemp,
            forHumidity,
            forWind
        );
        forecast.append(forecastCard);
    }
};
// show search history, shows weather for city when clicked
$(".search-history").on("click", "li", function () {
    cityInput = $(this).text();
    currentWeather();
});