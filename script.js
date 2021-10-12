var apiKey = "97ca39cab2cbf202619ee5e2b4d29a0c"
var weather ;
var forecast ;
var queryParam;
var lat;
var lon;
var uvIndex = $("#uv-index")
var forecastContainer = $("#forecast-container")

$(".search-btn").on("click",function() {

    queryParam = $(this).prev().val();
    localStorage.clear()

    if($(this).prev().attr("placeholder") == "City"){
         
         weather ="https://api.openweathermap.org/data/2.5/weather?q=" + queryParam +"&units=imperial&appid=" + apiKey;
         forecast ="https://api.openweathermap.org/data/2.5/forecast?q=" + queryParam +"&units=imperial&appid=" + apiKey;

        getWeather()
        getForecast()
    }
  
   localStorage.setItem('cities', queryParam) 
});

function  getWeather() {
    $.getJSON(weather, function(json) {

        weather = "https://api.openweathermap.org/data/2.5/weather?q=" + queryParam + "&units=imperial&appid=" + apiKey;

        lat = json.coord.lat;
        lon = json.coord.lon;
        getUVIndex();
        getDate();

        $("#city").text(json.name);
        $("#weather_image").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
        $("#temperature").text(json.main.temp + " °F");
        $("#wind-speed").text(json.wind.speed + "MPH");
        $("#humidity").text(json.main.humidity + "%");
    })
}

function getUVIndex(){
     
    var uvEndpoint = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey

    $.getJSON(uvEndpoint, function(uvData){
     
      uvIndex.text(uvData.value)
      uvIndex.attr("class", "")

      if(uvData.value <= 2){
        uvIndex.addClass("green");
      } else if(uvData.value > 3 && uvData.value <= 5 ){
        uvIndex.addClass("yellow")
      } else if(uvData.value > 5 && uvData.value <= 7 ){
        uvIndex.addClass("orange");
      } else if(uvData.value > 7 && uvData.value <= 10 ){
        uvIndex.addClass("red");
      }})    
}

function getDate(){
    var date = document.querySelector("#current-date");
    date.innerHTML = moment().format("MMMM Do, YYYY")
}

function getForecast(){
    $.getJSON(forecast, function(json){

        forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + queryParam + "&units=imperial&appid=" + apiKey;

        forecastContainer.removeClass("d-none")
          
        for (var i=7; i<json.list.length; i+=8 ){ 
            $("#date1").text(moment().add(1, "days").format("MMM Do, YY"));
            $("#icon1").attr("src",  "https://openweathermap.org/img/w/" + json.list[7].weather[0].icon + ".png");
            $("#temp1").text("Temp: " + json.list[7].main.temp + " °F");
            $("#wind1").text("Wind: " + json.list[7].wind.speed + " MPH");
            $("#humidity1").text("Humidity: " + json.list[7].main.humidity + " %");

            $("#date2").text(moment().add(2, "days").format("MMM Do, YY"));
            $("#icon2").attr("src",  "https://openweathermap.org/img/w/" + json.list[15].weather[0].icon + ".png");
            $("#temp2").text("Temp: " + json.list[15].main.temp + " °F");
            $("#wind2").text("Wind: " + json.list[15].wind.speed + " MPH");
            $("#humidity2").text("Humidity: " + json.list[15].main.humidity + " %");

            $("#date3").text(moment().add(3, "days").format("MMM Do, YY"));
            $("#icon3").attr("src",  "https://openweathermap.org/img/w/" + json.list[23].weather[0].icon + ".png");
            $("#temp3").text("Temp: " + json.list[23].main.temp + " °F");
            $("#wind3").text("Wind: " + json.list[23].wind.speed + " MPH");
            $("#humidity3").text("Humidity: " + json.list[23].main.humidity + " %");

            $("#date4").text(moment().add(4, "days").format("MMM Do, YY"));
            $("#icon4").attr("src",  "https://openweathermap.org/img/w/" + json.list[31].weather[0].icon + ".png");
            $("#temp4").text("Temp: " + json.list[31].main.temp + " °F");
            $("#wind4").text("Wind: " + json.list[31].wind.speed + " MPH");
            $("#humidity4").text("Humidity: " + json.list[31].main.humidity + " %");

            $("#date5").text(moment().add(5, "days").format("MMM Do, YY"));
            $("#icon5").attr("src",  "https://openweathermap.org/img/w/" + json.list[39].weather[0].icon + ".png");
            $("#temp5").text("Temp: " + json.list[39].main.temp + " °F");
            $("#wind5").text("Wind: " + json.list[39].wind.speed + " MPH");
            $("#humidity5").text("Humidity: " + json.list[39].main.humidity + " %");
      }
    });
     
}

