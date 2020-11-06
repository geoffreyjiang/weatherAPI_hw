var apiKey = "10a0190a15115135e5711a7b089580be";
var searchBtn = $(".searchBtn");
var searchInput = $(".searchInput");
var cityName = $(".cityName");
var currentDate = $(".currentDate");
var weatherIcon = $(".weatherIcon");
var searchHistory = $(".searchHistory");
var temp = $(".temp");
var humidityEl = $(".humidity");
var windSpeedEl = $(".speed");
var uvIndexEl = $(".uvIndex");



if(JSON.parse(localStorage.getItem("searchHistory")) === null) {
        console.log("Search History not found")
}else  {
        console.log("Search History found");

    }

function cityInfo(cityName){
    searchHistory.empty();
    var searchArr = JSON.parse(localStorage.getItem("searchHistory"));
    for (var i = 0; i < searchArr.length; i++) {
        let listItem = $("<li>").attr("class", newEntry);
        listItem.text(searchArr[i])
        listItem.append.searchHistory
    }
}