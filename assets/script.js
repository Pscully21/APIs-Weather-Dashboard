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
    
    
}