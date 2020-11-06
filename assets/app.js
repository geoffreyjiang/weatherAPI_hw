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
    windSpeed.text("Wind Speed: ${cityWindSpeed} MPH");
    wIcon.attr("src", cityWeatherIcon);
}

function searchData() {
    let apiUrl ="api.openweathermap.org/data/2.5/weather?q={searchInput}&appid=${apiKey},";
    $.ajax ({
        url: apiUrl,
        method: "GET"
    })
    .then(function(weatherData){
        var cityInfo = {
            cityName: weatherData.name,
            cityTemperature: weatherData.main.temp,
            cityHumid: weatherData.main.humidity,
            cityWindSpeed: weatherData.main.wind.speed,
            cityUvIndex: weatherData.coord,
            cityWeatherIcon: weatherData.weather[0].icon
        }
    let apiUrl= "https://api.openweathermap.org/data/2.5/uvi?lat=${cityObj.cityUVIndex.lat}&lon=${cityObj.cityUVIndex.lon}&APPID=${apiKey}&units=imperial"
        $.ajax({
            url: apiUrl,
            method: "GET"
        })
        .then(function(uvData){
            if (JSON.parse(localStorage.getItem("searchHistory")) == null) {
                let historyArr = [];
                if (historyArr.indexOf(cityInfo.cityName) === -1){
                    historyArr.push(cityInfo.cityName)
                    localStorage.setItem("searchHistory", JSON.stringify(historyArr));
                    let getWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                    cityData(cityInfo.cityName, cityInfo.cityTemperature, cityInfo.cityHumid, cityInfo.cityWindSpeed, getWeatherIcon, uvData.value);
                    searchData(cityInfo.cityName);
                } else {
                    let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                    cityData(cityInfo.cityName, cityInfo.cityTemperature, cityInfo.cityHumid, cityInfo.cityWindSpeed, getWeatherIcon, uvData.value);
                }
            }
        })
        }
    ,)
}










// url: api.openweathermap.org/data/2.5/forecast?q={searchInput}&appid={apiKey},