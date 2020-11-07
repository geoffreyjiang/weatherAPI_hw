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
var cardRow = $(".card-row");


searchBtn.on("click", function(e){
    e.preventDefault();
    if (searchInput.val() === ""){
        alert("Please Enter a City")
        return;
    }
    searchData(searchInput.val());
})




// if(JSON.parse(localStorage.getItem("searchHistory")) === null) {
//         console.log("Search History not found")
// }else  {
//         console.log("Search History found");

//     }

function cityHistory(cityName){
    searchHistory.empty();
    var searchArr = JSON.parse(localStorage.getItem("searchHistory"));
    for (var i = 0; i < searchArr.length; i++) {
        let listItem = $("<li>").attr("class", newEntry);
        listItem.text(searchArr[i])
        listItem.append.searchHistory
    }
}

function cityData(name, cityTemp, cityHumidity, uvVal, cityWindSpeed){
    cityNameEl.text(name)
    temperature.text("Temperature: ${cityTemp} °F");
    humid.text("Humidity: ${cityHumidity}%");
    ultraViolet.text("UV Index: ${uvVal}");
    windSpeed.text("Wind Speed: ${cityWindSpeed} MPH");
    wIcon.attr("src", cityWeatherIcon);
}

function searchData(cityInput) {
    let apiUrl =`api.openweathermap.org/data/2.5/weather?q=${searchInput[0].value}&appid=10a0190a15115135e5711a7b089580be&units=imperial`;
    $.ajax ({
        url: apiUrl,
        method: "GET"
    })
    .then(function(weatherData){
        let cityInfo = {
            cityName: weatherData.name,
            cityTemperature: weatherData.main.temp,
            cityHumid: weatherData.main.humidity,
            cityWindSpeed: weatherData.wind.speed,
            cityUvIndex: weatherData.coord,
            cityWeatherIcon: weatherData.weather[0].icon
        }
    },
    let, apiUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityInfo.cityUVIndex.lat}&lon=${cityInfo.cityUVIndex.lon}&APPID=10a0190a15115135e5711a7b089580be&units=imperial`,
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
                    let getWeatherIcon = `https:///openweathermap.org/img/w/${cityInfo.cityWeatherIcon}.png`;
                    cityData(cityInfo.cityName, cityInfo.cityTemperature, cityInfo.cityHumid, cityInfo.cityWindSpeed, getWeatherIcon, uvData.value);
                    searchData(cityInfo.cityName);
                } else {
                    let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityInfo.cityWeatherIcon}.png`;
                    cityData(cityInfo.cityName, cityInfo.cityTemperature, cityInfo.cityHumid, cityInfo.cityWindSpeed, getWeatherIcon, uvData.value);
                }
            }else{
                let historyArr = JSON.parse(localStorage.getItem("searchHistory"));
                if (historyArr.indexOf(cityInfo.cityName) === -1){
                    historyArr.push(cityInfo.cityName);
                    localStorage.setItem("searchHistory", JSON.stringify(historyArr));
                    let getWeatherIcon =  `https:///openweathermap.org/img/w/${cityInfo.cityWeatherIcon}.png`;
                    cityData(cityInfo.cityName, cityInfo.cityTemperature, cityInfo.cityHumid, cityInfo.cityWindSpeed, getWeatherIcon, uvData.value);
                    searchData(cityInfo.cityName)
                }else{
                    let getWeatherIcon =  `https:///openweathermap.org/img/w/${cityInfo.cityWeatherIcon}.png`;
                    cityData(cityInfo.cityName, cityInfo.cityTemperature, cityInfo.cityHumid, cityInfo.cityWindSpeed, getWeatherIcon, uvData.value);
                }
            }
        })
    )}


fiveDay();

function fiveDay() {
    cardRow.empty();
    let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&APPID=${apiKey}&units=imperial`;
    $.ajax ({
        url: queryUrl,
        method: "GET"
    })
    .then(function(showFiveDay){
        for (let i = 0; i != showFiveDay.list.length; i < 8) {
            let cityObj = {
                icon: showFiveDay.list[i].weather[0].icon,
                date: showFiveDay.list[i].dt_txt,
                temp: showFiveDay.list[i].main.temp,
                humidity: showFiveDay.list[i].main.humidity
            }
            let dateStr = cityObj.date;
            let trimDate = dateStr.substring (0, 10);
            let weaterIcon = `https://openweathermap.org/img/w/${cityObj.icon}.png`;
            makeCards(trimDate, weaterIcon, cityObj.temp, cityObj.humidity)
        }
    })

}

function makeCards(date, icon, temp, humidity) {
    let fiveDayCardEl = $("<div>").attr("class", "five-day-card");
    let cardDate = $("<h3>").attr("class", "card-text");
    let cardIcon = $("<img>").attr("class", "weatherIcon");
    let cardTemp = $("<p>").attr("class", "card-text");
    let cardHumidity = $("<p>").attr("class", "card-text");

    cardRow.append(fiveDayCardEl);
    cardDate.text(date);
    cardIcon.attr("src", icon);
    cardTemp.text(`Temp: ${temp} °F`);
    cardHumidity.text(`Humidity: ${humidity}%`);
    fiveDayCardEl.append(cardDate, cardIcon, cardTemp, cardHumidity);
}
