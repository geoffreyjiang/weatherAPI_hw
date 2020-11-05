let apiKey = "10a0190a15115135e5711a7b089580be";






$(document).ready(function(){
    $(".searchBtn").on("click", function(){
        var searchVal = $(".searchInput").val();
        $(".searchInput").val("");
        cityFunction(searchVal)
    })

    var cityHistory = JSON.parse(localStorage.getItem("searchHistory"));

    if (cityHistory.length > 0) {
        cityFunction(cityHistory[cityHistory.length - 1]);
    }
    for (var i = 0; i < cityHistory.length; i++) {
        makeRow(searchHistory[i])
    }

    function makeRow(text){
        var cityList = $("<li>").addClass("list-group-item").text();
        $(".searchHistory").append(cityList);
    }

    $(".searchHistory").on("click", "li", function (){
        cityFunction($(this).text())
    })

    function cityFunction(searchVal) {
        $.ajax({
            type: "GET",
            url: "api.openweathermap.org/data/2.5/forecast?q=" + searchVal  + "&appid=10a0190a15115135e5711a7b089580be"
        }).then(function(data){
            if (cityHistory.indexOf(searchVal) === -1)
            cityHistory.push(searchVal);
            localStorage.setItem("cityHistory", JSON.stringify(history));
            makeRow(searchVal)
        })
        console.log(searchVal)
    }


    


})