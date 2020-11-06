var apiKey = "10a0190a15115135e5711a7b089580be";
var searchBtn = $(".searchBtn");
var searchInput = $(".searchInput");
var cityNameEl = $(".cityName");
var currentDate = $(".currentDate");
var wIcon = $(".weatherIcon");
var searchHistory = $(".searchHistory");
var temperature = $(".temp");
var humid = $(".humidity");
var windSpeed = $(".speed");
var ultraViolet = $(".uvIndex");



if(JSON.parse(localStorage.getItem("searchHistory")) === null) {
        console.log("Search History not found")
}else  {
        console.log("Search History found");

    }

function cityHistory(cityName){
    searchHistory.empty();
    var searchArr = JSON.parse(localStorage.getItem("searchHistory"));
    for (var i = 0; i < searchArr.length; i++) {
        let listItem = $("<li>").attr("class", newEntry);
        listItem.text(searchArr[i])
        listItem.append.searchHistory
    }
}

function cityData(){
    cityNameEl.text(cityName)
    temperature.text("Temperature: ${cityTemp} °F");
    humid.text("Humidity: ${cityHumidity}%");
    ultraViolet.text("UV Index: ${uvVal}");
    windSpeed.text("Wind Speed: ${cityWindSpeed}MPH");
    wIcon.attr("src", "${cityWeatherIcon}");
}