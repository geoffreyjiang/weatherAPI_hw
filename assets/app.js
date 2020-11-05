let apiKey = "10a0190a15115135e5711a7b089580be";






$(document).ready(function(){
    $(".searchBtn").on("click", function(){
        var searchVal = $(".searchInput").val();
        $(".searchInput").val("");
        cityFunction(searchVal)
    })

    var cityHistory = JSON.parse(localStorage.getItem("history"));

    if (cityHistory.length > 0) {
        cityFunction(history[history.length - 1]);
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


    


})